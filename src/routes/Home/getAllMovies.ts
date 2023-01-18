import store from 'store';
import { getMovieList } from 'services/movieAPI';
import { IMovieItem } from 'types/item';

export const getAllMovies = async (myListId: number) => {
  const storedAccessToken = store.get('accessToken');
  let allPageComments: {
    [index: string]: string;
  } = {};

  const allPageMovies: IMovieItem[] = [];

  try {
    const response = await getMovieList(storedAccessToken, myListId, 1);
    const { comments, results, total_pages: totalPage } = response.data;

    allPageComments = { ...comments };
    allPageMovies.push(...results);

    const getNextPagePromises = [];

    for (let page = 2; page <= totalPage; page += 1) {
      getNextPagePromises.push(getMovieList(storedAccessToken, myListId, page));
    }

    const responseAll = await Promise.all(getNextPagePromises);

    responseAll.forEach((res) => {
      const { comments: restComments, results: restResults } = res.data;
      allPageComments = { ...allPageComments, ...restComments };
      allPageMovies.push(...restResults);
    });

    const tempComment = Object.keys(allPageComments).map((value) => {
      const temp = value.split(':');
      return { id: Number(temp[1]), type: temp[0], comment: allPageComments[value] };
    });

    return { success: true, allMovies: allPageMovies, comments: tempComment };
  } catch (error) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error: getAllMovies');
  }
};
