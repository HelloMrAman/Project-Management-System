import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Create the Redux store with the authReducer
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
