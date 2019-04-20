class CopyrightWebpackPlugin {
  constructor (options) 
  {
    // 接受webpack配置文件中传入的参数
    console.log(options, '\n');
  }
  
  // compiler是webpack的一个实例，存储所有配置
  apply(compiler) {
    // compiler里的hooks指的是某些时刻，在这些时刻会自动执行的某些工作

    // compile是一个同步时刻
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('compile hook');
    });

    // emit是一个异步时刻
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
      // compilation存放与本次打包的相关配置，打包生成的内容放在compilation.assets中
      // console.log(compilation.assets);
      debugger;
      compilation.assets['copyright.txt'] = {
        source: function() {
          return 'copyright by eddie';
        },
        size: function() {
          return 18;
        }
      }
      callback();
    })
  }
}

module.exports = CopyrightWebpackPlugin;