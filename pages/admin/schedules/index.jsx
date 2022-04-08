import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';

function SchedulesPage() {
  return (
    <MainContent title="Schedules">
      <div>
        <h1>List of train Schedules</h1>
      </div>
    </MainContent>
  );
}

export default SchedulesPage;

SchedulesPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
