module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/mixin.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://cpic.uat.55hudong.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/base/' : './'
}
