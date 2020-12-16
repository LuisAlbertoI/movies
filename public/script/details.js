import { request, render, failed } from './main.js';
const { location: { search } } = window;
const value = search.replace('?', '');

async function details(id) {
  try {
    const {
      data: { movie, movies }
    } = await request('movie_details.json', {
      with_images: true, with_cast: true, movie_id: id
    }).then(async ({ data: { movie } }) => {
      return await request('movie_suggestions.json', {
        movie_id: id
      }).then(({ data: { movies } }) => {
        return { data: { movie, movies } }
      });
    });
    document.title = movie.title;
  } catch (error) {
    failed(error);
  }
}

Number(value) ? details(value) : window.location.replace('/');