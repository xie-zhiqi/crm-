
import http from "@/utils/request"

// 获取验证码
export let getCaptcha = () => http.get("/users/getCaptcha")


// 校验验证码

export let verification = (captcha) => http.get("/users/verifyCaptcha", {
    params: {
        captcha,
    }
})

// 登录
export let loginApi = (username, password) => http.post("/users/login", {
    username,
    password
})

// 获取二维码
export let getQrcode = sid => http.get("/users/getQrcode", {
    params: {
        sid
    }
})

// 二维码登入
export let wechaLoginApi = wechatCode => http.get("/users/wechatLogin", {
    params: {
        wechatCode
    }
})

// 获取手机验证码
export let getsmsCode = phoneNumber => http.post("/sms/send", {
    phoneNumber
})


// 手机验证码登入
export let smsLogin = code => http.post("/users/login?type=sms", {
    code
})