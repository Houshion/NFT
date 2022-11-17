<template>
  <view>
    <u-navbar
      placeholder
      title="通知"
      :titleStyle="{
        'font-size': '38upx',
        'font-weight': 'bold',
      }"
      :border="false"
      :autoBack="true"
    >
    </u-navbar>
    <view class="noticeList">
      <template v-if="list.length > 0">
        <u-list @scrolltolower="scrolltolower">
          <u-list-item v-for="(item, index) in list" :key="index">
            <view class="noticeBox">
              <view class="flex_between">
                <view class="title">{{ item.noticeTitle }}</view>
                <view class="time">{{ item.createTime | timeStr }}</view>
              </view>
              <view class="mg_t_5 over_el_2">
                {{ item.noticeContent }}
              </view>
            </view>
          </u-list-item>
        </u-list>
      </template>
      <template v-else>
        <u-empty
          width="185px"
          text="暂无通知"
          :icon="require(`@/static/images/none/ic_wgg.png`)"
        >
        </u-empty>
      </template>
    </view>
  </view>
</template>

<script>
import { messageList } from "@/api/nft/notice";
export default {
  data() {
    return {
      // 通知列表
      list: [],
      // 表单信息
      form: {
        pageNum: 1, //页码
        pageSize: 10, //条数
      },
    };
  },
  onShow() {
    this.list = [];
    this.init();
  },
  methods: {
    // 初始化参数
    init() {
      this.list = [];
      this.form.pageNum = 1;
      this.getList();
    },
    // 获取列表信息
    getList() {
      messageList(this.form).then(({ data }) => {
        this.list = [...this.list, ...data];
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
/depp/ .container {
  background: #f7f7f7;
}
.noticeList {
  background: #f7f7f7;
  padding: 30upx;
  .noticeBox {
    background: #fff;
    border-radius: 14upx;
    margin-bottom: 30upx;
    padding: 30upx;
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
