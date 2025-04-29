import { useEffect, useState } from "react";

import { useGetGroupInfo } from "@/api/gameApi";
import { useConversationStore } from "@/store";

interface GroupInfoApiData {
  imGroup?: {
    id: number;
    group_name: string;
    group_avatar: string;
    im_group_id: string;
    member_count: number;
    im_owner_id: string;
    seller_id: number;
    buyer_id: number;
    good_id: number;
    status: number;
    created_time: string;
    updated_time: string;
    delete_time: string;
  };
}

export function useGroupInfoApi() {
  const currentGroupInfo = useConversationStore((state) => state.currentGroupInfo);
  const [loading, setLoading] = useState(false);
  const [groupApiInfo, setGroupApiInfo] = useState<GroupInfoApiData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getGroupInfoMutation = useGetGroupInfo();

  useEffect(() => {
    if (currentGroupInfo?.groupID) {
      setLoading(true);
      setError(null);

      getGroupInfoMutation.mutate(
        { groupID: currentGroupInfo.groupID },
        {
          onSuccess: (response) => {
            setGroupApiInfo(response.data as GroupInfoApiData);
            setLoading(false);
          },
          onError: (err) => {
            console.error("获取群组信息失败", err);
            setError("获取群组信息失败");
            setLoading(false);
          },
        },
      );
    }
  }, [currentGroupInfo?.groupID]);

  return {
    groupApiInfo,
    loading,
    error,
    refetch: () => {
      if (currentGroupInfo?.groupID) {
        setLoading(true);
        getGroupInfoMutation.mutate(
          { groupID: currentGroupInfo.groupID },
          {
            onSuccess: (response) => {
              setGroupApiInfo(response.data as GroupInfoApiData);
              setLoading(false);
            },
            onError: (err) => {
              console.error("获取群组信息失败", err);
              setError("获取群组信息失败");
              setLoading(false);
            },
          },
        );
      }
    },
  };
}
