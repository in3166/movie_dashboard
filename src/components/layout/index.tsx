import { Outlet } from 'react-router-dom';
import ErrorFallback from './ErrorFallback';
import Sidebar from './Sidebar';
import styles from './layout.module.scss';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
