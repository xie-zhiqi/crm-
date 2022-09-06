import * as api from "@/api/permission"
import allRoutes from "@/router/generateRoutes"
import recusionRoutes from "@/router/recursionRoutes"
// 引入路由
import router from "@/utils/routerGuard"
// 引入动态路由
import dynamicRoute from "@/router/dynamicRoutes"
let routes = allRoutes.find(route => route.name === "home")
export default {
    namespaced: true,
    state: {
        userMenu: []
    },
    getters: {},
    mutations: {
        // 设置用户菜单
        SET_USER_MENU(state, payload) {
            state.userMenu = [...payload]
            // 动态添加路由，使用router.addRoue这个方法
            dynamicRoute.children = [...payload]
            router.addRoute(dynamicRoute)
        }
    },
    actions: {
        FETCH_MENU_LIST({ commit }) {
            return api.getMenuListApi()
                .then(res => {
                    // console.log(res.data.menuList)
                    let userMenu = recusionRoutes(res.data.menuList, routes.children)
                    commit("SET_USER_MENU", userMenu)
                })
        }
    },
    modules: {},
};
