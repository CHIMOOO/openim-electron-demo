import { FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./message-item.module.scss";

const CatchMessageRender: FC = (props) => {
  const { t } = useTranslation();
  const text = props?.message?.atTextElem?.text;

  return (
    <div className={styles.bubble}>{t("messageDescription.catchMessage") + text}</div>
  );
};

export default CatchMessageRender;
