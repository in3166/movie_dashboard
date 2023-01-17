import store from 'store';
import { getMovieList } from 'services/movieAPI';
import { IMovieItem } from 'types/item';

export const getAllMovies = async (myListId: number) => {
  const storedAccessToken = store.get('accessToken');
  let allComments: {
    [index: string]: string;
  } = {};

  const allMovies: IMovieItem[] = [];

  const response = await getMovieList(storedAccessToken, myListId, 1);
  const { comments, results, total_pages: totalPage } = response.data;
  allComments = { ...comments };
  allMovies.push(...results);

  const getPromises = [];
  for (let i = 2; i <= totalPage; i += 1) {
    getPromises.push(getMovieList(storedAccessToken, myListId, i));
  }

  const responseAll = await Promise.all(getPromises);
  responseAll.forEach((res) => {
    const { comments: restComments, results: restResults } = res.data;
    allComments = { ...allComments, ...restComments };
    allMovies.push(...restResults);
  });

  const tempComment = Object.keys(allComments).map((value) => {
    const temp = value.split(':');
    return { id: Number(temp[1]), type: temp[0], comment: allComments[value] };
  });

  return { allMovies, comments: tempComment };
};
