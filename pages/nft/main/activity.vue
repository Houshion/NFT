<template>
  <view class="activity">
    <com-page title="活动日历" :border="false">
      <u--image
        :src="require(`@/static/images/ic_2022.png`)"
        width="150upx"
        height="67upx"
        mode="widthFix"
        class="year"
      ></u--image>
      <view class="sor">Recently released</view>
      <view class="title font_16">近期发布</view>
      <com-date-time :list="activeList"></com-date-time>
    </com-page>
  </view>
</template>
  
<script>
import { calendarList } from "@/api/nft/home";
export default {
  data() {
    return {
      activeList: [],
      form: {
        pageNum: 1,
        pageSize: 30,
      },
    };
  },
  methods: {
    init() {
      calendarList(this.form).then(({ data }) => {
        this.activeList = data;
      });
    },
  },
  onShow() {
    this.init();
  },
};
</script>
  
  <style lang="scss" scoped>
.activity {
  min-height: calc(100vh - 88upx);
  background: $white_color;
  padding: 30upx;
  .year {
    margin-bottom: -26upx;
  }
}
</style>
  