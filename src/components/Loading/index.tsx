import { LoadingSpinner } from 'assets/svgs';
import styles from './loading.module.scss';

const Loading = () => (
  <div className={styles.loading} aria-hidden role='contentinfo'>
    <LoadingSpinner />
  </div>
);

export default Loading;
