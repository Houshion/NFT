<template>
  <view class="pages">
    <view class="navbar">
      <view :style="{ height: statusHeight + 'px' }"></view>
      <view class="nav_header">
        <view class="nav_left">
          <u-icon name="arrow-left" color="#000000" @click="goBack"></u-icon>
        </view>
        <view class="nav_center">
          <view class="nav_title u-line-1">
            <text>{{ title }}</text>
          </view>
        </view>
        <view class="nav_right"></view>
      </view>
      <view :style="{ height: navHeight + 'px' }"></view>
    </view>
    <view class="body">
      <scroll-view
        scroll-y
        class="scroll_list"
        :style="{ height: `calc(100vh - ${navHeight}px)` }"
        @scrolltolower="tolower"
      >
        <view class="list">
          <block v-for="(item, index) in list" :key="index">
            <goods-card
              :is-click="list.length <= 2 || !btnUnfold"
              :is-checked="type == 4 && btnUnfold"
              :goods="item"
              @click="goDetail"
              @changeChecked="changeChecked"
            ></goods-card>
          </block>
        </view>
      </scroll-view>
    </view>
    <view
      class="footer"
      :class="[
        btnUnfold && changeList.length < 1 ? 'disabled' : '',
        { footer_button_unfold: btnUnfold },
      ]"
      v-if="type == 4 && list.length > 1"
    >
      <view class="box" v-if="!btnUnfold" @tap.stop="unfold">
        <text>开盒子</text>
      </view>
      <view class="u-line-1" @tap.stop="openBox" v-else>
        <text>开启{{ changeList.length }}个盲盒</text>
      </view>
    </view>
    <com-modal content="确定要打开盲盒吗？" ref="ComModal"></com-modal>
  </view>
</template>

<script>
import { getMyProductList } from "@/api/nft/collection";
import GoodsCard from "./components/goods-card/index.vue";
export default {
  components: {
    GoodsCard,
  },
  data() {
    return {
      type: null, // 藏品类型
      timer: null,
      isOnLoad: true,
      navHeight: 0,
      title: "",
      statusHeight: uni.getSystemInfoSync().statusBarHeight,
      list: [],
      btnUnfold: false,
      form: {
        pageNum: 1,
        pageSize: 10,
      },
      isNext: true, // 是否有下一页
    };
  },
  computed: {
    changeList() {
      return this.list.filter((val) => val.checked);
    },
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query
      .select(".nav_header")
      .boundingClientRect((data) => {
        console.log("data", data);
        this.navHeight = data.height;
      })
      .exec();
  },
  onLoad(e) {
    this.form.productId = e.id || null;
    this.type = e.type || null;
    this.fetchList();
    this.timer = setTimeout(() => {
      this.isOnLoad = false;
    }, 500);
  },
  onShow() {
    if (this.isOnLoad) return;
    if (!this.isOnLoad && this.timer) clearTimeout(this.timer);
    this.fetchList();
  },
  methods: {
    unfold() {
      this.btnUnfold = true;
    },
    changeChecked(item) {
      this.$set(item, "checked", !item.checked);
    },
    // 加载更多
    tolower() {
      if (!this.isNext) return;
      this.form.pageNum++;
      this.fetchList();
    },
    // 获取盲盒内容列表
    async fetchList() {
      try {
        const { data = [] } = await getMyProductList(this.form);
        if (this.form.pageNum == 1) {
          this.list = [];
          this.title = data[0] && data[0].productName;
        }
        if (data.length == 0) {
          this.isNext = false;
        }
        let _list = [...data];
        _list = _list.map((item) => {
          this.$set(item, "checked", false);
          return item;
        });
        this.list = this.list.concat([..._list]);
      } catch (e) {}
    },
    // 前往详情
    goDetail(item) {
      uni.navigateTo({
        url: `/pages/nft/collection/commodity?id=${item.id}&type=2`,
      });
    },
    // 批量开启盲盒
    openBox() {
      if (this.changeList.length < 1) return;
      this.$nextTick(() => {
        const comModel = this.$refs.ComModal && this.$refs.ComModal;
        comModel.open();
        comModel.confirm = () => {
          comModel.close();
          console.log("this.changeList", this.changeList);
          const data = this.changeList.map((val) => val.id);
          uni.navigateTo({
            url:
              "/pages/nft/collection/openBox?data=" +
              encodeURIComponent(JSON.stringify(data)),
          });
        };
      });
    },
    goBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
}

.nav_header {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100upx;
  width: 100%;

  .nav_left,
  .nav_right {
    width: 200upx;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .nav_left {
    padding-left: 30upx;
  }

  .nav_center {
    flex: 1;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav_title {
      text-align: center;
      font-size: 38rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }
  }
}

.body {
  height: 100%;
  background: #ffffff;

  .list {
    background: #ffffff;
    padding: 45rpx 30rpx 45rpx;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-gap: 45rpx 32rpx;
  }
}
.disabled {
  background: #131b32;
  opacity: 0.8;
}
.footer {
  position: fixed;
  right: 30upx;
  bottom: 108upx;
  width: 110upx;
  height: 110upx;
  background: #131b32;
  box-shadow: 0rpx 3upx 7upx 0upx rgba(0, 0, 0, 0.14);
  border-radius: 50%;
  text-align: center;
  line-height: 110upx;
  font-size: 22upx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #fefefe;
  transition: all 0.3s;
}

.footer_button_unfold {
  animation: unfold ease-out 0.2s forwards;
  -moz-animation-play-state: running;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

@keyframes unfold {
  0% {
    right: 30upx;
    bottom: 108upx;
    width: 110upx;
    height: 110upx;
    background: #131b32;
    box-shadow: 0rpx 3upx 7upx 0upx rgba(0, 0, 0, 0.14);
    border-radius: 50%;
    text-align: center;
    line-height: 110upx;
    font-size: 22upx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fefefe;
  }

  100% {
    right: 75upx;
    bottom: 56upx;
    width: 600upx;
    height: 88upx;
    background: #131b32;
    border-radius: 44upx;
    line-height: 88upx;
    font-size: 30upx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
