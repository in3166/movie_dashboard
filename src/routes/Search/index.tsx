import { useCallback, useState } from 'react';
import store from 'store';

import { useAppSelector, useAppDispatch } from 'hooks';
import { getSelectedMovies, setSelectedMovies } from 'states/moives';
import { addMovieItem } from 'services/movieAPI';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import SearchBar from './SearchBar';
import styles from './search.module.scss';
import { useSnackbar } from 'components/SnackBar/useSnackBar';
import SnackBar from 'components/SnackBar';
import Loading from 'components/Loading';
import PeopleList from './PeopleList';

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState([]);
  const [renderByFilter, setRenderByFilter] = useState('movie');
  const { message, setMessage } = useSnackbar(3000);
  const [snackBarStatus, setSnackBarStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedMovies = useAppSelector(getSelectedMovies);

  const handleClickAddItem = useCallback(() => {
    if (!selectedMovies || selectedMovies.length === 0) return;

    const selectedItems = selectedMovies.map((value) => {
      return { media_type: value.media_type, media_id: value.id };
    });

    const storedAccessToken = store.get('accessToken');
    const myListId = store.get('myListId');

    addMovieItem(storedAccessToken, myListId, selectedItems)
      .then((response) => {
        if (response.data.success) {
          dispatch(setSelectedMovies([]));
          setSnackBarStatus('');
          setMessage(`아이템을 추가하였습니다.`);
        }
      })
      .catch(() => {
        setSnackBarStatus('error');
        setMessage(`아이템 추가를 실패하였습니다.`);
      });
  }, [dispatch, selectedMovies, setMessage]);

  return (
    <>
      <SearchBar
        setItems={setItems}
        setFilter={setRenderByFilter}
        setLoading={setLoading}
        setMessage={setMessage}
        setSnackBarStatus={setSnackBarStatus}
      />
      <div>
        {loading && <Loading />}
        {!loading && renderByFilter === 'people' && <PeopleList items={items} />}
        {!loading && renderByFilter !== 'people' && (
          <Container>
            <MovieTable rows={items} filter={renderByFilter} />
          </Container>
        )}
        <button type='button' className={styles.addButton} onClick={handleClickAddItem}>
          추가
        </button>
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} status={snackBarStatus} />}
    </>
  );
};

export default Search;
