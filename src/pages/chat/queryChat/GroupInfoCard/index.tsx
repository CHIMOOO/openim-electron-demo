import { CopyOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { AllowType } from "@openim/wasm-client-sdk";
import { Avatar, Button, Divider, Image, Skeleton, Tag, Tooltip, message } from "antd";
import { FC, memo, useState } from "react";
import { useCopyToClipboard } from "react-use";

import OIMAvatar from "@/components/OIMAvatar";
import { useCurrentMemberRole } from "@/hooks/useCurrentMemberRole";
import { useConversationStore } from "@/store";
import { feedbackToast } from "@/utils/common";

import { useGroupInfoApi } from "./useGroupInfoApi";
import { useProductAndOrderApi } from "./useProductAndOrderApi";

interface GroupInfoCardProps {
  onViewDetails?: () => void;
}

const GroupInfoCard: FC<GroupInfoCardProps> = ({ onViewDetails }) => {
  const currentGroupInfo = useConversationStore((state) => state.currentGroupInfo);
  const currentMemberInGroup = useConversationStore(
    (state) => state.currentMemberInGroup,
  );
  const { groupApiInfo, loading, error, refetch } = useGroupInfoApi();
  const {
    productData,
    loadingProduct,
    productError,
    orderResult,
    loadingOrder,
    placeOrder,
    fetchProductDetails,
  } = useProductAndOrderApi();

  const [orderId, setOrderId] = useState<string>("");
  const { isOwner, isAdmin } = useCurrentMemberRole();
  const [_, copyToClipboard] = useCopyToClipboard();

  const hasPermissions = isAdmin || isOwner;

  if (!currentGroupInfo) {
    return null;
  }

  const copyGroupId = () => {
    copyToClipboard(currentGroupInfo.groupID);
    feedbackToast({ msg: "复制成功" });
  };

  const handlePlaceOrder = () => {
    if (!orderId) {
      message.warning("请输入订单ID");
      return;
    }

    placeOrder(orderId);
  };

  const memberCount = currentGroupInfo.memberCount || 0;
  const apiGroup = groupApiInfo?.imGroup;

  return (
    <div className="flex h-full flex-col border-l border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-center">
        <div className="text-center">
          <OIMAvatar
            isgroup
            size={64}
            src={apiGroup?.group_avatar || currentGroupInfo.faceURL}
            text={apiGroup?.group_name || currentGroupInfo.groupName}
          />
          <h3 className="mt-2 font-medium">
            {loading ? (
              <Skeleton.Input size="small" style={{ width: 120 }} active />
            ) : (
              apiGroup?.group_name || currentGroupInfo.groupName
            )}
          </h3>
        </div>
      </div>

      <Divider className="my-2" />

      {loading ? (
        <div className="space-y-4">
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      ) : (
        <>
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">群ID</span>
              <div className="flex items-center">
                <span className="mr-1 text-xs text-gray-500">
                  {currentGroupInfo.groupID}
                </span>
                <Tooltip title="复制">
                  <CopyOutlined
                    className="cursor-pointer text-gray-400 hover:text-blue-500"
                    onClick={copyGroupId}
                  />
                </Tooltip>
              </div>
            </div>
          </div>

          {apiGroup && (
            <div className="mb-2">
              <div className="flex flex-col">
                <span className="mb-1 text-sm text-gray-600">商品信息</span>
                <div className="rounded-md bg-gray-50 p-2 text-xs text-gray-700">
                  <div>商品ID: {apiGroup.good_id}</div>
                  <div>卖家ID: {apiGroup.seller_id}</div>
                  <div>买家ID: {apiGroup.buyer_id}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">群成员</span>
              <span className="text-xs text-gray-500">
                {apiGroup?.member_count || memberCount}
              </span>
            </div>
          </div>

          {currentGroupInfo.notification && (
            <div className="mb-2">
              <div className="flex flex-col">
                <span className="mb-1 text-sm text-gray-600">群公告</span>
                <div className="rounded-md bg-gray-50 p-2 text-xs text-gray-700">
                  {currentGroupInfo.notification}
                </div>
              </div>
            </div>
          )}

          {apiGroup && (
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">创建时间</span>
                <span className="text-xs text-gray-500">
                  {new Date(apiGroup.created_time).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {currentMemberInGroup?.joinTime && (
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">加入时间</span>
                <span className="text-xs text-gray-500">
                  {new Date(Number(currentMemberInGroup.joinTime)).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-2 rounded-md bg-red-50 p-2 text-xs text-red-600">
              {error}
              <Button type="link" size="small" onClick={refetch}>
                重试
              </Button>
            </div>
          )}

          {/* 商品详情部分 */}
          <div className="mb-2">
            <div className="flex flex-col">
              <span className="mb-1 text-sm font-medium text-gray-600">商品详情</span>
              <div className="rounded-md bg-gray-50 p-2">
                {loadingProduct ? (
                  <Skeleton active paragraph={{ rows: 2 }} />
                ) : productError ? (
                  <div className="rounded bg-red-50 p-2 text-xs text-red-500">
                    {productError}
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        if (apiGroup?.good_id) {
                          fetchProductDetails(String(apiGroup.good_id));
                        }
                      }}
                    >
                      重试
                    </Button>
                  </div>
                ) : productData ? (
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
                )}
              </div>
            </div>
          </div>

          {/* 订单操作部分 */}
          {productData?.is_play === 1 && !productData.is_self && (
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

                {orderResult && (
                  <div
                    className={`rounded p-2 text-sm ${
                      orderResult.success
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {orderResult.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentGroupInfo.lookMemberInfo === AllowType.Allowed && (
            <div className="mt-2">
              <h4 className="mb-2 text-sm font-medium">群主及管理员</h4>
              <div className="grid grid-cols-3 gap-2">
                {/* 这里可以展示群主和管理员列表，但需要额外数据 */}
                <div className="flex flex-col items-center">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span className="mt-1 text-xs">群主</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-auto">
        <Button type="primary" block onClick={onViewDetails}>
          查看更多详情
        </Button>
      </div>
    </div>
  );
};

export default memo(GroupInfoCard);
