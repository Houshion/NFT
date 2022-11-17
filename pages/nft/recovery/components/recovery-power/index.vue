<template>
  <view>
    <u-popup
      mode="bottom"
      :show="show"
      @close="close"
      :custom-style="{ background: 'rgba(0,0,0,0)' }"
    >
      <view class="power_box">
        <u-icon
          class="pop_close"
          name="close-circle-fill"
          color="#cccccc"
          size="46rpx"
          @click="close"
        ></u-icon>
        <view class="power_header">
          <view class="title">
            <text>选择回购藏品</text>
          </view>
        </view>
        <view class="body">
          <scroll-view
            class="scroll_list"
            scroll-y
            v-if="list && list.length > 0"
          >
            <view class="list">
              <block v-for="(item, index) in changeList" :key="index">
                <view class="list_item">
                  <view class="image_box" @tap.stop="changeItem(item)">
                    <view class="change_btn" v-if="item.consumed != 1">
                      <image
                        class="icon"
                        v-if="item.status"
                        :src="require('@/static/images/ic_check.png')"
                        mode="aspectFill"
                      ></image>
                      <image
                        class="icon"
                        v-else
                        :src="require('@/static/images/ic_uncheck.png')"
                        mode="aspectFill"
                      ></image>
                    </view>
                    <image
                      class="product_iamhge"
                      :src="item.productCover"
                      mode="aspectFill"
                    ></image>
                    <view class="msg" v-if="item.consumed == 1">
                      <text>已消耗</text>
                    </view>
                  </view>
                  <view class="content u-line-2">
                    <text>{{ item.productName }} #{{ item.number }}</text>
                  </view>
                </view>
              </block>
            </view>
          </scroll-view>
          <view v-else>
            <u-empty
              width="185px"
              text="暂无藏品"
              :icon="require(`@/static/images/none/ic_wcp.png`)"
            >
            </u-empty>
          </view>
        </view>
        <view class="footer">
          <u-button
            :hairline="false"
            hover-class="none"
            :customStyle="btnStyle"
            throttleTime="500"
            @click="confirm"
          >
            <text>
              回购{{
                changeData.length > 0 ? `${changeData.length}份` : ""
              }}藏品
            </text>
          </u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      current: -1,
      changeData: [],
    };
  },
  computed: {
    changeList() {
      this.list.forEach((item, index) => {
        let status = { status: false };
        this.$set(this.list, index, { ...item, ...status });
      });
      return this.list;
    },
    isCommit() {
      if (!this.list || this.list.length == 0) {
        return false;
      } else {
        const _list = this.list.filter((el) => el.consumed != 1);
        if (_list && _list.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    btnStyle() {
      let style = {
        width: "600rpx",
        height: "88rpx",
        lineHeight: "88rpx",
        backgroundColor: "#131B32",
        color: "#ffffff",
        fontSize: "30rpx",
        fontWeight: 500,
        fontFamily: "PingFang SC",
        border: "none",
        borderRadius: "44rpx",
        margin: "0",
        marginBottom: "24rpx",
        padding: "0",
        opacity: 1,
      };
      if (!this.isCommit) {
        style.opacity = 0.6;
      }
      return style;
    },
  },
  created() {
    this.current = -1;
    this.changeData = [];
    console.log("list", this.list);
    console.log("changeList", this.changeList);
  },
  methods: {
    // 选择商品
    changeItem(item) {
      let arr = new Set(this.changeData);
      if (item.status) {
        arr.delete(item);
      } else {
        arr.add(item);
      }
      item.status = !item.status;
      this.changeData = [...arr];
    },
    // 确认
    confirm() {
      if (!this.isCommit) return;
      if (!this.changeData)
        return uni.showToast({
          title: "请选择需要回购的藏品",
          icon: "none",
        });
      this.$emit("handlerClick", this.changeData);
      this.close();
    },
    close() {
      this.$emit("update:show", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.power_box {
  width: 100%;
  max-height: 960rpx;
  padding: 47rpx 75rpx;
  position: relative;
  background: #ffffff;
  border-radius: 30rpx 30rpx 0px 0px;
  overflow: hidden;
  .pop_close {
    position: absolute;
    top: 40upx;
    right: 40upx;
  }
  .power_header {
    width: 100%;
    margin-bottom: 78rpx;
    text-align: center;
    .title {
      font-size: 32upx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 30upx;
    }
  }

  .body {
    margin-bottom: 26upx;
    .scroll_list {
      max-height: 575rpx;
      overflow: hidden;
      .list {
        height: auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        grid-gap: 51rpx 127rpx;
        .list_item {
          width: 232rpx;
          min-height: 49px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .image_box {
            position: relative;
            width: 180rpx;
            height: 180rpx;
            background: #000000;
            border-radius: 10rpx;
            margin-bottom: 20rpx;
            .product_iamhge {
              width: 180rpx;
              height: 180rpx;
              border-radius: 10rpx;
            }
            .change_btn {
              position: absolute;
              z-index: 1;
              top: 8upx;
              right: 10upx;
              width: 26upx;
              height: 26upx;
              .icon {
                width: 26upx;
                height: 26upx;
              }
            }
            .msg {
              position: absolute;
              left: 0;
              bottom: 0;
              width: 180upx;
              height: 36upx;
              background: rgba(0, 0, 0, 0.6);
              border-radius: 0upx 0upx 10upx 10upx;
              font-size: 22upx;
              line-height: 36upx;
              text-align: center;
              font-family: PingFang SC;
              font-weight: 500;
              color: #ffffff;
            }
          }
          .content {
            text-align: center;
            width: 100%;
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: 30rpx;
          }
        }
      }
    }
  }

  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tips {
      width: 100%;
      text-align: center;
      font-size: 22rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b3b3b3;
      line-height: 26rpx;
    }
  }
}
</style>
