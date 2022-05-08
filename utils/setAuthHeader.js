import smartrailsApi from './apiConfig';

export default function setAuthHeader(token) {
  if (token) {
    smartrailsApi.defaults.headers.Authorization = token;
  } else {
    delete smartrailsApi.defaults.headers.Authorization;
  }
}
