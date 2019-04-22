import { getUserList } from "@/api/user";

const userStore = {
  state: {
    list: [],
    count: 0
  },
  getters: {
    userList: state => state.list,
    userCount: state => state.count
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  actions: {
    // 获取用户数据列表
    getUserList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getUserList(data)
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
    }
  }
};

export default userStore;
