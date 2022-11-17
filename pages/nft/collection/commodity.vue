<template>
  <view class="commodity">
    <com-home>
      <u-icon name="arrow-left" class="backBtn" @click="goback"></u-icon>
      <view class="main">
        <view class="mainImg" id="mainImg">
          <u--image
            :src="this.collectionMsg.productCover"
            width="430upx"
            height="430upx"
            radius="30upx"
            class="img"
          >
          </u--image>
          <u--image
            :src="this.EquipmentMsg.equipmentCover"
            width="430upx"
            height="430upx"
            radius="30upx"
            class="background img"
          ></u--image>
        </view>
      </view>
      <block
        v-if="collectionMsg.productType != 4 && collectionMsg.productType != 5"
      >
        <view
          class="btns flex_center"
          v-if="this.collectionType == 2 && collectionMsg.lightUp == 1"
        >
          <com-button
            label="3D形态"
            color="#DDF24B"
            class="changeBtn"
            @onClick="changeBtn(1)"
          ></com-button>
          <com-button
            :label="collectionForm == 1 ? '装备形态' : '圣灵形态'"
            @onClick="changeBtn(2)"
          ></com-button>
        </view>
      </block>
      <view
        class="message"
        :style="{
          'margin-top':
            this.collectionType == 2 && collectionMsg.lightUp == 1
              ? '200upx'
              : '280upx',
        }"
      >
        <view class="msgBox">
          <view class="msg_info flex_v_center">
            <image
              v-if="collectionMsg.rarityIcon"
              class="lave_icon mg_r_5"
              :src="collectionMsg.rarityIcon"
            ></image>
            <view class="name font_16 pfb">{{
              collectionForm == 1
                ? collectionMsg.productName
                : EquipmentMsg.equipmentName
            }}</view>
          </view>
          <com-price
            v-if="collectionType == 1"
            class="mg_t_10"
            :price="collectionMsg.salePrice"
          ></com-price>
          <view class="flex_between mg_t_10 font_10">
            <view class="flex">
              <view
                class="series"
                :style="`background-image: url('../../../static/images/element/${collectionMsg.attributeName}/ic_series.png');`"
              >
                {{ collectionMsg.seriesName }}
              </view>
              <view
                class="
                  minor_bg_color
                  radius_4
                  pd_l_5 pd_r_5
                  mg_l_10
                  flex_center
                "
                v-if="this.collectionType == 1"
              >
                SNT{{ collectionMsg.attributeName
                }}{{ collectionMsg.productNumber }}
              </view>
            </view>
            <view class="stock info_light">
              <template v-if="collectionType == 1">
                限量:
                {{ collectionMsg.saleCount }}
              </template>
              <template v-else>
                流通量/总量:
                {{ collectionMsg.circulation }}/{{ collectionMsg.total }}
              </template>
            </view>
          </view>
        </view>
        <view class="msgBox owner" v-if="collectionForm == 2">
          <com-title title="属性" />
          <view class="flex_between ti2">
            由于古老森林影响，圣灵们渐渐拥有自主意识，觉醒部分隐藏体内的力量，将在后续逐渐展露其特有能力属性。
          </view>
        </view>
        <view class="msgBox owner" v-if="collectionType == 2">
          <com-title title="拥有者" />
          <view class="flex_between">
            <view class="flex1 over_el_1 name text_gray">{{
              collectionMsg.userName
            }}</view>
            <view class="flex1 number font_10">
              {{
                `SNT${collectionMsg.attributeName}${collectionMsg.productNumber}#${collectionMsg.number}/${collectionMsg.total}`
              }}
            </view>
          </view>
        </view>
        <view class="msgBox" v-if="collectionType == 2">
          <com-title title="链上信息" />
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">铸造平台</view>
            <view class="value">{{
              collectionMsg.casting | replaceEmpty
            }}</view>
          </view>
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">交易哈希</view>
            <view class="value break">
              {{ collectionMsg.transactionHash | replaceEmpty }}
            </view>
          </view>
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">认证标准</view>
            <view class="value">{{
              collectionMsg.authenticationNetwork | replaceEmpty
            }}</view>
          </view>
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">认证网络</view>
            <view class="value">{{
              collectionMsg.certificationStandard | replaceEmpty
            }}</view>
          </view>
        </view>
        <view class="msgBox" v-else>
          <com-title title="链上信息" />
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">铸造平台</view>
            <view class="value">{{
              collectionMsg.casting | replaceEmpty
            }}</view>
          </view>
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">区块地址</view>
            <view class="value break">
              {{ collectionMsg.blockchainAddress | replaceEmpty }}
            </view>
          </view>
        </view>
        <view
          class="msgBox owner"
          v-if="collectionType == 1 && collectionMsg.productType == 2"
        >
          <com-title title="如何获得" />
          <view class="flex_between">
            <view class="name text_gray">{{
              conditionMsg && conditionMsg.conditionName
            }}</view>
            <view class="number mg_t_5 flex_end wd_100">{{
              conditionMsg && conditionMsg.copywriting
            }}</view>
          </view>
        </view>
        <view class="msgBox author" v-if="collectionMsg.productType != 4">
          <com-title title="作者信息" />
          <view class="flex">
            <u-avatar
              class="mg_r_10"
              size="120upx"
              :src="
                collectionForm == 1
                  ? collectionMsg.authorAvatar
                  : EquipmentMsg.authorAvatar
              "
            ></u-avatar>
            <view class="right">
              <view class="name">{{
                collectionForm == 1 ? collectionMsg.author : EquipmentMsg.author
              }}</view>
              <view class="introduce text_gray">{{
                collectionForm == 1
                  ? collectionMsg.authorDetail
                  : EquipmentMsg.authorDetail
              }}</view>
            </view>
          </view>
        </view>
        <!-- 作者信息 -->
        <view class="msgBox">
          <com-title title="藏品介绍" />
          <u-parse
            :content="
              collectionForm == 1
                ? collectionMsg.productIntroduce
                : EquipmentMsg.equipmentIntroduce
            "
            :tagStyle="{ img: 'display:block' }"
          ></u-parse>
          <view class="a"> </view>
        </view>
        <view class="msgBox" v-if="collectionType == 1">
          <com-title title="购买须知" />
          <u-parse
            class="font_11 text_gray ti2 lh_4"
            :content="collectionMsg.purchaseNotes"
            :tagStyle="{ img: 'display:block' }"
          ></u-parse>
        </view>
        <view
          class="msgBox"
          v-else-if="
            collectionMsg.nodeList && collectionMsg.nodeList.length > 0
          "
        >
          <com-title title="流转信息" />
          <com-timeline :list="collectionMsg.nodeList"></com-timeline>
        </view>
      </view>
    </com-home>
    <u-alert
      v-if="!userInfo.mobile"
      class="alert"
      description="您还没有登录，去登录>"
      type="warning"
      closable
      @click="goLogin"
    >
    </u-alert>
    <u-alert
      v-show="!isAuth"
      class="alert"
      description="您还没有实名认证，无法购买藏品，去实名>"
      type="warning"
      closable
      @click="goAuth"
    >
    </u-alert>
    <com-blind-bottom
      @leftBtn="sale()"
      @rightBtn="openBox()"
      v-if="collectionType == 2 && collectionMsg.productType == 4"
    >
      <template #left>
        <view class="font_10"> 已有{{ collectionMsg.viewCount }}人关注 </view>
      </template>
    </com-blind-bottom>
    <com-bottom
      @rightBtn="collectionType == 1 ? toOrder() : sale()"
      :btnText="collectionType == 1 ? '立即购买' : '转 赠'"
      :price="collectionType == 1 ? collectionMsg.salePrice : null"
      :message="collectionMsg"
      :sale="collectionType == 2"
      v-else
    >
      <template #left>
        <view class="font_10"> 已有{{ collectionMsg.viewCount }}人关注 </view>
      </template>
    </com-bottom>
    <!-- <view class="lightBtn" @click="goLight" v-if="collectionMsg.openLight != 0">
      <u--image
        :src="
          collectionMsg.openLight == 1
            ? require('@/static/images/ic_light.png')
            : require('@/static/images/ic_unlight.png')
        "
        width="140upx"
        height="140upx"
        radius="60upx"
        id="btn"
      ></u--image>
    </view> -->
    <u-popup
      :show="verifyForm.show"
      :closeOnClickOverlay="false"
      mode="center"
      :customStyle="{
        width: '70%',
      }"
    >
      <move-verify @result="verifyResult" ref="verifyElement"></move-verify>
    </u-popup>
    <pop-number
      v-if="showPopNumber"
      :goods="collectionMsg"
      :show.sync="showPopNumber"
      @confirm="buyChangeNum"
    ></pop-number>
    <buy-power
      v-if="showBuyPower"
      :list="qualificationProducts"
      :show.sync="showBuyPower"
      @handlerClick="confirmBuyPower"
    ></buy-power>
    <com-modal content="确定要打开盲盒吗？" ref="ComModal"></com-modal>
  </view>
</template>

<script>
import store from "@/store";
import MoveVerify from "@/components/moveVerify";
import PopNumber from "./components/pop-number/index.vue";
import BuyPower from "./components/buy-power/index.vue";
import {
  getProductInfo,
  getMyProductInfo,
  getConditions,
  selectBindEquipment,
  getQualificationProducts,
} from "@/api/nft/collection";
import { orderAdd, checkStatus } from "@/api/nft/order";
import { getAuthStatus } from "@/api/nft/user";
import { canTransfer } from "@/api/nft/transfer";
import { loadUserInfo } from "@/util/cache";
export default {
  components: { MoveVerify, PopNumber, BuyPower },
  data() {
    return {
      isOnLoad: true,
      timer: null,
      showPopNumber: false,
      //购买权验证弹框
      showBuyPower: false,
      // 购买资格列表
      qualificationProducts: [],
      // 藏品信息
      collectionMsg: {},
      // 装备信息
      EquipmentMsg: {},
      // 产品图片
      productImg: "",
      form: {
        memberId: loadUserInfo().id,
        productId: "",
      },
      // 页面信息
      pageMsg: {
        pageNum: 1,
        pageSize: 10,
      },
      collectionType: 1, // 1.藏品详情，2.个人藏品详情，默认为1
      // 用户信息
      userInfo: loadUserInfo(),
      // 拖拽验证
      verifyForm: {
        status: false, // 验证状态结果
        show: false, // 是否显示弹出层
      },
      isAuth: false, // 是否认证
      current: 0, // 角度
      collectionForm: 1, // 1.圣灵形态，2.装备形态，默认为1
    };
  },
  computed: {
    btnStyle() {
      const STYLE = {
        width: "310upx",
        height: "88upx",
        lineHeight: "88upx",
        border: "none",
        borderRadius: "44upx",
        fontSize: "30upx",
        fontFamily: "PingFang SC",
        fontWeight: 500,
        margin: 0,
      };
      const primary = {
        ...STYLE,
        backgroundColor: "#131B32",
        color: "#ffffff",
      };
      const orange = {
        ...STYLE,
        backgroundColor: "#ffffff",
        border: "1upx solid #131B32",
        color: "#131B32",
      };
      return { primary, orange };
    },
  },
  methods: {
    // 开盒
    openBox() {
      this.$nextTick(() => {
        const comModel = this.$refs.ComModal && this.$refs.ComModal;
        comModel.open();
        comModel.confirm = () => {
          comModel.close();
          uni.redirectTo({
            url:
              "/pages/nft/collection/openBox?data=" +
              encodeURIComponent(JSON.stringify([this.collectionMsg.id])),
          });
        };
      });
    },
    // 立即购买/转赠/盲盒购买
    handlerBuyAndSale(type) {
      console.log("memberId", this.form.memberId);
      const handlerFunc = {
        // 购买
        1: (type = 0) => this.toOrder(type),
        // 转赠
        2: () => this.sale(),
      };
      handlerFunc[type || this.collectionType](this.collectionMsg.productType);
    },
    /**
     * 藏品下单
     * @param {Object} type 1普通购买 4盲盒商品购买数量选择
     */
    async toOrder(type = 1) {
      const is = await this.beforeCreateOrder();
      if (!is) return false;
      if (type == 1) {
        // 获取活动资格
        const { data } = await getQualificationProducts({
          productId: this.collectionMsg.id,
        });
        console.log("data", data);
        // 购买资格列表
        this.qualificationProducts = data.qualificationProductVos || [];
        // 购买权验证
        if (data.haveActivity == 1) {
          this.showBuyPower = true;
        } else {
          this.verifyForm.show = true;
        }
      } else {
        this.showPopNumber = true;
      }
      // !!(type == 1) ? this.verifyForm.show = true : this.showPopNumber = true;
    },
    confirmBuyPower(item) {
      this.form.memberProductId = item.id;
      this.verifyForm.show = true;
    },
    // 转赠/寄售藏品
    async sale() {
      if (this.collectionMsg.canTransfer != 1) {
        return uni.showToast({
          title: "该产品不支持转赠",
          icon: "none",
        });
      }
      const { data } = await canTransfer(this.collectionMsg.id);
      if (!data.status)
        return this.base.toast(
          `藏品还在冷却期间，冷却时长为：${data.coolingTime}小时`
        );
      uni.navigateTo({
        url: `/pages/nft/order/transfer?id=${this.collectionMsg.id}`,
      });
    },
    // 选择数量下单
    buyChangeNum(data) {
      this.form = Object.assign(this.form, data);
      this.toOrder();
    },
    // 验证结果
    verifyResult({ flag }) {
      if (flag) {
        this.verifyForm.show = false;
        this.createOrder(this.form);
      }
    },
    // 创建订单
    createOrder(params) {
      uni.showLoading({
        title: "下单中，请稍候...",
        mask: true,
      });
      setTimeout(() => {
        orderAdd(params).then((res) => {
          uni.hideLoading();
          if (res.code == 1005)
            this.base
              .modal(
                "温馨提示",
                "您尚有未完成的订单，请先支付/取消该订单",
                "去看看"
              )
              .then((status) => {
                if (status)
                  uni.navigateTo({
                    url: `/pages/nft/order/pay?orderId=${res.data}`,
                  });
              });
          else {
            uni.navigateTo({
              url: `/pages/nft/order/pay?orderId=${res.data.orderId}`,
            });
          }
        });
      }, 1500);
    },
    // 创建订单前置条件验证
    beforeCreateOrder() {
      return new Promise(async (resolve, reject) => {
        if (!this.userInfo.mobile) {
          this.base
            .modal("未登录", "登录后才可购买心爱的藏品", "去登录")
            .then((res) => {
              if (res) this.goLogin();
            });
          reject();
        } else if (!this.isAuth) {
          this.base
            .modal("暂未实名", "实名认证后才可购买心爱的藏品", "去实名")
            .then((res) => {
              if (res) this.goAuth();
            });
          reject();
        } else {
          uni.showLoading({
            title: "请求中，请稍候...",
            mask: true,
          });
          const data = await this.checkCollectionStatus();
          resolve(data);
        }
      });
    },
    // 查看藏品状态
    checkCollectionStatus() {
      return new Promise(async (resolve, reject) => {
        const { data } = await checkStatus(this.form.productId);
        if (data.stock <= 0) {
          this.base.toast("藏品库存不足");
          resolve(false);
        } else if (data.status == 3) {
          // 0:未发布,1:未发售,2:发售中,3:售罄,4:下架
          this.base.toast("藏品已售罄");
          resolve(false);
        } else {
          resolve(true);
        }
      });
    },
    checkAuthStatus() {
      return new Promise(async (resolve, reject) => {
        const { data } = await getAuthStatus();
        if (data == 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    },
    // 返回上一页
    goback() {
      if (this.collectionType == 1)
        uni.switchTab({
          url: `/pages/nft/main/home`,
        });
      else uni.navigateBack();
    },
    // 查看获得条件
    checkConditions(id) {
      getConditions(id).then(({ data }) => {
        this.conditionMsg = data;
      });
    },
    goLogin() {
      uni.navigateTo({
        url: "/pages/nft/public/login",
      });
    },
    goAuth() {
      uni.navigateTo({
        url: "/pages/nft/user/set/auth",
      });
    },
    // 转换
    changeRotate() {
      if (this.collectionType == 2) {
        const img = document.getElementById("mainImg");
        if (this.collectionForm == 1) {
          img.style.transform = `rotateY(180deg) translateZ(1px)`;
        } else {
          img.style.transform = `rotateY(0deg) translateZ(1px)`;
        }
        // setTimeout(() => {
        //   this.productImg =
        //     this.collectionForm == 1
        //       ? this.collectionMsg.productCover
        //       : this.EquipmentMsg.equipmentCover;
        // }, 800);
      }
    },
    // 点亮藏品
    goLight() {
      if (this.collectionMsg.openLight == 1) {
        uni.navigateTo({
          url: `/pages/nft/mix/index?id=${this.collectionMsg.id}`,
        });
      } else {
        this.base.toast("当前藏品无法点亮");
      }
    },
    // 切换形态按钮
    changeBtn(type) {
      switch (type) {
        case 1:
          this.base.toast("敬请期待……");
          break;
        default:
          this.changeRotate();
          this.collectionForm = this.collectionForm == 1 ? "2" : "1";
          break;
      }
    },
    // 初始化商品信息
    async initval() {
      if (this.collectionType == 1) {
        const { data } = await getProductInfo(this.form.productId);
        this.collectionMsg = data;
      } else {
        const { data } = await getMyProductInfo(this.form.productId);
        if (data.lightUp == 1 && data.productType != 5 && data.productType != 4)
          selectBindEquipment(data.productId).then(({ data }) => {
            this.EquipmentMsg = data;
          });
        this.collectionMsg = data;
        this.productImg = this.collectionMsg.productCover;
      }
      this.checkConditions(this.form.productId);
    },
  },
  async onLoad(e) {
    this.backWay = e.query ? "shop" : "nft";
    store.dispatch("sysType", e.query ? "shop" : "nft");
    e.token ? store.dispatch("setToken", e.token) : "";
    this.collectionType = e.type;
    this.form.productId = e.id;
    this.initval();
    setTimeout(() => {
      this.isOnLoad = false;
    }, 500);
  },
  async onShow() {
    if (this.userInfo.mobile) {
      this.isAuth = await this.checkAuthStatus();
    }
    // 首次加载由onLoad执行
    if (this.isOnLoad) return;
    if (this.timer) clearTimeout(this.timer);
    this.initval();
  },
};
</script>

<style lang="scss" scoped>
.commodity {
  /deep/.container {
    /* #ifdef APP-PLUS */
    padding-top: 88upx;
    /* #endif */
    min-height: 100%;
  }

  /deep/.home {
    background-image: url("../../../static/images/element/wood/ic_h_bg.png");
    background-size: 100% 1200upx;
    background-repeat: no-repeat;
    // background-color: #f7f7f7;
    // background: palevioletred;
  }

  .main {
    text-align: center;
    padding-top: 108upx;

    .mainImg {
      padding: 15upx;
      background: $white_color;
      border-radius: 30upx;
      width: 460upx;
      height: 460upx;
      margin: auto;
      transform-style: preserve-3d;
      transition: 4s ease;
      position: relative;

      .img {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* Chrome 、Safari */
        -moz-backface-visibility: hidden;
        /* Firefox */
        -ms-backface-visibility: hidden;
        /* Internet Explorer */
      }

      .background {
        top: 14upx;
        left: 14upx;
        position: absolute;
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        /* Chrome and Safari */
        -moz-transform: rotateY(180deg);
        /* Firefox */
      }
    }

    .tz {
      width: 650upx;
      margin: 40upx auto 0;
    }
  }

  .btns {
    margin-top: 40upx;

    .changeBtn {
      margin-right: 20upx;

      /deep/.u-button {
        color: $black_color !important;
      }
    }
  }

  .message {
    padding: 0 30upx 160upx;

    .msgBox {
      background: $white_color;
      padding: 30upx;
      border-radius: 20upx;
      margin-bottom: 30upx;

      .series {
        height: 36upx;
        line-height: 36upx;
        padding: 0 10upx;
        color: $white_color;
        border-radius: 6upx;
      }
      .lave_icon {
        width: 56upx;
        height: 56upx;
      }

      .cell {
        .title {
          width: 120upx;
          color: $text_gray;
        }

        .value {
          width: calc(100% - 160upx);
        }
      }

      &.author {
        .right {
          width: calc(100% - 140upx);

          .name {
            margin: 5upx 0 10upx;
          }
        }
      }

      &.owner {
        .flex1.name {
          max-width: 50%;
          display: block;
        }

        .flex1.number {
          text-align: right;
          max-width: 50%;
          display: block;
        }
      }
    }
  }

  .lightBtn {
    position: fixed;
    bottom: 180upx;
    right: 30upx;
  }
}

.alert {
  position: fixed;
  width: 100%;
  bottom: 148upx;
  z-index: 2;
}

/deep/.u-count-down__text {
  color: $white_color;
}
</style>
