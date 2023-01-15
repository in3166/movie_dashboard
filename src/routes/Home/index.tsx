import { useLayoutEffect, useState } from 'react';
import store from 'store';
import { useDispatch } from 'react-redux';

import { getAccessToken, getMovieList } from 'services/movies';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import { IMoive } from 'types/movie';
import styles from './home.module.scss';
import Header from 'components/Layout/Header';

const Home = (): JSX.Element => {
  const [movies, setmovies] = useState<IMoive[]>([]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const requestToken = store.get('requestToken');
    getAccessToken(requestToken).then((response) => {
      const accessToken = response.data.access_token;
      getMovieList(accessToken).then((res) => {
        setmovies(res.data.results);
      });
    });
  }, [dispatch]);

  return (
    <Container>
      <MovieTable movies={movies} />
      <button type='button'>추가</button>
    </Container>
  );
};

export default Home;
