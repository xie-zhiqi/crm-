<template>
    <el-aside width="200">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" text-color="#4e5bf8" ref="sideMenu"
            active-text-color="#E47833" :collapse="isCollapse">
            <!-- //我们的组件 -->
            <qf-sub-menu :sideMenu='$store.state.permission.userMenu'></qf-sub-menu>
        </el-menu>
    </el-aside>

</template>
<script>
export default {
    data() {
        return {
            isCollapse: false
        }
    }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>