const path = require('path');
const publicPath = '/child/app-op/';

module.exports = {
  publicPath: publicPath,
  devServer: {
    // 监听端口
    port: 60000,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/ecs_business': {
        // target: '10.131.165.157:8001',
        target:'http://cos-ecs-business.gic.pre',
        // target:'http://ecs-business.gic.test',
        ws: true,
        changeOrigin: true
      },
      '/monitor/api': {
        // target: 'http://cloudos-op-metricsapi.gic.test',
        target: 'http://cloudos-op-metricsapi.gic.pre',
        changeOrigin: true,
        pathRewrite: {
          '^/monitor/api': '/api'
        }
      },
      '/gpu_monitor/api': {
        target: 'http://106.3.146.195:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/gpu_monitor/api': '/api'
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
  configureWebpack: config => {
    config.module.rules.filter(rule => {
      return rule.test.toString().indexOf("scss") !== -1;
    })
    .forEach(rule => {
      rule.oneOf.forEach(oneOfRule => {
        oneOfRule.use.splice(oneOfRule.use.indexOf(require.resolve('sass-loader')), 0,
          { loader: require.resolve("css-unicode-loader")})
      })
    })
  },
  configureWebpack: {
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: "AppOp",
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
      jsonpFunction: `webpackJsonp_AppOp`,
    }
  },
  chainWebpack: (config) => {
    config.module
    .rule('fonts')
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 4096, // 小于4kb将会被打包成 base64
      fallback: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:8].[ext]',
          publicPath,
        },
      },
    })
    .end();
  }
}
