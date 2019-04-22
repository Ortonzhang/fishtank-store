module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: process.env.outputDir,
  assetsDir: "static",
  productionSourceMap: false,
  runtimeCompiler: true,
  chainWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.output.filename("[name].[hash].js").end();
    }

    config.module
      .rule("eslint")
      .use("eslint-loader")
      .loader("eslint-loader")
      .tap(options => {
        options.fix = true;
        return options;
      });
  },
  devServer: {
    proxy: {
      "/pc": {
        // target: "https://api.jinliqb.com/",
        // target: "http://192.168.49.75:9666/", // 开发
        target: "http://47.244.142.68:9667/", // 测试
        changeOrigin: true
        // pathRewrite: {
        //   "^/test": "/test"
        // }
      }
    }
  }
};
