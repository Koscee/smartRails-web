import { openNotificationWithIcon } from '../utils/actionMessages';
import smartrailsApi from '../utils/apiConfig';

const getSystemRecordsSummary = async () => {
  try {
    // fetches data that will be displayed on the dashboard
    const res = await smartrailsApi.get('/api/records/summary');
    return res.data;
  } catch (err) {
    const { message } = err.response.data.error;
    return openNotificationWithIcon('error', message);
  }
};

export default getSystemRecordsSummary;
