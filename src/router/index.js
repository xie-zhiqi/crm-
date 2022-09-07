import Vue from "vue";
import VueRouter from "vue-router";
// import routess from "./generateRoutes"
import allRouter from "@/router/staicRoutes"
// import dynamicRoute from "./dynamicRoutes"
Vue.use(VueRouter);
//解决路由导航到统一路径重复报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    console.log(err.toString())
  })
}
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
  // ...routess
  ...allRouter,
  // dynamicRoute
];

const router = new VueRouter({
  routes,
});

export default router;
