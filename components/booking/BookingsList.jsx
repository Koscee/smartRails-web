import { Table } from 'antd';
import React, { useContext, useState } from 'react';
import { cancelBooking } from '../../actions/bookingActions';
import { BookingContext } from '../../contexts/BookingContext';
import defineBookingTableColumns from './bookingTableColumns';
import LoadingSpinner from '../LoadingSpinner';
import confirmCancelBooking from './confirmCancelBooking';
import CustomModal from '../CustomModal';
import BookingDetails from './BookingDetails';

function BookingsList() {
  const { bookings, dispatch } = useContext(BookingContext);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const showDetailsModal = () => {
    setDetailsModalVisible(true);
  };

  const onDetailsModalCancel = () => {
    setDetailsModalVisible(false);
  };

  const handleCancelBooking = (order) => {
    confirmCancelBooking(
      order,
      (closeModal) =>
        new Promise(() => {
          cancelBooking(order._id, closeModal, dispatch);
        })
    );
  };

  const columns = defineBookingTableColumns(
    bookings || [],
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
        <BookingDetails order={selectedItem} />
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
