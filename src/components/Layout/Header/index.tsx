import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import store from 'store';

import { setUser } from 'states/user';
import styles from './header.module.scss';

const Header = () => {
  const [userEmail, setuserEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    const storedEmail = store.get('email');
    console.log(storedEmail);
    if (!storedEmail || storedEmail === '') {
      navigate('/login');
    }

    const requestToken = store.get('requestToken');
    setuserEmail(storedEmail);
    dispatch(setUser({ email: storedEmail, requestToken }));
  }, [dispatch, navigate]);
  const navigator = useNavigate();
  const handleLogout = () => {
    console.log(store.get('accessToken'));
    store.remove('accessToken');
    navigator('/login');
  };

  return (
    <header className={styles.header}>
      <h2>{location.pathname === '/' ? 'Movie 목록 조회' : '검색'}</h2>
      <div className={styles.userInfo}>
        {userEmail}
        <button type='button' onClick={handleLogout}>
          <AccountCircleIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
