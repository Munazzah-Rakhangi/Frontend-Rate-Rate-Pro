import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  let user = null;

  // Safely parse user from localStorage
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    localStorage.removeItem('user'); // Clear potentially corrupted data
  }

  // If no user is found, redirect to login page with a message
  if (!user) {
    return <Navigate to="/login" state={{ message: "Please log in or sign up to access this page." }} replace />;
  }

  return children; // Allow access if the user is authenticated
};

export default PrivateRoute;
