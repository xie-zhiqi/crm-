import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
import router from "./utils/routerGuard"
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/iconfont/iconfont.css"
import "@/assets/style/common.css"
import qfSubMenu from "qf-sub-menu" //引入我们的组件
//使用Vue.use()将组件注入到所有的子组件
Vue.use(qfSubMenu)
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
