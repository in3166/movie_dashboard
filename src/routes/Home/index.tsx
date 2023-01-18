import { useEffect, useState } from 'react';

import { IMovieItem } from 'types/item';
import { getMovies, setComments, setMovies } from 'states/moives';
import { useAppDispatch, useAppSelector, useGetMyList } from 'hooks';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import Loading from 'components/Loading';
import { getAllMovies } from './getAllMovies';
import styles from './home.module.scss';

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

  const myErrorHandler = () => {
    window.location.reload();
  };

  return (
    <Container>
      {!loading && !error && <MovieTable<IMovieItem> rows={movieList} filter='movie' />}
      {loading && <Loading />}
      {error && (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>목록을 가져오지 못했습니다.</p>
          <p className={styles.errorMessage}>{error?.message}</p>
          <button type='button' aria-label='refresh a page' onClick={myErrorHandler} className={styles.reloadButton}>
            새로고침
          </button>
        </div>
      )}
    </Container>
  );
};

export default Home;
