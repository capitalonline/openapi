module.exports = {
  devServer: {
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://10.128.22.12:9000',
        ws: true,
        changeOrigin: true
      },
    }
  },
}