declare namespace API {
  declare namespace Login {
    enum UsedFor {
      Register = 1,
      Modify = 2,
      Login = 3,
    }
    type RegisterUserInfo = {
      nickname: string;
      faceURL: string;
      birth?: number;
      gender?: number;
      email?: string;
      account?: string;
      areaCode: string;
      phoneNumber?: string;
      password: string;
    };
    type DemoRegisterType = {
      invitationCode?: string;
      verifyCode: string;
      deviceID?: string;
      autoLogin?: boolean;
      user: RegisterUserInfo;
    };
    type LoginParams = {
      email?: string;
      verifyCode: string;
      deviceID?: string;
      phoneNumber?: string;
      areaCode: string;
      account?: string;
      password: string;
    };
    type ModifyParams = {
      userID: string;
      currentPassword: string;
      newPassword: string;
    };
    type ResetParams = {
      email?: string;
      phoneNumber?: string;
      areaCode: string;
      verifyCode: string;
      password: string;
    };
    type VerifyCodeParams = {
      email?: string;
      phoneNumber?: string;
      areaCode: string;
      verifyCode: string;
      usedFor: UsedFor;
    };
    type SendSmsParams = {
      email?: string;
      phoneNumber?: string;
      areaCode: string;
      deviceID?: string;
      usedFor: UsedFor;
      invitationCode?: string;
    };
  }

  declare namespace Game {
    type RegisterParams = {
      type: number;
      username: string;
      password: string;
      im_id: string;
    };

    type LoginParams = {
      type: number;
      username: string;
      password?: string;
      code?: string;
      im_id: string;
    };

    type LogoutParams = {
      user_id: number;
    };

    type SendSmsParams = {
      mobile: string;
    };

    type UserInfoSetParams = {
      type: number;
      avatar?: string;
      nickname?: string;
      password?: string;
      confirm_password?: string;
      username?: string;
      confirm_username?: string;
      qq?: string;
      wei_chat?: string;
    };

    type BalanceResponse = {
      created_time: string | null;
      updated_time: string | null;
      id: number;
      user_id: number;
      balance_available: number;
      balance_locked: number;
      bond: number;
      coin: string;
    };

    type TransactionParams = {
      page: number;
      size: number;
    };

    type WithdrawalParams = {
      amount: number;
      bank_account: string;
    };

    type UpdateGoodsParams = {
      goods_id: number;
      review_status?: number;
      price?: number;
    };

    type EditGoodsParams = {
      category_id: number;
      goods_id: number;
    };

    type GoodsDetailsParams = {
      id: string;
    };

    type BannerResponse = {
      list: string[];
    };

    type PosterResponse = {
      img: string;
    };

    type WantBuyResponse = {
      img: string;
    };

    type AssignCustomerServiceParams = {
      name: string;
    };

    type SendMessageParams = {
      send_id: string;
      recv_id: string;
      content: string;
    };

    type CreateChatGroupParams = {
      group_name: string;
      good_name: string;
      im_seller_id: string;
      im_buyer_id: string;
    };

    type GameGoodsListParams = {
      page?: number;
      size?: number;
    };

    type UpdateGoodsDetailsParams = {
      id: number;
      game_id: number;
      pattern_id: number;
      goods_id: number;
      device_id: number;
      operator_id: number;
      account: string;
      title: string;
      image: string;
      game_service_id: string;
      is_inspect: number;
      is_indulge: number;
      is_authentication: number;
      is_account_source: number;
      price: number;
      content: Array<{
        key: string;
        key_sort: number;
        value: string;
        is_required: number;
        is_sort: number;
        is_show: number;
        type: number;
        sort_type: number;
      }>;
    };

    type GamePatternParams = {
      pattern_id?: number;
      game_type_id?: number;
    };

    type SpecificGoodsListParams = {
      game_id: number;
      page: number;
      sort_type?: number;
      device_id?: number;
      operator_id?: number;
      game_server_id?: string;
      retail_price_range?: string;
      category_id?: number;
    };

    type OfflineParams = {
      platformID: number;
      userID: string;
    };

    type SendCustomizeMsgParams = {
      send_id: string;
      recv_id: string;
      content_type: number;
    };

    type SendBusinessNotificationParams = {
      sendUserID: string;
      recvUserID: string;
      recvGroupID: string;
      key: string;
      data: string;
      sendMsg: boolean;
      reliabilityLevel: number;
    };

    type CreateGroupParams = {
      memberUserIDs: string[];
      adminUserIDs: string[];
      ownerUserID: string;
      groupInfo: {
        groupID: string;
        groupName: string;
        notification: string;
        introduction: string;
        faceURL: string;
        ex: string;
        groupType: number;
        needVerification: number;
        lookMemberInfo: number;
        applyMemberFriend: number;
      };
    };

    type KickGroupUserParams = {
      groupID: string;
      kickedUserIDs: string[];
    };

    type MuteGroupParams = {
      groupID: string;
    };

    type GroupInfoParams = {
      groupID: string;
    };

    type ImLoginParams = {
      phone: string;
      password: string;
      nike_name: string;
    };

    type ChangePasswordParams = {
      phoneNumber: string;
      currentPassword: string;
      newPassword: string;
      userID: string;
      platform: number;
    };

    type WebLoginParams = {
      type: number;
      username: string;
      password: string;
      platform: number;
    };

    type SaveOrderParams = {
      goods_id: number;
      quantity: number;
      address_id?: number;
      remark?: string;
    };

    type OrderPlayParams = {
      order_id: string;
      payment_method: number;
    };

    type SetOrderStatusParams = {
      order_id: string;
      status: number;
      price?: number;
    };

    type OrderListParams = {
      page: number;
      size: number;
      status?: number;
      type?: number;
    };
  }
}
