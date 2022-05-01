import { Badge, Descriptions } from 'antd';
import React from 'react';

function BookingDetails({ order, statusColor }) {
  const {
    _id,
    status,
    passenger,
    schedule,
    seat,
    paid_amount,
    refund_amount,
    created_at,
  } = order;

  return (
    <Descriptions bordered size="middle" column={5}>
      <Descriptions.Item label="Order Id" span={5}>
        {_id}
      </Descriptions.Item>
      <Descriptions.Item label="Status" span={3}>
        <Badge status={statusColor[status]} text={status} />
      </Descriptions.Item>
      <Descriptions.Item label="Order time" span={2}>
        {created_at}
      </Descriptions.Item>
      <Descriptions.Item label="Passenger Name" span={5}>
        {passenger?.full_name}
      </Descriptions.Item>
      <Descriptions.Item label="Passenger ID No." span={5}>
        {passenger?.ID_no}
      </Descriptions.Item>
      <Descriptions.Item label="Paid Amount" span={3}>
        {`￥${paid_amount}`}
      </Descriptions.Item>
      <Descriptions.Item label="Refund Amount" span={2}>
        {`￥${refund_amount}`}
      </Descriptions.Item>
      <Descriptions.Item label="Ticket Type" span={5}>
        {seat?.type}
      </Descriptions.Item>
      <Descriptions.Item label="Journey Info">
        Depature Station:{' '}
        {schedule ? `${schedule.from} (${schedule.from_cn})` : '---'}
        <br />
        Arrival Station:{' '}
        {schedule ? `${schedule.to} (${schedule.to_cn})` : '---'}
        <br />
        Time: {schedule ? `${schedule.dep_date} ${schedule.dep_time}` : '---'}
        <br />
        Train: {seat?.train_no}
        <br />
        Car: {seat?.car_no}
        <br />
        Seat: {seat?.sno}
        <br />
      </Descriptions.Item>
    </Descriptions>
  );
}

export default BookingDetails;
