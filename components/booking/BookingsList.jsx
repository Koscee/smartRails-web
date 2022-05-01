import { Table } from 'antd';
import React, { useContext, useState } from 'react';
import { cancelBooking } from '../../actions/bookingActions';
import { BookingContext } from '../../contexts/BookingContext';
import defineBookingTableColumns from './bookingTableColumns';
import LoadingSpinner from '../LoadingSpinner';
import confirmCancelBooking from './confirmCancelBooking';
import CustomModal from '../CustomModal';
import BookingDetails from './BookingDetails';

const statusColor = {
  pending: 'blue',
  complete: 'green',
  cancelled: 'volcano',
  expired: 'default',
};

function BookingsList() {
  const { bookings, dispatch } = useContext(BookingContext);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const showDetailsModal = () => {
    setDetailsModalVisible(true);
  };

  const onDetailsModalCancel = () => {
    console.log('Clicked cancel button');
    setDetailsModalVisible(false);
  };

  const handleCancelBooking = (order) => {
    console.log(order);
    confirmCancelBooking(
      order,
      (closeModal) =>
        new Promise(() => {
          cancelBooking(dispatch, order._id, closeModal);
        })
    );
  };

  const columns = defineBookingTableColumns(
    bookings || [],
    statusColor,
    setSelectedItem,
    showDetailsModal,
    handleCancelBooking
  );

  return !bookings ? (
    <LoadingSpinner />
  ) : (
    <div>
      <CustomModal
        title="Order Details"
        footer={null}
        maskClosable
        visible={detailsModalVisible}
        onCancel={onDetailsModalCancel}
      >
        <BookingDetails order={selectedItem} statusColor={statusColor} />
      </CustomModal>

      <Table
        bordered
        size="middle"
        dataSource={bookings}
        columns={columns}
        scroll={{ y: 350, x: 1250 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default BookingsList;
