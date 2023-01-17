import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import store from 'store';

import { getEmail, setEmail } from 'states/user';
import styles from './header.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks';

const Header = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(getEmail);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!email || email === '') {
      const storedEmail = store.get('email');
      if (!storedEmail) {
        navigate('/login');
      } else {
        dispatch(setEmail({ email: storedEmail }));
      }
    }
  }, [dispatch, email, navigate]);

  const navigator = useNavigate();
  const handleLogout = () => {
    store.remove('myListId');
    store.remove('accessToken');
    navigator('/login');
  };

  return (
    <header className={styles.header}>
      <h2>{location.pathname === '/' ? 'Movie 목록 조회' : '검색'}</h2>
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
