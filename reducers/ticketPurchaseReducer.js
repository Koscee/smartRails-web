import {
  ADD_PASSENGER_INFO,
  CHOOSE_TICKET,
  CONFIRM_PAYMENT,
  RESET_DETAILS,
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

    case RESET_DETAILS:
      return {
        ...state,
        schedule: {},
        selectedTicket: {},
        passenger: {},
      };

    default:
      return state;
  }
}
