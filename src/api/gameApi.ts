import { v4 as uuidv4 } from "uuid";
import { useMutation } from "react-query";

// 导入新的游戏API请求实例
import createGameAxiosInstance from "@/utils/gameRequest";
import { gameErrorHandle } from "./gameErrorHandle";

// 根据环境使用不同的URL
// 开发环境使用代理地址，生产环境直接使用目标地址
const isDev = import.meta.env.MODE === "development";
const baseURL = isDev ? "/baseApi" : "http://175.178.161.210:8080";

// 创建游戏API请求实例
const gameRequest = createGameAxiosInstance(baseURL);

// 用户注册
export const useRegister = () => {
  return useMutation(
    (params: API.Game.RegisterParams) =>
      gameRequest.post<{ token: string }>("/api/user/register", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 用户登录
export const useLogin = () => {
  return useMutation(
    (params: API.Game.LoginParams) =>
      gameRequest.post<{ token: string }>("/api/login", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 用户退出
export const useLogout = () => {
  return useMutation(
    (params: API.Game.LogoutParams) =>
      gameRequest.post("/api/user/logout", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 发送验证码
export const useSendSms = () => {
  return useMutation(
    (params: API.Game.SendSmsParams) =>
      gameRequest.post("/api/send_sms", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 用户信息设置
export const useUserInfoSet = () => {
  return useMutation(
    (params: API.Game.UserInfoSetParams) =>
      gameRequest.post("/api/user/user_info_set", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取用户信息
export const useGetUserInfo = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/user/info",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取钱包余额
export const useGetBalance = () => {
  return useMutation(
    () =>
      gameRequest.post<API.Game.BalanceResponse>(
        "/api/user/balance",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取实名认证列表
export const useGetRealNameList = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/user/realname_list",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取交易流水列表
export const useGetTransactionList = () => {
  return useMutation(
    (params: API.Game.TransactionParams) =>
      gameRequest.post("/api/user/transaction", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 用户提现
export const useWithdrawal = () => {
  return useMutation(
    (params: API.Game.WithdrawalParams) =>
      gameRequest.post("/api/user/user_withdrawal", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取商品列表
export const useGetGoodsList = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/goods/goods_list",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 更新商品信息
export const useUpdateGoods = () => {
  return useMutation(
    (params: API.Game.UpdateGoodsParams) =>
      gameRequest.post("/api/goods/goods_update", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 编辑商品信息
export const useEditGoods = () => {
  return useMutation(
    (params: API.Game.EditGoodsParams) =>
      gameRequest.post("/api/goods/goods_edit", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取商品详情
export const useGetGoodsDetails = () => {
  return useMutation(
    (params: API.Game.GoodsDetailsParams) =>
      gameRequest.post("/api/goods/goods_details", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取交易模式列表
export const useGetGameType = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/game/game_type",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取首页轮播图
export const useGetBannerImages = () => {
  return useMutation(
    () =>
      gameRequest.post<API.Game.BannerResponse>(
        "/api/images/get_banner_img",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取海报图片
export const useGetPosterImage = () => {
  return useMutation(
    () =>
      gameRequest.post<API.Game.PosterResponse>(
        "/api/images/get_poster_img",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取我要买主页图
export const useGetWantBuyImage = () => {
  return useMutation(
    () =>
      gameRequest.post<API.Game.WantBuyResponse>(
        "/api/images/my_want_buy_img",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// IM客服分配
export const useAssignCustomerService = () => {
  return useMutation(
    (params: API.Game.AssignCustomerServiceParams) =>
      gameRequest.post("/api/im_chat/assign_customer_service", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 发送消息
export const useSendMessage = () => {
  return useMutation(
    (params: API.Game.SendMessageParams) =>
      gameRequest.post("/api/im_chat/send_msg", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 创建群聊
export const useCreateChatGroup = () => {
  return useMutation(
    (params: API.Game.CreateChatGroupParams) =>
      gameRequest.post("/api/im_chat/create_chat_group", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取游戏列表
export const useGetGameList = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/main/index",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取游戏商品信息
export const useGetGameGoodsList = () => {
  return useMutation(
    (params?: API.Game.GameGoodsListParams) =>
      gameRequest.post("/api/game_goods_list", params || {}, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取商品设置列表
export const useGetGoodsSettingList = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/goods/goods_setting_list",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 发布/更新商品详情
export const useUpdateGoodsDetails = () => {
  return useMutation(
    (params: API.Game.UpdateGoodsDetailsParams) =>
      gameRequest.post("/api/goods/goods_details_update", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取设备与运营商信息
export const useGetDeviceService = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/game/device_service",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取游戏模式列表
export const useGetGamePattern = () => {
  return useMutation(
    (params: API.Game.GamePatternParams) =>
      gameRequest.post("/api/game/game_pattern", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取交易模式列表
export const useGetPatternList = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/main/pattern",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取商品分类
export const useGetCategoryList = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/main/category",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取指定商品列表
export const useGetSpecificGoodsList = () => {
  return useMutation(
    (params: API.Game.SpecificGoodsListParams) =>
      gameRequest.post("/api/main/goods_list", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// IM强制下线
export const useOffline = () => {
  return useMutation(
    (params: API.Game.OfflineParams) =>
      gameRequest.post("/api/im_chat/offine", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取常用快捷短语
export const useGetCommonPhrases = () => {
  return useMutation(
    () =>
      gameRequest.post<API.Game.CommonPhrasesResponse>(
        "/api/im_chat/get_common_phrases",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 发送自定义消息
export const useSendCustomizeMsg = () => {
  return useMutation(
    (params: API.Game.SendCustomizeMsgParams) =>
      gameRequest.post("/api/im_chat/send_customize_msg", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 发送业务通知
export const useSendBusinessNotification = () => {
  return useMutation(
    (params: API.Game.SendBusinessNotificationParams) =>
      gameRequest.post("/api/im_chat/send_business_notification", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 创建IM群组
export const useCreateGroup = () => {
  return useMutation(
    (params: API.Game.CreateGroupParams) =>
      gameRequest.post("/api/im/create_group", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 从群组移除用户
export const useKickGroupUser = () => {
  return useMutation(
    (params: API.Game.KickGroupUserParams) =>
      gameRequest.post("/api/im_group/kick_group_user", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 群组禁言
export const useMuteGroup = () => {
  return useMutation(
    (params: API.Game.MuteGroupParams) =>
      gameRequest.post("/api/im_group/mute_group", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取群组信息
export const useGetGroupInfo = () => {
  return useMutation(
    (params: API.Game.GroupInfoParams) =>
      gameRequest.post("/api/im_group/get_groupinfo_by_imgroupid", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// IM用户登录
export const useImLogin = () => {
  return useMutation(
    (params: API.Game.ImLoginParams) =>
      gameRequest.post("/api/im_chat/im_login", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 修改密码
export const useChangePassword = () => {
  return useMutation(
    (params: API.Game.ChangePasswordParams) =>
      gameRequest.post("/api/change_password", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// Web登录
export const useWebLogin = () => {
  return useMutation(
    (params: API.Game.WebLoginParams) =>
      gameRequest.post("/api/web_login", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 保存订单
export const useSaveOrder = () => {
  return useMutation(
    (params: API.Game.SaveOrderParams) =>
      gameRequest.post("/api/order/save", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取赔偿信息
export const useGetReparation = () => {
  return useMutation(
    () =>
      gameRequest.post(
        "/api/order/reparation",
        {},
        {
          headers: {
            operationID: uuidv4(),
          },
        },
      ),
    {
      onError: gameErrorHandle,
    },
  );
};

// 订单支付
export const useOrderPlay = () => {
  return useMutation(
    (params: API.Game.OrderPlayParams) =>
      gameRequest.post("/api/order/order_play", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 设置订单状态
export const useSetOrderStatus = () => {
  return useMutation(
    (params: API.Game.SetOrderStatusParams) =>
      gameRequest.post("/api/order/order_status_set", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取订单列表
export const useGetOrderList = () => {
  return useMutation(
    (params: API.Game.OrderListParams) =>
      gameRequest.post("/api/order/order_list", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};

// 获取订单详情
export const useGetOrderDetails = () => {
  return useMutation(
    (params: API.Game.OrderDetailsParams) =>
      gameRequest.post("/api/order/order_details", params, {
        headers: {
          operationID: uuidv4(),
        },
      }),
    {
      onError: gameErrorHandle,
    },
  );
};
