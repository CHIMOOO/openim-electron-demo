# GroupInfoCard 群组信息卡片

群组信息卡片是一个位于聊天界面右侧的组件，用于展示当前群组的详细信息，包括基本信息、成员信息、商品信息和交易功能。

## 功能概述

- 显示群组基本信息（群名称、群 ID、创建时间等）
- 展示群成员数量和管理信息
- 显示群公告
- 提供与商品相关的详细信息（如果是商品群）
- 支持交易功能（订单支付）
- 提供数据复制功能

## 文件结构

```
src/pages/chat/queryChat/GroupInfoCard/
├── index.tsx                  # 主组件文件
├── useGroupInfoApi.ts         # 群组信息API钩子
├── useProductAndOrderApi.ts   # 商品和订单API钩子
└── README.md                  # 文档
```

## 组件 API

### Props

| 属性名        | 类型       | 默认值 | 描述                       |
| ------------- | ---------- | ------ | -------------------------- |
| onViewDetails | () => void | -      | 点击查看更多详情的回调函数 |

## 实现细节

### 数据获取

群组信息卡片使用自定义钩子进行数据获取：

1. **useGroupInfoApi** - 获取群组的基本信息和 API 相关数据

   ```tsx
   const { groupApiInfo, loading, error, refetch } = useGroupInfoApi();
   ```

2. **useProductAndOrderApi** - 获取商品信息和处理订单
   ```tsx
   const {
     productData,
     loadingProduct,
     productError,
     orderResult,
     loadingOrder,
     placeOrder,
     fetchProductDetails,
   } = useProductAndOrderApi();
   ```

### 群组权限检查

组件使用`useCurrentMemberRole`钩子检查当前用户在群组中的角色：

```tsx
const { isOwner, isAdmin } = useCurrentMemberRole();
const hasPermissions = isAdmin || isOwner;
```

### 主要功能实现

#### 1. 复制群 ID

```tsx
const copyGroupId = () => {
  copyToClipboard(currentGroupInfo.groupID);
  feedbackToast({ msg: "复制成功" });
};
```

#### 2. 订单支付

```tsx
const handlePlaceOrder = () => {
  if (!orderId) {
    message.warning("请输入订单ID");
    return;
  }

  placeOrder(orderId);
};
```

### 渲染逻辑

组件根据不同的数据状态和群组类型渲染不同的内容：

```tsx
return (
  <div className="flex h-full flex-col border-l border-gray-200 bg-white p-4">
    {/* 群组头像和名称 */}
    <div className="mb-4 flex items-center justify-center">{/* ... */}</div>

    <Divider className="my-2" />

    {loading ? (
      <div className="space-y-4">
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    ) : (
      <>
        {/* 群ID */}
        <div className="mb-2">{/* ... */}</div>

        {/* 商品信息（如果存在） */}
        {apiGroup && <div className="mb-2">{/* ... */}</div>}

        {/* 群成员 */}
        <div className="mb-2">{/* ... */}</div>

        {/* 群公告 */}
        {currentGroupInfo.notification && <div className="mb-2">{/* ... */}</div>}

        {/* 创建时间 */}
        {apiGroup && <div className="mb-2">{/* ... */}</div>}

        {/* 加入时间 */}
        {currentMemberInGroup?.joinTime && <div className="mb-2">{/* ... */}</div>}

        {/* 错误提示 */}
        {error && (
          <div className="mb-2 rounded-md bg-red-50 p-2 text-xs text-red-600">
            {/* ... */}
          </div>
        )}

        {/* 商品详情 */}
        <div className="mb-2">{/* ... */}</div>

        {/* 订单操作（如果商品可购买且不是自己的商品） */}
        {productData?.is_play === 1 && !productData.is_self && (
          <div className="mt-3 border-t border-gray-100 pt-3">{/* ... */}</div>
        )}

        {/* 订单结果反馈 */}
        {orderResult && <div className="mt-2">{/* ... */}</div>}

        {/* 查看更多按钮 */}
        <div className="mt-auto pt-4">
          <Button block onClick={onViewDetails}>
            查看更多
          </Button>
        </div>
      </>
    )}
  </div>
);
```

## 商品详情展示

群组信息卡片特别关注商品信息的展示，包括：

- 商品标题
- 价格
- 标签
- 是否可购买的状态标识

```tsx
{
  productData ? (
    <div className="space-y-2">
      {productData.title && (
        <div className="font-medium">
          {productData.title}
          {productData.is_play === 1 && (
            <Tag className="ml-2" color="green">
              可购买
            </Tag>
          )}
        </div>
      )}

      {productData.retail_price && (
        <div className="font-bold text-red-600">
          价格: ￥{productData.retail_price.toFixed(2)}
        </div>
      )}

      {productData.label && (
        <div className="flex flex-wrap gap-1">
          {productData.label.split(",").map((tag, index) => (
            <Tag key={index} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="text-xs text-gray-500">暂无商品信息</div>
  );
}
```

## 订单操作

对于可购买的商品，组件提供了订单支付功能：

```tsx
<div className="mt-3 border-t border-gray-100 pt-3">
  <div className="flex flex-col gap-2">
    <input
      type="text"
      value={orderId}
      onChange={(e) => setOrderId(e.target.value)}
      placeholder="输入订单ID"
      className="rounded border border-gray-300 px-3 py-2 text-sm"
    />
    <Button
      type="primary"
      icon={<ShoppingCartOutlined />}
      onClick={handlePlaceOrder}
      loading={loadingOrder}
      block
    >
      支付订单
    </Button>
  </div>
</div>
```

## API 钩子详解

### useGroupInfoApi

用于获取群组的 API 信息：

```tsx
export const useGroupInfoApi = () => {
  const currentGroupInfo = useConversationStore((state) => state.currentGroupInfo);
  const [groupApiInfo, setGroupApiInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroupInfo = useCallback(async () => {
    if (!currentGroupInfo?.groupID) return;

    setLoading(true);
    setError(null);
    try {
      // 调用API获取群组信息
      const response = await fetch(
        `/api/group/info?groupID=${currentGroupInfo.groupID}`,
      );
      const data = await response.json();

      if (data.code === 0) {
        setGroupApiInfo(data.data);
      } else {
        setError(data.message || "获取群组信息失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
      console.error("获取群组信息出错:", err);
    } finally {
      setLoading(false);
    }
  }, [currentGroupInfo?.groupID]);

  useEffect(() => {
    fetchGroupInfo();
  }, [fetchGroupInfo]);

  return { groupApiInfo, loading, error, refetch: fetchGroupInfo };
};
```

### useProductAndOrderApi

用于获取商品信息和处理订单：

```tsx
export const useProductAndOrderApi = () => {
  const [productData, setProductData] = useState<any>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

  const [orderResult, setOrderResult] = useState<any>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  // 获取商品详情和处理订单的实现...

  return {
    productData,
    loadingProduct,
    productError,
    orderResult,
    loadingOrder,
    placeOrder,
    fetchProductDetails,
  };
};
```

## 注意事项

1. **性能优化**: 使用`React.memo`优化渲染性能
2. **错误处理**: 提供错误提示和重试机制
3. **数据加载状态**: 使用骨架屏提升用户体验
4. **权限控制**: 根据用户角色显示不同功能
5. **商品交易**: 支持交易功能需要在 API 中适当配置
