import Container from 'components/Container';
import store from 'store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Table from 'components/Table';
import { useLayoutEffect, useState } from 'react';
import { getAccessToken, getMovieList } from 'services/movies';
import styles from './home.module.scss';
import { IMoive } from 'types/movie';
import { useDispatch, useSelector } from 'react-redux';
import { getEmail, setUser } from 'states/user';

const Home = (): JSX.Element => {
  const [movies, setmovies] = useState<IMoive[]>([]);
  const [userEmail, setuserEmail] = useState('');
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const storedEmail = store.get('email');
    const requestToken = store.get('requestToken');
    setuserEmail(storedEmail);
    dispatch(setUser({ email: storedEmail, requestToken }));
    getAccessToken(requestToken).then((response) => {
      const accessToken = response.data.access_token;
      console.log(accessToken);
      getMovieList(accessToken).then((res) => {
        console.log(res.data.results);
        setmovies(res.data.results);
      });
    });
  }, [dispatch]);

  return (
    <>
      <header className={styles.header}>
        <h2>Movie 목록 조회</h2>
        <div>
          <span>{userEmail}</span>
          <span>
            <AccountCircleIcon />
          </span>
        </div>
      </header>
      <Container>
        <Table movies={movies} />
        <button type='button'>추가</button>
      </Container>
    </>
  );
};

export default Home;
