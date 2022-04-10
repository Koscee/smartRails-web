import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';
import {
  ADD_TRAIN_TYPE,
  UPDATE_TRAIN_TYPE,
  GET_TRAIN_TYPES,
  DELETE_TRAIN_TYPE,
} from './types';

export const addTrainType = async (dispatch, formData, form, setBtnLoading) => {
  // make post request to /api/trains/types
  try {
    setBtnLoading(true);
    const res = await smartrailsApi.post('/api/trains/types', formData);
    openNotificationWithIcon(
      'success',
      `Added service type "${formData.name}" successfully!`
    );
    form.resetFields();
    setBtnLoading(false);
    dispatch({ type: ADD_TRAIN_TYPE, payload: res.data });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const updateTrainType = async (
  dispatch,
  trainTypeId,
  formData,
  closeForm,
  setBtnLoading
) => {
  // make put request to /api/trains/types
  try {
    setBtnLoading(true);
    const res = await smartrailsApi.put(
      `/api/trains/types/${trainTypeId}`,
      formData
    );
    openNotificationWithIcon(
      'success',
      `Updated service type ${formData.name} successfully!`
    );
    setBtnLoading(false);
    dispatch({ type: UPDATE_TRAIN_TYPE, payload: res.data });
    closeForm(false);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const getTrainType = async (trainTypeId) => {
  // make get request to /api/trains/types:id
  try {
    const res = await smartrailsApi.get(`/api/trains/types/${trainTypeId}`);
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const getTrainTypes = async (dispatch) => {
  // make get request to /api/trains/types
  try {
    const res = await smartrailsApi.get('/api/trains/types');
    if (dispatch) {
      dispatch({ type: GET_TRAIN_TYPES, payload: res.data });
    }
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const deleteTrainType = async (dispatch, trainTypeId) => {
  // make delete request to /api/trains/types
  try {
    const res = await smartrailsApi.delete(`/api/trains/types/${trainTypeId}`);
    openNotificationWithIcon('success', res.data);
    dispatch({ type: DELETE_TRAIN_TYPE, payload: trainTypeId });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
  }
};
