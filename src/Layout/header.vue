<template>
    <el-row type="flex" class="row-bg">
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light">
                <h1>CRM管理系统</h1>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
</template>
<style scoped lang="less">
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #082245;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    // background: #e5e9f2;
    color: white;
    font-size: 25px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    // background: linear-gradient(cyan, black);
    padding: 10px 0;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}
</style>