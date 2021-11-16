const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://v5wwje.natappfree.cc",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
// const proxy = require('http-proxy-middleware')
// module.exports = function(app) {
//   app.use(
//     proxy('/api', {
//       target: 'http://z9h2cw.natappfree.cc', //配置转发目标地址
//       changeOrigin: true, //控制服务器接收到的请求头中host字段的值
//       pathRewrite: {'^/api': ''} //去除请求前缀址(必须配置)
//     }),
//   )
// }
