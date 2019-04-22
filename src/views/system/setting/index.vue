<template lang="pug">
  Card.system-setting
    .clearfix(slot='title')
      p 基础设置
    .div(style="padding: 20px")
      Form(:model="form", label-position="top")
        Row(:gutter="16")
          Col(span="12")
            FormItem(label="app头像：")
              div(style="width: 180px; position: relative;")
                Upload.avatar-uploader(
                  :show-upload-list='false', 
                  accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png", 
                  :max-size='2048', 
                  :before-upload='handleBeforeUpload',
                  action='', 
                  :disabled="!!imageUrl"
                )
                  img.avatar(v-if='imageUrl', :src='imageUrl')
                  Icon.avatar-uploader-icon(type='ios-camera', size='28', v-else)
                .img-delete(v-if='imageUrl', @click="removeImg")
                  Icon.el-icon-delete(type="md-trash")
          Col(span="12")
            FormItem(label="客服微信号：")
              Input(v-model="form.customServiceWechat")
        Row(:gutter="16")
          Col(span="12")
            FormItem(label="商品问题客服电话：")
              Input(v-model="form.customServiceTel")
          Col(span="12")
            FormItem(label="客服邮箱：")
              Input(v-model="form.customServiceEmail")
        Row(:gutter="16")
          Col(span="12")
            FormItem(label="积分问题客服电话：")
              Input(v-model="form.creditServiceTel")
          Col(span="12")
            FormItem(label="app个人中心链接：")
              Input(v-model="form.appHomePage")
        FormItem
          Button(type="primary", @click="submit") 提交
</template>
<script>
export default {
  name: "otherSetting",
  data() {
    return {
      form: {},
      imageUrl: ""
    };
  },
  methods: {
    async getDetail() {
      this.form = await this.$store.dispatch("getSettingDetail");
      this.imageUrl = this.form.appLogo;
    },
    handleBeforeUpload(file) {
      if (file.size / 1000 > 1000) {
        this.$Notice.warning({
          title: "错误",
          desc: "文件 " + file.name + " 太大，不能超过 1M。"
        });
      } else {
        this.imageUrl = URL.createObjectURL(file);
        this.form.logoFile = file;
      }
    },
    removeImg() {
      URL.revokeObjectURL(this.form.logoFile);
      this.imageUrl = "";
    },
    async submit() {
      let formData = new FormData();
      for (let [key, value] of Object.entries(this.form)) {
        if (value !== null) {
          formData.append(key, value);
        }
      }
      await this.$store.dispatch("settingUpdate", formData);
      await this.getDetail();
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>

<style lang="scss" scoped></style>
