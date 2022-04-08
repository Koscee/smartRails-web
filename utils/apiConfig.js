import axios from 'axios';

const smartrailsApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export default smartrailsApi;
