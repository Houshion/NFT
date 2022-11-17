<template>
  <view>
    <com-page title="实名认证">
      <u--form
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="form"
        labelWidth="auto"
        :labelStyle="{ 'padding-left': '30upx' }"
        class="form"
      >
        <u-form-item label="真实姓名" prop="name" borderBottom ref="form">
          <u--input
            inputAlign="right"
            placeholder="请输入真实姓名"
            v-model="form.name"
            border="none"
            class="mg_r_15"
          ></u--input>
        </u-form-item>
        <u-form-item label="身份证号" prop="idCard" borderBottom ref="form">
          <u--input
            maxlength="18"
            inputAlign="right"
            type="idcard"
            placeholder="请输入身份证号"
            v-model="form.idCard"
            border="none"
            class="mg_r_15"
          ></u--input>
        </u-form-item>
      </u--form>
      <view class="bottom pd_15">
        <button class="confirm-btn" @click="auth">
          <text class="mg_l_5">认证</text>
        </button>
      </view>
    </com-page>
  </view>
</template>

<script>
import store from "@/store";
import { userAuth } from "@/api/nft/user";
import { userInfo } from "@/api/nft/public";
export default {
  data() {
    return {
      form: {
        name: "",
        idCard: "",
      },
      rules: {
        name: {
          type: "string",
          required: true,
          message: "请输入真实姓名",
          trigger: ["blur", "change"],
        },
        idCard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: ["blur", "change"],
          },
          {
            required: true,
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return uni.$u.test.idCard(value);
            },
            message: "请输入正确的身份证号",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    auth() {
      this.$refs.form.validate().then(async (res) => {
        if (res) {
          await userAuth(this.form);
          this.base.toast("认证成功");
          userInfo().then((user) => {
            store.dispatch("setUserInfo", user.data);
            setTimeout(() => {
              uni.navigateBack();
            }, 1500);
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.container {
  background: #f7f7f7;
}
.form {
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
/deep/ .u-form-item__body__right__message {
  padding-right: 30upx;
}
</style>
