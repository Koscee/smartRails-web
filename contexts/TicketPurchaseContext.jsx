import React, { createContext, useMemo, useState, useReducer } from 'react';
import ticketPurchaseReducer from '../reducers/ticketPurchaseReducer';

export const TicketPurchaseContext = createContext();

function TicketPurchaseProvider({ children }) {
  const [availableTickets, setAvailableTickets] = useState([]);
  const [loading, setLoading] = useState({
    searchBtn: false,
    table: false,
  });
  const [purchaseInfo, dispatch] = useReducer(ticketPurchaseReducer, {});

  const values = useMemo(
    () => ({
      availableTickets,
      setAvailableTickets,
      loading,
      setLoading,
      purchaseInfo,
      dispatch,
    }),
    [availableTickets, loading, purchaseInfo]
  );

  return (
    <TicketPurchaseContext.Provider value={values}>
      {children}
    </TicketPurchaseContext.Provider>
  );
}

export default TicketPurchaseProvider;
