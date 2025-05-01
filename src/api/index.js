import axios from 'axios';
import { useAuthenticateStore } from '@/stores/authenticate.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_VUE_API_BASE_URL
});

api.interceptors.request.use((config) => {
  const authenticate = useAuthenticateStore();
  if(authenticate.isLoggedIn) {
    config.headers.Authorization = "Bearer " + authenticate.jwtToken;
  }
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response) {   
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);      
  } else if (error.request) {
      console.error(error.request);
  }
});

export default api;