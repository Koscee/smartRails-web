import React, { createContext, useReducer, useMemo } from 'react';
import routeReducer from '../reducers/routeReducer';

export const RouteContext = createContext();

function RouteProvider({ routesList, stations, children }) {
  const [routes, dispatch] = useReducer(routeReducer, routesList);

  const values = useMemo(
    () => ({ routes, stations, dispatch }),
    [routes, stations]
  );

  return (
    <RouteContext.Provider value={values}>{children}</RouteContext.Provider>
  );
}

export default RouteProvider;
