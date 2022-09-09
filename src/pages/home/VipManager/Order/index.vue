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
                <el-button type="primary" align="center" icon="iconfont icon-chongzhi"
                    v-hasPay="[row.pay_status,row.order_status]" @click="handleEdit(scope.$index, scope.row)">去支付
                </el-button>
                <el-button type="danger" icon="el-icon-delete" align="center"
                    @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
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
    directives: {
        hasPay: {
            inserted(el, binding) {
                let [pay_status, order_status] = binding.value;
                // 先保存当前按钮类名
                let className = el.className;
                // 当pay_status不是0的时候
                // order_status不是1的时候
                // 禁用按钮
                // order_status 0未提交 1已提交 2已经取消 3无效订单 4交易关闭 5退货
                if (pay_status !== 0 || order_status !== 1) {
                    el.disabled = true; // 禁用按钮
                    el.className = className + "primary";
                }
            }
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

/deep/.cell {
    display: flex !important;
    justify-content: center;
    align-content: space-around;
    flex-direction: column;
}
</style>