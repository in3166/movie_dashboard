import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import styles from './routes.module.scss';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute';

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path='/search'
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
