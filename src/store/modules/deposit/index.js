import {
  depositRewardList,
  depositRewardAdd,
  depositRewardUpdate,
  depositRewardDetail,
  depositRewardHide,
  depositRewardShow,
  depositRewardOnline,
  depositRewardOffline,
  userCreditList,
  userCreditListDetail
} from "@/api/deposit";

const depositRewardStore = {
  state: {
    list: [],
    count: 0,
    statusMap: [{ key: "0", value: "未上线" }, { key: "1", value: "已上线" }]
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  getters: {
    depositRewardList: state => state.list,
    depositRewardCount: state => state.count,
    depositRewardStatusMap: state => state.statusMap
  },
  actions: {
    depositRewardList({ commit }, data) {
      return new Promise((resolve, reject) => {
        depositRewardList(data)
          .then(response => {
            let data = response.data;
            commit("SETSTATE", { list: data.records, count: data.total });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    depositRewardAdd({ commit }, data) {
      return new Promise((resolve, reject) => {
        depositRewardAdd(data)
          .then(response => {
            let data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    depositRewardUpdate({ commit }, data) {
      return new Promise((resolve, reject) => {
        depositRewardUpdate(data)
          .then(response => {
            let data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    depositRewardDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        depositRewardDetail(id)
          .then(response => {
            let data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    depositRewardHide({ commit }, id) {
      return new Promise((resolve, reject) => {
        depositRewardHide(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    depositRewardShow({ commit }, id) {
      return new Promise((resolve, reject) => {
        depositRewardShow(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    depositRewardOnline({ commit }, id) {
      return new Promise((resolve, reject) => {
        depositRewardOnline(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    depositRewardOffline({ commit }, id) {
      return new Promise((resolve, reject) => {
        depositRewardOffline(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    userCreditList({ commit }, data) {
      return new Promise((resolve, reject) => {
        userCreditList(data)
          .then(response => {
            let data = response.data;
            resolve({ list: data.records, total: data.total });
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    userCreditListDetail({ commit }, data) {
      return new Promise((resolve, reject) => {
        userCreditListDetail(data)
          .then(response => {
            let data = response.data;
            resolve({ list: data.records, total: data.total });
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default depositRewardStore;
