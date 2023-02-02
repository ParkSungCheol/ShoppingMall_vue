const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  rules: {
    'vue/multi-word-component-names':'off'
  },
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
    proxy: {
      '/api':{
        target:'http://ec2-3-39-250-156.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin:true,
        pathRewrite: {
          '^/api' : ''
        }
      }
    }
  },
})
