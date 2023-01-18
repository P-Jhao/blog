//vue-cli配置文件
module.export = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://test.myBlog.com",
      },
    },
  },
  configureWebpack: require("./webpack.config"),
};
