const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

// 获取webpack的编译器，每次执行都会重新打包代码
const complier = webpack(config);

const app = express();

app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}));


app.listen(3000, () => {
  console.log('Server is running on 3000')
});