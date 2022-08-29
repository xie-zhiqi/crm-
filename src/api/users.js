
import http from "@/utils/request"

// 获取验证码
export let getCaptcha = () => http.get("/users/getCaptcha")

// 登录
export let loginApi = (username, password) => http.post("/users/login", {
    username,
    password
})

