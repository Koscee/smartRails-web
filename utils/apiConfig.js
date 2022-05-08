import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_SERVER_URI || 'http://localhost:8000';

const token = typeof window !== 'undefined' ? localStorage.jwtToken : null;

const smartrailsApi = axios.create({
  baseURL,
  headers: {
    Authorization: token,
  },
});

export default smartrailsApi;
