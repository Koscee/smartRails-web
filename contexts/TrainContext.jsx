import React, {
  useReducer,
  useEffect,
  useState,
  createContext,
  useMemo,
} from 'react';
import { getRoutes } from '../actions/routeActions';
import { getTrains } from '../actions/trainActions';
import { getTrainTypes } from '../actions/trainTypeAction';
import { trainReducer } from '../reducers';

export const TrainContext = createContext();

function TrainProvider({ children }) {
  const [trains, dispatch] = useReducer(trainReducer, null);
  const [routes, setRoutes] = useState([]);
  const [trainTypes, setTrainTypes] = useState([]);

  useEffect(() => {
    (async () => {
      await getTrains(dispatch);
      const routesList = await getRoutes();
      const trainTypesList = await getTrainTypes();
      setRoutes(routesList);
      setTrainTypes(trainTypesList);
    })();
  }, []);

  const values = useMemo(
    () => ({ trains, routes, trainTypes, dispatch }),
    [trains, routes, trainTypes]
  );

  return (
    <TrainContext.Provider value={values}>{children}</TrainContext.Provider>
  );
}

export default TrainProvider;
