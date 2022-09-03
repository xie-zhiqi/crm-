import router from "@/router"
import storage from "./storage"
// 使用封装的storage方法判断存取的token 如果本地里面有token就直接使用next()放行
router.beforeEach((to, from, next) => {
    let token = storage.get("token");
    // console.log(to)
    if (token) {
        next()
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