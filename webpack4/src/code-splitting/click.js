function handleClick(text) {
  const element = document.createElement('div');
  element.innerHTML = text;
  document.body.appendChild(element);
}

export default handleClick;