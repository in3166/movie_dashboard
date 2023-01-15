import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import store from 'store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styles from './header.module.scss';
import { setUser } from 'states/user';

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

  return (
    <header className={styles.header}>
      <h2>{location.pathname === '/' ? 'Movie 목록 조회' : '검색'}</h2>
      <div className={styles.userInfo}>
        {userEmail}
        <button type='button'>
          <AccountCircleIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
