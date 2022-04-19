import React from 'react';
import { AdminLayout, MainContent } from '../../../components/Layouts';
import { SchedulesList } from '../../../components/schedule';

function SchedulesPage() {
  return (
    <MainContent title="Schedules">
      <SchedulesList />
    </MainContent>
  );
}

export default SchedulesPage;

SchedulesPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
