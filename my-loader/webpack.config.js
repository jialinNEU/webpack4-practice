const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },

  // 使用Loader时候，帮助寻找Loader位置
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },

  module: {
    rules: [{
      test: /\.js/,
      use: [
        {
          loader: 'replaceLoader.js',
        },
        {
          loader: 'replaceLoaderAsync.js',
          options: {
            name: 'Gao'
          } 
        }
      ]
    }]
  }
}