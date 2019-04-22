<template lang="pug">
  Card.order-list
    .clearfix(slot='title')
      span 充值列表
    .div(style="padding: 20px")
      Form(inline, :label-width="80", :model="form")
        FormItem(label="用户手机号:")
          Input(placeholder="请输入用户手机号", v-model="form.id")
        FormItem(label="充值类型:")
          Select(
            v-model="form.taskId"
            filterable
            remote
            :remote-method="getNameTaskList"
            :loading="NameTaskLoading"
          )
            Option(v-for="(option, index) in nameTaskList" :value="option.value" :key="index") {{ option.label }}
        FormItem(label="充值状态:")
          Select(
            v-model="form.taskId"
            filterable
            remote
            :remote-method="getNameTaskList"
            :loading="NameTaskLoading"
          )
            Option(v-for="(option, index) in nameTaskList" :value="option.value" :key="index") {{ option.label }}
        FormItem(label="充值时间:")
          DatePicker(v-model="time", format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择时间" style="width: 200px")
        FormItem
          Button(type='primary', @click='serch') 查询
        Table(border :columns="columns" :data="orderList")
          template(slot-scope="{ row, index }" slot="action")
            ButtonGroup
              Button(icon="md-book", @click="detail(row.id)", title="积分详情")
        div(style='margin: 10px;overflow: hidden')
          div(style='float: right;')
            Page(:total='orderCount', :current='form.page', @on-change='changePage')
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/handle";
export default {
  name: "orderList",
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
      time: "",
      NameTaskLoading: false,
      nameTaskList: []
    };
  },
  computed: {
    ...mapGetters(["orderList", "orderCount"])
  },
  methods: {
    async getList() {
      await this.$store.dispatch("getOrderList", this.form);
    },
    serch() {
      this.form.page = 1;
      this.getList();
    },
    changePage(value) {
      this.form.page = value;
      this.getList();
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
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    time: function(value) {
      value[0]
        ? (() => {
            this.form.tradeTimeStart = formatDate(value[0]);
            this.form.tradeTimeEnd = formatDate(value[1]);
          })()
        : (() => {
            this.form.tradeTimeStart = "";
            this.form.tradeTimeEnd = "";
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
