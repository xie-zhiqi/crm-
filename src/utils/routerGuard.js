import router from "@/router"
import storage from "./storage"
import store from "@/store"
// 使用封装的storage方法判断存取的token 如果本地里面有token就直接使用next()放行
router.beforeEach((to, from, next) => {
    let token = storage.get("token");
    // console.log(to)
    if (token) {
        // next()
        // 判断用户是否有用户菜单
        if (!store.state.permission.userMenu.length) {
            // 发起请求，获取远程菜单
            store.dispatch("permission/FETCH_MENU_LIST")
                .then(() => {
                    // 这里要注意，next里面要传参既要进入的页面的路由信息
                    // 因为next传参数后，当前要进入的路由会被废止，转而进入
                    // 转而进入参数对应的路由，虽然是用一个路由
                    // 这么做主要是为了确保addRoute生效了，并且不会产生历史记录
                    next({ path: to.path, replace: true })
                })
        } else {
            next()
        }
    } else {
        // 代码走到这里就是
        // 1，访问的是login页面
        if (to.path === "/login") {
            next()
        } else {
            // 2.访问的不是登入页，强行调回登入页
            next({ path: "/login" })
        }
    }
    // to 目标路由对象,to里面有一个属性path可以拿到当前页面的路径,使用path判断在那个页面
    // from 源路由对象
    // next 是个函数 调用之后 可以理解为放行，里面可以传参 对象 穿path是强制跳转
})

export default router