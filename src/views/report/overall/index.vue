<template lang="pug">
  el-card.report-overall
    .clearfix(slot='header')
      span 整体产品数据报告
    el-form.demo-form-inline(:inline='true', :model='form')
      el-form-item(label='时间')
        el-date-picker(
            v-model='time', 
            type="daterange",
            range-separator="至",
            start-placeholder="开始日期",
            end-placeholder="结束日期",
            format="yyyy 年 MM 月 dd 日",
            value-format="yyyy-MM-dd"
          )
      el-form-item
        el-button(type='primary', @click='getList') 查询
        el-button(type='primary',  @click="exportExcel", :disabled="!downloadDisabled") 导出
    el-table(:data='reportOverallList', border, style="margin-top: 20px")
      el-table-column(label='日期')
        template(slot-scope='scope')
          div {{ scope.row.date | date  }}
      el-table-column(prop='productCount', label='上线产品数')
      el-table-column(prop='pvCount', label='点击量')
      el-table-column(prop='uvCount', label='产品UV数')
      el-table-column(prop='regCount', label='注册量')
      el-table-column(prop='feeAmount', label='应收金额')
      el-table-column(prop='pvValue', label='点击价值')
      el-table-column(prop='uvValue', label='产品UV价值')
      el-table-column(prop='regRate', label='注册率')
      el-table-column(prop='uvRate', label='UV/点击')
    el-pagination(layout='prev, pager, next', :total='reportOverallCount', @current-change="handleCurrentChange")
</template>

<script>
import { mapGetters } from "vuex";
import { downloadFile } from "@/utils/handle";
export default {
  name: "reportOverall",
  data() {
    return {
      form: {
        ageSize: 10,
        page: 1,
        start: "",
        end: ""
      },
      time: "",
      list: [],
      smsLogTotal: 0,
      showEchart: false
    };
  },
  computed: {
    ...mapGetters(["reportOverallList", "reportOverallCount"]),
    downloadDisabled: function() {
      return !!this.form.end && !!this.form.start;
    }
  },
  methods: {
    getList() {
      this.$store.dispatch("getReportOverallList", this.form);
    },
    async exportExcel() {
      if (
        new Date(this.form.end).getTime() -
          new Date(this.form.start).getTime() >
        24 * 3600 * 31 * 1000
      ) {
        this.$notify.error({
          title: "错误",
          message: "时间最大选择范围为一个月"
        });
        return false;
      } else {
        let data = await this.$store.dispatch("globalStatsExport", this.form);
        let name = `整体产品数据报表-${this.form.start}至${this.form.end}.xlsx`;
        downloadFile(data, name);
      }
    },
    handleCurrentChange(value) {
      this.form.page = value;
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    time: function(value) {
      this.form.start = value ? value[0] : "";
      this.form.end = value ? value[1] : "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
