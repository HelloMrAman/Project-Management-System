import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../../services/authService';

const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email
    };
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user-token') 
      ? getUserFromToken(localStorage.getItem('user-token')) 
      : null,
    isAuthenticated: !!localStorage.getItem('user-token'),
    token: localStorage.getItem('user-token') || null,
    loading: false,
    error: null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { token } = action.payload;
      const user = getUserFromToken(token);
      
      state.user = user;
      state.isAuthenticated = true;
      state.token = token;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
      authService.logout();
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout 
} = authSlice.actions;

export default authSlice.reducer;