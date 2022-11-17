<template>
  <view>
    <com-page title="绑定银行卡">
      <u--form
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="form"
        class="form"
        labelWidth="auto"
        :labelStyle="{ 'padding-left': '30upx' }"
      >
        <u-form-item label="持卡人姓名" prop="name" borderBottom ref="form">
          <u--input
            inputAlign="right"
            placeholder="请输入真实姓名"
            v-model="form.name"
            border="none"
            class="mg_r_15"
          ></u--input>
        </u-form-item>
        <u-form-item label="身份证号" prop="number" borderBottom ref="form">
          <u--input
            inputAlign="right"
            type="idcard"
            placeholder="请输入身份证号"
            v-model="form.number"
            border="none"
            class="mg_r_15"
          ></u--input>
        </u-form-item>
        <u-form-item label="银行卡号" prop="number" borderBottom ref="form">
          <u--input
            inputAlign="right"
            type="idcard"
            placeholder="请输入身份证号"
            v-model="form.number"
            border="none"
            class="mg_r_15"
          ></u--input>
        </u-form-item>
        <u-form-item label="开户行" prop="number" borderBottom ref="form">
          <u--input
            inputAlign="right"
            type="idcard"
            placeholder="请输入身份证号"
            v-model="form.number"
            border="none"
            class="mg_r_15"
          ></u--input>
        </u-form-item>
        <u-form-item label="银行预留手机号" prop="number" borderBottom ref="form">
          <u--input
            inputAlign="right"
            type="idcard"
            placeholder="请输入身份证号"
            v-model="form.number"
            border="none"
            class="mg_r_15"
          ></u--input>
        </u-form-item>
      </u--form>
      <view class="bottom pd_15">
        <button class="confirm-btn">
          <text class="mg_l_5">确认绑定 </text>
        </button>
      </view>
    </com-page>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        number: "",
      },
      rules: {
        name: {
          type: "string",
          required: true,
          message: "请输入真实姓名",
          trigger: ["blur", "change"],
        },
        number: {
          type: "string",
          required: true,
          message: "请输入身份证号",
          trigger: ["blur", "change"],
        },
      },
    };
  },
  created() {},
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
