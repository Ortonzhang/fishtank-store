<template lang="pug">
  el-card.report-product
    .clearfix(slot='header')
      span 产品数据报告
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
      el-form-item(label='商户手机号')
        el-input(v-model='form.merchantMobile', placeholder='请输入商户手机号')
      el-form-item(label='产品名称')
        el-select(v-model='form.productId', clearable, filterable, remote,  placeholder='请输入关键词', :remote-method='remoteMethod', :loading='loading')
          el-option(v-for='item in nameList', :key='item.value', :label='item.name', :value='item.value')
      el-form-item
        el-button(type='primary', @click='getList') 查询
        el-button(type='primary', @click="exportExcel", :disabled="!downloadDisabled") 导出
    el-table(:data='list', border, style="margin-top: 20px; width: 100%")
      el-table-column(label='日期', fixed, width="100")
        template(slot-scope='scope')
          div {{ scope.row.date | date }}
      el-table-column(prop='merchantMobile', label='商户手机号', width="100")
      el-table-column(prop='productId', label='产品ID')
      el-table-column(prop='productName', label='产品名称')
      el-table-column(label='是否联登')
        template(slot-scope="scope")
          div(v-if="scope.row.isCologin == 1") {{ scope.row.isCologinLabel }}
      el-table-column(prop='feeTypeLabel', label='结算方式')
      el-table-column(prop='price', label='产品价格')
      el-table-column(prop='uvCount', label='产品UV')
      el-table-column(prop='pvCount', label='产品点击')
      el-table-column(prop='popupClickCount', label='弹窗点击')
      el-table-column(prop='bannerClickCount', label='banner点击', width="100")
      el-table-column(prop='cologinCount', label='联登点击')
      el-table-column(label='注册量', width="140")
        template(slot-scope="scope")
          div(v-if="scope.row.feeType != 1") {{ scope.row.regCount }}
          div.change-input-box(v-if="scope.row.feeType == 1")
            el-input(v-model.number="scope.row.regCount", :disabled="scope.row.disabled")
            i.el-icon-edit(v-if="scope.row.disabled", @click="scope.row.disabled = false")
            i.el-icon-circle-check-outline(style="color: rgb(96, 192, 74)", v-if="!scope.row.disabled", @click="save(scope.row.regCount, scope.row.id)")
            i.el-icon-circle-close-outline(style="color: rgb(252, 107, 108)", v-if="!scope.row.disabled", @click="reset")
      el-table-column(prop='cologinHitDbRate', label='联登撞库率', width="100")
      el-table-column(prop='regRate', label='注册率')
      el-table-column(prop='uvRate', label='UV/点击')
      el-table-column(prop='uvValue', label='UV价值')
      el-table-column(prop="uvAmount", label='UV应收')
      el-table-column(prop="cpaAmount", label='注册应收')
      el-table-column(prop='feeAmount', label='总应收金额', width="100")
    el-pagination(layout='prev, pager, next', :total='reportProductCount', @current-change="handleCurrentChange")
</template>

<script>
import { mapGetters } from "vuex";
import { downloadFile } from "@/utils/handle";
export default {
  name: "reportProduct",
  data() {
    return {
      form: {
        pageSize: 10,
        page: 1,
        productId: "",
        merchantMobile: "",
        start: "",
        end: ""
      },
      list: [],
      baseList: [],
      time: "",
      nameList: [],
      loading: false
    };
  },
  computed: {
    ...mapGetters(["reportProductList", "reportProductCount"]),
    downloadDisabled: function() {
      return !!this.form.end && !!this.form.start;
    }
  },
  methods: {
    async getList() {
      let list = await this.$store.dispatch("getReportProductList", this.form);
      list.forEach(item => {
        item.disabled = true;
      });
      this.baseList = JSON.parse(JSON.stringify(list));
      this.list = JSON.parse(JSON.stringify(list));
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
        let data = await this.$store.dispatch(
          "productDailyReportExport",
          this.form
        );
        let name = `产品数据报表-${this.form.start}至${this.form.end}.xlsx`;
        downloadFile(data, name);
      }
    },
    handleCurrentChange(value) {
      this.form.page = value;
      this.getList();
    },
    reset() {
      this.list = JSON.parse(JSON.stringify(this.baseList));
    },
    async save(regCount, id) {
      if (/^\d+$/.test(regCount)) {
        await this.$store.dispatch("updateRegCount", { regCount, id });
        this.getList();
      } else {
        this.$notify.error({
          title: "错误",
          message: "请输入正确数值，只能输入正整数"
        });
      }
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.nameList = await this.$store.dispatch(
          "getAllProductNameValueListByName",
          {
            name: query
          }
        );
        this.loading = false;
      }
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

<style lang="scss">
.change-input-box {
  display: flex;
  align-items: center;
  input {
    padding: 0 5px;
    height: 25px;
    line-height: 25px;
  }
  i {
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>
