const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

const prodConfig = {

  // 打包好的文件
  output: {
    // 名字，默认为main.js(与entry相同)
    filename: '[name].[contenthash:6].js',
    // 为代码分割后的文件命名，如果filename没有被设置值的话
    chunkFilename: '[name].[contenthash:6].chunk.js',
  },

  // production压缩代码
  mode: 'production',
  // 开启SourceMap，cheap-module-source-map模式会生成单独的map文件（不被发布）
  devtool: 'cheap-module-source-map',

  module: {
    rules: [{
        test: /\.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // scss文件中通过import的scss文件也要经过sass-loader和postcss-loader
              // 若不加，则不会经过下面的两个loader
              importLoaders: 2,
              // 开启CSS的模块化打包，使得css只作用于当前模块
              // 在js文件中，使用style['className']或style.className来应用样式
              modules: true,
              // 定制哈希类名，将修改.title的值，默认是[hash:base64]
              localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // 若打包的文件被直接引用，则会走filename
      filename: '[name].css',
      // 若是间接被引用(异步），则会走chunkFilename
      chunkFilename: '[name].chunk.css'
    })
  ],

  optimization: {
    minimizer: [
      // js minimizer
      new TerserJSPlugin({
        sourceMap: true,
      }),
      // css minimizer
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}

module.exports = merge(commonConfig, prodConfig);