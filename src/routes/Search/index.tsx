import { useState } from 'react';
import { useDispatch } from 'react-redux';
import store from 'store';

import { IPersonItem } from 'types/item';
import { IMAGE_BASE_URL } from 'features';
import { addMovieItem } from 'services/movies';
import { useAppSelector } from 'hooks/useAppSelector';
import { getSelectedMovies, setSelectedMovies } from 'states/moives';
import MovieTable from 'components/MovieTable';
import SearchBar from './SearchBar';
import defaultPerson from 'assets/svgs/defaultPerson.png';
import styles from './search.module.scss';

const Search = (): JSX.Element => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('movie');

  const dispatch = useDispatch();

  const [selectedPerson, setSelectedPerson] = useState([]);
  const handleClickPerson = (person: IPersonItem) => {
    setSelectedPerson(person.known_for || []);
  };

  const selectedMovies = useAppSelector(getSelectedMovies);

  const handleClickAddItem = () => {
    if (!selectedMovies || selectedMovies.length === 0) return;
    const selectedItems = selectedMovies.map((value) => {
      return { media_type: value.media_type, media_id: value.id };
    });
    const storedAccessToken = store.get('accessToken');
    const myListId = store.get('myListId');

    addMovieItem(storedAccessToken, myListId, selectedItems).then((response) => {
      if (response.data.success) dispatch(setSelectedMovies([]));
    });
  };

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
          <MovieTable rows={items} filter={filter} />
        )}
        <button type='button' className={styles.addButton} onClick={handleClickAddItem}>
          추가
        </button>
      </div>
    </>
  );
};

export default Search;
