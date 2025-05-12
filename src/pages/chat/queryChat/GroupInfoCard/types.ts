// 商品内容项类型
export interface ProductContentItem {
  is_required: number;
  is_show: number;
  is_sort: number;
  key: string;
  key_sort: number;
  sort_type: number;
  type: number;
  value: string;
}

// 商品详情类型
export interface ProductDetail {
  id: number;
  content: ProductContentItem[];
  category_id: number;
  is_inspect: number;
  sort: number;
  is_indulge: number;
  is_authentication: number;
  is_account_source: number;
  sending_id: number;
  penalty_id: number;
  account: string;
  title: string;
  image: string;
  retail_price: number;
  actual_price: number;
  cost_price: number | null;
  connect: string;
  text: string;
  label: string;
  is_play: number;
  is_self: boolean;
  user_id: number;
  is_reparation: number;
  reparation_id: number;
  review_status: number;
  game_name: string;
  goods_no: string;
  category_name: string;
  submit_time: string;
  release_time: string;
  seller_service_ratio: number | null;
  seller_service_price: number | null;
}

// 订单详情类型
export interface OrderDetail {
  id: number;
  goods_id: number;
  game_id: number;
  goods_title: string;
  goods_no: string;
  goods_image: string;
  order_no: string;
  goods_price: number;
  payment_price: number;
  reparation_price: number;
  pattern_price: number;
  payment_type: number;
  status: number;
  status_zh: string;
  pattern_name: string;
  game_service_name: string;
  device_name: string;
  operator_name: string;
  place_time: string;
  pay_time: string;
  deal_time: string;
  take_time: string;
  cancel_time: string;
  refund_time: string;
  system_refund_time: string;
  verify_time: string;
  send_time: string;
  refund_content: string;
  unpaid_conf_time: number;
  verify_conf_time: number;
  take_conf_time: number;
}

// 原有的OrderData类型重构为兼容性类型
export interface OrderData {
  success?: boolean;
  message?: string;
  order_id?: string | number;
  price?: number;
  status?: number;
  created_time?: string;
  user_id?: number;
  goods_id?: number;
  quantity?: number;
  [key: string]: any;
}
