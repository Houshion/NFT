<template>
  <view class="recovery">
    <u-navbar
      placeholder
      title="官方回购"
      :titleStyle="{
        'font-size': '38upx',
        'font-family': '微软雅黑',
        'font-weight': 'bold',
      }"
      @leftClick="goBack"
      border
    >
    </u-navbar>
    <view class="now pd_15 pd_b_0 bg_fff">
      <view
        class="list border radius_7"
        v-for="item in activeList"
        :key="item.id"
        @click="goToDetail(item.id)"
      >
        <u-image
          class="banner"
          :src="item.activityImageUrl"
          width="686upx"
          height="auto"
          mode="widthFix"
        >
        </u-image>
        <view class="pd_10">
          <view class="label font_18 font_b">{{ item.activityTitle }}</view>
          <view class="price mg_t_5 flex_between">
            <text class="price_color font_14">
              <com-price :price="item.repurchasePrice"></com-price>
            </text>
            <text class="num font_10 recordColor">
              限量：{{ item.totalLimitCount }} 份
            </text>
          </view>
          <view class="time font_10 mg_t_5 info_light">
            {{ item.activityStartTime | timeStr("Y.m.d H:i") }} 至
            {{ item.activityEndTime | timeStr("Y.m.d H:i") }}
          </view>
          <view class="flex_center status">
            <u-icon name="clock" color="#ffffff" size="22upx"></u-icon>
            <view class="mg_l_5">进行中</view>
          </view>
        </view>
      </view>
    </view>
    <view class="flex_between title">
      <view class="label">往期活动</view>
      <view class="myRecord recordColor flex_v_center" @click="checkRecord">
        我的回购记录
        <u-icon name="arrow-right" color="#f98e2d" size="24upx"></u-icon>
      </view>
    </view>
    <view class="before pd_15 pd_t_0 bg_fff">
      <view
        class="list border radius_7 mg_b_15"
        v-for="item in historyList"
        :key="item.id"
      >
        <u-image
          class="banner"
          :src="item.activityImageUrl"
          width="686upx"
          height="auto"
          mode="widthFix"
        >
        </u-image>
        <view class="pd_10">
          <view class="label font_18 font_b">{{ item.activityTitle }}</view>
          <view class="price mg_t_5 flex_between">
            <text class="font_14">
              <com-price :price="item.repurchasePrice"></com-price>
            </text>
            <text class="num font_10">限量：{{ item.totalLimitCount }}</text>
          </view>
          <view class="time font_10 mg_t_5 info_light">
            {{ item.activityStartTime | timeStr("Y.m.d H:i") }} 至
            {{ item.activityEndTime | timeStr("Y.m.d H:i") }}
          </view>
          <view class="flex_center status">
            <view class="mg_l_5">已结束</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { historyList, ongoingList } from "@/api/nft/recovery";
export default {
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
      },
      activeList: [],
      historyList: [],
    };
  },
  onLoad() {
    historyList(this.form).then(({ data }) => {
      this.historyList = [...this.historyList, ...data];
    });
    ongoingList().then(({ data }) => {
      this.activeList = data;
    });
  },
  methods: {
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/nft/recovery/index?id=${id}`,
      });
    },
    checkRecord() {
      uni.navigateTo({
        url: "/pages/nft/recovery/record",
      });
    },
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  .banner {
    border-radius: 14upx 14upx 0 0;
  }
  .status {
    width: 130upx;
    height: 44upx;
    line-height: 44upx;
    background: rgba($color: $black_color, $alpha: 0.4);
    border-radius: 22upx;
    color: $white_color;
    font-size: 24upx;
    text-align: center;
    position: absolute;
    top: 30upx;
    right: 30upx;
  }
}
.title {
  background: $white_color;
  padding: 30upx;
  .label {
    font-weight: bold;
    font-size: 32upx;
    color: $black_color;
  }
}
.recordColor {
  color: $record_color;
}
</style>
