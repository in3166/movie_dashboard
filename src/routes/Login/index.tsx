import LoginForm from './LoginForm';
import styles from './login.module.scss';

const Login = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.id}>로그인</h3>
        </header>

        <LoginForm />
      </section>
    </main>
  );
};

export default Login;
