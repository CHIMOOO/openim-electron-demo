import { useEffect, useState, useCallback } from "react";

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
  const [isFetching, setIsFetching] = useState(false);

  const getGroupInfoMutation = useGetGroupInfo();

  // 提取公共的获取群组信息逻辑
  const fetchGroupInfo = useCallback(
    (groupID: string) => {
      // 避免重复请求
      if (isFetching) return;

      setLoading(true);
      setError(null);
      setIsFetching(true);

      getGroupInfoMutation.mutate(
        { groupID },
        {
          onSuccess: (response) => {
            setGroupApiInfo(response.data as GroupInfoApiData);
            setLoading(false);
            setIsFetching(false);
          },
          onError: (err) => {
            console.error("获取群组信息失败", err);
            setError("获取群组信息失败");
            setLoading(false);
            setIsFetching(false);
          },
        },
      );
    },
    [getGroupInfoMutation, isFetching],
  );

  // 首次加载或群ID变化时获取数据
  useEffect(() => {
    if (currentGroupInfo?.groupID) {
      fetchGroupInfo(currentGroupInfo.groupID);
    }
  }, [currentGroupInfo?.groupID, fetchGroupInfo]);

  return {
    groupApiInfo,
    loading,
    error,
    refetch: () => {
      if (currentGroupInfo?.groupID) {
        fetchGroupInfo(currentGroupInfo.groupID);
      }
    },
  };
}
