---
title: game
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"
---

# game

Base URLs:

# Authentication

# 游戏 app 接口

## POST 注册

POST /api/user/register

> Body 请求参数

```json
"{\r\n    \"type\":2,    //1:验证码登录 2：账号密码登录\r\n    \"username\":\"18646631338\",\r\n    \"password\":\"123456\",\r\n    \"im_id\":\"5454521\"\r\n}"
```

### 请求参数

| 名称       | 位置 | 类型   | 必选 | 说明 |
| ---------- | ---- | ------ | ---- | ---- |
| body       | body | object | 否   | none |
| » username | body | string | 是   | none |
| » imit     | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE4NjQ2NjMxMzM4IiwiZXhwIjoxNzQzMjM2OTc0fQ.kYvT2NKuWOpv2Cpk3PFGTj6_ZLcpPD0vNo2zw6WlfWQ"
  },
  "msg": "登录成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » code   | integer | true | none |        | none |
| » data   | object  | true | none |        | none |
| »» token | string  | true | none |        | none |
| » msg    | string  | true | none |        | none |

## POST 登录

POST /api/login

> Body 请求参数

```json
"{\n    \"type\":2, //1:验证码登录  2：账号密码登录   (type：1  密码可以不用传  type:2 验证码可以不用传)\n    \"username\":\"18646631558\",\n    \"password\":\"123456789\",  //\n    \"code\":\"123456\", //验证码\n    \"im_id\":\"5454521\"\n}"
```

### 请求参数

| 名称       | 位置 | 类型   | 必选 | 说明 |
| ---------- | ---- | ------ | ---- | ---- |
| body       | body | object | 否   | none |
| » username | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzQyMzYzOTAwfQ.PiUC5Bvh4WsDYwDmXfngdjle2Cotxp0-cLapRzuG9JU"
  },
  "msg": "登录成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » code   | integer | true | none |        | none |
| » data   | object  | true | none |        | none |
| »» token | string  | true | none |        | none |
| » msg    | string  | true | none |        | none |

## POST 退出

POST /api/user/logout

> Body 请求参数

```json
{
  "user_id": 13
}
```

### 请求参数

| 名称      | 位置 | 类型    | 必选 | 说明 |
| --------- | ---- | ------- | ---- | ---- |
| body      | body | object  | 否   | none |
| » user_id | body | integer | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzQyMzYzOTAwfQ.PiUC5Bvh4WsDYwDmXfngdjle2Cotxp0-cLapRzuG9JU"
  },
  "msg": "登录成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » code   | integer | true | none |        | none |
| » data   | object  | true | none |        | none |
| »» token | string  | true | none |        | none |
| » msg    | string  | true | none |        | none |

## POST 发送验证码

POST /api/send_sms

> Body 请求参数

```json
{
  "mobile": "18646631338"
}
```

### 请求参数

| 名称      | 位置 | 类型    | 必选 | 说明 |
| --------- | ---- | ------- | ---- | ---- |
| body      | body | object  | 否   | none |
| » user_id | body | integer | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzQyMzYzOTAwfQ.PiUC5Bvh4WsDYwDmXfngdjle2Cotxp0-cLapRzuG9JU"
  },
  "msg": "登录成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称     | 类型    | 必选 | 约束 | 中文名 | 说明 |
| -------- | ------- | ---- | ---- | ------ | ---- |
| » code   | integer | true | none |        | none |
| » data   | object  | true | none |        | none |
| »» token | string  | true | none |        | none |
| » msg    | string  | true | none |        | none |

# 游戏 app 接口/我的

## POST 用户账号密码昵称头像基础信息更新

POST /api/user/user_info_set

> Body 请求参数

```json
"{\r\n    \"type\":2,   //1：头像 2：昵称 3：手机号码  4：登录密码  5：qq  6:微信 \r\n    \"avatar\" : \"\",  //如果没有为空\r\n    \"nickname\":\"测试用户11111\",\r\n    \"password\":\"123456789\",\r\n    \"confirm_password\":\"123456789\",\r\n    \"username\":\"18646631338\",\r\n    \"confirm_username\":\"18646631333\",\r\n    \"qq\":\"276806275\",\r\n    \"wei_chat\":\"124579315\"\r\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

# 游戏 app 接口/我的/会员认证

## POST 会员认证

POST /api/user/info

> Body 请求参数

```json
{}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 是   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

# 游戏 app 接口/我的/钱包

## POST 会员钱包余额

POST /api/user/balance

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
"{\n  \"code\": 200,\n  \"data\": {\n    \"created_time\": null,\n    \"updated_time\": null,\n    \"id\": 0,\n    \"user_id\": 0,   //用户id\n    \"balance_available\": 0, //会员余额\n    \"balance_locked\": 0,//会员冻结资产\n    \"bond\": 0,  //会员保证金\n    \"coin\": \"\"  //币种\n  },\n  \"msg\": \"success\"\n}"
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称                 | 类型    | 必选 | 约束 | 中文名 | 说明         |
| -------------------- | ------- | ---- | ---- | ------ | ------------ |
| » code               | integer | true | none |        | none         |
| » data               | object  | true | none |        | none         |
| »» created_time      | null    | true | none |        | none         |
| »» updated_time      | null    | true | none |        | none         |
| »» id                | integer | true | none |        | none         |
| »» user_id           | integer | true | none |        | 会员 id      |
| »» balance_available | integer | true | none |        | 用户余额     |
| »» balance_locked    | integer | true | none |        | 用户冻结资产 |
| »» bond              | integer | true | none |        | 会员保证金   |
| »» coin              | string  | true | none |        | none         |
| » msg                | string  | true | none |        | none         |

## POST 会员绑定支付宝实名的展示

POST /api/user/realname_list

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "created_time": "2025-04-22 20:10:45",
    "updated_time": "2025-04-25 15:00:15",
    "submit_time": "2025-04-22 20:10:45",
    "examine_time": null,
    "face_submit_time": null,
    "face_examine_time": null,
    "alipay_time": "2025-04-25 15:00:15",
    "id": 14,
    "user_id": 58,
    "User": {
      "created_time": null,
      "updated_time": null,
      "disable_time": null,
      "seal_time": null,
      "id": 0,
      "username": "",
      "password": "",
      "im_id": "",
      "avatar": "",
      "nickname": "",
      "user_type": 0,
      "status": 0,
      "login_type": 0,
      "imit": "",
      "qq": "",
      "wei_chat": "",
      "alipay": ""
    },
    "realname": "李四",
    "//真实姓名 \"number\"": "441313131313131310",
    "front_img": "",
    "back_img": "",
    "face_status": 0,
    "status": 2,
    "alipay_lift_time": "0001-01-01T00:00:00Z",
    "type": 1,
    "location": "",
    "face_video": ""
  },
  "msg": "success"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称                 | 类型    | 必选 | 约束 | 中文名 | 说明     |
| -------------------- | ------- | ---- | ---- | ------ | -------- |
| » code               | integer | true | none |        | none     |
| » data               | object  | true | none |        | none     |
| »» created_time      | string  | true | none |        | none     |
| »» updated_time      | string  | true | none |        | none     |
| »» submit_time       | string  | true | none |        | none     |
| »» examine_time      | null    | true | none |        | none     |
| »» face_submit_time  | null    | true | none |        | none     |
| »» face_examine_time | null    | true | none |        | none     |
| »» alipay_time       | string  | true | none |        | none     |
| »» id                | integer | true | none |        | none     |
| »» user_id           | integer | true | none |        | none     |
| »» User              | object  | true | none |        | none     |
| »»» created_time     | null    | true | none |        | none     |
| »»» updated_time     | null    | true | none |        | none     |
| »»» disable_time     | null    | true | none |        | none     |
| »»» seal_time        | null    | true | none |        | none     |
| »»» id               | integer | true | none |        | none     |
| »»» username         | string  | true | none |        | none     |
| »»» password         | string  | true | none |        | none     |
| »»» im_id            | string  | true | none |        | none     |
| »»» avatar           | string  | true | none |        | none     |
| »»» nickname         | string  | true | none |        | none     |
| »»» user_type        | integer | true | none |        | none     |
| »»» status           | integer | true | none |        | none     |
| »»» login_type       | integer | true | none |        | none     |
| »»» imit             | string  | true | none |        | none     |
| »»» qq               | string  | true | none |        | none     |
| »»» wei_chat         | string  | true | none |        | none     |
| »»» alipay           | string  | true | none |        | none     |
| »» realname          | string  | true | none |        | 真实姓名 |
| »» number            | string  | true | none |        | none     |
| »» front_img         | string  | true | none |        | none     |
| »» back_img          | string  | true | none |        | none     |
| »» face_status       | integer | true | none |        | none     |
| »» status            | integer | true | none |        | none     |
| »» alipay_lift_time  | string  | true | none |        | none     |
| »» type              | integer | true | none |        | none     |
| »» location          | string  | true | none |        | none     |
| »» face_video        | string  | true | none |        | none     |
| » msg                | string  | true | none |        | none     |

## POST 会员流水列表

POST /api/user/transaction

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 会员提现

POST /api/user/user_withdrawal

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

# 游戏 app 接口/卖号/我的商品

## POST 商品管理列表

POST /api/goods/goods_list

> Body 请求参数

```json
"{\r\n    \"code\": 200,\r\n    \"data\": {\r\n        \"goods\": [\r\n            {\r\n                \"id\": 43,   \r\n                \"goods_no\": \"NO3629211369353965818122832016\", //商品编号\r\n                \"title\": \"王者荣耀售卖超级牛逼的账号先到先得\",  //标题名称\r\n                \"image\": \"https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800\",  //商品图片\r\n                \"device_name\": \"苹果\",  //设备名称\r\n                \"operator_name\": \"QQ\",  //运营商名称\r\n                \"review_status\": 0    //审查状态 0：审核中 1：已上架 2：已下架  3:审核失败\r\n            }\r\n        ]\r\n    },\r\n    \"msg\": \"获取成功\"\r\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 是   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 商品下架或更改价格

POST /api/goods/goods_update

> Body 请求参数

```json
"{\r\n    \"goods_id\":44,\r\n    \"review_status\":2,   // 审查状态 0：审核中 1：已上架 2：已下架  3:审核失败    如果位null 是修改价格   如果0-3是下架\r\n    \"price\":0    //商品售价\r\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 编辑发布商品信息

POST /api/goods/goods_edit

> Body 请求参数

```json
{
  "category_id": 1,
  "goods_id": 49
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
"{\r\n    \"code\": 200,\r\n    \"data\": {\r\n        \"id\": 49,   //商品id\r\n        \"content\": [  //商品详情\r\n            {\r\n                \"is_required\": 1, //是否必填\r\n                \"is_show\": 1,//是否显示\r\n                \"is_sort\": 1,//是否排序\r\n                \"key\": \"游戏段位\",//规格名\r\n                \"key_sort\": 13, //排序号码\r\n                \"sort_type\": 1,//排序类型 1：字母 2：数字\r\n                \"type\": 3, //类型 1:文本，2: 单选 3：多选\r\n                \"value\": {//多个规格值\r\n                    \"362\": {\r\n                        \"id\": 362,\r\n                        \"sort\": \"H\",\r\n                        \"value\": \"黄金1\"\r\n                    }\r\n                }\r\n            },\r\n            {\r\n                \"is_required\": 1,\r\n                \"is_show\": 1,\r\n                \"is_sort\": 1,\r\n                \"key\": \"游戏皮肤\",\r\n                \"key_sort\": 10,\r\n                \"sort_type\": 2,\r\n                \"type\": 3,\r\n                \"value\": {\r\n                    \"363\": {\r\n                        \"id\": 363,\r\n                        \"sort\": \"0\",\r\n                        \"value\": \"倔强1\"\r\n                    },\r\n                    \"364\": {\r\n                        \"id\": 364,\r\n                        \"sort\": \"1\",\r\n                        \"value\": \"倔强2\"\r\n                    },\r\n                    \"365\": {\r\n                        \"id\": 365,\r\n                        \"sort\": \"2\",\r\n                        \"value\": \"超神1\"\r\n                    },\r\n                    \"366\": {\r\n                        \"id\": 366,\r\n                        \"sort\": \"3\",\r\n                        \"value\": \"超神2\"\r\n                    },\r\n                    \"367\": {\r\n                        \"id\": 367,\r\n                        \"sort\": \"4\",\r\n                        \"value\": \"白金1\"\r\n                    }\r\n                }\r\n            },\r\n            {\r\n                \"is_required\": 1,\r\n                \"is_show\": 1,\r\n                \"is_sort\": 0,\r\n                \"key\": \"英雄数量\",\r\n                \"key_sort\": 15,\r\n                \"sort_type\": 1,\r\n                \"type\": 1,\r\n                \"value\": {\r\n                    \"368\": {\r\n                        \"id\": 368,\r\n                        \"sort\": \"\",\r\n                        \"value\": \"王者荣耀里面的花钱，不花钱的英雄全部都有，活动的英雄也全都包含在价格优惠，先到先得\"\r\n                    }\r\n                }\r\n            }\r\n        ],\r\n        \"category_id\": 1,//分类id\r\n        \"is_inspect\": 1,//是否审核 1:审核 2:不审核   (如果运维选择了审核，在用户商家商品的时候显示审核或不审核，以下需要选择的单选项都是类似的意思)\r\n        \"sort\": 100,\r\n        \"is_indulge\": 1,//防沉迷 1:启用 0：禁用\r\n        \"is_authentication\": 1,//是否二次认证需要填写 1：是  0：否\r\n        \"is_account_source\": 1,//账号来源  1: 自己注册 2：本平台购买 3：其他平台购买   （0:是运维人员设置的  1，2，3是用户上架商品的时候选择）\r\n        \"sending_id\": 1,//发货id\r\n        \"reparation_id\": 12,//包赔id\r\n        \"penalty_id\": 1,//违约金id\r\n        \"account\": \"chen11oopp\",//账号\r\n        \"title\": \"王者荣耀售卖超级牛逼的账号先到先得\",//标题\r\n        \"image\": \"https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800\",//游戏图片\r\n        \"retail_price\": 1000,//商品售价\r\n        \"actual_price\": 949.5,//实际价格\r\n        \"cost_price\": 50.5,//手续费用\r\n        \"connect\": \"276806275\", //联系方式\r\n        \"text\": \"这个账号超级牛逼的快点来买啊\",//卖家详情\r\n        \"label\": \"包赔服务,验证账号\" //标签\r\n    },\r\n    \"msg\": \"获取成功\"\r\n}"
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称                 | 类型     | 必选  | 约束 | 中文名 | 说明 |
| -------------------- | -------- | ----- | ---- | ------ | ---- |
| » code               | integer  | true  | none |        | none |
| » data               | object   | true  | none |        | none |
| »» id                | integer  | true  | none |        | none |
| »» content           | [object] | true  | none |        | none |
| »»» is_required      | integer  | true  | none |        | none |
| »»» is_show          | integer  | true  | none |        | none |
| »»» is_sort          | integer  | true  | none |        | none |
| »»» key              | string   | true  | none |        | none |
| »»» key_sort         | integer  | true  | none |        | none |
| »»» sort_type        | integer  | true  | none |        | none |
| »»» type             | integer  | true  | none |        | none |
| »»» value            | object   | true  | none |        | none |
| »»»» 362             | object   | false | none |        | none |
| »»»»» id             | integer  | true  | none |        | none |
| »»»»» sort           | string   | true  | none |        | none |
| »»»»» value          | string   | true  | none |        | none |
| »»»» 363             | object   | false | none |        | none |
| »»»»» id             | integer  | true  | none |        | none |
| »»»»» sort           | string   | true  | none |        | none |
| »»»»» value          | string   | true  | none |        | none |
| »»»» 364             | object   | false | none |        | none |
| »»»»» id             | integer  | true  | none |        | none |
| »»»»» sort           | string   | true  | none |        | none |
| »»»»» value          | string   | true  | none |        | none |
| »»»» 365             | object   | false | none |        | none |
| »»»»» id             | integer  | true  | none |        | none |
| »»»»» sort           | string   | true  | none |        | none |
| »»»»» value          | string   | true  | none |        | none |
| »»»» 366             | object   | false | none |        | none |
| »»»»» id             | integer  | true  | none |        | none |
| »»»»» sort           | string   | true  | none |        | none |
| »»»»» value          | string   | true  | none |        | none |
| »»»» 367             | object   | false | none |        | none |
| »»»»» id             | integer  | true  | none |        | none |
| »»»»» sort           | string   | true  | none |        | none |
| »»»»» value          | string   | true  | none |        | none |
| »»»» 368             | object   | true  | none |        | none |
| »»»»» id             | integer  | true  | none |        | none |
| »»»»» sort           | string   | true  | none |        | none |
| »»»»» value          | string   | true  | none |        | none |
| »» category_id       | integer  | true  | none |        | none |
| »» is_inspect        | integer  | true  | none |        | none |
| »» sort              | integer  | true  | none |        | none |
| »» is_indulge        | integer  | true  | none |        | none |
| »» is_authentication | integer  | true  | none |        | none |
| »» is_account_source | integer  | true  | none |        | none |
| »» sending_id        | integer  | true  | none |        | none |
| »» reparation_id     | integer  | true  | none |        | none |
| »» penalty_id        | integer  | true  | none |        | none |
| »» account           | string   | true  | none |        | none |
| »» title             | string   | true  | none |        | none |
| »» image             | string   | true  | none |        | none |
| »» retail_price      | integer  | true  | none |        | none |
| »» actual_price      | number   | true  | none |        | none |
| »» cost_price        | number   | true  | none |        | none |
| » msg                | string   | true  | none |        | none |

## POST 更新卖家发布商品

POST /api/goods/goods_details_update

> Body 请求参数

```json
"{\r\n    \"id\":46,\r\n    \"game_id\":18,    //游戏id\r\n    \"pattern_id\":1, //模式id\r\n    \"goods_id\":41,\r\n    \"device_id\":2,  //设备Id   如果是端游传0\r\n    \"operator_id\":4,    //运营商id   如果是端游传0\r\n    \"account\":\"chen11oopp\",//游戏账号\r\n    \"title\":\"王者荣耀售卖超级牛逼的账号先到先得\",  //游戏标题\r\n    \"image\":\"https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800\",  //游戏图片\r\n    \"game_service_id\":\"1,3,5,6\",\r\n    \"is_inspect\": 1,//是否审核 1:审核 0:不审核   (如果运维选择了审核，在用户商家商品的时候显示审核或不审核，以下需要选择的单选项都是类似的意思)\r\n    \"is_indulge\": 1, //防沉迷 1:启用 0：禁用（备注信息同上）\r\n    \"is_authentication\": 1, //是否二次认证需要填写 1：是  0：否(备注信息同上)\r\n    \"is_account_source\": 1,//账号来源  1: 自己注册 2：本平台购买 3：其他平台购买   （0:是运维人员设置的  1，2，3是用户上架商品的时候选择）\r\n    \"price\":1000,\r\n    \"content\":[\r\n        {\r\n            \"key\":\"游戏段位\",     //字段验证必须是字符串\r\n            \"key_sort\":13,    //字段名称排序   字段验证必须是数字\r\n            \"value\":\"黄金1\",  //字段验证如果存在必须有中文逗号\r\n            \"is_required\":1,  //是否必填 1: 是 2：否   数字\r\n            \"is_sort\":1,    //是否排序   数字\r\n            \"is_show\":1,    //是否显示   数字\r\n            \"type\":3,       //类型 1:文本，2: 单选 3：多选   数字\r\n            \"sort_type\":1  //字段值排序类型 1：字母 2：数字   数字\r\n        },\r\n        {\r\n            \"key\":\"游戏皮肤\",\r\n            \"key_sort\":10,    //字段名称排序\r\n            \"value\":\"倔强1，倔强2，超神1，超神2，白金1\",\r\n            \"is_required\":1,  //是否必填 1: 是 2：否\r\n            \"is_sort\":1,    //是否排序\r\n            \"is_show\":1,    //是否显示\r\n            \"type\":3,       //类型 1:文本，2: 单选 3：多选\r\n            \"sort_type\":2  //字段值排序类型 1：字母 2：数字\r\n        },\r\n        {\r\n            \"key\":\"英雄数量\",\r\n            \"key_sort\":15,    //字段名称排序\r\n            \"value\":\"王者荣耀里面的花钱，不花钱的英雄全部都有，活动的英雄也全都包含在价格优惠，先到先得\",\r\n            \"is_required\":1,  //是否必填 1: 是 2：否\r\n            \"is_sort\":0,    //是否排序\r\n            \"is_show\":1,    //是否显示\r\n            \"type\":1,       //类型 1:文本，2: 单选 3：多选\r\n            \"sort_type\":1  //字段值排序类型 1：字母 2：数字\r\n        }\r\n    ]\r\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 商品详情

POST /api/goods/goods_details

> Body 请求参数

```json
"{\n    \"code\": 200,\n    \"data\": {\n        \"id\": 50,\n        \"content\": [\n            {\n                \"is_required\": 1,\n                \"is_show\": 1,\n                \"is_sort\": 1,\n                \"key\": \"游戏段位\",\n                \"key_sort\": 13,\n                \"sort_type\": 1,\n                \"type\": 3,\n                \"value\": \"黄金1\"\n            },\n            {\n                \"is_required\": 1,\n                \"is_show\": 1,\n                \"is_sort\": 1,\n                \"key\": \"游戏皮肤\",\n                \"key_sort\": 10,\n                \"sort_type\": 2,\n                \"type\": 3,\n                \"value\": \"倔强1,倔强2,超神1,超神2,白金1\"\n            },\n            {\n                \"is_required\": 1,\n                \"is_show\": 1,\n                \"is_sort\": 0,\n                \"key\": \"英雄数量\",\n                \"key_sort\": 15,\n                \"sort_type\": 1,\n                \"type\": 1,\n                \"value\": \"王者荣耀里面的花钱，不花钱的英雄全部都有，活动的英雄也全都包含在价格优惠，先到先得\"\n            }\n        ],\n        \"category_id\": 1,\n        \"is_inspect\": 1,\n        \"sort\": 100,\n        \"is_indulge\": 1,\n        \"is_authentication\": 1,\n        \"is_account_source\": 1,\n        \"sending_id\": 1,\n        \"penalty_id\": 1,\n        \"account\": \"chen11oopp\",\n        \"title\": \"王者荣耀售卖超级牛逼的账号先到先得\",\n        \"image\": \"https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800\",\n        \"retail_price\": 1000,   //商品售价\n        \"actual_price\": 949.5,   //减去手续费的价格\n        \"cost_price\": null,\n        \"connect\": \"276806275\",\n        \"text\": \"这个账号超级牛逼的快点来买啊\",\n        \"label\": \"包赔服务,验证账号\",\n        \"is_play\": 1,  //知否支持购买  0：否 1：是\n        \"is_self\": false,   //是否是自身商品  true : 没有聊天不能购买  false：可以\n        \"user_id\": 59,      //卖家id\n        \"is_reparation\": 1, //是否包赔 0:否 1：是\n        \"reparation_id\": 11 //包赔id\n    },\n    \"msg\": \"获取成功\"\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明    |
| ------------- | ------ | ------ | ---- | ------- |
| Authorization | header | string | 否   | none    |
| body          | body   | object | 否   | none    |
| » id          | body   | string | 是   | ID 编号 |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

# 游戏 app 接口/卖号/填写信息

## POST 交易模式列表

POST /api/game/game_type

> Body 请求参数

```json
{}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": [
    {
      "created_time": "2025-03-18 16:33:26",
      "updated_time": "2025-03-24 17:37:44",
      "id": 2,
      "name": "端游",
      "sort": 100,
      "top": 1,
      "status": 1
    },
    {
      "created_time": "2025-03-29 13:05:22",
      "updated_time": "2025-03-29 13:05:24",
      "id": 3,
      "name": "手游",
      "sort": 100,
      "top": 1,
      "status": 1
    }
  ],
  "msg": "获取成功"
}
```

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "自由交易模式"
    },
    {
      "id": 2,
      "name": "担保交易"
    },
    {
      "id": 3,
      "name": "回收交易"
    },
    {
      "id": 5,
      "name": "寄售交易"
    },
    {
      "id": 6,
      "name": "啊"
    },
    {
      "id": 7,
      "name": "刚好"
    }
  ],
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称            | 类型     | 必选 | 约束 | 中文名 | 说明 |
| --------------- | -------- | ---- | ---- | ------ | ---- |
| » code          | integer  | true | none |        | none |
| » data          | [object] | true | none |        | none |
| »» created_time | string   | true | none |        | none |
| »» updated_time | string   | true | none |        | none |
| »» id           | integer  | true | none |        | none |
| »» name         | string   | true | none |        | none |
| »» sort         | integer  | true | none |        | none |
| »» top          | integer  | true | none |        | none |
| »» status       | integer  | true | none |        | none |
| » msg           | string   | true | none |        | none |

## POST 获取商品中的各项设置

POST /api/goods/goods_setting_list

> Body 请求参数

```json
{}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

```json
{
  "code": 200,
  "data": {
    "id": 56,
    "content": [
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 1,
        "key": "游戏段位",
        "key_sort": 13,
        "sort_type": 1,
        "type": 3,
        "value": {
          "0": {
            "id": 717,
            "sort": "H",
            "value": "黄金1"
          },
          "1": {
            "id": 718,
            "sort": "J",
            "value": "倔强1"
          },
          "2": {
            "id": 719,
            "sort": "P",
            "value": "珀金1"
          },
          "3": {
            "id": 720,
            "sort": "B",
            "value": "白金1"
          }
        }
      },
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 1,
        "key": "游戏皮肤",
        "key_sort": 10,
        "sort_type": 2,
        "type": 3,
        "value": {
          "0": {
            "id": 721,
            "sort": "0",
            "value": "倔强1"
          },
          "1": {
            "id": 722,
            "sort": "1",
            "value": "倔强2"
          },
          "2": {
            "id": 723,
            "sort": "2",
            "value": "超神1"
          },
          "3": {
            "id": 724,
            "sort": "3",
            "value": "超神2"
          },
          "4": {
            "id": 725,
            "sort": "4",
            "value": "白金1"
          }
        }
      },
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 0,
        "key": "英雄数量",
        "key_sort": 15,
        "sort_type": 1,
        "type": 1,
        "value": {
          "0": {
            "id": 726,
            "sort": "",
            "value": ""
          }
        }
      }
    ],
    "category_id": 1,
    "is_inspect": 1,
    "sort": 100,
    "is_indulge": 1,
    "is_authentication": 1,
    "is_account_source": 0,
    "sending_id": 1,
    "penalty_id": 1,
    "account": null,
    "title": null,
    "image": null,
    "retail_price": null,
    "actual_price": null,
    "cost_price": null,
    "connect": null,
    "text": null,
    "label": null,
    "is_play": null,
    "is_self": false,
    "user_id": null,
    "is_reparation": 1,
    "reparation_id": 11
  },
  "msg": "获取成功"
}
```

```json
{
  "code": 200,
  "data": {
    "id": 27,
    "content": [
      {
        "is_required": 1,
        "////sdfadfas \"is_show\"": 1,
        "is_sort": 1,
        "key": "游戏段位",
        "key_sort": 13,
        "sort_type": 1,
        "type": 3,
        "value": {
          "340": {
            "id": 340,
            "name": "黄金1",
            "sort": "H"
          },
          "341": {
            "id": 341,
            "name": "倔强1",
            "sort": "J"
          },
          "342": {
            "id": 342,
            "name": "珀金1",
            "sort": "P"
          },
          "343": {
            "id": 343,
            "name": "白金1",
            "sort": "B"
          }
        }
      },
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 1,
        "key": "游戏皮肤",
        "key_sort": 10,
        "sort_type": 2,
        "type": 3,
        "value": {
          "344": {
            "id": 344,
            "name": "倔强1",
            "sort": "0"
          },
          "345": {
            "id": 345,
            "name": "倔强2",
            "sort": "1"
          },
          "346": {
            "id": 346,
            "name": "超神1",
            "sort": "2"
          },
          "347": {
            "id": 347,
            "name": "超神2",
            "sort": "3"
          },
          "348": {
            "id": 348,
            "name": "白金1",
            "sort": "4"
          }
        }
      },
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 0,
        "key": "英雄数量",
        "key_sort": 15,
        "sort_type": 1,
        "type": 1,
        "value": {
          "349": {
            "id": 349,
            "name": "王者荣耀里面的花钱，不花钱的英雄全部都有，活动的英雄也全都包含在价格优惠，先到先得",
            "sort": ""
          }
        }
      }
    ],
    "category_id": 1,
    "is_inspect": 1,
    "sort": 100,
    "is_indulge": 1,
    "is_authentication": 1,
    "is_account_source": 1
  },
  "msg": "获取成功"
}
```

```json
"{\r\n    \"code\": 200,\r\n    \"data\": {\r\n        \"id\": 27,\r\n        \"content\": [\r\n            {\r\n                \"is_required\": 1,\r\n                \"is_show\": 1,\r\n                \"is_sort\": 1,\r\n                \"key\": \"游戏段位\",\r\n                \"key_sort\": 13,\r\n                \"sort_type\": 1,\r\n                \"type\": 3,//类型 1:文本，2: 单选 3：多选\r\n                \"value\": {\r\n                    \"340\": {\r\n                        \"id\": 340,\r\n                        \"name\": \"黄金1\",\r\n                        \"sort\": \"H\"\r\n                    },\r\n                    \"341\": {\r\n                        \"id\": 341,\r\n                        \"name\": \"倔强1\",\r\n                        \"sort\": \"J\"\r\n                    },\r\n                    \"342\": {\r\n                        \"id\": 342,\r\n                        \"name\": \"珀金1\",\r\n                        \"sort\": \"P\"\r\n                    },\r\n                    \"343\": {\r\n                        \"id\": 343,\r\n                        \"name\": \"白金1\",\r\n                        \"sort\": \"B\"\r\n                    }\r\n                }\r\n            },\r\n            {\r\n                \"is_required\": 1,\r\n                \"is_show\": 1,\r\n                \"is_sort\": 1,\r\n                \"key\": \"游戏皮肤\",\r\n                \"key_sort\": 10,\r\n                \"sort_type\": 2,\r\n                \"type\": 3,\r\n                \"value\": {\r\n                    \"344\": {\r\n                        \"id\": 344,\r\n                        \"name\": \"倔强1\",\r\n                        \"sort\": \"0\"\r\n                    },\r\n                    \"345\": {\r\n                        \"id\": 345,\r\n                        \"name\": \"倔强2\",\r\n                        \"sort\": \"1\"\r\n                    },\r\n                    \"346\": {\r\n                        \"id\": 346,\r\n                        \"name\": \"超神1\",\r\n                        \"sort\": \"2\"\r\n                    },\r\n                    \"347\": {\r\n                        \"id\": 347,\r\n                        \"name\": \"超神2\",\r\n                        \"sort\": \"3\"\r\n                    },\r\n                    \"348\": {\r\n                        \"id\": 348,\r\n                        \"name\": \"白金1\",\r\n                        \"sort\": \"4\"\r\n                    }\r\n                }\r\n            },\r\n            {\r\n                \"is_required\": 1,\r\n                \"is_show\": 1,\r\n                \"is_sort\": 0,\r\n                \"key\": \"英雄数量\",\r\n                \"key_sort\": 15,\r\n                \"sort_type\": 1,\r\n                \"type\": 1,\r\n                \"value\": {\r\n                    \"349\": {\r\n                        \"id\": 349,\r\n                        \"name\": \"王者荣耀里面的花钱，不花钱的英雄全部都有，活动的英雄也全都包含在价格优惠，先到先得\",\r\n                        \"sort\": \"\"\r\n                    }\r\n                }\r\n            }\r\n        ],\r\n        \"category_id\": 1,\r\n        \"is_inspect\": 1,\r\n        \"sort\": 100,\r\n        \"is_indulge\": 1,\r\n        \"is_authentication\": 1,\r\n        \"is_account_source\": 1\r\n    },\r\n    \"msg\": \"获取成功\"\r\n}"
```

```json
{
  "code": 200,
  "data": {
    "id": 27,
    "content": [
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 1,
        "key": "游戏段位",
        "key_sort": 13,
        "///测试 \"sort_type\"": 1,
        "type": 3,
        "value": {
          "340": {
            "id": 340,
            "name": "黄金1",
            "sort": "H"
          },
          "341": {
            "id": 341,
            "name": "倔强1",
            "sort": "J"
          },
          "342": {
            "id": 342,
            "name": "珀金1",
            "sort": "P"
          },
          "343": {
            "id": 343,
            "name": "白金1",
            "sort": "B"
          }
        }
      },
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 1,
        "key": "游戏皮肤",
        "key_sort": 10,
        "sort_type": 2,
        "type": 3,
        "value": {
          "344": {
            "id": 344,
            "name": "倔强1",
            "sort": "0"
          },
          "345": {
            "id": 345,
            "name": "倔强2",
            "sort": "1"
          },
          "346": {
            "id": 346,
            "name": "超神1",
            "sort": "2"
          },
          "347": {
            "id": 347,
            "name": "超神2",
            "sort": "3"
          },
          "348": {
            "id": 348,
            "name": "白金1",
            "sort": "4"
          }
        }
      },
      {
        "is_required": 1,
        "is_show": 1,
        "is_sort": 0,
        "key": "英雄数量",
        "key_sort": 15,
        "sort_type": 1,
        "type": 1,
        "value": {
          "349": {
            "id": 349,
            "name": "王者荣耀里面的花钱，不花钱的英雄全部都有，活动的英雄也全都包含在价格优惠，先到先得",
            "sort": ""
          }
        }
      }
    ],
    "category_id": 1,
    "is_inspect": 1,
    "sort": 100,
    "is_indulge": 1,
    "is_authentication": 1,
    "is_account_source": 1
  },
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称            | 类型     | 必选 | 约束 | 中文名 | 说明 |
| --------------- | -------- | ---- | ---- | ------ | ---- |
| » code          | integer  | true | none |        | none |
| » data          | [object] | true | none |        | none |
| »» created_time | string   | true | none |        | none |
| »» updated_time | string   | true | none |        | none |
| »» id           | integer  | true | none |        | none |
| »» name         | string   | true | none |        | none |
| »» sort         | integer  | true | none |        | none |
| »» top          | integer  | true | none |        | none |
| »» status       | integer  | true | none |        | none |
| » msg           | string   | true | none |        | none |

## POST 卖家发布商品保存

POST /api/game/game_list

> Body 请求参数

```json
{}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

> 200 Response

```json
"{\n    \"code\": 200,\n    \"data\": {\n        \"device\": [    //设备\n            {\n                \"created_time\": \"2025-03-18 17:41:48\",\n                \"updated_time\": \"2025-04-02 14:16:27\",\n                \"id\": 2,\n                \"name\": \"苹果\",\n                \"sort\": 90,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 13:56:29\",\n                \"updated_time\": \"2025-04-02 13:56:29\",\n                \"id\": 4,\n                \"name\": \"安卓\",\n                \"sort\": 2,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 16:26:29\",\n                \"updated_time\": \"2025-04-03 08:26:18\",\n                \"id\": 7,\n                \"name\": \"11\",\n                \"sort\": 6,\n                \"top\": 1,\n                \"status\": 1\n            }\n        ],\n        \"gameType\": [   //游戏分类\n            {\n                \"created_time\": \"2025-03-18 16:33:26\",\n                \"updated_time\": \"2025-03-24 17:37:44\",\n                \"id\": 2,\n                \"name\": \"端游\",\n                \"sort\": 100,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-03-29 13:05:22\",\n                \"updated_time\": \"2025-03-29 13:05:24\",\n                \"id\": 3,\n                \"name\": \"手游\",\n                \"sort\": 100,\n                \"top\": 1,\n                \"status\": 1\n            }\n        ],\n        \"operator\": [   //运营商\n            {\n                \"created_time\": \"2025-03-18 18:01:46\",\n                \"updated_time\": \"2025-04-02 15:41:58\",\n                \"id\": 4,\n                \"name\": \"QQ\",\n                \"sort\": 103,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-03-21 18:34:25\",\n                \"updated_time\": \"2025-03-21 18:37:04\",\n                \"id\": 6,\n                \"name\": \"1\",\n                \"sort\": 1,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 15:34:02\",\n                \"updated_time\": \"2025-04-02 15:41:54\",\n                \"id\": 7,\n                \"name\": \"微信\",\n                \"sort\": 2,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 15:34:11\",\n                \"updated_time\": \"2025-04-02 15:34:11\",\n                \"id\": 8,\n                \"name\": \"啊\",\n                \"sort\": 2,\n                \"top\": 1,\n                \"status\": 1\n            }\n        ]\n    },\n    \"msg\": \"获取成功\"\n}"
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称            | 类型     | 必选 | 约束 | 中文名 | 说明 |
| --------------- | -------- | ---- | ---- | ------ | ---- |
| » code          | integer  | true | none |        | none |
| » data          | [object] | true | none |        | none |
| »» created_time | string   | true | none |        | none |
| »» updated_time | string   | true | none |        | none |
| »» id           | integer  | true | none |        | none |
| »» name         | string   | true | none |        | none |
| »» sort         | integer  | true | none |        | none |
| »» top          | integer  | true | none |        | none |
| »» status       | integer  | true | none |        | none |
| » msg           | string   | true | none |        | none |

## POST 通过模式获取游戏列表

POST /api/game/game_pattern

> Body 请求参数

```json
{}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": [
    {
      "id": 18,
      "game_no": "NO0042694825155516563079602230",
      "image": "http://gips0.baidu.com/it/u=1690853528,2506870245&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024",
      "name": "王者荣耀",
      "sort": 100,
      "pinyin": "W",
      "created_time": "2025-04-12 16:31:17",
      "updated_time": "2025-04-12 16:31:17"
    }
  ],
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称            | 类型     | 必选  | 约束 | 中文名 | 说明 |
| --------------- | -------- | ----- | ---- | ------ | ---- |
| » code          | integer  | true  | none |        | none |
| » data          | [object] | true  | none |        | none |
| »» id           | integer  | false | none |        | none |
| »» game_no      | string   | false | none |        | none |
| »» image        | string   | false | none |        | none |
| »» name         | string   | false | none |        | none |
| »» sort         | integer  | false | none |        | none |
| »» pinyin       | string   | false | none |        | none |
| »» created_time | string   | false | none |        | none |
| »» updated_time | string   | false | none |        | none |
| » msg           | string   | true  | none |        | none |

## POST 获取游戏设备运营商

POST /api/game/device_service

> Body 请求参数

```json
{}
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

> 200 Response

```json
"{\n    \"code\": 200,\n    \"data\": {\n        \"device\": [    //设备\n            {\n                \"created_time\": \"2025-03-18 17:41:48\",\n                \"updated_time\": \"2025-04-02 14:16:27\",\n                \"id\": 2,\n                \"name\": \"苹果\",\n                \"sort\": 90,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 13:56:29\",\n                \"updated_time\": \"2025-04-02 13:56:29\",\n                \"id\": 4,\n                \"name\": \"安卓\",\n                \"sort\": 2,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 16:26:29\",\n                \"updated_time\": \"2025-04-03 08:26:18\",\n                \"id\": 7,\n                \"name\": \"11\",\n                \"sort\": 6,\n                \"top\": 1,\n                \"status\": 1\n            }\n        ],\n        \"gameType\": [   //游戏分类\n            {\n                \"created_time\": \"2025-03-18 16:33:26\",\n                \"updated_time\": \"2025-03-24 17:37:44\",\n                \"id\": 2,\n                \"name\": \"端游\",\n                \"sort\": 100,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-03-29 13:05:22\",\n                \"updated_time\": \"2025-03-29 13:05:24\",\n                \"id\": 3,\n                \"name\": \"手游\",\n                \"sort\": 100,\n                \"top\": 1,\n                \"status\": 1\n            }\n        ],\n        \"operator\": [   //运营商\n            {\n                \"created_time\": \"2025-03-18 18:01:46\",\n                \"updated_time\": \"2025-04-02 15:41:58\",\n                \"id\": 4,\n                \"name\": \"QQ\",\n                \"sort\": 103,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-03-21 18:34:25\",\n                \"updated_time\": \"2025-03-21 18:37:04\",\n                \"id\": 6,\n                \"name\": \"1\",\n                \"sort\": 1,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 15:34:02\",\n                \"updated_time\": \"2025-04-02 15:41:54\",\n                \"id\": 7,\n                \"name\": \"微信\",\n                \"sort\": 2,\n                \"top\": 1,\n                \"status\": 1\n            },\n            {\n                \"created_time\": \"2025-04-02 15:34:11\",\n                \"updated_time\": \"2025-04-02 15:34:11\",\n                \"id\": 8,\n                \"name\": \"啊\",\n                \"sort\": 2,\n                \"top\": 1,\n                \"status\": 1\n            }\n        ]\n    },\n    \"msg\": \"获取成功\"\n}"
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称            | 类型     | 必选 | 约束 | 中文名 | 说明 |
| --------------- | -------- | ---- | ---- | ------ | ---- |
| » code          | integer  | true | none |        | none |
| » data          | [object] | true | none |        | none |
| »» created_time | string   | true | none |        | none |
| »» updated_time | string   | true | none |        | none |
| »» id           | integer  | true | none |        | none |
| »» name         | string   | true | none |        | none |
| »» sort         | integer  | true | none |        | none |
| »» top          | integer  | true | none |        | none |
| »» status       | integer  | true | none |        | none |
| » msg           | string   | true | none |        | none |

# 游戏 app 接口/首页

## POST 游戏列表

POST /api/main/index

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 游戏列表下的商品信息

POST /api/game_goods_list

> Body 请求参数

```json
{}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 否   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "count": 2,
    "list": [
      {
        "created_time": "2025-04-27 13:55:07",
        "updated_time": "2025-04-27 13:55:07",
        "release_time": "2025-04-25 17:57:11",
        "//发布时间 \"submit_time\"": "2025-04-27 13:55:07",
        "id": 57,
        "category_id": 1,
        "Category": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "sort": 0,
          "top": 0,
          "status": 0
        },
        "is_inspect": 1,
        "sending_id": 1,
        "Sending": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "sort": 0,
          "status": 0,
          "top": 0
        },
        "sort": 100,
        "is_indulge": 1,
        "is_authentication": 1,
        "is_account_source": 1,
        "is_reparation": 1,
        "reparation_id": 11,
        "Reparation": {
          "created_time": "0001-01-01 00:00:00",
          "handle_time": "0001-01-01 00:00:00",
          "service_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "title": "",
          "status": 0,
          "sort": 0,
          "ratio": 0,
          "price": 0
        },
        "game_id": 18,
        "Game": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "game_no": "",
          "name": "",
          "image": "",
          "game_type_id": 0,
          "GameType": {
            "created_time": "0001-01-01 00:00:00",
            "updated_time": "0001-01-01 00:00:00",
            "id": 0,
            "name": "",
            "sort": 0,
            "top": 0,
            "status": 0
          },
          "device_id": "",
          "Device": {
            "created_time": "0001-01-01 00:00:00",
            "updated_time": "0001-01-01 00:00:00",
            "id": 0,
            "name": "",
            "sort": 0,
            "top": 0,
            "status": 0
          },
          "operator_id": "",
          "Operator": {
            "created_time": "0001-01-01 00:00:00",
            "updated_time": "0001-01-01 00:00:00",
            "id": 0,
            "name": "",
            "sort": 0,
            "top": 0,
            "status": 0
          },
          "top": 0,
          "status": 0,
          "sort": 0,
          "pinyin": ""
        },
        "pattern_id": 1,
        "Pattern": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "status": 0,
          "top": 0,
          "sort": 0,
          "seller_service_ratio": 0,
          "buyer_service_ratio": 0,
          "seller_service_price": 0,
          "buyer_service_price": 0
        },
        "send_automatic_time": 100,
        "timeout": 300,
        "penalty_id": 1,
        "Penalty": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "sort": 0,
          "status": 0,
          "seller_penalty_ratio": 0,
          "buyer_penalty_ratio": 0,
          "seller_penalty_price": 0,
          "buyer_penalty_price": 0,
          "platform_income_ratio": 0,
          "platform_income_price": 0
        },
        "goods_no": "NO5204038363397044753961977773",
        "//商品编号 \"stock\"": 100,
        "unit": "个",
        "user_id": 59,
        "user": {
          "created_time": null,
          "updated_time": null,
          "disable_time": null,
          "seal_time": null,
          "id": 0,
          "username": "",
          "password": "",
          "im_id": "",
          "avatar": "",
          "nickname": "",
          "user_type": 0,
          "status": 0,
          "login_type": 0,
          "imit": "",
          "qq": "",
          "wei_chat": "",
          "alipay": ""
        },
        "account": "chen11oopp",
        "image": "https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
        "//图片 \"title\"": "王者荣耀售卖超级牛逼的账号先到先得",
        "//标题 \"status\"": 1,
        "review_status": 1,
        "retail_price": 1000,
        "//售价 \"actual_price\"": 949.5,
        "connect": "276806275",
        "text": "这个账号超级牛逼的快点来买啊",
        "//说明 \"label\"": "包赔服务,验证账号",
        "//标签 \"is_play\"": 1
      },
      {
        "created_time": "2025-04-27 15:23:17",
        "updated_time": "2025-04-27 15:46:45",
        "release_time": "2025-04-27 17:57:15",
        "submit_time": "2025-04-27 15:23:17",
        "id": 58,
        "category_id": 1,
        "Category": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "sort": 0,
          "top": 0,
          "status": 0
        },
        "is_inspect": 1,
        "sending_id": 1,
        "Sending": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "sort": 0,
          "status": 0,
          "top": 0
        },
        "sort": 100,
        "is_indulge": 1,
        "is_authentication": 1,
        "is_account_source": 1,
        "is_reparation": 1,
        "reparation_id": 11,
        "Reparation": {
          "created_time": "0001-01-01 00:00:00",
          "handle_time": "0001-01-01 00:00:00",
          "service_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "title": "",
          "status": 0,
          "sort": 0,
          "ratio": 0,
          "price": 0
        },
        "game_id": 18,
        "Game": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "game_no": "",
          "name": "",
          "image": "",
          "game_type_id": 0,
          "GameType": {
            "created_time": "0001-01-01 00:00:00",
            "updated_time": "0001-01-01 00:00:00",
            "id": 0,
            "name": "",
            "sort": 0,
            "top": 0,
            "status": 0
          },
          "device_id": "",
          "Device": {
            "created_time": "0001-01-01 00:00:00",
            "updated_time": "0001-01-01 00:00:00",
            "id": 0,
            "name": "",
            "sort": 0,
            "top": 0,
            "status": 0
          },
          "operator_id": "",
          "Operator": {
            "created_time": "0001-01-01 00:00:00",
            "updated_time": "0001-01-01 00:00:00",
            "id": 0,
            "name": "",
            "sort": 0,
            "top": 0,
            "status": 0
          },
          "top": 0,
          "status": 0,
          "sort": 0,
          "pinyin": ""
        },
        "pattern_id": 1,
        "Pattern": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "status": 0,
          "top": 0,
          "sort": 0,
          "seller_service_ratio": 0,
          "buyer_service_ratio": 0,
          "seller_service_price": 0,
          "buyer_service_price": 0
        },
        "send_automatic_time": 100,
        "timeout": 300,
        "penalty_id": 1,
        "Penalty": {
          "created_time": "0001-01-01 00:00:00",
          "updated_time": "0001-01-01 00:00:00",
          "id": 0,
          "name": "",
          "sort": 0,
          "status": 0,
          "seller_penalty_ratio": 0,
          "buyer_penalty_ratio": 0,
          "seller_penalty_price": 0,
          "buyer_penalty_price": 0,
          "platform_income_ratio": 0,
          "platform_income_price": 0
        },
        "goods_no": "NO9962485364713938673838747767",
        "stock": 100,
        "unit": "个",
        "user_id": 63,
        "user": {
          "created_time": null,
          "updated_time": null,
          "disable_time": null,
          "seal_time": null,
          "id": 0,
          "username": "",
          "password": "",
          "im_id": "",
          "avatar": "",
          "nickname": "",
          "user_type": 0,
          "status": 0,
          "login_type": 0,
          "imit": "",
          "qq": "",
          "wei_chat": "",
          "alipay": ""
        },
        "account": "chen11oopp",
        "image": "https://img2.baidu.com/it/u=3192240317,2727236332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
        "title": "王者荣耀售卖超级牛逼的账号先到先得",
        "status": 1,
        "review_status": 1,
        "retail_price": 1000,
        "actual_price": 949.5,
        "connect": "276806275",
        "text": "这个账号超级牛逼的快点来买啊",
        "label": "包赔服务,验证账号",
        "is_play": 0
      }
    ]
  },
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称                      | 类型     | 必选 | 约束 | 中文名 | 说明     |
| ------------------------- | -------- | ---- | ---- | ------ | -------- |
| » code                    | integer  | true | none |        | none     |
| » data                    | [object] | true | none |        | none     |
| »» created_time           | string   | true | none |        | none     |
| »» updated_time           | string   | true | none |        | none     |
| »» release_time           | string   | true | none |        | 发布时间 |
| »» submit_time            | string   | true | none |        | none     |
| »» id                     | integer  | true | none |        | none     |
| »» category_id            | integer  | true | none |        | none     |
| »» Category               | object   | true | none |        | none     |
| »»» created_time          | string   | true | none |        | none     |
| »»» updated_time          | string   | true | none |        | none     |
| »»» id                    | integer  | true | none |        | none     |
| »»» name                  | string   | true | none |        | none     |
| »»» sort                  | integer  | true | none |        | none     |
| »»» top                   | integer  | true | none |        | none     |
| »»» status                | integer  | true | none |        | none     |
| »» is_inspect             | integer  | true | none |        | none     |
| »» sending_id             | integer  | true | none |        | none     |
| »» Sending                | object   | true | none |        | none     |
| »»» created_time          | string   | true | none |        | none     |
| »»» updated_time          | string   | true | none |        | none     |
| »»» id                    | integer  | true | none |        | none     |
| »»» name                  | string   | true | none |        | none     |
| »»» sort                  | integer  | true | none |        | none     |
| »»» status                | integer  | true | none |        | none     |
| »»» top                   | integer  | true | none |        | none     |
| »» sort                   | integer  | true | none |        | none     |
| »» is_indulge             | integer  | true | none |        | none     |
| »» is_authentication      | integer  | true | none |        | none     |
| »» is_account_source      | integer  | true | none |        | none     |
| »» is_reparation          | integer  | true | none |        | none     |
| »» reparation_id          | integer  | true | none |        | none     |
| »» Reparation             | object   | true | none |        | none     |
| »»» created_time          | string   | true | none |        | none     |
| »»» handle_time           | string   | true | none |        | none     |
| »»» service_time          | string   | true | none |        | none     |
| »»» updated_time          | string   | true | none |        | none     |
| »»» id                    | integer  | true | none |        | none     |
| »»» title                 | string   | true | none |        | none     |
| »»» status                | integer  | true | none |        | none     |
| »»» sort                  | integer  | true | none |        | none     |
| »»» ratio                 | integer  | true | none |        | none     |
| »»» price                 | integer  | true | none |        | none     |
| »» game_id                | integer  | true | none |        | none     |
| »» Game                   | object   | true | none |        | none     |
| »»» created_time          | string   | true | none |        | none     |
| »»» updated_time          | string   | true | none |        | none     |
| »»» id                    | integer  | true | none |        | none     |
| »»» game_no               | string   | true | none |        | none     |
| »»» name                  | string   | true | none |        | none     |
| »»» image                 | string   | true | none |        | none     |
| »»» game_type_id          | integer  | true | none |        | none     |
| »»» GameType              | object   | true | none |        | none     |
| »»»» created_time         | string   | true | none |        | none     |
| »»»» updated_time         | string   | true | none |        | none     |
| »»»» id                   | integer  | true | none |        | none     |
| »»»» name                 | string   | true | none |        | none     |
| »»»» sort                 | integer  | true | none |        | none     |
| »»»» top                  | integer  | true | none |        | none     |
| »»»» status               | integer  | true | none |        | none     |
| »»» device_id             | string   | true | none |        | none     |
| »»» Device                | object   | true | none |        | none     |
| »»»» created_time         | string   | true | none |        | none     |
| »»»» updated_time         | string   | true | none |        | none     |
| »»»» id                   | integer  | true | none |        | none     |
| »»»» name                 | string   | true | none |        | none     |
| »»»» sort                 | integer  | true | none |        | none     |
| »»»» top                  | integer  | true | none |        | none     |
| »»»» status               | integer  | true | none |        | none     |
| »»» operator_id           | string   | true | none |        | none     |
| »»» Operator              | object   | true | none |        | none     |
| »»»» created_time         | string   | true | none |        | none     |
| »»»» updated_time         | string   | true | none |        | none     |
| »»»» id                   | integer  | true | none |        | none     |
| »»»» name                 | string   | true | none |        | none     |
| »»»» sort                 | integer  | true | none |        | none     |
| »»»» top                  | integer  | true | none |        | none     |
| »»»» status               | integer  | true | none |        | none     |
| »»» top                   | integer  | true | none |        | none     |
| »»» status                | integer  | true | none |        | none     |
| »»» sort                  | integer  | true | none |        | none     |
| »»» pinyin                | string   | true | none |        | none     |
| »» pattern_id             | integer  | true | none |        | none     |
| »» Pattern                | object   | true | none |        | none     |
| »»» created_time          | string   | true | none |        | none     |
| »»» updated_time          | string   | true | none |        | none     |
| »»» id                    | integer  | true | none |        | none     |
| »»» name                  | string   | true | none |        | none     |
| »»» status                | integer  | true | none |        | none     |
| »»» top                   | integer  | true | none |        | none     |
| »»» sort                  | integer  | true | none |        | none     |
| »»» seller_service_ratio  | integer  | true | none |        | none     |
| »»» buyer_service_ratio   | integer  | true | none |        | none     |
| »»» seller_service_price  | integer  | true | none |        | none     |
| »»» buyer_service_price   | integer  | true | none |        | none     |
| »» send_automatic_time    | integer  | true | none |        | none     |
| »» timeout                | integer  | true | none |        | none     |
| »» penalty_id             | integer  | true | none |        | none     |
| »» Penalty                | object   | true | none |        | none     |
| »»» created_time          | string   | true | none |        | none     |
| »»» updated_time          | string   | true | none |        | none     |
| »»» id                    | integer  | true | none |        | none     |
| »»» name                  | string   | true | none |        | none     |
| »»» sort                  | integer  | true | none |        | none     |
| »»» status                | integer  | true | none |        | none     |
| »»» seller_penalty_ratio  | integer  | true | none |        | none     |
| »»» buyer_penalty_ratio   | integer  | true | none |        | none     |
| »»» seller_penalty_price  | integer  | true | none |        | none     |
| »»» buyer_penalty_price   | integer  | true | none |        | none     |
| »»» platform_income_ratio | integer  | true | none |        | none     |
| »»» platform_income_price | integer  | true | none |        | none     |
| »» goods_no               | string   | true | none |        | 商品编号 |
| »» stock                  | integer  | true | none |        | none     |
| »» unit                   | string   | true | none |        | none     |
| »» user_id                | integer  | true | none |        | none     |
| »» user                   | object   | true | none |        | none     |
| »»» created_time          | null     | true | none |        | none     |
| »»» updated_time          | null     | true | none |        | none     |
| »»» disable_time          | null     | true | none |        | none     |
| »»» seal_time             | null     | true | none |        | none     |
| »»» id                    | integer  | true | none |        | none     |
| »»» username              | string   | true | none |        | none     |
| »»» password              | string   | true | none |        | none     |
| »»» im_id                 | string   | true | none |        | none     |
| »»» avatar                | string   | true | none |        | none     |
| »»» nickname              | string   | true | none |        | none     |
| »»» user_type             | integer  | true | none |        | none     |
| »»» status                | integer  | true | none |        | none     |
| »»» login_type            | integer  | true | none |        | none     |
| »»» imit                  | string   | true | none |        | none     |
| »»» qq                    | string   | true | none |        | none     |
| »»» wei_chat              | string   | true | none |        | none     |
| »»» alipay                | string   | true | none |        | none     |
| »» account                | string   | true | none |        | none     |
| »» image                  | string   | true | none |        | 图片     |
| »» title                  | string   | true | none |        | 标题     |
| »» status                 | integer  | true | none |        | none     |
| »» review_status          | integer  | true | none |        | none     |
| »» retail_price           | integer  | true | none |        | 售价     |
| »» actual_price           | number   | true | none |        | none     |
| »» connect                | string   | true | none |        | none     |
| »» text                   | string   | true | none |        | none     |
| »» label                  | string   | true | none |        | none     |
| »» is_play                | integer  | true | none |        | none     |
| » msg                     | string   | true | none |        | none     |

## POST 获取商品列表信息

POST /api/main/goods_list

> Body 请求参数

```json
"{\r\n    \"game_id\": 18,   //必填字段\r\n    \"page\":1,\r\n    \"sort_type\":0, //默认为0   1 ： 价格降序  2：价格升序  3：时间降序 4：时间升序\r\n    \"device_id\": 0,  //设备id\r\n    \"operator_id\":0,  //运营商id\r\n    \"game_server_id\":\"\",\r\n    \"retail_price_range\":\"\"  //价格区间\r\n}"
```

### 请求参数

| 名称                 | 位置 | 类型    | 必选 | 说明                                                       |
| -------------------- | ---- | ------- | ---- | ---------------------------------------------------------- |
| body                 | body | object  | 否   | none                                                       |
| » game_id            | body | integer | 是   | 必填字段                                                   |
| » page               | body | integer | 是   | none                                                       |
| » sort_type          | body | integer | 是   | 默认为 0 1 ： 价格降序 2：价格升序 3：时间降序 4：时间升序 |
| » device_id          | body | integer | 是   | 设备 id                                                    |
| » operator_id        | body | integer | 是   | 运营商 id                                                  |
| » game_server_id     | body | string  | 是   | none                                                       |
| » retail_price_range | body | string  | 是   | 价格区间                                                   |
| » category_id        | body | integer | 是   | 必填字段                                                   |

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 交易模式获取

POST /api/main/pattern

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 获取商品类型

POST /api/main/category

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

# 游戏 app 接口/IM

## POST test 分配客服

POST /api/im_chat/assign_customer_service

> Body 请求参数

```json
{
  "name": "咨询客服"
}
```

### 请求参数

| 名称   | 位置 | 类型   | 必选 | 说明 |
| ------ | ---- | ------ | ---- | ---- |
| body   | body | object | 否   | none |
| » name | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "Key": 0,
    "Value": {
      "customer_service_id": 129,
      "username": "lee",
      "group_id": 3,
      "admin_id": 7,
      "im_id": "1540912350",
      "avatar": "test/123.jpg",
      "nike_name": "hhh",
      "merchant_id": 0,
      "online_status": 1,
      "is_enabled": 1,
      "created_time": "2025-04-09T15:22:12+08:00"
    }
  },
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称                    | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------------------- | ------- | ---- | ---- | ------ | ---- |
| » code                  | integer | true | none |        | none |
| » data                  | object  | true | none |        | none |
| »» Key                  | integer | true | none |        | none |
| »» Value                | object  | true | none |        | none |
| »»» customer_service_id | integer | true | none |        | none |
| »»» username            | string  | true | none |        | none |
| »»» group_id            | integer | true | none |        | none |
| »»» admin_id            | integer | true | none |        | none |
| »»» im_id               | string  | true | none |        | none |
| »»» avatar              | string  | true | none |        | none |
| »»» nike_name           | string  | true | none |        | none |
| »»» merchant_id         | integer | true | none |        | none |
| »»» online_status       | integer | true | none |        | none |
| »»» is_enabled          | integer | true | none |        | none |
| »»» created_time        | string  | true | none |        | none |
| » msg                   | string  | true | none |        | none |

## POST 强制下线

POST /api/im_chat/offine

> Body 请求参数

```json
"{\r\n    \"platformID\":5,//5为web\r\n    \"userID\":\"1540912350\"\r\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 是   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "response": {
      "errCode": 0,
      "errMsg": "",
      "errDlt": ""
    }
  },
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------- | ------- | ---- | ---- | ------ | ---- |
| » code      | integer | true | none |        | none |
| » data      | object  | true | none |        | none |
| »» response | object  | true | none |        | none |
| »»» errCode | integer | true | none |        | none |
| »»» errMsg  | string  | true | none |        | none |
| »»» errDlt  | string  | true | none |        | none |
| » msg       | string  | true | none |        | none |

# 游戏 app 接口/IM/发送信息

## POST 发送自定义消息

POST /api/im_chat/send_customize_msg

> Body 请求参数

```json
"{\r\n    \"send_id\":\"1521700633\",//发送者id\r\n    \"recv_id\":\"9033656162\",//接受者id\r\n    \"content_type\":110//消息类型\r\n}"
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "errcode": 0,
    "errmsg": "",
    "errdlt": "",
    "Data": {}
  },
  "msg": "发送成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称       | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ---------- | ------- | ---- | ---- | ------ | ---- |
| » code     | integer | true | none |        | none |
| » data     | object  | true | none |        | none |
| »» errcode | integer | true | none |        | none |
| »» errmsg  | string  | true | none |        | none |
| »» errdlt  | string  | true | none |        | none |
| »» Data    | object  | true | none |        | none |
| » msg      | string  | true | none |        | none |

## POST 常用快捷短语

POST /api/im_chat/get_common_phrases

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "response": [
      "您好，请问这个商品是全新的吗,？6",
      "您好，请问这个商品是全新的吗？8999"
    ]
  },
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型     | 必选 | 约束 | 中文名 | 说明 |
| ----------- | -------- | ---- | ---- | ------ | ---- |
| » code      | integer  | true | none |        | none |
| » data      | object   | true | none |        | none |
| »» response | [string] | true | none |        | none |
| » msg       | string   | true | none |        | none |

## POST 发送文本(普通)消息

POST /api/im_chat/send_msg

> Body 请求参数

```json
"{\r\n    \"send_id\": \"8223807102\", //发送者id\r\n    \"recv_id\": \"1540912350\", //接受者id\r\n    \"content\": \"c长度\", //消息类型\r\n}"
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 是   | none |
| body          | body   | object | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "errCode": 0,
    "errMsg": "",
    "errDlt": "",
    "Data": {}
  },
  "msg": "发送成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称       | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ---------- | ------- | ---- | ---- | ------ | ---- |
| » code     | integer | true | none |        | none |
| » data     | object  | true | none |        | none |
| »» errCode | integer | true | none |        | none |
| »» errMsg  | string  | true | none |        | none |
| »» errDlt  | string  | true | none |        | none |
| »» Data    | object  | true | none |        | none |
| » msg      | string  | true | none |        | none |

## POST 业务通知(im 不通)

POST /api/im_chat/send_business_notification

> Body 请求参数

```json
{
  "sendUserID": "1540912350",
  "recvUserID": "1775133197",
  "recvGroupID": "",
  "key": "xxxhghgfh",
  "data": "xxxxxx",
  "sendMsg": false,
  "reliabilityLevel": 1
}
```

### 请求参数

| 名称               | 位置   | 类型    | 必选 | 说明 |
| ------------------ | ------ | ------- | ---- | ---- |
| Authorization      | header | string  | 是   | none |
| body               | body   | object  | 否   | none |
| » sendUserID       | body   | string  | 是   | none |
| » recvUserID       | body   | string  | 是   | none |
| » recvGroupID      | body   | string  | 是   | none |
| » key              | body   | string  | 是   | none |
| » data             | body   | string  | 是   | none |
| » sendMsg          | body   | boolean | 是   | none |
| » reliabilityLevel | body   | integer | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "errCode": 0,
    "errMsg": "",
    "errDlt": "",
    "Data": {}
  },
  "msg": "发送成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称       | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ---------- | ------- | ---- | ---- | ------ | ---- |
| » code     | integer | true | none |        | none |
| » data     | object  | true | none |        | none |
| »» errCode | integer | true | none |        | none |
| »» errMsg  | string  | true | none |        | none |
| »» errDlt  | string  | true | none |        | none |
| »» Data    | object  | true | none |        | none |
| » msg      | string  | true | none |        | none |

## GET 系统通知

GET /api/im/send_system_msg

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "errCode": 0,
    "errMsg": "",
    "errDlt": "",
    "Data": {}
  },
  "msg": "success"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称       | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ---------- | ------- | ---- | ---- | ------ | ---- |
| » code     | integer | true | none |        | none |
| » data     | object  | true | none |        | none |
| »» errCode | integer | true | none |        | none |
| »» errMsg  | string  | true | none |        | none |
| »» errDlt  | string  | true | none |        | none |
| »» Data    | object  | true | none |        | none |
| » msg      | string  | true | none |        | none |

# 游戏 app 接口/IM/群聊

## POST test 创建分组

POST /api/im/create_group

> Body 请求参数

```json
{
  "memberUserIDs": ["2107856965"],
  "adminUserIDs": ["9033656162"],
  "ownerUserID": "8884106924",
  "groupInfo": {
    "groupID": "xdsdsd01",
    "groupName": "yourg group name",
    "notification": "notification",
    "introduction": "introduction",
    "faceURL": "faceURL url",
    "ex": "ex",
    "groupType": 2,
    "needVerification": 0,
    "lookMemberInfo": 0,
    "applyMemberFriend": 0
  }
}
```

### 请求参数

| 名称                 | 位置 | 类型     | 必选 | 说明 |
| -------------------- | ---- | -------- | ---- | ---- |
| body                 | body | object   | 否   | none |
| » memberUserIDs      | body | [string] | 是   | none |
| » adminUserIDs       | body | [string] | 是   | none |
| » ownerUserID        | body | string   | 是   | none |
| » groupInfo          | body | object   | 是   | none |
| »» groupID           | body | string   | 是   | none |
| »» groupName         | body | string   | 是   | none |
| »» notification      | body | string   | 是   | none |
| »» introduction      | body | string   | 是   | none |
| »» faceURL           | body | string   | 是   | none |
| »» ex                | body | string   | 是   | none |
| »» groupType         | body | integer  | 是   | none |
| »» needVerification  | body | integer  | 是   | none |
| »» lookMemberInfo    | body | integer  | 是   | none |
| »» applyMemberFriend | body | integer  | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "response": {
      "errCode": 0,
      "errMsg": "",
      "errDlt": "",
      "data": {}
    }
  },
  "msg": "获取成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------- | ------- | ---- | ---- | ------ | ---- |
| » code      | integer | true | none |        | none |
| » data      | object  | true | none |        | none |
| »» response | object  | true | none |        | none |
| »»» errCode | integer | true | none |        | none |
| »»» errMsg  | string  | true | none |        | none |
| »»» errDlt  | string  | true | none |        | none |
| »»» data    | object  | true | none |        | none |
| » msg       | string  | true | none |        | none |

## POST 创建群聊

POST /api/im_chat/create_chat_group

> Body 请求参数

```json
{
  "group_name": "咨询客服",
  "good_name": "王者荣耀0199",
  "im_seller_id": "4756257284",
  "im_buyer_id": "4460521914"
}
```

### 请求参数

| 名称           | 位置 | 类型   | 必选 | 说明 |
| -------------- | ---- | ------ | ---- | ---- |
| body           | body | object | 否   | none |
| » group_name   | body | string | 是   | none |
| » good_name    | body | string | 是   | none |
| » im_seller_id | body | string | 是   | none |
| » im_buyer_id  | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": "",
  "msg": "创建群聊成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称   | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ------ | ------- | ---- | ---- | ------ | ---- |
| » code | integer | true | none |        | none |
| » data | string  | true | none |        | none |
| » msg  | string  | true | none |        | none |

## POST 移除群好友

POST /api/im_group/kick_group_user

> Body 请求参数

```json
{
  "groupID": "25042411523401010002",
  "kickedUserIDs": ["4460521914"]
}
```

### 请求参数

| 名称            | 位置 | 类型     | 必选 | 说明 |
| --------------- | ---- | -------- | ---- | ---- |
| body            | body | object   | 否   | none |
| » groupID       | body | string   | 是   | none |
| » kickedUserIDs | body | [string] | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "response": {
      "errCode": 0,
      "errMsg": "",
      "errDlt": ""
    }
  },
  "msg": "移除成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------- | ------- | ---- | ---- | ------ | ---- |
| » code      | integer | true | none |        | none |
| » data      | object  | true | none |        | none |
| »» response | object  | true | none |        | none |
| »»» errCode | integer | true | none |        | none |
| »»» errMsg  | string  | true | none |        | none |
| »»» errDlt  | string  | true | none |        | none |
| » msg       | string  | true | none |        | none |

## POST 群组取消禁言

POST /api/im_group/mute_group

> Body 请求参数

```json
{
  "groupID": "25042411523401010002"
}
```

### 请求参数

| 名称      | 位置 | 类型   | 必选 | 说明 |
| --------- | ---- | ------ | ---- | ---- |
| body      | body | object | 否   | none |
| » groupID | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "response": {
      "errCode": 0,
      "errMsg": "",
      "errDlt": ""
    }
  },
  "msg": "移除成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称        | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ----------- | ------- | ---- | ---- | ------ | ---- |
| » code      | integer | true | none |        | none |
| » data      | object  | true | none |        | none |
| »» response | object  | true | none |        | none |
| »»» errCode | integer | true | none |        | none |
| »»» errMsg  | string  | true | none |        | none |
| »»» errDlt  | string  | true | none |        | none |
| » msg       | string  | true | none |        | none |

## POST 根据 im_group_id 获取群组信息

POST /api/im_group/get_groupinfo_by_imgroupid

> Body 请求参数

```json
{
  "groupID": "25042513385601010001"
}
```

### 请求参数

| 名称          | 位置   | 类型   | 必选 | 说明 |
| ------------- | ------ | ------ | ---- | ---- |
| Authorization | header | string | 是   | none |
| body          | body   | object | 否   | none |
| » groupID     | body   | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "imGroup": {
      "id": 169,
      "group_name": "王者荣耀daye",
      "group_avatar": "",
      "im_group_id": "25042513385601010001",
      "member_count": 0,
      "im_owner_id": "1540912350",
      "seller_id": 43,
      "buyer_id": 61,
      "good_id": 41,
      "status": 1,
      "created_time": "2025-04-25T21:38:57+08:00",
      "updated_time": "2025-04-25T21:38:57+08:00",
      "delete_time": "0001-01-01T00:00:00Z"
    }
  },
  "msg": "获取群组信息成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称             | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ---------------- | ------- | ---- | ---- | ------ | ---- |
| » code           | integer | true | none |        | none |
| » data           | object  | true | none |        | none |
| »» imGroup       | object  | true | none |        | none |
| »»» id           | integer | true | none |        | none |
| »»» group_name   | string  | true | none |        | none |
| »»» group_avatar | string  | true | none |        | none |
| »»» im_group_id  | string  | true | none |        | none |
| »»» member_count | integer | true | none |        | none |
| »»» im_owner_id  | string  | true | none |        | none |
| »»» seller_id    | integer | true | none |        | none |
| »»» buyer_id     | integer | true | none |        | none |
| »»» good_id      | integer | true | none |        | none |
| »»» status       | integer | true | none |        | none |
| »»» created_time | string  | true | none |        | none |
| »»» updated_time | string  | true | none |        | none |
| »»» delete_time  | string  | true | none |        | none |
| » msg            | string  | true | none |        | none |

# 游戏 app 接口/IM/登入

## POST test 注册

POST /api/im_chat/im_login

> Body 请求参数

```json
{
  "phone": "15954656414",
  "password": "fe1a10e4576c9db0b40e26b9ffa38ea6",
  "nike_name": "test"
}
```

### 请求参数

| 名称        | 位置 | 类型   | 必选 | 说明 |
| ----------- | ---- | ------ | ---- | ---- |
| body        | body | object | 否   | none |
| » phone     | body | string | 是   | none |
| » password  | body | string | 是   | none |
| » nike_name | body | string | 是   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "errCode": 0,
    "errMsg": "",
    "errDlt": "",
    "data": {
      "imToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI4MjQwODg2MDM4IiwiUGxhdGZvcm1JRCI6NSwiZXhwIjoxNzUzMDE1MTg0LCJpYXQiOjE3NDUyMzkxNzl9.s6fGBY6g_QjokoXdKfWdyZj9Heha60ZipmTskxJ7vJc",
      "chatToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI4MjQwODg2MDM4IiwiVXNlclR5cGUiOjEsIlBsYXRmb3JtSUQiOjAsImV4cCI6MTc1MzAxNTE4NCwibmJmIjoxNzQ1MjM5MTI0LCJpYXQiOjE3NDUyMzkxODR9.VqeM1I04LOuOHaG8_k3CJyCHvgWAD1pWOw_9kFLpV6I",
      "userID": "8240886038"
    }
  },
  "msg": "成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称          | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ------------- | ------- | ---- | ---- | ------ | ---- |
| » code        | integer | true | none |        | none |
| » data        | object  | true | none |        | none |
| »» errCode    | integer | true | none |        | none |
| »» errMsg     | string  | true | none |        | none |
| »» errDlt     | string  | true | none |        | none |
| »» data       | object  | true | none |        | none |
| »»» imToken   | string  | true | none |        | none |
| »»» chatToken | string  | true | none |        | none |
| »»» userID    | string  | true | none |        | none |
| » msg         | string  | true | none |        | none |

## POST 修改密码

POST /api/change_password

> Body 请求参数

```json
"{\r\n  \"phoneNumber\":\"13229378229\",//手机号码\r\n  \"currentPassword\": \"6ddfda3df1aa26f0\",//当前密码\r\n  \"newPassword\": \"fe1a10e4576c9db0b40e26b9ffa38ea5\",//要修改的密码\r\n  \"userID\": \"4460521914\",//imid\r\n  \"platform\":3//1：iOS，2：Android，3：Windows，4：OSX，5：WEB，6：小程序，7：linux，8：AndroidPad，9：IPad，10：Admin\r\n}"
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "errCode": 0,
    "errMsg": "",
    "errDlt": ""
  },
  "msg": "修改密码成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称       | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ---------- | ------- | ---- | ---- | ------ | ---- |
| » code     | integer | true | none |        | none |
| » data     | object  | true | none |        | none |
| »» errCode | integer | true | none |        | none |
| »» errMsg  | string  | true | none |        | none |
| »» errDlt  | string  | true | none |        | none |
| » msg      | string  | true | none |        | none |

## POST web 客服坐席商户坐席登入

POST /127.0.0.1:8080/api/web_login

> Body 请求参数

```json
"{\r\n    \"type\":2, //1:验证码登录  2：账号密码登录   (type：1  密码可以不用传  type:2 验证码可以不用传)\r\n    \"username\":\"13229378290\",\r\n    \"password\":\"li1234564\",  //\r\n    \"platform\":5//登入终端标识 web\r\n}"
```

### 请求参数

| 名称 | 位置 | 类型   | 必选 | 说明 |
| ---- | ---- | ------ | ---- | ---- |
| body | body | object | 否   | none |

> 返回示例

> 406 Response

```json
{
  "code": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDYxNzM5NDUsInVzZXJuYW1lIjoiMTMyMjkzNzgyOTAiLCJ1c2VyX2lkIjo2MiwidXNlcl90eXBlIjoidXNlciJ9.2r5_1HFXFGf7acb5L0MWxAnd-1UW4lDRftF6a9TgvRY"
  },
  "msg": "登录成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                                          | 说明 | 数据模型 |
| ------ | ------------------------------------------------------------------- | ---- | -------- |
| 406    | [Not Acceptable](https://tools.ietf.org/html/rfc7231#section-6.5.6) | none | Inline   |

### 返回数据结构

状态码 **406**

| 名称    | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ------- | ------- | ---- | ---- | ------ | ---- |
| » code  | integer | true | none |        | none |
| » error | string  | true | none |        | none |
| » msg   | string  | true | none |        | none |

# 游戏 app 接口/买号

## POST 订单入库

POST /api/order/save

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 获取包赔信息

POST /api/order/reparation

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 订单支付

POST /api/order/order_play

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 修改订单状态和更改订单价格

POST /api/order/order_status_set

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

## POST 买家和卖家订单列表显示

POST /api/order/order_list

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

# 游戏 app 接口/图片

## POST 我要买主页图

POST /api/images/my_want_buy_img

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "img": "https://q2.itc.cn/q_70/images01/20241209/acb97eb9b1ae4757a6bdd2af588f34c6.jpeg"
  },
  "msg": "成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称   | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ------ | ------- | ---- | ---- | ------ | ---- |
| » code | integer | true | none |        | none |
| » data | object  | true | none |        | none |
| »» img | string  | true | none |        | none |
| » msg  | string  | true | none |        | none |

## POST banner 轮播图

POST /api/images/get_banner_img

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "list": [
      "https://q2.itc.cn/q_70/images01/20241209/acb97eb9b1ae4757a6bdd2af588f34c6.jpeg",
      "https://i-blog.csdnimg.cn/img_convert/183ab75f26f853607e239b52590bbc0a.png",
      "https://pic1.zhimg.com/v2-d381ffe62c3c15cbed51dd785c8eeda0_1440w.jpg"
    ]
  },
  "msg": "成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称    | 类型     | 必选 | 约束 | 中文名 | 说明 |
| ------- | -------- | ---- | ---- | ------ | ---- |
| » code  | integer  | true | none |        | none |
| » data  | object   | true | none |        | none |
| »» list | [string] | true | none |        | none |
| » msg   | string   | true | none |        | none |

## POST 海报主页图

POST /api/images/get_poster_img

> 返回示例

> 200 Response

```json
{
  "code": 200,
  "data": {
    "img": "https://q2.itc.cn/q_70/images01/20241209/acb97eb9b1ae4757a6bdd2af588f34c6.jpeg"
  },
  "msg": "成功"
}
```

### 返回结果

| 状态码 | 状态码含义                                              | 说明 | 数据模型 |
| ------ | ------------------------------------------------------- | ---- | -------- |
| 200    | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none | Inline   |

### 返回数据结构

状态码 **200**

| 名称   | 类型    | 必选 | 约束 | 中文名 | 说明 |
| ------ | ------- | ---- | ---- | ------ | ---- |
| » code | integer | true | none |        | none |
| » data | object  | true | none |        | none |
| »» img | string  | true | none |        | none |
| » msg  | string  | true | none |        | none |

# 数据模型
