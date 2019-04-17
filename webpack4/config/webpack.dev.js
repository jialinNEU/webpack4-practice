const webpack = require('webpack');
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common');

const devConfig = {

  // 打包好的文件
  output: {
    // 名字，默认为main.js(与entry相同)
    filename: '[name].js',
    // 为代码分割后的文件命名，如果filename没有被设置值的话
    chunkFilename: '[name].chunk.js',

  },

  // development不压缩代码
  mode: 'development',
  // 开启SourceMap，cheap-module-eval-source-map模式提示错误比较全，打包速度比较快，不生成.map文件
  devtool: 'cheap-module-eval-source-map',
  // WebpackDevServer
  devServer: {
    // 启用的服务器的根路径
    contentBase: './dist',
    // 启动devServer的时候，自动打开一个浏览器，并自动访问服务器地址
    open: true,
    // 自定义端口，默认8080
    port: 8080,
    // 跨域接口代理
    proxy: {
      // 当访问localhost:8080/api的时候，会被自动转发到localhost:3000
      '/api': 'http://localhost:3000'
    },
    // publicPath: '/',
    // 开启Hot Module Replacement
    hot: true,
    // 即使HMR不生效，浏览器也不刷新
    // hotOnly: true
  },

  /*
  optimization: {
    usedExports: true
  },
  */

  module: {
    rules: [{
        test: /\.scss$/,
        use: [
          'style-loader',
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
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

}

module.exports = merge(commonConfig, devConfig);