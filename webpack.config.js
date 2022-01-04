const { manifest, entry } = require('./extension.config')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin")

const isProd = process.env.NODE_ENV === 'production'

const output = {
  path: path.resolve(__dirname, './dist'),
}

const plugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: './index.html'
  }),
  new CopyPlugin({
    patterns: [
      { from: "src/assets/img/logo16.png" },
      { from: "src/assets/img/logo48.png" },
      { from: "src/assets/img/logo128.png" },
    ],
  }),
  new MiniCssExtractPlugin(),
  new GenerateJsonPlugin('manifest.json', manifest)
]

const rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.scss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
    ],
  },
]

const config = {
  entry,
  output,
  module: { rules },
  plugins,
  experiments: {
    topLevelAwait: true,
  },
}

if (!isProd) {
  config.devtool = 'source-map'
}

module.exports = config