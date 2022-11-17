<template>
  <view class="collection">
    <u-navbar
      placeholder
      :title="title"
      :titleStyle="{
        'font-size': '38upx',
        'font-family': '微软雅黑',
        'font-wight': 'bold',
      }"
      border
      @leftClick="goBack"
    >
    </u-navbar>
    <view class="collectionList pd_15">
      <u-list @scrolltolower="scrolltolower" class="flex">
        <u-list-item
          v-for="(listItem, index) in list"
          :key="index"
          class="item"
        >
          <!-- <u-grid :border="false" col="2">
            <u-grid-item v-for="(listItem, listIndex) in list" :key="listIndex"> -->
          <view class="itemBox" @click="goDetail(listItem)">
            <u--image
              :src="listItem.productCover"
              width="300upx"
              height="300upx"
              radius="20upx"
              class="img"
            ></u--image>
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
              <view class="flex_between">
                <view class="series font_10">{{ listItem.seriesName }}</view>
                <view class="series font_10"> #{{ listItem.number }} </view>
              </view>
            </view>
          </view>
          <!-- </u-grid-item>
          </u-grid> -->
        </u-list-item>
      </u-list>
    </view>
  </view>
</template>

<script>
import { getMyProductList } from "@/api/nft/collection";
export default {
  data() {
    return {
      // 标头名称
      title: "",
      // 藏品列表
      list: [],
      // 返回顶部距离
      scrollTop: 0,
      form: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 初始化获取我的藏品列表
    init() {
      getMyProductList(this.form).then(({ data }) => {
        this.title = data[0].productName;
        this.list = [...this.list, ...data];
      });
    },
    // 前往详情
    goDetail(item) {
      uni.navigateTo({
        url: `/pages/nft/collection/commodity?id=${item.id}&type=2`,
      });
    },
    // 触底刷新
    scrolltolower() {
      this.form.pageNum++;
      this.init();
    },
    // 返回
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
  onLoad(e) {
    this.form.productId = e.id;
  },
  onShow() {
    this.form.pageNum = 1;
    this.list = [];
    this.init();
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
.collection {
  /* #ifdef APP-PLUS */
  padding-top: 70upx;
  /* #endif */
  min-height: 100%;
  background-size: 100% 600upx;
  background-color: #fff;
}

.collectionList {
  max-height: calc(100% - 88upx); // 88upx为navbar/tabs的高度……30upx为内间距
}

.item {
  width: 50%;
}

.itemBox {
  width: 300upx;
  height: 390upx;
  background: #ffffff;
  box-shadow: 0upx 3upx 10upx 0upx #d9d9d9;
  border-radius: 20upx;
  position: relative;
  margin: 0 auto 45upx;

  .series {
    color: #b3b3b3;
  }

  .img {
    position: relative;
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
    }
  }
}

/deep/ uni-view {
  flex-direction: row;
  flex-wrap: wrap;
}

/deep/ .u-navbar--fixed {
  flex-direction: column;
  flex-wrap: inherit;
}

/deep/ .u-navbar__content {
  line-height: 88upx;
}

/deep/ .u-navbar__content__left {
  top: 26upx;
}

/deep/ .u-empty {
  flex-wrap: initial;
}
</style>
