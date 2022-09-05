<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import * as api from "@/api/permission"
import recursionRoutes from "./router/recursionRoutes"
import allRoutes from "./router/generateRoutes"
let routes = allRoutes.find(item => item.name === "home")
export default {
  mounted() {
    api.getMenuListApi()
      .then(res => {
        // console.log(res)
        recursionRoutes(res.data.menuList, routes.children)
      })
    this.$store.dispatch("permission/FETCH_MENU_LIST")
  }
}
</script>