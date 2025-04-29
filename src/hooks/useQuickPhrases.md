# useQuickPhrases 自定义钩子

`useQuickPhrases` 是一个用于管理聊天快捷短语功能状态和数据获取的自定义 React 钩子。

## 功能概述

- 管理快捷短语下拉菜单的显示状态
- 预加载快捷短语数据，无需等待用户输入斜杠
- 处理数据加载状态和错误
- 提供打开和关闭下拉菜单的方法

## 源代码

```tsx
// src/hooks/useQuickPhrases.ts
import { useEffect, useState } from "react";
import { useGetCommonPhrases } from "@/api/gameApi";

export const useQuickPhrases = () => {
  const [visible, setVisible] = useState(false);
  const [phrases, setPhrases] = useState<API.Game.CommonPhrasesResponse["data"]>([]);
  const [loading, setLoading] = useState(false);

  const getCommonPhrases = useGetCommonPhrases();

  // 在钩子初始化时就获取快捷短语
  useEffect(() => {
    fetchPhrases();
  }, []);

  const openQuickPhrases = () => {
    setVisible(true);
  };

  const closeQuickPhrases = () => {
    setVisible(false);
  };

  const fetchPhrases = async () => {
    if (phrases.length > 0) return;

    setLoading(true);
    try {
      const response = await getCommonPhrases.mutateAsync();
      setPhrases(response.data.data || []);
    } catch (error) {
      console.error("获取快捷短语失败", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    visible,
    phrases,
    loading,
    openQuickPhrases,
    closeQuickPhrases,
  };
};
```

## 返回值

| 属性名            | 类型                                   | 描述                 |
| ----------------- | -------------------------------------- | -------------------- |
| visible           | boolean                                | 控制下拉菜单是否显示 |
| phrases           | Array<{ id: number; content: string }> | 快捷短语数据列表     |
| loading           | boolean                                | 数据加载状态         |
| openQuickPhrases  | () => void                             | 打开下拉菜单的方法   |
| closeQuickPhrases | () => void                             | 关闭下拉菜单的方法   |

## 实现细节

1. **状态管理**

   - `visible`: 控制下拉菜单的显示状态
   - `phrases`: 存储从 API 获取的快捷短语数据
   - `loading`: 跟踪数据加载状态

2. **数据预加载**

   - 在组件挂载时通过`useEffect`钩子自动调用`fetchPhrases`方法
   - 避免用户需要等待数据加载，提高用户体验

3. **优化策略**

   - 只在数据为空时发起请求，避免重复加载
   - 错误处理以防止应用崩溃

4. **方法封装**
   - `openQuickPhrases`: 打开下拉菜单，不再获取数据
   - `closeQuickPhrases`: 关闭下拉菜单
   - `fetchPhrases`: 从 API 获取数据的内部方法

## 使用示例

```tsx
// 在组件中使用
import { useQuickPhrases } from "@/hooks/useQuickPhrases";

const ChatComponent = () => {
  const { visible, phrases, loading, openQuickPhrases, closeQuickPhrases } =
    useQuickPhrases();

  const handleSlashInput = () => {
    // 当用户输入斜杠时
    openQuickPhrases();
  };

  const handleSelectPhrase = (content: string) => {
    // 处理用户选择的短语
    console.log("Selected phrase:", content);
    closeQuickPhrases();
  };

  return (
    <div>
      {/* 输入框组件 */}
      <QuickPhrases
        visible={visible}
        phrases={phrases}
        loading={loading}
        onSelect={handleSelectPhrase}
        onClose={closeQuickPhrases}
      />
    </div>
  );
};
```

## 与 API 的集成

这个钩子使用`useGetCommonPhrases`从`gameApi.ts`文件中获取数据：

```tsx
// src/api/gameApi.ts 中的相关代码
export const useGetCommonPhrases = () => {
  return useMutation(
    () =>
      noCheckRequest.post<API.Game.CommonPhrasesResponse>(
        "/api/im_chat/get_common_phrases",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};
```

## 数据结构

API 返回的数据结构定义在`typings.d.ts`中：

```tsx
// src/api/typings.d.ts 中的相关代码
type CommonPhrasesResponse = {
  data: Array<{
    id: number;
    content: string;
  }>;
};
```

## 注意事项

1. **数据缓存**: 钩子实现了简单的缓存策略，避免重复请求
2. **错误处理**: 虽然记录了错误，但没有提供重试机制
3. **扩展性**: 可以扩展为支持添加自定义短语的功能
4. **性能**: 由于预加载数据，不会影响用户打字时的性能
