import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Descriptions, Modal } from 'antd';

export default function confirmCancelBooking(order, cb = () => {}) {
  const { paid_amount } = order;
  const refundAmount = Math.round(paid_amount * 0.93);
  const chargeFee = paid_amount - refundAmount;
  return Modal.confirm({
    title: 'Are you sure to cancel this booking?',
    icon: <ExclamationCircleOutlined />,
    content: (
      <>
        <p>
          Note: <em>7% of ticket price will be charged on every refund</em>
        </p>
        <Descriptions size="small" bordered column={1}>
          <Descriptions.Item label="Paid Amount:">
            {`￥${paid_amount}`}
          </Descriptions.Item>
          <Descriptions.Item label="Cancellation Fee:">
            {`￥${chargeFee}`}
          </Descriptions.Item>
          <Descriptions.Item label="Refund Amount:">
            {`￥${refundAmount}`}
          </Descriptions.Item>
        </Descriptions>
      </>
    ),
    onOk(closeModal) {
      return cb(closeModal);
    },
    onCancel() {},
  });
}
