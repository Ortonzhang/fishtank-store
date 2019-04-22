import {
  versionList,
  versionDetail,
  versionAdd,
  versionUpdate,
  versionUpdateStatus
} from "@/api/version";
const versionStore = {
  state: {
    list: [],
    count: 0
  },
  getters: {
    versionList: state => state.list,
    versionCount: state => state.count
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  actions: {
    getVersionList({ commit }, data) {
      return new Promise((resolve, reject) => {
        versionList(data)
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
    getVersionDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        versionDetail(id)
          .then(response => {
            let data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    versionAdd({ commit }, data) {
      return new Promise((resolve, reject) => {
        versionAdd(data)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    versionUpdate({ commit }, data) {
      return new Promise((resolve, reject) => {
        versionUpdate(data)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    versionUpdateStatus({ commit }, data) {
      return new Promise((resolve, reject) => {
        versionUpdateStatus(data)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default versionStore;
