import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import PageviewIcon from '@mui/icons-material/Pageview';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { LogoImage, MenuBar } from 'assets/svgs';
import { cx } from 'styles';
import styles from './sidebar.module.scss';

const Sidebar = (): JSX.Element => {
  const [visibleSideBar, setVisibleSideBar] = useState(true);

  const handleOpenMenu = () => {
    setVisibleSideBar((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 766) {
      setVisibleSideBar(false);
    }
  }, []);
  return (
    <aside
      className={cx(styles.aside, { [styles.hideSidebar]: !visibleSideBar }, { [styles.openSidebar]: visibleSideBar })}
    >
      <div className={styles.logo}>
        <NavLink to='/' aria-label='link to home page' className={styles.logo}>
          <MovieFilterIcon />
          Dashboard
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to='/'
              aria-label='link to movielist page'
              className={({ isActive }) => cx({ [styles.isActive]: isActive })}
            >
              <ListAltIcon />
              <span>movie 목록 조회</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/search'
              aria-label='link to search page'
              className={({ isActive }) => cx({ [styles.isActive]: isActive })}
            >
              <PageviewIcon />
              <span>검색</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <button type='button' onClick={handleOpenMenu} className={styles.menuToggle} aria-label='SideBar Toggle'>
        <MenuBar />
      </button>
    </aside>
  );
};

export default Sidebar;
