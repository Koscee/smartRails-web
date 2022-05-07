import moment from 'moment';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { getBooking } from '../../actions/bookingActions';
import { Ticket } from '../../components/ticket';
import { PageCenterWrapper } from '../../components/Layouts';
import TICKET_STATUS from '../../utils/ticketStatus';
import PageLoading from '../../components/PageLoading';

function TicketPage({ orderDetails }) {
  const ticketRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
  });

  const router = useRouter();

  if (router.isFallback) {
    return <PageLoading />;
  }

  return (
    <PageCenterWrapper>
      <Ticket details={orderDetails} ref={ticketRef} />
      <Button
        type="primary"
        size="middle"
        icon={<PrinterOutlined />}
        onClick={handlePrint}
      >
        Print
      </Button>
    </PageCenterWrapper>
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

  if (
    !orderDetails ||
    orderDetails.status !== TICKET_STATUS.complete.name ||
    // temporary check for expired tickets
    moment(orderDetails.schedule.dep_date).diff(moment(), 'days') < 0
  ) {
    return { notFound: true };
  }

  return {
    props: {
      orderDetails,
    },
    revalidate: 20,
  };
}
