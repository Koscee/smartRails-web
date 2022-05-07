import { SwapRightOutlined } from '@ant-design/icons';
import { List, PageHeader, Skeleton, Space, Statistic, Tag } from 'antd';
import VirtualList from 'rc-virtual-list';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { cancelBooking, getBookings } from '../../actions/bookingActions';
import styles from './styles/MyBookingsList.module.css';
import TICKET_STATUS from '../../utils/ticketStatus';
import { confirmCancelBookingModal } from '../booking';
import { ActionButton } from '../buttons';

function MyBookingsList() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    (async () => {
      const bookingsList = await getBookings();
      setBookings(bookingsList);
    })();
  }, []);

  const showLoadingSkeleton = () => (
    <div className={styles.container}>
      <Skeleton loading active />
      <Skeleton loading active />
      <Skeleton loading active />
    </div>
  );

  const getDaysDiffFromNow = (date) => moment(date).diff(moment(), 'days');

  const handleCancelBooking = (order) => {
    confirmCancelBookingModal(
      order,
      (closeModal) =>
        new Promise(() => {
          cancelBooking(order._id, closeModal);
        })
    );
  };

  if (!bookings) {
    return showLoadingSkeleton();
  }

  return (
    <div className={styles.container}>
      <PageHeader title="My Bookings" />

      <List className={styles.list}>
        {bookings.length < 1 ? (
          <h4>You have no bookings in your account</h4>
        ) : (
          <VirtualList
            data={bookings}
            height={400}
            itemKey="_id"
            itemHeight={115}
            className={styles.virtual_list}
          >
            {(item) => (
              <List.Item
                key={item._id}
                className={styles.list_item}
                actions={[
                  <ActionButton
                    text="view"
                    key="view-ticket"
                    href={`/ticket/${item._id}`}
                    target="_blank"
                    disabled={
                      item.status === TICKET_STATUS.cancelled.name ||
                      // temporary check for expired tickets
                      getDaysDiffFromNow(item?.schedule?.dep_date) < 0
                    }
                  />,
                  <ActionButton
                    danger
                    text="cancel"
                    key="cancel-booking"
                    disabled={
                      item.status !== TICKET_STATUS.complete.name ||
                      getDaysDiffFromNow(item?.schedule?.dep_date) < 1
                    }
                    onClick={() => handleCancelBooking(item)}
                  />,
                ]}
                extra={
                  <Tag
                    className={styles.list_item_tag}
                    color={TICKET_STATUS[item.status].color}
                  >
                    {item.status}
                  </Tag>
                }
              >
                <List.Item.Meta
                  title={item.passenger.full_name}
                  description={
                    <Space direction="vertical">
                      <Space>
                        <span>{`${item.schedule.from} (${item.schedule.from_cn})`}</span>
                        <SwapRightOutlined />
                        <span>{`${item.schedule.to} (${item.schedule.to_cn})`}</span>
                      </Space>

                      <Space size="large">
                        <Statistic
                          title="Depature"
                          className={styles.statistic}
                          value={`${item.schedule.dep_date} ${item.schedule.dep_time}`}
                        />
                        <Statistic
                          title="Train"
                          className={styles.statistic}
                          value={item.seat.train_no}
                        />
                        <Statistic
                          title="Amount paid"
                          prefix="￥"
                          precision={2}
                          className={styles.statistic}
                          value={item.paid_amount}
                        />
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            )}
          </VirtualList>
        )}
      </List>
    </div>
  );
}

export default MyBookingsList;
