import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteUser = ({ children }) => {
  const user = localStorage.getItem('currentUser');
  return user ? children : <Navigate to="/survey-login" replace />;
};

export default ProtectedRouteUser;