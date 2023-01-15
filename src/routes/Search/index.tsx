import { useState, FormEvent, useCallback, ChangeEvent } from 'react';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';

import styles from './search.module.scss';
import { searchRequest } from 'services/movies';
import { useSelector } from 'react-redux';
import { getEmail } from 'states/user';
import { columns } from './column';

const Search = (): JSX.Element => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('movie');
  const [currentColumns, setCurrentColumns] = useState(columns.movie);
  const [searchText, setSearchText] = useState('');
  const { email } = useSelector(getEmail);

  const searchTextChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchText(value);
  }, []);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setFilter(value);
  }, []);

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await searchRequest[filter](searchText);
    console.log(data);
    setCurrentColumns(columns[filter]);
    setMovies(data.results);
  };

  return (
    <Container>
      <form onSubmit={handleSearchSubmit}>
        <select onChange={handleFilterChange}>
          <option key='movie' value='movie'>
            movie
          </option>
          <option key='people' value='people'>
            people
          </option>
          <option key='tv' value='tv'>
            tv
          </option>
        </select>
        <input type='text' value={searchText} onChange={searchTextChangeHandler} />
        <button type='submit'>검색</button>
      </form>
      <MovieTable rows={movies} columns={currentColumns} filter={filter} />
    </Container>
  );
};

export default Search;
