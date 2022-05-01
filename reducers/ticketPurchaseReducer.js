import {
  ADD_PASSENGER_INFO,
  CHOOSE_TICKET,
  CONFIRM_PAYMENT,
} from '../actions/types';

const initialState = {
  schedule: {},
  selectedTicket: {},
  passenger: {},
  order: {},
};

export default function ticketPurchaseReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_TICKET:
      return {
        ...state,
        schedule: action.payload.schedule,
        selectedTicket: action.payload.selectedTicket,
      };

    case ADD_PASSENGER_INFO:
      return {
        ...state,
        passenger: action.payload,
      };

    case CONFIRM_PAYMENT:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
}
