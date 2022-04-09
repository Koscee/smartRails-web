import {
  ADD_ROUTE,
  DELETE_ROUTE,
  GET_ROUTES,
  UPDATE_ROUTE,
} from '../actions/types';

// const initialRoutes = [/** routes data fetched from the backend */];

export default function routeReducer(state, action) {
  switch (action.type) {
    case ADD_ROUTE:
      return [action.payload, ...state];

    case UPDATE_ROUTE: {
      const newData = state;
      const index = newData.findIndex(
        (route) => action.payload._id === route._id
      );
      const route = newData[index];
      newData.splice(index, 1, { ...route, ...action.payload });
      return [...newData];
    }

    case GET_ROUTES:
      return [...action.payload];

    case DELETE_ROUTE:
      return state.filter((route) => route._id !== action.payload);

    default:
      return state;
  }
}
