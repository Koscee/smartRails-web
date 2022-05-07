import { Divider, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import QrCode from 'react-qr-code';
import styles from './styles/Ticket.module.css';

function Ticket({ details }, ref) {
  const [pageURL, setPageURL] = useState('');
  const { _id, passenger, schedule, seat, paid_amount } = details;

  useEffect(() => {
    setPageURL(window.location.href);
  }, []);

  return (
    <div className={styles.ticket} ref={ref}>
      <Space className={styles.ticket_header}>
        <Space className={styles.ticket_station}>
          <span>{schedule.from_cn}</span>
          <span>{schedule.from}</span>
        </Space>
        <Space className={styles.ticket_header_middle_item}>
          <span>{seat.train_no}</span>
          <div className={styles.arrow_right} />
        </Space>
        <Space className={styles.ticket_station}>
          <span>{schedule.to_cn}</span>
          <span>{schedule.to}</span>
        </Space>
      </Space>

      <Space className={styles.ticket_section1}>
        <Space className={styles.ticket_section1_item}>
          <span>Date</span>
          <span>{schedule.dep_date}</span>
        </Space>
        <Space className={styles.ticket_section1_item}>
          <span>Departure</span>
          <span>{schedule.dep_time}</span>
        </Space>
      </Space>

      <Space className={styles.ticket_section2} direction="vertical" size={20}>
        <Space className={styles.ticket_section2_passenger}>
          <span>Passenger</span>
          <span>{passenger.full_name}</span>
        </Space>
        <Space
          className={styles.ticket_section2_details}
          split={
            <Divider type="vertical" className={styles.vertical_divider} />
          }
        >
          <Space className={styles.ticket_section2_details_item}>
            <span>Car</span>
            <span>{seat.car_no}</span>
          </Space>
          <Space className={styles.ticket_section2_details_item}>
            <span>Seat</span>
            <span>{seat.sno}</span>
          </Space>
          <Space className={styles.ticket_section2_details_item}>
            <span>Type</span>
            <span>{seat.type}</span>
          </Space>
        </Space>
      </Space>

      <Divider className={styles.horizontal_divider} dashed />

      <Space className={styles.ticket_footer}>
        <Space className={styles.ticket_footer_qrcode}>
          <QrCode title="SmartRails Ticket" value={pageURL} size={100} />
        </Space>
        <Space className={styles.ticket_footer_price}>
          <span>Total Price</span>
          <span>{`￥${paid_amount}.00`}</span>
        </Space>
      </Space>
      <div className={styles.ticket_footer_ticketNo}>
        <span>Ticket No.: </span>
        <span>{_id}</span>
      </div>
    </div>
  );
}

export default React.forwardRef(Ticket);
