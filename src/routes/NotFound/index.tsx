import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <h2>404 Not Found</h2>
      <Link to='/movie/list'>홈으로</Link>
    </div>
  );
};

export default NotFound;
