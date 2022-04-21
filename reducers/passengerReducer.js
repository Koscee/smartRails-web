import { DELETE_PASSENGER, GET_PASSENGERS } from '../actions/types';

// const initialPassengers = [/** Passengers data fetched from the backend */];

export default function passengerReducer(state, action) {
  switch (action.type) {
    case GET_PASSENGERS:
      return [...action.payload];

    case DELETE_PASSENGER:
      return state.filter((passenger) => passenger._id !== action.payload);

    default:
      return state;
  }
}
