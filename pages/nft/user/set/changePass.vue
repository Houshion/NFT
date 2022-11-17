<template>
  <view>
    <com-page :title="title" :border="false">
      <view class="tips">
        为了保障您的账户安全，已给您{{
          userInfo.mobile | changePhone
        }}的手机发送验证码
      </view>
      <u--form
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="form"
        labelWidth="200upx"
        :labelStyle="{ 'padding-left': '30upx' }"
        class="form"
      >
        <u-form-item label="手机验证码" prop="code" ref="form" class="mg_b_10">
          <u--input
            placeholder="请输入验证码"
            v-model="form.code"
            border="none"
            class="mg_r_15"
            type="number"
            maxlength="6"
          >
            <template slot="suffix">
              <u-code
                ref="uCode"
                @change="codeChange"
                seconds="60"
                changeText="XS"
              ></u-code>
              <view @click="getCode" class="login_title_color">{{
                codeForm.text
              }}</view>
            </template></u--input
          >
        </u-form-item>
        <template v-if="type == 1">
          <u-form-item label="交易密码" prop="name" borderBottom ref="form">
            <u--input
              type="password"
              placeholder="请输入6位数字交易密码"
              v-model="form.name"
              border="none"
              class="mg_r_15"
            ></u--input>
          </u-form-item>
          <u-form-item label="确认密码" prop="number" ref="form">
            <u--input
              type="password"
              placeholder="请再次输入交易密码"
              v-model="form.number"
              border="none"
              class="mg_r_15"
            ></u--input>
          </u-form-item>
        </template>
        <template v-else>
          <u-form-item label="登录密码" prop="loginPwd" borderBottom ref="form">
            <u--input
              type="password"
              placeholder="请输入6-16位英文/数字字符"
              v-model="form.loginPwd"
              border="none"
              class="mg_r_15"
            ></u--input>
          </u-form-item>
          <u-form-item label="确认密码" prop="confirmPwd" ref="form">
            <u--input
              type="password"
              placeholder="请再次输入登录密码"
              v-model="form.confirmPwd"
              border="none"
              class="mg_r_15"
            ></u--input>
          </u-form-item>
        </template>
      </u--form>
      <view class="bottom pd_15">
        <button class="confirm-btn" @click="confirm">
          <text class="mg_l_5">确认修改</text>
        </button>
      </view>
    </com-page>
  </view>
</template>

<script>
import { getSmsCode, getSmsCodeSecret } from "@/api/nft/public";
import { changePwd } from "@/api/nft/user";
import { loadUserInfo } from "@/util/cache";
import { Encrypt } from "@/util/cryptoJs.js";

export default {
  data() {
    const surePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: loadUserInfo(),
      form: {
        code: "",
        loginPwd: "",
        confirmPwd: "",
      },
      rules: {
        code: {
          len: 6,
          required: true,
          message: "请正确输入验证码",
          trigger: ["blur", "change"],
        },
        loginPwd: [
          {
            required: true,
            min: 6,
            max: 16,
            message: "请输入6-16位英文/数字字符",
            trigger: ["blur", "change"],
          },
          {
            required: true,
            pattern: /^[0-9a-zA-Z]*$/g,
            // 正则检验前先将值转为字符串
            transform(value) {
              return String(value);
            },
            message: "只能包含字母或数字",
            trigger: ["blur", "change"],
          },
        ],
        confirmPwd: [
          { required: true, message: "请再次输入登录密码", trigger: "blur" },
          { validator: surePwd, required: true, trigger: "blur" },
        ],
      },
      codeForm: {
        //验证码参数
        text: "获取验证码",
        time: 60,
        status: true,
        interval: "",
      },
      // 标头名称
      title: "",
      // 类型 1、交易密码 2、登录密码
      type: "",
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.title = this.type == 1 ? "设置交易密码" : "设置登录密码";
  },
  methods: {
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
        getSmsCodeSecret(Encrypt({ mobile: this.userInfo.mobile })).then(
          (res) => {
            uni.hideLoading();
            // 这里此提示会被this.start()方法中的提示覆盖
            uni.$u.toast("验证码已发送");
            // 通知验证码组件内部开始倒计时
            this.$refs.uCode.start();
          }
        );
        return;
        getSmsCode(this.userInfo.mobile).then((res) => {
          uni.hideLoading();
          // 这里此提示会被this.start()方法中的提示覆盖
          uni.$u.toast("验证码已发送");
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        });
      } else {
        uni.$u.toast("倒计时结束后再发送");
      }
    },
    // 确认修改
    confirm() {
      // const data = "3TPpnQeo9EZkVIUNsiM78tCuM5K2dTH2Dxr+pVrMzcRmH3U0NycnSuGRN2o6L/wT5jZaPUXxhxogEnCxm03vUa/3wh3hVu1qdi3hY3ODCkvYPpXpNhSAei46GpaRzUB6EEmuhEAXC10ht44omdhURQ=="
      // console.log(Encrypt(this.form))

      this.$refs.form
        .validate()
        .then(async (res) => {
          await changePwd(Encrypt(this.form));
          this.base.toast("操作成功");
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        })
        .catch((errors) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.container {
  background: #f7f7f7;
}
/deep/.u-form-item__body {
  background: #ffffff;
}
.bottom {
  position: fixed;
  width: calc(100% - 60upx);
  /* #ifdef APP-PLUS */
  bottom: 0;
  /* #endif */
  /* #ifdef H5 */
  padding-bottom: 30upx;
  /* #endif */
  .confirm-btn {
    width: 100%;
    height: 88upx;
    line-height: 88upx;
    border-radius: 30px;
    background: $main_btn_color;
    color: $white_color;
    font-size: 30upx;
    font-weight: 600;
    &:after {
      border-radius: 100px;
      border: none;
    }
  }
}
/deep/ .u-form-item {
  background: $white_color;
}
/deep/ .u-form-item__body__right__message {
  padding-right: 30upx;
  text-align: right;
  margin: 10upx 0;
}
.tips {
  color: $tips_color;
  font-size: 24upx;
  padding: 30upx;
}
</style>
