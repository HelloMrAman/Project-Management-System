import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('user-token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw {
        message: error.response?.data?.message || 'An unknown error occurred',
        status: error.response?.status || 500,
      };
    }
  },

  async register(name, email, password) {
    try {
      const response = await apiClient.post('/register', { name, email, password });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw {
        message: error.response?.data?.message || 'An unknown error occurred',
        status: error.response?.status || 500,
      };
    }
  },

  logout() {
    localStorage.removeItem('user-token'); // Remove token from localStorage
    // Additional cleanup code (e.g., clearing Redux state) can be added here
  },

  getCurrentUser() {
    const token = localStorage.getItem('user-token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        this.logout();
        return null;
      }
    }
    return token;
  },
};
