import Layout from 'components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import styles from './routes.module.scss';
import Search from './Search';

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
