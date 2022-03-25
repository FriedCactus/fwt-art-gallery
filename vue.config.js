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
});
