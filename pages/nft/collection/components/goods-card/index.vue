<template>
  <view class="goods" @tap.stop="handlerGoods">
    <image
      class="goods_image"
      :src="goods.productCover"
      mode="aspectFill"
    ></image>
    <!-- <view class="bright" v-if="goods.productType == 5">
			<text>已点亮</text>
		</view> -->
    <block v-if="isChecked">
      <view
        :class="['checked', { active: goods.checked }]"
        @tap.stop="changeChecked"
      >
        <!-- <u-icon name="checkmark" v-if="goods.checked" color="#000000"></u-icon> -->
        <!-- <u-icon name="checkbox-mark" v-else color="#000000"></u-icon> -->
        <image
          v-if="goods.checked"
          class="check_icon"
          src="@/static/images/check.png"
          mode="aspectFill"
        ></image>
      </view>
    </block>
    <view class="goods_name u-line-1">
      <text>{{ goods.productName }}</text>
    </view>
    <view class="goods_series">
      <view class="left">
        <text>{{ goods.seriesName }}</text>
      </view>
      <view class="right">
        <text>#{{ goods.number }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      defalut: () => ({}),
    },
    isClick: {
      type: Boolean,
      default: true,
    },
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  mounted() {
    uni.preloadPage({ url: "/pages/nft/goods/index" });
  },
  methods: {
    changeChecked() {
      this.$emit("changeChecked", this.goods);
    },
    handlerGoods() {
      if (!this.isClick) {
        this.changeChecked();
      } else {
        this.$emit("click", this.goods);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.goods {
  padding: 322rpx 19rpx 19rpx;
  position: relative;
  width: 330rpx;
  height: 410rpx;
  background: #ffffff;
  box-shadow: 0rpx 3rpx 7rpx 0rpx #d9d9d9;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  .bright {
    position: absolute;
    top: 0;
    left: 22upx;
    z-index: 100;
    padding: 0 11upx;
    min-width: 80upx;
    height: 36upx;
    line-height: 36upx;
    background: #d8ed48;
    border-radius: 6upx;
    text-align: center;
    font-size: 20upx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #010101;
  }
  .goods_name {
    margin-bottom: 16rpx;
    width: 247rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .goods_series {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #b3b3b3;
  }
  .goods_image {
    position: absolute;
    top: -14rpx;
    right: -4rpx;
    width: 326rpx;
    height: 326rpx;
    border-radius: 20rpx;
  }
  .checked {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    width: 24upx;
    height: 24upx;
    background: #ffffff;
    border: 1upx solid #cccccc;
    border-radius: 6upx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000000;
  }
  .active {
    border: 1rpx solid #d8ed48;
    background: #d8ed48;
    .check_icon {
      width: 24rpx;
      height: 24rpx;
      border-radius: 6rpx;
    }
  }
}
</style>