function compose(str, obj) {
  const replacer = x => x === ':' ? '=' : x === ',' ? '&' : '';
  return str.concat('?', JSON.stringify(obj).replace(/{|}|"|:|,/g, replacer));
}

export async function request(endpoint, params) {
  const root = 'https://yts.mx/api/v2/'.concat(endpoint);
  const value = params ? compose(root, params) : root;
  const response = await fetch(value);
  return await response.json();
}

function createElement(type, props, content) {
  const element = document.createElement(type);
  for (const key in props) { element.setAttribute(key, props[key]) }
  return content ? element.textContent = content : element;
}

export function render(data, element, template) {
  const loader = document.querySelector('.loader');
  const create = createElement('div', { class: 'loader' });
  data ? loader.remove() & data.map(item => {
    element.innerHTML += template(item);
  }) : element.append(create);
}

export function failed(error) {
  const { document: { body } } = window;
  body.children.remove();
}

export function rating(value) {
  return 300 - value * 100 / 10 * 3;
}

export function hours(time) {
  const root = time / 60;
  const hours = Math.floor(root);
  const float = root.toFixed(2).slice(2);
  const min = Math.round(float * 60 / 100);
  return time ? ` - ${hours}h ${min}min` : '';
}