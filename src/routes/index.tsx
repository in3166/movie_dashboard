import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import styles from './routes.module.scss';
import NotFound from './NotFound';

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
