import React, { createContext, useEffect, useReducer, useMemo } from 'react';
import { getTrainTypes } from '../actions/trainTypeAction';
import { trainTypeReducer } from '../reducers';

export const TrainTypeContext = createContext();

function TrainTypeProvider({ children }) {
  const [trainTypes, dispatch] = useReducer(trainTypeReducer, []);

  useEffect(() => {
    (async () => {
      await getTrainTypes(dispatch);
    })();
  }, []);

  const values = useMemo(() => ({ trainTypes, dispatch }), [trainTypes]);

  return (
    <TrainTypeContext.Provider value={values}>
      {children}
    </TrainTypeContext.Provider>
  );
}

export default TrainTypeProvider;
