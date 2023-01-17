import { useCallback, useState } from 'react';
import store from 'store';

import { IPersonItem } from 'types/item';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSelectedMovies, setSelectedMovies } from 'states/moives';
import { addMovieItem } from 'services/movieAPI';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';
import SearchBar from './SearchBar';
import { IMAGE_BASE_URL } from 'constant';
import defaultPerson from 'assets/svgs/defaultPerson.png';
import styles from './search.module.scss';
import { useSnackbar } from 'components/SnackBar/useSnackBar';
import SnackBar from 'components/SnackBar';

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('movie');
  const { message, setMessage } = useSnackbar(3000);
  const [snackBarStatus, setSnackBarStatus] = useState('');

  const [selectedPerson, setSelectedPerson] = useState([]);
  const handleClickPerson = (person: IPersonItem) => {
    setSelectedPerson(person.known_for || []);
  };

  const selectedMovies = useAppSelector(getSelectedMovies);

  const handleClickAddItem = useCallback(() => {
    if (!selectedMovies || selectedMovies.length === 0) return;
    const selectedItems = selectedMovies.map((value) => {
      return { media_type: value.media_type, media_id: value.id };
    });
    const storedAccessToken = store.get('accessToken');
    const myListId = store.get('myListId');

    addMovieItem(storedAccessToken, myListId, selectedItems).then((response) => {
      if (response.data.success) {
        dispatch(setSelectedMovies([]));
        setSnackBarStatus('');
        setMessage(`아이템을 추가하였습니다.`);
      } else {
        setSnackBarStatus('error');
        setMessage(`아이템 추가를 실패하였습니다.`);
      }
    });
  }, [dispatch, selectedMovies, setMessage]);

  return (
    <>
      <SearchBar setItems={setItems} setFilter={setFilter} />
      <div>
        {filter === 'people' ? (
          <>
            <div className={styles.peopleContainer}>
              {items.map((value: IPersonItem) => {
                return (
                  <div
                    key={value.id}
                    role='presentation'
                    className={styles.peopleList}
                    onClick={() => handleClickPerson(value)}
                    title={value.name}
                  >
                    <img
                      src={value.profile_path === null ? defaultPerson : IMAGE_BASE_URL + value.profile_path}
                      className={styles.peopleImaage}
                      alt='person profile'
                    />
                    <div>{value.name}</div>
                  </div>
                );
              })}
            </div>
            <div className={styles.personListWrapper}>
              <h3>출연작</h3>
              <section className={styles.tableSection}>
                <h4>Movie</h4>
                <MovieTable
                  rows={selectedPerson?.filter((value: { media_type: string }) => value.media_type === 'movie')}
                  filter='movie'
                />
              </section>
              <section className={styles.tableSection}>
                <h4>TV</h4>
                <MovieTable
                  rows={selectedPerson?.filter((value: { media_type: string }) => value.media_type === 'tv')}
                  filter='tv'
                />
              </section>
            </div>
          </>
        ) : (
          <Container>
            <MovieTable rows={items} filter={filter} />
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
