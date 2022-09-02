import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../pages/login/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/*webpackChunkName:"home"*/"@/pages/home")
  },
  {
    path: "/login",
    component: () => import(/*webpackChunkName:"log"*/"@/pages/login"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
