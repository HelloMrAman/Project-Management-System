import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { authService } from '../services/authService';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      console.log('Login successful:', response); // Debugging
      return response;
    } catch (error) {
      console.error('Login failed:', error.message); // Improved logging
      return false;
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      console.log('Registration successful:', response); // Debugging
      return response;
    } catch (error) {
      console.error('Registration failed:', error.message); // Improved logging
      return false;
    }
  };

  return isLogin ? (
    <Login onLogin={handleLogin} onSwitchToRegister={() => setIsLogin(false)} />
  ) : (
    <Register onRegister={handleRegister} onSwitchToLogin={() => setIsLogin(true)} />
  );
};

export default AuthPage;