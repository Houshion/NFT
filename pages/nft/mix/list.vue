<template>
  <view class="pages">
    <com-page title="点亮空间" :border="false" ref="comPage">
      <template #right>
        <u-icon name="file-text" size="26" @click="goToList"></u-icon>
      </template>
      <view class="lighten">
        <!-- banner藏品列表 -->
        <view class="banner">
          <swiper
            class="swiper"
            circular
            :current="currentIndex"
            @change="bannerChange"
            :interval="3000"
            previous-margin="19px"
            next-margin="19px"
          >
            <block v-for="(item, index) in list" :key="index">
              <swiper-item class="swiper-item">
                <view class="banner_info">
                  <view
                    class="banner_img_box"
                    :class="[
                      getCurrentIndex == index ? 'current_banner_img' : '',
                      !item.hadLight ? 'not_lighten' : '',
                    ]"
                  >
                    <image
                      v-if="item.productCover"
                      class="banner_img"
                      :src="item.productCover"
                      mode="aspectFill"
                    ></image>
                    <image
                      v-else
                      class="banner_img"
                      :src="
                        require(`@/static/images/element/${cPath}/ic_max.png`)
                      "
                      mode="aspectFill"
                    >
                    </image>
                    <view class="title">
                      <text class="u-line-2">{{
                        item.productName ? item.productName : "?"
                      }}</text>
                    </view>
                    <image
                      class="border_img"
                      :src="require('@/static/images/mix/ic_border.png')"
                      mode="aspectFill"
                    ></image>
                  </view>
                </view>
              </swiper-item>
            </block>
          </swiper>
          <!-- banner属性 -->
          <view class="attribute">
            <block v-for="(item, index) in attrtTypeList" :key="item.id">
              <view
                @tap.stop="changeAttr(index)"
                class="attribute_item"
                :class="[currentAttrIndex == index ? 'attribute_active' : '']"
              >
                <text>{{ item.typeName }}</text>
              </view>
            </block>
          </view>
        </view>
        <!-- 消耗品 -->
        <view class="lighten_detail">
          <view class="current_img">
            <block
              v-if="
                list[currentIndex] && list[currentIndex].consumeProductCover
              "
            >
              <view class="num">
                <text>x1</text>
              </view>
              <image
                :class="!list[currentIndex].hadLight ? 'not_lighten' : ''"
                :src="list[currentIndex].consumeProductCover"
                mode="aspectFill"
              ></image>
            </block>
            <image
              v-else
              :src="require(`@/static/images/element/${cPath}/ic_min.png`)"
              mode="aspectFill"
            >
            </image>
          </view>
          <view class="tips u-line-1">
            <text
              >点亮需要消耗《{{
                list[currentIndex] && list[currentIndex].consumeProductName
                  ? list[currentIndex].consumeProductName
                  : "?"
              }}》</text
            >
          </view>
        </view>
        <!-- 装备列表 -->
        <view class="lighten_content">
          <com-title
            :title="attrtTypeList[currentAttrIndex].title"
            :file-path="cPath"
          ></com-title>
          <view class="content_list">
            <block v-for="(item, index) in list" :key="index">
              <view
                class="content_item"
                :class="[currentIndex == index ? 'content_item_active' : '']"
              >
                <block v-if="item && item.productCover">
                  <image
                    @tap.stop="changeEquip(index)"
                    :class="[!item.hadLight ? 'not_lighten' : '']"
                    mode="aspectFill"
                    class="default_img"
                    :src="list[index].productCover"
                  ></image>
                </block>
                <block v-else>
                  <image
                    @tap.stop="changeEquip(index)"
                    class="default_img"
                    :src="
                      require(`@/static/images/element/${cPath}/ic_min.png`)
                    "
                  ></image>
                </block>
              </view>
            </block>
          </view>
        </view>
        <!-- 装备详情 -->
        <view class="detail">
          <view class="equipment_info">
            <view class="title_box">
              <view class="title">
                <text class="u-line-1">{{
                  list[currentIndex] && list[currentIndex].equipmentName
                    ? list[currentIndex].equipmentName
                    : "?"
                }}</text>
              </view>
            </view>
            <view class="line"></view>
            <view class="form_name">
              <text>装备形态</text>
            </view>
          </view>
          <!-- 装备放大图 -->
          <view class="equip_image">
            <image
              class="image"
              v-if="list[currentIndex] && list[currentIndex].equipmentCover"
              :class="!list[currentIndex].hadLight ? 'not_lighten' : ''"
              :src="list[currentIndex].equipmentCover"
              mode="aspectFill"
            ></image>
            <image
              class="image"
              v-else
              :src="require(`@/static/images/element/${cPath}/ic_max.png`)"
              mode="aspectFill"
            ></image>
          </view>
          <!-- 说明 -->
          <view
            class="enabling"
            v-if="this.list[getCurrentIndex] && this.list[getCurrentIndex].id"
          >
            <view class="enabling_header">
              <view
                class="button"
                :class="[explainActive == 0 ? 'active' : '']"
                @tap.stop="changeExplain(0)"
              >
                <text>赋能说明</text>
              </view>
              <view
                class="button"
                :class="[explainActive == 1 ? 'active' : '']"
                @tap.stop="changeExplain(1)"
              >
                <text>属性说明</text>
              </view>
            </view>
            <view class="enabling_content">
              <block v-if="explainActive == 0">
                <u-parse
                  v-if="this.list[currentIndex].enablingDescription"
                  :tagStyle="{ p: 'color:#333333', span: 'color:#333333' }"
                  :content="this.list[currentIndex].enablingDescription"
                ></u-parse>
                <view v-else class="enabling_attr">
                  <text>持续赋能中...</text>
                </view>
              </block>
              <block v-else>
                <view class="enabling_attr">
                  <text>未知</text>
                </view>
              </block>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部按钮 -->
      <view class="footer">
        <u-button
          :hairline="false"
          throttleTime="500"
          :customStyle="btnStyle"
          @click="handlerLighten"
        >
          <text>点亮</text>
        </u-button>
      </view>
    </com-page>
  </view>
</template>

<script>
import {
  lightProductList,
  lightProductEquipments,
  lightProductHadLight,
} from "@/api/nft/collection";
import store from "@/store";
const ATTR_TYPE_LIST = [
  {
    id: "1",
    typeName: "木",
    title: "精灵森林(木属性)",
    filePath: "wood",
  },
  {
    id: "2",
    typeName: "土",
    title: "万石圣山(土属性)",
    filePath: "soil",
  },
  {
    id: "3",
    typeName: "水",
    title: "幻青之海(水属性)",
    filePath: "water",
  },
  {
    id: "4",
    typeName: "火",
    title: "灭焰荒漠(火属性)",
    filePath: "fire",
  },
  {
    id: "5",
    typeName: "金",
    title: "天神之城(金属性)",
    filePath: "gold",
  },
];
export default {
  data() {
    return {
      // 当前激活说明 0 赋能说明 1 属性说明
      explainActive: 0,
      // 当前选中属性下标
      currentAttrIndex: 0,
      // 属性列表
      attrtTypeList: [...ATTR_TYPE_LIST],
      // 当前选中banner
      currentIndex: 0,
      // 藏品列表
      list: [],
    };
  },
  computed: {
    cPath() {
      return this.attrtTypeList[this.currentAttrIndex].filePath;
    },
    getCurrentIndex() {
      return this.currentIndex;
    },
    btnStyle() {
      let style = {
        width: "630upx",
        height: "88upx",
        lineHeight: "88upx",
        background: "#D8ED48",
        borderRadius: "44upx",
        border: "none",
        fontSize: "32upx",
        fontFamily: "PingFang SC",
        fontWeight: "bold",
        color: "#000000",
        opacity: 0.5,
      };
      if (
        this.list[this.getCurrentIndex] &&
        this.list[this.getCurrentIndex].id &&
        this.list[this.getCurrentIndex].openLight == 1
      ) {
        style.opacity = 1;
      }
      return style;
    },
  },
  methods: {
    initval() {
      this.getList();
    },
    // 且换说明
    changeExplain(index = 0) {
      this.explainActive = index;
    },
    // 切换属性
    changeAttr(index = 0) {
      this.currentAttrIndex = index;
      this.currentIndex = 0;
      this.initval();
    },
    // 且换装备
    changeEquip(index = 0) {
      this.currentIndex = index;
      this.updateHadLight(this.currentIndex);
    },
    // banner切换回调
    bannerChange(event) {
      this.currentIndex = event.target.current;
    },
    // 点亮
    handlerLighten() {
      if (
        (this.list[this.getCurrentIndex] &&
          !this.list[this.getCurrentIndex].id) ||
        this.list[this.getCurrentIndex].openLight == 0
      )
        return;
      const id = this.list[this.getCurrentIndex].id;
      uni.navigateTo({
        url: `/pages/nft/mix/index?id=${id}`,
      });
    },
    /**
     * 设置默认属性
     * @params { data:Array } 源数据
     * @params { template:Object } 默认数据模板
     * @params { len:Number } 总数居长度
     */
    setDefaultTemp(data = [], template = {}, len = 12) {
      let newList = [...data];
      for (let i = 0; i < len - data.length; i++) {
        newList.push(template);
      }
      return newList;
    },
    // 更新点亮状态
    updateHadLight(index = 0) {
      if (this.list[index] && !this.list[index].id) return;
      lightProductHadLight(this.list[index].id).then(({ data }) => {
        this.$set(this.list[index], "hadLight", data);
      });
    },
    // 获取藏品列表
    async getList() {
      const params = {
        attributeId: Number(this.attrtTypeList[this.currentAttrIndex].id),
      };
      const { data = [] } = await lightProductList(params);
      this.list = this.setDefaultTemp(data);
      console.log("this.list", this.list);
    },
    // 前往点亮记录列表
    goToList() {
      uni.navigateTo({
        url: "/pages/nft/orderList/lightUp",
      });
    },
  },
  onShow() {
    this.initval();
  },
  onLoad({ query, token }) {
    this.backWay = query ? "shop" : "nft";
    store.dispatch("sysType", query ? "shop" : "nft");
    token ? store.dispatch("setUserInfo", token) : "";
  },
};
</script>

<style lang="scss" scoped>
.pages {
  padding-top: 30upx;
  min-height: 100%;
  background-color: #ffffff;
}

.not_lighten {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}

.lighten {
  min-height: calc(100vh - 88upx);
  background: #ffffff;

  // border: 1upx solid red;
  .banner {
    position: relative;
    z-index: 1;
    height: 620upx;
    width: 100%;

    .swiper {
      height: 620upx;
      width: 100%;

      .swiper-item {
        height: inherit;
        width: 80%;

        .banner_info {
          display: flex;
          align-items: center;
          justify-content: center;
          height: inherit;
          width: inherit;
        }

        .banner_img_box {
          width: 658upx;
          height: 460upx;
          border-radius: 40upx;
          transition: all 0.2s ease-in;
          overflow: hidden;
          position: relative;

          .banner_img {
            width: inherit;
            height: inherit;
          }

          .border_img {
            pointer-events: none;
            position: absolute;
            z-index: 20;
            top: 20upx;
            left: 20upx;
            width: 580upx;
            height: 580upx;
          }

          .title {
            padding: 10upx 12upx;
            position: absolute;
            top: 20upx;
            left: 50%;
            transform: translateX(-50%);
            width: 220upx;
            min-height: 46upx;
            background: rgba(245, 245, 245, 0.5);
            border-radius: 10upx;
            text-align: center;
            line-height: 1.3;

            text {
              font-size: 26upx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #000000;
            }
          }
        }

        .current_banner_img {
          height: 620upx;
          width: 620upx;

          image {
            width: inherit;
            height: inherit;
          }
        }
      }
    }

    .attribute {
      overflow: hidden;
      position: absolute;
      z-index: 10;
      top: 230upx;
      left: 25upx;
      width: 80upx;
      height: 360upx;
      background: #ffffff;
      box-shadow: 0upx 4upx 10upx 0upx rgba(204, 204, 204, 0.2);
      border-radius: 40upx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10upx;

      .attribute_item {
        transition: all 0.2s ease-in;
        text-align: center;
        line-height: 60upx;
        width: 60upx;
        height: 60upx;
        border-radius: 30upx;
        margin-bottom: 10upx;
      }

      .attribute_active {
        background: #d8ed48;
      }
    }
  }
}

.lighten_detail {
  padding-bottom: 27upx;
  height: 275upx;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  .current_img {
    position: relative;
    width: 140upx;
    height: 140upx;
    margin-bottom: 19upx;

    image {
      width: 140upx;
      height: 140upx;
    }

    .num {
      position: absolute;
      right: -7upx;
      top: -7upx;
      z-index: 20;
      width: 40upx;
      height: 26upx;
      background: #666666;
      border-radius: 13upx;
      text-align: center;
      line-height: 1;
      font-size: 22upx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .tips {
    text-align: center;
    width: 411upx;
    height: 22upx;
    line-height: 22upx;
    font-size: 22upx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
  }
}

.lighten_content {
  padding: 0 21upx 0 40upx;
  margin-bottom: 38upx;

  .content_list {
    display: flex;
    flex-wrap: wrap;

    .content_item {
      padding: 2upx;
      width: 96upx;
      height: 96upx;
      background: linear-gradient(0deg, #cccccc 0%, #f6ffd1 100%);
      box-shadow: 0upx 2upx 0upx 0upx #cccccc;
      border-radius: 10upx;
      margin-right: 19upx;
      margin-bottom: 21upx;
      overflow: hidden;

      .default_img {
        width: inherit;
        height: inherit;
      }
    }

    // 激活样式
    .content_item_active {
      background: linear-gradient(0deg, #8eca56 0%, #f6ffd1 100%);
      box-shadow: 0upx 2upx 0upx 0upx #c9c59b;
      padding: 4upx;

      .default_img {
        width: 90upx;
        height: 90upx;
      }
    }
  }
}

.detail {
  padding-bottom: 172upx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .equipment_info {
    margin-bottom: 30upx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form_name {
      text-align: center;
      height: 21upx;
      font-size: 22upx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #76b351;
    }
    .line {
      width: 273upx;
      height: 2upx;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(118, 179, 81, 0.99) 47%,
        rgba(255, 255, 255, 0) 100%
      );
      border-radius: 1upx;
      margin-bottom: 11upx;
    }
    .title_box {
      max-width: 400upx;
      position: relative;
      margin-bottom: 8upx;
      .title {
        max-width: inherit;
        text-align: center;
        line-height: 1;
        font-size: 26upx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        position: relative;
        padding: 0 25rpx;

        &::before {
          display: block;
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          background: url("../../../static/images/mix/ic_right.png") no-repeat
            center;
          background-size: 100% 100%;
          transform: translateY(-50%);
          width: 14upx;
          height: 16upx;
        }

        &::after {
          display: block;
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          background: url("../../../static/images/mix/ic_right.png") no-repeat
            center;
          background-size: 100% 100%;
          width: 14upx;
          height: 16upx;
        }
      }

      .border_img {
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        width: 320upx;
        height: 44upx;
      }
    }
  }

  .equip_image {
    transition: all 0.2s ease-in;
  }

  .image {
    width: 620upx;
    height: 620upx;
    // background: #000000;
    border-radius: 40upx;
    margin-bottom: 50upx;
  }

  .enabling {
    height: auto;
    width: 100%;
    padding: 20upx 40upx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .enabling_header {
      margin-bottom: 38upx;
      // width: 398upx;
      height: 88upx;
      background: #efefef;
      border-radius: 20upx;
      display: flex;

      .button {
        margin: 6upx;
        width: 180upx;
        height: 76upx;
        line-height: 76upx;
        text-align: center;
      }

      .active {
        transition: all ease-in 0.1s;
        background: #ffffff;
        border-radius: 20upx;
      }
    }

    .enabling_content {
      transition: all ease-in 0.2s;
      width: 100%;
      text-align: left;
      height: auto;
      line-height: 2;
      font-size: 24upx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;

      .enabling_attr {
        text-align: center;
      }
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 172upx;
  width: 100%;
  padding-top: 40upx;
  border-radius: 40upx 40upx 0 0;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}
</style>
