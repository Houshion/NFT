<template>
  <view class="commodity">
    <com-home>
      <u-icon name="arrow-left" class="backBtn" @click="goback"></u-icon>
      <view class="main">
        <view class="mainImg" id="mainImg">
          <u--image
            :src="collectionMsg.repurchaseProductCover"
            width="460upx"
            height="460upx"
            radius="30upx"
            class="img"
          >
          </u--image>
        </view>
      </view>
      <view class="mainMsg tac">
        <view class="name font_16 font_b pd_20">{{
          collectionMsg.repurchaseProductName
        }}</view>
        <view class="flex_center flex_v_center">
          <view class="info_light font_11">回购价格：</view>
          <com-price :price="collectionMsg.repurchasePrice"></com-price>
        </view>
        <view class="flex_center mg_t_10 mg_b_5">
          <view class="limit">
            限量：{{ collectionMsg.canRepurchaseCount }}/{{
              collectionMsg.totalLimitCount
            }}
          </view>
        </view>
        <view class="time info_light">
          {{ collectionMsg.activityStartTime | timeStr("Y.m.d H:i") }} 至
          {{ collectionMsg.activityEndTime | timeStr("Y.m.d H:i") }}
        </view>
      </view>
      <view class="saleBack">
        <view class="btn" @click="toOrder">马上回购</view>
      </view>
      <view class="content pd_15 pd_t_0">
        <u-parse :content="collectionMsg.activityContent"></u-parse>
      </view>
    </com-home>
    <u-alert
      v-if="!userInfo.mobile"
      class="alert"
      description="您还没有登录，去登录>"
      type="warning"
      closable
      @click="goLogin"
    >
         
    </u-alert>
    <u-alert
      v-show="!isAuth"
      class="alert"
      description="您还没有实名认证，无法购买藏品，去实名>"
      type="warning"
      closable
      @click="goAuth"
    >
    </u-alert>
    <recovery-power
      v-if="showBuyPower"
      :list="qualificationProducts"
      :show.sync="showBuyPower"
      @handlerClick="confirmBuyPower"
    ></recovery-power>
  </view>
</template>


<script>
import store from "@/store";
import MoveVerify from "@/components/moveVerify";
import RecoveryPower from "./components/recovery-power/index";
import {
  repurchaseActivityInfo,
  getCanRepurchaseProducts,
} from "@/api/nft/recovery";
import { orderAdd, checkStatus } from "@/api/nft/order";
import { getAuthStatus } from "@/api/nft/user";
import { loadUserInfo } from "@/util/cache";
export default {
  components: { MoveVerify, RecoveryPower },
  data() {
    return {
      isOnLoad: true,
      timer: null,
      showPopNumber: false,
      //购买权验证弹框
      showBuyPower: false,
      // 购买资格列表
      qualificationProducts: [],
      // 藏品信息
      collectionMsg: {},
      // 装备信息
      EquipmentMsg: {},
      // 产品图片
      productImg: "",
      form: {
        memberId: loadUserInfo().id,
        productId: "",
      },
      // 页面信息
      pageMsg: {
        pageNum: 1,
        pageSize: 10,
      },
      // 用户信息
      userInfo: loadUserInfo(),
      isAuth: false, // 是否认证
    };
  },
  computed: {
    btnStyle() {
      const STYLE = {
        width: "310upx",
        height: "88upx",
        lineHeight: "88upx",
        border: "none",
        borderRadius: "44upx",
        fontSize: "30upx",
        fontFamily: "PingFang SC",
        fontWeight: 500,
        margin: 0,
      };
      const primary = {
        ...STYLE,
        backgroundColor: "#131B32",
        color: "#ffffff",
      };
      const orange = {
        ...STYLE,
        backgroundColor: "#ffffff",
        border: "1upx solid #131B32",
        color: "#131B32",
      };
      return { primary, orange };
    },
  },
  methods: {
    /**
     * 藏品回购
     */
    async toOrder() {
      const res = await this.beforeCreateOrder();
      if (!res) return false;
      const { data } = await getCanRepurchaseProducts({
        activityId: this.collectionMsg.id,
      });
      this.qualificationProducts = data.productVos || [];
      this.showBuyPower = true;
    },
    confirmBuyPower(list) {
      store.dispatch("setRecovery", {
        recoveryMsg: this.collectionMsg,
        recoveryList: list,
      });
      uni.navigateTo({
        url: "/pages/nft/recovery/confirm",
      });
    },
    // 验证结果
    verifyResult({ flag }) {
      if (flag) {
        this.verifyForm.show = false;
        this.createOrder(this.form);
      }
    },
    // 创建订单
    createOrder(params) {
      uni.showLoading({
        title: "下单中，请稍候...",
        mask: true,
      });
      setTimeout(() => {
        orderAdd(params).then((res) => {
          uni.hideLoading();
          if (res.code == 1005)
            this.base
              .modal(
                "温馨提示",
                "您尚有未完成的订单，请先支付/取消该订单",
                "去看看"
              )
              .then((status) => {
                if (status)
                  uni.navigateTo({
                    url: `/pages/nft/order/pay?orderId=${res.data}`,
                  });
              });
          else {
            uni.navigateTo({
              url: `/pages/nft/order/pay?orderId=${res.data.orderId}`,
            });
          }
        });
      }, 1500);
    },
    // 创建订单前置条件验证
    beforeCreateOrder() {
      return new Promise(async (resolve, reject) => {
        if (!this.userInfo.mobile) {
          this.base
            .modal("未登录", "登录后才可购买心爱的藏品", "去登录")
            .then((res) => {
              if (res) this.goLogin();
            });
          reject();
        } else if (!this.isAuth) {
          this.base
            .modal("暂未实名", "实名认证后才可购买心爱的藏品", "去实名")
            .then((res) => {
              if (res) this.goAuth();
            });
          reject();
        } else {
          uni.showLoading({
            title: "请求中，请稍候...",
            mask: true,
          });
          resolve(true);
        }
      });
    },
    checkAuthStatus() {
      return new Promise(async (resolve, reject) => {
        const { data } = await getAuthStatus();
        if (data == 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    },
    // 返回上一页
    goback() {
      uni.navigateBack();
    },
    goLogin() {
      uni.navigateTo({
        url: "/pages/nft/public/login",
      });
    },
    goAuth() {
      uni.navigateTo({
        url: "/pages/nft/user/set/auth",
      });
    },
    // 初始化商品信息
    async initval() {
      const { data } = await repurchaseActivityInfo(this.form.productId);
      this.collectionMsg = data;
    },
  },
  async onLoad(e) {
    e.token ? store.dispatch("setToken", e.token) : "";
    this.form.productId = e.id;
    this.initval();
    setTimeout(() => {
      this.isOnLoad = false;
    }, 500);
  },
  async onShow() {
    if (this.userInfo.mobile) {
      this.isAuth = await this.checkAuthStatus();
    }
    // 首次加载由onLoad执行
    if (this.isOnLoad) return;
    if (this.timer) clearTimeout(this.timer);
    this.initval();
  },
};
</script>

<style lang="scss" scoped>
.commodity {
  /deep/.container {
    /* #ifdef APP-PLUS */
    padding-top: 88upx;
    /* #endif */
    min-height: 100%;
  }

  /deep/.home {
    background-image: url("../../../static/images/ic_bg_r.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-height: 100vh;
    background-color: $white_color;
  }

  .main {
    text-align: center;
    padding-top: 108upx;

    .mainImg {
      background: $white_color;
      border-radius: 30upx;
      width: 460upx;
      height: 460upx;
      margin: auto;
      transform-style: preserve-3d;
      transition: 4s ease;
      position: relative;

      .img {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* Chrome 、Safari */
        -moz-backface-visibility: hidden;
        /* Firefox */
        -ms-backface-visibility: hidden;
        /* Internet Explorer */
      }
    }
  }
  .mainMsg {
    .limit {
      border-radius: 5upx;
      border: 1px solid $record_color;
      color: $record_color;
      font-size: 24upx;
      padding: 3upx 10upx;
    }
  }
  .saleBack {
    .btn {
      width: 470upx;
      line-height: 88upx;
      height: 88upx;
      background: $main_color;
      border-radius: 44upx;
      margin: 60upx auto;
      text-align: center;
      font-size: 30upx;
      color: $white_color;
    }
  }
}

.alert {
  position: fixed;
  width: 100%;
  bottom: 148upx;
  z-index: 2;
}
</style>
