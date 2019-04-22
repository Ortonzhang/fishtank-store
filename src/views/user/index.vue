<template lang="pug">
  Card.order-dashboard
    .clearfix(slot='title')
      span 用户管理
    .div(style="padding: 20px")
    Form(inline, :label-width="80")
      FormItem(label="注册时间:")
        DatePicker(
          v-model="registTime", 
          format="yyyy-MM-dd", 
          type="daterange" 
          placement="bottom-end" 
          placeholder="选择时间" 
          style="width: 200px"
        )
      FormItem(label="登录时间:")
        DatePicker(
          v-model="loginTime", 
          format="yyyy-MM-dd" 
          type="daterange" 
          placement="bottom-end" 
          placeholder="选择时间" 
          style="width: 200px"
        )
      FormItem
        Button(type='primary', @click='serch') 查询
      Table(border :columns="columns" :data="userList", :loading="loading")
        template(slot-scope="{row, index}" slot="created")
            div {{ row.created | dateHMS }}
        template(slot-scope="{row, index}" slot="loginTime")
            div {{ row.loginTime | dateHMS }}
      div(style='margin: 10px;overflow: hidden')
        div(style='float: right;')
          Page(:total='userCount', :current='form.page', @on-change='changePage')

</template>
<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/handle";
export default {
  name: "userList",
  data() {
    return {
      columns: [
        { title: "ID", key: "id" },
        { title: "用户手机号", key: "mobile" },
        { title: "推荐人", key: "inviteBy" },
        { title: "我的推荐码", key: "inviteCode" },
        { title: "注册时间", slot: "created" },
        { title: "最近登录时间", slot: "loginTime" }
      ],
      loading: false,
      registTime: "",
      loginTime: "",
      form: {
        createdEnd: "",
        createdStart: "",
        loginTimeEnd: "",
        loginTimeStart: "",
        page: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters(["userList", "userCount"])
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        await this.$store.dispatch("getUserList", this.form);
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    async changePage(value) {
      this.form.page = value;
      await this.getList();
    },
    async serch() {
      this.form.page = 1;
      await this.getList();
    }
  },
  watch: {
    loginTime: function(value) {
      value[0]
        ? (() => {
            this.form.loginTimeStart = formatDate(value[0]);
            this.form.loginTimeEnd = formatDate(value[1]);
          })()
        : (() => {
            this.form.loginTimeStart = "";
            this.form.loginTimeEnd = "";
          })();
    },
    registTime: function(value) {
      value[0]
        ? (() => {
            this.form.createdStart = formatDate(value[0]);
            this.form.createdEnd = formatDate(value[1]);
          })()
        : (() => {
            this.form.createdStart = "";
            this.form.createdEnd = "";
          })();
    }
  }
};
</script>
<style lang="scss" scoped>
.user-info {
  ul {
    li {
      height: 32px;
      font-size: 14px;
      line-height: 32px;
      color: rgb(102, 102, 102);
      span {
        &:nth-child(1) {
          display: inline-block;
          font-weight: 500;
          min-width: 74px;
        }
      }
    }
  }
}
</style>
