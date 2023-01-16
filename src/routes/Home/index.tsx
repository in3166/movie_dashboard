import { useEffect } from 'react';

import { IMovieItem } from 'types/item';
import { getMovieList } from 'services/movies';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import { getMovies, setComments, setMovies } from 'states/moives';
import { useAppSelector, useAppDispatch } from 'hooks';
import { useInitializeUser } from 'hooks/useInitializeUser';

const Home = (): JSX.Element => {
  const movies = useAppSelector(getMovies);
  const { accessToken, myListId } = useInitializeUser();
  const dispatch = useAppDispatch();

  // TODO: 세션 아이디 없으면 로그인 화면으로 AND 권한 인증 분리
  useEffect(() => {
    if (myListId) {
      getMovieList(accessToken, myListId).then((response) => {
        const { comments, results } = response.data;
        const tempComment = Object.keys(comments).map((value) => {
          const temp = value.split(':');
          return { id: Number(temp[1]), type: temp[0], comment: comments[value] };
        });
        dispatch(setComments(tempComment));
        dispatch(setMovies(results));
      });
    }
  }, [accessToken, dispatch, myListId]);

  return (
    <Container>
      <MovieTable<IMovieItem> rows={movies} filter='movie' />
    </Container>
  );
};

export default Home;
