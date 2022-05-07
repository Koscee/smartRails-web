import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { TrainsList } from '../../../components/train';
import { TrainProvider } from '../../../contexts';

function TrainsPage() {
  return (
    <TrainProvider>
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
