import { useState } from 'react';

import { IMovieItem, IPersonItem, ITvItem } from 'types/item';
import { IMAGE_BASE_URL } from 'constant';
import MovieTable from 'components/MovieTable';
import defaultPerson from 'assets/defaultPerson.png';
import styles from '../search.module.scss';

interface IPeopleListProps {
  items: IPersonItem[];
}

const PeopleList = ({ items }: IPeopleListProps) => {
  const [selectedPerson, setSelectedPerson] = useState<(IMovieItem | ITvItem)[]>([]);
  const handleClickPerson = (person: IPersonItem) => {
    setSelectedPerson(person.known_for || []);
  };

  return (
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
            rows={selectedPerson?.filter((value: IMovieItem | ITvItem) => value?.media_type === 'movie')}
            filter='movie'
          />
        </section>
        <section className={styles.tableSection}>
          <h4>TV</h4>
          <MovieTable
            rows={selectedPerson?.filter((value: IMovieItem | ITvItem) => value?.media_type === 'tv')}
            filter='tv'
          />
        </section>
      </div>
    </>
  );
};

export default PeopleList;
