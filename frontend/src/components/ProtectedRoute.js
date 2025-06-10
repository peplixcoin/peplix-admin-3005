import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If token is present, render the protected component
  return children;
};

export default ProtectedRoute;
