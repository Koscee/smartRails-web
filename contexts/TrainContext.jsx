import React, { useReducer, createContext, useMemo } from 'react';
import { trainReducer } from '../reducers';

export const TrainContext = createContext();

function TrainProvider({ trainsList, routes, trainTypes, children }) {
  const [trains, dispatch] = useReducer(trainReducer, trainsList);

  const values = useMemo(
    () => ({ trains, routes, trainTypes, dispatch }),
    [trains, routes, trainTypes]
  );
  return (
    <TrainContext.Provider value={values}>{children}</TrainContext.Provider>
  );
}

export default TrainProvider;
