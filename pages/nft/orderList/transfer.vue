<template>
  <view class="list">
    <com-page title="转赠订单" :border="false">
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
          <u-list @scrolltolower="scrolltolower" height="100%">
            <u-list-item v-for="(item, index) in list" :key="index">
              <view class="orderBox" @click="goDetail(item.id)">
                <view class="flex_between">
                  <view class="time">{{ item.createTime | timeStr }}</view>
                  <view class="title">{{ item.transferType }}</view>
                </view>
                <view class="mg_t_10 flex_between">
                  <u--image
                    :src="item.productCover"
                    width="160upx"
                    height="160upx"
                    radius="10upx"
                    class="img"
                  ></u--image>
                  <view class="msg">
                    <view class="mg_b_5 name over_el_1 wd_100">
                      {{ item.productName }}
                    </view>
                    <view class="mg_b_5 tips_color wd_100 flex font_12">
                      <view class="label">
                        转{{ item.transferTypeId == 1 ? "赠" : "入" }}对象：
                      </view>
                      <view class="value over_el_1">
                        {{ item.toAddress | changeAddr(30) }}
                      </view>
                    </view>
                    <view class="mg_b_5 tips_color wd_100 flex font_12">
                      <view class="label">
                        转{{ item.transferTypeId == 1 ? "赠" : "入" }}时间：
                      </view>
                      <view class="value over_el_1">
                        {{ item.blockchainTime | timeStr }}
                      </view>
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
    </com-page>
  </view>
</template>

<script>
import * as data from "./data";
import { transferOrderList } from "@/api/nft/order";
export default {
  data() {
    return {
      // 公告tab相关
      tabList: data.TRANSFER_TABS,
      //   tabList: [{name: 123,value:123}],
      current: 0,
      // 订单列表
      list: [],
      // 表单信息
      form: {
        type: 1, //0:全部,1:转赠,2:受赠
        pageNum: 0, //页码
        pageSize: 10, //条数
      },
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
      transferOrderList(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
      });
    },
    // tab切换动作
    changeTab(e) {
      this.form.type = e.index + 1;
      this.init();
    },
    // 前往详情
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/nft/orderList/detail?type=2&orderId=${id}`,
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

<style lang="scss">
.list {
  height: 100%;
}
.orderList {
  background: #f7f7f7;
  padding: 30upx;
  max-height: calc(100% - 88upx * 2); // 88upx为navbar/tabs的高度……30upx为内间距
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
      .label {
        width: 120upx;
      }
      .value {
        width: calc(100% - 120upx);
      }
    }
  }
}
/deep/ .u-tabs__wrapper__nav__line {
  margin-bottom: 10upx;
}
</style>
