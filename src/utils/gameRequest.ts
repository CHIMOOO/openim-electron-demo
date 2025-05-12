import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/store";
import { feedbackToast } from "./common";

/**
 * 创建游戏API的Axios实例，包含统一的请求/响应拦截器和错误处理
 * @param baseURL 基础URL
 * @returns Axios实例
 */
const createGameAxiosInstance = (baseURL: string) => {
  const serves = axios.create({
    baseURL,
    timeout: 25000,
  });

  // 请求拦截器：添加token和操作ID
  serves.interceptors.request.use(
    async (config) => {
      // 如果有token，添加到请求头
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      config.headers.operationID = uuidv4();
      return config;
    },
    (err) => Promise.reject(err),
  );

  // 响应拦截器：处理成功响应和错误
  serves.interceptors.response.use(
    (res) => {
      // 检查HTTP状态码
      if (res.status >= 200 && res.status < 300) {
        // 检查业务错误码
        if (res.data && res.data.errCode !== undefined) {
          const errCodeStr = String(res.data.errCode);
          // 非2开头的错误码显示错误信息
          if (!errCodeStr.startsWith("2")) {
            feedbackToast({
              msg: res.data.errMsg || `错误码: ${res.data.errCode}`,
              error: res.data.errMsg || `错误码: ${res.data.errCode}`,
            });
            return Promise.reject(res.data);
          }
        }
        return res.data;
      } else {
        return Promise.reject(res);
      }
    },
    (err) => {
      // 处理HTTP错误
      if (err.response) {
        const status = err.response.status;

        // 处理401未授权错误，返回登录页面
        if (status === 401) {
          feedbackToast({
            msg: "登录已过期，请重新登录",
            error: "登录已过期，请重新登录",
            onClose: () => {
              useUserStore.getState().userLogout(true);
            },
          });
        } else {
          // 其他错误显示错误信息
          const errorMsg =
            err.response.data?.msg ||
            err.response.data?.message ||
            err.response.data?.error ||
            `请求失败: ${status}`;
          feedbackToast({
            msg: errorMsg,
            error: errorMsg,
          });
        }
      } else if (err.message) {
        // 处理网络错误
        if (err.message.includes("timeout")) {
          feedbackToast({
            msg: "请求超时，请稍后重试",
            error: "请求超时",
          });
          console.error("timeout error", err);
        } else if (err.message.includes("Network Error")) {
          feedbackToast({
            msg: "网络错误，请检查网络连接",
            error: "网络错误",
          });
          console.error("network error", err);
        } else {
          feedbackToast({
            msg: err.message || "未知错误",
            error: err.message || "未知错误",
          });
          console.error("unknown error", err);
        }
      } else {
        // 处理未知错误
        feedbackToast({
          msg: "发生未知错误",
          error: "未知错误",
        });
        console.error("unknown error", err);
      }
      return Promise.reject(err);
    },
  );

  return serves;
};

export default createGameAxiosInstance;
