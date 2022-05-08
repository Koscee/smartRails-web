import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { authReducer } from '../reducers';
import { LOAD_AUTH_CONTEXT, SET_CURRENT_USER } from '../actions/types';
import { logout } from '../actions/authActions';
import PageLoading from '../components/PageLoading';

export const AuthContext = createContext();

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null,
};

function AuthProvider({ children }) {
  const [authData, dispatch] = useReducer(authReducer, initialState);
  const values = useMemo(() => ({ authData, dispatch }), [authData]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.jwtToken;

    if (token) {
      const decoded = jwtDecode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: { success: true, user: decoded },
      });

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout(dispatch, router);
      }
    } else {
      dispatch({ type: LOAD_AUTH_CONTEXT, payload: false });
    }
  }, [router]);

  if (authData.loading) {
    return <PageLoading />;
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
