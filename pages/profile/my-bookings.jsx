import React from 'react';
import { BasicLayout, PageCenterWrapper } from '../../components/Layouts';
import { MyBookingsList } from '../../components/profile';

function MyBookingsPage() {
  return (
    <PageCenterWrapper>
      <MyBookingsList />
    </PageCenterWrapper>
  );
}

export default MyBookingsPage;

MyBookingsPage.getLayout = function getLayout(page) {
  return <BasicLayout pageProtected>{page}</BasicLayout>;
};
