<template>
  <view>
    <com-page title="订单支付" :border="false">
      <view class="pd_15">
        <view class="payBox pd_15 mg_b_15">
          <view class="flex">
            <u-icon
              :name="require(`@/static/images/ic_djis.png`)"
              size="30"
              class="mg_r_15"
            ></u-icon>
            <view class="flex_v_between right" v-if="couldPay">
              <view class="wd_100 label_color flex_v_center">
                请在
                <text class="font_16">
                  <u-count-down
                    ref="countDown"
                    :time="countDown"
                    format="mm:ss"
                    @change="timesUp"
                  ></u-count-down>
                </text>
                内支付完成
              </view>
              <view class="wd_100 tips_color font_12">
                超时会自动取消订单
              </view>
            </view>
            <view class="label_color flex_v_center right" v-else>
              订单超时，已自动取消
            </view>
          </view>
        </view>
        <view class="payBox orderMsg pd_15">
          <view class="flex_between border_b pd_b_15">
            <u--image
              :src="orderMsg.detail && orderMsg.detail.productCover"
              width="160upx"
              height="160upx"
              radius="10upx"
              class="img"
            ></u--image>
            <view class="msg flex_v_between">
              <view class="name over_el_1 wd_100">
                {{ orderMsg.detail && orderMsg.detail.productName }}
              </view>
              <view class="tips_color font_12 wd_100">{{
                orderMsg.detail && orderMsg.detail.series
              }}</view>
              <com-price
                :price="orderMsg.orderPrice"
                size="28upx"
                class="wd_100"
              />
            </view>
          </view>
          <view class="detail mg_t_15 font_13">
            <view class="cell mg_t_15 flex_between">
              <view class="title mg_r_30">数量</view>
              <view class="value"> x{{ orderMsg.buyCount }} </view>
            </view>
            <view class="cell mg_t_15 flex_between">
              <view class="title mg_r_30">抵用券</view>
              <view class="value">
                -￥{{ orderMsg.couponAmount | toFixed(2) }}
              </view>
            </view>
            <view
              class="cell mg_t_15 flex_between"
              v-if="orderMsg.detail && orderMsg.detail.productType == 1"
            >
              <view class="title mg_r_30">赋能藏品</view>
              <view class="value">
                {{ orderMsg.consumeMemberProduct | replaceEmpty }}
              </view>
            </view>
          </view>
        </view>
        <view class="payBox orderMsg pd_15 mg_t_15">
          <com-title title="订单详情" />
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
        </view>
      </view>
      <u-popup
        :show="showPay"
        @close="showPay = false"
        mode="bottom"
        round
        closeable
      >
        <view class="popupBox">
          <view class="priceBox">
            ￥
            <text class="price">{{
              (orderMsg.detail.productType == 4
                ? orderMsg.payAmount
                : orderMsg.orderPrice - orderMsg.couponAmount) | toFixed(2)
            }}</text>
            <view class="tips_color font_12 flex_v_center flex_center">
              支付剩余时间
              <u-count-down :time="countDown" format="mm:ss"></u-count-down>
            </view>
          </view>
          <view class="payWay">
            <u-radio-group v-model="value" iconPlacement="right">
              <view class="flex_v_center wd_100">
                <u-icon
                  :name="require(`@/static/images/ic_price.png`)"
                  class="mg_r_5"
                  size="23"
                ></u-icon>
                <u-radio
                  v-for="(item, index) in payWayList"
                  :key="index"
                  class="way"
                  :name="item.value"
                  activeColor="#131b32"
                  :label="item.name"
                  iconColor="#000"
                ></u-radio>
              </view>
            </u-radio-group>
          </view>
          <button class="confirm-btn" @click="confirm">
            <text class="mg_l_5">支 付</text>
          </button>
        </view>
      </u-popup>
    </com-page>
    <com-bottom
      :price="
        orderMsg.detail.productType == 4
          ? orderMsg.payAmount
          : orderMsg.orderPrice - orderMsg.couponAmount
      "
      :message="orderMsg"
      @rightBtn="pay"
      @leftBtn="cancelThisOrder"
      v-if="couldPay"
    >
      <template #left>
        <view>取消订单</view>
      </template>
    </com-bottom>
  </view>
</template>

<script>
import {
  orderPayInfo,
  cancelOrder,
  checkOrderStatus,
  checkShandeStatus,
} from "@/api/nft/order";
import { payOrder } from "@/api/nft/pay";
import { PAY_WAY } from "./data";
export default {
  data() {
    return {
      // 订单信息
      orderMsg: {},
      // 支付弹窗
      showPay: false,
      // 支付相关
      value: "sd",
      payWayList: PAY_WAY,
      // 倒计时
      countDown: 5 * 60 * 1000,
      // 能否支付
      couldPay: true,
      // 支付参数
      payForm: {
        orderNumber: "",
        payWay: 0,
      },
      orderId: "",
      status: 0,
    };
  },
  methods: {
    // 点击支付
    pay() {
      if (!this.couldPay) return false;
      this.showPay = true;
      this.getTime();
    },
    // 确认支付
    async confirm() {
      this.payForm.orderNumber = this.orderMsg.orderNumber;
      this.showPay = false;
      if (this.status) {
        const { data } = await this.checkOutOrderStatus(this.orderId);
        if (data.payStatus == 1) {
          payOrder(this.payForm).then(({ data }) => {
            window.location.replace(data.url);
          });
        } else {
          this.checkOutOrderStatus(this.orderId);
        }
      } else {
        payOrder(this.payForm).then(({ data }) => {
          window.location.replace(data.url);
        });
      }
    },
    // 计时结束
    timesUp(e) {
      console.log(e);
      const { minutes, seconds } = e;
      if (!minutes && !seconds) {
        this.couldPay = false;
        this.showPay = false;
      }
    },
    // 取消当前订单
    cancelThisOrder() {
      this.base.modal("温馨提示", "是否取消订单，不再购买？").then((res) => {
        if (res) {
          cancelOrder(this.orderMsg.orderNumber).then(() => {
            this.base.toast("订单取消成功");
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          });
        }
      });
    },
    // 获取剩余支付时间
    getTime() {
      const now = new Date().getTime();
      const creat = this.orderMsg.createTime;
      this.countDown =
        creat + this.orderMsg.detail.paymentTimeout * 60 * 1000 - now;
    },
    // 获取订单信息
    async getOrderInfo(id) {
      const { data } = await orderPayInfo(id);
      this.orderMsg = data;
      this.getTime();
    },
    checkOutOrderStatus(id) {
      checkOrderStatus(id).then(({ data }) => {
        if (data.payStatus == 1)
          uni.redirectTo({
            url: `/pages/nft/order/paySuccess?id=${this.orderMsg.productId}&orderId=${this.orderId}`,
          });
      });
    },
  },
  // 加载订单数据
  onLoad(e) {
    this.status = e.status;
    this.orderId = e.orderId;
    this.getOrderInfo(e.orderId);
    // if (this.status == 1)
    this.checkOutOrderStatus(e.orderId);
    // checkShandeStatus(e.orderId);
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
  &.orderMsg {
    .msg {
      width: calc(100% - 180upx);
    }
    .detail {
      .label {
        color: $label_color;
        font-size: 32upx;
        background-image: radial-gradient($main_color, white 50%);
        display: inline-block;
      }
    }
  }
}
.popupBox {
  padding: 0 30upx 30upx;
  .priceBox {
    text-align: center;
    font-weight: bold;
    color: $black_color;
    font-size: 50upx;
    margin: 100upx 0;
    .price {
      font-size: 80upx;
    }
  }
  .payWay {
    background: #f7f7f7;
    border-radius: 20upx;
    padding: 30upx;
    .way {
      width: calc(100% - 66upx);
    }
  }
  .confirm-btn {
    width: 470upx;
    height: 88upx;
    line-height: 88upx;
    border-radius: 30px;
    background: $main_btn_color;
    color: $white_color;
    font-size: 30upx;
    font-weight: 600;
    margin-top: 80upx;
    &:after {
      border-radius: 100px;
      border: none;
    }
  }
}
.payBox {
  .right {
    width: calc(100% - 120upx);
  }
}
</style>
