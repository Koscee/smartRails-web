import React from 'react';
import { getRoutes } from '../../../actions/routeActions';
import { getTrains } from '../../../actions/trainActions';
import { getTrainTypes } from '../../../actions/trainTypeAction';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { TrainsList } from '../../../components/train';
import { TrainProvider } from '../../../contexts';

function TrainsPage({ trainsList, routes, trainTypes }) {
  return (
    <TrainProvider
      trainsList={trainsList}
      routes={routes}
      trainTypes={trainTypes}
    >
      <MainContent title="Trains">
        <TrainsList />
      </MainContent>
    </TrainProvider>
  );
}

export default TrainsPage;

TrainsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps() {
  const trainsList = await getTrains();
  const routes = await getRoutes();
  const trainTypes = await getTrainTypes();

  return {
    props: { trainsList, routes, trainTypes },
  };
}
