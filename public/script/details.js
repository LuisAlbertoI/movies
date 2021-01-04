const value = window.location.search.replace('?', '');
import { request, render, rating, hours } from './main.js';
import { language } from './langs.js';

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
    console.log(movie)
    console.log(language(movie.language))
  } catch (error) {
  }
}

Number(value) ? details(value) : window.location.replace('/');