import { FC, useEffect } from "react";
import { IMessageItemProps } from "./index";
import styles from "./message-item.module.scss";
import clsx from "clsx";

const CardMessageRender: FC<IMessageItemProps> = (props) => {
  const { message, isSender, disabled, conversationID } = props;

  useEffect(() => {
    console.log("卡片消息参数:", {
      message,
      isSender,
      disabled,
      conversationID,
    });
  }, [message, isSender, disabled, conversationID]);

  return (
    <div
      className={clsx(
        styles["message-content"],
        isSender && styles["message-content-sender"],
      )}
    >
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="font-medium text-gray-800">消息卡片 (类型: 110)</h3>
        <div className="mt-2 text-gray-600">
          <p>发送者: {message.senderNickname}</p>
          <p>消息ID: {message.clientMsgID}</p>
        </div>
      </div>
    </div>
  );
};

export default CardMessageRender;
