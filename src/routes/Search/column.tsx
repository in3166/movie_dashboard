import { ReactNode } from 'react';
import { IMAGE_BASE_URL } from 'features';
import { IPersonItem, IMovieItem, ITvItem } from 'types/item';
import styles from 'components/MovieTable/table.module.scss';

export const columns: {
  [key: string]: Record<
    string,
    {
      name: string;
      width: string;
      accessor: (data: any) => ReactNode | string | undefined;
    }
  >;
} = {
  movie: {
    title: {
      name: 'Title',
      width: '270',
      accessor: (payload: IMovieItem) => {
        return (
          <div className={styles.title}>
            <img className={styles.poster} src={`${IMAGE_BASE_URL}/${payload.poster_path}`} alt='movie poster' />
            {payload.title}
          </div>
        );
      },
    },
    vote_average: {
      name: 'vote_average',
      width: '50',
      accessor: (payload: IMovieItem) => payload.vote_average,
    },
    vote_count: {
      name: 'vote_count',
      width: '50',
      accessor: (payload: IMovieItem) => payload.vote_count,
    },
    release_date: {
      name: 'release_date',
      width: '50',
      accessor: (payload: IMovieItem) => payload.release_date,
    },
  },
  tv: {
    name: {
      name: 'Name',
      width: '270',
      accessor: (payload: ITvItem) => {
        return (
          <div className={styles.title}>
            <img className={styles.poster} src={`${IMAGE_BASE_URL}/${payload.poster_path}`} alt='movie poster' />
            {payload.name}
          </div>
        );
      },
    },
    vote_average: {
      name: 'vote_average',
      width: '50',
      accessor: (payload: ITvItem) => payload.vote_average,
    },
    vote_count: {
      name: 'vote_count',
      width: '50',
      accessor: (payload: ITvItem) => payload.vote_count,
    },
    release_date: {
      name: 'first_air_date',
      width: '50',
      accessor: (payload: ITvItem) => payload.first_air_date,
    },
  },
  people: {
    name: {
      name: 'Name',
      width: '270',
      accessor: (payload: IPersonItem) => {
        return (
          <div className={styles.title}>
            <img className={styles.poster} src={`${IMAGE_BASE_URL}/${payload.profile_path}`} alt='movie poster' />
            {payload.name}
          </div>
        );
      },
    },
    gender: {
      name: 'gender',
      width: '50',
      accessor: (payload: IPersonItem) => (payload.gender === 2 ? '남자' : '여자'),
    },
    popularity: {
      name: 'popularity',
      width: '50',
      accessor: (payload: IPersonItem) => payload.popularity,
    },
    known_for_department: {
      name: 'known_for_department',
      width: '50',
      accessor: (payload: IPersonItem) => payload.known_for_department,
    },
  },
};
