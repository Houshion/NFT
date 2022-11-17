<template>
  <view class="invitation">
    <com-home>
      <u-icon name="arrow-left" class="backBtn" @click="goback"></u-icon>
      <view class="time" v-if="rankMsg.activityStartTime">
        活动时间：{{ rankMsg.activityStartTime | timeStr("Y.m.d") }}
        -
        {{ rankMsg.activityEndTime | timeStr("m.d") }}
      </view>
      <view class="time" v-else> 当前暂无活动 </view>
      <u-sticky>
        <view class="invitationBox">
          <view class="myMsg flex_center">
            <view class="flex_around flex_v_center wd_100 font_11 tac">
              <view>
                <view class="value">
                  <template
                    v-if="
                      rankMsg.myRanking > 0 &&
                      rankMsg.myRanking <= rankMsg.ranking
                    "
                  >
                    <text class="font_30">{{ rankMsg.myRanking }}</text>
                    名
                  </template>
                  <template v-else>
                    <text class="font_30">未上榜</text>
                  </template>
                </view>
                <view class="label">我的排名</view>
              </view>
              <view class="line"></view>
              <view>
                <view class="value">
                  <text class="font_30">{{ rankMsg.invitationCount }}</text>
                  人
                </view>
                <view class="label">我的邀请</view>
              </view>
            </view>
            <view class="minor_btn mg_t_20 font_b" @click="share">
              　邀请好友　
            </view>
          </view>
          <view class="invitationList mg_t_15">
            <view class="tabs flex">
              <view
                :class="['flex1 tab', item.active ? 'active' : '']"
                v-for="(item, index) in tabsList"
                :key="index"
                @click="changeTab(item)"
              >
                {{ item.label }}
              </view>
            </view>
            <template v-if="activeTab == 0">
              <view class="lists mg_t_10">
                <view class="th flex tac">
                  <view class="flex1">排名</view>
                  <view class="flex2">手机号</view>
                  <view class="flex1">邀请人数</view>
                </view>
                <view class="list">
                  <scroll-view
                    scroll-y
                    class="scroll_list"
                    lower-threshold="0"
                    @scrolltolower="tolower"
                  >
                    <view
                      class="tr flex tac"
                      v-for="(item, index) in rankLists"
                      :key="index"
                    >
                      <view class="flex1 tac flex_center">
                        <u-icon
                          size="30"
                          :name="
                            require(`@/static/images/ic_pw${index + 1}.png`)
                          "
                          v-if="index < 3"
                          class="mg_auto"
                        ></u-icon>
                        <text v-else>{{ index + 1 }}</text>
                      </view>
                      <view class="flex2 tac">{{ item.mobile }}</view>
                      <view class="flex1 tac">{{ item.authCount }}</view>
                    </view>
                  </scroll-view>
                </view>
              </view>
            </template>
            <template v-else>
              <view class="myTabs">
                <u-tabs
                  class="wd_80"
                  :list="myTabs"
                  @click="changeMyTab"
                  :scrollable="false"
                  lineColor="linear-gradient(0deg, #FFFFFF 0%, #D8ED48 100%)"
                  :activeStyle="{
                    'font-size': '28upx',
                    'font-weight': 'bold',
                    color: '#000000',
                  }"
                  :inactiveStyle="{ 'font-size': '28upx', color: '#B3B3B3' }"
                ></u-tabs>
              </view>
              <view class="lists my">
                <view class="list">
                  <scroll-view
                    scroll-y
                    class="scroll_list"
                    lower-threshold="0"
                    @scrolltolower="tolower"
                  >
                    <view
                      class="tr flex tac"
                      v-for="(item, index) in invitedList"
                      :key="index"
                    >
                      <view class="flex1 tal">{{ item.mobile }}</view>
                      <view class="flex1 tar">
                        {{ item.createTime | timeStr }}
                      </view>
                    </view>
                  </scroll-view>
                </view>
              </view>
            </template>
            <view class="rule font_12" v-if="false">
              <view class="title mg_b_10">活动规则：</view>
              <view>1.事先获得您的授权；</view>
              <view>
                2.只有提供您的个人资料，才能提供您所要求的产品和服务；
              </view>
              <view>3.根据有关的法律法规要求；</view>
              <view>4.按照相关政府主管部门的要求；</view>
              <view>5.为维护本软件的合法权益；</view>
            </view>
          </view>
        </view>
      </u-sticky>
    </com-home>
  </view>
</template>

<script>
import { myCode } from "@/api/nft/user";
import {
  invitationList,
  rankingList,
  myInvitationCount,
} from "@/api/nft/invitation";
import config from "@/common/config";
export default {
  data() {
    return {
      status: "loadmore",
      loadText: {
        loadmore: "上拉加载更多",
        loading: "努力加载中",
        nomore: "实在没有了",
      },
      tabsList: [
        { label: "排行榜", type: 0, active: true },
        { label: "我的邀请", type: 1, active: false },
      ],
      activeTab: 0,
      myTabs: [{ name: `已注册(${0})` }, { name: `已实名(${0})` }],
      myActiveTab: 0,
      baseUrl: config.baseUrl + "pages/nft/public/login?invitedCode=",
      code: "",
      img: require("@/static/images/invitation/invitation.png"),
      form: {
        pageNum: 1,
        pageSize: 50,
      },
      rankLists: [],
      invitedList: [],
      rankMsg: {},
      isNext: true,
    };
  },
  computed: {
    invitedUrl() {
      return this.baseUrl + this.code;
    },
  },
  methods: {
    // 复制粘贴
    copyCode() {
      this.base.copy(this.invitedUrl);
    },
    // 前往分享
    share() {
      uni.navigateTo({
        url: "/pages/nft/user/invitation/invitation",
      });
    },
    init() {
      if (this.activeTab == 0) {
        rankingList(this.form).then((res) => {
          // this.rankMsg = res.data;
          this.rankLists = [...this.rankLists, ...res.data];
        });
      } else {
        this.form.searchType = this.myActiveTab + 1;
        invitationList(this.form).then((res) => {
          this.invitedList = [...this.invitedList, ...res.data];
        });
      }
    },
    // 返回上一页
    goback() {
      uni.navigateBack();
    },
    // 切换tab
    changeTab(item) {
      this.tabsList.forEach((tab) => {
        tab.active = false;
      });
      item.active = true;
      this.activeTab = item.type;
      this.form.pageNum = 1;
      this.rankLists = [];
      this.init();
    },
    changeMyTab(e) {
      this.myActiveTab = e.index;
      this.form.pageNum = 1;
      this.invitedList = [];
      this.init();
    },
    // 我的邀请数量
    getMyinvitationCount() {
      myInvitationCount().then(({ data }) => {
        this.rankMsg = data;
        this.myTabs[0].name = `已注册(${data.registerCount})`;
        this.myTabs[1].name = `已实名(${data.authCount})`;
      });
    },
    // 触底刷新
    tolower() {
      if (!this.isNext) return;
      this.status = "loading";
      this.form.pageNum++;
      this.init();
    },
  },
  async onShow() {
    this.form.pageNum = 1;
    this.rankLists = [];
    this.invitedList = [];
    this.init();
    this.getMyinvitationCount();
    myCode().then((res) => {
      this.code = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
$invitationColor: #f78600;
/deep/.container {
  /* #ifdef APP-PLUS */
  padding-top: 88upx;
  /* #endif */
  min-height: 100%;
}
/deep/ .home {
  background-image: url("../../../../static/images/ic_bt.png");
  background-size: 100% 600upx;
  background-repeat: no-repeat;
}
.invitation {
  position: relative;
  .time {
    margin: 360upx 0 100upx 50upx;
    border-radius: 50upx 50upx 50upx 0;
    padding: 15upx 30upx;
    background: $white_color;
    font-weight: bold;
    color: $invitationColor;
    display: inline-block;
  }
  .invitationBox {
    max-height: 100vh;
    overflow: hidden;
    margin-top: -60upx;
    padding: 30upx;
    border-radius: 40upx 40upx 0 0;
    background: $white_color;
    .myMsg {
      background: rgba($color: $invitationColor, $alpha: 0.06);
      padding: 40upx;
      border-radius: 20upx;
      .line {
        width: 1upx;
        height: 50upx;
        background: rgba($color: $invitationColor, $alpha: 0.3);
      }
      .value {
        color: $invitationColor;
      }
    }
  }
  .invitationList {
    .tabs {
      background: #f9fce4;
      border: 1upx solid $minor_color;
      border-radius: 20upx;
      text-align: center;
      font-size: 30upx;
      .tab {
        padding: 25upx;
        &.active {
          background-size: 100% 100upx;
          background-repeat: no-repeat;
          font-weight: bold;
          font-style: italic;
        }
        &:nth-child(1).active {
          background-image: url("../../../../static/images/ic_yxk1.png");
        }
        &:nth-child(2).active {
          background-image: url("../../../../static/images/ic_yxk2.png");
        }
      }
    }
    .lists {
      .th {
        height: 80upx;
        line-height: 80upx;
        background: #f7f7f7;
        color: #b3b3b3;
        border-radius: 10px;
      }
      .list {
        max-height: 730upx;
        overflow: scroll;
        .tr {
          height: 90upx;
          line-height: 90upx;
        }
      }
      padding-bottom: 30upx;
      &.my {
        padding-top: 30upx;
        padding-bottom: 0;
        .list {
          max-height: 65vh;
          .scroll_list {
            height: 65vh;
          }
        }
      }
    }
  }
  .rule {
    background: #f7f7f7;
    border-radius: 10upx;
    padding: 20upx;
  }
}
</style>
