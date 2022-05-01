import Head from 'next/head';
import Image from 'next/image';
import { Button } from 'antd';
import styles from '../styles/Home.module.css';

export default function Home() {
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
            <Image
              src="/assets/smartrails-primary.svg"
              alt="SmartRails Logo"
              width={200}
              height={50}
            />
          </a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>
            An Online Railway Reservation System
          </code>
        </p>

        <Button type="primary">Click Me</Button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Koscee"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by Koscee
        </a>
      </footer>
    </div>
  );
}
