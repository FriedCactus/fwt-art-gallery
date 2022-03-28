const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "/fwt-art-gallery/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
      `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("svg");
    config.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
});
