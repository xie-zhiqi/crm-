<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import * as api from "@/api/permission"
export default {
  mounted() {
    api.getMenuListApi()
      .then(res => {
        console.log(res)
      })
  }
}
</script>