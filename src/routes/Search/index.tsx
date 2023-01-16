import { useState, FormEvent, useCallback, ChangeEvent } from 'react';
import { IPersonItem } from 'types/item';
import { searchRequest } from 'services/movies';
import { IMAGE_BASE_URL, MOVIE_API_URL } from 'features';
import MovieTable from 'components/MovieTable';
import defaultPerson from 'assets/svgs/defaultPerson.png';
import styles from './search.module.scss';
import { useAppSelector } from 'hooks/useAppSelector';
import { getSelectedMovies, setSelectedMovies } from 'states/moives';
import axios from 'axios';
import store from 'store';
import { useDispatch } from 'react-redux';

const Search = (): JSX.Element => {
  const [items, setItems] = useState([]);
  const [selectFilterValue, setSelectFilterValue] = useState('movie');
  const [filter, setFilter] = useState('movie');
  const [searchText, setSearchText] = useState('');

  const searchTextChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchText(value);
  }, []);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setSelectFilterValue(value);
  }, []);

  const dispatch = useDispatch();
  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await searchRequest[selectFilterValue](searchText);
    setFilter(selectFilterValue);
    setItems(data.results);
    dispatch(setSelectedMovies([]));
  };

  const [selectedPerson, setSelectedPerson] = useState([]);
  const handleClickPerson = (person: IPersonItem) => {
    setSelectedPerson(person.known_for || []);
  };

  const selectedMovies = useAppSelector(getSelectedMovies);
  const handleClickAdd = () => {
    if (!selectedMovies || selectedMovies.length === 0) return;
    const selectedItems = selectedMovies.map((value) => {
      return { media_type: value.media_type, media_id: value.id };
    });
    const storedAccessToken = store.get('accessToken');
    axios
      .post(
        `${MOVIE_API_URL}/4/list/8235984/items`,
        {
          items: selectedItems,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      )
      .then((response) => {
        dispatch(setSelectedMovies([]));
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

  return (
    <>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <select onChange={handleFilterChange} className={styles.filterSelect}>
            <option key='movie' value='movie'>
              Movie
            </option>
            <option key='tv' value='tv'>
              TV
            </option>
            <option key='people' value='people'>
              People
            </option>
          </select>
          <input type='text' value={searchText} className={styles.inputText} onChange={searchTextChangeHandler} />
        </div>
        <button type='submit' className={styles.submitSearch}>
          검색
        </button>
      </form>

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
        <button type='button' className={styles.addButton} onClick={handleClickAdd}>
          추가
        </button>
      </div>
    </>
  );
};

export default Search;
