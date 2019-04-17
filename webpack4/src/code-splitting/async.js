// 异步任务

function getComponent() {
  // {default: _},引入的lodash库被放到变量"_"中
  // magic comment对分割后文件进行重命名：import(/* webpackChunkName: "lodash" */ 'lodash').then...
  return import(/* webpackChunkName: "lodash" */'lodash').then(({default: _}) => {
    const elem = document.createElement('div');
    elem.innerHTML = _.join(["Eddie", "Gao"], "-");
    return elem;
  });
}


// 异步任务的不同写法
async function getComponent2() {
  const {default: _} = await import(/* webpackChunkName: "lodash" */'lodash')
  const ele = document.createElement('div');
  ele.innerHTML = _.join(["Cookie", "Panda"], "-");
  return ele;
}



// 点击页面后加载lodash模块（懒加载）
var res = function() {
  document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */'./click').then(({default: func}) => {
      func("Eddie Gao");
    });
    /*
    getComponent().then((elem) => {
      document.body.appendChild(elem);
    });
    getComponent2().then((ele) => {
      document.body.appendChild(ele);
    });
    */
  });
}

export default res;