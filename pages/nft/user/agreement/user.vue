<template>
  <view>
    <com-page title="用户协议">
      <view class="pd_10">
        <u-parse :content="content" :tagStyle="style"></u-parse>
      </view>
    </com-page>
  </view>
</template>

<script>
import { getAgreement } from "@/api/nft/public";
export default {
  data() {
    return {
      content: ``,
      style: {
        // 字符串的形式
        img: "display:block",
      },
    };
  },
  onShow() {
    getAgreement(1).then(({ data }) => {
      this.content = data;
    });
  },
  methods: {},
};
</script>

<style lang="scss">
</style>
