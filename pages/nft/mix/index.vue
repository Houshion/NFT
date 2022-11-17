<template>
  <view class="mix">
    <com-home>
      <u-icon name="arrow-left" class="backBtn" @click="goback"></u-icon>
      <view class="lightUpProduct">
        <view class="titleBackground"></view>
        <view class="title">{{ productMsg.equipmentName }}</view>
        <view class="img">
          <u--image
            :src="productMsg.equipmentCover"
            width="530upx"
            height="530upx"
            radius="20upx"
          ></u--image>
        </view>
      </view>
      <view class="pd_30 white">
        <view class="flex_around tac">
          <view class="proMsg flex_center flex_v_start">
            <view class="selectConsumeImg img" @click="openPopup(1)">
              <u--image
                :src="productMsg.lightProductCover"
                width="160upx"
                height="160upx"
                radius="10upx"
              ></u--image>
              <view class="cover box" v-if="!selectBox.productMsg.number">
                +
              </view>
            </view>
            <view class="over_el_1 wd_100">{{
              productMsg.lightProductName
            }}</view>
            <view
              class="wd_100 font_12 tips_color"
              v-if="selectBox.productMsg && selectBox.productMsg.number"
            >
              #{{ (selectBox.productMsg && selectBox.productMsg.number) || "" }}
            </view>
          </view>
          <view class="proMsg flex_center flex_v_start">
            <view class="selectConsumeImg img" @click="openPopup(2)">
              <u--image
                :src="productMsg.consumeProductCover"
                width="160upx"
                height="160upx"
                radius="10upx"
              ></u--image>
              <view class="cover box" v-if="!selectBox.consumeMsg.number">
                +
              </view>
            </view>
            <view class="wd_100 over_el_1">{{
              productMsg.consumeProductName
            }}</view>
            <view
              class="wd_100 font_12 tips_color"
              v-if="selectBox.consumeMsg && selectBox.consumeMsg.number"
            >
              #{{ (selectBox.consumeMsg && selectBox.consumeMsg.number) || "" }}
            </view>
          </view>
        </view>
      </view>
      <view class="comment pd_l_20 pd_r_15 pd_b_80 white">
        <view class="mg_b_5">点亮说明:</view>
        <view class="lh_3 font_12">
          {{ productMsg.lightDescribe }}
        </view>
      </view>
      <view class="bottom" @click="toLightProduct">点亮</view>

      <u-popup
        :show="selectBox.open"
        @close="closePopup"
        mode="bottom"
        :customStyle="{
          height: '800upx',
        }"
      >
        <view class="popup">
          <view class="font_16 font_b title"> 选择藏品 </view>
          <template v-if="selectBox.list.length > 0">
            <view class="list flex_around">
              <view
                :class="['item mg_b_10', item.status ? 'active' : '']"
                v-for="(item, index) in selectBox.list"
                :key="index"
                @click="selectP(item)"
              >
                <view class="img">
                  <u--image
                    :src="item.productCover"
                    mode="widthFix"
                    width="240upx"
                    height="240upx"
                    radius="20upx"
                  ></u--image>
                </view>
                <u--image
                  :src="
                    require(`@/static/images/ic_${
                      item.status ? 'check' : 'uncheck'
                    }.png`)
                  "
                  mode="widthFix"
                  width="30upx"
                  height="30upx"
                  class="radio"
                ></u--image>
                <view class="tac pd_10">
                  <view class="name">{{ item.productName }}</view>
                  <view class="">#{{ item.number }}</view>
                </view>
              </view>
            </view>
            <u-button
              :disabled="
                (selectBox.type == 1 && !form.memberProductId) ||
                (selectBox.type == 2 && !form.consumeMemberProductId)
              "
              color="#131b32"
              class="confirm"
              @click="selectBox.open = false"
            >
              确定
            </u-button>
          </template>
          <template v-else>
            <view class="mg_t_50 pd_t_50 pd_b_20">
              <u-empty
                width="185px"
                text="未拥有"
                :icon="require(`@/static/images/none/ic_wcp.png`)"
              >
              </u-empty>
            </view>
          </template>
        </view>
      </u-popup>
    </com-home>
  </view>
</template>

<script>
import {
  getMyProductList,
  lightProductDetail,
  lightProduct,
} from "@/api/nft/collection";
export default {
  data() {
    return {
      // 用户藏品信息
      productMsg: "",
      // 对应消耗藏品信息
      selectBox: {
        type: 1,
        open: false,
        list: [],
        consumeMsg: {},
        productMsg: {},
      },
      // 消耗品藏品列表
      consumeList: [],
      // 被点亮藏品列表
      productList: [],
      // 表单参数
      form: {
        consumeMemberProductId: "",
        memberProductId: "",
      },
    };
  },
  methods: {
    // 获取用户个人藏品详情信息
    async getInfo(id) {
      const { data } = await lightProductDetail(id);
      this.productMsg = data;
      this.getProductList(data.lightProductId);
      this.getConsumeList(data.consumeProductId);
    },
    // 查询消耗品列表
    getConsumeList(id) {
      getMyProductList({
        pageNum: 1,
        pageSize: 100,
        productId: id,
      }).then(({ data }) => {
        data.forEach((item, index) => {
          let status = { status: false };
          this.$set(data, index, { ...item, ...status });
        });
        this.consumeList = data;
      });
    },
    // 查询消耗品列表
    getProductList(id) {
      getMyProductList({
        pageNum: 1,
        pageSize: 100,
        productId: id,
      }).then(({ data }) => {
        data.forEach((item, index) => {
          let status = { status: false };
          this.$set(data, index, { ...item, ...status });
        });
        this.productList = data;
      });
    },
    // 选中消耗品
    selectP(e) {
      this.selectBox.list.forEach((item) => {
        item.status = false;
      });
      e.status = true;
      if (this.selectBox.type == 1) {
        this.selectBox.productMsg = e;
        this.form.memberProductId = e.id;
      } else {
        this.selectBox.consumeMsg = e;
        this.form.consumeMemberProductId = e.id;
      }
    },
    // 点亮藏品
    async toLightProduct() {
      if (!this.form.consumeMemberProductId)
        return this.base.toast(
          `请选择消耗品${this.productMsg.consumeProduct.productName}`
        );
      uni.showLoading({
        title: "点亮中，请稍候……",
      });
      await lightProduct(this.form);
      uni.hideLoading();
      uni.redirectTo({
        url: "/pages/nft/mix/success?id=" + this.productMsg.id,
      });
    },
    // 返回上一页
    goback() {
      uni.navigateBack();
    },
    // 打开弹窗
    openPopup(type) {
      this.selectBox.type = type;
      this.selectBox.list = type == 1 ? this.productList : this.consumeList;
      this.selectBox.open = true;
    },
    // 关闭弹窗
    closePopup() {
      // this.form.memberProductId = "";
      // this.selectBox.consumeMsg = {};
      this.selectBox.open = false;
    },
  },
  async onLoad(e) {
    // this.form.memberProductId = Number(e.id);
    this.getInfo(e.id);
  },
};
</script>

<style lang="scss" scoped>
.mix {
  /deep/.container {
    /* #ifdef APP-PLUS */
    padding-top: 88upx;
    /* #endif */
    min-height: 100vh;
  }
  /deep/ .home {
    background-image: url("../../../static/images/ic_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #f7f7f7;
  }
  .lightUpProduct {
    position: relative;
    width: 560upx;
    margin: auto;
    /* #ifdef APP-PLUS */
    padding-top: 100upx;
    /* #endif */
    /* #ifdef H5 */
    padding-top: 180upx;
    /* #endif */
    .img {
      position: relative;
      z-index: 2;
      padding: 15upx;
      border-radius: 20upx;
      background: $white_color;
    }
    .titleBackground {
      background: $minor_color;
      margin: auto;
      width: 520upx;
      height: 80upx;
      transform: rotate(3deg);
      border-radius: 14upx 14upx 0 0;
      z-index: 1;
    }
    .title {
      position: relative;
      z-index: 2;
      margin-top: -70upx;
      margin-bottom: 10upx;
      padding-left: 40upx;
    }
  }
  .proMsg {
    width: 50%;
    .img {
      padding: 6upx;
      background: #ffffff;
      border-radius: 10upx;
      margin-bottom: 20upx;
    }
  }
  .selectConsumeImg {
    position: relative;
    .cover {
      position: absolute;
      width: 160upx;
      height: 160upx;
      background: rgba($color: #000000, $alpha: 0.6);
      top: 6upx;
      font-size: 90upx;
      color: rgba($color: #ffffff, $alpha: 0.9);
      border-radius: 10upx;
    }
  }
  .popup {
    max-height: 1000upx;
    overflow: scroll;
    .title {
      position: fixed;
      text-align: center;
      padding: 20upx 30upx;
      margin-bottom: 30upx;
      width: 100%;
      z-index: 2;
      background: $white_color;
    }
    .list {
      padding: 100upx 30upx;
      .item {
        position: relative;
        display: inline-block;
        border-radius: 14upx;
        width: 240upx;
        .radio {
          position: absolute;
          top: 20upx;
          right: 20upx;
        }
      }
    }
    .confirm {
      position: fixed;
      width: 80%;
      margin: 0 10%;
      bottom: 50upx;
      background: $main_color;
      color: $white_color;
      border-radius: 60upx;
      text-align: center;
      padding: 20upx 0;
    }
  }
  .bottom {
    position: fixed;
    width: 80%;
    margin: 0 10%;
    bottom: 50upx;
    background: $minor_color;
    border-radius: 60upx;
    text-align: center;
    padding: 20upx 0;
  }
  .backBtn {
    position: absolute;
    /* #ifdef H5 */
    top: 30upx;
    /* #endif */
    /* #ifdef APP-PLUS */
    top: 108upx;
    /* #endif */
    left: 30upx;
    background: rgba($color: $white_color, $alpha: 0.6);
    padding: 10upx;
    border-radius: 50%;
  }
}
</style>
