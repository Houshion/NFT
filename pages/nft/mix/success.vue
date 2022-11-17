<template>
  <view class="mix">
    <com-home>
      <view class="lightUpProduct">
        <view class="titleBackground"></view>
        <view class="title">{{ productMsg.equipmentName }}</view>
        <view class="img">
          <u--image
            :src="productMsg.equipmentCover"
            width="530upx"
            height="530upx"
            radius="20upx"
          ></u--image>
        </view>
      </view>
      <view class="tac white pd_20 font_16"> 点亮成功，获得装备形态 </view>
      <view class="check" @click="ToMyCollection">查看藏品</view>
    </com-home>
  </view>
</template>

<script>
import { lightProductDetail } from "@/api/nft/collection";
export default {
  data() {
    return {
      // 用户藏品信息
      productMsg: "",
      // 对应消耗藏品信息
      consumeMsg: {
        open: false,
        list: [],
        selectMsg: {},
      },
      form: {
        consumeMemberProductId: "",
        memberProductId: "",
      },
    };
  },
  methods: {
    // 获取用户个人藏品详情信息
    async getInfo(id) {
      const { data } = await lightProductDetail(id);
      this.productMsg = data;
    },
    // 点亮藏品
    async ToMyCollection() {
      uni.switchTab({
        url: "/pages/nft/collection/list",
      });
    },
  },
  async onLoad(e) {
    this.form.memberProductId = e.id;
    this.getInfo(e.id);
  },
};
</script>

<style lang="scss" scoped>
.mix {
  /deep/.container {
    /* #ifdef APP-PLUS */
    padding-top: 88upx;
    /* #endif */
    min-height: 100vh;
  }
  /deep/ .home {
    background-image: url("../../../static/images/ic_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #f7f7f7;
  }
  .lightUpProduct {
    position: relative;
    width: 560upx;
    margin: auto;
    /* #ifdef APP-PLUS */
    padding-top: 100upx;
    /* #endif */
    /* #ifdef H5 */
    padding-top: 180upx;
    /* #endif */
    .img {
      position: relative;
      z-index: 2;
      padding: 15upx;
      border-radius: 20upx;
      background: $white_color;
    }
    .titleBackground {
      background: $minor_color;
      margin: auto;
      width: 520upx;
      height: 80upx;
      transform: rotate(3deg);
      border-radius: 14upx 14upx 0 0;
      z-index: 1;
    }
    .title {
      position: relative;
      z-index: 2;
      margin-top: -70upx;
      margin-bottom: 10upx;
      padding-left: 40upx;
    }
  }
  .check {
    margin: 0 10%;
    background: $minor_color;
    border-radius: 60upx;
    text-align: center;
    padding: 20upx 0;
  }
  .backBtn {
    position: absolute;
    /* #ifdef H5 */
    top: 30upx;
    /* #endif */
    /* #ifdef APP-PLUS */
    top: 108upx;
    /* #endif */
    left: 30upx;
    background: rgba($color: $white_color, $alpha: 0.6);
    padding: 10upx;
    border-radius: 50%;
  }
}
</style>
