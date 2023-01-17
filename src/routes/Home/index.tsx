import { useEffect } from 'react';
import store from 'store';

import { IMovieItem } from 'types/item';
import { getMovieList } from 'services/movieAPI';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import { getMovies, setComments, setMovies } from 'states/moives';
import { useAppSelector, useAppDispatch, useGetMyList } from 'hooks';

const Home = (): JSX.Element => {
  const movies = useAppSelector(getMovies);
  const { myListId } = useGetMyList();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (myListId) {
      const storedAccessToken = store.get('accessToken');
      getMovieList(storedAccessToken, myListId).then((response) => {
        const { comments, results } = response.data;

        const tempComment = Object.keys(comments).map((value) => {
          const temp = value.split(':');
          return { id: Number(temp[1]), type: temp[0], comment: comments[value] };
        });
        dispatch(setComments(tempComment));
        dispatch(setMovies(results));
      });
    }
  }, [dispatch, myListId]);

  return (
    <Container>
      <MovieTable<IMovieItem> rows={movies} filter='movie' />
    </Container>
  );
};

export default Home;
