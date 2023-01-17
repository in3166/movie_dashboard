import { useEffect, useState } from 'react';

import { IMovieItem } from 'types/item';
import { setComments } from 'states/moives';
import { useAppDispatch, useGetMyList } from 'hooks';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import Loading from 'components/Loading';
import { getAllMovies } from './getAllMovies';

const Home = (): JSX.Element => {
  const [movieList, setMovieList] = useState<IMovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { myListId } = useGetMyList();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (myListId) {
      getAllMovies(myListId).then((response) => {
        const { allMovies, comments } = response;
        dispatch(setComments(comments));
        setMovieList(allMovies);
        setLoading(false);
      });
    }
  }, [dispatch, myListId]);

  return (
    <Container>
      {!loading && <MovieTable<IMovieItem> rows={movieList} filter='movie' />}
      {loading && <Loading />}
    </Container>
  );
};

export default Home;
