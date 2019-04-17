const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');



module.exports = {
  // 打包文件入口
  entry: {
    main: './src/index.js',
  },

  output: {
    // 位置（绝对路径）
    path: path.resolve(__dirname, '../dist'),

    // publicPath: '/',
  },


  // Webpack默认打包js文件，当遇到其他类型文件时，Webpack前往module寻找方案
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'},
          {loader: 'imports-loader?this=>window'}
        ],
      },

      {
        test: /\.(jpg|png|gif)$/,
        // files to include
        // include: '',
        use: {
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            // 保留图片文件原有名字，[name]等叫做placeholder，见file-loader文档
            // 资源最终路径为：output.publicPath + '[name]_[hash].[ext]'
            name: '[name]_[hash].[ext]',
            // 将打包好的文件放入到dist/images中
            outputPath: 'images/',
            // 默认是webpack配置文件所在的绝对路径，使用其他路径让Webpack配置不依赖于当前系统环境
            // context: path.resolve(__dirname, 'app'),

            // 小于10240字节，使用url-loader；否则使用file-loader的模式，打包到文件夹中
            limit: 10240
          }
        }
      },

      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    /* 
      All files inside webpack's output.path directory will be removed once, but the
      directory itself will not be. If using webpack 4+'s default configuration,
      everything under <PROJECT_DIR>/dist/ will be removed.
    */
    // 默认是remove的是output.path
    // Use cleanOnceBeforeBuildPatterns to override this behavior.
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      // 当在一个模块中发现有‘$’，那么会自动引入jquery这个模块
      $: 'jquery',
      _: 'lodash',
      // 将lodash下的join方法打包放入模块
      _join: ['lodash', 'join']
    }),
  ],

  optimization: {
    // tree shaking
    usedExports: true,

    splitChunks: {
      // 'all'表示同步+异步，'async'表示对异步代码进行分割，'initial'表示对同步代码进行分割
      /*
        当处理同步的代码分割的时候，webpack会查看cacheGroups里的内容
        若是来自node_modules，那么打包到vendors；否则进入default中
      */
      chunks: 'all',
      // 进行代码分割的最小文件大小
      minSize: 30000,
      maxSize: 0,
      // 第三方库被打包出的文件要求至少被引入1次，那么对它进行代码分割
      minChunks: 1,
      // 针对每个页面，最多有5个异步请求
      maxAsyncRequests: 5,
      // 若入口文件多余3个，那么webpack至多分出3个文件
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      // 允许下面的vendors和default定义filename属性的值
      name: true,
      cacheGroups: {
        // vendors: false,
        // default: false,
        vendors: {
          // 测试该文件是否在node_modules文件夹下
          test: /[\\/]node_modules[\\/]/,
          // 根据priority的值判断，引入的文件被代码分割后打包到哪个文件中去
          priority: -10,
          name: 'vendors'
        },

        default: {
          // 不受任何设置的限制
          // enforce: true,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common'
        }

      }
    }
  },

  // 不提示性能问题
  performance: false,
}