<template>
  <com-page title="SNT绿洲世界">
    <view class="pd_15">
      <u-album
        :urls="['https://snt-art.obs.cn-south-1.myhuaweicloud.com/world.jpg']"
        keyName="src2"
        singleSize="690upx"
      ></u-album>
      <u-parse class="mg_t_15" :content="content"></u-parse>
    </view>
  </com-page>
</template>

<script>
import * as data from "./data";
export default {
  data() {
    return {
      content: data.STORY_CONTENT,
    };
  },
};
</script>

<style lang="scss" scoped>
/deep/ .container {
  min-height: calc(100vh - 88upx);
}
</style>
