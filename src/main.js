import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "@/router";
import showMessage from "./utils/showMessage";
import "@/Mock";
import vLoading from "@/directives/loading";

Vue.directive("loading", vLoading);
Vue.prototype.$showMessage = showMessage;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
