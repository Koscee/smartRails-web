import {
  ADD_TRAIN_TYPE,
  DELETE_TRAIN_TYPE,
  GET_TRAIN_TYPES,
  UPDATE_TRAIN_TYPE,
} from '../actions/types';

// const initialTrainTypes = [/** TrainTypes data fetched from the backend */];

export default function trainTypeReducer(state, action) {
  switch (action.type) {
    case ADD_TRAIN_TYPE:
      return [action.payload, ...state];

    case UPDATE_TRAIN_TYPE: {
      const newData = state;
      const index = newData.findIndex(
        (trainType) => action.payload._id === trainType._id
      );
      const trainType = newData[index];
      newData.splice(index, 1, { ...trainType, ...action.payload });
      return [...newData];
    }

    case GET_TRAIN_TYPES:
      return [...action.payload];

    case DELETE_TRAIN_TYPE:
      return state.filter((trainType) => trainType._id !== action.payload);

    default:
      return state;
  }
}
