import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { StationsList } from '../../../components/station';
import { StationProvider } from '../../../contexts';

function StationsPage() {
  return (
    <StationProvider>
      <MainContent title="Stations">
        <StationsList />
      </MainContent>
    </StationProvider>
  );
}

export default StationsPage;

StationsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
