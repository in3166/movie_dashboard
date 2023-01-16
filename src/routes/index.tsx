import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import styles from './routes.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;
