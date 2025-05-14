import { Tag, Skeleton, Badge, Steps, Button, Tooltip } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { FC, memo } from "react";

import { OrderDetail, OrderData } from "./types";

interface OrderDetailDisplayProps {
  orderData: OrderDetail | OrderData | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  showDetailedInfo?: boolean;
}

// 订单状态映射
const getOrderStatusConfig = (status: number) => {
  const statusMap: Record<number, { color: string; text: string; icon: JSX.Element }> =
    {
      0: { color: "warning", text: "待付款", icon: <ShoppingCartOutlined /> },
      1: { color: "processing", text: "待发货", icon: <DollarOutlined /> },
      2: { color: "processing", text: "待收货", icon: <ClockCircleOutlined /> },
      3: { color: "success", text: "交易完成", icon: <CheckCircleOutlined /> },
      4: { color: "error", text: "交易关闭", icon: <CloseCircleOutlined /> },
      5: { color: "default", text: "申请退款", icon: <CloseCircleOutlined /> },
      6: { color: "error", text: "已退款", icon: <CloseCircleOutlined /> },
    };

  return (
    statusMap[status] || {
      color: "default",
      text: "未知状态",
      icon: <ClockCircleOutlined />,
    }
  );
};

// 支付类型映射
const getPaymentTypeText = (type: number): string => {
  const paymentTypeMap: Record<number, string> = {
    0: "余额支付",
    1: "支付宝",
    2: "微信支付",
  };
  return paymentTypeMap[type] || "未知支付方式";
};

const OrderDetailDisplay: FC<OrderDetailDisplayProps> = ({
  orderData,
  loading,
  error,
  onRetry,
  showDetailedInfo = false,
}) => {
  if (loading) {
    return <Skeleton active paragraph={{ rows: 2 }} />;
  }

  if (error) {
    return (
      <div className="p-2 text-xs text-red-500 rounded bg-red-50">
        {error}
        {onRetry && (
          <button className="ml-2 text-blue-500 underline" onClick={onRetry}>
            重试
          </button>
        )}
      </div>
    );
  }

  if (!orderData) {
    return <div className="text-xs text-gray-500">暂无订单信息</div>;
  }

  // 检查是否为新的OrderDetail类型
  const isDetailedOrder = "order_no" in orderData && "goods_title" in orderData;

  // 状态处理
  let statusConfig;
  if (isDetailedOrder) {
    statusConfig = getOrderStatusConfig((orderData as OrderDetail).status);
  } else {
    // 兼容旧的OrderData类型
    statusConfig = {
      color: orderData.success ? "success" : "error",
      text: orderData.success ? "成功" : "失败",
      icon: orderData.success ? <CheckCircleOutlined /> : <CloseCircleOutlined />,
    };
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-3">
      {/* 订单状态 */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">订单信息</h3>
        <Badge
          status={statusConfig.color as any}
          text={
            <span className="text-sm">
              {isDetailedOrder
                ? (orderData as OrderDetail).status_zh
                : statusConfig.text}
            </span>
          }
        />
      </div>

      {isDetailedOrder ? (
        <div className="space-y-3">
          {/* 商品标题信息 */}
          <div className="p-3 rounded-md bg-gray-50">
            <div className="mb-2 text-sm font-medium text-gray-900 truncate">
              {(orderData as OrderDetail).goods_title}
            </div>
            <div className="flex flex-col justify-between text-xs text-gray-600">
              <span>商品编号:</span>
              <Tooltip title="点击复制">
                <span
                  className="flex items-center cursor-pointer hover:text-blue-500"
                  onClick={() => handleCopy((orderData as OrderDetail).goods_no)}
                >
                  {(orderData as OrderDetail).goods_no}
                  <CopyOutlined className="ml-1" />
                </span>
              </Tooltip>
            </div>
          </div>

          {/* 订单基本信息 */}
          <div className="p-3 rounded-md bg-gray-50">
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-700">
              <div className="flex flex-wrap items-center justify-between">
                <span className="whitespace-nowrap">订单编号:</span>
                <Tooltip title="点击复制">
                  <span
                    className="flex items-center font-medium cursor-pointer hover:text-blue-500"
                    onClick={() => handleCopy((orderData as OrderDetail).order_no)}
                  >
                    {(orderData as OrderDetail).order_no}
                    <CopyOutlined className="ml-1" />
                  </span>
                </Tooltip>
              </div>
              <div className="flex justify-between">
                <span>支付方式:</span>
                <span>
                  {getPaymentTypeText((orderData as OrderDetail).payment_type)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>商品金额:</span>
                <span className="font-medium text-red-600">
                  ¥{(orderData as OrderDetail).goods_price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>赔付金额:</span>
                <span>¥{(orderData as OrderDetail).reparation_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>服务费:</span>
                <span>¥{(orderData as OrderDetail).pattern_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200">
                <span>实付金额:</span>
                <span className="font-bold text-red-600">
                  ¥{(orderData as OrderDetail).payment_price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* 交易模式信息 */}
          <div className="p-3 rounded-md bg-gray-50">
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-700">
              <div className="flex justify-between">
                <span>交易模式:</span>
                <span>{(orderData as OrderDetail).pattern_name}</span>
              </div>
              <div className="flex justify-between">
                <span>设备类型:</span>
                <span>{(orderData as OrderDetail).device_name}</span>
              </div>
              <div className="flex justify-between">
                <span>账号类型:</span>
                <span>{(orderData as OrderDetail).operator_name}</span>
              </div>
              {(orderData as OrderDetail).game_service_name && (
                <div className="flex justify-between">
                  <span>游戏服务器:</span>
                  <span>{(orderData as OrderDetail).game_service_name}</span>
                </div>
              )}
            </div>
          </div>

          {/* 订单时间信息 */}
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">订单时间</h4>
              {!showDetailedInfo && (orderData as OrderDetail).place_time && (
                <span className="text-xs text-gray-500">
                  下单: {(orderData as OrderDetail).place_time}
                </span>
              )}
            </div>

            {showDetailedInfo && (
              <div className="p-3 rounded-md bg-gray-50">
                {/* 显示订单的关键时间节点 */}
                <div className="space-y-2 text-xs">
                  {(orderData as OrderDetail).place_time && (
                    <div className="flex justify-between">
                      <span>下单时间:</span>
                      <span>{(orderData as OrderDetail).place_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).pay_time && (
                    <div className="flex justify-between">
                      <span>支付时间:</span>
                      <span>{(orderData as OrderDetail).pay_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).verify_time && (
                    <div className="flex justify-between">
                      <span>验货时间:</span>
                      <span>{(orderData as OrderDetail).verify_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).send_time && (
                    <div className="flex justify-between">
                      <span>发货时间:</span>
                      <span>{(orderData as OrderDetail).send_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).deal_time && (
                    <div className="flex justify-between">
                      <span>成交时间:</span>
                      <span>{(orderData as OrderDetail).deal_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).take_time && (
                    <div className="flex justify-between">
                      <span>收货时间:</span>
                      <span>{(orderData as OrderDetail).take_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).cancel_time && (
                    <div className="flex justify-between">
                      <span>取消时间:</span>
                      <span>{(orderData as OrderDetail).cancel_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).refund_time && (
                    <div className="flex justify-between">
                      <span>退款时间:</span>
                      <span>{(orderData as OrderDetail).refund_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).system_refund_time && (
                    <div className="flex justify-between">
                      <span>系统退款时间:</span>
                      <span>{(orderData as OrderDetail).system_refund_time}</span>
                    </div>
                  )}
                  {(orderData as OrderDetail).refund_content &&
                    (orderData as OrderDetail).refund_content !== "0" && (
                      <div className="flex justify-between">
                        <span>退款原因:</span>
                        <span>{(orderData as OrderDetail).refund_content}</span>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* 订单流程 */}
          {/* <div className="mt-3">
            <Steps
              size="small"
              current={(orderData as OrderDetail).status}
              items={[
                { title: "待付款", icon: <ShoppingCartOutlined /> },
                { title: "待发货", icon: <DollarOutlined /> },
                { title: "待收货", icon: <ClockCircleOutlined /> },
                { title: "已完成", icon: <CheckCircleOutlined /> },
              ]}
            />
          </div> */}

          {/* 未支付提示 */}
          {(orderData as OrderDetail).status === 0 &&
            (orderData as OrderDetail).unpaid_conf_time > 0 && (
              <div className="p-2 mt-2 text-xs text-yellow-600 rounded-md bg-yellow-50">
                请在 {(orderData as OrderDetail).unpaid_conf_time}{" "}
                分钟内完成支付，否则订单将自动取消。
              </div>
            )}
        </div>
      ) : (
        // 旧版简易OrderData显示
        <div className="p-3 rounded-md bg-gray-50">
          <div className="grid grid-cols-1 gap-2 text-xs text-gray-700">
            {orderData.message && (
              <div className="flex justify-between">
                <span>消息:</span>
                <span>{orderData.message}</span>
              </div>
            )}
            {orderData.order_id && (
              <div className="flex justify-between">
                <span>订单ID:</span>
                <span>{orderData.order_id}</span>
              </div>
            )}
            {orderData.goods_id && (
              <div className="flex justify-between">
                <span>商品ID:</span>
                <span>{orderData.goods_id}</span>
              </div>
            )}
            {orderData.price !== undefined && (
              <div className="flex justify-between">
                <span>价格:</span>
                <span className="font-medium text-red-600">
                  ¥{Number(orderData.price).toFixed(2)}
                </span>
              </div>
            )}
            {orderData.created_time && (
              <div className="flex justify-between">
                <span>创建时间:</span>
                <span>{new Date(String(orderData.created_time)).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(OrderDetailDisplay);
