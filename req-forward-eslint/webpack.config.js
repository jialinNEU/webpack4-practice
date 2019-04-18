const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js',
  },
  devServer: {
    // 打包时出现的问题会出现在屏幕上
    overlay: true,
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true,

    // 当使用BrowserHistory的时候，使用index.html替代404 page
    historyApiFallback: true,


    // historyApiFallback: {
    //  rewrites: [{
    //    from: /\.*/,
    //    to: '/index.html'
    //  }]
    // },

    proxy: {
      '/react/api': {
        // 转发到的目标服务器
        target: 'http://www.dell-lee.com',
        // 对HTTPS的转发（target为https)
        secure: false,
        /*
        bypass: function(req, res, proxyOptions) {
          // 若请求的内容为html，那么跳过转发代理，只返回首页html
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxity for browser request');
            return false;
            // return '/index.html';
          }
        },
        */
        pathRewrite: {
          // 使用demo.json取代header.json
          'header.json': 'demo.json',
        },
        // 解决服务器对Origin的限制
        changeOrigin: true,
        // 管理多个路径代理到www.dell-lee.com
        // context: ['a', 'b']

      },
    },

  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', {
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
        force: 'pre',
      }],
    }, {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash].[ext]',
          outputPath: 'images/',
          limit: 10240,
        },
      },
    }, {
      test: /\.(eot|ttf|svg)$/,
      use: {
        loader: 'file-loader',
      },
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'sass-loader',
        'postcss-loader',
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
