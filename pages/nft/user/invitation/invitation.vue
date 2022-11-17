<template>
  <view>
    <com-page title="我的邀请码" @rightClick="capture">
      <view slot="right" v-if="!isWeixin()">
        <u-icon
          :name="require('@/static/images/ic_download.png')"
          size="24"
        ></u-icon>
      </view>
      <view class="qrcode">
        <canvas
          padding="10"
          id="qrcode"
          ref="qrcode"
          canvas-id="qrcode"
          :style="{ width: `${size}px`, height: `${size}px` }"
        ></canvas>
      </view>
      <view class="images po_re pd_15">
        <image class="base_image" :src="baseImg.path"></image>
      </view>
      <view class="canvas_images">
        <canvas
          :style="{
            width: `${baseImg.width}rpx`,
            height: `${baseImg.height}rpx`,
          }"
          id="baseImg"
          canvas-id="baseImg"
        ></canvas>
      </view>
    </com-page>
  </view>
</template>

<script>
import uQRCode from "u-qrcode/module";
import { myCode } from "@/api/nft/user";
import config from "@/common/config";
export default {
  data() {
    return {
      baseUrl: config.baseUrl + "pages/nft/public/login?invitedCode=",
      code: "",
      img: require("@/static/images/invitation/invitation.png"),
      size: 60,
      baseImg: {
        width: 690,
        height: 1288,
        path: "",
      },
      rocodeTimer: null,
      baseTimer: null,
    };
  },
  async onReady() {
    const { data } = await myCode();
    const ctx = uni.createCanvasContext("qrcode");
    const uqrcode = new uQRCode(
      {
        text: this.baseUrl + data,
        size: this.size,
      },
      ctx
    );
    uqrcode.make();
    uqrcode.draw();
    this.createImg();
    // this.capture()
  },
  beforeDestroy() {
    if (this.rocodeTimer) clearTimeout(this.rocodeTimer);
    this.rocodeTimer = null;
    if (this.baseTimer) clearTimeout(this.baseTimer);
    this.baseTimer = null;
  },
  methods: {
    isWeixin() {
      // #ifdef H5
      const ua = navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i) == "micromessenger";
      // #endif
      return false;
    },
    capture() {
      const wpx = uni.upx2px(this.baseImg.width);
      const hpx = uni.upx2px(this.baseImg.height);
      uni.canvasToTempFilePath(
        {
          canvasId: "baseImg",
          width: wpx,
          height: hpx,
          success: (res) => {
            console.log("res", res);
            // #ifndef H5
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                uni.showToast({
                  title: "保存成功",
                  icon: "none",
                });
              },
            });
            // #endif
            // #ifdef H5
            // if (ua.match(/MicroMessenger/i) == 'micromessenger') {}
            let a = document.createElement("a"); // 生成一个a元素
            let event = new MouseEvent("click"); // 创建一个单击事件
            a.download = "SNT.png"; // 设置图片名称
            a.href = res.tempFilePath; // 将生成的URL设置为a.href属性
            a.dispatchEvent(event); // 触发a的单击事件
            // #endif
          },
        },
        this
      );
    },
    createImg() {
      const ctx = uni.createCanvasContext("baseImg");
      const wpx = uni.upx2px(this.baseImg.width);
      const hpx = uni.upx2px(this.baseImg.height);
      ctx.drawImage(this.img, 0, 0, wpx, hpx);
      ctx.setFillStyle("#ffffff");
      ctx.fillRect(wpx - 102, hpx - 136, 70, 70);
      ctx.fill();
      this.rocodeTimer = setTimeout(() => {
        uni.canvasToTempFilePath(
          {
            canvasId: "qrcode",
            width: wpx,
            height: hpx,
            success: (res) => {
              ctx.drawImage(
                res.tempFilePath,
                wpx - 97,
                hpx - 130,
                60,
                60,
                0,
                0
              );
              ctx.draw();
            },
          },
          this
        );
      }, 300);
      this.baseTimer = setTimeout(() => {
        uni.canvasToTempFilePath(
          {
            canvasId: "baseImg",
            width: wpx,
            height: hpx,
            success: (res) => {
              this.baseImg.path = res.tempFilePath;
              this.$set(this.baseImg, "path", res.tempFilePath);
            },
          },
          this
        );
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.images {
  min-height: calc(100vh - 88upx);
}
.qrcode {
  height: 0;
  overflow: hidden;
}
.canvas_images {
  height: 0;
  overflow: hidden;
}

.text {
  position: absolute;
  right: 100upx;
  bottom: 160upx;
  color: $white_color;
  background: $white_color;
  padding: 15upx;
  border-radius: 14upx;
}
.base_image {
  width: 690rpx;
  height: 1228rpx;
}
</style>
