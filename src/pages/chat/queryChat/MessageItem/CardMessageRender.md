智能卡片业务设计
{
"intelligentType":1,//智能卡片类型：1，普通类型（仅有标题和正文内容）；2，商品链接类型（正标题商品图标，商品描述，价格）；3，商品链接类型（正标题，副标题（交易时间和订单状态），商品图标，商品描述，价格，1个操作按钮）；4，标题+1个操作按钮；5 ，标题+正文内容+1个操作按钮;6 ，标题+列表类型正文+2个操作按钮;7 ，订单链接类型（订单状态，商品图标，商品描述，价格，可买包赔标签，官方验号标签）
"title":"我是标题",
"content":"我是正文内容"
}


{
"intelligentType":1,
"title":"买家交易须知",
"content":"交易前,可以与卖家协商好价格、运费和退换货 政策等。如果卖家要求私下交易或者使用其他 支付方式,一定要拒绝,以免遭受损失"
}

{
"intelligentType":2,
"title":"分享了一个商品",
"icon":"http://www.taohao8.com/piture/image_3254398.png",
"content":"V8可二次典藏武则天貂 可二次典藏武则天貂",
"price":"1288",
"url":"http://www.taohao8.com/4387fdhdsah.html"
}

{
"intelligentType":3,
"title":"我想咨询这笔订单",
"secondTitle":{"time":"2025-02-22 12:30:21","state":"已完成","state_type":"1","state_type_color":"#00ff00"},
"price":"1288",
"icon":"http://www.taohao8.com/image_443443.png",
"content":"V8可二次典藏武则天貂 可二次典藏武则天貂",
"price":"1288",
"button":{"text":"查看订单" , "url":"http://www.taohao8.com/4387fdhdsah.html"
}
}

{
"intelligentType":4,
"title":"游戏账号、密码将提供给买家进行验证 换绑",
"button":{"text":"去填写" , "url":"http://www.taohao8.com/4387fdhdsah.html"
}
}

{
"intelligentType":5,
"title":{"text":"订单已完成","color":"#00ff00"},
"content":"买家已确认收货，卖家可进行提现操作",
"button":{"text":"去提现" , "url":"http://www.taohao8.com/4387fdhdsah.html"
}
}

{
    "intelligentType": 6,
    "title": "卖家确认换绑是否成功",
    "contentList": [
        "绑定手机号码已变更为买家信息",
        " 个人隐私信息已删除",
        "其他账号或关联软件已解除"
    ],
    "buttonList": [
        {
            "text": "换绑有问题",
            "color": "#ff0000",
            "url": "http://www.taohao8.com/huanbangyouwenti.html"
        },
        {
            "text": "全部换绑完成",
            "color": "#EACA92",
            "url": "http://www.taohao8.com/quanbuhuanbangwancheng.html"
        }
    ]
}

{
    "intelligentType": 7,
    "content":"V8可二次典藏武则天貂蝉",
    "labelList" : ["可买包赔","官方验号"],
"price":"1288",
"state":{"text":"待付款","color":"#ff0000"},
"url":"http://www.taohao8.com/fdfera8932549.html"
}


{"intelligentType":8,"title":"买家交易须知","contentJson":[{"key":"游戏名称", "value":"王者荣耀"},{"key":"账号", "value":"dsd22222"},{"key":"账号价格", "value":"500.00元"},{"key":"包赔费", "value":"50.00元"}]}

{"intelligentType":9,"title":"待买家付款","contentJson":[{"key":"游戏名称", "value":"王者荣耀"},{"key":"交易类型", "value":"快速回收"},{"key":"订单编号", "value":"zfvfg54677843"},{"key":"商品编号", "value":"221435465"},{"key":"账号价格", "value":"500.00元"},{"key":"包赔费", "value":"50.00元"},{"key":"服务费", "value":"10.00元"},{"key":"订单金额", "value":"560.00元"}] , "button":{"text":"立即支付" ,"url":{"platform":2,"pageName":"OrderDetailsActivity","paramId":24}}}
