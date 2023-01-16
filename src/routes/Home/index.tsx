import { useLayoutEffect, useState } from 'react';
import store from 'store';
import { useDispatch } from 'react-redux';

import { getAccessToken, getMovieList } from 'services/movies';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import { IMovieItem } from 'types/item';
import styles from './home.module.scss';
import { columns } from './column';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const [movies, setmovies] = useState<IMovieItem[]>([]);
  const dispatch = useDispatch();
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
  }, [dispatch, navigator]);

  return (
    <Container>
      <MovieTable<IMovieItem> rows={movies} columns={columns} filter='movie' />
      <button type='button' className={styles.addButton}>
        추가
      </button>
    </Container>
  );
};

export default Home;
