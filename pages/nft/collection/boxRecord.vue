<template>
  <view class="pages">
    <com-page title="盲盒开启记录" :border="false">
      <view class="body">
        <scroll-view
          scroll-y
          class="scroll_list"
          lower-threshold="0"
          @scrolltolower="tolower"
        >
          <view class="list">
            <block v-if="list.length > 0">
              <view
                class="list_item flex_start"
                v-for="(item, index) in list"
                :key="index"
              >
                <image
                  class="box_image"
                  :src="item.prizeCover"
                  mode="aspectFill"
                ></image>
                <view class="list_item_content">
                  <view class="box_name u-line-1">
                    <text>开启《{{ item.blindBoxName }}》获得</text>
                  </view>
                  <view class="series">
                    <image class="lave" :src="item.rarityIcon"></image>
                    <view class="series_name u-line-1">
                      <text>{{ item.prizeName }}</text>
                    </view>
                  </view>
                  <view class="open_time u-line-1">
                    <text>{{
                      $u.timeFormat(item.createTime, "yyyy-mm-dd hh:MM:ss")
                    }}</text>
                  </view>
                </view>
              </view>
              <view class="list_tips">
                <u-loadmore
                  :status="status"
                  icon-type="circle"
                  :loadmoreText="loadText.loadmore"
                  :loadingText="loadText.loading"
                  :nomoreText="loadText.nomore"
                />
              </view>
            </block>
            <block v-else>
              <u-empty
                width="185px"
                text="暂无记录"
                :icon="require(`@/static/images/none/ic_wdd.png`)"
              >
              </u-empty>
            </block>
          </view>
        </scroll-view>
      </view>
    </com-page>
  </view>
</template>

<script>
import { openBoxRecord } from "@/api/nft/collection.js";
export default {
  components: {},
  data() {
    return {
      status: "loadmore",
      loadText: {
        loadmore: "上拉加载更多",
        loading: "努力加载中",
        nomore: "实在没有了",
      },
      statusHeight: uni.getSystemInfoSync().statusBarHeight,
      navHeight: 0,
      list: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      isNext: true,
    };
  },
  onLoad(options) {},
  onShow() {
    this.initval();
  },
  methods: {
    initval() {
      this.fetchList();
    },
    // 返回
    goBack() {
      uni.navigateBack();
    },
    // 加载更多
    tolower() {
      if (!this.isNext) return;
      this.status = "loading";
      this.page.pageNum++;
      this.fetchList();
    },
    async fetchList() {
      try {
        const { data = [] } = await openBoxRecord(this.page);
        console.log("data", data);
        if (this.page.pageNum == 1) {
          this.list = [];
        }
        console.log("this.status", this.status);
        if (data.length == 0) {
          this.isNext = false;
          this.status = "nomore";
        } else {
          this.status = "loadmore";
        }
        const _list = this.list.concat([...data]);
        this.list = [..._list];
      } catch (e) {
        this.status = "nomore";
        throw new Error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pages {
  width: 100%;
  min-height: 100vh;
  background: #f7f7f7;

  .body {
    .scroll_list {
      height: calc(100vh - 88upx);
    }
    .list {
      width: 100%;
      height: auto;
      padding: 30upx 30upx 70upx;
      position: relative;

      .list_tips {
        position: absolute;
        bottom: 20upx;
        left: 0;
        width: 100%;
        height: 60upx;
        // border: 1upx solid red;
      }

      .list_item {
        width: 690upx;
        height: 201upx;
        background: #ffffff;
        border-bottom: 1upx solid #f0f0f0;
        display: flex;
        align-items: center;
        &:last-child {
          margin-bottom: 0;
        }

        .box_image {
          width: 140upx;
          height: 140upx;
          background: #7ecef4;
          border-radius: 10upx;
          margin-right: 19upx;
        }

        .list_item_content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding-top: 1upx;
          height: 140upx;
          .box_name {
            margin-bottom: 10upx;
            font-size: 24upx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #a2a9b3;
          }
          .series {
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 26upx;
            .lave {
              width: 41upx;
              height: 25upx;
              margin-right: 11upx;
              vertical-align: middle;
            }
            .series_name {
              font-size: 28upx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #333333;
            }
          }

          .open_time {
            font-size: 24upx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #a2a9b3;
          }
        }
      }
    }
  }
}
</style>
