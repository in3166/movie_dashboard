import { useState, FormEvent, useCallback, ChangeEvent } from 'react';
import { useAppDispatch } from 'hooks';
import { searchRequest } from 'services/movieAPI';
import { setSelectedMovies } from 'states/moives';
import styles from '../search.module.scss';

interface ISearchBar {
  setItems: React.Dispatch<React.SetStateAction<never[]>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar = ({ setItems, setFilter }: ISearchBar) => {
  const [selectFilterValue, setSelectFilterValue] = useState('movie');
  const [searchText, setSearchText] = useState('');

  const searchTextChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchText(value);
  }, []);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setSelectFilterValue(value);
  }, []);

  const dispatch = useAppDispatch();
  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await searchRequest[selectFilterValue](searchText);
    setFilter(selectFilterValue);
    setItems(data.results);
    dispatch(setSelectedMovies([]));
  };

  return (
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
  );
};

export default SearchBar;
