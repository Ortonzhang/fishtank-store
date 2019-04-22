import axios from "axios";
import { Notice } from "iview";
import store from "../store";
import { getToken, getUid, removeToken } from "@/utils/auth";
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // timeout: 5000 // 请求超时时间
  headers: { "Content-Type": "application/x-www-form-urlencoded" }
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers["X-ui"] = getUid();
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if (response.request.responseType != "blob" && res.status !== 0) {
      Notice.warning({
        desc: res.msg,
        title: "错误"
      });
      // 600:Token 过期了
      if (res.status === 600) {
        if (getToken()) {
          removeToken();
          localStorage.clear();
          location.hash = "#/login"; // 为了重新实例化vue-router对象 避免bug
        }
        location.hash = "#/login";
      }
      return Promise.reject("error");
    } else {
      if (response.config.headers.isToast) {
        Notice.success({
          desc: res.msg,
          type: "success"
        });
      }
      return response.data;
    }
  },
  error => {
    console.dir(error); // for debug
    Notice.warning({
      title: "错误",
      desc:
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.message ||
        "异常错误"
    });
    return Promise.reject(error);
  }
);

export default service;
