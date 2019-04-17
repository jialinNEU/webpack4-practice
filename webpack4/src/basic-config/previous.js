import createJPG from './createJPG';
import counter from './counter';
import number from './number';

// css模块化
import style from './index.scss';
import './style.css';

/*

var jpg = require('./img_jpg.jpg');

createJPG();

var img = new Image();
img.src = jpg;
img.classList.add(style.jpg);

var root = document.getElementById("root");
root.append(img);

*/

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function () {
  var div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
}

counter();
number();

// 只更新特定模块，此处是number()
// css-loader底层实现了此处的代码（HMR)，无需重复
if (module.hot) {
  // 若number文件发生变化，执行callback
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'));
    number()
  });
}