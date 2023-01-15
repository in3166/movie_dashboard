import { Outlet } from 'react-router-dom';
import ErrorFallback from './ErrorFallback';
import Sidebar from './Sidebar';
import styles from './layout.module.scss';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
