import { GET_BOOKINGS } from '../actions/types';

export default function bookingReducer(state, action) {
  switch (action.type) {
    case GET_BOOKINGS:
      return [...action.payload];

    default:
      return state;
  }
}
