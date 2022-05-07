import Icon, {
  AccountBookFilled,
  GithubFilled,
  ScheduleFilled,
} from '@ant-design/icons';
import { Card, Divider, Space } from 'antd';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserSearchJourneyForm } from './ticket';
import TrainSvg from '../public/assets/train-icon.svg';
import { TicketPurchaseContext } from '../contexts/TicketPurchaseContext';
import { DATE_FORMAT } from '../utils/constants';
import { getSchedules } from '../actions/scheduleActions';

// card in the 'Our Services' section of the Home page
function CustomCard({ CardIcon, title, description, styles }) {
  return (
    <Card className={styles.card}>
      <div className={styles.card_icon_circle}>
        <CardIcon className={styles.card_icon} />
      </div>
      <h4 className={styles.card_title}>{title}</h4>
      <p className={styles.card_desc}>{description}</p>
    </Card>
  );
}

// train icon
function TrainIconFilled() {
  return <Icon component={TrainSvg} style={{ fontSize: '1.4em' }} />;
}

// Home component
function Home({ styles }) {
  const router = useRouter();
  const { setLoading, setAvailableTickets } = useContext(TicketPurchaseContext);

  const onSearch = async (formData) => {
    const searchQuery = formData;
    searchQuery.dep_date = searchQuery.dep_date.format(DATE_FORMAT);
    // set loading
    setLoading({ searchBtn: true, table: true });
    // call getSchedules action.
    const foundAvailableTickets = await getSchedules(searchQuery);

    setAvailableTickets(foundAvailableTickets);

    router.push({
      pathname: '/search-trains',
      query: { ...searchQuery },
    });

    // unset loading
    setLoading({ searchBtn: false, table: false });
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.top_section}>
          <Space direction="vertical" className={styles.top_section_text}>
            {/* <p>Train Services</p> */}
            <h3>Welcome To SmartRails</h3>
            <span>An online railway reservation system</span>
          </Space>
          <div className={styles.search_form}>
            <UserSearchJourneyForm onSearch={onSearch} />
          </div>
        </div>
        <div className={styles.middle_section}>
          <h3>
            <Divider>Our Services</Divider>
          </h3>
          <Space className={styles.cards_container}>
            <CustomCard
              styles={styles}
              CardIcon={TrainIconFilled}
              title="Train Information"
              description="Provides accurate and real time train data for easy access"
            />
            <CustomCard
              styles={styles}
              CardIcon={AccountBookFilled}
              title="Ticket Booking"
              description="Allows a fast and easy booking of tickect with just simple clicks"
            />
            <CustomCard
              styles={styles}
              CardIcon={ScheduleFilled}
              title="Automatic Scheduling"
              description="Reduce 70% of workload by generating train schedules for multiple stops within a route"
            />
          </Space>
        </div>
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
    </>
  );
}

export default Home;
