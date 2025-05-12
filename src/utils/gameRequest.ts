import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "@/store";
import { feedbackToast } from "./common";

const createGameAxiosInstance = (baseURL: string) => {
  const serves = axios.create({
    baseURL,
    timeout: 25000,
  });

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

  serves.interceptors.response.use(
    (res) => {
      // 检查HTTP状态码
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      } else {
        return Promise.reject(res);
      }
    },
    (err) => {
      // 处理HTTP错误
      if (err.response) {
        if (err.response.status === 401) {
          // 401未授权，返回登录页面
          feedbackToast({
            msg: "登录已过期，请重新登录",
            error: "登录已过期，请重新登录",
            onClose: () => {
              useUserStore.getState().userLogout(true);
            },
          });
        } else {
          // 其他错误显示错误信息
          const errorMsg = err.response.data?.msg || "请求失败";
          feedbackToast({
            msg: errorMsg,
            error: errorMsg,
          });
        }
      } else if (err.message.includes("timeout")) {
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
      return Promise.reject(err);
    },
  );

  return serves;
};

export default createGameAxiosInstance;
