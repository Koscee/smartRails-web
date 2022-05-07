import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.jwtToken : null;

const smartrailsApi = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Authorization: token,
  },
});

export default smartrailsApi;
