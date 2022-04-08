import React, { createContext, useReducer, useMemo } from 'react';
import stationReducer from '../reducers/stationReducer';

export const StationContext = createContext();

function StationProvider({ stationsList, cities, children }) {
  const [stations, dispatch] = useReducer(stationReducer, stationsList);

  const values = useMemo(
    () => ({ stations, cities, dispatch }),
    [stations, cities]
  );

  return (
    <StationContext.Provider value={values}>{children}</StationContext.Provider>
  );
}

export default StationProvider;
