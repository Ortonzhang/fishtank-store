import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import app from "./modules/app";
import enumStore from "./modules/enum";

// user
import userStore from "./modules/user";
// message
import messageStore from "./modules/message";
// deposit
import depositRewardStore from "./modules/deposit";
// order
import orderStore from "./modules/order";

// task
import taskStore from "./modules/task";

import dashboardStore from "./modules/dashboard";

// system
import settingStore from "./modules/system/setting";
import versionStore from "./modules/system/version";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    enumStore,
    taskStore,
    dashboardStore,
    settingStore,
    messageStore,
    versionStore,
    depositRewardStore,
    orderStore,
    userStore
  },
  // getters,
  plugins: [
    createPersistedState({
      // 持久化数据
      paths: ["app.sidebar", "userStore"]
    })
  ]
});

export default store;
