import React, { useContext, useState } from 'react';
import { Table } from 'antd';
import { useRouter } from 'next/router';
import { CHOOSE_TICKET, RESET_DETAILS } from '../../actions/types';
import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import defineAvailableTicketsTableColumns from './availableTicketsTableColumns';
import CustomModal from '../CustomModal';
import { AuthContext } from '../../contexts/AuthContext';
import { isSuperOrBasicAdmin } from '../../utils/permissionCheck';
import { BookTicket } from '../booking';

function AvailableTicketsList({ tableScroll, purchaseURL }) {
  const router = useRouter();
  const { authData } = useContext(AuthContext);
  const { dispatch, loading, availableTickets } = useContext(
    TicketPurchaseContext
  );
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = authData;
  const hasAnyAdminRole = isSuperOrBasicAdmin(user?.role);

  const showModal = () => {
    setModalVisible(true);
  };

  const onModalCancel = () => {
    dispatch({ type: RESET_DETAILS });
    setModalVisible(false);
  };

  const handleBookBtnClick = (schedule, selectedTicket) => {
    dispatch({
      type: CHOOSE_TICKET,
      payload: { schedule, selectedTicket },
    });
    if (hasAnyAdminRole) {
      showModal();
    } else {
      router.push(purchaseURL);
    }
  };

  const columns = defineAvailableTicketsTableColumns(handleBookBtnClick);

  return (
    <div>
      <CustomModal
        title="Purchase Ticket"
        width={900}
        height={580}
        visible={modalVisible}
        onCancel={onModalCancel}
      >
        <BookTicket />
      </CustomModal>

      <Table
        dataSource={availableTickets}
        size="middle"
        columns={columns}
        loading={loading.table}
        scroll={tableScroll ? { y: 350 } : null}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default AvailableTicketsList;
