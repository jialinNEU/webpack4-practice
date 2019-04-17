const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  // 若遇到lodash，则忽略，不打包到library中。使用该library中，需要单独引入lodash
  externals: {
    // lodash: lodash表示不论什么环境下引入都必须叫lodash
    lodash: 'lodash',
    /*
    lodash: {
      // lodash通过全局script标签引入，注入变如 '_'
      root: '_',
      // 若lodash在commonjs环境下被使用，lodash被加载的时候必须是lodash
      // 即：const lodash = require('lodash');
      commonjs: 'lodash'
    }
    */
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    // 支持script标签，引入后挂在到全局变量library上
    library: 'library',
    // 支持commonjs，amd或直接import，都可以成功引入
    // 其他值：'this'或'window'，表示挂载到当前的this/window上，可以通过this.library获取
    // Nodejs：'global'
    libraryTarget: 'umd',
  }
};