<template>
  <view class="pd_15 lightUpList">
    <com-page title="点亮空间" :border="false">
      <view
        class="lightBox border radius_10 pd_15 mg_b_15"
        v-for="(item, index) in list"
        :key="index"
        @click="goLight(item.id)"
      >
        <view class="title over_el_1">点亮{{ item.lightProductName }}</view>
        <view class="main flex_between flex_v_center mg_t_15">
          <view class="p product">
            <u--image
              :src="item.lightProductCover"
              width="156upx"
              height="156upx"
              radius="14upx"
              class="img"
            ></u--image>
            <view class="num">x1</view>
            <view class="name over_el_1 font_10">{{
              item.lightProductName
            }}</view>
          </view>
          <view class="font_30">+</view>
          <view class="p consume">
            <u--image
              :src="item.consumeProductCover"
              width="156upx"
              height="156upx"
              radius="14upx"
              class="img"
            ></u--image>
            <view class="num">x1</view>
            <view class="name over_el_1 font_10">{{
              item.consumeProductName
            }}</view>
          </view>
          <view class="font_30">=</view>
          <view class="p lightUp">
            <u--image
              :src="item.productCover"
              width="132upx"
              height="132upx"
              radius="14upx"
              class="img l"
            ></u--image>
            <u--image
              :src="item.equipmentCover"
              width="86upx"
              height="86upx"
              radius="14upx"
              class="img r"
            ></u--image>
            <view class="name over_el_1 font_10">{{ item.equipmentName }}</view>
          </view>
        </view>
      </view>
    </com-page>
  </view>
</template>

<script>
import { lightProductList } from "@/api/nft/collection";
export default {
  data() {
    return {
      list: [],
      form: {
        pageNum: 1, //页码
        pageSize: 30, //条数
      },
    };
  },
  methods: {
    // 获取列表
    getList() {
      lightProductList(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
      });
    },
    goLight(id) {
      uni.navigateTo({
        url: `/pages/nft/mix/index?id=${id}`,
      });
    },
  },
  onShow() {
    this.list = [];
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.lightUpList {
  background: $white_color;
  min-height: calc(100vh - 88upx);
  .title {
    position: relative;
    font-weight: bold;
    padding-left: 20upx;
    &::before {
      position: absolute;
      content: "";
      width: 6upx;
      height: 20upx;
      background: #070707;
      border-radius: 5upx 0upx;
      top: 10upx;
      left: 0;
    }
  }
  .main {
    .p {
      position: relative;
      width: 160upx;
      height: 200upx;
      .name {
        position: absolute;
        bottom: 0;
      }
      .img {
        border: 2upx solid #f0b648;
        border-radius: 14upx;
      }
      &.product,
      &.consume {
        .num {
          position: absolute;
          width: 36upx;
          height: 36upx;
          line-height: 36upx;
          text-align: center;
          background: $black_color;
          color: $white_color;
          font-size: 20upx;
          border-radius: 6upx;
          top: -18upx;
          right: -18upx;
        }
      }
      &.lightUp {
        .img {
          position: absolute;
          &.l {
            bottom: 40upx;
            left: 0;
          }
          &.r {
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
