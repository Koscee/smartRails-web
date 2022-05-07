import React from 'react';
import { BookTicket } from '../components/booking';
import { BasicLayout, PageCenterWrapper } from '../components/Layouts';
import styles from '../styles/BookTicket.module.css';

function BookTicketPage() {
  return (
    <PageCenterWrapper>
      <div className={styles.container}>
        <BookTicket />
      </div>
    </PageCenterWrapper>
  );
}

export default BookTicketPage;

BookTicketPage.getLayout = function getLayout(page) {
  return <BasicLayout pageProtected>{page}</BasicLayout>;
};
