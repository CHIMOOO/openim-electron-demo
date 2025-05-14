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

// 通用按钮组件
const CardButton: FC<{
  text: string;
  color?: string;
  url: string | { platform: number; pageName: string; paramId: number };
  className?: string;
}> = ({ text, color, url, className }) => {
  const handleClick = () => {
    if (typeof url === "string") {
      window.open(url, "_blank");
    } else {
      console.log("跳转到应用内页面:", url);
      // 在这里实现内部导航逻辑
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "rounded-lg px-4 py-2 text-sm font-medium transition-all hover:opacity-90",
        className,
      )}
      style={{
        backgroundColor: color || "#EACA92",
        color: color ? (color === "#EACA92" ? "#333" : "#fff") : "#333",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      {text}
    </button>
  );
};

// 标签组件
const Label: FC<{ text: string }> = ({ text }) => (
  <span className="inline-block px-2 py-1 mr-2 text-xs border rounded-md border-amber-100 bg-amber-50 text-amber-800">
    {text}
  </span>
);

// 价格组件
const Price: FC<{ price: string }> = ({ price }) => (
  <div className="text-base font-medium text-red-500">¥{price}</div>
);

// 状态显示组件
const StatusTag: FC<{ text: string; color: string }> = ({ text, color }) => (
  <span
    className="rounded-md px-2 py-0.5 text-xs font-medium"
    style={{ backgroundColor: `${color}20`, color }}
  >
    {text}
  </span>
);

// 卡片基础容器组件
const CardContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4 transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
    {children}
  </div>
);

const CardMessageRender: FC<IMessageItemProps> = (props) => {
  const { message, isSender } = props;

  // 解析消息内容
  const cardData = useMemo<IntelligentCard | null>(() => {
    try {
      // 假设message.content存储了卡片的JSON数据
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
          <h3 className="font-medium text-gray-800">无效的卡片消息</h3>
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
            <h3 className="text-base font-medium text-gray-800">{data.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{data.content}</p>
          </CardContainer>
        );
      }

      case 2: {
        const data = cardData as IntelligentCardType2;
        return (
          <CardContainer>
            <h3 className="pb-2 mb-3 font-medium text-gray-800 border-b border-gray-100">
              {data.title}
            </h3>
            <div className="flex items-center">
              <img
                src={data.icon}
                alt="商品图片"
                className="object-cover w-16 h-16 mr-3 border border-gray-100 rounded-lg"
              />
              <div className="flex-1">
                <p className="mb-1 text-sm text-gray-700 line-clamp-2">
                  {data.content}
                </p>
                <Price price={data.price} />
              </div>
            </div>
          </CardContainer>
        );
      }

      case 3: {
        const data = cardData as IntelligentCardType3;
        return (
          <CardContainer>
            <h3 className="mb-1 font-medium text-gray-800">{data.title}</h3>
            <div className="flex justify-between pb-2 mt-1 mb-3 text-xs text-gray-500 border-b border-gray-100">
              <span>{data.secondTitle.time}</span>
              <StatusTag
                text={data.secondTitle.state}
                color={data.secondTitle.state_type_color}
              />
            </div>
            <div className="flex items-center">
              <img
                src={data.icon}
                alt="商品图片"
                className="object-cover w-16 h-16 mr-3 border border-gray-100 rounded-lg"
              />
              <div className="flex-1">
                <p className="mb-1 text-sm text-gray-700 line-clamp-2">
                  {data.content}
                </p>
                <Price price={data.price} />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <CardButton text={data.button.text} url={data.button.url} />
            </div>
          </CardContainer>
        );
      }

      case 4: {
        const data = cardData as IntelligentCardType4;
        return (
          <CardContainer>
            <h3 className="mb-3 font-medium leading-relaxed text-gray-800">
              {data.title}
            </h3>
            <div className="flex justify-end">
              <CardButton text={data.button.text} url={data.button.url} />
            </div>
          </CardContainer>
        );
      }

      case 5: {
        const data = cardData as IntelligentCardType5;
        return (
          <CardContainer>
            <h3
              className="mb-2 text-lg font-medium"
              style={{ color: data.title.color }}
            >
              {data.title.text}
            </h3>
            <p className="mt-2 mb-3 text-sm leading-relaxed text-gray-600">
              {data.content}
            </p>
            <div className="flex justify-end mt-3">
              <CardButton text={data.button.text} url={data.button.url} />
            </div>
          </CardContainer>
        );
      }

      case 6: {
        const data = cardData as IntelligentCardType6;
        return (
          <CardContainer>
            <h3 className="mb-3 font-medium text-gray-800">{data.title}</h3>
            <ul className="pl-5 mt-2 mb-4 space-y-2 text-sm text-gray-600 list-disc">
              {data.contentList.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-3">
              {data.buttonList.map((btn, index) => (
                <CardButton
                  key={index}
                  text={btn.text}
                  color={btn.color}
                  url={btn.url}
                  className={index === 0 ? "mr-2" : ""}
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
            <div className="flex items-center justify-between mb-3">
              <div className="flex">
                {data.labelList.map((label, index) => (
                  <Label key={index} text={label} />
                ))}
              </div>
              <StatusTag text={data.state.text} color={data.state.color} />
            </div>
            <p className="mb-2 text-sm text-gray-700 line-clamp-2">{data.content}</p>
            <Price price={data.price} />
          </CardContainer>
        );
      }

      case 8: {
        const data = cardData as IntelligentCardType8;
        return (
          <CardContainer>
            <h3 className="pb-2 mb-3 font-medium text-gray-800 border-b border-gray-100">
              {data.title}
            </h3>
            <div className="grid grid-cols-2 text-sm gap-x-4 gap-y-2">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex">
                  <span className="mr-2 min-w-[4.5rem] text-gray-500">{item.key}:</span>
                  <span className="text-gray-800">{item.value}</span>
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
            <h3 className="pb-2 mb-3 font-medium text-gray-800 border-b border-gray-100">
              {data.title}
            </h3>
            <div className="grid grid-cols-2 mb-4 text-sm gap-x-4 gap-y-2">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex">
                  <span className="mr-2 min-w-[4.5rem] text-gray-500">{item.key}:</span>
                  <span className="font-medium text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-3">
              <CardButton
                text={data.button.text}
                url={data.button.url}
                color="#EACA92"
                className="w-full"
              />
            </div>
          </CardContainer>
        );
      }

      default:
        return (
          <CardContainer>
            <h3 className="font-medium text-gray-800">未知卡片类型</h3>
            <p className="mt-2 text-gray-600">类型: {type}</p>
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
