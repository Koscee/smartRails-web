import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { getPassengers } from '../actions/passengerActions';
import { passengerReducer } from '../reducers';

export const PassengerContext = createContext();

function PassengerProvider({ children }) {
  const [passengers, dispatch] = useReducer(passengerReducer, null);

  // dispatch action to get passengers lists and update the passengers state
  useEffect(() => {
    (async () => {
      await getPassengers(dispatch);
    })();
  }, []);

  const values = useMemo(() => ({ passengers, dispatch }), [passengers]);

  return (
    <PassengerContext.Provider value={values}>
      {children}
    </PassengerContext.Provider>
  );
}

export default PassengerProvider;
