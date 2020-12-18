import { request, render, failed, rating, hours } from './main.js';
const animation = document.getElementById('animation');
const trending = document.getElementById('trending');
const action = document.getElementById('action');

const Card = data => {
  return `
      <div class="card">
      <div class="figure">
        <a href="/details?${data.id}">
          <img src="${data.large_cover_image}" alt="${data.title}">
        </a>
      </div>
      <div class="details">
        <a href="/details?${data.id}" class="title">${data.title}</a>
        <span>(${data.year})${hours(data.runtime)}</span>
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

async function cacheExist(element, category) {
  const cacheList = window.sessionStorage.getItem(category);
  render(null, element);
  if (cacheList) {
    const data = JSON.parse(cacheList);
    render(data, element, Card);
  } else {
    try {
      const {
        data: { movies }
      } = await request('list_movies.json', {
        genre: category
      });
      render(movies, element, Card);
      window.sessionStorage.setItem(category, JSON.stringify(movies));
    } catch (error) {

    }
  }
}

cacheExist(trending, 'all');
cacheExist(action, 'action');
cacheExist(animation, 'animation');