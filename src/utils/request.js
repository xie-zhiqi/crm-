// 配置axios
import axios from "axios"
import aa, { Message, MessageBox, Loading } from 'element-ui';
// console.log(aa)
import storage from "@/utils/storage"
let http = axios.create({
    baseURL: "/api",
    // 超时设置
    timeout: 5000,
    withCredentials: true, // 携带凭证 cookie
})

// 全局请求拦截拦截器  对接口的请求批量进行统一处理
let fullScreenLoading = null
http.interceptors.request.use(config => {
    // 先获取本地的tokne，然后携带给后端
    let token = storage.get('token');
    // console.log(config)
    config.headers['Authorization'] = token;

    if (config.url.indexOf("login") !== -1 || config.url.indexOf("wechatLogin") !== -1) {
        fullScreenLoading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    // config就是所有的请求配置
    return config // 放行
})


// 全局响应拦截 统一对错误进行处理

http.interceptors.response.use(config => {

    if (fullScreenLoading) {
        fullScreenLoading.close()
        fullScreenLoading = null
    }
    // console.log("config", config)
    let { msg, state } = config.data
    if (config.data.msg) {
        if (!state) {
            MessageBox({
                title: "错误",
                type: "error",
                message: msg
            })
        }
    }
    // 10022 1004 这两个状态码分别对应了token过期和session过期
    // 10026 没有权限
    // 清掉本地缓存 清掉token
    let { code } = config.data;
    if (code == "10022" || code == "1004") {
        Message.error("登入过期 请重新登入")
        storage.rm("token")
        location.reload()
    }

    return config // 如果不retrun axios请求就拿不到响应结果
})

export default http;