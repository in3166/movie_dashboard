import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import store from 'store';

import { getEmail, setEmail } from 'states/user';
import { useAppDispatch, useAppSelector } from 'hooks';
import { resetStore } from 'utils/resetStore';
import styles from './header.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const email = useAppSelector(getEmail);

  const handleLogout = useCallback(() => {
    resetStore();
    navigator('/login');
  }, [navigator]);

  useEffect(() => {
    if (!email || email === '') {
      const storedEmail = store.get('email');
      if (!storedEmail) {
        handleLogout();
      } else {
        dispatch(setEmail({ email: storedEmail }));
      }
    }
  }, [dispatch, email, handleLogout, navigator]);

  return (
    <header className={styles.header}>
      <h2>{location.pathname === '/movie/list' ? 'Movie 목록 조회' : '검색'}</h2>
      <div className={styles.userInfo}>
        {email}
        <button type='button' onClick={handleLogout}>
          <AccountCircleIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
