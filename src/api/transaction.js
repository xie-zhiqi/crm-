import http from "@/utils/request"

// 订单管理
export let getOrderApi = () => http.post("/order/get_order")

// 获取vip产品
export const getVipList = () => http.get("/product/get_product", {
    params: {
        category_id: "20210827165510715"
    }
})