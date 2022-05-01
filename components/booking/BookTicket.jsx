import React, { useState } from 'react';
import { Steps } from 'antd';
import {
  CheckCircleOutlined,
  FormOutlined,
  PayCircleOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import ConfirmDetails from './ConfirmDetails';
import Payment from './Payment';
import AddPassenger from './AddPassenger';
import PaymentSuccess from './PaymentSuccess';

const { Step } = Steps;

const steps = [
  {
    title: 'Add Passenger',
    content: AddPassenger,
    icon: <FormOutlined />,
  },
  {
    title: 'Confirm Details',
    content: ConfirmDetails,
    icon: <SolutionOutlined />,
  },
  {
    title: 'Pay',
    content: Payment,
    icon: <PayCircleOutlined />,
  },
  {
    title: 'Done',
    content: PaymentSuccess,
    icon: <CheckCircleOutlined />,
  },
];

function BookTicket({ styles }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const renderContent = (Content) => (
    <Content nextStep={next} previousStep={prev} />
  );

  return (
    <div className={styles.book_ticket}>
      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>

      <div className={styles.steps_content}>
        {renderContent(steps[current].content)}
      </div>
    </div>
  );
}

export default BookTicket;
