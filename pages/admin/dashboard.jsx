import React from 'react';
import { AdminDashboard } from '../../components/Dashboard';
import { AdminLayout, MainContent } from '../../components/Layouts';

function AdminDashboardPage() {
  return (
    <MainContent title="Dashboard">
      <AdminDashboard />
    </MainContent>
  );
}

export default AdminDashboardPage;

AdminDashboardPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
