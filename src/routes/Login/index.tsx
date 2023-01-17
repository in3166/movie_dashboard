import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store';

import { getAccessToken, getSessionId } from 'services/movieAPI';
import LoginForm from './LoginForm';
import logoImg from 'assets/svgs/logo.png';
import { cx } from 'styles';
import styles from './login.module.scss';

const Login = (): JSX.Element => {
  const navigator = useNavigate();
  const [requestToken, setRequestToken] = useState<string | null>(null);

  const createUserSessionId = async () => {
    if (!requestToken) return;
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
        navigator('/');
        return;
      }
    }
    alert('접속을 실패하였습니다.');
    setRequestToken(null);
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <header className={styles.header}>
          <img src={logoImg} className={styles.logoImage} alt='logo' />
          <h3 className={styles.id}>로그인</h3>
        </header>

        {!requestToken && <LoginForm setRequestToken={setRequestToken} />}
        {requestToken && (
          <button type='button' onClick={createUserSessionId} className={cx(styles.loginButton, styles.connectButton)}>
            접속
          </button>
        )}
      </section>
    </main>
  );
};

export default Login;
