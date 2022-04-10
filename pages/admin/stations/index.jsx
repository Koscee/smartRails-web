import React from 'react';
import { getStations } from '../../../actions/stationActions';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { StationsList } from '../../../components/station';
import { StationProvider } from '../../../contexts';
import smartrailsApi from '../../../utils/apiConfig';

function StationsPage({ stationsList, cities }) {
  return (
    <StationProvider stationsList={stationsList} cities={cities}>
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

export async function getServerSideProps() {
  const stationsList = await getStations();
  const res = await smartrailsApi.get('/api/cities');
  const cities = res.data;

  return {
    props: { stationsList, cities },
  };
}
