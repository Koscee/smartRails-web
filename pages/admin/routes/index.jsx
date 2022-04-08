import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';

function RoutesPage() {
  return (
    <MainContent title="Routes">
      <div>
        <h1>List of all Routes</h1>
      </div>
    </MainContent>
  );
}

export default RoutesPage;

RoutesPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
