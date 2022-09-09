<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" align="center" label="产品图片" width="180">
            <template v-slot="{row}">
                <el-avatar shape="square" :size="60" :src="row.imageUrl"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column prop="productName" align="center" label="产品名称" width="200">
        </el-table-column>
        <el-table-column prop="description" align="center" label="产品描述" width="200">
        </el-table-column>
        <el-table-column prop="price" align="center" label="价格(元)" width="200">
        </el-table-column>
        <el-table-column prop="inventory" align="center" label="库存" width="200">
        </el-table-column>
        <el-table-column prop="address" align="center" label="操作">
            <template v-slot="{row}">
                <el-button type="success" @click="pre_order(row)" icon="iconfont icon-vip3">点击充值</el-button>
            </template>

        </el-table-column>
    </el-table>
</template>
  
<script>
import * as api from "@/api/transaction"
export default {
    data() {
        return {
            squareUrl: "",
            tableData: [],
        }
    },
    methods: {
        errorHandler() {
            return true
        },
        getVipList() {
            api.getVipList()
                .then(res => {
                    console.log(res.data)
                    this.tableData = res.data.data
                })
        },
        pre_order(e) {
            console.log(e)
        }
    },
    created() {
        this.getVipList()
    },
    meta: {
        title: "vipCharge",
        name: "vip充值",
        icon: "iconfont icon-chongzhi"
    }
}
</script>
<style scoped lang="less">
/deep/.el-avatar {
    background-color: #fff;
    width: 60px !important;
    height: 25px !important;

    img {
        width: 60px;
        height: 20px !important;
    }
}
</style>