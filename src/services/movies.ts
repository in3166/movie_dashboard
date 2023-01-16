import axios from 'axios';
import { MOVIE_API_URL, BASE_URL } from 'features';

const apiClient = axios.create({
  baseURL: MOVIE_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_MOVIE_ACCESS_TOKEN}`,
  },
});

export const getRequestToken = () =>
  apiClient.post('/4/auth/request_token', {
    redirect_to: BASE_URL,
  });

export const getAccessToken = (requestToken: string) =>
  apiClient.post(`${MOVIE_API_URL}/4/auth/access_token`, {
    request_token: requestToken,
  });

export const getSessionId = (requestToken: string) =>
  axios.get(
    `${MOVIE_API_URL}3/authentication/session/convert/4?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&request_token=${requestToken}`
  );

export const getMovieList = (accessToken: string) =>
  axios.get(`${MOVIE_API_URL}/4/list/8235984?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Cache-Control': 'no-cache',
    },
    params: {
      timestamp: new Date().getTime(),
    },
  });

export const getPerson = (id: string) =>
  axios.get(`${MOVIE_API_URL}/3/person/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

export const searchRequest: { [key: string]: (text: string) => Promise<any> } = {
  movie: (text: string) =>
    axios.get(`${MOVIE_API_URL}/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${text}`),
  people: (text: string) =>
    axios.get(`${MOVIE_API_URL}/3/search/person?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${text}`),
  tv: (text: string) =>
    axios.get(`${MOVIE_API_URL}/3/search/tv?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${text}`),
};
