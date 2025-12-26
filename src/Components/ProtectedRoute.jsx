import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');
  const location = useLocation();

  // Check if user is logged in (has both token and userData)
  const isLoggedIn = token && userData;

  // If user is authenticated, render the component
  if (isLoggedIn) {
    return children;
  }

  // If user is not authenticated, redirect to login page with the current location
  // After login, user will be redirected back to this page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
