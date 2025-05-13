import { Tag, Image, Skeleton, Badge, Tooltip, Divider } from "antd";
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
          {/* 商品图片 */}
          {productData.image && (
            <div className="mt-2 mr-2">
              <Image
                src={productData.image}
                alt={productData.title}
                width={100}
                className="object-cover rounded-sm"
                preview={{
                  mask: "点击查看大图",
                }}
              />
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium">{productData.title}</h3>
          </div>
        </div>

        {/* 价格信息 */}
        <div className="flex flex-row items-center mt-2">
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
          <div className="ml-auto">
            {productData.is_play === 1 ? (
              <Tag color="green">可购买</Tag>
            ) : (
              <Tag color="red">已下架</Tag>
            )}
          </div>
        </div>

        {/* 标签信息 */}
        {productData.label && (
          <div className="flex flex-wrap gap-1 mt-2">
            {productData.label.split(",").map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </div>
        )}
        {/* 分隔线 */}
        <Divider className="my-2" />
        {/* 游戏和分类信息 */}
        <div className="grid grid-cols-2 gap-1 mt-2 text-xs text-gray-500">
          <div>游戏: {productData.game_name}</div>
          <div>分类: {productData.category_name}</div>
          {/* <div className="flex flex-row col-span-2">
            <div>上架时间: </div>
            <div className="ml-auto">{productData.release_time}</div>
          </div> */}
          {/* <div className="col-span-2">商品编号: {productData.goods_no}</div> */}
          <div className="col-span-2">上架时间: {productData.release_time}</div>
          <div className="flex flex-row col-span-2">
            <div className="whitespace-nowrap">商品编号: </div>
            <div className="ml-auto">{productData.goods_no}</div>
          </div>
        </div>
      </div>

      {/* 动态属性内容 */}
      {sortedContent.length > 0 && (
        <div className="pt-3 mt-3 space-y-2 border-t border-gray-100">
          <h4 className="text-sm font-medium">商品属性</h4>
          <div className="p-2 space-y-2 rounded-md bg-gray-50">
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
        <div className="pt-3 mt-3 space-y-1 border-t border-gray-100">
          <h4 className="text-sm font-medium">商品描述</h4>
          <div className="p-2 text-xs text-gray-600 rounded-md bg-gray-50">
            {productData.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ProductDetailDisplay);
