<template>
  <view>
    <u-navbar
      placeholder
      title="支付成功"
      :titleStyle="{
        'font-size': '38upx',
        'font-family': '微软雅黑',
        'font-weight': 'bold',
      }"
      @leftClick="goBack"
      :border="false"
    >
    </u-navbar>
    <!-- <com-page title="支付成功" :border="false"> -->
    <view class="flex_center">
      <u-icon
        :name="require(`@/static/images/ic_zfcg.png`)"
        size="70"
        class="icon flex_center"
      ></u-icon>
      <view class="mg_b_40"> 订单支付成功 </view>
      <view class="flex_between wd_100">
        <u-button class="check_btn" color="#131b32" plain @click="checkBtn"
          >查看订单</u-button
        >
        <u-button class="main_btn" @click="buyAgain">继续购买</u-button>
      </view>
    </view>
    <!-- </com-page> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      collectionId: "",
      orderId: "",
    };
  },
  created() {},
  onLoad(e) {
    const { id, orderId } = e;
    this.collectionId = id;
    this.orderId = orderId;
  },
  methods: {
    // 查看订单
    checkBtn() {
      uni.redirectTo({
        url: `/pages/nft/orderList/detail?type=1&orderId=${this.orderId}`,
      });
    },
    // 再次购买
    buyAgain() {
      uni.redirectTo({
        url: `/pages/nft/collection/commodity?id=${this.collectionId}&type=1`,
      });
    },
    // 返回
    goBack() {
      uni.redirectTo({
        url: `/pages/nft/collection/commodity?id=${this.collectionId}&type=1`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  margin: 150upx auto 30upx;
  width: 100%;
}
.main_btn,
.check_btn {
  width: 280upx;
  margin: auto;
}
/deep/ .container {
  height: calc(100vh - 88upx);
}
</style>
