import { request, render, rating, hours } from './main.js';
const animation = document.getElementById('animation');
const trending = document.getElementById('trending');
const action = document.getElementById('action');

const Template = data => {
  return `
    <div class="card">
      <div class="figure">
        <a href="/details?${data.id}">
          <img src="${data.large_cover_image}" alt="${data.title}">
        </a>
      </div>
      <div class="details">
        <a href="/details?${data.id}" class="title">${data.title}</a>
        <span>(${data.year}) • ${hours(data.runtime)}</span>
        <div class="rating">
          <div class="progress">
            <h3 class="value">${data.rating}</h3>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="45" stroke-dashoffset="${rating(data.rating)}" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function precaching(key) {
  const localData = window.sessionStorage.getItem(key);
  if (localData) { return JSON.parse(localData) }
  const data = await request('list_movies.json', { genre: key });
  window.sessionStorage.setItem(key, JSON.stringify(data));
  return data;
}

render(
  precaching('all'),
  trending,
  Template
);

render(
  precaching('action'),
  action,
  Template
);

render(
  precaching('animation'),
  animation,
  Template
);