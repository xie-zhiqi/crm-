import http from "@/utils/request"

// 获取用户菜单
export let getMenuListApi = () => http.get("/permission/getMenuList")