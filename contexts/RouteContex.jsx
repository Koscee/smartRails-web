import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useMemo,
} from 'react';
import { getRoutes } from '../actions/routeActions';
import { getStations } from '../actions/stationActions';
import routeReducer from '../reducers/routeReducer';

export const RouteContext = createContext();

function RouteProvider({ children }) {
  const [routes, dispatch] = useReducer(routeReducer, null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    (async () => {
      await getRoutes(dispatch);
      const stationsList = await getStations();
      setStations(stationsList);
    })();
  }, []);

  const values = useMemo(
    () => ({ routes, stations, dispatch }),
    [routes, stations]
  );

  return (
    <RouteContext.Provider value={values}>{children}</RouteContext.Provider>
  );
}

export default RouteProvider;
