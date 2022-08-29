// 配置axios
import axios from "axios"

let http = axios.create({
    baseURL: "/api",
    // 超时设置
    timeout: 5000,
    withCredentials: true, // 携带凭证 cookie
})

// 全局请求拦截拦截器  对接口的请求批量进行统一处理
axios.interceptors.request.use(config => {
    // config就是所有的请求配置
    return config // 放行
})


// 全局响应拦截 统一对错误进行处理

axios.interceptors.response.use(config => { 
    return config // 如果不retrun axios请求就拿不到响应结果
})

export default http;