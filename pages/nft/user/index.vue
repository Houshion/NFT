<template>
  <view class="user">
    <u-notify ref="uNotify" class="m"></u-notify>
    <com-home>
      <template #header>
        <view class="pd_l_15 pd_r_15">
          <view class="info_light pd_t_10">个人中心</view>
          <view class="sor font_20">personal center</view>
        </view>
        <view class="user-section flex_between">
          <view class="user-info-box">
            <view class="portrait-box">
              <u-avatar size="120upx" :src="userInfo.avatar"></u-avatar>
            </view>
            <view class="info-box mg_l_10">
              <view class="text_default font_18 pfb flex_between flex_v_start">
                <view class="name mg_b_5">{{ userInfo.userName }}</view>
                <u-icon
                  class="iconSet"
                  :name="require(`@/static/images/ic_shez.png`)"
                  size="22"
                  @click="navTo('/pages/nft/user/set/index')"
                ></u-icon>
              </view>
              <view
                class="font_12 flex tips_color"
                @click="copyCode(userInfo.blockchainAccount)"
              >
                区块地址：{{ userInfo.blockchainAccount | changeAddr }}
                <u-icon
                  :name="require(`@/static/images/ic_fzhi.png`)"
                  size="14"
                  class="mg_l_5"
                ></u-icon>
              </view>
            </view>
          </view>
        </view>
      </template>
      <template>
        <!-- <view class="tj-sction">
      <view class="tj-item">
        <text class="num">钱包余额</text>
      </view>
      <view class="tj-item">
        <view class="num flex_v_center">
          128.8
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </view> -->
        <view class="cover-container">
          <!-- 订单 -->
          <view class="order-section">
            <u-grid :border="false" class="mg_b_15" :col="orderTabs.length">
              <u-grid-item
                v-for="(item, index) in orderTabs"
                :key="index"
                @click="navTo(item)"
              >
                <u--image
                  :src="item.imgSrc"
                  width="50upx"
                  height="50upx"
                ></u--image>
                <text class="mg_t_5">{{ item.title }}</text>
              </u-grid-item>
            </u-grid>
          </view>
          <view class="line"></view>
          <view class="history-section icon">
            <list-cell
              v-for="(item, index) in itemList"
              :key="index"
              :icon="item.icon"
              :title="item.title"
              :tips="item.value"
              :type="item.type"
              @eventClick="
                () => {
                  if (item.url) navTo(item);
                  else if (item.feedback) feedbackShow = true;
                }
              "
            ></list-cell>
          </view>
        </view>
        <u-popup
          :show="feedbackShow"
          mode="center"
          @close="feedbackShow = false"
          round="14upx"
        >
          <view class="bfff pd_10">
            <u--image
              :showLoading="true"
              :src="serviceImg"
              width="360upx"
              height="360upx"
            ></u--image>
          </view>
        </u-popup>
      </template>
    </com-home>
  </view>
</template>  
<script>
import store from "@/store";
import listCell from "@/components/mix-list-cell";
import * as data from "./data";
import { loadUserInfo } from "@/util/cache";
import { userInfo, getAgreement } from "@/api/nft/public";
import { getValidCount } from "@/api/nft/integral";
export default {
  components: {
    listCell,
  },
  data() {
    return {
      feedbackShow: false, // 意见反馈弹窗
      orderTabs: data.ORDER_TABS,
      itemList: data.ITEM_LIST,
      serviceImg: data.SERVICE_IMG,
      userInfo: loadUserInfo(),
      noPwdShow: true,
    };
  },
  onLoad() {},
  computed: {
    // ...mapState(['hasLogin','userInfo'])
  },
  onShow() {
    userInfo().then(({ data }) => {
      store.dispatch("setUserInfo", data);
      this.userInfo = data;
      if (!data.hadSetPwd)
        this.$refs.uNotify.show({
          top: 0,
          type: "warning",
          message: `尊敬的${data.userName},您还没有设置登录密码哟~`,
          duration: 1000 * 3,
          fontSize: 14,
          safeAreaInsetTop: true,
        });
    });
    getAgreement(3).then(({ data }) => {
      this.serviceImg = data;
    });
    getValidCount().then(({ data }) => {
      this.itemList[1].value = data;
    });
  },
  onReady() {},
  created() {
    this.userInfo = loadUserInfo();
  },
  methods: {
    // 复制粘贴
    copyCode(code) {
      this.base.copy(code);
    },
    /**
     * 统一跳转接口,拦截未登录路由
     * navigator标签现在默认没有转场动画，所以用view
     */
    navTo(item) {
      console.log("item", item);
      if (item.share && !this.userInfo.isAuth) {
        return this.base.toast("请先实名认证再邀请好友");
      }
      uni.navigateTo({
        url: item.url || item,
      });
    },
  },
};
</script>  
<style lang='scss' scoped>
.user {
  background-color: #fff;
  min-height: 100%;
  .home {
    /* #ifdef APP-PLUS */
    padding-top: 70upx;
    /* #endif */
    /* #ifdef H5 */
    // padding-top: 10upx;
    /* #endif */
    background: none;
  }
  .m {
    top: 0 !important;
  }
}
%flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
%section {
  display: flex;
  justify-content: space-around;
  align-content: center;
  border-radius: 10upx;
}

.user-section {
  padding: 0upx 30upx 30upx;
  position: relative;
  width: 100%;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(1px);
    opacity: 0.7;
  }
}
.user-info-box {
  width: 100%;
  height: 180upx;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  .portrait {
    width: 130upx;
    height: 130upx;
    border: 5upx solid #fff;
    border-radius: 50%;
  }
  .username {
    font-size: $font-lg + 6upx;
    color: $font-color-dark;
    margin-left: 20upx;
  }
  .info-box {
    width: calc(100% - 60upx);
  }
}
.cover-container {
  position: relative;
  .arc {
    position: absolute;
    left: 0;
    top: -34upx;
    width: 100%;
    height: 36upx;
  }
}
.tj-sction {
  width: calc(100% - 60upx);
  position: relative;
  box-shadow: 0 0 5upx 5upx #efefef;
  @extend %section;
  justify-content: space-between;
  padding: 0 40upx;
  margin: -30upx auto 0;
  .tj-item {
    @extend %flex-center;
    flex-direction: column;
    height: 140upx;
    font-size: $font-sm;
    color: #75787d;
  }
  .num {
    font-size: $font-lg;
    color: $font-color-dark;
    margin-bottom: 8upx;
  }
}
.order-section {
  padding: 40upx 0 0;
  border-radius: 10upx;
  .list {
    @extend %section;
    .order-item {
      @extend %flex-center;
      width: 120upx;
      height: 120upx;
      border-radius: 10upx;
      font-size: $font-sm;
      color: $font-color-dark;
    }
    .yticon {
      font-size: 48upx;
      margin-bottom: 18upx;
      color: #fa436a;
    }
    .icon-shouhoutuikuan {
      font-size: 44upx;
    }
  }
}
.sec-header {
  display: flex;
  align-items: center;
  font-size: $font-base;
  color: $font-color-dark;
  line-height: 40upx;
  margin-left: 10upx;
  .yticon {
    font-size: 44upx;
    color: #5eba8f;
    margin-right: 16upx;
    line-height: 40upx;
  }
}
.history-section {
  padding-top: 50upx;
  .h-list {
    white-space: nowrap;
    padding: 30upx 30upx 0;
    image {
      display: inline-block;
      width: 160upx;
      height: 160upx;
      margin-right: 20upx;
      border-radius: 10upx;
    }
  }
}
.iconSet {
  margin-top: -40upx;
}
.line {
  height: 1upx;
  background: rgba(230, 230, 230, 0);
  box-shadow: 0px 3upx 7upx 0px #d8e2e2;
}
</style>