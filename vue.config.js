const { defineConfig } = require("@vue/cli-service");
// 配置环境变量的时候，不要写成这种格式的 VUE_APP_BASE_URL 要吧BASE_URL中间的下划线去掉
let baseURL = process.env.VUE_APP_BASEURL
// console.log(process.env)
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    proxy: {
      "/api": {
        target: baseURL,
        pathRewrite: {  // 路径重写
          "^/api": ""
        }
      }
    }
  }
});
