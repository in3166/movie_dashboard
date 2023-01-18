import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Header from './Header';
import Sidebar from './Sidebar';
import ErrorFallback from './ErrorFallback';
import styles from './layout.module.scss';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </main>
    </>
  );
};

export default Layout;
