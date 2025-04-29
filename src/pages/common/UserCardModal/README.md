# UserCardModal 用户卡片模态框

用户卡片模态框是一个用于展示用户详细信息、好友操作和社交互动的复合组件。

## 功能概述

- 显示用户的基本信息（头像、昵称、ID 等）
- 展示用户的详细资料（性别、生日、手机、邮箱等）
- 支持添加好友请求发送
- 支持编辑个人信息（当显示的是自己的信息时）
- 支持添加/编辑备注
- 支持发起会话
- 提供数据复制功能

## 文件结构

```
src/pages/common/UserCardModal/
├── index.tsx           # 主组件文件
├── EditSelfInfo.tsx    # 编辑个人信息组件
├── SendRequest.tsx     # 发送好友请求组件
└── README.md           # 文档
```

## 组件 API

### Props

| 属性名   | 类型     | 默认值 | 描述                                         |
| -------- | -------- | ------ | -------------------------------------------- |
| userID   | string   | -      | 需要显示的用户 ID，如果不提供则使用 cardInfo |
| groupID  | string   | -      | 群组 ID，用于在群上下文中查看用户            |
| isSelf   | boolean  | false  | 是否显示自己的信息                           |
| notAdd   | boolean  | false  | 是否禁用添加好友功能                         |
| cardInfo | CardInfo | -      | 直接提供的用户信息，避免重复请求             |

### 类型定义

```tsx
export type CardInfo = Partial<BusinessUserInfo & FriendUserItem>;

interface IUserCardModalProps {
  userID?: string;
  groupID?: string;
  isSelf?: boolean;
  notAdd?: boolean;
  cardInfo?: CardInfo;
}
```

## 交互状态

用户卡片有以下几种主要状态：

1. **加载状态**: 使用 Spin 组件展示加载中
2. **查看状态**: 显示用户的详细信息
3. **编辑个人信息状态**: 当 isSelf 为 true 时可切换到此状态
4. **发送好友请求状态**: 当不是好友且不是自己时可切换到此状态

## 实现细节

### 数据获取

用户卡片通过多个来源获取用户数据：

```tsx
const getCardInfo = async (): Promise<{
  cardInfo: CardInfo;
  memberInfo?: GroupMemberItem | null;
}> => {
  if (isSelf) {
    return {
      cardInfo: selfInfo,
    };
  }
  let userInfo: CardInfo | null = null;
  const friendInfo = useContactStore
    .getState()
    .friendList.find((item) => item.userID === userID);
  if (friendInfo) {
    userInfo = { ...friendInfo };
  } else {
    const { data } = await IMSDK.getUsersInfo([userID!]);
    userInfo = { ...(data[0] ?? {}) };
  }

  try {
    const {
      data: { users },
    } = await getBusinessUserInfo([userID!]);
    userInfo = { ...userInfo, ...users[0] };
  } catch (error) {
    console.error("get business user info failed", userID, error);
  }
  return {
    cardInfo: userInfo,
  };
};
```

### 渲染逻辑

组件根据不同状态渲染不同的内容：

```tsx
return (
  <DraggableModalWrap
    title={null}
    footer={null}
    open={isOverlayOpen}
    closable={false}
    width={332}
    centered
    onCancel={closeOverlay}
    destroyOnClose
    // 样式和拖拽配置...
  >
    <Spin spinning={isLoading}>
      {isSendRequest ? (
        <SendRequest cardInfo={cardInfo!} backToCard={backToCard} />
      ) : isEditingSelfInfo ? (
        <EditSelfInfo close={backToCard} onSuccess={refreshSelfInfo} />
      ) : (
        // 卡片内容渲染...
      )}
    </Spin>
  </DraggableModalWrap>
);
```

### 用户字段分组显示

用户信息通过`UserCardDataGroup`组件进行分组显示：

```tsx
<UserCardDataGroup
  title={t("placeholder.userInfo")}
  userID={cardInfo?.userID}
  fieldRows={userFields}
  updateCardRemark={updateCardRemark}
/>
```

## 主要功能实现

### 1. 复制用户 ID

```tsx
const copyUserID = () => {
  copyToClipboard(cardInfo?.userID ?? "");
  feedbackToast({ msg: t("placeholder.copySuccess") });
};
```

### 2. 添加/修改备注

```tsx
const updateCardRemark = (remark: string) => {
  setUserInfoRow({ ...cardInfo!, remark });
};

// 在UserCardDataGroup中
<EditableContent
  editable={!!updateCardRemark}
  value={value}
  onUpdate={async (val) => {
    try {
      await IMSDK.setFriendRemark(userID!, val);
      updateCardRemark?.(val);
      feedbackToast({ msg: t("placeholder.updateSuccess") });
    } catch (error) {
      console.error("set friend remark failed", error);
      feedbackToast({
        msg: t("placeholder.updateFailed"),
        type: "error",
      });
    }
  }}
/>;
```

### 3. 发起会话

```tsx
const sendMessage = async () => {
  toSpecifiedConversation(
    {
      userID: cardInfo?.userID,
      conversationType: SessionType.Single,
    },
    () => {
      closeOverlay();
    },
  );
};
```

## 使用示例

```tsx
// 通过事件系统调用
import { emit } from "@/utils/events";

// 打开用户卡片
const showUserCard = (userID: string) => {
  emit("OPEN_USER_CARD", { userID });
};

// 在组件中使用
<UserCardModal ref={userCardRef} userID={currentUserID} />;

// 监听事件
useEffect(() => {
  const openUserCardHandler = ({ userID }: OpenUserCardParams) => {
    // 设置当前用户ID
    setCurrentUserID(userID);
    // 打开模态框
    userCardRef.current?.openOverlay();
  };

  on("OPEN_USER_CARD", openUserCardHandler);
  return () => {
    off("OPEN_USER_CARD", openUserCardHandler);
  };
}, []);
```

## 注意事项

1. **性能优化**: 使用`React.memo`和`useLatest`优化渲染性能
2. **数据更新**: 监听`OnFriendAdded`事件以实时更新好友状态
3. **拖拽功能**: 使用`DraggableModalWrap`组件实现模态框拖拽
4. **状态重置**: 在关闭模态框时重置所有状态防止数据残留
