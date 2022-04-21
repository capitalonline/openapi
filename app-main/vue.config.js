module.exports = {
  devServer: {
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/ecs_business': {
        // target: '10.131.165.157:8001',
        target:'http://ecs-business.gic.test',
        ws: true,
        changeOrigin: true
      },
      '/monitor/api': {
        target: 'http://cloudos-op-metricsapi.gic.test',
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
          name: 'fonts/[name].[hash:8].[ext]'
        },
      },
    })
    .end();
  }
}