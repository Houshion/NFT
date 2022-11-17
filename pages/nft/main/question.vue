<template>
  <view>
    <com-page title="常见问题" :border="false">
      <u-collapse :border="false">
        <u-collapse-item
          class="border_b"
          v-for="(item, index) in list"
          :key="index"
        >
          <view class="title font_16 font_b" slot="title">
            <i class="num mg_r_10">
              <text class="zi9 po_re">{{ index + 1 }}</text>
            </i>
            <text>{{ item.question }}</text>
          </view>
          <text class="u-collapse-content mg_l_20">
            {{ item.answer }}
          </text>
        </u-collapse-item>
      </u-collapse>
    </com-page>
  </view>
</template>

<script>
import { problemList } from "@/api/nft/public";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    init() {
      problemList().then(({ data }) => {
        this.list = data;
      });
    },
  },
  onShow() {
    this.init();
  },
};
</script>

<style lang="scss">
/deep/ .container {
  min-height: calc(100vh - 88upx);
}
.title {
  .num {
    position: relative;
    z-index: 2;
    &::before {
      content: "";
      position: absolute;
      width: 20upx;
      height: 20upx;
      border-radius: 50%;
      background: $minor_color;
      z-index: 1;
    }
  }
  text {
  }
}
</style>
