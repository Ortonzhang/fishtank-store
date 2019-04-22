import Vue from "vue";

import iView from "iview";
import "iview/dist/styles/iview.css";
import "./styles/app.scss";
import "./styles/libs/font-awesome-4.7.0/css/font-awesome.min.css";
import JsonViewer from "vue-json-viewer";
import App from "@/App";
import router from "@/router";
import store from "@/store";
import "./utils/filter";
import mixins from "./utils/mixin";
import "./components";
import "./components/ueditor";
Vue.use(iView);
Vue.mixin(mixins);
// Vue.use(JsonViewer);
Vue.config.productionTip = false;

Vue.config.errorHandler = err => {
  console.log(err);
};

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
