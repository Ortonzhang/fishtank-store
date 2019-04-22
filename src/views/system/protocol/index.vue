<template lang="pug">
  div
    Tabs(v-model="currentIndex")
      TabPane(v-for="item in labelList", :key="item.key", :label="item.value")
    .setting-protocol-edit
      Vueditor(ref="vue_ditor", style="height: 600px")
      Button(type="primary", style="margin-top: 10px;", @click="submit") 提交
</template>
<script>
export default {
  data() {
    return {
      content: "",
      currentIndex: 0,
      detail: "",
      labelList: [
        { key: "registerTerm", value: "注册协议" },
        { key: "cologinTerm", value: "联合注册协议" },
        { key: "creditTerm", value: "积分说明" },
        { key: "faq", value: "常见问题" },
        { key: "aboutUs", value: "关于我们" }
      ]
    };
  },
  methods: {
    async setContent(index) {
      let key = this.labelList[index].key;
      this.content = this.detail[key] || null;
      setTimeout(() => {
        this.$refs["vue_ditor"].setContent(this.content);
      }, 100);
    },
    async getDetail() {
      this.detail = await this.$store.dispatch("getSettingDetail");
    },
    async submit() {
      this.content = this.$refs["vue_ditor"].getContent();
      let params = new FormData();
      let key = this.labelList[this.currentIndex].key;
      params.append(key, this.content);
      await this.$store.dispatch("settingUpdate", params);
      await this.getDetail();
    }
  },
  async mounted() {
    await this.getDetail();
    await this.setContent(this.currentIndex);
  },
  watch: {
    currentIndex: function(value) {
      this.setContent(value);
    }
  }
};
</script>
