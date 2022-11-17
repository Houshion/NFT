<template>
  <view class="collection">
    <com-home>
      <template #header>
        <view class="pd_l_15 pd_r_15">
          <view class="info_light pd_t_10">我的藏品</view>
          <view class="flex_between">
            <view class="sor font_20">my collection</view>
          </view>
        </view>
      </template>
      <u-sticky
        bgColor="#fff"
        :customNavHeight="sysInfo.statusBarHeight + 'px'"
      >
        <view class="tabs">
          <u-tabs
            :list="tabList"
            :scrollable="false"
            :current="current"
            :lineColor="`linear-gradient(0deg, #D8ED48 0%, rgba(216,237,72,0) 100%)`"
            lineWidth="30"
            lineHeight="5"
            :activeStyle="{
              position: 'absolute',
              'font-weight': 'bold',
              color: '#303133',
              'z-index': '1',
              transform: 'scale(1.05)',
            }"
            :inactiveStyle="{
              color: '#606266',
              transform: 'scale(1)',
            }"
            itemStyle="padding-left: 30upx; padding-right: 30upx; height: 88upx;"
            @change="changeTab"
          ></u-tabs>
        </view>
      </u-sticky>
      <template>
        <view class="collectionList mg_t_15 pd_l_10 pd_r_10">
          <template v-if="list.length > 0">
            <u-list @scrolltolower="scrolltolower" class="flex">
              <u-list-item
                v-for="(listItem, index) in list"
                :key="index"
                class="item"
              >
                <view class="itemBox" @click="goDetail(listItem)">
                  <view
                    class="isLight font_10 minor_bg_color"
                    v-if="listItem.lightUp"
                  >
                    {{ "已点亮" }}
                  </view>
                  <u--image
                    :src="listItem.productCover"
                    width="326upx"
                    height="326upx"
                    radius="20upx"
                    class="img"
                  ></u--image>
                  <view class="stock" v-if="listItem.productCount > 1">
                    x{{ listItem.productCount }}
                  </view>
                  <view class="msg">
                    <view class="product_info">
                      <image
                        class="lave_image"
                        v-if="listItem.rarityIcon"
                        :src="listItem.rarityIcon"
                      ></image>
                      <view class="name over_el_1 font_13">{{
                        listItem.productName
                      }}</view>
                    </view>
                    <view class="series font_10">{{
                      listItem.seriesName
                    }}</view>
                  </view>
                </view>
              </u-list-item>
            </u-list>
          </template>
          <template v-else>
            <view class="mg_t_50 pd_t_50">
              <u-empty
                width="185px"
                text="暂无藏品"
                :icon="require(`@/static/images/none/ic_wcp.png`)"
              >
              </u-empty>
            </view>
          </template>
        </view>
      </template>
      <u-back-top :scroll-top="scrollTop"></u-back-top>
    </com-home>
  </view>
</template>

<script>
import { getMyProduct } from "@/api/nft/collection";
const TAB_LIST = [
  {
    name: "藏品",
    value: 0,
  },
  {
    name: "盲盒",
    value: 1,
  },
];
export default {
  data() {
    return {
      sysInfo: uni.getSystemInfoSync(),
      list: [],
      // 公告tab相关
      tabList: [...TAB_LIST],
      current: 0,
      // 返回顶部距离
      scrollTop: 0,
      form: {
        pageNum: 1,
        pageSize: 10,
        searchType: 0,
      },
    };
  },
  methods: {
    changeTab(event) {
      const { value } = event;
      this.form.searchType = value;
      this.init();
    },
    // 初始化获取我的藏品列表
    init() {
      if (this.form.pageNum == 1) {
        this.list = [];
      }
      getMyProduct(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
      });
    },
    // 前往详情
    goDetail(item) {
      if (item.productType == 4 || item.productType == 5) {
        uni.navigateTo({
          url: `/pages/nft/collection/boxList?id=${item.productId}&type=${item.productType}`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/nft/collection/collectionList?id=${item.productId}`,
        });
      }
    },
    // 查看开合记录
    toRecord() {
      uni.navigateTo({
        url: "/pages/nft/collection/boxRecord",
      });
    },
    // 触底刷新
    scrolltolower() {
      this.form.pageNum++;
      this.init();
    },
  },
  onShow() {
    this.form.pageNum = 1;
    this.list = [];
    this.init();
    uni.preloadPage({ url: "/pages/nft/collection/boxList" });
  },
  onReachBottom() {
    this.form.pageNum++;
    this.init();
  },
  onPageScroll(e) {
    console.log("高度", e);
    this.scrollTop = e.scrollTop;
  },
};
</script>

<style lang="scss" scoped>
/depp/ .container {
  background: #f7f7f7;
}
.collection {
  /* #ifdef APP-PLUS */
  padding-top: 70upx;
  /* #endif */
  min-height: 100%;
  background-size: 100% 600upx;
  background-color: #fff;
}
.tabs {
  width: 750upx;
  height: auto;
  //display: flex;
  //justify-content: center;
  //background-color: #D8ED48;
}
/deep/ .tabs .u-tabs__wrapper__nav__line {
  margin-bottom: 10upx;
}
.item {
  width: 50%;
}
.itemBox {
  width: 330upx;
  height: 410upx;
  background: #ffffff;
  box-shadow: 0upx 3upx 10upx 0upx #d9d9d9;
  border-radius: 20upx;
  position: relative;
  margin: 10upx auto 45upx;
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
  .series {
    color: #b3b3b3;
  }
  .img {
    position: relative;
    margin-top: -14upx;
    margin-left: 8upx;
  }
  .stock {
    position: absolute;
    right: -5upx;
    top: -14upx;
    background: rgba($color: #000000, $alpha: 0.4);
    color: $white_color;
    border-radius: 0px 20upx 0px 30upx;
    font-size: 24upx;
    padding: 8upx 14upx;
  }
  .msg {
    padding: 10upx 20upx;
    .product_info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .lave_image {
        width: 41upx;
        height: 41upx;
        margin-right: 17upx;
      }
      .name {
        flex: 1;
      }
    }
  }
}
/deep/ .collectionList uni-view {
  flex-direction: row;
  flex-wrap: wrap;
}
/deep/ .collectionList .u-navbar--fixed {
  flex-direction: column;
  flex-wrap: inherit;
}
/deep/ .collectionList .u-navbar__content {
  line-height: 88upx;
}
/deep/ .collectionList .u-navbar__content__left {
  top: 26upx;
}
/deep/ .u-empty {
  flex-direction: column !important;
  flex-wrap: initial !important;
}
.box_record {
  width: 40upx;
  height: 40upx;
  vertical-align: middle;
}
.isLight {
  position: absolute;
  z-index: 1;
  left: 15upx;
  padding: 5upx 10upx;
  border-radius: 14upx;
}
</style>
