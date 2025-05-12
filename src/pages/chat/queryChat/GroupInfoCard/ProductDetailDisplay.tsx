import { Tag, Image, Skeleton, Badge, Tooltip } from "antd";
import { FC, memo } from "react";
import {
  ShopOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { ProductDetail } from "./types";

interface ProductDetailDisplayProps {
  productData: ProductDetail | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const ProductDetailDisplay: FC<ProductDetailDisplayProps> = ({
  productData,
  loading,
  error,
  onRetry,
}) => {
  if (loading) {
    return <Skeleton active paragraph={{ rows: 3 }} />;
  }

  if (error) {
    return (
      <div className="rounded bg-red-50 p-2 text-xs text-red-500">
        {error}
        {onRetry && (
          <button className="ml-2 text-blue-500 underline" onClick={onRetry}>
            重试
          </button>
        )}
      </div>
    );
  }

  if (!productData) {
    return <div className="text-xs text-gray-500">暂无商品信息</div>;
  }

  // 对content按key_sort排序
  const sortedContent = [...(productData.content || [])].sort(
    (a, b) => a.key_sort - b.key_sort,
  );

  return (
    <div className="space-y-3">
      {/* 商品基本信息 */}
      <div className="space-y-2">
        <div className="flex items-center">
          <h3 className="text-base font-medium">{productData.title}</h3>
          <div className="ml-2">
            {productData.is_play === 1 ? (
              <Tag color="green">可购买</Tag>
            ) : (
              <Tag color="red">已下架</Tag>
            )}
          </div>
        </div>

        {/* 商品图片 */}
        {productData.image && (
          <div className="mt-2">
            <Image
              src={productData.image}
              alt={productData.title}
              width={180}
              className="rounded-md object-cover"
              preview={{
                mask: "点击查看大图",
              }}
            />
          </div>
        )}

        {/* 价格信息 */}
        <div className="mt-2">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-red-600">
              ¥{productData.retail_price?.toFixed(2)}
            </span>
            {productData.actual_price &&
              productData.actual_price !== productData.retail_price && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ¥{productData.actual_price?.toFixed(2)}
                </span>
              )}
          </div>
        </div>

        {/* 标签信息 */}
        {productData.label && (
          <div className="mt-2 flex flex-wrap gap-1">
            {productData.label.split(",").map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        {/* 认证信息 */}
        <div className="mt-2 flex flex-wrap gap-2">
          {productData.is_authentication === 1 && (
            <Tooltip title="已认证">
              <Badge status="success" text={<span className="text-xs">已认证</span>} />
            </Tooltip>
          )}
          {productData.is_reparation === 1 && (
            <Tooltip title="包赔服务">
              <Badge
                status="processing"
                text={<span className="text-xs">包赔服务</span>}
              />
            </Tooltip>
          )}
          {productData.is_inspect === 1 && (
            <Tooltip title="已验证">
              <Badge status="success" text={<span className="text-xs">已验证</span>} />
            </Tooltip>
          )}
        </div>

        {/* 游戏和分类信息 */}
        <div className="mt-2 grid grid-cols-2 gap-1 text-xs text-gray-500">
          <div>游戏: {productData.game_name}</div>
          <div>分类: {productData.category_name}</div>
          <div>商品编号: {productData.goods_no}</div>
          <div>上架时间: {productData.release_time}</div>
        </div>
      </div>

      {/* 动态属性内容 */}
      {sortedContent.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
          <h4 className="text-sm font-medium">商品属性</h4>
          <div className="space-y-2 rounded-md bg-gray-50 p-2">
            {sortedContent.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-xs font-medium text-gray-700">{item.key}</div>
                <div className="text-xs text-gray-600">
                  {item.type === 3 ? (
                    <div className="flex flex-wrap gap-1">
                      {item.value.split(",").map((v, i) => (
                        <Tag key={i} color="cyan" className="my-1">
                          {v}
                        </Tag>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-1">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 商品描述 */}
      {productData.text && (
        <div className="mt-3 space-y-1 border-t border-gray-100 pt-3">
          <h4 className="text-sm font-medium">商品描述</h4>
          <div className="rounded-md bg-gray-50 p-2 text-xs text-gray-600">
            {productData.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ProductDetailDisplay);
