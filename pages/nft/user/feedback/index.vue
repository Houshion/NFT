<template>
  <view>
    <com-page title="意见反馈">
      <view class="pd_15">
        <u--form
          labelPosition="top"
          :model="form"
          :rules="rules"
          ref="uForm"
          labelWidth="200"
        >
          <!-- <u-form-item label="联系人" prop="contactName">
            <u--input
              v-model="form.contactName"
              placeholder="请输入联系人姓名"
            ></u--input>
          </u-form-item>
          <u-form-item label="联系方式" prop="contactWay">
            <u--input
              v-model="form.contactWay"
              placeholder="请输入联系方式"
            ></u--input>
          </u-form-item> -->
          <u-form-item label="反馈内容" prop="feedbackContent">
            <u--textarea
              confirmType="done"
              v-model="form.feedbackContent"
              count
              maxlength="250"
              placeholder="请详细描述遇到的问题或者您的意见"
            ></u--textarea>
          </u-form-item>
          <u-form-item label="图片举证">
            <u-upload
              :fileList="fileList"
              @afterRead="afterRead"
              @delete="deletePic"
              multiple
              :maxCount="6"
              width="106"
              height="106"
            ></u-upload>
          </u-form-item>
        </u--form>
        <view class="bottom">
          <u-button class="confirm-btn" @click="onSubmit"> 立即提交 </u-button>
        </view>
      </view>
    </com-page>
  </view>
</template>

<script>
import { feedback } from "@/api/nft/public";
import config from "@/common/config";
import { loadToken } from "@/util/cache";
export default {
  data() {
    return {
      form: {
        contactName: "",
        contactWay: "",
        feedbackContent: "",
        imageUrls: [],
      },
      rules: {
        contactName: [
          // 必填规则
          {
            required: true,
            message: "请输入联系人姓名",
            trigger: ["blur", "change"],
          },
        ],
        contactWay: [
          // 必填规则
          {
            required: true,
            message: "请输入联系方式",
            trigger: ["blur", "change"],
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return uni.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change
            trigger: ["change", "blur"],
          },
        ],
        feedbackContent: [
          // 必填规则
          {
            required: true,
            message: "请输入反馈内容",
            trigger: ["blur", "change"],
          },
        ],
      },
      fileList: [],
    };
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this[`fileList`].splice(event.index, 1);
      this.form.imageUrls.splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList`].length;
      lists.map((item) => {
        this[`fileList`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        this.form.imageUrls.push(result.url);
        let item = this[`fileList`][fileListLen];
        this[`fileList`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: result,
          })
        );
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: config.baseApi + "/fileUpload/upload",
          filePath: url,
          header: {
            Authorization: loadToken(),
          },
          name: "file",
          success: (res) => {
            const { data } = JSON.parse(res.data);
            resolve(data);
          },
        });
      });
    },
    onSubmit() {
      this.$refs.uForm
        .validate()
        .then(async (res) => {
          await feedback(this.form);
          this.base.toast("提交成功");
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        })
        .catch((errors) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  width: calc(100% - 60upx);
  padding-left: 0;
  /* #ifdef APP-PLUS */
  bottom: 0;
  /* #endif */
  /* #ifdef H5 */
  padding-bottom: 30upx;
  /* #endif */
  .confirm-btn {
    width: 100%;
    height: 88upx;
    line-height: 88upx;
    border-radius: 30px;
    background: $main_btn_color;
    color: $white_color;
    font-size: 30upx;
    font-weight: 600;
    &:after {
      border-radius: 100px;
      border: none;
    }
  }
}
</style>
