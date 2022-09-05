// 目的 以前访问/home能够访问到布局组件 现在希望访问/ 就能访问到布局组件
import allRoutes from "./generateRoutes"
let tareget = allRoutes.find(item => item.name === "home")
let dynamicRoute = {
    path: "/",
    children: [],
    component: () => import(/*webpackChunkName:"layout" */"@/Layout/container.vue")
}
export default dynamicRoute