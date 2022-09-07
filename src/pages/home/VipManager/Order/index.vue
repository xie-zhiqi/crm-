<template>
    <el-table :data="orderData" border style="width: 100%">
        <el-table-column prop="tableData" align="center" label="产品图片" width="100">
            <!-- 插槽作用域 -->
            <template v-slot="scope">
                <el-avatar shape="square" :size="80" fit="scale-down" :src="scope.row.orderDetail[0].imageUrl">
                </el-avatar>
            </template>
        </el-table-column>
        <el-table-column prop="order_id" align="center" label="订单编号" width="280">
        </el-table-column>
        <el-table-column prop="orderDetail[0].productName" align="center" label="产品名称" width="100">
        </el-table-column>
        <el-table-column prop="orderDetail[0].quantity" align="center" label="数量" width="100">
        </el-table-column>
        <el-table-column prop="total_fee" align="center" label="总价格" width="100">
        </el-table-column>
        <el-table-column prop="create_time" align="center" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="pay_status" align="center" label="支付状态" width="100">
            <template v-slot="{row}">
                {{row.pay_status===1?"已支付":"未支付"}}
            </template>
        </el-table-column>
        <el-table-column align="center" prop="order_status" label="订单状态" width="100">
            <template v-slot="{row}">
                <span v-if="row.order_status==0">未提交</span>
                <span v-else-if="row.order_status==1">提交成功</span>
                <span v-else-if="row.order_status==2">已经取消</span>
                <span v-else-if="row.order_status==3">无效订单</span>
                <span v-else-if="row.order_status==4">交易关闭</span>
                <span v-else-if="row.order_status==5">退货</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template v-slot="{row}">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import * as api from "@/api/transaction"
export default {
    data() {
        return {
            orderData: []
        }
    },
    meta: {
        title: "order",
        name: "订单管理",
        icon: "iconfont icon-dd"
    },
    methods: {
        handleEdit() { },
        handleDelete() { },
        getOrderList() {
            api.getOrderApi()
                .then(res => {
                    console.log(res.data)
                    this.orderData = res.data.data
                })
        }
    },
    created() {
        // 获取
        this.getOrderList()
    }
}
</script>

<style scoped lang="less">
/deep/.el-avatar {
    text-align: center;
    display: flex;
    align-items: center;
    background-color: #ffffff;
}

/deep/.el-avatar>img {
    height: 30% !important;
    text-align: center;
}
</style>