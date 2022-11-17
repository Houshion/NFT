<template>
  <view>
    <com-page title="关于我们" >
      <view class="pd_10">
        <u-parse :content="content" :tagStyle="style"></u-parse>
      </view>
    </com-page>
  </view>
</template>

<script>
export default {
  data() {
    return {
      content: `
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
      style: {
        // 字符串的形式
        img: "display:block",
      },
    };
  },
};
</script>

<style lang="scss">
</style>
