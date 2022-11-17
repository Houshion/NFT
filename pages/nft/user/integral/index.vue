<template>
  <view>
    <u-navbar
      placeholder
      title="抵用券"
      :titleStyle="{
        'font-size': '38upx',
        'font-weight': 'bold',
      }"
      :border="false"
      :autoBack="true"
    >
    </u-navbar>
    <template v-if="list.length > 0">
      <view class="integralList">
        <u-list @scrolltolower="scrolltolower">
          <u-list-item v-for="(item, index) in list" :key="index">
            <view
              class="integralBox"
              :style="`background-image: url('../../../../static/images/ic_q${
                item.status == 1 ? 1 : 2
              }.png');`"
            >
              <view class="flex_between flex_v_center mg_b_10">
                <view class="title">
                  ￥<text class="price">{{
                    item.couponAmount | toFixed(2)
                  }}</text>
                </view>
                <view class="mg_t_5 over_el_2 font_12">
                  使用期限：{{ item.expirationTime | timeStr("Y-m-d") }}前
                </view>
              </view>
              <text class="tips font_12">
                仅《{{ item.productName }}》购买使用
              </text>
              <view class="status tar c999 font_12">
                {{
                  item.status == 1
                    ? "不可叠加"
                    : item.status == 2
                    ? "已使用"
                    : "已过期"
                }}
              </view>
            </view>
          </u-list-item>
        </u-list>
      </view>
    </template>
    <template v-else>
      <u-empty
        class="pd_t_60"
        width="185px"
        text="暂无抵用券"
        :icon="require(`@/static/images/none/ic_wdd.png`)"
      >
      </u-empty>
    </template>
  </view>
</template>
  
  <script>
import { couponList } from "@/api/nft/integral";
export default {
  data() {
    return {
      // 通知列表
      list: [],
      // 表单信息
      form: {
        pageNum: 1, //页码
        pageSize: 10, //条数
      },
    };
  },
  onShow() {
    this.list = [];
    this.init();
  },
  methods: {
    // 初始化参数
    init() {
      this.list = [];
      this.form.pageNum = 1;
      this.getList();
    },
    // 获取列表信息
    getList() {
      couponList(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
      });
    },
    // 触底刷新
    scrolltolower() {
      this.form.pageNum++;
      this.getList();
    },
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
};
</script>
  
  <style lang="scss" scoped>
/depp/ .container {
  background: $white_color;
}
.integralList {
  background: $white_color;
  padding: 30upx;
  .integralBox {
    position: relative;
    background-size: 100% 100%;
    border-radius: 14upx;
    margin-bottom: 30upx;
    padding: 30upx;
    padding-bottom: 40upx;
    .title {
      font-size: 32upx;
    }
    .time {
      color: $font-color-light;
      font-size: 24upx;
    }
    .price {
      font-size: 80upx;
      font-weight: bold;
    }
    .tips {
      padding: 5upx 10upx;
      border-radius: 8upx;
      background: rgba($color: $white_color, $alpha: 0.6);
    }
    .status {
      position: absolute;
      top: 0;
      right: 0;
      background: $black_color;
      width: 128upx;
      height: 40upx;
      line-height: 40upx;
      text-align: center;
      border-radius: 0px 15upx 0px 15upx;
      color: $white_color;
    }
  }
}
</style>
  