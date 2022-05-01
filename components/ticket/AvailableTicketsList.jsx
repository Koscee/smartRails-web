import React, { useContext } from 'react';
import { Table } from 'antd';
import { useRouter } from 'next/router';
import { CHOOSE_TICKET } from '../../actions/types';
import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';

import defineAvailableTicketsTableColumns from './availableTicketsTableColumns';

function AvailableTicketsList() {
  const { dispatch, loading, availableTickets } = useContext(
    TicketPurchaseContext
  );
  const router = useRouter();

  const handleBookBtnClick = (schedule, selectedTicket) => {
    dispatch({
      type: CHOOSE_TICKET,
      payload: { schedule, selectedTicket },
    });
    router.push('/admin/bookings/purchase-ticket');
  };

  const columns = defineAvailableTicketsTableColumns(handleBookBtnClick);

  return (
    <div>
      <Table
        dataSource={availableTickets}
        size="middle"
        columns={columns}
        loading={loading.table}
        scroll={{ y: 350 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default AvailableTicketsList;
