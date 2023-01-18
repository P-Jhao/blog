import Vue from "vue";
const app = new Vue({});
/**
 * 1.事件名: mainScroll
 * 含义: 主区域滚动条位置变化后触发
 * 参数:
 * - 滚动的dom,如果传入的是undefined，则表面已无dom
 *
 * 2.事件名: setMainScroll
 * 含义: 设置主区域滚动条位置
 * 参数:
 * - 触发后滚动到的位置
 */
Vue.prototype.$bus = app;
export default app;
