import { CopyOutlined, UserOutlined } from "@ant-design/icons";
import { AllowType } from "@openim/wasm-client-sdk";
import { Avatar, Button, Divider, Skeleton, Tooltip } from "antd";
import { FC, memo } from "react";

import OIMAvatar from "@/components/OIMAvatar";
import { useCurrentMemberRole } from "@/hooks/useCurrentMemberRole";
import { useConversationStore } from "@/store";

import { useGroupInfoApi } from "./useGroupInfoApi";
import { useProductAndOrderApi } from "./useProductAndOrderApi";
import ProductDetailDisplay from "./ProductDetailDisplay";
import OrderDetailDisplay from "./OrderDetailDisplay";
import { OrderData, OrderDetail, ProductDetail } from "./types";

interface GroupInfoCardProps {
  onViewDetails?: () => void;
  orderData?: OrderDetail | OrderData | null;
  productData?: ProductDetail | null;
}

const GroupInfoCard: FC<GroupInfoCardProps> = ({
  orderData,
  productData: externalProductData,
}) => {
  const currentGroupInfo = useConversationStore((state) => state.currentGroupInfo);
  const { groupApiInfo, loading, error, refetch } = useGroupInfoApi();
  const {
    productData: apiProductData,
    loadingProduct,
    productError,
    orderResult,
    loadingOrder,
    fetchProductDetails,
  } = useProductAndOrderApi();

  const displayProductData =
    externalProductData || (apiProductData as unknown as ProductDetail);
  const displayOrderData = orderData || orderResult;

  if (!currentGroupInfo) {
    return null;
  }

  const apiGroup = groupApiInfo?.imGroup;

  return (
    <div className="flex h-full flex-col border-l border-gray-200 bg-white p-4">
      {/* 群聊成员信息 - 模拟图片 */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-500">群聊成员</h3>
        <div className="grid grid-cols-3 space-y-2">
          {/* 客服 - 占位符 */}
          <div className="flex items-center space-x-2">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="text-xs">客服</span>
          </div>
          {/* 买家 */}
          {apiGroup?.buyer_id && (
            <div className="flex items-center space-x-2">
              <Avatar size="small" icon={<UserOutlined />} />
              <div>
                <span className="block text-xs">买家</span>
                <span className="block text-xs text-gray-500">
                  ID: {apiGroup.buyer_id}
                </span>
              </div>
            </div>
          )}
          {/* 卖家 */}
          {apiGroup?.seller_id && (
            <div className="flex items-center space-x-2">
              <Avatar size="small" icon={<UserOutlined />} />
              <div>
                <span className="block text-xs">卖家</span>
                <span className="block text-xs text-gray-500">
                  ID: {apiGroup.seller_id}
                </span>
              </div>
            </div>
          )}
          {/* 加载和错误状态 */}
          {loading && (
            <Skeleton
              avatar={{ size: "small" }}
              title={false}
              paragraph={{ rows: 1, width: "50%" }}
              active
            />
          )}
          {error && (
            <div className="mt-2 rounded-md bg-red-50 p-2 text-xs text-red-600">
              {error}
              <Button type="link" size="small" onClick={refetch}>
                重试
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 分隔线 */}
      <Divider className="my-2" />

      {/* 商品信息 */}
      {(apiGroup?.good_id || displayProductData) && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-gray-500">商品信息</h3>
          <ProductDetailDisplay
            productData={displayProductData}
            loading={loadingProduct}
            error={productError}
            onRetry={() => {
              if (apiGroup?.good_id) {
                fetchProductDetails(Number(apiGroup.good_id));
              }
            }}
          />
        </div>
      )}

      {/* 分隔线 */}
      {(apiGroup?.good_id || displayProductData) && displayOrderData && (
        <Divider className="my-2" />
      )}

      {/* 订单信息 */}
      {displayOrderData && (
        <div className="mb-4">
          <OrderDetailDisplay
            orderData={displayOrderData}
            loading={loadingOrder}
            showDetailedInfo={false}
          />
        </div>
      )}
    </div>
  );
};

export default memo(GroupInfoCard);
