import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('isAdmin');

  if (!isAdminAuthenticated) {
    // التحويل إلى صفحة الدخول إذا لم تكن مسجلة
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;