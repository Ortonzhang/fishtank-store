import { settingDetail, settingUpdate } from "@/api/setting";
const settingStore = {
  mutations: {
    SETSTATE(state, { key, value }) {
      state[key] = value;
    }
  },
  actions: {
    getSettingDetail({ commit }) {
      return new Promise((resolve, reject) => {
        settingDetail()
          .then(response => {
            let data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    settingUpdate({ commit }, data) {
      return new Promise((resolve, reject) => {
        settingUpdate(data)
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

export default settingStore;
