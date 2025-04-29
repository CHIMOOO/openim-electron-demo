import { v4 as uuidv4 } from "uuid";
import { useMutation } from "react-query";

import createAxiosInstance from "@/utils/request";
import { getChatToken } from "@/utils/storage";

import { errorHandle } from "./errorHandle";

// 根据环境使用不同的URL
// 开发环境使用代理地址，生产环境直接使用目标地址
const isDev = import.meta.env.MODE === "development";
const baseURL = isDev ? "/baseApi" : "http://175.178.161.210:8080";
const request = createAxiosInstance(baseURL);

// 创建Axios实例但不检查errCode
const noCheckRequest = createAxiosInstance(baseURL, false, false);

// 用户注册
export const useRegister = () => {
  return useMutation(
    (params: API.Game.RegisterParams) =>
      noCheckRequest.post<{ token: string }>("/api/user/register", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 用户登录
export const useLogin = () => {
  return useMutation(
    (params: API.Game.LoginParams) =>
      noCheckRequest.post<{ token: string }>("/api/login", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 用户退出
export const useLogout = () => {
  return useMutation(
    (params: API.Game.LogoutParams) =>
      noCheckRequest.post("/api/user/logout", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 发送验证码
export const useSendSms = () => {
  return useMutation(
    (params: API.Game.SendSmsParams) =>
      noCheckRequest.post("/api/send_sms", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 用户信息设置
export const useUserInfoSet = () => {
  return useMutation(
    (params: API.Game.UserInfoSetParams) =>
      noCheckRequest.post("/api/user/user_info_set", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取用户信息
export const useGetUserInfo = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/user/info",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取钱包余额
export const useGetBalance = () => {
  return useMutation(
    () =>
      noCheckRequest.post<API.Game.BalanceResponse>(
        "/api/user/balance",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取实名认证列表
export const useGetRealNameList = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/user/realname_list",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取交易流水列表
export const useGetTransactionList = () => {
  return useMutation(
    (params: API.Game.TransactionParams) =>
      noCheckRequest.post("/api/user/transaction", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 用户提现
export const useWithdrawal = () => {
  return useMutation(
    (params: API.Game.WithdrawalParams) =>
      noCheckRequest.post("/api/user/user_withdrawal", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取商品列表
export const useGetGoodsList = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/goods/goods_list",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 更新商品信息
export const useUpdateGoods = () => {
  return useMutation(
    (params: API.Game.UpdateGoodsParams) =>
      noCheckRequest.post("/api/goods/goods_update", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 编辑商品信息
export const useEditGoods = () => {
  return useMutation(
    (params: API.Game.EditGoodsParams) =>
      noCheckRequest.post("/api/goods/goods_edit", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取商品详情
export const useGetGoodsDetails = () => {
  return useMutation(
    (params: API.Game.GoodsDetailsParams) =>
      noCheckRequest.post("/api/goods/goods_details", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取交易模式列表
export const useGetGameType = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/game/game_type",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取首页轮播图
export const useGetBannerImages = () => {
  return useMutation(
    () =>
      noCheckRequest.post<API.Game.BannerResponse>(
        "/api/images/get_banner_img",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取海报图片
export const useGetPosterImage = () => {
  return useMutation(
    () =>
      noCheckRequest.post<API.Game.PosterResponse>(
        "/api/images/get_poster_img",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取我要买主页图
export const useGetWantBuyImage = () => {
  return useMutation(
    () =>
      noCheckRequest.post<API.Game.WantBuyResponse>(
        "/api/images/my_want_buy_img",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// IM客服分配
export const useAssignCustomerService = () => {
  return useMutation(
    (params: API.Game.AssignCustomerServiceParams) =>
      noCheckRequest.post("/api/im_chat/assign_customer_service", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 发送消息
export const useSendMessage = () => {
  return useMutation(
    (params: API.Game.SendMessageParams) =>
      noCheckRequest.post("/api/im_chat/send_msg", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 创建群聊
export const useCreateChatGroup = () => {
  return useMutation(
    (params: API.Game.CreateChatGroupParams) =>
      noCheckRequest.post("/api/im_chat/create_chat_group", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取游戏列表
export const useGetGameList = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/main/index",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取游戏商品信息
export const useGetGameGoodsList = () => {
  return useMutation(
    (params?: API.Game.GameGoodsListParams) =>
      noCheckRequest.post("/api/game_goods_list", params || {}, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取商品设置列表
export const useGetGoodsSettingList = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/goods/goods_setting_list",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 发布/更新商品详情
export const useUpdateGoodsDetails = () => {
  return useMutation(
    (params: API.Game.UpdateGoodsDetailsParams) =>
      noCheckRequest.post("/api/goods/goods_details_update", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取设备与运营商信息
export const useGetDeviceService = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/game/device_service",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取游戏模式列表
export const useGetGamePattern = () => {
  return useMutation(
    (params: API.Game.GamePatternParams) =>
      noCheckRequest.post("/api/game/game_pattern", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取交易模式列表
export const useGetPatternList = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/main/pattern",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取商品分类
export const useGetCategoryList = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/main/category",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 获取指定商品列表
export const useGetSpecificGoodsList = () => {
  return useMutation(
    (params: API.Game.SpecificGoodsListParams) =>
      noCheckRequest.post("/api/main/goods_list", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// IM强制下线
export const useOffline = () => {
  return useMutation(
    (params: API.Game.OfflineParams) =>
      noCheckRequest.post("/api/im_chat/offine", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取常用快捷短语
export const useGetCommonPhrases = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/im_chat/get_common_phrases",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 发送自定义消息
export const useSendCustomizeMsg = () => {
  return useMutation(
    (params: API.Game.SendCustomizeMsgParams) =>
      noCheckRequest.post("/api/im_chat/send_customize_msg", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 发送业务通知
export const useSendBusinessNotification = () => {
  return useMutation(
    (params: API.Game.SendBusinessNotificationParams) =>
      noCheckRequest.post("/api/im_chat/send_business_notification", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 创建IM群组
export const useCreateGroup = () => {
  return useMutation(
    (params: API.Game.CreateGroupParams) =>
      noCheckRequest.post("/api/im/create_group", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 从群组移除用户
export const useKickGroupUser = () => {
  return useMutation(
    (params: API.Game.KickGroupUserParams) =>
      noCheckRequest.post("/api/im_group/kick_group_user", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 群组禁言
export const useMuteGroup = () => {
  return useMutation(
    (params: API.Game.MuteGroupParams) =>
      noCheckRequest.post("/api/im_group/mute_group", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取群组信息
export const useGetGroupInfo = () => {
  return useMutation(
    (params: API.Game.GroupInfoParams) =>
      noCheckRequest.post("/api/im_group/get_groupinfo_by_imgroupid", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// IM用户登录
export const useImLogin = () => {
  return useMutation(
    (params: API.Game.ImLoginParams) =>
      noCheckRequest.post("/api/im_chat/im_login", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 修改密码
export const useChangePassword = () => {
  return useMutation(
    (params: API.Game.ChangePasswordParams) =>
      noCheckRequest.post("/api/change_password", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// Web登录
export const useWebLogin = () => {
  return useMutation(
    (params: API.Game.WebLoginParams) =>
      noCheckRequest.post("/api/web_login", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 保存订单
export const useSaveOrder = () => {
  return useMutation(
    (params: API.Game.SaveOrderParams) =>
      noCheckRequest.post("/api/order/save", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取赔偿信息
export const useGetReparation = () => {
  return useMutation(
    () =>
      noCheckRequest.post(
        "/api/order/reparation",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: errorHandle,
    },
  );
};

// 订单支付
export const useOrderPlay = () => {
  return useMutation(
    (params: API.Game.OrderPlayParams) =>
      noCheckRequest.post("/api/order/order_play", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 设置订单状态
export const useSetOrderStatus = () => {
  return useMutation(
    (params: API.Game.SetOrderStatusParams) =>
      noCheckRequest.post("/api/order/order_status_set", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};

// 获取订单列表
export const useGetOrderList = () => {
  return useMutation(
    (params: API.Game.OrderListParams) =>
      noCheckRequest.post("/api/order/order_list", params, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          operationID: uuidv4(),
        },
      }),
    {
      onError: errorHandle,
    },
  );
};
