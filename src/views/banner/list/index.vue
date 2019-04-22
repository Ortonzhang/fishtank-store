<template lang="pug">
  Card.banner-list
    .clearfix(slot='title')
      span 轮播图列表
    .div(style="padding: 20px")
      Form(inline, :label-width="80", :model="form")
        FormItem(label="在线状态:")
          Input(placeholder="请输入用户ID", v-model="form.id")
        FormItem
          Button(type='primary', @click='serch') 查询
      Table(border :columns="columns" :data="list")
          template(slot-scope="{ row, index }" slot="action")
            ButtonGroup
              Button(icon="md-book", @click="detail(row.id)", title="积分详情")  
      div(style='margin: 10px;overflow: hidden')
        div(style='float: right;')
          Page(:total='total', :current='form.page', @on-change='changePage')
    Modal(
      v-model="dialog"
      width="720",
      draggable,
      :mask-closable="false",
      :footer-hide="true",
      @on-cancel="cancel",
      title="积分详情列表"
    )
      Form(inline, :label-width="80", :model="dialogForm", ref="dialogForm")
        FormItem(label="时间:")
          DatePicker(v-model="time", format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px")
        FormItem(label="任务类型:")
          FormItem(label="任务类型：")
        Select(
          clearable,
          v-model="dialogForm.taskType"
          :style="{width: '200px'}"
        )
          Option(v-for="item in taskTypeStatusMap", :key="item.key", :value="item.key") {{ item.value }}
        FormItem(label="任务名称:")
          Select(
            v-model="dialogForm.taskId"
            filterable
            remote
            :remote-method="getNameTaskList"
            :loading="NameTaskLoading"
          )
            Option(v-for="(option, index) in nameTaskList" :value="option.value" :key="index") {{ option.label }}
        FormItem
          Button(type='primary', @click='dialogSerch') 查询
        Table(border :columns="dialogColumns" :data="dialogList")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='dialogTotal', :current='form.page', @on-change='dialogChangePage')
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/handle";
export default {
  name: "bannerList",
  data() {
    return {
      form: {
        mobile: "",
        page: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      columns: [
        { title: "用户id", key: "id" },
        { title: "用户手机号", key: "mobile" },
        { title: "总积分", key: "totalCredit" },
        { title: "消耗积分", key: "consumeCredit" },
        { title: "剩余积分", key: "availableCredit" },
        { title: "操作", slot: "action" }
      ],
      dialog: false,
      dialogForm: {
        id: "",
        page: 1,
        pageSize: 10
      },
      dialogList: [],
      dialogTotal: 0,
      dialogColumns: [
        { title: "时间", key: "created" },
        { title: "任务类型", key: "incomeCredit" },
        { title: "任务名称", key: "incomeCredit" },
        { title: "入账积分", key: "incomeCredit" },
        { title: "消耗积分", key: "consumeCredit" }
      ],
      NameTaskLoading: false,
      nameTaskList: [],
      time: ""
    };
  },
  computed: {
    ...mapGetters(["taskTypeStatusMap"])
  },
  methods: {
    async getList() {
      let { list, total } = await this.$store.dispatch(
        "userCreditList",
        this.form
      );
      this.list = list;
      this.total = total;
    },
    serch() {
      this.form.page = 1;
      this.getList();
    },
    changePage(value) {
      this.form.page = value;
      this.getList();
    },
    async detail(id) {
      this.dialogForm.id = id;
      this.dialog = true;
      await this.getDetail();
    },
    async getDetail() {
      let { list, total } = await this.$store.dispatch(
        "userCreditListDetail",
        this.dialogForm
      );
      this.dialogList = list;
      this.dialogTotal = total;
    },
    async dialogSerch() {
      this.dialogForm.page = 1;
      await this.getDetail();
    },
    async dialogChangePage(value) {
      this.dialogForm.page = value;
      await this.getDetail();
    },
    async getNameTaskList(name) {
      if (name !== "") {
        this.NameTaskLoading = true;
        try {
          this.nameTaskList = await this.$store.dispatch(
            "getAllNameValueListByName",
            { name }
          );
        } catch (error) {
          this.NameTaskLoading = false;
        }
      } else {
        this.nameTaskList = [];
      }
    },
    cancel() {
      this.time = "";
      this.dialogForm.taskType = "";
      this.dialogForm.taskId = "";
      this.dialog = false;
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    time: function(value) {
      value[0]
        ? (() => {
            this.dialogForm.start = formatDate(value[0]);
            this.dialogForm.end = formatDate(value[1]);
          })()
        : (() => {
            this.dialogForm.start = "";
            this.dialogForm.end = "";
          })();
    }
  }
};
</script>

<style lang="scss" scoped>
.green {
  color: rgb(79, 255, 113);
}
</style>
