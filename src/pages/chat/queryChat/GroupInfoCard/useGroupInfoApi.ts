import { useEffect, useState, useRef } from "react";

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
    order_id?: string | number;
    status: number;
    created_time: string;
    updated_time: string;
    delete_time: string;
  };
}

// 使用全局Promise缓存，确保同一groupID只请求一次
const requestCache = new Map<string, Promise<GroupInfoApiData>>();

export function useGroupInfoApi() {
  const currentGroupInfo = useConversationStore((state) => state.currentGroupInfo);
  const [loading, setLoading] = useState(false);
  const [groupApiInfo, setGroupApiInfo] = useState<GroupInfoApiData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 请求标识符，用于处理组件卸载后异步回调的问题
  const requestIdRef = useRef(0);
  // 获取api/im_group/get_groupinfo_by_imgroupid
  const getGroupInfoMutation = useGetGroupInfo();

  // 创建请求函数，返回可缓存的Promise
  const createRequest = (groupID: string): Promise<GroupInfoApiData> => {
    return new Promise((resolve, reject) => {
      getGroupInfoMutation.mutate(
        { groupID },
        {
          onSuccess: (response) => {
            const data = response.data as GroupInfoApiData;
            resolve(data);
          },
          onError: (error) => {
            console.error("获取群组信息失败", error);
            reject(error);
          },
        },
      );
    });
  };

  useEffect(() => {
    if (!currentGroupInfo?.groupID) return;

    // 增加请求标识符，用于避免组件卸载后状态更新
    const currentRequestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    // 检查缓存中是否已有相同groupID的请求
    let request = requestCache.get(currentGroupInfo.groupID);

    // 如果没有缓存的请求，创建新请求并缓存
    if (!request) {
      request = createRequest(currentGroupInfo.groupID);
      requestCache.set(currentGroupInfo.groupID, request);
    }

    // 处理请求结果
    request
      .then((data) => {
        // 仅当组件未卸载时更新状态
        if (currentRequestId === requestIdRef.current) {
          setGroupApiInfo(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        // 仅当组件未卸载时更新状态
        if (currentRequestId === requestIdRef.current) {
          console.error("获取群组信息失败", error);
          setError("获取群组信息失败");
          setLoading(false);
        }

        // 从缓存中移除失败的请求，允许重试
        requestCache.delete(currentGroupInfo.groupID);
      });

    // 组件卸载时清理
    return () => {
      // 不需要取消请求，只需确保不更新已卸载组件的状态
    };
  }, [currentGroupInfo?.groupID]);

  // 手动刷新函数，强制重新请求并更新缓存
  const refetch = () => {
    if (!currentGroupInfo?.groupID) return;

    // 从缓存中移除当前groupID的请求
    requestCache.delete(currentGroupInfo.groupID);

    // 增加请求标识符
    const currentRequestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    // 创建新请求并缓存
    const request = createRequest(currentGroupInfo.groupID);
    requestCache.set(currentGroupInfo.groupID, request);

    // 处理请求结果
    request
      .then((data) => {
        if (currentRequestId === requestIdRef.current) {
          setGroupApiInfo(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (currentRequestId === requestIdRef.current) {
          console.error("获取群组信息失败", error);
          setError("获取群组信息失败");
          setLoading(false);
        }
        requestCache.delete(currentGroupInfo.groupID);
      });
  };

  return {
    groupApiInfo,
    loading,
    error,
    refetch,
  };
}
