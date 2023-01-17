import axios from 'axios';
import { MOVIE_API_URL } from 'features';

const apiClient = axios.create({
  baseURL: MOVIE_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_MOVIE_ACCESS_TOKEN}`,
  },
});

export const getRequestToken = () => apiClient.post('/4/auth/request_token');

export const getAccessToken = (requestToken: string) =>
  apiClient.post(`${MOVIE_API_URL}/4/auth/access_token`, {
    request_token: requestToken,
  });

export const getSessionId = (accessToken: string) =>
  axios.post(`${MOVIE_API_URL}/3/authentication/session/convert/4?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`, {
    access_token: accessToken,
  });

export const createMyList = (accessToken: string) =>
  axios.post(
    `${MOVIE_API_URL}/4/list`,
    {
      name: `My List-${new Date().getTime()}`,
      iso_639_1: 'en',
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

export const addMovieItem = (accessToken: string, id: number, items: { media_type: string; media_id: number }[]) =>
  axios.post(
    `${MOVIE_API_URL}/4/list/${id}/items`,
    {
      items,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

export const getMovieList = (accessToken: string, id: number) =>
  axios.get(`${MOVIE_API_URL}/4/list/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Cache-Control': 'no-cache',
    },
    params: {
      timestamp: new Date().getTime(),
    },
  });

export const deleteMovieItem = (accessToken: string, id: number, items: { media_type: string; media_id: number }[]) =>
  axios.delete(`${MOVIE_API_URL}/4/list/${id}/items`, {
    data: {
      items,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const updateMovieItem = (
  accessToken: string,
  id: number,
  items: { media_type: string; media_id: number; comment: string }[]
) =>
  axios.put(
    `${MOVIE_API_URL}/4/list/${id}/items`,
    {
      items,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

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
