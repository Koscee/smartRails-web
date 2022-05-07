import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';
import {
  ADD_STATION,
  UPDATE_STATION,
  DELETE_STATION,
  GET_STATIONS,
} from './types';

export const addStation = async (dispatch, formData, form, setBtnLoading) => {
  // make post request to /api/stations
  try {
    setBtnLoading(true);
    const res = await smartrailsApi.post('/api/stations', formData);
    openNotificationWithIcon(
      'success',
      `Added "${formData.en_name} station" successfully!`
    );
    form.resetFields();
    setBtnLoading(false);
    dispatch({ type: ADD_STATION, payload: res.data });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const updateStation = async (
  dispatch,
  stationId,
  formData,
  closeForm,
  setBtnLoading
) => {
  // make put request to /api/stations
  try {
    setBtnLoading(true);
    const res = await smartrailsApi.put(`/api/stations/${stationId}`, formData);
    openNotificationWithIcon(
      'success',
      `Updated ${formData.en_name} station's data successfully!`
    );
    setBtnLoading(false);
    dispatch({ type: UPDATE_STATION, payload: res.data });
    closeForm(false);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const getStation = async (stationId) => {
  // make get request to /api/stations:id
  try {
    const res = await smartrailsApi.get(`/api/stations/${stationId}`);
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const getStations = async (dispatch) => {
  // make get request to /api/stations
  try {
    const res = await smartrailsApi.get('/api/stations');
    if (dispatch) {
      dispatch({ type: GET_STATIONS, payload: res.data });
    }
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const deleteStation = async (dispatch, stationId) => {
  // make delete request to /api/stations
  try {
    await smartrailsApi.delete(`/api/stations/${stationId}`);
    openNotificationWithIcon('success', 'Station deleted successfully!');
    dispatch({ type: DELETE_STATION, payload: stationId });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
  }
};
