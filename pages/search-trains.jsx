import { SwapRightOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { getSchedules } from '../actions/scheduleActions';
import { BasicLayout, MainContent } from '../components/Layouts';
import {
  AvailableTicketsList,
  UserSearchJourneyForm,
} from '../components/ticket';
import { TicketPurchaseContext } from '../contexts/TicketPurchaseContext';
import { DATE_FORMAT } from '../utils/constants';

function SearchTrainsPage() {
  const router = useRouter();
  const { query } = router;
  const hasQuery = Object.keys(query).length > 0;
  const { setLoading, setAvailableTickets } = useContext(TicketPurchaseContext);
  const [journey, setJourney] = useState({
    from: query?.from || '',
    to: query?.to || '',
  });
  const { from, to } = journey;

  const onSearch = async (formData) => {
    const searchQuery = formData;
    searchQuery.dep_date = searchQuery.dep_date.format(DATE_FORMAT);
    // set loading
    setLoading({ searchBtn: true, table: true });
    // update url params
    router.replace({ pathname: router.pathname, query: searchQuery });

    // call getSchedules action.
    const foundAvailableTickets = await getSchedules(searchQuery);

    setAvailableTickets(foundAvailableTickets);

    setJourney({ from: formData.from, to: formData.to });
    // unset loading
    setLoading({ searchBtn: false, table: false });
  };

  return (
    <MainContent>
      <div style={{ margin: '60px 80px 0' }}>
        <UserSearchJourneyForm
          onSearch={onSearch}
          initialValues={hasQuery ? query : null}
        />
        {from && to ? (
          <h2 style={{ margin: '10px 0 20px' }}>
            {from} <SwapRightOutlined /> {to}
          </h2>
        ) : null}
        <AvailableTicketsList purchaseURL="/book-ticket" />
      </div>
    </MainContent>
  );
}

export default SearchTrainsPage;

SearchTrainsPage.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};
