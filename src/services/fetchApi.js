import axios from 'axios';

const API_KEY = '55a2d7d76d61e3157b45a39f51d021cb';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export async function fetchTrendingMovies() {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };

  const response = await axios.get('/trending/all/day', { params });
  const data = response.data;

  return data;
}

export async function fetchMovieById(movieId) {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };

  const response = await axios.get(`/movie/${movieId}`, { params });
  const data = response.data;

  return data;
}

export async function fetchMovieByName(movieName) {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
    query: movieName,
  };

  const response = await axios.get(`/search/movie`, { params });
  const data = response.data;

  return data;
}

export async function fetchCast(movieId) {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };

  const response = await axios.get(`/movie/${movieId}/credits`, { params });
  const data = response.data;

  return data;
}

export async function fetchReviews(movieId) {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };

  const response = await axios.get(`/movie/${movieId}/reviews`, { params });
  const data = response.data;

  return data;
}
