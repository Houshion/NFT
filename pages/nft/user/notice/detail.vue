<template>
  <view>
    <com-page :title="title">
      <view class="pd_10">
        <view class="title font_18 over_el_2 pfb">
          {{ noticeMsg.title }}
        </view>
        <view class="time font_12 tips_color">{{
          (noticeMsg.updateTime || noticeMsg.createTime) | timeStr
        }}</view>
        <view class="mg_t_10">
          <u-parse :content="noticeMsg.content" :tagStyle="style"></u-parse>
        </view>
      </view>
    </com-page>
  </view>
</template>

<script>
import * as data from "./data";
import { noticeInfo } from "@/api/nft/notice";
export default {
  data() {
    return {
      title: "公告",
      // 公告内容
      noticeMsg: {},
      style: {
        // 字符串的形式
        img: "display:block",
      },
    };
  },
  onShow() {
    const tabIndex = this.$route.query.type;
    // this.title = data.TAB_LIST[tabIndex].name;
    noticeInfo(this.$route.query.id).then(({ data }) => {
      this.noticeMsg = data;
    });
  },
};
</script>

<style lang="scss" scoped>
/deep/ .container {
  min-height: calc(100vh - 88upx);
}
</style>
