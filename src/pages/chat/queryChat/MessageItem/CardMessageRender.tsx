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
      className={clsx("rounded-md px-4 py-2 text-sm font-medium", className)}
      style={{ backgroundColor: color || "#EACA92", color: color ? "#fff" : "#333" }}
    >
      {text}
    </button>
  );
};

// 标签组件
const Label: FC<{ text: string }> = ({ text }) => (
  <span className="inline-block px-2 py-1 mr-2 text-xs rounded bg-amber-100 text-amber-800">
    {text}
  </span>
);

// 价格组件
const Price: FC<{ price: string }> = ({ price }) => (
  <div className="font-medium text-red-500">¥{price}</div>
);

// 状态显示组件
const StatusTag: FC<{ text: string; color: string }> = ({ text, color }) => (
  <span
    className="rounded px-2 py-0.5 text-xs font-medium"
    style={{ backgroundColor: `${color}20`, color }}
  >
    {text}
  </span>
);

const CardMessageRender: FC<IMessageItemProps> = (props) => {
  const { message, isSender } = props;

  // 解析消息内容
  const cardData = useMemo<IntelligentCard | null>(() => {
    try {
      // 假设message.content存储了卡片的JSON数据
      let content: any = JSON.parse(message.customElem?.data || "") || "";

      // 对于不同的消息格式，可能需要不同的解析方式

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
        <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-800">无效的卡片消息</h3>
        </div>
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
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800">{data.title}</h3>
            <p className="mt-2 text-gray-600">{data.content}</p>
          </div>
        );
      }

      case 2: {
        const data = cardData as IntelligentCardType2;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="mb-2 font-medium text-gray-800">{data.title}</h3>
            <div className="flex items-center">
              <img
                src={data.icon}
                alt="商品图片"
                className="object-cover w-16 h-16 mr-3 rounded-md"
              />
              <div className="flex-1">
                <p className="text-gray-700">{data.content}</p>
                <Price price={data.price} />
              </div>
            </div>
          </div>
        );
      }

      case 3: {
        const data = cardData as IntelligentCardType3;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800">{data.title}</h3>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{data.secondTitle.time}</span>
              <StatusTag
                text={data.secondTitle.state}
                color={data.secondTitle.state_type_color}
              />
            </div>
            <div className="flex items-center mt-2">
              <img
                src={data.icon}
                alt="商品图片"
                className="object-cover w-16 h-16 mr-3 rounded-md"
              />
              <div className="flex-1">
                <p className="text-gray-700">{data.content}</p>
                <Price price={data.price} />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <CardButton text={data.button.text} url={data.button.url} />
            </div>
          </div>
        );
      }

      case 4: {
        const data = cardData as IntelligentCardType4;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800">{data.title}</h3>
            <div className="flex justify-end mt-3">
              <CardButton text={data.button.text} url={data.button.url} />
            </div>
          </div>
        );
      }

      case 5: {
        const data = cardData as IntelligentCardType5;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium" style={{ color: data.title.color }}>
              {data.title.text}
            </h3>
            <p className="mt-2 text-gray-600">{data.content}</p>
            <div className="flex justify-end mt-3">
              <CardButton text={data.button.text} url={data.button.url} />
            </div>
          </div>
        );
      }

      case 6: {
        const data = cardData as IntelligentCardType6;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800">{data.title}</h3>
            <ul className="pl-5 mt-2 space-y-1 text-gray-600 list-disc">
              {data.contentList.map((item, index) => (
                <li key={index}>{item}</li>
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
          </div>
        );
      }

      case 7: {
        const data = cardData as IntelligentCardType7;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
              <div className="flex">
                {data.labelList.map((label, index) => (
                  <Label key={index} text={label} />
                ))}
              </div>
              <StatusTag text={data.state.text} color={data.state.color} />
            </div>
            <p className="text-gray-700">{data.content}</p>
            <Price price={data.price} />
          </div>
        );
      }

      case 8: {
        const data = cardData as IntelligentCardType8;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="mb-2 font-medium text-gray-800">{data.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex">
                  <span className="mr-2 text-gray-500">{item.key}:</span>
                  <span className="text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 9: {
        const data = cardData as IntelligentCardType9;
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="mb-2 font-medium text-gray-800">{data.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.contentJson.map((item, index) => (
                <div key={index} className="flex">
                  <span className="mr-2 text-gray-500">{item.key}:</span>
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
          </div>
        );
      }

      default:
        return (
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="font-medium text-gray-800">未知卡片类型</h3>
            <p className="mt-2 text-gray-600">类型: {type}</p>
          </div>
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
