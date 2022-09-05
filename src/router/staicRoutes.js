// 静态路由

import allRoutes from "@/router/generateRoutes"

let loginRoute = allRoutes.find(item => item.path === "/login")
let page404Route = allRoutes.find(item => item.path === "*")
// console.log(loginRoute)
// console.log(page404Route)
export default [loginRoute, page404Route]