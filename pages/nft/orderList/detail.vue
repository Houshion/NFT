<template>
  <view>
    <u-navbar
      placeholder
      title="订单详情"
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
      <view class="payBox pd_15 mg_b_15 header" v-if="type != 4">
        <view class="flex">
          <u-icon
            :name="
              require(`@/static/images/ic_${
                orderMsg.payStatus == 0 && type == 1 ? 'jysb' : 'jycg'
              }.png`)
            "
            size="30"
            class="mg_r_15"
          ></u-icon>
          <template v-if="type == 1">
            <view class="flex_v_center right">
              {{ orderMsg.payStatus == 0 ? "交易关闭" : "交易成功" }}
            </view>
          </template>
          <template v-if="type == 2">
            <view class="flex_v_center right">
              <template v-if="orderMsg.transferTypeId == 1">
                <view class="wd_100">转赠成功</view>
                <view class="tips_color font_12 wd_100">
                  您的藏品中心将不再显示该藏品
                </view>
              </template>
              <template v-else>
                <view class="wd_100">收到好友转赠的藏品</view>
                <view class="tips_color font_12 wd_100">
                  您可以到个人藏品中心查看
                </view>
              </template>
            </view>
          </template>
          <template v-if="type == 3">
            <view class="flex_v_center right">交易成功</view>
          </template>
        </view>
      </view>
      <view class="payBox orderMsg pd_15">
        <view class="mg_t_10 flex_between border_b pd_b_15">
          <u--image
            :src="
              (orderMsg.detail && orderMsg.detail.productCover) ||
              orderMsg.productCover
            "
            width="140upx"
            height="140upx"
            radius="10upx"
            class="img"
          ></u--image>
          <view class="msg flex_v_between">
            <view class="top wd_100">
              <view class="name over_el_1">
                {{
                  (orderMsg.detail && orderMsg.detail.productName) ||
                  orderMsg.productName
                }}
              </view>
              <view class="tips_color font_12">{{
                (orderMsg.detail && orderMsg.detail.seriesName) ||
                orderMsg.seriesName
              }}</view>
              <view class="tips_color font_12" v-if="type == 2 || type == 4">
                #{{ orderMsg && orderMsg.number }}
              </view>
            </view>
            <view class="tips_color font_12 flex_end wd_100" v-if="type == 3">
              X{{ orderMsg.airdropCount }}
            </view>
            <com-price
              v-if="type == 1"
              :price="orderMsg.orderPrice"
              size="28upx"
              class="wd_100"
            />
          </view>
        </view>
        <view class="detail mg_t_15 font_13">
          <view class="cell mg_t_15 flex_between">
            <view class="title mg_r_30">数量</view>
            <view class="value tar"> x{{ orderMsg.buyCount }} </view>
          </view>
          <view
            class="cell mg_t_15 flex_between"
            v-if="orderMsg.detail && orderMsg.detail.productType == 1"
          >
            <view class="title mg_r_30">赋能藏品</view>
            <view class="value tar">
              {{ orderMsg.consumeMemberProduct | replaceEmpty }}
            </view>
          </view>
        </view>
      </view>
      <view class="payBox orderMsg pd_15 mg_t_15">
        <view class="detail mg_t_15 font_13">
          <com-title title="订单详情" v-if="type != 4" />
          <template v-if="type == 1">
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">订单编号</view>
              <view class="value tips_color">{{ orderMsg.orderNumber }}</view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">创建时间</view>
              <view class="value tips_color">
                {{ orderMsg.createTime | timeStr }}
              </view>
            </view>
            <template v-if="orderMsg.payTime">
              <view class="cell mg_t_15 flex">
                <view class="title mg_r_30">抵用券</view>
                <view class="value tips_color">
                  ￥{{ orderMsg.couponAmount | toFixed(2) }}
                </view>
              </view>
              <view class="cell mg_t_15 flex">
                <view class="title mg_r_30">实付金额</view>
                <view class="value tips_color">
                  ￥{{ orderMsg.payAmount | toFixed(2) }}
                </view>
              </view>
            </template>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">支付方式</view>
              <view class="value tips_color">杉德</view>
            </view>
            <view class="cell mg_t_15 flex" v-if="orderMsg.payStatus == 0">
              <view class="title mg_r_30">取消时间</view>
              <view class="value tips_color">
                {{ orderMsg.cancelTime | timeStr }}
              </view>
            </view>
            <view class="cell mg_t_15 flex" v-if="orderMsg.payTime">
              <view class="title mg_r_30">支付时间</view>
              <view class="value tips_color">
                {{ orderMsg.payTime | timeStr }}
              </view>
            </view>
            <view class="cell mg_t_15 flex" v-if="orderMsg.blockchainTime">
              <view class="title mg_r_30">发放时间</view>
              <view class="value tips_color">
                {{ orderMsg.blockchainTime | timeStr }}
              </view>
            </view>
          </template>
          <template v-else-if="type == 2">
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">转赠方</view>
              <view class="value tips_color break">
                {{ orderMsg.fromAddress }}
              </view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">受赠方</view>
              <view class="value tips_color break">
                {{ orderMsg.toAddress }}
              </view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">对方昵称</view>
              <view class="value tips_color">{{ orderMsg.toNickname }}</view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">转赠时间</view>
              <view class="value tips_color">
                {{ orderMsg.blockchainTime | timeStr }}
              </view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">交易哈希</view>
              <view class="value tips_color break">
                {{ orderMsg.transactionHash }}
              </view>
            </view>
          </template>
          <template v-else-if="type == 3">
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">订单编号</view>
              <view class="value tips_color">{{ orderMsg.orderNumber }}</view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">创建时间</view>
              <view class="value tips_color">
                {{ orderMsg.createTime | timeStr }}
              </view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">发放时间</view>
              <view class="value tips_color">
                {{ orderMsg.blockchainTime | timeStr }}
              </view>
            </view>
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">交易哈希</view>
              <view class="value tips_color break">
                {{ orderMsg.transactionHash }}
              </view>
            </view>
          </template>
          <template v-else-if="type == 4">
            <com-title title="点亮详情" />
            <view class="cell mg_t_15 flex">
              <view class="title mg_r_30">点亮时间</view>
              <view class="value tips_color">
                {{ orderMsg.createTime | timeStr }}
              </view>
            </view>
            <view class="lightUpList">
              <view class="main flex_between flex_v_center mg_t_15">
                <view class="p product">
                  <u--image
                    :src="orderMsg.lightProductCover"
                    width="156upx"
                    height="156upx"
                    radius="14upx"
                    class="img"
                  ></u--image>
                  <view class="num">x1</view>
                  <view class="name over_el_1 font_10">{{
                    orderMsg.lightProductName
                  }}</view>
                </view>
                <view class="font_30">+</view>
                <view class="p consume">
                  <u--image
                    :src="orderMsg.consumeProductCover"
                    width="156upx"
                    height="156upx"
                    radius="14upx"
                    class="img"
                  ></u--image>
                  <view class="num">x1</view>
                  <view class="name over_el_1 font_10">{{
                    orderMsg.consumeProductName
                  }}</view>
                </view>
                <view class="font_30">=</view>
                <view class="p lightUp">
                  <u--image
                    :src="orderMsg.productCover"
                    width="132upx"
                    height="132upx"
                    radius="14upx"
                    class="img l"
                  ></u--image>
                  <u--image
                    :src="orderMsg.equipmentCover"
                    width="86upx"
                    height="86upx"
                    radius="14upx"
                    class="img r"
                  ></u--image>
                  <view class="name over_el_1 font_10">{{
                    orderMsg.equipmentName
                  }}</view>
                </view>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { orderPayInfo } from "@/api/nft/order";
import { transferInfo } from "@/api/nft/transfer";
import { airdropInfo } from "@/api/nft/airdrop";
import { lightInfo } from "@/api/nft/lightUp";
export default {
  data() {
    return {
      orderMsg: "",
      type: 1,
    };
  },
  onLoad(e) {
    const { orderId, type } = e;
    this.type = type;
    switch (type) {
      case "1": // 购买订单详情
        orderPayInfo(orderId).then(({ data }) => {
          console.log("data", data);
          this.orderMsg = data;
        });
        break;
      case "2": // 转赠订单详情
        transferInfo(orderId).then(({ data }) => {
          this.orderMsg = data;
        });
        break;
      case "3": // 空投订单详情
        airdropInfo(orderId).then(({ data }) => {
          this.orderMsg = data;
        });
      case "4": // 点亮订单详情
        lightInfo(orderId).then(({ data }) => {
          this.orderMsg = data;
        });
        break;
    }
  },
  methods: {
    // 返回
    goBack() {
      switch (this.type) {
        case "1": // 购买订单详情
          uni.redirectTo({
            url: `/pages/nft/orderList/buy`,
          });
          break;
        case "2": // 转赠订单详情
          uni.redirectTo({
            url: `/pages/nft/orderList/transfer`,
          });
          break;
        case "3": // 空投订单详情
          uni.redirectTo({
            url: `/pages/nft/orderList/airdrop`,
          });
          break;
        case "4": // 空投订单详情
          uni.redirectTo({
            url: `/pages/nft/orderList/lightUp`,
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .container {
  background: #f7f7f7;
}
.payBox {
  background: $white_color;
  border-radius: 20upx;
  &.header {
    .right {
      width: calc(100% - 120upx);
    }
  }
  &.orderMsg {
    .msg {
      width: calc(100% - 160upx);
    }
    .detail {
      .label {
        color: $label_color;
        font-size: 32upx;
        background-image: radial-gradient($main_color, white 50%);
        display: inline-block;
      }
      .cell {
        .title {
          width: 104upx;
        }
        .value {
          width: calc(100% - 164upx);
        }
      }
    }
  }
}
.lightUpList {
  background: $white_color;
  min-height: calc(100vh - 88upx);
  .title {
    position: relative;
    font-weight: bold;
    padding-left: 20upx;
    &::before {
      position: absolute;
      content: "";
      width: 6upx;
      height: 20upx;
      background: #070707;
      border-radius: 5upx 0upx;
      top: 10upx;
      left: 0;
    }
  }
  .main {
    .p {
      position: relative;
      width: 160upx;
      height: 200upx;
      .name {
        position: absolute;
        bottom: 0;
      }
      .img {
        border: 2upx solid #f0b648;
        border-radius: 14upx;
      }
      &.product,
      &.consume {
        .num {
          position: absolute;
          width: 36upx;
          height: 36upx;
          line-height: 36upx;
          text-align: center;
          background: $black_color;
          color: $white_color;
          font-size: 20upx;
          border-radius: 6upx;
          top: -18upx;
          right: -18upx;
        }
      }
      &.lightUp {
        .img {
          position: absolute;
          &.l {
            bottom: 40upx;
            left: 0;
          }
          &.r {
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
