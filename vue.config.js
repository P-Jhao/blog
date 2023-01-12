//vue-cli配置文件
module.export = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.zhihu.com",
      },
    },
  },
};
