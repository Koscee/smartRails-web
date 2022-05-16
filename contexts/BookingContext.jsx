import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { getBookings } from '../actions/bookingActions';
import { bookingReducer } from '../reducers';

export const BookingContext = createContext();

function BookingProvider({ children }) {
  const [bookings, dispatch] = useReducer(bookingReducer, null);

  // dispatch action to get list of bookings and update the bookings state
  useEffect(() => {
    (async () => {
      await getBookings(dispatch);
    })();
  }, []);

  const values = useMemo(() => ({ bookings, dispatch }), [bookings]);
  return (
    <BookingContext.Provider value={values}>{children}</BookingContext.Provider>
  );
}

export default BookingProvider;
