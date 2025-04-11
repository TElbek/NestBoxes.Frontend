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
  const authenticate = useAuthenticateStore();
  if (error.response) {   
    if(import.meta.env.VITE_VUE_ERROR_THEN_LOGOUT == true) {
      // authenticate.setJwtToken(null);
      // location.reload("/");
    }
    else {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);      
    }
  } else if (error.request) {
    if(import.meta.env.VITE_VUE_ERROR_THEN_LOGOUT) { 
      // authenticate.setJwtToken(null);
      // location.reload("/");  
    } 
    else {
      console.error(error.request);
    }
  }
});

export default api;