import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';

function PassengersPage() {
  return (
    <MainContent title="Passengers">
      <div>
        <h1>List of all Passengers</h1>
      </div>
    </MainContent>
  );
}

export default PassengersPage;

PassengersPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
