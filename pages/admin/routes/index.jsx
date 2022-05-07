import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { RoutesList } from '../../../components/route';
import { RouteProvider } from '../../../contexts';

function RoutesPage() {
  return (
    <RouteProvider>
      <MainContent title="Routes">
        <RoutesList />
      </MainContent>
    </RouteProvider>
  );
}

export default RoutesPage;

RoutesPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
