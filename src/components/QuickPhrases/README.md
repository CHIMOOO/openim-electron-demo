# 快捷短语组件 (QuickPhrases)

快捷短语组件是一个通过斜杠命令(/)触发的下拉菜单，用于快速选择预设的短语并插入到聊天输入框中。

## 功能概述

- 通过输入斜杠(/)触发快捷短语下拉菜单
- 从服务器获取预设的快捷短语列表
- 在光标位置上方显示下拉菜单
- 支持加载状态和空数据状态的显示
- 选择短语后自动插入到输入框中

## 文件结构

```
src/components/QuickPhrases/
├── index.tsx       # 主组件文件
├── index.scss      # 样式文件
└── README.md       # 文档
```

## 组件 API

### Props

| 属性名   | 类型                                   | 默认值 | 描述                   |
| -------- | -------------------------------------- | ------ | ---------------------- |
| visible  | boolean                                | -      | 控制下拉菜单的显示状态 |
| loading  | boolean                                | false  | 加载状态               |
| phrases  | Array<{ id: number; content: string }> | []     | 快捷短语数据           |
| onSelect | (content: string) => void              | -      | 选择短语后的回调函数   |
| onClose  | () => void                             | -      | 关闭下拉菜单的回调函数 |

## 样式自定义

样式文件`index.scss`定义了组件的外观，主要包括：

```scss
.quick-phrases-dropdown {
  min-width: 120px;
  width: auto;

  .ant-dropdown-menu {
    max-height: 300px;
    overflow-y: auto;
    padding: 0;
  }

  .phrase-item {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}
```

可以通过修改这些样式来自定义组件的外观。

## 实现细节

### 组件结构

快捷短语组件使用 Ant Design 的 Dropdown 组件作为基础，配合自定义的样式和逻辑。

```tsx
const QuickPhrases = ({
  visible,
  loading = false,
  phrases = [],
  onSelect,
  onClose,
}: QuickPhrasesProps) => {
  const handleSelect = (content: string) => {
    onSelect(content);
    onClose();
  };

  const items: MenuProps["items"] = phrases.map((phrase) => ({
    key: String(phrase.id),
    label: (
      <div className="phrase-item" onClick={() => handleSelect(phrase.content)}>
        {phrase.content}
      </div>
    ),
  }));

  return (
    <Dropdown
      menu={{ items }}
      open={visible}
      onOpenChange={(flag) => {
        if (!flag) onClose();
      }}
      placement="top"
      arrow={{ pointAtCenter: true }}
      trigger={[]}
      overlayClassName="quick-phrases-dropdown"
      dropdownRender={(menu) => (
        <div className="rounded bg-white shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Spin size="small" />
            </div>
          ) : phrases.length === 0 ? (
            <Empty description="暂无快捷短语" className="py-4" />
          ) : (
            menu
          )}
        </div>
      )}
    >
      <div className="h-0 w-0" />
    </Dropdown>
  );
};
```

### 配合 CKEditor 实现光标位置检测

QuickPhrases 组件需要与 CKEditor 配合使用，通过 CKEditor 的自定义事件处理来获取光标位置：

```tsx
// 在CKEditor组件中
const getCursorPosition = (editor: ClassicEditor) => {
  // 获取光标位置的实现...
};

const listenKeydown = (editor: ClassicEditor) => {
  editor.editing.view.document.on(
    "keydown",
    (evt, data) => {
      if (data.keyCode === keyCodes.slash) {
        const position = getCursorPosition(editor);
        onSlashInput?.(position);
      }
      // 其他按键处理...
    },
    { priority: "high" },
  );
};
```

## 使用示例

```tsx
// 在ChatFooter组件中
const handleSlashInput = (position: { top: number; left: number }) => {
  // 处理位置计算...
  setCursorPosition({
    top: Math.max(0, relativeTop + offsetTop),
    left: Math.max(10, relativeLeft),
  });
  openQuickPhrases();
};

// 渲染
<div
  className="quick-phrases-container"
  style={{
    top: cursorPosition.top,
    left: cursorPosition.left,
  }}
>
  <QuickPhrases
    visible={visible}
    phrases={phrases}
    loading={loading}
    onSelect={handleQuickPhraseSelect}
    onClose={closeQuickPhrases}
  />
</div>;
```

## 自定义钩子

为了更好地管理状态和数据获取，创建了`useQuickPhrases`自定义钩子：

```tsx
// src/hooks/useQuickPhrases.ts
export const useQuickPhrases = () => {
  const [visible, setVisible] = useState(false);
  const [phrases, setPhrases] = useState<API.Game.CommonPhrasesResponse["data"]>([]);
  const [loading, setLoading] = useState(false);

  const getCommonPhrases = useGetCommonPhrases();

  // 在钩子初始化时就获取快捷短语
  useEffect(() => {
    fetchPhrases();
  }, []);

  // 实现细节...

  return {
    visible,
    phrases,
    loading,
    openQuickPhrases,
    closeQuickPhrases,
  };
};
```

## 注意事项

1. 光标位置的计算需要考虑浏览器兼容性
2. 快捷短语数据应在应用初始化时预加载，避免用户等待
3. 需要处理可能的 API 错误和空数据状态
