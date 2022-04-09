import { ADD_STATION, DELETE_STATION, UPDATE_STATION } from '../actions/types';

// const initialStations = [/** stations data fetched from the backend */];

export default function stationReducer(state, action) {
  switch (action.type) {
    case ADD_STATION:
      return [action.payload, ...state];

    case UPDATE_STATION: {
      const newData = state;
      const index = newData.findIndex(
        (station) => action.payload._id === station._id
      );
      const station = newData[index];
      newData.splice(index, 1, { ...station, ...action.payload });
      return [...newData];
    }

    case DELETE_STATION:
      return state.filter((station) => station._id !== action.payload);

    default:
      return state;
  }
}
