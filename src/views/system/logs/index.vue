<template lang="pug">
  Card.system-version
    .clearfix(slot='title')
      span 日志列表
    .div(style="padding: 20px")
      Form(inline, :model="form", :label-width="100")
        FormItem(label="操作模块：")
          Select(
            clearable,
            v-model="form.bizType"
            :style="{width: '200px'}"
          )
            Option(v-for="item in logbizTypeList", :key="item.value", :value="item.value") {{ item.name }}
        FormItem(label="操作类型")
          Select(
            clearable,
            v-model="form.opType"
            :style="{width: '200px'}"
          )
            Option(v-for="item in logOpTypeList", :key="item.value", :value="item.value") {{ item.name }}
        FormItem(label="员工ID")
          Input(placeholder="请输入用户手机号", v-model="form.adminId")
        FormItem.content-left-20
          Button(type='primary', @click='serch') 查询
        Table(border :columns="columns" :data="logList")
          template(slot-scope="{row, index}" slot="created")
            div {{ row.created | dateHMS }}
          template(slot-scope="{row, index}" slot="opTypeLabel")
            div(@click="optypelabelclick(row.rawData)")
              span {{row.opTypeLabel}}
              Icon(type="md-arrow-dropdown")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='logCount', :current='form.page', @on-change='changePage')
        Modal(
          v-model="modal"
          :title="modalTitle"
          :mask-closable="false"
        )
          json-viewer(:value="jsonview",:expand-depth='5', copyable, boxed, sort)
</template>
<script>
import { mapGetters } from "vuex";
import { thisExpression } from "babel-types";
export default {
  name: "systemLogs",
  data() {
    return {
      form: {
        bizType: "",
        opType: "",
        adminId: "",
        page: 1,
        pageSize: 10
      },
      columns: [
        { title: "序号", key: "id" },
        { title: "操作用户", key: "adminName" },
        { title: "操作模块", key: "bizType" },
        { title: "操作行为", key: "description" },
        { title: "操作具体事项", slot: "opTypeLabel" },
        { title: "操作时间", slot: "created" }
      ],
      jsonview: "",
      modal: false,
      modalTitle: ""
    };
  },

  computed: {
    ...mapGetters(["logList", "logbizTypeList", "logOpTypeList", "logCount"])
  },
  mounted() {
    this.getBizType();
    this.getOpType();
    this.getList();
  },
  methods: {
    serch() {
      this.form.page = 1;
      this.getList();
    },
    async getList() {
      await this.$store.dispatch("getlogList", this.form);
    },
    getBizType() {
      this.$store.dispatch("getlogbizTypeList");
    },
    getOpType() {
      this.$store.dispatch("getlogOpTypeList");
    },
    changePage(value) {
      this.form.page = value;
      this.getList();
    },
    optypelabelclick(json) {
      let obj = JSON.parse(json);
      this.jsonview = obj;
      this.modal = true;
      this.modalTitle = "操作Json";
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  margin-left: 10px;
  cursor: pointer;
  color: #f56464;
  font-size: 16px;
}
</style>
