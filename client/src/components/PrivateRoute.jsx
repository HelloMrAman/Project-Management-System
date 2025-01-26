import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, token, user } = useSelector(state => state.auth);

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;