# GroupInfoCard 组件

群聊信息卡片组件，用于展示群聊基本信息、商品详情和订单信息。

## 组件功能

- 显示群聊基本信息（名称、ID、成员数量等）
- 显示商品详情（标题、价格、属性等）
- 显示订单信息（状态、金额、交易流程等）
- 提供订单操作功能（支付订单）

## 组件结构

```
GroupInfoCard/
├── index.tsx               # 主组件
├── ProductDetailDisplay.tsx # 商品详情展示组件
├── OrderDetailDisplay.tsx   # 订单详情展示组件
├── types.ts                # 类型定义
├── useGroupInfoApi.ts      # 群组API Hook
├── useProductAndOrderApi.ts # 商品和订单API Hook
└── README.md               # 使用文档
```

## 使用方式

### 基本使用

```tsx
import GroupInfoCard from "@/pages/chat/queryChat/GroupInfoCard";

const App = () => {
  const handleViewDetails = () => {
    // 处理查看更多详情的逻辑
    console.log("View more details");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1">{/* 聊天内容区域 */}</div>
      <div className="w-80">
        <GroupInfoCard onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
};
```

### 传入外部商品和订单数据

```tsx
import GroupInfoCard from "@/pages/chat/queryChat/GroupInfoCard";
import { ProductDetail, OrderDetail } from "@/pages/chat/queryChat/GroupInfoCard/types";

const App = () => {
  // 示例商品数据
  const productData: ProductDetail = {
    id: 57,
    content: [
      {
        is_required: 1,
        is_show: 1,
        is_sort: 1,
        key: "游戏段位",
        key_sort: 13,
        sort_type: 1,
        type: 3,
        value: "黄金1",
      },
      // ... 其他商品属性
    ],
    category_id: 1,
    is_inspect: 1,
    sort: 100,
    is_indulge: 1,
    is_authentication: 1,
    is_account_source: 1,
    sending_id: 1,
    penalty_id: 1,
    account: "chen11oopp",
    title: "王者荣耀售卖超级牛逼的账号先到先得",
    image:
      "https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
    retail_price: 1000,
    actual_price: 949.5,
    cost_price: null,
    connect: "276806275",
    text: "这个账号超级牛逼的快点来买啊",
    label: "包赔服务,验证账号",
    is_play: 0,
    is_self: false,
    user_id: 59,
    is_reparation: 1,
    reparation_id: 11,
    review_status: 1,
    game_name: "王者荣耀",
    goods_no: "NO5204038363397044753961977773",
    category_name: "游戏账号",
    submit_time: "2025-04-27 13:55:07",
    release_time: "2025-04-25 17:57:11",
    seller_service_ratio: null,
    seller_service_price: null,
  };

  // 示例订单数据
  const orderData: OrderDetail = {
    id: 17,
    goods_id: 57,
    game_id: 18,
    goods_title: "王者荣耀售卖超级牛逼的账号先到先得",
    goods_no: "NO5204038363397044753961977773",
    goods_image:
      "https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
    order_no: "NO1952765272014818644557757517",
    goods_price: 1000,
    payment_price: 1160.5,
    reparation_price: 100,
    pattern_price: 60.5,
    payment_type: 1,
    status: 0,
    status_zh: "待付款",
    pattern_name: "自由交易",
    game_service_name: "",
    device_name: "苹果",
    operator_name: "QQ",
    place_time: "",
    pay_time: "",
    deal_time: "",
    take_time: "",
    cancel_time: "",
    refund_time: "",
    system_refund_time: "",
    verify_time: "",
    send_time: "",
    refund_content: "",
    unpaid_conf_time: 30,
    verify_conf_time: 0,
    take_conf_time: 0,
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1">{/* 聊天内容区域 */}</div>
      <div className="w-80">
        <GroupInfoCard
          onViewDetails={() => console.log("View more details")}
          productData={productData}
          orderData={orderData}
        />
      </div>
    </div>
  );
};
```

## 组件 API

### GroupInfoCard

| 属性          | 类型                             | 必填 | 默认值 | 描述                           |
| ------------- | -------------------------------- | ---- | ------ | ------------------------------ |
| onViewDetails | () => void                       | 否   | -      | 点击查看更多详情按钮的回调函数 |
| orderData     | OrderDetail \| OrderData \| null | 否   | null   | 外部传入的订单数据             |
| productData   | ProductDetail \| null            | 否   | null   | 外部传入的商品数据             |

### ProductDetailDisplay

展示商品详细信息的组件，可单独使用。

| 属性        | 类型                  | 必填 | 默认值 | 描述                   |
| ----------- | --------------------- | ---- | ------ | ---------------------- |
| productData | ProductDetail \| null | 是   | -      | 商品详情数据           |
| loading     | boolean               | 否   | false  | 加载状态               |
| error       | string \| null        | 否   | null   | 错误信息               |
| onRetry     | () => void            | 否   | -      | 重试加载数据的回调函数 |

### OrderDetailDisplay

展示订单详细信息的组件，可单独使用。

| 属性             | 类型                             | 必填 | 默认值 | 描述                     |
| ---------------- | -------------------------------- | ---- | ------ | ------------------------ |
| orderData        | OrderDetail \| OrderData \| null | 是   | -      | 订单详情数据             |
| loading          | boolean                          | 否   | false  | 加载状态                 |
| error            | string \| null                   | 否   | null   | 错误信息                 |
| onRetry          | () => void                       | 否   | -      | 重试加载数据的回调函数   |
| showDetailedInfo | boolean                          | 否   | false  | 是否显示更详细的订单信息 |
