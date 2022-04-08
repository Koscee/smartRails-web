import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';

function BookingsPage() {
  return (
    <MainContent title="Bookings">
      <div>
        <h1>List of all Bookings</h1>
      </div>
    </MainContent>
  );
}

export default BookingsPage;

BookingsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
