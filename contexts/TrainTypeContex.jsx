import React, { createContext, useReducer, useMemo } from 'react';
import { trainTypeReducer } from '../reducers';

export const TrainTypeContext = createContext();

function TrainTypeProvider({ trainTypesList, children }) {
  const [trainTypes, dispatch] = useReducer(trainTypeReducer, trainTypesList);

  const values = useMemo(() => ({ trainTypes, dispatch }), [trainTypes]);

  return (
    <TrainTypeContext.Provider value={values}>
      {children}
    </TrainTypeContext.Provider>
  );
}

export default TrainTypeProvider;
