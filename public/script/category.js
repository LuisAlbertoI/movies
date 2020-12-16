import { request, render, failed, rating, hours } from './main.js';
const { location: { search }, document: { body } } = window;
const container = document.querySelector('#root');
const title = document.querySelector('#name');
const value = search.replace('?', '');
let pages = 1;

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

function category(query, page) {
  return new Promise(async resolve => {
    document.title = capitalize(query || 'Most Popular');
    title.textContent = query || 'most popular';
    render(null, container);
    try {
      const {
        data: { movies }
      } = await request('list_movies.json', {
        genre: query || 'all',
        page: page,
        limit: 30
      });
      render(movies, container, template);
      resolve('resolved');
    } catch (error) {
      failed(error);
    }
  });
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

window.addEventListener('scroll', async function handle() {
  if (window.innerHeight + window.scrollY > body.clientHeight) {
    window.removeEventListener('scroll', handle);
    await category(value, pages++);
    window.addEventListener('scroll', handle);
  }
});

category(value, pages++);