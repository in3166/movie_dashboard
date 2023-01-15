import Container from 'components/Container';
import styles from './home.module.scss';

const Home = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2>Movie 목록 조회</h2>
        <div>
          <span>아무개씨</span>
          <span>^^</span>
        </div>
      </header>
      <Container>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>vote_average</th>
              <th>vote_count</th>
              <th>release_date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tdIndex}>2</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </main>
  );
};

export default Home;
