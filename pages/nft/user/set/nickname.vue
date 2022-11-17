<template>
  <view>
    <com-page title="更改昵称" @rightClick="save">
      <!-- #ifdef APP-PLUS -->
      <view slot="right">
        <view class="save main_color">保存</view>
      </view>
      <!-- #endif -->
      <view class="pd_l_15 pd_r_15 pd_t_30">
        <u--input
          v-model="userName"
          placeholder="请输入昵称"
          border="bottom"
          clearable
          maxlength="20"
        ></u--input>
        <view class="tips_color font_12 mg_t_15">
          仅支持英文字母、数字、汉字，且长度不超过20个字符
        </view>
      </view>
      <!-- #ifdef H5 -->
      <view class="bottom pd_15">
        <button class="confirm-btn" @click="save">
          <text class="mg_l_5">保存</text>
        </button>
      </view>
      <!-- #endif -->
    </com-page>
  </view>
</template>

<script>
import store from "@/store";
import { changeUserName } from "@/api/nft/user";
import { userInfo } from "@/api/nft/public";
export default {
  data() {
    return {
      style: {},
      userName: "",
    };
  },
  created() {},
  methods: {
    save() {
      if (this.base.getLength(this.userName) > 20)
        return this.base.toast("昵称长度不超过20个字符");
      if (!uni.$u.test.enOrNumOrCh(this.userName))
        return this.base.toast("仅支持英文字母、数字、汉字");
      changeUserName(this.userName).then(async (res) => {
        this.base.toast("修改成功");
        const { data } = await userInfo();
        store.dispatch("setUserInfo", data);
        setTimeout(() => {
          uni.redirectTo({
            url: "/pages/nft/user/set/index",
          });
        }, 1500);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
uni-page-body {
  background: $white_color;
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
</style>
