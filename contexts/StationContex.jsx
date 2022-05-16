import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useMemo,
} from 'react';
import { getStations } from '../actions/stationActions';
import stationReducer from '../reducers/stationReducer';
import smartrailsApi from '../utils/apiConfig';

export const StationContext = createContext();

function StationProvider({ children }) {
  const [stations, dispatch] = useReducer(stationReducer, null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      await getStations(dispatch);
      const res = await smartrailsApi.get('/api/cities');
      const citiesList = res.data;
      setCities(citiesList);
    })();
  }, []);

  const values = useMemo(
    () => ({ stations, cities, dispatch }),
    [stations, cities]
  );

  return (
    <StationContext.Provider value={values}>{children}</StationContext.Provider>
  );
}

export default StationProvider;
