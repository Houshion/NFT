<template>
  <view>
    <com-page title="设置">
      <view class="container mg_t_5">
        <u-cell-group :customStyle="{ background: '#ffffff' }" :border="false">
          <u-cell title="头像" isLink @click="afterRead">
            <template #value>
              <!-- <u-upload
                :fileList="fileList"
                @afterRead="afterRead"
                :maxCount="1"
                width="120"
                height="120"
                class="uploadEnd"
              >
                <u-avatar
                  class="portrait"
                  size="120upx"
                  :src="userInfo.avatar"
                ></u-avatar>
              </u-upload> -->
              <u-avatar
                class="portrait"
                size="120upx"
                :src="userInfo.avatar"
              ></u-avatar>
            </template>
          </u-cell>
          <u-cell
            title="昵称"
            isLink
            :value="userInfo.userName"
            url="/pages/nft/user/set/nickname"
          ></u-cell>
          <u-cell title="手机号" :value="userInfo.mobile"></u-cell>
          <u-cell
            title="钱包地址"
            :arrow="false"
            @click="copyCode(userInfo.blockchainAccount)"
          >
            <template #value>
              <view class="u-cell__value">
                {{ userInfo.blockchainAccount | changeAddr }}
              </view>
            </template>
            <template #right-icon>
              <u-icon
                :name="require(`@/static/images/ic_fzhi.png`)"
                size="14"
                class="mg_l_5"
              ></u-icon>
            </template>
          </u-cell>
          <u-cell
            title="注册时间"
            :value="userInfo.registerTime | timeStr('Y/m/d H:i:s')"
          ></u-cell>
          <u-cell
            title="实名认证"
            :isLink="!userInfo.isAuth"
            :url="!userInfo.isAuth ? '/pages/nft/user/set/auth' : ''"
          >
            <template #value>
              <template v-if="userInfo.isAuth">
                <u-icon
                  :name="require(`@/static/images/ic_yrz.png`)"
                  size="18"
                  class="mg_r_5"
                ></u-icon>
                <view class="u-cell__value">
                  已实名({{ userInfo.authTime | timeStr("Y/m/d H:i") }})
                </view>
              </template>
              <template v-else>
                <view class="u-cell__value">未认证</view>
              </template>
            </template>
          </u-cell>
          <!-- <u-cell
            title="银行卡"
            isLink
            value="已绑卡"
            url="/pages/nft/user/set/card/card"
          ></u-cell> -->
        </u-cell-group>
        <u-cell-group
          :customStyle="{ background: '#ffffff', 'margin-top': '16upx' }"
          :border="false"
        >
          <!-- <u-cell
            title="设置交易密码"
            isLink
            url="/pages/nft/user/set/changePass?type=1"
          /> -->
          <u-cell
            title="设置登录密码"
            isLink
            url="/pages/nft/user/set/changePass?type=2"
          />
        </u-cell-group>
        <!-- #ifdef APP_PLUS -->
        <u-cell-group
          :customStyle="{ background: '#ffffff', 'margin-top': '16upx' }"
          :border="false"
        >
          <u-cell title="消息推送">
            <template #value> <u-switch v-model="value"></u-switch> </template>
          </u-cell>
        </u-cell-group>
        <u-cell-group
          :customStyle="{ background: '#ffffff', 'margin-top': '16upx' }"
          :border="false"
        >
          <u-cell title="清除缓存" />
          <u-cell title="检查更新" value="当前版本 v1.0.0" />
        </u-cell-group>
        <!-- #endif -->
        <view class="list-cell del-account-btn" @click="delAccount">
          <text class="cell-tit pfb">注销账户</text>
        </view>
        <view class="list-cell log-out-btn" @click="toLogout">
          <text class="cell-tit pfb">退出登录</text>
        </view>
      </view>
    </com-page>
  </view>
</template>

<script>
import store from "@/store";
import { loadUserInfo } from "@/util/cache";
import { upload, userInfo, userRegister } from "@/api/nft/public";
import { changeUserInfo } from "@/api/nft/user";
import * as data from "./phone";
export default {
  data() {
    return {
      userInfo: loadUserInfo(),
      value: true,
      fileList: [],
    };
  },

  methods: {
    // 复制粘贴
    copyCode(code) {
      this.base.copy(code);
    },
    // 退出登录
    toLogout() {
      uni.showModal({
        title: "温馨提示",
        content: "确定要退出登录么？",
        success: (e) => {
          if (e.confirm) {
            store.dispatch("LogOut");
          }
        },
      });
    },
    // 注销账户
    delAccount() {
      uni.showModal({
        title: "注销账户",
        content:
          "确认注销后60天内再次登录系统则恢复，否则60天后系统自动注销账户，确定要注销账户吗？",
        success: (e) => {
          if (e.confirm) {
            this.base.toast("注销成功");
            setTimeout(() => {
              store.dispatch("LogOut");
            }, 1500);
            console.log("用户按了注销按钮");
          }
        },
      });
    },
    //switch
    switchChange(e) {
      let statusTip = e.detail.value ? "打开" : "关闭";
      this.$api.msg(`${statusTip}消息推送`);
    },
    // 上传头像返回内容
    afterRead() {
      console.log(123);
      let avatar = "";
      upload().then(({ data }) => {
        avatar = data.url;
        uni.showLoading({
          title: "头像上传中...",
        });
        console.log("avatar", avatar);
        changeUserInfo({ avatar }).then((res) => {
          userInfo().then(({ data }) => {
            this.base.toast("修改成功");
            store.dispatch("setUserInfo", data);
            this.userInfo = data;
          });
        });
      });
    },
    // 注册用户（只用一次）
    registerUser() {
      data.PHONE.forEach((phone) => {
        userRegister(phone);
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  background: $page-color-base;
}
.list-cell {
  display: flex;
  align-items: baseline;
  padding: 20upx $page-row-spacing;
  line-height: 60upx;
  position: relative;
  background: #fff;
  justify-content: center;
  &.log-out-btn {
    margin-top: 20upx;
    .cell-tit {
      color: $label_color;
      text-align: center;
      margin-right: 0;
    }
  }
  &.del-account-btn {
    margin-top: 20upx;
    .cell-tit {
      color: $red_color;
      text-align: center;
      margin-right: 0;
    }
  }
  &.cell-hover {
    background: #fafafa;
  }
  &.b-b:after {
    left: 30upx;
  }
  &.m-t {
    margin-top: 16upx;
  }
  .cell-more {
    align-self: baseline;
    font-size: $font-lg;
    color: $font-color-light;
    margin-left: 10upx;
  }
  .cell-tit {
    flex: 1;
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    margin-right: 10upx;
  }
  .cell-tip {
    font-size: $font-base;
    color: $font-color-light;
  }
  switch {
    transform: translateX(16upx) scale(0.84);
  }
}
.uploadEnd {
  flex: inherit;
}
/deep/ .u-cell__value {
  color: $cell_value_color;
  font-size: 26upx;
}
</style>
