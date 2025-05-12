import { useEffect, useState, useRef } from "react";

import { useGetOrderDetails } from "@/api/gameApi";
import { useConversationStore } from "@/store";
import { useGroupInfoApi } from "./GroupInfoCard/useGroupInfoApi";

// 订单结果类型定义
interface OrderResult {
  success?: boolean;
  message?: string;
  order_id?: string | number;
  // 添加可能的其他字段
  price?: number;
  status?: number;
  created_time?: string;
  user_id?: number;
  goods_id?: number;
  quantity?: number;
  [key: string]: any; // 保留索引签名以支持其他可能的字段
}

// API响应类型
interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

// 定义具体的订单响应数据类型
interface OrderDetailsResponse {
  // 这里根据实际 API 返回数据定义字段
  order_id?: number;
  price?: number;
  status?: number;
  created_time?: string;
  user_id?: number;
  goods_id?: number;
  quantity?: number;
  // 其他可能的字段...
}

/**
 * 自动查询订单信息的Hook
 * 在获取到群组信息后，自动查询订单详情
 */
export function useAutoQueryOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderResult | null>(null);

  // 用于记录最后查询的订单ID，避免重复请求
  const lastQueriedOrderIdRef = useRef<number | null>(null);

  // 获取当前会话和群组信息
  const currentConversation = useConversationStore(
    (state) => state.currentConversation,
  );
  const { groupApiInfo, loading: groupLoading } = useGroupInfoApi();

  // API Hooks
  const orderDetailsMutation = useGetOrderDetails();

  // 当获取到群组信息后，自动查询订单
  useEffect(() => {
    // 确保当前是群聊，并且已经获取到群组信息和order_id
    if (!currentConversation || !groupApiInfo?.imGroup?.order_id || groupLoading) {
      return;
    }

    // 获取 order_id
    let orderId: number;
    if (typeof groupApiInfo.imGroup.order_id === "number") {
      orderId = groupApiInfo.imGroup.order_id;
    } else {
      // 如果是字符串，尝试转换为数字
      const parsedOrderId = parseInt(groupApiInfo.imGroup.order_id, 10);
      if (isNaN(parsedOrderId)) {
        console.error("无法解析 order_id:", groupApiInfo.imGroup.order_id);
        return;
      }
      orderId = parsedOrderId;
    }

    // 检查是否是相同的orderId，避免重复请求
    if (lastQueriedOrderIdRef.current === orderId && orderData) {
      console.log("订单信息已存在，跳过重复请求:", orderId);
      return;
    }

    // 查询订单信息
    queryOrderInfo(orderId);
  }, [currentConversation, groupApiInfo, groupLoading]);

  // 查询订单信息函数
  const queryOrderInfo = (orderId: number) => {
    if (!orderId) return;

    // 记录当前查询的订单ID
    lastQueriedOrderIdRef.current = orderId;

    console.log("查询订单信息:", orderId);
    setLoading(true);
    setError(null);

    // 调用订单详情API
    orderDetailsMutation.mutate(
      { order_id: orderId },
      {
        onSuccess: (response) => {
          const responseData = response.data as ApiResponse<OrderDetailsResponse>;
          console.log("订单详情查询成功", responseData);
          // 构造 OrderResult 对象
          const result: OrderResult = {
            success: responseData.code === 200,
            message: responseData.msg,
            order_id: orderId,
            ...(responseData.data || {}),
          };
          setOrderData(result);
          setLoading(false);
        },
        // onError: (err) => {
        //   console.error("订单信息查询失败:", err);
        //   setError("订单信息查询失败");
        //   setLoading(false);
        // }
      },
    );
  };

  // 手动重新查询函数
  const refetchOrderInfo = () => {
    if (!groupApiInfo?.imGroup?.order_id) return;

    let orderId: number;
    if (typeof groupApiInfo.imGroup.order_id === "number") {
      orderId = groupApiInfo.imGroup.order_id;
    } else {
      // 如果是字符串，尝试转换为数字
      const parsedOrderId = parseInt(groupApiInfo.imGroup.order_id, 10);
      if (isNaN(parsedOrderId)) {
        console.error("无法解析 order_id:", groupApiInfo.imGroup.order_id);
        return;
      }
      orderId = parsedOrderId;
    }

    // 重置最后查询的订单ID，强制重新查询
    lastQueriedOrderIdRef.current = null;
    queryOrderInfo(orderId);
  };

  return {
    orderData,
    loading,
    error,
    refetchOrderInfo,
  };
}
