import { InfoCircleOutlined } from "@ant-design/icons";
import { SessionType } from "@openim/wasm-client-sdk";
import { useUnmount } from "ahooks";
import { Layout } from "antd";
import { t } from "i18next";
import { useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { OverlayVisibleHandle } from "@/hooks/useOverlayVisible";
import { useConversationStore } from "@/store";

import ChatContent from "./ChatContent";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import GroupInfoCard from "./GroupInfoCard";
import GroupSetting from "./GroupSetting";
import { useAutoQueryOrder } from "./useAutoQueryOrder";
import useConversationState from "./useConversationState";

export const QueryChat = () => {
  const groupSettingRef = useRef<OverlayVisibleHandle>(null);
  const updateCurrentConversation = useConversationStore(
    (state) => state.updateCurrentConversation,
  );
  const currentConversation = useConversationStore(
    (state) => state.currentConversation,
  );

  const isGroupSession = currentConversation?.conversationType === SessionType.Group;

  const { orderData } = useAutoQueryOrder();

  useConversationState();

  useUnmount(() => {
    updateCurrentConversation();
  });

  const openGroupSettings = () => {
    if (groupSettingRef.current) {
      groupSettingRef.current.openOverlay();
    }
  };

  return (
    <Layout id="chat-container" className="relative flex flex-row overflow-hidden">
      <div className="flex flex-col flex-1 h-full shrink-0">
        <ChatHeader />
        <PanelGroup direction="vertical">
          <Panel id="chat-main" order={0}>
            <ChatContent />
          </Panel>
          <PanelResizeHandle />
          <Panel
            id="chat-footer"
            order={1}
            defaultSize={25}
            maxSize={60}
            className="min-h-[200px]"
          >
            <ChatFooter />
          </Panel>
        </PanelGroup>
      </div>
      {isGroupSession && (
        <div className="flex h-full w-[320px] flex-shrink-0 flex-col">
          <GroupInfoCard onViewDetails={openGroupSettings} orderData={orderData} />
        </div>
      )}
      <GroupSetting ref={groupSettingRef} />
    </Layout>
  );
};
