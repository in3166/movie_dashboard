import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store';

import { getAccessToken, getSessionId } from 'services/movieAPI';
import { useSnackbar } from 'components/SnackBar/useSnackBar';
import SnackBar from 'components/SnackBar';
import LoginForm from './LoginForm';
import logoImg from 'assets/logo.png';
import { cx } from 'styles';
import styles from './login.module.scss';

const Login = (): JSX.Element => {
  const navigator = useNavigate();
  const { message, setMessage } = useSnackbar(3000);
  const [snackBarStatus, setSnackBarStatus] = useState('');
  const [requestToken, setRequestToken] = useState<string | null>(null);

  const handleClickAccess = async () => {
    if (!requestToken) return;
    try {
      const accessTokenResponse = await getAccessToken(requestToken);
      if (accessTokenResponse.data.success) {
        const tempAccessToken = accessTokenResponse.data.access_token;
        store.set('accessToken', tempAccessToken);

        const sessionId = await getSessionId(tempAccessToken);
        if (sessionId.data.success) {
          const sessionObj = {
            sessionId: sessionId.data.session_id,
            expire: Date.now() + 1000 * 60 * 30,
          };
          store.set('sessionId', JSON.stringify(sessionObj));
          navigator('/movie/list');
          return;
        }
      }
    } catch (error) {
      setSnackBarStatus('error');
      setMessage(`페이지 접속에 실패하였습니다.`);
      setRequestToken(null);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <header className={styles.header}>
          <div className={styles.logoImageWrapper}>
            <img width={70} height={70} src={logoImg} className={styles.logoImage} alt='logo' />
          </div>
          <h3 className={styles.id}>로그인</h3>
        </header>

        {!requestToken && (
          <LoginForm setRequestToken={setRequestToken} setSnackBarStatus={setSnackBarStatus} setMessage={setMessage} />
        )}
        {requestToken && (
          <button
            type='button'
            aria-label='access page'
            onClick={handleClickAccess}
            className={cx(styles.loginButton, styles.connectButton)}
          >
            접속
          </button>
        )}
      </section>
      {message && <SnackBar message={message} setMessage={setMessage} status={snackBarStatus} />}
    </main>
  );
};

export default Login;
