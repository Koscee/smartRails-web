import jwtDecode from 'jwt-decode';
import {
  errorMessage,
  openNotificationWithIcon,
} from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';
import { isSuperOrBasicAdmin } from '../utils/permissionCheck';
import setAuthHeader from '../utils/setAuthHeader';
import { LOGOUT_USER, SET_CURRENT_USER } from './types';

const getApiError = (err) => err.response?.data.error;

export const login = async (dispatch, userDetails, setBtnLoading, router) => {
  try {
    setBtnLoading(true);
    // send data to /api/users/login
    const res = await smartrailsApi.post('/api/users/login', userDetails);

    // extract token from res.data
    const { success, token } = res.data;

    // store user's token in the localStorage
    localStorage.setItem('jwtToken', token);

    // set user's token in the request header
    setAuthHeader(token);

    // decode token using jwt-decode package library
    const decoded = jwtDecode(token);

    // set submit button loading state
    setBtnLoading(false);
    // dispatch SET_CURRENT_USER action
    dispatch({ type: SET_CURRENT_USER, payload: { success, user: decoded } });

    // if its an admin redirect to admin dashboard, else redirect to home
    if (isSuperOrBasicAdmin(decoded.role)) {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/');
    }
  } catch (err) {
    const { message } = getApiError(err);
    setBtnLoading(false);
    errorMessage(message);
    console.log(message);
  }
};

/** Default User register action */
export const register = async (endpoint, formData, setBtnLoading, router) => {
  try {
    setBtnLoading(true);
    // send data to server endpoint
    await smartrailsApi.post(endpoint, formData);
    setBtnLoading(false);
    // redirect to login page
    router.push('/account/login');
    openNotificationWithIcon('success', 'Registered successfully');
  } catch (err) {
    const { message } = getApiError(err);
    setBtnLoading(false);
    errorMessage(message);
    console.log(message);
  }
};

/** Default User register action */
export const registerUser = (formData, setBtnLoading, router) => {
  register('/api/users/register', formData, setBtnLoading, router);
};

/** Admin register action */
export const registerAdmin = (formData, setBtnLoading, router) => {
  register('/api/users/admin/register', formData, setBtnLoading, router);
};

export const getUser = async (userId) => {
  try {
    const res = await smartrailsApi.get(`/api/users/${userId}`);
    return res.data;
  } catch (err) {
    const { message } = getApiError(err);
    return openNotificationWithIcon('error', message);
  }
};

export const logout = async (dispatch, router) => {
  try {
    // make call to /api/users/logout
    await smartrailsApi.get('/api/users/logout');
    // remove token from localStorage
    localStorage.removeItem('jwtToken');
    // delete token from the request header
    setAuthHeader(false);
    // dispatch LOGOUT_USER action
    dispatch({ type: LOGOUT_USER, payload: {} });
    router.replace('/account/login');
  } catch (err) {
    const { message } = getApiError(err);
    errorMessage(message);
    console.log(message);
  }
};
