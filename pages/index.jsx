import Head from 'next/head';
import Home from '../components/Home';
import { BasicLayout } from '../components/Layouts';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Rails</title>
        <meta name="description" content="Online railway reservation system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home styles={styles} />
    </div>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
