const path = require('path')
const webpack = require('webpack')
const postCSSConfig = require('./postcss.config')

const host = 'localhost'
const port = 3000
const customPath = path.join(__dirname, './customPublicPath')
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true'

const baseDevConfig = () => ({
  devtool: 'eval-cheap-module-source-map',
  entry: {
    securityextension: [customPath, hotScript, path.join(__dirname, '../chrome/extension/securityextension')],
    background: [customPath, hotScript, path.join(__dirname, '../chrome/extension/background')]
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true
    },
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr'
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  postcss () {
    return postCSSConfig
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react-hmre']
      }
    },
    {
      test: /\.css$/,
      loaders: [
        'style',
        'css'
      ]
    },
    {
      test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/, loader: 'file-loader'
    }]
  }
})

const injectPageConfig = baseDevConfig()
injectPageConfig.entry = [
  customPath,
  path.join(__dirname, '../chrome/extension/inject')
]
delete injectPageConfig.hotMiddleware
delete injectPageConfig.module.loaders[0].query
injectPageConfig.plugins.shift() // remove HotModuleReplacementPlugin
injectPageConfig.output = {
  path: path.join(__dirname, '../dev/js'),
  filename: 'inject.bundle.js'
}
const appConfig = baseDevConfig()

module.exports = [
  injectPageConfig,
  appConfig
]
