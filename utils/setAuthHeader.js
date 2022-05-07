import smartrailsApi from './apiConfig';

export default function setAuthHeader(token) {
  if (token) {
    smartrailsApi.defaults.headers.common.Authorization = token;
  } else {
    delete smartrailsApi.defaults.headers.common.Authorization;
  }
}
