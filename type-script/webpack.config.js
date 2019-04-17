const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: '/\.tsx?$/',
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  }
};