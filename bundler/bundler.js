const fs = require('fs');
const path = require('path');
// 用于分析代码
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

/** 单个模块分析器 */
const moduleAnalyzer = (filename) => {

  // 获取文件内容
  const content = fs.readFileSync(filename, 'utf-8');

  // 根据js代码获取ast
  const ast = parser.parse(content, {
    // es6
    sourceType: 'module'
  });

  // 存储依赖
  const dependencies = {};
  traverse(ast, {
    // ast的节点type名称作为函数名
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      // node.source.value存放import的文件的相对路径
      const newFile = path.join(dirname, node.source.value);
      dependencies[node.source.value] = newFile;
    }
  });

  // 对源代码进行编译，es6转为浏览器可识别的js代码
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  });

  return {
    filename,
    dependencies,
    code
  }
}

/** 生成依赖图 */
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyzer(entry);
  const graphArr = [ entryModule ];
  for (let i = 0; i < graphArr.length; i++) {
    const item = graphArr[i];
    // 对象解构
    const { dependencies } = item;
    if (dependencies) {
      for (let j in dependencies) {
        graphArr.push(moduleAnalyzer(dependencies[j]));
      }
    }
  }
  
  // 存储到新的数据结构中
  const graph = {};
  graphArr.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  });

  return graph;
};


/** 生成代码 */
const generateCode = (entry) => {
  // 做JSON序列化处理，使得graph可以被literal template使用
  const graph = JSON.stringify(makeDependenciesGraph(entry));

  // 将代码放在闭包里执行，避免形象外部变量
  // 需要将graph中的相对路径转换为绝对路径
  return `
    (function(graph){
      function require(module) {

        // 递归调用
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }

        var exports = {};

        (function(require, exports, code) {
          eval(code);
        })(localRequire, exports, graph[module].code);

        return exports;
      };

      require('${entry}');
    })(${graph})
  `;
}


const code = generateCode('./src/index.js');
console.log(code);