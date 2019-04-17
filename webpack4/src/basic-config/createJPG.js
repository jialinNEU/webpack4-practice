var jpg = require('./img_jpg.jpg');

function createJPG() {
  var img = new Image();
  img.src = jpg;
  img.classList.add('jpg');

  var root = document.getElementById("root");
  root.append(img);
}

export default createJPG;