import axios from 'axios';
import { useAuthenticateStore } from '@/stores/authenticate.js';
const authenticate = useAuthenticateStore();

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_API_BASE_URL
});

api.interceptors.request.use((config) => {
  if (authenticate.isLoggedIn) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authenticate.jwtToken}`;
  }
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  console.error(error.config);
  // throw error;
});

export default api;