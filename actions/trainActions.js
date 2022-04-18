import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';
import { DELETE_TRAIN, GET_TRAINS } from './types';

export const getTrains = async (dispatch) => {
  // make get request to /api/trains
  try {
    const res = await smartrailsApi.get('/api/trains');
    if (dispatch) {
      dispatch({ type: GET_TRAINS, payload: res.data });
    }
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const addTrain = async (dispatch, formData, form, setBtnLoading) => {
  // make post request to /api/trains
  try {
    setBtnLoading(true);
    await smartrailsApi.post('/api/trains', formData);
    openNotificationWithIcon(
      'success',
      `Added train "${formData.train_no}" successfully!`
    );
    form.resetFields();
    setBtnLoading(false);
    getTrains(dispatch);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const updateTrain = async (
  dispatch,
  trainId,
  formData,
  closeForm,
  setBtnLoading
) => {
  // make put request to /api/trains
  try {
    setBtnLoading(true);
    await smartrailsApi.put(`/api/trains/${trainId}`, formData);
    openNotificationWithIcon(
      'success',
      `Updated train ${formData.train_no} successfully!`
    );
    setBtnLoading(false);
    getTrains(dispatch);
    closeForm(false);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const getTrain = async (trainId) => {
  // make get request to /api/trains:id
  try {
    const res = await smartrailsApi.get(`/api/trains/${trainId}`);
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const deleteTrain = async (dispatch, trainId) => {
  // make delete request to /api/trains
  try {
    const res = await smartrailsApi.delete(`/api/trains/${trainId}`);
    openNotificationWithIcon('success', res.data);
    dispatch({ type: DELETE_TRAIN, payload: trainId });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
  }
};
