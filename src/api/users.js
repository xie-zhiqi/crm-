
import http from "@/utils/request"

// 获取验证码
export let getCaptcha = () => http.get("/users/getCaptcha")


// 校验验证码

export let verification = (captcha) => http.get("/users/verifyCaptcha", {
    params: {
        captcha
    }
})

// 登录
export let loginApi = (username, password) => http.post("/users/login", {
    username,
    password
})

