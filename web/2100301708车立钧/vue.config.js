const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false ,//关闭语法检查
  devServer: {
          host: 'localhost',
          port:8080,//端口号 
          open:true,
    proxy: {
    '/api':{
      target: 'http://web118.vipgz6.91tunnel.com',
      ws:false,
      changeOrigin: true,
      pathRewrite:{
        '^/api':''
      }
    },
  }
}
})
