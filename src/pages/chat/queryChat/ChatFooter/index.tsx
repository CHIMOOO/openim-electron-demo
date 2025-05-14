import { useLatest } from "ahooks";
import { Button } from "antd";
import { t } from "i18next";
import { forwardRef, ForwardRefRenderFunction, memo, useRef, useState } from "react";

import CKEditor from "@/components/CKEditor";
import { getCleanText } from "@/components/CKEditor/utils";
import QuickPhrases from "@/components/QuickPhrases";
import { useQuickPhrases } from "@/hooks/useQuickPhrases";
import i18n from "@/i18n";
import { IMSDK } from "@/layout/MainContentWrap";

import SendActionBar from "./SendActionBar";
import { useFileMessage } from "./SendActionBar/useFileMessage";
import { useSendMessage } from "./useSendMessage";
import "./index.scss";

const sendActions = [
  { label: t("placeholder.sendWithEnter"), key: "enter" },
  { label: t("placeholder.sendWithShiftEnter"), key: "enterwithshift" },
];

i18n.on("languageChanged", () => {
  sendActions[0].label = t("placeholder.sendWithEnter");
  sendActions[1].label = t("placeholder.sendWithShiftEnter");
});

const ChatFooter: ForwardRefRenderFunction<unknown, unknown> = (_, ref) => {
  const [html, setHtml] = useState("");
  const latestHtml = useLatest(html);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });

  const { getImageMessage } = useFileMessage();
  const { sendMessage } = useSendMessage();
  const { visible, phrases, loading, openQuickPhrases, closeQuickPhrases } =
    useQuickPhrases();

  const onChange = (value: string) => {
    setHtml(value);
  };

  const handleQuickPhraseSelect = (content: string) => {
    setHtml((prevHtml) => {
      const trimmedHtml = prevHtml.trim();

      // Case 1: CKEditor wraps a lone slash as "<p>/</p>"
      if (trimmedHtml === "<p>/</p>") {
        return `<p>${content}</p>`;
      }

      // Case 2: CKEditor has content like "<p>some text /</p>" or "<p>some text/</p>"
      // Replace the slash that's immediately before the closing </p> tag.
      const slashAtEndOfPTagRegex = /\/(<\/p>\s*)$/;
      if (slashAtEndOfPTagRegex.test(trimmedHtml)) {
        return trimmedHtml.replace(slashAtEndOfPTagRegex, `${content}$1`);
      }

      // Case 3: Handle plain text ending with "/" (less likely with CKEditor but for robustness)
      // Use original prevHtml here.
      if (prevHtml.endsWith("/")) {
        return prevHtml.slice(0, -1) + content;
      }

      // Fallback: If no specific slash pattern is matched, append the content.
      // This might occur if the slash is part of a more complex HTML structure.
      console.log(
        "QuickPhrases: Unhandled HTML structure for slash replacement, appending content. HTML:",
        prevHtml,
      );
      return prevHtml + content;
    });
  };

  const handleSlashInput = (position: { top: number; left: number }) => {
    // 获取编辑器容器的位置信息
    const editorRect = editorWrapperRef.current?.getBoundingClientRect();

    if (editorRect) {
      // 将绝对位置转换为相对于编辑器容器的位置
      // 注意：光标位置是相对于窗口的，需要减去编辑器容器相对于窗口的位置
      const relativeTop = position.top - editorRect.top;
      const relativeLeft = position.left - editorRect.left;

      // 添加一些偏移量，使下拉框位置更合适
      const offsetTop = -10; // 在光标上方10px

      setCursorPosition({
        top: Math.max(0, relativeTop + offsetTop),
        left: relativeLeft, // 与光标左侧对齐，不再使用额外的左边距
      });

      console.log("光标位置:", {
        window: position,
        relative: { top: relativeTop, left: relativeLeft },
        final: { top: relativeTop + offsetTop, left: relativeLeft },
      });
    }

    openQuickPhrases();
  };

  const enterToSend = async () => {
    const cleanText = getCleanText(latestHtml.current);
    const message = (await IMSDK.createTextMessage(cleanText)).data;
    setHtml("");
    if (!cleanText) return;

    sendMessage({ message });
  };

  return (
    <footer className="relative h-full py-px bg-white">
      <div className="flex h-full flex-col border-t border-t-[var(--gap-text)]">
        <SendActionBar sendMessage={sendMessage} getImageMessage={getImageMessage} />
        <div
          className="relative flex flex-col flex-1 overflow-hidden"
          ref={editorWrapperRef}
        >
          <CKEditor
            value={html}
            onEnter={enterToSend}
            onChange={onChange}
            onSlashInput={handleSlashInput}
          />
          <div
            className="quick-phrases-container"
            style={{
              top: cursorPosition.top,
              left: cursorPosition.left,
            }}
          >
            <QuickPhrases
              visible={visible}
              phrases={phrases}
              loading={loading}
              onSelect={handleQuickPhraseSelect}
              onClose={closeQuickPhrases}
            />
          </div>
          <div className="flex items-center justify-end py-2 pr-3">
            <Button className="px-6 py-1 w-fit" type="primary" onClick={enterToSend}>
              {t("placeholder.send")}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(forwardRef(ChatFooter));
