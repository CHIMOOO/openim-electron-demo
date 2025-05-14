import "./index.scss";
import { Dropdown, Spin, Empty } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState, useRef, KeyboardEvent } from "react";

interface QuickPhrasesProps {
  visible: boolean;
  loading?: boolean;
  phrases?: Array<{ id: number; content: string }>;
  onSelect: (content: string) => void;
  onClose: () => void;
}

const QuickPhrases = ({
  visible,
  loading = false,
  phrases = [],
  onSelect,
  onClose,
}: QuickPhrasesProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && phrases.length > 0) {
      // 重置选中项为第一项
      setSelectedIndex(0);
    }
  }, [visible, phrases]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!visible) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < phrases.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Tab":
          if (phrases.length > 0) {
            e.preventDefault();
            const selectedPhrase = phrases[selectedIndex];
            if (selectedPhrase) {
              handleSelect(selectedPhrase.content);
            }
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, phrases, selectedIndex, onClose, onSelect]);

  const handleSelect = (content: string) => {
    onSelect(content);
    onClose();
  };

  const items: MenuProps["items"] = phrases.map((phrase, index) => ({
    key: String(phrase.id),
    label: (
      <div
        className={`phrase-item ${
          index === selectedIndex ? "phrase-item-selected" : ""
        }`}
        onClick={() => handleSelect(phrase.content)}
      >
        {phrase.content}
      </div>
    ),
  }));

  return (
    <Dropdown
      menu={{ items }}
      open={visible}
      onOpenChange={(flag) => {
        if (!flag) onClose();
      }}
      placement="topLeft"
      trigger={[]}
      overlayClassName="quick-phrases-dropdown "
      dropdownRender={(menu) => (
        <div className="bg-white rounded shadow-lg" ref={dropdownRef}>
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Spin size="small" />
            </div>
          ) : phrases.length === 0 ? (
            <Empty description="暂无快捷短语" className="py-4" />
          ) : (
            menu
          )}
        </div>
      )}
    >
      <div className="w-0 h-0" />
    </Dropdown>
  );
};

export default QuickPhrases;
