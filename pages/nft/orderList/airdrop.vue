<template>
  <view class="list">
    <com-page title="空投订单" :border="false">
      <view class="orderList">
        <template v-if="list.length > 0">
          <u-list @scrolltolower="scrolltolower">
            <u-list-item v-for="(item, index) in list" :key="index">
              <view class="orderBox" @click="goDetail(item.id)">
                <view class="flex_between">
                  <view class="time">{{ item.createTime | timeStr }}</view>
                  <view class="title">投放成功</view>
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
                    <view class="tar tips_color wd_100">
                      x{{ item.airdropCount }}
                    </view>
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
    </com-page>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import * as data from "./data";
import { airdropList } from "@/api/nft/airdrop";
export default {
  data() {
    return {
      // 公告列表
      list: [],
      // 返回顶部距离
      scrollTop: 0,
      // 按钮样式
      buttonStyle: data.BUTTON_STYLE,
      // 表单信息
      form: {
        orderStatus: 0, //0:全部,1:待支付,2:交易成功,3:交易关闭
        pageNum: 1, //页码
        pageSize: 10, //条数
      },
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
      airdropList(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
      });
    },
    // 前往详情
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/nft/orderList/detail?type=3&orderId=${id}`,
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
  max-height: calc(100% - 88upx); // 88upx为navbar/tabs的高度……30upx为内间距
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
