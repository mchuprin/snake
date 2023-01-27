module.exports = {
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/main.scss";'
      }
    }
  }
}
