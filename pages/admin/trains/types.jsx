import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { TrainTypesList } from '../../../components/train/type';
import { TrainTypeProvider } from '../../../contexts';

function TrainTypesPage() {
  return (
    <TrainTypeProvider>
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
