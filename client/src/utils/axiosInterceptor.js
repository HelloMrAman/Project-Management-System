// client/src/utils/axiosInterceptor.js
import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    config => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Token is invalid or expired
        store.dispatch(logout());
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
