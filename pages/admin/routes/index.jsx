import React from 'react';
import { getRoutes } from '../../../actions/routeActions';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { RoutesList } from '../../../components/route';
import { RouteProvider } from '../../../contexts';
import smartrailsApi from '../../../utils/apiConfig';

function RoutesPage({ routesList, stations }) {
  return (
    <RouteProvider routesList={routesList} stations={stations}>
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

export async function getServerSideProps() {
  const routesList = await getRoutes();
  const res = await smartrailsApi.get('/api/stations');
  const stations = res.data;

  return {
    props: { routesList, stations },
  };
}
