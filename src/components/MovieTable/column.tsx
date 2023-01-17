import { ReactNode } from 'react';
import { IMovieItem, ITvItem } from 'types/item';
import { IMAGE_BASE_URL } from 'constant';
import LazyImage from './LazyImage';
import defaultMovie from 'assets/svgs/defaultMovie.png';
import defaultTv from 'assets/svgs/defaultTv.png';
import styles from './table.module.scss';

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
        const imgSrc = !payload.poster_path ? defaultMovie : `${IMAGE_BASE_URL}/${payload.poster_path}`;

        return (
          <div className={styles.titleWapper}>
            <LazyImage src={imgSrc} />
            <p className={styles.title}>{payload.title}</p>
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
        const imgSrc = !payload.poster_path ? defaultTv : `${IMAGE_BASE_URL}/${payload.poster_path}`;
        return (
          <div className={styles.titleWapper}>
            <LazyImage src={imgSrc} />
            <p className={styles.title}>{payload.name}</p>
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
