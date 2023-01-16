import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store';

import { IMovieItem } from 'types/item';
import { getAccessToken, getMovieList } from 'services/movies';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import styles from './home.module.scss';

const Home = (): JSX.Element => {
  const [movies, setmovies] = useState<IMovieItem[]>([]);
  const navigator = useNavigate();

  useLayoutEffect(() => {
    const storedAccessToken = store.get('accessToken');
    if (!storedAccessToken) {
      const requestToken = store.get('requestToken');
      getAccessToken(requestToken)
        .then((response) => {
          const accessToken = response.data.access_token;
          store.set('accessToken', accessToken);
          getMovieList(accessToken).then((res) => {
            setmovies(res.data.results);
          });
        })
        .catch(() => {
          navigator('/login');
        });
    } else {
      getMovieList(storedAccessToken).then((res) => {
        setmovies(res.data.results);
      });
    }
  }, [navigator]);

  return (
    <Container>
      <MovieTable<IMovieItem> rows={movies} filter='movie' />
    </Container>
  );
};

export default Home;
