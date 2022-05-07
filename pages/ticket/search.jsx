import React from 'react';
import { BasicLayout, PageCenterWrapper } from '../../components/Layouts';
import { TicketSearchForm } from '../../components/ticket';

function TicketSearchPage() {
  return (
    <PageCenterWrapper>
      <TicketSearchForm />
    </PageCenterWrapper>
  );
}

export default TicketSearchPage;

TicketSearchPage.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
