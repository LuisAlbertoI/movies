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
  if (content) { element.textContent = content }
  return element
}

export async function render(data, element, template) {
  element.append(createElement('div', { class: 'loader' }));
  const { data: { movie_count, movies } } = await data;
  const loader = document.querySelector('.loader');
  movie_count > 0 ? loader.remove() & movies.map(movie => {
    element.innerHTML += template(movie);
  }) : loader.remove() & element.append(createElement('div', { class: 'message' }));
}

export function rating(value) {
  const increment = value * 100 / 10;
  return 300 - increment * 3;
}

export function hours(time) {
  const root = time / 60;
  const hours = Math.floor(root);
  const float = root.toFixed(2).slice(2);
  const min = Math.round(float * 60 / 100);
  return hours & min ? `${hours} h ${min} min` : hours ? `${hours} h` : min ? `${min} min` : '';
}