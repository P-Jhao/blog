import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

if (!window.VueRouter) {
  Vue.use(VueRouter);
}

export default new VueRouter({
  routes,
  mode: "history",
});
