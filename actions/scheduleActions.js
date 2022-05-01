import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';

export const getSchedules = async (searchQuery) => {
  // make get request to /api/trains/schedules
  try {
    const res = await smartrailsApi.get('/api/trains/schedules', {
      params: { ...searchQuery },
    });
    return res.data;
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    return openNotificationWithIcon('error', errorsMssg);
  }
};

export const addSchedules = async (formData, form, setBtnLoading) => {
  // make post request to /api/trains/schedules
  try {
    setBtnLoading(true);
    await smartrailsApi.post('/api/trains/schedules', formData);
    openNotificationWithIcon(
      'success',
      `Created schedules for train "${formData.train_no}" successfully!`
    );
    form.resetFields();
    setBtnLoading(false);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const updateSchedules = async (formData, closeForm, setBtnLoading) => {
  // make put request to /api/trains/schedules
  try {
    setBtnLoading(true);
    await smartrailsApi.put('/api/trains/schedules', formData);
    openNotificationWithIcon(
      'success',
      `Updated schedules for train "${formData.train_no}" successfully!`
    );
    setBtnLoading(false);
    closeForm(false);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
    setBtnLoading(false);
  }
};

export const deleteSchedules = async (trainNo) => {
  // make delete request to /api/trains/schedules/:trainNo
  try {
    const res = await smartrailsApi.delete(`/api/trains/schedules/${trainNo}`);
    openNotificationWithIcon('success', res.data);
  } catch (err) {
    const errorsMssg = err.response?.data.error.message;
    console.log(errorsMssg);
    openNotificationWithIcon('error', errorsMssg);
  }
};
