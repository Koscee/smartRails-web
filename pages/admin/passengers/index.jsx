import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { PassengerProvider } from '../../../contexts';
import { PassengersList } from '../../../components/passenger';

function PassengersPage() {
  return (
    <PassengerProvider>
      <MainContent title="Passengers">
        <PassengersList />
      </MainContent>
    </PassengerProvider>
  );
}

export default PassengersPage;

PassengersPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
