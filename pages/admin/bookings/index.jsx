import React from 'react';
import { BookingList } from '../../../components/booking';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { BookingProvider } from '../../../contexts';

function BookingsPage() {
  return (
    <BookingProvider>
      <MainContent title="Bookings">
        <BookingList />
      </MainContent>
    </BookingProvider>
  );
}

export default BookingsPage;

BookingsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
