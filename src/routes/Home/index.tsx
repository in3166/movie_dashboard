import { useEffect, useState } from 'react';

import { getMovies, setComments, setMovies } from 'states/moives';
import { useAppDispatch, useAppSelector, useGetMyList } from 'hooks';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import Loading from 'components/Loading';
import ErrorFallback from 'components/Layout/ErrorFallback';
import { getAllMovies } from './getAllMovies';

const Home = (): JSX.Element => {
  const movieList = useAppSelector(getMovies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const { myListId } = useGetMyList();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (myListId) {
      getAllMovies(myListId)
        .then((response) => {
          if (response.success) {
            const { allMovies, comments } = response;
            dispatch(setComments(comments));
            dispatch(setMovies(allMovies));
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dispatch, myListId]);

  return (
    <Container>
      {!loading && !error && <MovieTable rows={movieList} filter='movie' />}
      {loading && <Loading />}
      {error && <ErrorFallback error={error} errorText='목록을 가져오지 못했습니다.' />}
    </Container>
  );
};

export default Home;
