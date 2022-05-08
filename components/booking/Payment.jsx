import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space } from 'antd';
import React, { useContext, useState } from 'react';
import { addBooking } from '../../actions/bookingActions';
import { TicketPurchaseContext } from '../../contexts/TicketPurchaseContext';
import LoadingSpinner from '../LoadingSpinner';
import styles from './styles/Payment.module.css';

function Payment({ nextStep, previousStep }) {
  const { dispatch, purchaseInfo } = useContext(TicketPurchaseContext);
  const { schedule, selectedTicket, passenger } = purchaseInfo;
  const [amount, setAmount] = useState();
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^0-9]/g, '');
    setAmount(value);
    setDisabled(!(Number(value) === selectedTicket.actual_price));
  };

  const handleClick = () => {
    const purchaseRequest = {
      scheduleId: schedule._id,
      seatType: selectedTicket.seat_type,
      paidAmount: Number(amount),
      passengerData: passenger,
    };

    setProcessing(true);
    /* asynchronus call to addBooking after 2s
    if payment successful show success page else show error */
    setTimeout(() => {
      addBooking(dispatch, purchaseRequest, setProcessing, nextStep);
    }, 2000);
  };

  const prefix = <span className={styles.currency}>￥</span>;

  return (
    <LoadingSpinner tip="Processing..." size="large" spinning={processing}>
      <Card className={styles.card}>
        <Button
          size="small"
          icon={<CloseOutlined />}
          onClick={previousStep}
          className={styles.close_button}
        />

        <Space
          direction="vertical"
          size="large"
          className={styles.card_content}
        >
          <div className={styles.amount}>
            {`￥${selectedTicket.actual_price.toFixed(2)}`}
          </div>
          <Input
            size="large"
            placeholder="enter amount"
            value={amount}
            prefix={prefix}
            className={styles.number_input}
            onChange={handleInputChange}
          />
          <Button
            type="primary"
            size="large"
            disabled={disabled}
            onClick={handleClick}
            className={styles.pay_button}
          >
            Pay
          </Button>
        </Space>
      </Card>
    </LoadingSpinner>
  );
}

export default Payment;
