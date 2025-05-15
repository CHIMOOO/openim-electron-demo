import { FC, useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import {
  useUpdateGoodsDetails,
  useOrderPlay,
  useSetOrderStatus,
  useGetGoodsDetails,
  useGetOrderDetails,
  useGetGameGoodsList,
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

  // 使用API的hooks
  const { mutateAsync: updateGoodsDetails } = useUpdateGoodsDetails();
  const { mutateAsync: orderPlay } = useOrderPlay();
  const { mutateAsync: getGameAccountValue } = useGetGameGoodsList();
  const { mutateAsync: saveGameAccountValue } = useUpdateGoodsDetails();
  const { mutateAsync: setOrderStatus } = useSetOrderStatus();
  const { mutateAsync: getGoodsDetails } = useGetGoodsDetails();
  const { mutateAsync: getOrderDetails } = useGetOrderDetails();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      let response = null;

      switch (modalType) {
        case "AlertEnterInformation":
          if (paramId) {
            response = await updateGoodsDetails({
              ...values,
              goods_id: paramId,
            });
          }
          break;

        case "AlertPayment":
          if (paramId) {
            response = await orderPlay({
              order_id: String(paramId),
              payment_method: Number(values.payment_method),
            });
          }
          break;

        case "AlertSubmitAccount":
          if (paramId) {
            response = await updateGoodsDetails({
              goods_id: paramId,
              account: values.account,
              title: values.account,
            });
          }
          break;

        case "AlertGetAccount":
          response = await getGameAccountValue({});
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
                  : 3, // 确认收货状态
              remarks: values.remarks,
            });
          }
          break;

        case "AlertProductDetails":
          if (paramId) {
            response = await getGoodsDetails({
              goods_id: paramId,
            });
          }
          break;

        case "AlertOrderDetails":
          if (paramId) {
            response = await getOrderDetails({
              order_id: String(paramId),
            });
          }
          break;

        default:
          break;
      }

      console.log("API响应结果:", response);
      setLoading(false);
      message.success("操作成功");
      onClose();
      form.resetFields();
    } catch (error) {
      console.error("提交表单出错:", error);
      setLoading(false);
      message.error("操作失败，请重试");
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "AlertEnterInformation":
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="标题"
              rules={[{ required: true, message: "请输入标题" }]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item
              name="content"
              label="内容"
              rules={[{ required: true, message: "请输入内容" }]}
            >
              <Input.TextArea rows={4} placeholder="请输入内容" />
            </Form.Item>
          </Form>
        );

      case "AlertPayment":
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="payment_method"
              label="支付方式"
              rules={[{ required: true, message: "请选择支付方式" }]}
            >
              <Select>
                <Select.Option value="1">余额支付</Select.Option>
                <Select.Option value="2">支付宝</Select.Option>
                <Select.Option value="3">微信支付</Select.Option>
              </Select>
            </Form.Item>
            <div className="my-4 text-lg font-bold text-center">支付金额: ¥199.00</div>
          </Form>
        );

      case "AlertSubmitAccount":
        return (
          <Form form={form} layout="vertical">
            <Form.Item
              name="account"
              label="账号"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          </Form>
        );

      case "AlertGetAccount":
        return (
          <div className="p-4">
            <h3 className="mb-2 font-medium">账号信息</h3>
            <div className="p-3 rounded bg-gray-50">
              <p>
                <span className="text-gray-500">账号:</span> game_account_2024
              </p>
              <p>
                <span className="text-gray-500">密码:</span> ********
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              请妥善保管账号信息，切勿泄露给他人。
            </div>
          </div>
        );

      case "AlertVerification":
        return (
          <div className="p-4">
            <p className="mb-4">请确认您已验证账号信息无误:</p>
            <Form form={form} layout="vertical">
              <Form.Item
                name="verification_result"
                label="验证结果"
                rules={[{ required: true, message: "请选择验证结果" }]}
              >
                <Select>
                  <Select.Option value="success">验证通过</Select.Option>
                  <Select.Option value="failed">验证失败</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="remarks" label="备注">
                <Input.TextArea rows={3} placeholder="请输入备注信息" />
              </Form.Item>
            </Form>
          </div>
        );

      case "AlertConfirmReceipt":
        return (
          <div className="p-4">
            <p className="mb-4 text-center">您确认已收到商品并且一切正常吗？</p>
            <p className="mb-2 text-sm text-gray-500">
              确认收货后，交易将完成，货款将转给卖家。
            </p>
            <Form form={form} layout="vertical">
              <Form.Item name="remarks" label="备注">
                <Input.TextArea rows={3} placeholder="请输入备注信息（可选）" />
              </Form.Item>
            </Form>
          </div>
        );

      case "AlertProductDetails":
      case "AlertOrderDetails":
        return (
          <div className="p-4">
            <div className="pb-2 mb-4 border-b">
              <h3 className="font-medium">
                {modalType === "AlertProductDetails" ? "商品详情" : "订单详情"}
              </h3>
              <p className="text-sm text-gray-500">ID: {paramId}</p>
            </div>
            <div className="flex items-center justify-center h-40">
              <div className="text-gray-400">加载中...</div>
            </div>
          </div>
        );

      default:
        return <div>未知弹窗类型</div>;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "AlertEnterInformation":
        return "录入信息";
      case "AlertPayment":
        return "支付";
      case "AlertSubmitAccount":
        return "提交账号";
      case "AlertGetAccount":
        return "获取账号";
      case "AlertVerification":
        return "确认验号";
      case "AlertConfirmReceipt":
        return "确认收货";
      case "AlertProductDetails":
        return "商品详情";
      case "AlertOrderDetails":
        return "订单详情";
      default:
        return "提示";
    }
  };

  const showFooter =
    modalType !== "AlertGetAccount" &&
    modalType !== "AlertProductDetails" &&
    modalType !== "AlertOrderDetails";

  return (
    <Modal
      title={getModalTitle()}
      open={visible}
      onCancel={onClose}
      footer={
        showFooter
          ? [
              <Button key="back" onClick={onClose}>
                取消
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleSubmit}
              >
                确认
              </Button>,
            ]
          : [
              <Button key="close" type="primary" onClick={onClose}>
                关闭
              </Button>,
            ]
      }
      width={modalType.includes("Details") ? 600 : 400}
    >
      {renderModalContent()}
    </Modal>
  );
};

export default CardActionModal;
