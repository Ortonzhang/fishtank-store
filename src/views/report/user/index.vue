<template lang="pug">
  .report-user
    el-card
      .clearfix(slot='header')
        span 数据概览
      el-row(:gutter="20", style="margin-bottom: 20px")
        el-col(:span='6', v-for="item in userStateList", :key="item.key")
            el-card.card
              dl
                dt
                  i.dashboard-icon(:class="item.icon", :style="{color: '#' + item.color}")
                dd
                  h2.card-title {{ item.name }}
                  p.card-message {{ reportUserInfo[item.key] }}
    el-card(style="margin-top:20px")
      .clearfix(slot='header')
        span 用户数据列表
      el-form.demo-form-inline(:inline='true', :model='form')
        el-form-item(label='注册时间')
          el-date-picker(
            v-model='time', 
            type="daterange",
            range-separator="至",
            start-placeholder="开始日期",
            end-placeholder="结束日期",
            format="yyyy 年 MM 月 dd 日",
            value-format="yyyy-MM-dd"
          )
        el-form-item(label='登录时间')
          el-date-picker(
            v-model='login', 
            type="daterange",
            range-separator="至",
            start-placeholder="开始日期",
            end-placeholder="结束日期",
            format="yyyy 年 MM 月 dd 日",
            value-format="yyyy-MM-dd"
          )
        el-form-item
          el-button(type='primary', @click='getList') 查询
      el-table(:data='reportUserList', border, style="margin-top: 20px")
        el-table-column(prop='id', label='用户ID')
        el-table-column(prop='mobile', label='用户手机号')
        el-table-column(label='注册时间')
          template(slot-scope='scope')
            div {{ scope.row.created | dateHMS  }}
        el-table-column(label='最后一次登录时间')
          template(slot-scope='scope')
            div {{ scope.row.loginTime | dateHMS  }}
      el-pagination(layout='prev, pager, next', :total='reportUserCount', @current-change="handleCurrentChange")
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/utils/handle";
export default {
  name: "reportUser",
  data() {
    return {
      form: {
        pageSize: 10,
        page: 1,
        createdStart: "",
        createdEnd: "",
        loginTimeStart: "",
        loginTimeEnd: ""
      },
      time: "",
      login: "",
      userStateList: [
        {
          icon: "el-icon-fish-zongyonghushu",
          name: "总用户数",
          key: "totalUserCount",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-xinzengyonghu",
          name: "今日新增用户数",
          key: "todayRegisterCount",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-zrxzyhs",
          name: "昨日新增用户数",
          key: "yesterdayRegisterCount",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["reportUserList", "reportUserInfo", "reportUserCount"])
  },
  methods: {
    getList() {
      this.$store.dispatch("getAdminUserList", this.form);
    },
    getInfo() {
      this.$store.dispatch("getReportUserStats");
    },
    handleCurrentChange(value) {
      this.form.page = value;
      this.getList();
    }
  },
  mounted() {
    this.getList();
    this.getInfo();
  },
  watch: {
    time: function(value) {
      this.form.createdStart = value ? value[0] : "";
      this.form.createdEnd = value ? value[1] : "";
    },
    login: function(value) {
      this.form.loginTimeStart = value ? value[0] : "";
      this.form.loginTimeEnd = value ? value[1] : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  dl {
    display: flex;
    align-content: center;
    .dashboard-icon {
      font-size: 50px;
      margin-right: 10px;
    }
    dt {
      display: flex;
      align-content: center;
    }
    .card-title {
      font-size: 16px;
      color: #000;
      margin-bottom: 12px;
    }
    .car-message {
      color: #717171;
    }
  }
}
</style>
