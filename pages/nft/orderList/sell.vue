<template>
  <view>
    <u-navbar
      placeholder
      title="寄售订单"
      :titleStyle="{
        'font-size': '38upx',
        'font-weight': 'bold',
      }"
      :border="false"
      :autoBack="true"
    >
    </u-navbar>
    <com-tabs :list="tabList" @onChange="changeTab"></com-tabs>
    <view class="orderList">
      <template v-if="list.length > 0">
        <u-list @scrolltolower="init">
          <u-list-item v-for="(item, index) in list" :key="index">
            <view class="orderBox" @click="goDetail(item.id)">
              <view class="flex_between">
                <view class="time">2022-08-08 08:08</view>
                <view class="title">{{ tabList[current].name }}</view>
              </view>
              <view class="mg_t_10 flex_between">
                <u--image
                  :src="item.img"
                  width="160upx"
                  height="160upx"
                  radius="10upx"
                  class="img"
                ></u--image>
                <view class="msg flex_v_between">
                  <view class="name over_el_1 wd_100">
                    {{ item.series }}-{{ item.name }}
                  </view>
                  <com-price :price="item.price" size="28upx" class="wd_100" />
                  <view class="btns flex_end wd_100"> </view>
                </view>
              </view>
            </view>
          </u-list-item>
        </u-list>
      </template>
      <template v-else>
        <u-empty
          width="185px"
          text="暂无订单"
          :icon="require(`@/static/images/none/ic_wdd.png`)"
        >
        </u-empty>
      </template>
    </view>
  </view>
</template>

<script>
import * as data from "./data";
console.log(data);
export default {
  data() {
    return {
      // 公告tab相关
      tabList: data.SELL_TABS,
      //   tabList: [{name: 123,value:123}],
      current: 0,
      // 公告列表
      list: [
        {
          img: require(`@/static/images/test/test.png`),
          name: "赛博龙2赛博龙2赛博龙2赛博龙2",
          time: "2022-08-08 08:08:08",
          series: "潮玩部落",
          price: 699.99,
        },
        {
          img: require(`@/static/images/test/test.jpg`),
          name: "赛博龙2赛博龙2赛博龙2赛博龙2",
          time: "2022-08-08 08:08:08",
          series: "潮玩部落",
          price: 699.99,
        },
        {
          img: require(`@/static/images/test/test.png`),
          name: "赛博龙2赛博龙2赛博龙2赛博龙2",
          time: "2022-08-08 08:08:08",
          series: "潮玩部落",
          price: 699.99,
        },
        {
          img: require(`@/static/images/test/test.jpg`),
          name: "赛博龙2赛博龙2赛博龙2赛博龙2",
          time: "2022-08-08 08:08:08",
          series: "潮玩部落",
          price: 699.99,
        },
      ],
      buttonStyle: data.BUTTON_STYLE,
    };
  },
  created() {},
  methods: {
    // 初始化列表
    init() {},
    // tab切换动作
    changeTab(e) {
      this.current = e.index;
    },
    // 前往详情
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/nft/orderList/detail`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/depp/ .container {
  background: #f7f7f7;
}
.orderList {
  background: #f7f7f7;
  padding: 30upx;
  .orderBox {
    background: #fff;
    border-radius: 14upx;
    margin-bottom: 30upx;
    padding: 30upx;
    .title {
      font-size: 24upx;
      color: $black_color;
    }
    .time {
      color: $tips_color;
      font-size: 24upx;
    }
    .msg {
      width: calc(100% - 180upx);
      .btns {
        height: 50upx;
      }
    }
  }
}
</style>
