import Vue from "vue";
import { Store, install } from "vuex";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";
install(Vue);

export default new Store({
  modules: {
    banner,
    setting,
    about,
    project,
  },
  strict: true,
});
