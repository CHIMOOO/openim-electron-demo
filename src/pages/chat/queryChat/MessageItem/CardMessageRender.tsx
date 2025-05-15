import { FC, useMemo, useState } from "react";
import { IMessageItemProps } from "./index";
import styles from "./message-item.module.scss";
import clsx from "clsx";
import { Modal, Form, Input, Button, message, Select } from "antd";

// 智能卡片类型定义
interface IntelligentCardBase {
  intelligentType: number;
  title?: string | { text: string; color: string };
  content?: string;
}

// 类型1: 普通类型（仅有标题和正文内容）
interface IntelligentCardType1 extends IntelligentCardBase {
  intelligentType: 1;
  title: string;
  content: string;
}

// 类型2: 商品链接类型
interface IntelligentCardType2 extends IntelligentCardBase {
  intelligentType: 2;
  title: string;
  icon: string;
  content: string;
  price: string;
  url: string;
}

// 类型3: 商品链接类型（带副标题和按钮）
interface IntelligentCardType3 extends IntelligentCardBase {
  intelligentType: 3;
  title: string;
  secondTitle: {
    time: string;
    state: string;
    state_type: string;
    state_type_color: string;
  };
  icon: string;
  content: string;
  price: string;
  button: {
    text: string;
    url: string;
  };
}

// 类型4: 标题+1个操作按钮
interface IntelligentCardType4 extends IntelligentCardBase {
  intelligentType: 4;
  title: string;
  button: {
    text: string;
    url: string;
  };
}

// 类型5: 标题+正文内容+1个操作按钮
interface IntelligentCardType5 extends IntelligentCardBase {
  intelligentType: 5;
  title: { text: string; color: string };
  content: string;
  button: {
    text: string;
    url: string;
  };
}

// 类型6: 标题+列表类型正文+2个操作按钮
interface IntelligentCardType6 extends IntelligentCardBase {
  intelligentType: 6;
  title: string;
  contentList: string[];
  buttonList: {
    text: string;
    color: string;
    url: string;
  }[];
}

// 类型7: 订单链接类型
interface IntelligentCardType7 extends IntelligentCardBase {
  intelligentType: 7;
  content: string;
  labelList: string[];
  price: string;
  state: { text: string; color: string };
  url: string;
}

// 类型8: 键值对内容卡片
interface IntelligentCardType8 extends IntelligentCardBase {
  intelligentType: 8;
  title: string;
  contentJson: { key: string; value: string }[];
}

// 类型9: 键值对内容卡片带按钮
interface IntelligentCardType9 extends IntelligentCardBase {
  intelligentType: 9;
  title: string;
  contentJson: { key: string; value: string }[];
  button: {
    text: string;
    url: {
      platform: number;
      pageName: string;
      paramId: number;
    };
  };
}

type IntelligentCard =
  | IntelligentCardType1
  | IntelligentCardType2
  | IntelligentCardType3
  | IntelligentCardType4
  | IntelligentCardType5
  | IntelligentCardType6
  | IntelligentCardType7
  | IntelligentCardType8
  | IntelligentCardType9;

// 卡片基础容器组件
const CardContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 transition-shadow duration-200 bg-white border rounded-xl border-slate-200">
    {children}
  </div>
);

// 通用按钮组件
const CardButton: FC<{
  text: string;
  color?: string; // 将主要通过预设样式控制，color属性可用于特殊覆盖
  url: string | { platform: number; pageName: string; paramId: number };
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  onClick?: (
    url: string | { platform: number; pageName: string; paramId: number },
  ) => void;
}> = ({ text, color, url, className, variant = "primary", onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(url);
    } else if (typeof url === "string") {
      window.open(url, "_blank");
    } else {
      console.log("跳转到应用内页面:", url);
      // 在这里实现内部导航逻辑
    }
  };

  let buttonStyle = "";
  switch (variant) {
    case "secondary":
      buttonStyle = "bg-slate-100 hover:bg-slate-200 text-slate-700";
      break;
    case "danger":
      buttonStyle = "bg-rose-500 hover:bg-rose-600 text-white";
      break;
    case "primary":
    default:
      buttonStyle = "bg-indigo-500 hover:bg-indigo-600 text-white";
      break;
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
        buttonStyle,
        className,
      )}
      style={color ? { backgroundColor: color } : {}}
    >
      {text}
    </button>
  );
};

// 标签组件
const Label: FC<{ text: string }> = ({ text }) => (
  <span className="mr-2 inline-block rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">
    {text}
  </span>
);

// 价格组件
const Price: FC<{ price: string }> = ({ price }) => (
  <div className="text-lg font-semibold text-slate-800">¥{price}</div>
);

// 状态显示组件
const StatusTag: FC<{ text: string; color: string; bgColor?: string }> = ({
  text,
  color,
  bgColor,
}) => (
  <span
    className="rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide"
    style={{
      backgroundColor: bgColor || `${color}1A`, // 更淡的背景，例如 #FF00001A
      color: color,
    }}
  >
    {text}
  </span>
);

// 弹窗组件
const AlertModal: FC<{
  visible: boolean;
  onClose: () => void;
  modalType: string;
  paramId?: number;
}> = ({ visible, onClose, modalType, paramId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      let apiUrl = "";
      let apiData = { ...values };

      switch (modalType) {
        case "AlertEnterInformation":
          apiUrl = "/api/goods/goods_recycle";
          break;
        case "AlertPayment":
          apiUrl = "/api/order/order_play";
          break;
        case "AlertSubmitAccount":
          apiUrl = "/api/game/save_game_account_value";
          break;
        case "AlertGetAccount":
          apiUrl = "/api/game/get_game_account_value";
          break;
        case "AlertVerification":
        case "AlertConfirmReceipt":
          apiUrl = "/api/order/order_status_set";
          break;
        case "AlertProductDetails":
          apiUrl = "/api/goods/goods_details";
          apiData = { id: paramId };
          break;
        case "AlertOrderDetails":
          apiUrl = "/api/order/cs_order_details";
          apiData = { order_id: paramId };
          break;
        default:
          break;
      }

      // 模拟API调用
      console.log(`Calling API: ${apiUrl}`, apiData);
      // 实际开发时替换为真正的API调用
      // const response = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(apiData)
      // });
      // const result = await response.json();

      setTimeout(() => {
        setLoading(false);
        message.success("操作成功");
        onClose();
        form.resetFields();
      }, 1000);
    } catch (error) {
      console.error("提交表单出错:", error);
      setLoading(false);
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
                <Select.Option value="balance">余额支付</Select.Option>
                <Select.Option value="alipay">支付宝</Select.Option>
                <Select.Option value="wechat">微信支付</Select.Option>
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

const CardMessageRender: FC<IMessageItemProps> = (props) => {
  const { message, isSender } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalParamId, setModalParamId] = useState<number | undefined>(undefined);

  const handleCardAction = (
    url: string | { platform: number; pageName: string; paramId: number },
  ) => {
    if (typeof url === "string") {
      window.open(url, "_blank");
    } else if (url && typeof url === "object" && url.pageName) {
      setModalType(url.pageName);
      setModalParamId(url.paramId);
      setModalVisible(true);
    }
  };

  const cardData = useMemo<IntelligentCard | null>(() => {
    try {
      let content: any = JSON.parse(message.customElem?.data || "") || "";
      return content;
    } catch (error) {
      console.error("解析卡片数据失败:", error);
      return null;
    }
  }, [message]);

  if (!cardData) {
    return (
      <div
        className={clsx(
          styles["message-content"],
          isSender && styles["message-content-sender"],
        )}
      >
        <CardContainer>
          <h3 className="font-semibold text-slate-800">无效的卡片消息</h3>
          <p className="mt-1 text-sm text-slate-500">无法解析卡片内容。</p>
        </CardContainer>
      </div>
    );
  }

  // 根据类型渲染不同的卡片
  const renderCard = () => {
    const type = cardData.intelligentType;

    switch (type) {
      case 1: {
        const data = cardData as IntelligentCardType1;
        return (
          <CardContainer>
            <h3 className="mb-2 text-base font-semibold text-slate-800">
              {data.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">{data.content}</p>
          </CardContainer>
        );
      }

      case 2: {
        const data = cardData as IntelligentCardType2;
        return (
          <CardContainer>
            <h4 className="mb-2 text-sm font-medium text-slate-500">{data.title}</h4>
            <div className="flex items-center space-x-3">
              <img
                src={data.icon}
                alt="商品图片"
                className="object-cover w-16 h-16 border rounded-lg border-slate-200"
              />
              <div className="flex-1">
                <p className="mb-1 text-sm font-medium line-clamp-2 text-slate-700">
                  {data.content}
                </p>
                <Price price={data.price} />
              </div>
            </div>
            {/* <div className="mt-3 text-right">
              <CardButton
                text="查看详情"
                url={data.url}
                variant="secondary"
                className="px-3 py-1.5 text-xs"
              />
            </div> */}
          </CardContainer>
        );
      }

      case 3: {
        const data = cardData as IntelligentCardType3;
        return (
          <CardContainer>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-slate-800">{data.title}</h3>
              <StatusTag
                text={data.secondTitle.state}
                color={data.secondTitle.state_type_color}
              />
            </div>
            <p className="mb-3 text-xs text-slate-500">
              订单时间: {data.secondTitle.time}
            </p>
            <div className="flex items-center mb-3 space-x-3">
              <img
                src={data.icon}
                alt="商品图片"
                className="object-cover w-16 h-16 border rounded-lg border-slate-200"
              />
              <div className="flex-1">
                <p className="mb-1 text-sm line-clamp-2 text-slate-700">
                  {data.content}
                </p>
                <Price price={data.price} />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              {/* <CardButton
                text={data.button.text}
                url={data.button.url}
                variant="primary"
              /> */}
            </div>
          </CardContainer>
        );
      }

      case 4: {
        const data = cardData as IntelligentCardType4;
        return (
          <CardContainer>
            <div className="flex items-center justify-between">
              <h3 className="flex-1 mr-4 text-base font-semibold leading-relaxed text-slate-800">
                {data.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">{data.content}</p>
              <CardButton
                text={data.button.text}
                url={data.button.url}
                variant="primary"
                onClick={handleCardAction}
              />
            </div>
          </CardContainer>
        );
      }

      case 5: {
        const data = cardData as IntelligentCardType5;
        return (
          <CardContainer>
            <h3
              className="mb-2 text-lg font-semibold"
              style={{ color: data.title.color }}
            >
              {data.title.text}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              {data.content}
            </p>
            <div className="flex justify-end">
              <CardButton
                text={data.button.text}
                url={data.button.url}
                variant="primary"
                onClick={handleCardAction}
              />
            </div>
          </CardContainer>
        );
      }

      case 6: {
        const data = cardData as IntelligentCardType6;
        return (
          <CardContainer>
            <h3 className="mb-3 text-base font-semibold text-slate-800">
              {data.title}
            </h3>
            <ul className="mb-4 space-y-1.5 pl-1 text-sm text-slate-600">
              {data.contentList.map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="flex-shrink-0 w-3 h-3 mr-2 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M10.28 2.28L3.989 8.575 1.72 6.28A1 1 0 00.288 7.72l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end space-x-2">
              {data.buttonList.map((btn, index) => (
                <CardButton
                  key={index}
                  text={btn.text}
                  url={btn.url}
                  variant={
                    btn.color === "#ff0000" || btn.color?.toLowerCase() === "red"
                      ? "danger"
                      : index === data.buttonList.length - 1
                      ? "primary"
                      : "secondary"
                  }
                  className="px-3 py-1.5 text-xs"
                  onClick={handleCardAction}
                />
              ))}
            </div>
          </CardContainer>
        );
      }

      case 7: {
        const data = cardData as IntelligentCardType7;
        return (
          <CardContainer>
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-wrap gap-1">
                {data.labelList.map((label, index) => (
                  <Label key={index} text={label} />
                ))}
              </div>
              <StatusTag text={data.state.text} color={data.state.color} />
            </div>
            <p className="mb-2 text-sm font-medium line-clamp-2 text-slate-700">
              {data.content}
            </p>
            <div className="flex items-center justify-between">
              <Price price={data.price} />
              {/* <CardButton
                text="查看订单"
                url={data.url}
                variant="secondary"
                className="px-3 py-1.5 text-xs"
              /> */}
            </div>
          </CardContainer>
        );
      }

      case 8: {
        const data = cardData as IntelligentCardType8;
        return (
          <CardContainer>
            <h3 className="pb-2 mb-3 text-base font-semibold border-b border-slate-100 text-slate-800">
              {data.title}
            </h3>
            <div className="space-y-1.5 text-sm">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-1/3 pr-1 mr-2 text-slate-500">
                    {item.key}:
                  </span>
                  <span className="flex-1 min-w-0 font-medium break-words text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContainer>
        );
      }

      case 9: {
        const data = cardData as IntelligentCardType9;
        return (
          <CardContainer>
            <h3 className="pb-2 mb-3 text-base font-semibold border-b border-slate-100 text-slate-800">
              {data.title}
            </h3>
            <div className="mb-4 space-y-1.5 text-sm">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-1/3 pr-1 mr-2 text-slate-500">
                    {item.key}:
                  </span>
                  <span className="flex-1 min-w-0 font-medium break-words text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <CardButton
                text={data.button.text}
                url={data.button.url}
                variant="primary"
                className="w-full"
                onClick={handleCardAction}
              />
            </div>
          </CardContainer>
        );
      }

      default:
        const unknownData = cardData as IntelligentCardBase;
        return (
          <CardContainer>
            <h3 className="font-semibold text-slate-800">未知卡片类型</h3>
            <p className="mt-1 text-sm text-slate-500">
              类型代码: {unknownData.intelligentType}
            </p>
          </CardContainer>
        );
    }
  };

  return (
    <>
      <div
        className={clsx(
          styles["message-content"],
          isSender && styles["message-content-sender"],
        )}
      >
        {renderCard()}
      </div>

      <AlertModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalType={modalType}
        paramId={modalParamId}
      />
    </>
  );
};

export default CardMessageRender;
