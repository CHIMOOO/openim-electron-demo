import "./index.scss";
import { Dropdown, Spin, Empty } from "antd";
import type { MenuProps } from "antd";

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
  const handleSelect = (content: string) => {
    onSelect(content);
    onClose();
  };

  const items: MenuProps["items"] = phrases.map((phrase) => ({
    key: String(phrase.id),
    label: (
      <div className="phrase-item" onClick={() => handleSelect(phrase.content)}>
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
      placement="top"
      arrow={{ pointAtCenter: true }}
      trigger={[]}
      overlayClassName="quick-phrases-dropdown"
      dropdownRender={(menu) => (
        <div className="rounded bg-white shadow-lg">
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
      <div className="h-0 w-0" />
    </Dropdown>
  );
};

export default QuickPhrases;
