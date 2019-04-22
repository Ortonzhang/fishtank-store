import { login, logout, updatePassword } from "@/api/login";

import { getToken, setToken, removeToken, setUid, getUid } from "@/utils/auth";
const app = {
  state: {
    sidebar: {
      opened: true
    },
    name: "",
    token: getToken(),
    id: getUid()
  },
  getters: {
    opened: state => state.opened,
    sidebar: state => state.sidebar,
    token: state => state.token,
    name: state => state.name
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
    },
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    Login({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm)
          .then(response => {
            const data = response.data;
            console.log(data);
            commit("SETSTATE", {
              token: data.token,
              name: data.nickname,
              id: data.id
            });
            setToken(data.token);
            setUid(data.id);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            localStorage.clear();
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    updatePassword({ commit }, data) {
      return new Promise((resolve, reject) => {
        updatePassword(data)
          .then(() => {
            localStorage.clear();
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default app;
