<template>
  <view>
    <com-page title="转赠" :border="false">
      <view class="pd_15">
        <view class="label mg_b_15">您将赠送以下藏品</view>
        <view class="payBox orderMsg pd_15 pd_r_5">
          <view class="flex_between">
            <u--image
              :src="collectionMsg.productCover"
              width="160upx"
              height="160upx"
              radius="10upx"
              class="img"
            ></u--image>
            <view class="msg flex_v_between">
              <view class="name over_el_1 wd_100">
                {{ collectionMsg.productName || "这是藏品名称" }}
              </view>
              <view class="tips_color font_12 wd_100">
                #{{ collectionMsg.number }}
              </view>
              <view class="tips_color font_12 break">
                {{ collectionMsg.blockchainAddress }}
              </view>
            </view>
          </view>
        </view>
        <view class="payBox pd_15 mg_t_15">
          <com-title title="受赠人地址" />
          <u--input
            placeholder="请填写受赠好友的区块地址/手机号"
            border="none"
            v-model="form.mobile"
            @blur="selectAddressMsg"
            @change="changeMobile"
          ></u--input>
        </view>
        <view class="payBox pd_15 mg_t_15" v-if="acceptMsg.show">
          <com-title title="受赠人信息" />
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">受赠人昵称</view>
            <view class="value">{{ acceptMsg.userName }}</view>
          </view>
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">受赠人电话</view>
            <view class="value">
              {{ acceptMsg.mobile }}
            </view>
          </view>
          <view class="cell mg_t_15 flex">
            <view class="title mg_r_20">受赠人区块地址</view>
            <view class="value break">
              {{ acceptMsg.blockchainAccount }}
            </view>
          </view>
        </view>
        <view class="noneAddress" v-if="acceptMsg.error">
          {{ wrongMsg }}
        </view>
        <view class="tips mg_t_15 pd_b_60">
          <com-title title="温馨提示" />
          <view class="text_gray">
            <view> 1、请您确认您具备赠送数字藏品的民事行为能力； </view>
            <view>
              2、请您确认您与受赠人均已通过平台的实名认证并遵守相关法律法规及平台协议；
            </view>
            <view>3、请您确认本次赠送行为末设定任何形式的对价；</view>
            <view> 4、转赠操作无法撤销； </view>
            <view>
              5、与数字藏品相关的权利将会同步且毫无保留的转移至受赠人；
            </view>
          </view>
        </view>
        <view class="bottom">
          <u-button class="main_btn" @click="transferBtnClick">
            <text class="mg_l_5">转赠</text>
          </u-button>
        </view>
      </view>
      <u-popup
        :show="showCode"
        @close="closeShowCode"
        mode="center"
        round="30upx"
        closeable
      >
        <view class="popupBox">
          <view class="title"> 验证手机 </view>
          <view class="tips text_gray font_13">
            短信以发送至尾号{{ userInfo.mobile | hidePhone }}的手机中
          </view>
          <u-code-input
            class="codeInput"
            v-model="form.code"
            mode="line"
            hairline
            @finish="transferTo"
          ></u-code-input>
          <u-code
            ref="uCode"
            @change="codeChange"
            seconds="60"
            changeText="Xs可重发"
          ></u-code>
          <view @click="getCode" class="code_color">{{ codeForm.text }}</view>
        </view>
      </u-popup>
    </com-page>
  </view>
</template>

<script>
import { getSmsCode, getSmsCodeSecret } from "@/api/nft/public";
import { selectToUserInfo, transfer } from "@/api/nft/transfer";
import { getMyProductInfo } from "@/api/nft/collection";
import { loadUserInfo } from "@/util/cache";
import { Encrypt } from "@/util/cryptoJs.js";
export default {
  data() {
    return {
      orderMsg: {},
      showCode: false,
      form: {
        memberProductId: "",
        mobile: "",
        code: "",
      },

      codeForm: {
        //验证码参数
        text: "获取验证码",
        time: 60,
        status: true,
        interval: "",
      },
      // 藏品信息
      collectionMsg: {},
      // 受赠人信息
      acceptMsg: {
        error: false,
        show: false,
      },
      // 错误提示语
      wrongMsg: "",
      // 转赠锁
      couldTransfer: false,
      // 用户信息
      userInfo: loadUserInfo(),
    };
  },
  methods: {
    // 查询转赠地址信息
    async selectAddressMsg() {
      if (!this.form.mobile) return false;
      try {
        const { data } = await selectToUserInfo(this.form.mobile);
        this.acceptMsg.error = false;
        this.acceptMsg = { ...this.acceptMsg, ...data };
        this.acceptMsg.show = true;
        setTimeout(() => {
          this.couldTransfer = true;
        }, 500);
      } catch (error) {
        this.acceptMsg.error = true;
        this.wrongMsg = error.msg;
      }
    },
    // 验证码文字修改
    codeChange(text) {
      this.codeForm.text = text;
    },
    // 获取验证码
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: "正在获取验证码",
        });
        // getSmsCode(this.userInfo.mobile).then(() => {
        //   // 这里此提示会被this.start()方法中的提示覆盖
        //   uni.$u.toast("验证码已发送");
        //   // 通知验证码组件内部开始倒计时
        //   this.$refs.uCode.start();
        // });
        getSmsCodeSecret(Encrypt({ mobile: this.userInfo.mobile })).then(() => {
          // 这里此提示会被this.start()方法中的提示覆盖
          uni.$u.toast("验证码已发送");
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        });
      } else {
        uni.$u.toast("倒计时结束后再发送");
      }
    },
    // 修改输入框
    changeMobile(val) {
      if (!val)
        this.acceptMsg = {
          error: false,
          show: false,
        };
    },
    // 点击转赠按钮
    transferBtnClick() {
      if (!this.couldTransfer) return false;
      this.showCode = true;
    },
    // 转赠
    transferTo() {
      uni.showLoading({
        title: "转赠处理中",
      });
      let form = this.form;
      form.mobile = this.acceptMsg.mobile;
      transfer(form).then(() => {
        setTimeout(async () => {
          await uni.hideLoading();
        }, 1500);
        this.base.toast("藏品转赠成功了哟~");
        setTimeout(() => {
          uni.navigateBack({
            delta: 3,
          });
          uni.redirectTo({ url: "/pages/nft/collection/list" });
        }, 1500);
      });
    },
    // 关闭转赠输入验证码窗口
    closeShowCode() {
      this.showCode = false;
      this.couldTransfer = false;
    },
  },
  onLoad(e) {
    this.form.memberProductId = e.id;
    getMyProductInfo(e.id).then(({ data }) => {
      this.collectionMsg = data;
    });
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
  text-align: center;
  .title {
    font-size: 36upx;
    font-weight: 500;
    margin: 50upx 0;
  }
  .codeInput {
    padding: 30upx 0 60upx;
  }
}
.payBox {
  .right {
    width: calc(100% - 120upx);
  }
  .cell {
    .title {
      width: 200upx;
      color: $text_gray;
    }
    .value {
      width: calc(100% - 240upx);
    }
  }
}
.noneAddress {
  width: 100%;
  height: 60upx;
  line-height: 60upx;
  text-align: center;
  border-radius: 20px;
  background: linear-gradient(0deg, #ffefef 0%, #ffffff 100%);
  font-size: 22upx;
  color: #ff6b6b;
}

.bottom {
  background: #f7f7f7;
  position: fixed;
  width: calc(100% - 60upx);
  padding-left: 0;
  /* #ifdef APP-PLUS */
  bottom: 0;
  /* #endif */
  /* #ifdef H5 */
  padding-bottom: 30upx;
  /* #endif */
}
</style>
