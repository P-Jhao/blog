import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "@/router";
import showMessage from "./utils/showMessage";
import "@/Mock";
import store from "./store";
//初始加载全局仓库
store.dispatch("setting/fetchSetting");

//设置全局指令
import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);
//添加事件总线
import "./eventBus";
//添加弹窗组件
Vue.prototype.$showMessage = showMessage;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
