import { useEffect, useState } from "react";
import { useGetCommonPhrases } from "@/api/gameApi";

export const useQuickPhrases = () => {
  const [visible, setVisible] = useState(false);
  const [phrases, setPhrases] = useState<API.Game.CommonPhrasesResponse["data"]>([]);
  const [loading, setLoading] = useState(false);

  const getCommonPhrases = useGetCommonPhrases();

  // 在钩子初始化时就获取快捷短语
  useEffect(() => {
    fetchPhrases();
  }, []);

  const openQuickPhrases = () => {
    setVisible(true);
  };

  const closeQuickPhrases = () => {
    setVisible(false);
  };

  const fetchPhrases = async () => {
    if (phrases.length > 0) return;

    setLoading(true);
    try {
      const response = await getCommonPhrases.mutateAsync();
      setPhrases(response.data.data || []);
    } catch (error) {
      console.error("获取快捷短语失败", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    visible,
    phrases,
    loading,
    openQuickPhrases,
    closeQuickPhrases,
  };
};
