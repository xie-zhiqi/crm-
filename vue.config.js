const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    proxy: {
      "/api": {
        target:process.env.VUE_APP_BASE_URL,
        // target:"http://chst.vip",
        // 路径重写
        pathRewrite: {
          "^/api":""
        }
      }
    }
  }
});
