import React from 'react';
import { getTrainTypes } from '../../../actions/trainTypeAction';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { TrainTypesList } from '../../../components/train/type';
import { TrainTypeProvider } from '../../../contexts';

function TrainTypesPage({ trainTypesList }) {
  return (
    <TrainTypeProvider trainTypesList={trainTypesList}>
      <MainContent title="Trains" subtitle="Service Class">
        <TrainTypesList />
      </MainContent>
    </TrainTypeProvider>
  );
}

export default TrainTypesPage;

TrainTypesPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps() {
  const trainTypesList = await getTrainTypes();

  return {
    props: { trainTypesList },
  };
}
