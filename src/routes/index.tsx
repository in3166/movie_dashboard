import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import styles from './routes.module.scss';
import NotFound from './NotFound';

const Home = lazy(() => import('./Home'));
const Search = lazy(() => import('./Search'));
const Login = lazy(() => import('./Login'));

const App = () => {
  return (
    <div className={styles.app}>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </div>
  );
};

export default App;
