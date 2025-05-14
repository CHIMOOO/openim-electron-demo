import { FC, useMemo } from "react";
import { IMessageItemProps } from "./index";
import styles from "./message-item.module.scss";
import clsx from "clsx";

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
}> = ({ text, color, url, className, variant = "primary" }) => {
  const handleClick = () => {
    if (typeof url === "string") {
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

const CardMessageRender: FC<IMessageItemProps> = (props) => {
  const { message, isSender } = props;

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
            <div className="mt-3 text-right">
              <CardButton
                text="查看详情"
                url={data.url}
                variant="secondary"
                className="px-3 py-1.5 text-xs"
              />
            </div>
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
              <CardButton
                text={data.button.text}
                url={data.button.url}
                variant="primary"
              />
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
              <CardButton
                text={data.button.text}
                url={data.button.url}
                variant="primary"
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
              <CardButton
                text="查看订单"
                url={data.url}
                variant="secondary"
                className="px-3 py-1.5 text-xs"
              />
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
    <div
      className={clsx(
        styles["message-content"],
        isSender && styles["message-content-sender"],
      )}
    >
      {renderCard()}
    </div>
  );
};

export default CardMessageRender;
