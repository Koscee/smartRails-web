import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { getBooking } from '../../actions/bookingActions';
import { Ticket } from '../../components/ticket';
import LoadingSpinner from '../../components/LoadingSpinner';

function TicketPage({ orderDetails }) {
  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
  });

  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="screen-wrapper">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="screen-wrapper">
      <Ticket details={orderDetails} ref={ticketRef} />
      <Button
        type="primary"
        size="middle"
        icon={<PrinterOutlined />}
        onClick={handlePrint}
      >
        Print
      </Button>
    </div>
  );
}

export default TicketPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const orderDetails = await getBooking(id);

  if (!orderDetails || orderDetails.status !== 'complete') {
    return { notFound: true };
  }

  return {
    props: {
      orderDetails,
    },
    revalidate: 20,
  };
}
