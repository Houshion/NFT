<template>
  <view>
    <u-navbar
      placeholder
      title="回购订单确认"
      :titleStyle="{
        'font-size': '38upx',
        'font-family': '微软雅黑',
        'font-weight': 'bold',
      }"
      @leftClick="goBack"
      :border="false"
    >
    </u-navbar>
    <view class="pd_15">
      <view class="bg_fff pd_15 radius_7">
        <view class="flex">
          <view class="img">
            <u-image
              :src="recoveryMsg.repurchaseProductCover"
              width="160upx"
              height="160upx"
              radius="14upx"
            ></u-image>
          </view>
          <view class="msg mg_l_10 flex_v_between">
            <view class="wd_100">
              <view class="over_el_2 font_b mg_b_5 wd_100">{{
                recoveryMsg.repurchaseProductName
              }}</view>
              <view class="info_light font_10"> SNTwood1 </view>
            </view>
            <view class="flex_v_end wd_100 font_10 info_light">
              单价：<com-price :price="recoveryMsg.repurchasePrice"></com-price>
            </view>
          </view>
        </view>
        <u-divider></u-divider>
        <view class="detail mg_t_15 font_13">
          <view class="cell mg_t_15 flex_between">
            <view class="title mg_r_30">回购藏品编号</view>
            <view class="value">
              <text v-for="(item, index) in recoveryList" :key="index">
                #{{ item.number
                }}{{ index == recoveryList.length - 1 ? "" : "、" }}
              </text>
            </view>
          </view>
          <view class="cell mg_t_15 flex_between">
            <view class="title mg_r_30">回购活动</view>
            <view class="value">
              {{ recoveryMsg.activityTitle }}
            </view>
          </view>
        </view>
        <u-divider></u-divider>
        <view class="cell mg_t_15 flex_end">
          <view class="flex_v_end font_10 info_light">
            合计：<com-price
              :price="recoveryMsg.repurchasePrice * recoveryList.length"
            ></com-price>
          </view>
        </view>
      </view>
    </view>
    <com-bottom
      btnText="确认回购"
      @rightBtn="confirm"
      @leftBtn="cancel"
      :message="{ productType: 1 }"
    >
      <template #left>
        <view class="font_10"> 取消回购 </view>
      </template>
    </com-bottom>
  </view>
</template>

<script>
import store from "@/store";
import { loadRecovery } from "@/util/cache";
const { recoveryList, recoveryMsg } = loadRecovery();
export default {
  data() {
    return {
      recoveryList,
      recoveryMsg,
    };
  },
  methods: {
    confirm() {
      console.log("确认");
    },
    cancel() {
      this.base
        .modal("温馨提示", "是否确认取消回购订单？", "取消订单", "不了")
        .then((status) => {
          if (status) {
            store.dispatch("delRecovery");
            this.goback();
          }
        });
    },
    // 返回上一页
    goback() {
      uni.navigateBack();
    },
  },
  onShow() {
    console.log("asdf", this.recoveryMsg);
    console.log("asdf", this.recoveryList);
  },
};
</script>

<style lang="scss" scoped>
.detail {
  .label {
    color: $label_color;
    font-size: 32upx;
    background-image: radial-gradient($main_color, white 50%);
    display: inline-block;
  }
}
</style>
