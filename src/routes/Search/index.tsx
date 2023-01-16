import { useState, FormEvent, useCallback, ChangeEvent } from 'react';
import MovieTable from 'components/MovieTable';
import Container from 'components/Container';

import styles from './search.module.scss';
import { searchRequest } from 'services/movies';
import { useSelector } from 'react-redux';
import { getEmail } from 'states/user';
import { columns } from './column';
import { IMovieItem, IPersonItem, ITvItem } from 'types/item';
import { IMAGE_BASE_URL } from 'features';
import defaultPerson from 'assets/svgs/defaultPerson.png';

const Search = (): JSX.Element => {
  const [items, setItems] = useState([]);
  const [selectFilterValue, setSelectFilterValue] = useState('movie');
  const [filter, setFilter] = useState('movie');
  const [currentColumns, setCurrentColumns] = useState(columns.movie);
  const [searchText, setSearchText] = useState('');

  const searchTextChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchText(value);
  }, []);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setSelectFilterValue(value);
  }, []);

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await searchRequest[selectFilterValue](searchText);
    console.log(data);
    setFilter(selectFilterValue);
    setCurrentColumns(columns[selectFilterValue]);
    setItems(data.results);
  };
  const [selectedPerson, setSelectedPerson] = useState([]);
  const handleClickPerson = (person: IPersonItem) => {
    setSelectedPerson(person.known_for || []);
  };

  console.log(selectedPerson);

  return (
    <>
      <form onSubmit={handleSearchSubmit} className={styles.searchInput}>
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
            <div>
              <h3>출연작</h3>
              <h4>Movie</h4>
              <MovieTable
                rows={selectedPerson?.filter((value: { media_type: string }) => value.media_type === 'movie')}
                columns={columns.movie}
                filter='movie'
              />
              <h4>TV</h4>
              <MovieTable
                rows={selectedPerson?.filter((value: { media_type: string }) => value.media_type === 'tv')}
                columns={columns.tv}
                filter='tv'
              />
            </div>
          </>
        ) : (
          <MovieTable rows={items} columns={currentColumns} filter={filter} />
        )}
      </div>
    </>
  );
};

export default Search;
