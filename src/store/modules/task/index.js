import {
  taskGroupList,
  taskGroupDetail,
  taskGroupAdd,
  taskGroupOffline,
  taskGroupOnline,
  taskGroupUpdate,
  taskList,
  taskAdd,
  taskDetail,
  taskOffline,
  taskOnline,
  taskUpdate,
  taskGetNameValueListByName,
  getAllNameValueListByName,
  getOnlineNameValueListByName
} from "@/api/task";
const taskStore = {
  state: {
    typeList: [],
    typeCount: 0,
    list: [],
    count: 0
  },
  getters: {
    taskTypeList: state => state.typeList,
    taskTypeCount: state => state.typeCount,
    taskList: state => state.list,
    taskCount: state => state.count
  },
  mutations: {
    SETSTATE(state, obj) {
      Object.keys(obj).forEach(key => {
        state[key] = obj[key];
      });
    }
  },
  actions: {
    // 获取任务分类列表
    getTaskTypeList({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskGroupList(data)
          .then(response => {
            const data = response.data;
            commit("SETSTATE", {
              typeList: data.records,
              typeCount: data.total
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskGroupDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        taskGroupDetail(id)
          .then(response => {
            const data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskGroupAdd({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskGroupAdd(data)
          .then(response => {
            const data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskGroupOffline({ commit }, id) {
      return new Promise((resolve, reject) => {
        taskGroupOffline(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskGroupOnline({ commit }, id) {
      return new Promise((resolve, reject) => {
        taskGroupOnline(id)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskGroupUpdate({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskGroupUpdate(data)
          .then(response => {
            const data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getTaskList({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskList(data)
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
    taskAdd({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskAdd(data)
          .then(response => {
            const data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        taskDetail(id)
          .then(response => {
            const data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskOffline({ commit }, id) {
      return new Promise((resolve, reject) => {
        taskOffline(id)
          .then(response => {
            const data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskOnline({ commit }, id) {
      return new Promise((resolve, reject) => {
        taskOnline(id)
          .then(response => {
            const data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskUpdate({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskUpdate(data)
          .then(response => {
            const data = response.data;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    taskGetNameValueListByName({ commit }, data) {
      return new Promise((resolve, reject) => {
        taskGetNameValueListByName(data)
          .then(response => {
            const data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getAllNameValueListByName({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAllNameValueListByName(data)
          .then(response => {
            const data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getOnlineNameValueListByName({ commit }, data) {
      return new Promise((resolve, reject) => {
        getOnlineNameValueListByName(data)
          .then(response => {
            const data = response.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default taskStore;
