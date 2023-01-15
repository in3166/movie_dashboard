import Sidebar from './Sidebar';
import ErrorFallback from './ErrorFallback';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
