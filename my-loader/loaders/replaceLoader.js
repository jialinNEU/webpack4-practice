// 官方推荐的获取options参数的工具
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  const result = source.replace('Gao', 'Cookie');
  return result;
}