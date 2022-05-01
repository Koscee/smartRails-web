import { Button, Result } from 'antd';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import LoadingSpinner from '../LoadingSpinner';

function PaymentSuccess() {
  const { purchaseInfo } = useContext(TicketPurchaseContext);
  const router = useRouter();
  const { order } = purchaseInfo;

  return !order?._id ? (
    <LoadingSpinner tip="loading..." size="large" />
  ) : (
    <Result
      status="success"
      title="Successfully Purchased Ticket!"
      subTitle={`Order number: ${order._id} Click "View Ticket" to download or print ticket.`}
      // the home button should be dynamic depending on the logged in user
      // if user go to user bookings list pg if admin go to admin booking list pg
      // use the router func so that user cannot click on the back button
      extra={[
        <Button key="home" onClick={() => router.replace('/')}>
          Home
        </Button>,
        <Button
          type="primary"
          key="view_ticket"
          href={`/ticket/${order._id}`}
          target="_blank"
        >
          View Ticket
        </Button>,
      ]}
    />
  );
}

export default PaymentSuccess;
