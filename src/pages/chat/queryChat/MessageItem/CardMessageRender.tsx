import { FC, useMemo, useState } from "react";
import { IMessageItemProps } from "./index";
import styles from "./message-item.module.scss";
import clsx from "clsx";
import CardActionModal from "@/components/CardActionModal";

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
const CardContainer: FC<{
  children: React.ReactNode;
  cardData?: any;
}> = ({ children, cardData }) => {
  // 判断是否为开发环境
  const isDev = import.meta.env.MODE === "development";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow duration-200">
      {children}

      {/* 开发环境下显示卡片数据 */}
      {isDev && cardData && (
        <div className="mt-3 border-t border-slate-100 pt-3">
          <details className="text-xs">
            <summary className="cursor-pointer font-mono text-slate-500">
              Debug: 展开查看卡片数据
            </summary>
            <pre className="mt-2 max-h-60 overflow-auto rounded bg-slate-50 p-2 text-slate-700">
              {JSON.stringify(cardData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

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
}> = ({ text, url, className = "", variant = "primary", onClick }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [paramId, setParamId] = useState<number | undefined>(undefined);

  const handleClick = () => {
    // 如果提供了外部的onClick处理函数，优先使用
    if (onClick) {
      onClick(url);
      return;
    }

    // 默认处理逻辑
    if (typeof url === "string") {
      // 处理URL链接
      window.open(url, "_blank");
    } else {
      // 处理内部页面跳转或弹窗
      const { pageName, paramId: id } = url;

      // 处理不同类型的弹窗
      if (pageName) {
        setModalType(pageName);
        setParamId(id);
        setModalVisible(true);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // 根据不同的variant设置不同的样式
  const buttonClassNames = clsx(
    "w-full rounded-md px-4 py-2 text-center transition-colors duration-200",
    {
      "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
      "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50":
        variant === "secondary",
      "bg-red-500 text-white hover:bg-red-600": variant === "danger",
    },
    className,
  );

  return (
    <>
      <button onClick={handleClick} className={buttonClassNames}>
        {text}
      </button>

      {/* 弹窗组件 */}
      <CardActionModal
        visible={modalVisible}
        onClose={closeModal}
        modalType={modalType}
        paramId={paramId}
      />
    </>
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
          <CardContainer cardData={data}>
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
          <CardContainer cardData={data}>
            <h4 className="mb-2 text-sm font-medium text-slate-500">{data.title}</h4>
            <div className="flex items-center space-x-3">
              <img
                src={data.icon}
                alt="商品图片"
                className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
              />
              <div className="flex-1">
                <p className="mb-1 line-clamp-2 text-sm font-medium text-slate-700">
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
          <CardContainer cardData={data}>
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-base font-semibold text-slate-800">{data.title}</h3>
              <StatusTag
                text={data.secondTitle.state}
                color={data.secondTitle.state_type_color}
              />
            </div>
            <p className="mb-3 text-xs text-slate-500">
              订单时间: {data.secondTitle.time}
            </p>
            <div className="mb-3 flex items-center space-x-3">
              <img
                src={data.icon}
                alt="商品图片"
                className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
              />
              <div className="flex-1">
                <p className="mb-1 line-clamp-2 text-sm text-slate-700">
                  {data.content}
                </p>
                <Price price={data.price} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
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

      case 4: {
        const data = cardData as IntelligentCardType4;
        return (
          <CardContainer cardData={data}>
            <div className="flex items-center justify-between">
              <h3 className="mr-4 flex-1 text-base font-semibold leading-relaxed text-slate-800">
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
          <CardContainer cardData={data}>
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
          <CardContainer cardData={data}>
            <h3 className="mb-3 text-base font-semibold text-slate-800">
              {data.title}
            </h3>
            <ul className="mb-4 space-y-1.5 pl-1 text-sm text-slate-600">
              {data.contentList.map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="mr-2 h-3 w-3 flex-shrink-0 text-emerald-500"
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
          <CardContainer cardData={data}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {data.labelList.map((label, index) => (
                  <Label key={index} text={label} />
                ))}
              </div>
              <StatusTag text={data.state.text} color={data.state.color} />
            </div>
            <p className="mb-2 line-clamp-2 text-sm font-medium text-slate-700">
              {data.content}
            </p>
            <div className="flex items-center justify-between">
              <Price price={data.price} />
              <CardButton
                text="查看订单"
                url={data.url}
                variant="secondary"
                className="px-3 py-1.5 text-xs"
                onClick={handleCardAction}
              />
            </div>
          </CardContainer>
        );
      }

      case 8: {
        const data = cardData as IntelligentCardType8;
        return (
          <CardContainer cardData={data}>
            <h3 className="mb-3 border-b border-slate-100 pb-2 text-base font-semibold text-slate-800">
              {data.title}
            </h3>
            <div className="space-y-1.5 text-sm">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-2 w-1/3 flex-shrink-0 pr-1 text-slate-500">
                    {item.key}:
                  </span>
                  <span className="min-w-0 flex-1 break-words font-medium text-slate-700">
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
          <CardContainer cardData={data}>
            <h3 className="mb-3 border-b border-slate-100 pb-2 text-base font-semibold text-slate-800">
              {data.title}
            </h3>
            <div className="mb-4 space-y-1.5 text-sm">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-2 w-1/3 flex-shrink-0 pr-1 text-slate-500">
                    {item.key}:
                  </span>
                  <span className="min-w-0 flex-1 break-words font-medium text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
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
          <CardContainer cardData={unknownData}>
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

      <CardActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalType={modalType}
        paramId={modalParamId}
      />
    </>
  );
};

export default CardMessageRender;
