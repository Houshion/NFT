<template>
  <view class="result">
    <view class="navbar">
      <view :style="{ height: statusHeight + 'px' }"></view>
      <view class="nav_header">
        <view class="nav_left">
          <view class="back" @tap.stop="goback">
            <u-icon name="arrow-left" color="#ffffff" size="26rpx"></u-icon>
          </view>
        </view>
        <view class="nav_center">
          <view class="nav_title">
            <!-- <text>{{list[current] && list[current].productName}}</text> -->
          </view>
        </view>
        <view class="nav_right"></view>
      </view>
    </view>
    <view
      class="banner"
      :style="[
        list.length > 1 ? { marginBottom: '59upx' } : { marginBottom: '60upx' },
      ]"
    >
      <swiper
        autoplay
        :interval="3500"
        :current="current"
        circular
        @change="swiperChange"
      >
        <swiper-item
          v-for="(item, index) in list"
          :key="index"
          class="swiper_item"
        >
          <view class="item">
            <view class="item_header">
              <image class="lave" :src="item.rarityIcon"></image>
              <view class="title u-line-1">
                <text>{{ item.productName }}</text>
              </view>
            </view>
            <image
              class="image"
              :src="item.productCover"
              mode="aspectFill"
            ></image>
            <!-- <image class="image" :src="item.productCover" mode="aspectFill"></image> -->
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- v-if="list.length>1" -->
    <block v-if="list.length > 1">
      <view class="result_list">
        <view
          :class="['list_item', current == index ? 'active_item' : '']"
          v-for="(item, index) in list"
          :key="index"
          @tap.stop="changeItem(index)"
        >
          <image
            class="image"
            :src="item.productCover || ''"
            mode="aspectFill"
          ></image>
          <view class="flex">
            <image class="lave" :src="item.rarityIcon"></image>
            <view class="result_name u-line-1">
              <text>{{ item.productName || "-" }}</text>
            </view>
          </view>
        </view>
      </view>
    </block>
    <view class="footer_button" @click="handlerClick">
      {{ list.length > 1 ? "返回藏品中心" : "查看详情" }}
      <!-- <u-button
        hover-class="none"
        :hairline="false"
        :customStyle="btnStyle"
        throttleTime="500"
        @click="handlerClick"
      >
        {{ list.length > 1 ? "返回藏品中心" : "查看详情" }}
      </u-button> -->
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      statusHeight: uni.getSystemInfoSync().statusBarHeight,
      current: 0, // swiper激活项
    };
  },
  computed: {
    btnStyle() {
      return {
        width: "400rpx",
        height: "68rpx",
        lineHeight: "80rpx",
        backgroundColor: "#D8ED48",
        color: "#000000",
        fontFamily: "PingFang SC",
        fontSize: "26rpx",
        fontWeight: 500,
        border: "none",
        borderRadius: "34rpx",
        margin: "0",
        padding: "0",
      };
    },
  },
  methods: {
    swiperChange(event) {
      const { current } = event.detail;
      this.current = current;
    },
    changeItem(index = 0) {
      this.current = index;
    },
    // 查看
    handlerClick() {
      this.$emit("click", this.list[this.current]);
    },
    goback() {
      this.$emit("back");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: auto;
  background: rgba(0, 0, 0, 0);
}
.nav_header {
  //position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 135upx;
  padding-top: 12upx;
  width: 100%;
  .nav_left,
  .nav_right {
    width: 200upx;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .nav_left {
    padding-left: 30upx;
    .back {
      width: 50upx;
      height: 50upx;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .nav_center {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    .nav_title {
      text-align: center;
      color: #ffffff;
    }
  }
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  .banner {
    background: url("../../../../../static/images/open_box/ic_kuang.png")
      no-repeat center;
    background-size: 522upx 600upx;
    margin-bottom: 20upx;
    height: auto;
    width: 100%;
    padding: 0 calc((100% - 522upx) / 2);
    swiper {
      height: 600upx;
    }
    .item {
      width: 522upx;
      height: 600upx;
      padding: 52upx 52upx 68upx;
      .item_header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48upx;
        line-height: 48upx;
        margin-bottom: 20upx;
        .lave {
          width: 60upx;
          height: 60upx;
          margin-right: 15upx;
        }
        .title {
          max-width: calc(100% - 74upx);
          text-align: left;
          font-size: 32upx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .image {
        width: 420upx;
        height: 420upx;
        background: #ffffff;
        border-radius: 10upx;
      }
    }
  }
  .footer_button {
    // margin-top: 60upx;
    background: url("../../../../../static/images/open_box/ic_confirm.png")
      no-repeat center;
    background-size: 423upx 105upx;
    width: 423upx;
    height: 105upx;
    line-height: 105upx;
    color: $white_color;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60upx;
  }
  .scroll_list {
    height: 26vh;
    width: 100%;
  }
  .result_list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    grid-gap: 30upx 7upx;
    padding: 30upx;
    background: rgba($color: $white_color, $alpha: 0.6);
    border-radius: 14upx;
    margin-bottom: 56upx;
    .list_item {
      padding: 10upx;
      width: 160upx;
      height: 228upx;
      border-radius: 10upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .image {
        width: 140upx;
        height: 140upx;
        border-radius: 10upx;
        margin-bottom: 14upx;
      }
      .result_name {
        font-size: 22upx;
        font-family: PingFang SC;
        font-weight: 500;
        color: $black_color;
        margin-bottom: 8upx;
        width: calc(100% - 35upx);
      }
      .lave {
        width: 35upx;
        height: 35upx;
      }
    }

    .active_item {
      background: rgba(216, 237, 72, 0.1);
      box-shadow: 2upx 1upx 1upx 0upx #d8ed48,
        -2upx -2upx 1upx 0upx rgba(216, 237, 72, 0.3);
    }
  }
}
</style>
