import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "../views/layout/Layout";

export const constantRouterMap = [
  {
    path: "/login",
    component: resolve => require(["@/views/login"], resolve),
    hidden: true
  },
  {
    path: "/404",
    component: resolve => require(["@/views/404"], resolve),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    hidden: true,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: resolve => require(["@/views/dashboard"], resolve)
      },
      {
        path: "/order/list",
        name: "orderList",
        component: resolve => require(["@/views/order/list"], resolve)
      },
      {
        path: "user/list",
        name: "userInfo",
        component: resolve => require(["@/views/user"], resolve)
      },
      {
        path: "/deposit/list",
        name: "depositList",
        component: resolve => require(["@/views/deposit/list"], resolve)
      },
      {
        path: "/banner/list",
        name: "bannerList",
        component: resolve => require(["@/views/banner/list"], resolve)
      },
      {
        path: "/task/type",
        name: "taskType",
        component: resolve => require(["@/views/task/type"], resolve)
      },
      {
        path: "/task/list",
        name: "taskList",
        component: resolve => require(["@/views/task/list"], resolve)
      },
      {
        path: "/system/logs",
        name: "systemLogs",
        component: resolve => require(["@/views/system/logs"], resolve)
      },
      {
        path: "/system/setting",
        name: "systemSetting",
        component: resolve => require(["@/views/system/setting"], resolve)
      },
      {
        path: "/system/version",
        name: "systemVersion",
        component: resolve => require(["@/views/system/version"], resolve)
      },
      {
        path: "/system/protocol",
        name: "systemProtocol",
        component: resolve => require(["@/views/system/protocol"], resolve)
      },
      {
        path: "/system/menu",
        name: "systemMenu",
        component: resolve => require(["@/views/system/menu"], resolve)
      },
      {
        path: "/message/list",
        name: "messageList",
        component: resolve => require(["@/views/message/list"], resolve)
      },
      {
        path: "/deposit/activity",
        name: "depositActivity",
        component: resolve => require(["@/views/deposit/activity"], resolve)
      }
      // {
      //   path: "product/list",
      //   name: "ProductList",
      //   component: resolve => require(["@/views/product/list"], resolve)
      // },
      // {
      //   path: "report/product",
      //   name: "reportProduct",
      //   component: resolve => require(["@/views/report/product"], resolve)
      // },
      // {
      //   path: "report/merchant",
      //   name: "reportMerchant",
      //   component: resolve => require(["@/views/report/merchant"], resolve)
      // },
      // {
      //   path: "report/user",
      //   name: "reportUser",
      //   component: resolve => require(["@/views/report/user"], resolve)
      // },
      // {
      //   path: "report/overall",
      //   name: "reportOverall",
      //   component: resolve => require(["@/views/report/overall"], resolve)
      // },
      // {
      //   path: "merchant/list",
      //   name: "merchantList",
      //   component: resolve => require(["@/views/merchant/list"], resolve)
      // },
      // {
      //   path: "other/version",
      //   name: "otherVersion",
      //   component: resolve => require(["@/views/other/version"], resolve)
      // },
      // {
      //   path: "other/banner",
      //   name: "otherBanner",
      //   component: resolve => require(["@/views/other/banner"], resolve)
      // },
      // {
      //   path: "/other/logs",
      //   name: "otherLogs",
      //   component: resolve => require(["@/views/other/logs"], resolve)
      // },
      // {
      //   path: "/other/push",
      //   name: "otherPush",
      //   component: resolve => require(["@/views/other/push"], resolve)
      // },
      // {
      //   path: "/other/setting",
      //   name: "otherSetting",
      //   component: resolve => require(["@/views/other/setting"], resolve)
      // },
      // {
      //   path: "/other/setting/edit",
      //   name: "otherSettingEdit",
      //   component: resolve => require(["@/views/other/setting/edit"], resolve)
      // },
    ]
  }
];
// export const asyncRouterMap = [
//   {
//     path: "/example",
//     component: Layout,
//     redirect: "/example/child",
//     name: "Example",
//     meta: {
//       title: "Example",
//       icon: "",
//       roles: ["admin"]
//     },
//     children: [
//       {
//         path: "child",
//         name: "Child",
//         component: resolve => require(["@/views/child/index"], resolve),
//         meta: {
//           title: "子页面",
//           icon: "",
//           roles: ["admin"]
//         }
//       }
//     ]
//   },
//   {
//     path: "*",
//     redirect: "/404",
//     hidden: true
//   }
// ];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
