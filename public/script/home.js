import { request, render, rating, failed, hours } from './main.js';
const animation = document.getElementById('animation');
const trending = document.getElementById('trending');
const action = document.getElementById('action');

const template = data => {
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

(async function init() {
  try {
    render(null, animation);
    render(null, trending);
    render(null, action);
    const {
      data: { movies: Trending }
    } = await request('list_movies.json');
    render(Trending, trending, template);
    const {
      data: { movies: Action }
    } = await request('list_movies.json', { genre: 'action' });
    render(Action, action, template);
    const {
      data: { movies: Animation }
    } = await request('list_movies.json', { genre: 'animation' });
    render(Animation, animation, template);
  } catch (error) {
  }
})()