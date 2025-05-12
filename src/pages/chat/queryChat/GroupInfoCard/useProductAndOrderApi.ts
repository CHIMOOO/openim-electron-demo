import { useEffect, useState } from "react";

import { useGetGoodsDetails, useOrderPlay } from "@/api/gameApi";
import { useConversationStore } from "@/store";
import { useGroupInfoApi } from "./useGroupInfoApi";

// 商品详情接口返回数据类型定义
interface GoodsDetailsData {
  id?: number;
  content?: Array<{
    is_required: number;
    is_show: number;
    is_sort: number;
    key: string;
    key_sort: number;
    sort_type: number;
    type: number;
    value: string;
  }>;
  category_id?: number;
  is_inspect?: number;
  is_indulge?: number;
  is_authentication?: number;
  is_account_source?: number;
  account?: string;
  title?: string;
  image?: string;
  retail_price?: number;
  actual_price?: number;
  connect?: string;
  text?: string;
  label?: string;
  is_play?: number;
  is_self?: boolean;
  user_id?: number;
  is_reparation?: number;
  reparation_id?: number;
}

// API响应类型
interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

// 订单支付参数类型（保留注释，便于将来使用）
// interface OrderPlayParams {
//   order_id: string;
//   payment_method: number;
// }

// 订单支付结果类型
interface OrderPlayResult {
  success?: boolean;
  message?: string;
  order_id?: string;
  price?: number;
  status?: number;
  created_time?: string;
  goods_id?: number;
  [key: string]: any; // 允许包含其他字段
}

export function useProductAndOrderApi(goodId?: string) {
  // 暂时注释掉，保留一段时间以便将来可能需要时恢复
  // const currentGroupInfo = useConversationStore((state) => state.currentGroupInfo);
  const { groupApiInfo } = useGroupInfoApi();

  // 商品详情状态
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [productData, setProductData] = useState<GoodsDetailsData | null>(null);

  // 订单状态
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<OrderPlayResult | null>(null);

  // API Hooks
  const getGoodsDetailsMutation = useGetGoodsDetails();
  const orderPlayMutation = useOrderPlay();

  // 获取商品详情
  useEffect(() => {
    let targetId: number | null = null;

    if (goodId) {
      const parsedGoodId = parseInt(goodId, 10);
      if (!isNaN(parsedGoodId)) {
        targetId = parsedGoodId;
      }
    } else if (
      groupApiInfo?.imGroup?.good_id !== undefined &&
      groupApiInfo.imGroup.good_id !== null
    ) {
      if (typeof groupApiInfo.imGroup.good_id === "number") {
        targetId = groupApiInfo.imGroup.good_id;
      } else if (typeof groupApiInfo.imGroup.good_id === "string") {
        const parsedGoodId = parseInt(groupApiInfo.imGroup.good_id, 10);
        if (!isNaN(parsedGoodId)) {
          targetId = parsedGoodId;
        }
      }
    }

    if (targetId !== null) {
      fetchProductDetails(targetId);
    }
  }, [goodId, groupApiInfo?.imGroup?.good_id]);

  // 获取商品详情
  const fetchProductDetails = (goodsId: number) => {
    setLoadingProduct(true);
    setProductError(null);

    getGoodsDetailsMutation.mutate(
      { goods_id: goodsId } as unknown as API.Game.GoodsDetailsParams,
      {
        onSuccess: (response) => {
          const responseData =
            response.data as unknown as ApiResponse<GoodsDetailsData>;
          console.log("获取商品详情成功", responseData);
          setProductData(responseData.data);
          setLoadingProduct(false);
        },
        // onError: (err) => {
        //   console.error("获取商品详情失败", err);
        //   setProductError("获取商品详情失败");
        //   setLoadingProduct(false);
        // },
      },
    );
  };

  // 订单支付
  const placeOrder = (orderId: string, paymentMethod = 1) => {
    setLoadingOrder(true);
    setOrderError(null);

    orderPlayMutation.mutate(
      { order_id: orderId, payment_method: paymentMethod },
      {
        onSuccess: (response) => {
          const responseData = response.data as unknown as ApiResponse<any>;
          setOrderResult({
            success: responseData.code === 200,
            message: responseData.msg,
            order_id: orderId,
          });
          setLoadingOrder(false);
        },
        // onError: (err) => {
        //   console.error("订单支付失败", err);
        //   setOrderError("订单支付失败");
        //   setLoadingOrder(false);
        // },
      },
    );
  };

  return {
    // 商品详情相关
    productData,
    loadingProduct,
    productError,
    fetchProductDetails,

    // 订单相关
    orderResult,
    loadingOrder,
    orderError,
    placeOrder,
  };
}
