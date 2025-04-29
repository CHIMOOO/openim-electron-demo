import { CopyOutlined, UserOutlined } from "@ant-design/icons";
import { AllowType } from "@openim/wasm-client-sdk";
import { Avatar, Button, Divider, Tooltip } from "antd";
import { FC, memo } from "react";
import { useCopyToClipboard } from "react-use";

import OIMAvatar from "@/components/OIMAvatar";
import { useCurrentMemberRole } from "@/hooks/useCurrentMemberRole";
import { useConversationStore } from "@/store";
import { feedbackToast } from "@/utils/common";

interface GroupInfoCardProps {
  onViewDetails?: () => void;
}

const GroupInfoCard: FC<GroupInfoCardProps> = ({ onViewDetails }) => {
  const currentGroupInfo = useConversationStore((state) => state.currentGroupInfo);
  const currentMemberInGroup = useConversationStore(
    (state) => state.currentMemberInGroup,
  );
  const { isOwner, isAdmin } = useCurrentMemberRole();
  const [_, copyToClipboard] = useCopyToClipboard();

  const hasPermissions = isAdmin || isOwner;

  if (!currentGroupInfo) {
    return null;
  }

  const copyGroupId = () => {
    copyToClipboard(currentGroupInfo.groupID);
    feedbackToast({ msg: "复制成功" });
  };

  const memberCount = currentGroupInfo.memberCount || 0;

  return (
    <div className="flex h-full flex-col border-l border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-center">
        <div className="text-center">
          <OIMAvatar
            isgroup
            size={64}
            src={currentGroupInfo.faceURL}
            text={currentGroupInfo.groupName}
          />
          <h3 className="mt-2 font-medium">{currentGroupInfo.groupName}</h3>
        </div>
      </div>

      <Divider className="my-2" />

      <div className="mb-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">群ID</span>
          <div className="flex items-center">
            <span className="mr-1 text-xs text-gray-500">
              {currentGroupInfo.groupID}
            </span>
            <Tooltip title="复制">
              <CopyOutlined
                className="cursor-pointer text-gray-400 hover:text-blue-500"
                onClick={copyGroupId}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">群成员</span>
          <span className="text-xs text-gray-500">{memberCount}</span>
        </div>
      </div>

      {currentGroupInfo.notification && (
        <div className="mb-2">
          <div className="flex flex-col">
            <span className="mb-1 text-sm text-gray-600">群公告</span>
            <div className="rounded-md bg-gray-50 p-2 text-xs text-gray-700">
              {currentGroupInfo.notification}
            </div>
          </div>
        </div>
      )}

      {currentMemberInGroup?.joinTime && (
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">加入时间</span>
            <span className="text-xs text-gray-500">
              {new Date(Number(currentMemberInGroup.joinTime)).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <div className="mt-auto">
        <Button type="primary" block onClick={onViewDetails}>
          查看更多详情
        </Button>
      </div>
    </div>
  );
};

export default memo(GroupInfoCard);
