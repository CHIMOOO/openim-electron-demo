import { feedbackToast } from "@/utils/common";
import { useUserStore } from "@/store";

// 游戏API错误处理函数
export const gameErrorHandle = (error: any) => {
  // 判断是否为HTTP错误
  if (error.response) {
    const status = error.response.status;

    // 处理401未授权错误，返回登录页面
    if (status === 401) {
      feedbackToast({
        msg: "登录已过期，请重新登录",
        error: "登录已过期",
        onClose: () => {
          useUserStore.getState().userLogout(true);
        },
      });
      return;
    }

    // // 处理其他HTTP错误
    // const errMsg = error.response.data?.message || `请求失败: ${status}`;
    // feedbackToast({
    //   msg: errMsg,
    //   error: errMsg,
    // });
    return;
  }

  // 处理业务错误码
  if (error.errCode !== undefined) {
    // 判断错误码是否以2开头
    const errCodeStr = String(error.errCode);
    if (!errCodeStr.startsWith("2")) {
      feedbackToast({
        msg: error.errMsg || `错误码: ${error.errCode}`,
        error: error.errMsg || `错误码: ${error.errCode}`,
      });
    }
    return;
  }

  // 处理网络错误
  if (error.message) {
    if (error.message.includes("timeout")) {
      feedbackToast({
        msg: "请求超时，请稍后重试",
        error: "请求超时",
      });
    } else if (error.message.includes("Network Error")) {
      feedbackToast({
        msg: "网络错误，请检查网络连接",
        error: "网络错误",
      });
    } else {
      feedbackToast({
        msg: error.message,
        error: error.message,
      });
    }
    return;
  }

  // 处理未知错误
  feedbackToast({
    msg: "发生未知错误",
    error: "未知错误",
  });
};
