import {
  LOAD_AUTH_CONTEXT,
  LOGOUT_USER,
  SET_CURRENT_USER,
} from '../actions/types';

/* initialState = { loading: true, isAuthenticated: false, user: null } */
export default function authReducer(state, action) {
  const isValidToken = (payload) => !!payload?.success;

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: isValidToken(action.payload),
        loading: false,
        user: action.payload.user,
      };

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: isValidToken(action.payload),
        // loading: false,
        user: null,
      };

    case LOAD_AUTH_CONTEXT:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
