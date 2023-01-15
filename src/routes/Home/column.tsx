import { IMAGE_BASE_URL } from 'features';
import { IMovieItem } from 'types/item';
import styles from 'components/MovieTable/table.module.scss';

export const columns = {
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
};
