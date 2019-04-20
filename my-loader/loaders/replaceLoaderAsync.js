// 官方推荐的获取options参数的工具
const loaderUtils = require('loader-utils');

module.exports = function (source) {
  // 通过this.query获取webpack配置中options中的参数
  /*
  console.log(this.query);
  return source.replace('Eddie', this.query.name);
  */

  const options = loaderUtils.getOptions(this);

  // 异步操作async
  /*
  const callback = this.async();  // return this.callback
  setTimeout(() => {
    const result = source.replace('Eddie', options.name);
    callback(null, result);
  });
  */


  // 直接使用callback
  const result = source.replace('Eddie', options.name);
  // err, content, sourceMap?, meta?
  // 等价于使用return，相对于return可以传递额外的信息
  this.callback(null, result);
}