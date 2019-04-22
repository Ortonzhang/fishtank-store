<template lang="pug">
  el-card.other-version
    .clearfix(slot='header')
      span 日志列表
    el-form.demo-form-inline(:inline='true', :model='form')
      el-form-item(label='操作用户')
        el-select(v-model='form.employeeId', placeholder='请选择操作用户', clearable)
          el-option(v-for="item in employeeIdList", :label='item.name', :value='item.value', :key='item.value')
      el-form-item(label='操作时间')
        el-date-picker(
            v-model='time',
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd",
          )
      el-form-item(label='操作行为')
        el-select(v-model='form.opType', placeholder='请选择操作行为', clearable)
          el-option(v-for="item in opTypeList", :label='item.name', :value='item.value', :key="item.value")
      el-form-item(label='操作模块')
        el-select(v-model='form.bizType', placeholder='请选择操作行为', clearable)
          el-option(v-for="item in bizTypeList", :label='item.name', :value='item.value', :key="item.value")
      el-form-item(label='数据ID')
        el-input(v-model='form.dataId', placeholder='请输入数据ID',)
      el-form-item
        el-button(type='primary', @click='getList') 查询
    el-table(:data='otherLogsList', border, style="margin-top: 20px")
      el-table-column(prop='id', label='ID')
      el-table-column(prop='dataId', label='数据ID')
      el-table-column(prop='employeeName', label='操作用户')
      el-table-column(prop='opTypeLabel', label='操作行为')
      el-table-column(prop='bizTypeLabel', label='操作模块')
      el-table-column(label='操作具体事项', width="400px")
        template(slot-scope="scope")
          div 
            | {{ scope.row.description }}
            i.el-icon-warning(@click="showDialog(scope.row.rawData)", style="color: rgb(235, 160, 71); margin-left: 10px; cursor: pointer")
      el-table-column(label='操作时间')
        template(slot-scope='scope')
          div {{ scope.row.created | dateHMS  }}
    el-pagination(layout='prev, pager, next', :total='otherLogsCount', @current-change="handleCurrentChange")
    el-dialog(title='操作json', :visible.sync='dialogVisible', width='30%', :before-close='handleClose')
      json-viewer(:value='jsonView', :expand-depth='5', copyable, boxed, sort)
      //- pre.jsonView
      //-   | {{ jsonView }}
      //- span.dialog-footer(slot='footer')
        el-button(@click='dialogVisible = false') 取 消
        el-button(type='primary', @click='dialogVisible = false') 确 定

</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "otherVersion",
  data() {
    return {
      form: {
        bizType: "",
        opType: "",
        employeeId: "",
        page: 1,
        pageSize: 10,
        start: "",
        end: "",
        dataId: ""
      },
      bizTypeList: [],
      opTypeList: [],
      employeeIdList: [],
      time: "",
      jsonView: "",
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["otherLogsList", "otherLogsCount"])
  },
  methods: {
    async getList() {
      await this.$store.dispatch("employeeOpLogList", this.form);
    },
    handleCurrentChange(value) {
      this.form.page = value;
      this.getList();
    },
    showDialog(str) {
      this.jsonView = JSON.parse(str);
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    }
  },
  async mounted() {
    this.getList();
    this.employeeIdList = await this.$store.dispatch(
      "allEmployeeNameValueList"
    );
    this.opTypeList = await this.$store.dispatch("employeeOpTypeList");
    this.bizTypeList = await this.$store.dispatch("employeeBizTypeList");
  },
  watch: {
    time: function(value) {
      Array.isArray(value)
        ? (() => {
            this.form.start = value[0];
            this.form.end = value[1];
          })()
        : (() => {
            this.form.start = "";
            this.form.end = "";
          })();
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
