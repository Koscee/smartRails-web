import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';
import { DELETE_PASSENGER, GET_PASSENGERS } from './types';

export const getPassengers = async (dispatch) => {
  // make get request to /api/passengers
  try {
    const res = await smartrailsApi.get('/api/passengers');
    if (dispatch) {
      dispatch({ type: GET_PASSENGERS, payload: res.data });
    }
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const addPassenger = async (dispatch, formData, form, setBtnLoading) => {
  // make post request to /api/passengers
  try {
    setBtnLoading(true);
    await smartrailsApi.post('/api/passengers', formData);
    openNotificationWithIcon('success', 'Added passenger successfully!');
    form.resetFields();
    setBtnLoading(false);
    getPassengers(dispatch);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const updatePassenger = async (
  dispatch,
  passengerId,
  formData,
  closeForm,
  setBtnLoading
) => {
  // make put request to /api/passengers
  try {
    setBtnLoading(true);
    await smartrailsApi.put(`/api/passengers/${passengerId}`, formData);
    openNotificationWithIcon('success', 'Updated passenger successfully!');
    setBtnLoading(false);
    getPassengers(dispatch);
    closeForm(false);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const getPassenger = async (passengerId) => {
  // make get request to /api/passengers:id
  try {
    const res = await smartrailsApi.get(`/api/passengers/${passengerId}`);
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const deletePassenger = async (dispatch, passengerId) => {
  // make delete request to /api/passengers
  try {
    const res = await smartrailsApi.delete(`/api/passengers/${passengerId}`);
    openNotificationWithIcon('success', res.data);
    dispatch({ type: DELETE_PASSENGER, payload: passengerId });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
  }
};
