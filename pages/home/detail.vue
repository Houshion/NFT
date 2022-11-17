<template>
  <com-page title="SNT团队">
    <view class="pd_15">
      <u--image
        width="100%"
        height="390upx"
        :src="require('@/static/images/world/all.jpg')"
        mode="widthFix"
      ></u--image>
      <u-parse class="mg_t_15 ti2" :content="content"></u-parse>
      <view class="mg_t_30">
        <view class="label mg_b_15">SNT创始人介绍</view>
        <com-introduce
          :list="list"
          :config="configData"
          @tapList="tapList"
          :active="active"
        ></com-introduce>
        <u-parse class="mg_t_15 ti2" :content="list[active].content"></u-parse>

        <view class="flex_center mg_t_15">
          <u--image
            class="mg_auto"
            width="400upx"
            height="400upx"
            :src="list[active].src"
            mode="widthFix"
          ></u--image>
        </view>
      </view>
    </view>
  </com-page>
</template>

<script>
import * as data from "./data";
export default {
  data() {
    return {
      list: data.INTRODUCELIST,
      active: 0,
      content: data.TEAM_CONTENT,
      configData: {
        title: "标题",
        titlemore: "小标题",
        nextMargin: 50,
      },
    };
  },
  methods: {
    tapList(e) {
      this.active = e.index;
    },
  },
  onLoad({ id }) {
    this.active = id;
  },
};
</script>

<style lang="scss" scoped>
.label {
  font-size: 32upx;
  font-weight: bold;
}
/deep/ .container {
  min-height: calc(100vh - 88upx);
}
</style>
