const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  lintOnSave: false,
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: undefined,

  pwa: {
    name: `Vue Keyrune`,
    themeColor: `#284558`
  },

  configureWebpack: config => {
    if (!config.output.libraryTarget) {
      return { plugins: [new FaviconsWebpackPlugin('./public/favicon.svg')] }
    }
  }
}
