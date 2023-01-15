import { useState } from 'react';
import Table from 'components/Table';
import Container from 'components/Container';

import styles from './search.module.scss';

const Search = (): JSX.Element => {
  const [movies, setMovies] = useState([]);
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>검색</h1>
        <div>
          <span>아무개씨</span>
          <span>^^</span>
        </div>
      </header>
      <Container>
        <div>
          <select>
            <option>movie</option>
            <option>people</option>
            <option>tv</option>
          </select>
          <input type='text' />
        </div>
        <Table movies={movies} />
      </Container>
    </main>
  );
};

export default Search;
