// 订单tab
export const ORDER_TABS = [
  {
    imgSrc: require("@/static/images/ic_gm.png"),
    title: "购买订单",
    url: "/pages/nft/orderList/buy",
  },
  // { imgSrc: require("@/static/images/ic_js.png"), title: "寄售订单", url: "/pages/nft/orderList/sell" },
  {
    imgSrc: require("@/static/images/ic_kt.png"),
    title: "空投订单",
    url: "/pages/nft/orderList/airdrop",
  },
  {
    imgSrc: require("@/static/images/ic_zz.png"),
    title: "转赠订单",
    url: "/pages/nft/orderList/transfer",
  },
  {
    imgSrc: require("@/static/images/open_box/ic_mhjl.png"),
    title: "盲盒记录",
    url: "/pages/nft/collection/boxRecord",
  },
];

// item菜单列表
export const ITEM_LIST = [
  // {
  //     icon: require("@/static/images/ic_dzgl.png"),
  //     title: "地址管理",
  //     url: '/pages/nft/user/address/index',
  // },
  // {
  //     icon: require("@/static/images/ic_wdsc.png"),
  //     title: "我的收藏",
  //     url: '/pages/nft/user/address/index',
  // },
  {
    icon: require("@/static/images/ic_fxiang.png"),
    title: "分享",
    url: "/pages/nft/user/invitation/index",
    value: "邀请好友赢大礼",
    share: true,
  },
  {
    icon: require("@/static/images/ic_dkq.png"),
    title: "抵用券",
    url: "/pages/nft/user/integral/index",
    value: "0",
    type: "integral",
  },
  {
    icon: require("@/static/images/ic_sde.png"),
    title: "杉德支付",
    url: "/pages/nft/user/notice/index",
  },
  {
    icon: require("@/static/images/ic_dlcp.png"),
    title: "点亮说明",
    url: "/pages/nft/mix/illustrate",
  },
  {
    icon: require("@/static/images/ic_ysxy.png"),
    title: "隐私协议",
    url: "/pages/nft/user/agreement/secret",
  },
  {
    icon: require("@/static/images/ic_yhxy.png"),
    title: "用户协议",
    url: "/pages/nft/user/agreement/user",
  },
  // {
  //     icon: require("@/static/images/ic_gm.png"),
  //     title: "关于我们",
  //     url: '/pages/nft/user/agreement/us',
  // },
  {
    icon: require("@/static/images/ic_yjfk.png"),
    title: "意见反馈",
    url: "/pages/nft/user/feedback/index",
    // feedback: true,
  },
  {
    icon: require("@/static/images/ic_gywm.png"),
    title: "进入社群",
    feedback: true,
  },
];

//客服联系二维码
export const SERVICE_IMG = require("@/static/images/test/sq.png");
