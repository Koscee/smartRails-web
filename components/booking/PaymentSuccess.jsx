import { Button, Result } from 'antd';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import LoadingSpinner from '../LoadingSpinner';
import { AuthContext } from '../../contexts/AuthContext';
import { isSuperOrBasicAdmin } from '../../utils/permissionCheck';

function PaymentSuccess() {
  const router = useRouter();
  const { purchaseInfo } = useContext(TicketPurchaseContext);
  const { order } = purchaseInfo;
  const { authData } = useContext(AuthContext);
  const { user } = authData;

  const pathName = isSuperOrBasicAdmin(user.role)
    ? '/admin/bookings'
    : '/profile/my-bookings';

  return !order?._id ? (
    <LoadingSpinner tip="loading..." size="large" />
  ) : (
    <Result
      status="success"
      title="Successfully Purchased Ticket!"
      subTitle={`Order number: ${order._id} Click "View Ticket" to download or print ticket.`}
      extra={[
        <Button key="home" onClick={() => router.replace(pathName)}>
          Bookings
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
