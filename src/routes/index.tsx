import { Routes, Route } from 'react-router-dom';
import styles from './routes.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
