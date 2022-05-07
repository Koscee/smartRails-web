import React from 'react';
import { BookTicket } from '../../../components/booking';
import styles from '../../../styles/BookTicket.module.css';

function AdminBookTicketPage() {
  return (
    <div className={styles.container}>
      <BookTicket />
    </div>
  );
}

export default AdminBookTicketPage;
