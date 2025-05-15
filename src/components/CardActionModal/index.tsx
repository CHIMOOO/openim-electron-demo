import { FC, useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, Select, InputNumber } from "antd";
import {
  useGoodsRecycle,
  useOrderPlay,
  useSetOrderStatus,
  useGetGoodsDetails,
  useGetOrderDetails,
  useSaveGameAccountValue,
  useGetGameAccountValue,
} from "@/api/gameApi";

interface CardActionModalProps {
  visible: boolean;
  onClose: () => void;
  modalType: string;
  paramId?: number;
}

const CardActionModal: FC<CardActionModalProps> = ({
  visible,
  onClose,
  modalType,
  paramId,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [detailData, setDetailData] = useState<any>(null);

  // 使用API的hooks
  const { mutateAsync: goodsRecycle } = useGoodsRecycle();
  const { mutateAsync: orderPlay } = useOrderPlay();
  const { mutateAsync: getGameAccount } = useGetGameAccountValue();
  const { mutateAsync: saveGameAccount } = useSaveGameAccountValue();
  const { mutateAsync: setOrderStatus } = useSetOrderStatus();
  const { mutateAsync: getGoodsDetails } = useGetGoodsDetails();
  const { mutateAsync: getOrderDetails } = useGetOrderDetails();

  // 获取详情数据
  useEffect(() => {
    if (visible && paramId) {
      if (modalType === "AlertProductDetails") {
        fetchGoodsDetails();
      } else if (modalType === "AlertOrderDetails") {
        fetchOrderDetails();
      } else if (modalType === "AlertGetAccount") {
        fetchAccountDetails();
      }
    }
  }, [visible, modalType, paramId]);

  const fetchGoodsDetails = async () => {
    if (!paramId) return;
    try {
      setLoading(true);
      const response = await getGoodsDetails({ goods_id: paramId });
      if (response.data) {
        setDetailData(response.data);
      }
    } catch (error) {
      console.error("获取商品详情失败:", error);
      message.error("获取商品详情失败");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async () => {
    if (!paramId) return;
    try {
      setLoading(true);
      const response = await getOrderDetails({ order_id: String(paramId) });
      if (response.data) {
        setDetailData(response.data);
      }
    } catch (error) {
      console.error("获取订单详情失败:", error);
      message.error("获取订单详情失败");
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountDetails = async () => {
    if (!paramId) return;
    try {
      setLoading(true);
      const response = await getGameAccount({ goods_id: paramId });
      if (response.data) {
        setAccountInfo(response.data);
      }
    } catch (error) {
      console.error("获取账号信息失败:", error);
      message.error("获取账号信息失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      let response: any;

      switch (modalType) {
        case "AlertEnterInformation":
          // 录入信息
          response = await goodsRecycle({
            game_id: values.game_id,
            pattern_id: values.pattern_id || 2, // 默认为快速回收
            account: values.account,
            amount: values.amount,
            platform: 2, // 默认为Android
            ...(values.seller_id && { seller_id: values.seller_id }),
            ...(values.buyer_id && { buyer_id: values.buyer_id }),
            ...(values.send_im_id && { send_im_id: values.send_im_id }),
            ...(values.im_group_id && { im_group_id: values.im_group_id }),
          });
          break;

        case "AlertPayment":
          // 支付功能 - 仅提示
          message.info("当前不支持网页版支付，请移步到APP中我的的订单管理页面进行支付");
          onClose();
          return;

        case "AlertSubmitAccount":
          // 提交账号
          if (!paramId) return;

          const accountValues = values.accountValues || [];
          response = await saveGameAccount({
            game_id: values.game_id,
            goods_id: paramId,
            order_id: values.order_id,
            is_account_source: values.is_account_source || 1,
            platform: 2, // 默认为Android
            game_account_value: accountValues.map((item: any) => ({
              id: item.id,
              value: item.value,
            })),
            ...(values.authentication_image && {
              authentication_image: values.authentication_image,
            }),
            ...(values.account_source_image && {
              account_source_image: values.account_source_image,
            }),
            ...(values.send_im_id && { send_im_id: values.send_im_id }),
            ...(values.im_group_id && { im_group_id: values.im_group_id }),
          });
          break;

        case "AlertVerification":
        case "AlertConfirmReceipt":
          if (paramId) {
            response = await setOrderStatus({
              order_id: String(paramId),
              status:
                modalType === "AlertVerification"
                  ? values.verification_result === "success"
                    ? 1
                    : 2
                  : 3, // 确认收货状态为3
            });
          }
          break;

        default:
          break;
      }

      if (response?.code === 200) {
        message.success(response.msg || "操作成功");
        onClose();
      } else {
        message.error(response?.msg || "操作失败");
      }
    } catch (error) {
      console.error("提交失败:", error);
      message.error("提交失败，请检查表单");
    } finally {
      setLoading(false);
    }
  };

  // 根据不同模态框类型渲染不同的表单内容
  const renderFormContent = () => {
    switch (modalType) {
      case "AlertEnterInformation":
        return (
          <>
            <Form.Item
              name="game_id"
              label="游戏ID"
              rules={[{ required: true, message: "请输入游戏ID" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="pattern_id"
              label="交易模式"
              rules={[{ required: true, message: "请选择交易模式" }]}
            >
              <Select>
                <Select.Option value={2}>快速回收</Select.Option>
                <Select.Option value={4}>寄售交易</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="account"
              label="账号"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="amount"
              label="出售价格"
              rules={[{ required: true, message: "请输入出售价格" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </>
        );

      case "AlertPayment":
        return <p>当前不支持网页版支付，请移步到APP中我的的订单管理页面进行支付</p>;

      case "AlertSubmitAccount":
        return (
          <>
            <Form.Item
              name="game_id"
              label="游戏ID"
              rules={[{ required: true, message: "请输入游戏ID" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="order_id"
              label="订单ID"
              rules={[{ required: true, message: "请输入订单ID" }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="is_account_source"
              label="账号来源"
              rules={[{ required: true, message: "请选择账号来源" }]}
            >
              <Select>
                <Select.Option value={1}>自己注册</Select.Option>
                <Select.Option value={2}>本平台购买</Select.Option>
                <Select.Option value={3}>其他平台购买</Select.Option>
              </Select>
            </Form.Item>
            <Form.List name="accountValues">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} style={{ display: "flex", marginBottom: 8 }}>
                      <Form.Item
                        {...field}
                        name={[field.name, "id"]}
                        fieldKey={[field.fieldKey || 0, "id"]}
                        rules={[{ required: true, message: "请输入配置ID" }]}
                        style={{ marginRight: 8, marginBottom: 0 }}
                      >
                        <InputNumber placeholder="配置ID" style={{ width: "100%" }} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "value"]}
                        fieldKey={[field.fieldKey || 0, "value"]}
                        rules={[{ required: true, message: "请输入值" }]}
                        style={{ marginRight: 8, flex: 1, marginBottom: 0 }}
                      >
                        <Input placeholder="密码/秘钥值" />
                      </Form.Item>
                      <Button onClick={() => remove(field.name)} type="text" danger>
                        删除
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      添加账号配置
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        );

      case "AlertGetAccount":
        return (
          <div>
            {accountInfo ? (
              <div>
                <h3>游戏账号信息</h3>
                <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
              </div>
            ) : (
              <p>加载账号信息中...</p>
            )}
          </div>
        );

      case "AlertVerification":
        return (
          <Form.Item
            name="verification_result"
            label="验证结果"
            rules={[{ required: true, message: "请选择验证结果" }]}
          >
            <Select>
              <Select.Option value="success">验证成功</Select.Option>
              <Select.Option value="failed">验证失败</Select.Option>
            </Select>
          </Form.Item>
        );

      case "AlertConfirmReceipt":
        return <p>确认收货后，订单将被标记为已完成状态</p>;

      case "AlertProductDetails":
      case "AlertOrderDetails":
        return (
          <div>
            {detailData ? (
              <div>
                <h3>{modalType === "AlertProductDetails" ? "商品详情" : "订单详情"}</h3>
                <pre>{JSON.stringify(detailData, null, 2)}</pre>
              </div>
            ) : (
              <p>加载详情中...</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // 根据模态框类型设置标题
  const getModalTitle = () => {
    switch (modalType) {
      case "AlertEnterInformation":
        return "录入账号信息";
      case "AlertPayment":
        return "支付";
      case "AlertSubmitAccount":
        return "提交账号绑定信息";
      case "AlertGetAccount":
        return "获取账号信息";
      case "AlertVerification":
        return "确认验号";
      case "AlertConfirmReceipt":
        return "确认收货";
      case "AlertProductDetails":
        return "商品详情";
      case "AlertOrderDetails":
        return "订单详情";
      default:
        return "操作";
    }
  };

  // 是否显示确认按钮
  const showConfirmButton = () => {
    // 对于纯展示类模态框，不需要确认按钮
    return !["AlertGetAccount", "AlertProductDetails", "AlertOrderDetails"].includes(
      modalType,
    );
  };

  return (
    <Modal
      title={getModalTitle()}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        showConfirmButton() && (
          <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
            确认
          </Button>
        ),
      ].filter(Boolean)}
      maskClosable={false}
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        {renderFormContent()}
      </Form>
    </Modal>
  );
};

export default CardActionModal;
