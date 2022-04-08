import React from 'react';
import { AdminLayout, MainContent } from '../../components/Layouts';

function AdminDashboardPage() {
  return (
    <MainContent title="Dashboard">
      <div style={{ minWidth: '350px', margin: '30px 10%' }}>
        <h1>Displays all systems information</h1>
      </div>
    </MainContent>
  );
}

export default AdminDashboardPage;

AdminDashboardPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
