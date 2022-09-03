import Vue from "vue";
import VueRouter from "vue-router";
import routess from "./generateRoutes"
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   // redirect: "/",
  //   component: () => import(/*webpackChunkName:"home"*/"@/pages/home")
  // },
  // {
  //   path: "/login",
  //   component: () => import(/*webpackChunkName:"log"*/"@/pages/login"),
  // },
  ...routess
];

const router = new VueRouter({
  routes,
});

export default router;
