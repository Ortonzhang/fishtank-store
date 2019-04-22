import { getDashboard } from "@/api/dashboard";
const dashboardStore = {
  state: {
    info: {}
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  getters: {
    dashboardInfo: state => state.info
  },
  actions: {
    getDashboard({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDashboard(data)
          .then(response => {
            let data = response.data;
            commit("SETSTATE", { info: data });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default dashboardStore;
