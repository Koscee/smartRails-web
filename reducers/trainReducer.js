import { DELETE_TRAIN, GET_TRAINS } from '../actions/types';

// const initialTrain = [/** Trains data fetched from the backend */];

export default function trainReducer(state, action) {
  switch (action.type) {
    case GET_TRAINS:
      return [...action.payload];

    case DELETE_TRAIN:
      return state.filter((train) => train._id !== action.payload);

    default:
      return state;
  }
}
