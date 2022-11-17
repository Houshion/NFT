<template>
  <view id="noticeList">
    <u-navbar
      placeholder
      title="公告中心"
      :titleStyle="{
        'font-size': '38upx',
        'font-weight': 'bold',
      }"
      :border="false"
      :autoBack="true"
    >
    </u-navbar>
    <u-sticky bgColor="#fff" customNavHeight="88upx">
      <u-tabs
        :list="tabList"
        :current="current"
        :lineColor="`linear-gradient(0deg, #D8ED48 0%, rgba(216,237,72,0) 100%)`"
        lineWidth="30"
        lineHeight="5"
        :activeStyle="{
          'font-weight': 'bold',
          color: '#303133',
        }"
        :inactiveStyle="{
          color: '#606266',
        }"
        itemStyle="padding-left: 30upx; padding-right: 30upx; height: 88upx;"
        @change="changeTab"
      ></u-tabs>
    </u-sticky>
    <view class="noticeList">
      <template v-if="list.length > 0">
        <u-list @scrolltolower="scrolltolower" :height="'calc(100vh - 176upx)'">
          <u-list-item v-for="(item, index) in list" :key="index">
            <view class="noticeBox border_b" @click="goDetail(item)">
              <view class="mg_t_5 over_el_2">
                <template v-if="false">
                  【{{ tabList[current].name }}】
                </template>
                {{ item.title }}
              </view>
              <view class="flex_between flex_v_center mg_t_10">
                <u-tag
                  :text="item.noticeTypeName"
                  type="warning"
                  size="mini"
                  plain
                  plainFill
                ></u-tag>
                <view class="time">{{ item.createTime | timeStr }}</view>
              </view>
            </view>
          </u-list-item>
        </u-list>
      </template>
      <template v-else>
        <u-empty
          class="pd_t_60"
          width="185px"
          text="暂无公告"
          :icon="require(`@/static/images/none/ic_wdd.png`)"
        >
        </u-empty>
      </template>
    </view>
    <u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
import * as data from "./data";
import { noticeList, noticeTypeList } from "@/api/nft/notice";
export default {
  data() {
    return {
      // 公告tab相关
      tabList: [{ params: {}, id: 0, name: "全部" }],
      current: 0,
      // 返回顶部距离
      scrollTop: 0,
      // 公告列表
      list: [],
      // 表单信息
      form: {
        noticeTypeId: 0, //公告类型id
        pageNum: 1, //页码
        pageSize: 10, //条数
      },
    };
  },
  onShow() {
    this.list = [];
    this.tabList = [{ params: {}, id: 0, name: "全部" }];
    this.getType();
  },
  methods: {
    // 获取公告类型
    getType() {
      noticeTypeList().then(({ data }) => {
        this.tabList = [...this.tabList, ...data];
        this.init();
      });
    },
    // 初始化参数
    init() {
      this.list = [];
      this.form.pageNum = 1;
      this.getList();
    },
    // 获取列表信息
    getList() {
      noticeList(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
      });
    },
    // tab切换动作
    changeTab(e) {
      this.current = e.index;
      this.form.noticeTypeId = this.tabList[e.index].id;
      this.init();
    },
    // 前往详情
    goDetail(item) {
      if (item.url) window.location.href = item.url;
      else
        uni.navigateTo({
          url: `/pages/nft/user/notice/detail?id=${item.id}&type=${this.current}`,
        });
    },
    // 触底刷新
    scrolltolower() {
      this.form.pageNum++;
      this.getList();
    },
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
};
</script>

<style lang="scss" scoped>
#noticeList {
  background: #f7f7f7;
}
.noticeList {
  background: $white_color;
  padding: 0 30upx;
  margin-top: 10upx;
  min-height: calc(100vh - 176upx);
  .noticeBox {
    background: $white_color;
    border-radius: 14upx;
    padding: 30upx 0;
    .title {
      font-size: 32upx;
    }
    .time {
      color: $font-color-light;
      font-size: 24upx;
    }
  }
}
</style>
