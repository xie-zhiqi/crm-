import http from "@/utils/request"

export let getOrderApi = () => http.post("/order/get_order")