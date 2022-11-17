<template>
  <view class="pages">
    <view class="body">
      <!-- 动画场景 -->
      <view class="animate_scene" @tap.stop="closeAni" v-show="!showResult">
        <view class="animate_scene_sd" v-if="!showResult"></view>
        <!-- 开盒 -->
        <view class="box" v-show="showBox && !showResult">
          <view class="box_image" :class="[animateActive]"></view>
        </view>
        <!-- 退场曝光过渡 -->
        <view class="p_a light" v-show="showLight && !showResult"></view>
      </view>
      <!-- 开盒结果 -->
      <box-result
        @back="goBack"
        :list="resultList"
        v-show="showResult"
        @click="toDetail"
      ></box-result>
    </view>
  </view>
</template>

<script>
import BoxResult from "./components/box-result/index.vue";
import { openBox } from "@/api/nft/collection.js";
export default {
  components: {
    BoxResult,
  },
  data() {
    return {
      isOnLoad: true,
      timer: null,
      animateQueue: [], // 动画队列
      animateActive: "", // 当前激活动画
      resultList: [], // 开盒结果
      showBox: false, // 盒子进场
      showResult: false, // 动画结束
      showLight: false, // 动画结束过渡
      form: {
        memberProductIds: [],
      },
    };
  },
  onLoad(options) {
    uni.setNavigationBarTitle({
      title: "国庆盲盒",
    });
    if (options.data) {
      const data = JSON.parse(decodeURIComponent(options.data));
      this.form.memberProductIds = [...data];
      console.log("data", this.form);
      this.OpenBoxByList();
    }
  },
  onShow() {
    this.initAnimate();
    this.showBox = true;
    this.start();
  },
  methods: {
    // 初始化动画队列
    initAnimate() {
      this.animateQueue = [
        {
          className: "into", // 盒子入场
          duration: 3500,
        },
      ];
    },
    // 动画开始
    start() {
      let timer = null;
      if (this.animateQueue.length > 0) {
        const animate = this.animateQueue.shift();
        this.animateActive = animate.className;
        timer = setTimeout(() => {
          if (timer) clearTimeout(timer);
          this.start();
        }, animate.duration);
      } else {
        this.handlerAniEnd();
      }
    },
    // 结束动画
    closeAni() {
      this.showResult = true;
    },
    // 动画结束
    handlerAniEnd() {
      this.showLight = true;
      setTimeout(() => {
        this.closeAni();
      }, 1000);
    },
    // 查看详情
    toDetail(item = {}) {
      // 批量开启跳转到藏品列表
      if (this.resultList.length > 1) {
        uni.switchTab({
          url: "/pages/nft/collection/list",
        });
      } else {
        // 单个跳转详情
        uni.redirectTo({
          url:
            "/pages/nft/collection/commodity?type=2&id=" +
            JSON.stringify(item.id),
        });
      }
    },
    // 获取当前盲盒内容
    async OpenBoxByList() {
      try {
        const { data = [] } = await openBox(JSON.stringify(this.form));
        this.resultList = [...data];
      } catch (e) {
        throw new Error(e);
      }
    },
    // 查看藏品详情
    goBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.absolute {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  pointer-events: none;
  transform: translateY(-50%);
}
.flxe_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pages {
  min-height: 100vh;
  width: 100%;

  .runing {
    -moz-animation-play-state: running;
    -webkit-animation-play-state: running;
    animation-play-state: running;
  }

  .paused {
    -moz-animation-play-state: paused;
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
  }

  .body {
    width: 100%;
    min-height: 100vh;
    background: url("https://snt-art.obs.cn-south-1.myhuaweicloud.com/20221027/f6ed4b7131ca4739bdafb1699a8d647b.jpg")
      no-repeat center;
    background-attachment: fixed;
    background-size: 100% 100%;
    .animate_scene {
      @extend .absolute;
      @extend .flxe_center;
      z-index: 0;

      .box {
        width: 500upx;
        height: 500upx;
        background: rgba(0, 0, 0, 0);
        .box_image {
          width: 500upx;
          height: 500upx;
          background: url("https://snt-art.obs.cn-south-1.myhuaweicloud.com/assets/mhh.gif")
            no-repeat center;
          background-size: 100% 100%;
        }
        .into {
          // pointer-events: none;
          width: 500upx;
          height: 500upx;
          // animation: animet_into ease-in 4s forwards;
        }
        .scale {
          pointer-events: none;
          animation: animet_scale linear 1s forwards;
        }
      }
      .light {
        @extend .absolute;
        height: 100vh;
        z-index: 1;
        pointer-events: none;
        z-index: 10;
        background: transparent;
        background-size: 0 0;
        animation: ani_light cubic-bezier(0, 0.21, 0.835, 0.35) 1s forwards;
      }
    }
    @keyframes animet_scale {
      0% {
        transform: scale(1, 1);
      }
      100% {
        transform: scale(1.2, 1.2);
      }
    }
    // @keyframes animet_into {
    //   0% {
    //     width: 0 !important;
    //     height: 0 !important;
    //     transform: scale(0, 0) translateY(-500upx);
    //   }
    //   100% {
    //     width: 500upx;
    //     height: 500upx;
    //     background: url("../../../static/images/Sprite-0002.png") no-repeat
    //       center;
    //     background-size: 100% 100%;
    //     transform: scale(1, 1) translateY(0);
    //   }
    // }
    @keyframes ani_light {
      0% {
        background: transparent;
        background-size: 0 0;
      }
      100% {
        background: #ffffff;
        background-size: 500% 500%;
      }
    }
  }
}
</style>
