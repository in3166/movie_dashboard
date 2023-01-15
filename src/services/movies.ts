import axios from 'axios';
import store from 'store';
import { MOVIE_API_URL, MOVIE_WEB_URL } from 'features';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer ' +
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDkzOThhOWNmMmNlM2JiZjgyMTVhZGUyZDRhOTBjYyIsInN1YiI6IjYwMzQ4YmE1NmNmM2Q1MDA0MWZiYzMxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RMzoLNVqXjyLuKCVfeEaTNvrl7mCS0PI__Amo9zazYI',
  },
});

export const getRequestToken = () =>
  apiClient.post('/4/auth/request_token', {
    redirect_to: 'http://localhost:3000',
  });
// .then((response) => {
//   store.set('requestToken', response.data.request_token);
//   window.location.href = `${MOVIE_WEB_URL}/auth/access?request_token=${response.data.request_token}`;
// });

export const getAccessToken = (token: string) =>
  apiClient.post(`${MOVIE_API_URL}/4/auth/access_token`, {
    request_token: token,
  });

export const getSessionId = (token: string) =>
  axios.get(
    `${MOVIE_API_URL}3/authentication/session/convert/4?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&request_token=${token}`
  );

export const getMovieList = (token: string) =>
  axios.get(`${MOVIE_API_URL}/4/list/1?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const searchMovie = (text: string) =>
  axios.get(`${MOVIE_API_URL}/list/1?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${text}`);
