import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import {
  AdminTicketSearchForm,
  AvailableTicketsList,
} from '../../../components/ticket';

function AvailableTicketsPage() {
  return (
    <MainContent title="Bookings" subtitle="Purchase Ticket">
      <AdminTicketSearchForm />
      <AvailableTicketsList />
    </MainContent>
  );
}

export default AvailableTicketsPage;

AvailableTicketsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
