<template>
    <div class="layoutcont">
        <el-container>
            <Aside></Aside>
            <el-container>
                <el-header>
                    <headerlayout></headerlayout>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import headerlayout from "@/Layout/header.vue"
import Aside from "./Aside.vue";
export default {
    components: {
        headerlayout,
        Aside
    }
}

</script>
<style scoped>
.el-header,
.el-footer {
    /* background: linear-gradient(cyan, black); */
    background: linear-gradient(135deg, #4c67ff, #5635df);
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    /* background-color: #D3DCE6; */
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>