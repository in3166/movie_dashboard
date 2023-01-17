import { useState } from 'react';
import store from 'store';
import LoginForm from './LoginForm';
import styles from './login.module.scss';
import { getAccessToken, getSessionId } from 'services/movieAPI';
import { useNavigate } from 'react-router-dom';
import { cx } from 'styles';

const Login = (): JSX.Element => {
  const navigator = useNavigate();
  const [requestToken, setRequestToken] = useState<string | null>(null);

  const createUserAuthentication = async () => {
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
      }
    } else {
      alert('Access Token을 가져오지 못했습니다.');
      setRequestToken(null);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.id}>로그인</h3>
        </header>

        {!requestToken && <LoginForm setRequestToken={setRequestToken} />}
        {requestToken && (
          <button
            type='button'
            onClick={createUserAuthentication}
            className={cx(styles.loginButton, styles.connectButton)}
          >
            접속
          </button>
        )}
      </section>
    </main>
  );
};

export default Login;
