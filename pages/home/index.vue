<template>
  <view>
    <view class="main pd_15">
      <u-swiper
        :list="bannerImgList"
        circular
        radius="15"
        interval="4000"
        height="150"
        bgColor="#ffffff"
        @click="goBanner"
        keyName="image"
        indicator
        indicatorMode="dot"
      ></u-swiper>
      <view class="title rzzy">SNT创始人</view>
      <!-- <com-swiper :list="introduceList"></com-swiper> -->
      <u--image
        width="100%"
        height="390upx"
        :src="require('@/static/images/world/all.png')"
        mode="widthFix"
        @click="goTeam"
      ></u--image>
      <u--image
        width="100%"
        :src="require('@/static/images/world/map.png')"
        mode="widthFix"
        @click="goStory()"
      ></u--image>
    </view>
    <view class="bottom">
      <view
        class="flex_1"
        v-for="(item, index) in navBottomList"
        @click="navTo(item)"
        :key="index"
      >
        <image
          :src="item.img"
          mode="widthFix"
          style="width: 60rpx; height: 60rpx"
        />
        <view>
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import * as data from "./data";
import config from "@/common/config";
export default {
  data() {
    return {
      bannerImgList: [
        {
          image: require("@/static/images/world/open.png"),
          url: "https://mp.weixin.qq.com/s/IO12uYNNqvN_yE4lgTB91w",
        },
        {
          image: require("@/static/images/world/news.png"),
          url: "https://mp.weixin.qq.com/s/fiG4mmFMlxbp8a0BKKyuzw",
        },
        {
          image: require("@/static/images/world/team.png"),
          url: config.baseUrl + "pages/home/detail?id=0",
        },
      ],
      navBottomList: data.NAV_BOTTOM_LIST,
      introduceList: data.INTRODUCELIST,
    };
  },
  methods: {
    // 获取banner列表
    getBannerList() {
      //   bannerList().then(({ data }) => {
      //     this.bannerList = data;
      //     data.forEach((item) => {
      //       this.bannerImgList.push(item.cover);
      //     });
      //   });
    },
    // 前往banner详情
    goBanner(e) {
      if (this.bannerImgList[e].url) {
        location.href = this.bannerImgList[e].url;
        // console.log(this.bannerImgList[e].url);
        // uni.navigateTo({
        //   url: this.bannerImgList[e].url,
        // });
      }
    },
    navTo(item) {
      if (item.url) {
        item.type == "switchTab"
          ? uni.switchTab({
              url: item.url,
            })
          : item.type == "outUrl"
          ? (window.location.href = item.url)
          : uni.navigateTo({
              url: item.url,
            });
      } else this.base.toast(item.name + "正在来的路上，敬请期待");
    },
    goStory() {
      uni.navigateTo({
        url: "/pages/home/story",
      });
    },
    goTeam() {
      uni.navigateTo({
        url: "/pages/home/detail?id=0",
      });
    },
  },
  onShow() {
    this.getBannerList();
    uni.preloadPage({ url: "/pages/nft/collection/list" });
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 30upx;
  left: 30upx;
  width: calc(100% - 120upx);
  background: $main_color;
  color: $white_color;
  display: flex;
  border-radius: 60px;
  padding: 15upx 30upx;
  font-size: 20upx;
}
.bottom .flex_1 {
  flex: 1 1;
  text-align: center;
}
.title {
  font-size: 50upx;
  font-weight: 400;
  color: #000000;
  margin: 30upx auto;
  text-align: center;
}
</style>
