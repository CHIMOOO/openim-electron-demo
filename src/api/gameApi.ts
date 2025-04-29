import { v4 as uuidv4 } from "uuid";
import { useMutation } from "react-query";

import createAxiosInstance from "@/utils/request";
import { getChatToken } from "@/utils/storage";

import { errorHandle } from "./errorHandle";

const request = createAxiosInstance(import.meta.env.VITE_GAME_URL as string);

// 用户注册
export const useRegister = () => {
  return useMutation(
    (params: API.Game.RegisterParams) =>
      request.post<{ token: string }>("/api/user/register", params, {
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
      request.post<{ token: string }>("/api/login", params, {
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
      request.post("/api/user/logout", params, {
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
      request.post("/api/send_sms", params, {
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
      request.post("/api/user/user_info_set", params, {
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
      request.post(
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
      request.post<API.Game.BalanceResponse>(
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
      request.post(
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
      request.post("/api/user/transaction", params, {
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
      request.post("/api/user/user_withdrawal", params, {
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
      request.post(
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
      request.post("/api/goods/goods_update", params, {
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
      request.post("/api/goods/goods_edit", params, {
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
      request.post("/api/goods/goods_details", params, {
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
      request.post(
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
      request.post<API.Game.BannerResponse>(
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
      request.post<API.Game.PosterResponse>(
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
      request.post<API.Game.WantBuyResponse>(
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
      request.post("/api/im_chat/assign_customer_service", params, {
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
      request.post("/api/im_chat/send_msg", params, {
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
      request.post("/api/im_chat/create_chat_group", params, {
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
      request.post(
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
      request.post("/api/game_goods_list", params || {}, {
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
      request.post(
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
      request.post("/api/goods/goods_details_update", params, {
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
      request.post(
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
      request.post("/api/game/game_pattern", params, {
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
      request.post(
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
      request.post(
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
      request.post("/api/main/goods_list", params, {
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
      request.post("/api/im_chat/offine", params, {
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
      request.post(
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
      request.post("/api/im_chat/send_customize_msg", params, {
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
      request.post("/api/im_chat/send_business_notification", params, {
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
      request.post("/api/im/create_group", params, {
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
      request.post("/api/im_group/kick_group_user", params, {
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
      request.post("/api/im_group/mute_group", params, {
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
      request.post("/api/im_group/get_groupinfo_by_imgroupid", params, {
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
      request.post("/api/im_chat/im_login", params, {
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
      request.post("/api/change_password", params, {
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
      request.post("/api/web_login", params, {
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
      request.post("/api/order/save", params, {
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
      request.post(
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
      request.post("/api/order/order_play", params, {
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
      request.post("/api/order/order_status_set", params, {
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
      request.post("/api/order/order_list", params, {
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
