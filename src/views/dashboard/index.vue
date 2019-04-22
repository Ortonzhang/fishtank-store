<template lang="pug">
  Card.order-dashboard
    .clearfix(slot='title')
      span 数据统计
    .div(style="padding: 20px")
      //- h2 鱼食概览
      Row(:gutter="16", style="margin-bottom: 40px;")
        Col(:span='6', v-for="item in fishFood", :key="item.key")
          Card.content-con(style="height: 120px;")
            .left-area(:style="{background: '#' + item.color}")
              Icon.icon(:type="item.icon")
            .right-area
              div
                countTo(:end="dashboardInfo[item.key] || 0")
                p {{ item.name }} 
      Row(:gutter="16" style="margin-bottom: 40px;")
        Col(:span='6', v-for="item in user", :key="item.key")
          Card.content-con(style="height: 120px;")
            .left-area(:style="{background: '#' + item.color}")
              Icon.icon(:type="item.icon")
            .right-area
              div
                countTo(:end="dashboardInfo[item.key] || 0")
                p {{ item.name }} 
      Row(:gutter="16"  style="margin-bottom: 40px;")
        Col(:span='6', v-for="item in integral", :key="item.key")
          Card.content-con(style="height: 120px;")
            .left-area(:style="{background: '#' + item.color}")
              Icon.icon(:type="item.icon")
            .right-area
              div
                countTo(:end="dashboardInfo[item.key] || 0")
                p {{ item.name }} 
      Row(:gutter="16"  style="margin-bottom: 40px;")
        Col(:span='6', v-for="item in task", :key="item.key")
          Card.content-con(style="height: 120px;")
            .left-area(:style="{background: '#' + item.color}")
              Icon.icon(:type="item.icon")
            .right-area
              div
                countTo(:end="dashboardInfo[item.key] || 0")
                p {{ item.name }} 
    //- .echeart-box(:style="{width: '100%', height: '700px'}", v-show="showEchart")

</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
// import { dateFormat } from "@/utils/handle";
// import * as echart from "echarts/lib/echarts";
// require("echarts/lib/chart/pie");
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/legend");
// require("echarts/lib/component/title");
export default {
  name: "Dashboard",
  data() {
    return {
      showEchart: false,
      fishFood: [
        {
          icon: "logo-foursquare",
          name: "总收益",
          key: "totalIncome",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "logo-euro",
          name: "今日收益",
          key: "todayIncome",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "md-flame",
          name: "昨日收益",
          key: "yesterdayIncome",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "ios-flower",
          name: "近7日收益",
          key: "last7DaysIncome",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        }
      ],
      user: [
        {
          icon: "el-icon-fish-submit",
          key: "totalUserCount",
          name: "总用户数",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-daishenhe",
          key: "todayRegisterCount",
          name: "今日注册用户",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-zaixianwendang",
          key: "yesterdayRegisterCount",
          name: "昨日注册用户",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-shenhe-jujue",
          key: "last7DaysRegisterCount",
          name: "近7日注册用户数",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        }
      ],
      integral: [
        {
          icon: "el-icon-fish-dianji",
          key: "totalUserAvailableCredit",
          name: "总积分",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-UV",
          key: "totalUserConsumeCredit",
          name: "消耗积分",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-click",
          key: "totalUserRemainCredit",
          name: "剩余积分",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        }
      ],
      task: [
        {
          icon: "el-icon-fish-dianji",
          key: "totalTaskCount",
          name: "总任务数",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-UV",
          key: "totalOfflineTaskCount",
          name: "总下线任务数",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        },
        {
          icon: "el-icon-fish-click",
          key: "totalOnlineTaskCount",
          name: "当前在线任务数",
          color: Math.random()
            .toString(16)
            .substr(-7, 6)
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["dashboardInfo"])
  },
  methods: {
    getInfo() {
      this.$store.dispatch("getDashboard");
    }

    // setEchartData(lables, count) {
    //   let myChart = echart.init(document.querySelector(".echeart-box"));
    //   myChart.setOption({
    //     title: {
    //       text: "短信发送统计",
    //       x: "left"
    //     },
    //     tooltip: {
    //       trigger: "item",
    //       formatter: "{a} <br/>{b} : {c} ({d}%)"
    //     },
    //     legend: {
    //       orient: "vertical",
    //       left: "left",
    //       top: "5%",
    //       data: lables
    //     },
    //     series: [
    //       {
    //         name: "状态统计",
    //         type: "pie",
    //         data: count,
    //         radius: "60%",
    //         label: {
    //           normal: {
    //             formatter: "{b}-{c} ({d}%)",
    //             textStyle: {
    //               fontWeight: "normal",
    //               fontSize: 15
    //             }
    //           }
    //         },
    //         itemStyle: {
    //           emphasis: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: "rgba(0, 0, 0, 0.5)"
    //           }
    //         }
    //       }
    //     ]
    //   });
    // },
    // async getcount() {
    //   await this.$store.dispatch("getDashboardStatusCount");
    //   let lables = [];
    //   let count = [];
    //   this.dashboardCount.forEach(item => {
    //     lables.push(item.name || "ToBeSend");
    //     count.push({ value: item.value, name: item.name || "ToBeSend" });
    //   });
    //   if (lables.length) {
    //     this.showEchart = true;
    //     setTimeout(() => {
    //       this.setEchartData(lables, count);
    //     }, 100);
    //   }
    // }
  },
  mounted() {
    !!getToken() && this.getInfo();
  }
};
</script>

<style lang="scss">
.order-dashboard {
  .ivu-card-body {
    height: 100%;
    padding: 0;
  }
  .content-con {
    width: 100%;
    height: 100%;
    position: relative;
    .left-area,
    .right-area {
      float: left;
      height: 100%;
      display: table;
      text-align: center;
    }
    .left-area {
      width: 36%;
      > .icon {
        display: table-cell;
        font-size: 36px;
        color: rgb(255, 255, 255);
        vertical-align: middle;
      }
    }
    .right-area {
      width: 64%;
      > div {
        display: table-cell;
        vertical-align: middle;
      }
      .count-to-wrapper {
        .content-outer {
          display: inline-block;
        }
        span {
          font-size: 50px;
        }
        margin-bottom: 10px;
      }
    }
  }
}
</style>
