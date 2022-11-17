<template>
  <view class="home">
    <com-home>
      <template #header>
        <view class="pd_l_15 pd_r_15">
          <view class="info_light pd_t_10">数字藏品专区</view>
          <view class="sor font_20">Collection area</view>
          <u-swiper
            class="mg_t_5"
            :list="bannerImgList"
            circular
            radius="15"
            height="300upx"
            interval="5000"
            bgColor="#ffffff"
            @click="goBanner"
          ></u-swiper>
        </view>
      </template>
      <template>
        <view class="pd_t_15">
          <u-grid col="5" :border="false" class="mg_b_15">
            <u-grid-item
              v-for="(baseListItem, baseListIndex) in baseList"
              :key="baseListIndex"
            >
              <u--image
                :src="baseListItem.name"
                width="80upx"
                height="97upx"
                @click="goTo(baseListItem.path)"
              ></u--image>
              <text class="grid-text font_10">{{ baseListItem.title }}</text>
            </u-grid-item>
          </u-grid>
          <view class="flex_v_center mb_b_5">
            <u-icon
              :name="require(`@/static/images/ic_tzhi.png`)"
              size="16"
              class="mg_l_15"
            ></u-icon>
            <u-notice-bar
              :text="noticeBarLists"
              class="noticeBar"
              bgColor=""
              duration="3000"
              mode="link"
              icon=""
              direction="column"
              url="/pages/nft/user/notice/index"
              color="#000000"
            ></u-notice-bar>
          </view>
          <view class="calendar">
            <view class="font_16 mg_b_10 pfb flex">
              <u-icon
                class="title"
                :name="require(`@/static/images/ic_zsy.png`)"
                size="24"
              ></u-icon>
              <view class="name">发售藏品</view>
            </view>
            <template v-if="goodsList.length > 0">
              <com-list :list="goodsList"></com-list>
            </template>
            <template v-else>
              <u-empty
                marginTop="100"
                width="185px"
                text="哎呀，网络不见了~"
                :icon="require(`@/static/images/none/ic_wwl.png`)"
              >
              </u-empty>
            </template>
          </view>
        </view>
        <view class="bottom">
          星佑科技
          <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            style="color: #555555"
          >
            粤ICP备2022096392号
          </a>
        </view>
      </template>
    </com-home>
    <u-icon
      class="backHome"
      size="50"
      :name="require('@/static/images/ic_home.png')"
      @click="goBackHome()"
    ></u-icon>
  </view>
</template>

<script>
import store from "@/store";
import { getProductList } from "@/api/nft/collection";
import { homeNoticeList, messageList } from "@/api/nft/notice";
import { bannerList } from "@/api/nft/home";
export default {
  data() {
    return {
      bannerImgList: [],
      bannerList: [],
      noticeBarLists: [],
      baseList: [
        {
          name: require("@/static/images/ic_gfhgou.png"),
          title: "官方回购",
          path: "/pages/nft/recovery/list",
        },
        {
          name: require("@/static/images/ic_dlhd.png"),
          title: "点亮空间",
          path: "/pages/nft/mix/list",
        },
        {
          name: require("@/static/images/ic_fsrl.png"),
          title: "活动日历",
          path: "/pages/nft/main/activity",
        },
        {
          name: require("@/static/images/ic_cjwt.png"),
          title: "常见问题",
          path: "/pages/nft/main/question",
        },
        {
          name: require("@/static/images/ic_ggzx.png"),
          title: "公告中心",
          path: "/pages/nft/user/notice/list",
        },
      ],
      goodsList: [],
      // 首页返回方向
      backWay: "nft",
    };
  },
  methods: {
    // 获取藏品列表
    getList() {
      getProductList().then((res) => {
        this.goodsList = res.data;
        console.log(JSON.stringify(res.data));
      });
    },
    // 获取公告列表
    getNoticeList() {
      // homeNoticeList().then((res) => {
      //   res.data.forEach((list) => {
      //     this.noticeBarLists.push(list.title);
      //   });
      // });
      messageList(this.form).then(({ data }) => {
        data.forEach((list) => {
          this.noticeBarLists.push(list.noticeContent);
        });
        // this.list = [...this.list, ...data];
      });
    },
    // 获取banner列表
    getBannerList() {
      bannerList().then(({ data }) => {
        this.bannerList = data;
        data.forEach((item) => {
          this.bannerImgList.push(item.cover);
        });
      });
    },
    // 前往banner详情
    goBanner(e) {
      if (this.bannerList[e].url) {
        location.href = this.bannerList[e].url;
      }
    },
    // 返回引导页首页
    goBackHome() {
      if (this.backWay == "shop") {
        window.location.href =
          "http://shop.snt-art.com/snt-nft/pages/home/index.html";
      } else {
        uni.reLaunch({
          url: "/pages/home/index",
        });
      }
    },
    goTo(url) {
      uni.navigateTo({ url });
    },
  },
  onShow() {
    this.getList();
    this.getNoticeList();
    this.getBannerList();
  },
  onLoad({ query, token }) {
    this.backWay = query ? "shop" : "nft";
    store.dispatch("sysType", query ? "shop" : "nft");
    token ? store.dispatch("setToken", token) : "";
  },
};
</script>

<style lang="scss" scoped>
.home {
  /* #ifdef APP-PLUS */
  padding-top: 70upx;
  /* #endif */
  min-height: 100%;
  background-size: 100% 30vh;
  background-color: $white_color;
}
/deep/.container {
  background: $white_color;
  .noticeBar {
    background: linear-gradient(
      90deg,
      rgba(240, 240, 240, 0) 0%,
      #f7f7f7 51%,
      rgba(240, 240, 240, 0) 100%
    );
    padding: 20upx 30upx;
  }
  .calendar {
    padding: 30upx;
    .label {
      color: $label_color;
      font-size: 32upx;
      background-image: radial-gradient($main_color, white 50%);
      display: inline-block;
      margin-bottom: 20upx;
    }
  }
}
.title {
  margin-left: 20upx;
  margin-top: -30upx;
}
.name {
  position: relative;
  margin-left: -60upx;
}
/deep/ .u-notice__swiper__item__text {
  color: $info_light !important;
}
.backHome {
  position: fixed;
  z-index: 2;
  border-radius: 50%;
  bottom: 200upx;
  right: 40upx;
  text-align: center;
  box-shadow: 0 0 5px 1px #cccccc;
}
.bottom {
  bottom: 30upx;
  text-align: center;
  font-size: 20upx;
  width: 100%;
  padding-bottom: 30upx;
}
</style>
