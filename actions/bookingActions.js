import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';
import { CONFIRM_PAYMENT, GET_BOOKINGS, RESET_DETAILS } from './types';

export const getBookings = async (dispatch) => {
  // make get request to /api/bookings
  try {
    const res = await smartrailsApi.get('/api/bookings');
    if (dispatch) {
      dispatch({ type: GET_BOOKINGS, payload: res.data });
    }
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const addBooking = async (
  dispatch,
  purchaseRequest,
  setProcessing,
  nextStep
) => {
  // make post request to /api/bookings
  try {
    const res = await smartrailsApi.post('/api/bookings', purchaseRequest);
    dispatch({ type: CONFIRM_PAYMENT, payload: res.data });
    setProcessing(false);
    nextStep();
    // clear passernger and selected journey info from the context object
    dispatch({ type: RESET_DETAILS });
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    setProcessing(false);
    openNotificationWithIcon('error', errorsMssg);
  }
};

export const cancelBooking = async (bookingId, closeModal, dispatch) => {
  // make put request to /api/bookings/cancel/:id
  try {
    await smartrailsApi.get(`/api/bookings/cancel/${bookingId}`);
    openNotificationWithIcon('success', 'Cancelled order successfully!');
    if (dispatch) {
      getBookings(dispatch);
    }
    closeModal();
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    closeModal();
  }
};

export const getBooking = async (bookingId) => {
  // make get request to /api/bookings/:id
  try {
    const res = await smartrailsApi.get(`/api/bookings/${bookingId}`);
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};
