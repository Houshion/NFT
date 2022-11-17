<template>
  <com-page :title="type.toUpperCase()">
    <view class="pd_15">
      <u--image
        width="100%"
        height="100%"
        :src="require(`@/static/images/world/${type}.png`)"
        mode="widthFix"
      ></u--image>
    </view>
  </com-page>
</template>

<script>
export default {
  data() {
    return {
      type: "shop",
    };
  },
  onLoad({ type }) {
    this.type = type;
  },
};
</script>

<style lang="scss" scoped>
/deep/ .container {
  min-height: calc(100vh - 88upx);
}
</style>
