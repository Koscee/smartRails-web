import { SwapRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Row, Space } from 'antd';
import React, { useContext } from 'react';
import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import styles from './styles/ConfimDetails.module.css';

function ConfirmDetails({ nextStep, previousStep }) {
  const { purchaseInfo } = useContext(TicketPurchaseContext);
  const { schedule, selectedTicket, passenger } = purchaseInfo;

  return (
    <div className={styles.container}>
      <Row justify="space-around">
        <Col span={14}>
          <Card size="small" className={styles.general_info}>
            <Space size="small" direction="vertical" align="start">
              <Space size="large" className={styles.journey_title}>
                <Space>
                  <h4>{schedule.from_cn}</h4>
                  <h4>{schedule.from}</h4>
                </Space>
                <SwapRightOutlined className={styles.arrow_icon} />
                <Space>
                  <h4>{schedule.to_cn}</h4>
                  <h4>{schedule.to}</h4>
                </Space>
              </Space>
              <Card
                size="small"
                title="Passenger Details"
                type="inner"
                className={styles.passenger_details}
              >
                <Space size="large" direction="vertical">
                  <Descriptions column={2}>
                    <Descriptions.Item label="Full Name" span={2}>
                      {`${passenger.first_name} ${
                        passenger.middle_name || ''
                      } ${passenger.last_name}`}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">
                      {passenger.gender === 'M' ? 'Male' : 'Female'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">
                      {passenger.dOB}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nationality">
                      {passenger.nationality}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID Type">
                      {passenger.ID_type}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID No.">
                      {passenger.ID_no}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID Expiry Date">
                      {passenger.ID_exp_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone Number">
                      {passenger.phone_no}
                    </Descriptions.Item>
                  </Descriptions>
                </Space>
              </Card>
              <Button type="primary" ghost onClick={previousStep}>
                Change Details
              </Button>
            </Space>
          </Card>
        </Col>

        <Col span={7}>
          <Card
            title="Order Summary"
            type="inner"
            size="small"
            className={styles.order_summary}
          >
            <Descriptions column={2}>
              <Descriptions.Item label="Train No." span={2}>
                {schedule.train_no}
              </Descriptions.Item>
              <Descriptions.Item label="Seat Type" span={2}>
                {selectedTicket.seat_type}
              </Descriptions.Item>
              <Descriptions.Item label="Depature Date" span={2}>
                {schedule.dep_date}
              </Descriptions.Item>
              <Descriptions.Item label="Depature Time" span={2}>
                {schedule.dep_time}
              </Descriptions.Item>
            </Descriptions>

            <Divider dashed className={styles.divider} />

            <Descriptions column={2} size={2} className={styles.price_info}>
              <Descriptions.Item label="Ticket Price" span={2}>
                {`￥${selectedTicket.base_price.toFixed(2)}`}
              </Descriptions.Item>
              <Descriptions.Item label="Discount" span={2}>
                {`${selectedTicket.discount}%`}
              </Descriptions.Item>
              <Descriptions.Item label="Total" span={2}>
                {`￥${selectedTicket.actual_price.toFixed(2)}`}
              </Descriptions.Item>
            </Descriptions>

            <div className={styles.proceed_button}>
              <Button type="primary" onClick={nextStep}>
                Proceed to Payment
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ConfirmDetails;
