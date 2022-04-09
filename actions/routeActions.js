import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';
import { ADD_ROUTE, DELETE_ROUTE, GET_ROUTES, UPDATE_ROUTE } from './types';

export const getRoute = async (routeId) => {
  // make get request to /api/trains/routes:id
  try {
    const res = await smartrailsApi.get(`/api/trains/routes/${routeId}`);
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const getRoutes = async (dispatch) => {
  // make get request to /api/trains/routes
  try {
    const res = await smartrailsApi.get('/api/trains/routes');
    if (dispatch) {
      dispatch({ type: GET_ROUTES, payload: res.data });
    }
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const addRoute = async (dispatch, formData, form, setBtnLoading) => {
  // make post request to /api/trains/routes
  try {
    setBtnLoading(true);
    const res = await smartrailsApi.post('/api/trains/routes', formData);
    openNotificationWithIcon(
      'success',
      `Added route from "${formData.start_station} -- ${formData.end_station}" successfully!`
    );
    form.resetFields();
    setBtnLoading(false);
    dispatch({ type: ADD_ROUTE, payload: res.data });
    await getRoutes(dispatch);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const updateRoute = async (
  dispatch,
  routeId,
  formData,
  closeForm,
  setBtnLoading
) => {
  // make put request to /api/trains/routes
  try {
    setBtnLoading(true);
    const res = await smartrailsApi.put(
      `/api/trains/routes/${routeId}`,
      formData
    );
    openNotificationWithIcon(
      'success',
      `Updated route from "${formData.start_station} -- ${formData.end_station}" successfully!`
    );
    setBtnLoading(false);
    dispatch({ type: UPDATE_ROUTE, payload: res.data });
    await getRoutes(dispatch);
    closeForm();
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const deleteRoute = async (dispatch, routeId) => {
  // make delete request to /api/trains/routes
  try {
    await smartrailsApi.delete(`/api/trains/routes/${routeId}`);
    openNotificationWithIcon('success', 'Route deleted successfully!');
    dispatch({ type: DELETE_ROUTE, payload: routeId });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
  }
};
