import {
  appMessageAdd,
  appMessageDetail,
  appMessageList,
  appMessageUpdate,
  appMessageStatusEnum,
  appMessageDeviceTypeList,
  appMessagePushTypeList,
  appMessageSend
} from "@/api/mesaage";

const messageStore = {
  state: {
    list: [],
    count: 0,
    statusEnum: [],
    seviceType: [],
    pushTypeList: []
  },
  getters: {
    appMessageList: state => state.list,
    appMessageCount: state => state.count,
    appMessageStatusEnum: state => state.statusEnum,
    appMessageDeviceTypeList: state => state.seviceType,
    appMessagePushTypeList: state => state.pushTypeList
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  actions: {
    appMessageList({ commit }, data) {
      return new Promise((resolve, reject) => {
        appMessageList(data)
          .then(response => {
            const data = response.data;
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
    appMessageSend({ commit }, id) {
      return new Promise((resolve, reject) => {
        appMessageSend(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    appMessageDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        appMessageDetail(id)
          .then(response => {
            const data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    appMessageAdd({ commit }, data) {
      return new Promise((resolve, reject) => {
        appMessageAdd(data)
          .then(response => {
            const data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    appMessageUpdate({ commit }, data) {
      return new Promise((resolve, reject) => {
        appMessageUpdate(data)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    appMessageStatusEnum({ commit }) {
      return new Promise((resolve, reject) => {
        appMessageStatusEnum()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", {
              statusEnum: data
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    appMessageDeviceTypeList({ commit }) {
      return new Promise((resolve, reject) => {
        appMessageDeviceTypeList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", {
              seviceType: data
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    appMessagePushTypeList({ commit }) {
      return new Promise((resolve, reject) => {
        appMessagePushTypeList()
          .then(response => {
            let data = response.data;
            commit("SETSTATE", {
              pushTypeList: data
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

export default messageStore;
