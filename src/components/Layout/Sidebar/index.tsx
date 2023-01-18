import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PageviewIcon from '@mui/icons-material/Pageview';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { MenuBar } from 'assets/svgs';
import logoImg from 'assets/logo.png';
import { cx } from 'styles';
import styles from './sidebar.module.scss';

const Sidebar = (): JSX.Element => {
  const [visibleSideBar, setVisibleSideBar] = useState(true);

  const handleOpenMenu = () => {
    setVisibleSideBar((prev) => !prev);
  };

  const timer = useRef<number | NodeJS.Timeout | undefined>(undefined);
  const handleResize = useCallback(() => {
    if (timer) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setVisibleSideBar(window.innerWidth > 768);
      timer.current = undefined;
    }, 140);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 766) {
      setVisibleSideBar(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer.current);
    };
  }, [handleResize]);

  return (
    <aside
      className={cx(styles.aside, { [styles.hideSidebar]: !visibleSideBar }, { [styles.openSidebar]: visibleSideBar })}
    >
      <div className={styles.logo}>
        <NavLink to='/movie/list' aria-label='link to home page' className={styles.logo}>
          <img src={logoImg} className={styles.logoImage} alt='logo' />
          Dashboard
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink
              to='/movie/list'
              aria-label='link to movielist page'
              className={({ isActive }) => cx({ [styles.isActive]: isActive })}
            >
              <ListAltIcon />
              <span>Movie 목록 조회</span>
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
