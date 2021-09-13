const path = require('path');

module.exports = {
  publicPath: '/child/app-sp/',
  devServer: {
    // 监听端口
    port: 50000,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/ecs_business': {
        // target: '10.131.165.157:8001',
        target:'http://ecs-business.gic.test',
        ws: true,
        changeOrigin: true
      },
      '/monitor/api': {
        target: 'http://cloudos-metricsapi.gic.test',
        changeOrigin: true,
        pathRewrite: {
          '^/monitor/api': '/api'
        }
      },
      '/alarm/api': {
        target: ' http://cloudos-metricsalarm.gic.test',
        // target:'http://10.131.162.69:8001',
        changeOrigin: true,
        pathRewrite: {
          '^/alarm/api': '/api'
        }
      },
      '/api': {
        target: 'http://10.128.22.18:9000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: "AppSp",
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
      jsonpFunction: `webpackJsonp_AppSp`,
    }
  }
}