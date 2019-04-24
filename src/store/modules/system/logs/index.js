import { logList, logbizTypeList, logOpTypeList, logCount } from "@/api/logs";

const logsStore = {
  state: {
    list: [],
    count: 0,
    biztypeList: [], //模块列表
    opTypeList: [] //类型列表
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  getters: {
    logList: state => state.list,
    logbizTypeList: state => state.biztypeList,
    logOpTypeList: state => state.opTypeList,
    logCount: state => state.count
  },
  actions: {
    getlogList({ commit }, data) {
      return new Promise((resolve, reject) => {
        logList(data)
          .then(response => {
            let data = response.data;
            commit("SETSTATE", {
              list: data.records,
              count: data.total
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getlogbizTypeList({ commit }) {
      return new Promise((resolve, reject) => {
        logbizTypeList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", {
              biztypeList: data
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getlogOpTypeList({ commit }) {
      return new Promise((resolve, reject) => {
        logOpTypeList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", {
              opTypeList: data
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default logsStore;
