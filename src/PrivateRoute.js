import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Check if user data exists in localStorage

  // If user is not authenticated, redirect to the login page and pass a message
  if (!user) {
    return <Navigate to="/login" state={{ message: "Please log in to access this page" }} replace />;
  }

  return children; // Render the children (protected page) if user is authenticated
};

export default PrivateRoute;
