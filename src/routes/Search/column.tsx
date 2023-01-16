import { ReactNode } from 'react';
import { IMAGE_BASE_URL } from 'features';
import { IMovieItem, ITvItem } from 'types/item';
import styles from 'components/MovieTable/table.module.scss';
import defaultMovie from 'assets/svgs/defaultMovie.png';
import defaultTv from 'assets/svgs/defaultTv.png';

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
        const imgSrc = payload.poster_path === null ? defaultMovie : `${IMAGE_BASE_URL}/${payload.poster_path}`;

        return (
          <div className={styles.title}>
            <img className={styles.poster} src={imgSrc} alt='movie poster' />
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
        const imgSrc = payload.poster_path === null ? defaultTv : `${IMAGE_BASE_URL}/${payload.poster_path}`;
        return (
          <div className={styles.title}>
            <img className={styles.poster} src={imgSrc} alt='tv poster' />
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
};
