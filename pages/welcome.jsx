import Head from 'next/head';
import { Button } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import styles from '../styles/Welcome.module.css';
import SmartRailsLogo from '../components/SmartRailsLogo';

function WelcomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Rails</title>
        <meta name="description" content="Online railway reservation system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <a href="https://github.com/Koscee/smartRails-web">
            <SmartRailsLogo width={200} height={50} />
          </a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>
            An Online Railway Reservation System
          </code>
        </p>

        <Button type="primary" href="/">
          Click Me
        </Button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Koscee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubFilled />
          &nbsp; Designed by Koscee &nbsp; {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
}

export default WelcomePage;
