/*
 * @Descripttion: 
 * @Date: 2020-06-09 14:25:36
 * @LastEditTime: 2020-06-09 14:26:41
 */ 
module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    // host: 'tf.local.msshuo.cn',
    // port: 7979, // 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      // proxy all requests starting with /api to jsonplaceholder
      '/v1': {
        target: 'http://192.168.6.250:9010', // 开发
        // target: 'http://192.168.6.235:9017', // 测试
        // target: 'http://10.7.0.189:9017',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/v1': 'v1'
        }
      }
    },
    before: app => {}
  }
}