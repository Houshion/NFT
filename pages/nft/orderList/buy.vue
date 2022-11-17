<template>
  <view class="list">
    <u-navbar
      placeholder
      title="购买订单"
      :titleStyle="{
        'font-size': '38upx',
        'font-family': '微软雅黑',
        'font-weight': 'bold',
      }"
      @leftClick="goBack"
      :border="false"
    >
    </u-navbar>
    <!-- <com-tabs :list="tabList" @onChange="changeTab"></com-tabs> -->
    <u-sticky bgColor="#fff" customNavHeight="88upx">
      <u-tabs
        :list="tabList"
        :scrollable="false"
        :current="current"
        :lineColor="`linear-gradient(0deg, #D8ED48 0%, rgba(216,237,72,0) 100%)`"
        lineWidth="30"
        lineHeight="5"
        :activeStyle="{
          position: 'absolute',
          'font-weight': 'bold',
          color: '#303133',
          'z-index': '1',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          transform: 'scale(1)',
        }"
        itemStyle="padding-left: 30upx; padding-right: 30upx; height: 88upx;"
        @change="changeTab"
      ></u-tabs>
    </u-sticky>
    <view class="orderList">
      <template v-if="list.length > 0">
        <u-list @scrolltolower="scrolltolower">
          <u-list-item v-for="(item, index) in list" :key="index">
            <view class="orderBox" @click="goDetail(item)">
              <view class="flex_between">
                <view class="time">{{ item.createTime | timeStr }}</view>
                <view class="title">{{
                  item.orderStatus == 0
                    ? "待支付"
                    : item.orderStatus == 1
                    ? "交易成功"
                    : item.orderStatus == 2
                    ? "交易关闭"
                    : ""
                }}</view>
              </view>
              <view class="mg_t_10 flex_between">
                <u--image
                  :src="item.productCover"
                  width="160upx"
                  height="160upx"
                  radius="10upx"
                  class="img"
                ></u--image>
                <view class="msg flex_v_between">
                  <view class="name over_el_1 wd_100">
                    {{ item.productName }}
                  </view>
                  <com-price
                    :price="item.orderPrice"
                    :num="item.buyCount"
                    size="28upx"
                    class="wd_100"
                  />
                  <view
                    class="btns flex_end wd_100"
                    @click.stop
                    v-if="item.orderStatus == 0"
                  >
                    <com-button
                      :customStyle="buttonStyle"
                      plain
                      label="取消订单"
                      @onClick="cancelThisOrder(item.orderNumber)"
                    ></com-button>
                    <com-button
                      class="mg_l_10"
                      :customStyle="buttonStyle"
                      icon="clock"
                      label="去支付"
                      @onClick="goPay(item.id)"
                    ></com-button>
                  </view>
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
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import * as data from "./data";
import { orderList, cancelOrder } from "@/api/nft/order";
export default {
  data() {
    return {
      // 导航栏
      current: 0,
      // 公告tab相关
      tabList: data.BUY_TABS,
      // 返回顶部距离
      scrollTop: 0,
      // 订单列表
      list: [],
      // 表单信息
      form: {
        orderStatus: 0, //0:全部,1:待支付,2:交易成功,3:交易关闭
        pageNum: 1, //页码
        pageSize: 10, //条数
      },
      // 按钮样式
      buttonStyle: data.BUTTON_STYLE,
    };
  },
  onShow() {
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
      orderList(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
      });
    },
    // tab切换动作
    changeTab(e) {
      this.form.orderStatus = e.index;
      this.init();
    },
    // 前往详情
    goDetail(item) {
      if (item.orderStatus == 0) return false;
      uni.navigateTo({
        url: `/pages/nft/orderList/detail?type=1&orderId=${item.id}`,
      });
    },
    // 取消当前订单
    cancelThisOrder(orderNumber) {
      this.base.modal("温馨提示", "是否取消订单，不再购买？").then((res) => {
        if (res) {
          cancelOrder(orderNumber).then(() => {
            this.base.toast("订单取消成功");
            this.init();
          });
        }
      });
    },
    // 前往支付
    goPay(id) {
      uni.navigateTo({
        url: `/pages/nft/order/pay?orderId=${id}`,
      });
    },
    // 返回
    goBack() {
      uni.switchTab({
        url: `/pages/nft/user/index`,
      });
    },
    // 触底刷新
    scrolltolower() {
      this.form.pageNum++;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  height: 100%;
}
.orderList {
  background: #f7f7f7;
  padding: 30upx;
  max-height: calc(
    100% - 88upx * 2 - 30upx * 2
  ); // 88upx为navbar/tabs的高度……30upx为内间距
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
    }
  }
}
/deep/ .u-tabs__wrapper__nav__line {
  margin-bottom: 10upx;
}
</style>
