<template lang="pug">
  scroll-bar
    .layout-logo-left logo
    Sider(ref="side1" hide-trigger collapsible :collapsed-width="80", v-model="!sidebar.opened")
      Menu(:active-name="activeUrl" theme="dark" width="auto",  ref="contactMenu", :open-names="[openKeys]")
        .menuItem(v-for="(menu,index) in async_menus", :key="index")
          MenuItem.ivu-menu-item-use(v-if="!!menu['url']", :to="menu.url", :name="menu.url")
            Icon(:type="menu.icon")
            span {{ menu.title }}
          Submenu(v-else, :index="menu.title", :name="menu.title")
            template(slot='title')
              icon(:type='menu.icon')
              | {{ menu.title }}
            MenuItem(:to="submenu.url", :name="submenu.url", v-for="(submenu, subIndex) in menu.submenus", :key="subIndex" ) 
              | {{ submenu.title }}
</template>

<script>
import { mapGetters } from "vuex";
import ScrollBar from "@/components/ScrollBar";

export default {
  data() {
    return {
      openKeys: "",
      async_menus: [
        {
          url: "/dashboard",
          icon: "ios-home-outline",
          title: "数据概览"
        },
        {
          icon: "ios-people-outline",
          title: "用户管理",
          submenus: [
            {
              url: "/user/list",
              title: "用户列表"
            }
          ]
        },
        {
          icon: "md-reorder",
          title: "充值管理",
          submenus: [
            {
              url: "/order/list",
              title: "充值列表"
            }
          ]
        },
        {
          icon: "logo-bitcoin",
          title: "积分管理",
          submenus: [
            {
              url: "/deposit/list",
              title: "积分概况"
            },
            {
              url: "/deposit/activity",
              title: "积分活动"
            }
          ]
        },
        {
          icon: "logo-instagram",
          title: "任务管理",
          submenus: [
            {
              url: "/task/type",
              title: "任务分类"
            },
            {
              url: "/task/list",
              title: "任务列表"
            }
          ]
        },
        {
          icon: "ios-chatbubbles-outline",
          title: "消息管理",
          submenus: [
            {
              url: "/message/list",
              title: "消息列表"
            }
          ]
        },
        {
          icon: "ios-images",
          title: "轮播图管理",
          submenus: [
            {
              url: "/banner/list",
              title: "轮播图列表"
            }
          ]
        },
        {
          icon: "ios-settings-outline",
          title: "系统设置",
          submenus: [
            {
              url: "/system/setting",
              title: "基础设置"
            },
            {
              url: "/system/menu",
              title: "菜单设置"
            },
            {
              url: "/system/version",
              title: "App版本管理"
            },
            {
              url: "/system/logs",
              title: "操作日志"
            },
            {
              url: "/system/protocol",
              title: "其他"
            }
          ]
        }
      ]
    };
  },
  components: {
    ScrollBar
  },
  computed: {
    ...mapGetters(["sidebar"]),
    activeUrl() {
      return this.$route.path;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  created() {
    let list = this.async_menus.filter(item => item.submenus);
    list.map(item => {
      item.submenus.forEach(sub => {
        if (sub.url == this.$route.path) {
          this.openKeys = item.title;
        }
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.ivu-menu-item-use {
  &.ivu-menu-item-selected {
    color: #fff !important;
    background: #2d8cf0 !important;
  }
}
</style>
