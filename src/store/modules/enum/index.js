import {
  tradePlatformList,
  tradeStatusList,
  auditStatusList,
  feeTypeList,
  platformList
} from "@/api/enum";
const enumStore = {
  state: {
    taskClassifyStatusMap: [
      // 任务分类状态
      { key: "0", value: "待上线" },
      { key: "1", value: "上线" }
    ],
    taskTypeStatusMap: [
      { key: "0", value: "系统任务" },
      { key: "1", value: "第三方任务" }
    ],
    taskClearingFormMap: [
      { key: "0", value: "UV" },
      { key: "1", value: "CPA" },
      { key: "2", value: "CPS" }
    ],
    versionPlatformTypeMap: [
      { key: "0", value: "IOS" },
      { key: "1", value: "安卓" }
    ],
    taskConloginMap: [{ key: "0", value: "否" }, { key: "1", value: "是" }],
    tradePlatformList: [], // 充值平台列表
    tradeStatusList: [], // 订单状态列表
    auditStatusList: [], // 产品状态列表
    feeTypeList: [], // 结算方式列表
    platformList: [] // 产品投放平台列表
  },
  mutations: {
    SETSTATE(state, { key, value }) {
      state[key] = value;
    }
  },
  getters: {
    tradePlatformList: state => state.tradePlatformList,
    tradeStatusList: state => state.tradeStatusList,
    auditStatusList: state => state.auditStatusList,
    feeTypeList: state => state.feeTypeList,
    platformList: state => state.platformList,
    taskClassifyStatusMap: state => state.taskClassifyStatusMap,
    taskTypeStatusMap: state => state.taskTypeStatusMap,
    taskClearingFormMap: state => state.taskClearingFormMap,
    taskConloginMap: state => state.taskConloginMap,
    versionPlatformTypeMap: state => state.versionPlatformTypeMap
  },
  actions: {
    getTradePlatformList({ commit }) {
      return new Promise((resolve, reject) => {
        tradePlatformList()
          .then(response => {
            console.log(response.data);
            let data = response.data;
            commit("SETSTATE", { key: "tradePlatformList", value: data });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getTradeStatusList({ commit }) {
      return new Promise((resolve, reject) => {
        tradeStatusList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", { key: "tradeStatusList", value: data });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getAuditStatusList({ commit }) {
      return new Promise((resolve, reject) => {
        auditStatusList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", { key: "auditStatusList", value: data });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getFeeTypeList({ commit }) {
      return new Promise((resolve, reject) => {
        feeTypeList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", { key: "feeTypeList", value: data });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getPlatformList({ commit }) {
      return new Promise((resolve, reject) => {
        platformList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", { key: "platformList", value: data });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default enumStore;
