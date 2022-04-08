import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';

function TrainsPage() {
  return (
    <MainContent title="Trains">
      <div>
        <h1>List of all Trains</h1>
      </div>
    </MainContent>
  );
}

export default TrainsPage;

TrainsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
