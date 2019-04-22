import { orderList } from "@/api/order";

const orderStore = {
  state: {
    list: [],
    count: 0
  },
  getters: {
    orderList: state => state.list,
    orderCount: state => state.count
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  actions: {
    getOrderList({ commit }, data) {
      return new Promise((resolve, reject) => {
        orderList(data)
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

export default orderStore;
