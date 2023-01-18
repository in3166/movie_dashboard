import { useState, FormEvent, useCallback, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from 'hooks';
import { searchList } from 'services/movieAPI';
import { setSelectedMovies } from 'states/moives';
import styles from '../search.module.scss';

interface ISearchBar {
  setItems: Dispatch<SetStateAction<never[]>>;
  setFilter: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSnackBarStatus: (value: SetStateAction<string>) => void;
  setMessage: (text: string) => void;
}
const SearchBar = ({ setItems, setFilter, setLoading, setSnackBarStatus, setMessage }: ISearchBar) => {
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
    if (!searchText || searchText === '') {
      setSnackBarStatus('warning');
      setMessage(`검색어를 입력해주세요.`);
      return;
    }
    try {
      setLoading(true);
      const { data } = await searchList(searchText, selectFilterValue === 'people' ? 'person' : selectFilterValue);
      setFilter(selectFilterValue);
      setItems(data.results);
      dispatch(setSelectedMovies([]));
    } catch (error) {
      setSnackBarStatus('error');
      setMessage(`검색을 실패하였습니다.`);
    }
    setLoading(false);
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
