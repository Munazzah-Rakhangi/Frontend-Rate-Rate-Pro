import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import LandingPage from './LandingPage';
import SlidingMenu from './SlidingMenu';
import ProfessorResultsPage from './ProfessorResultsPage';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes */}
        <Route 
          path="/landing" 
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/menu" 
          element={
            <PrivateRoute>
              <SlidingMenu />
            </PrivateRoute>
          } 
        />

        {/* Public route */}
        <Route path="/professor-results" element={<ProfessorResultsPage />} /> {/* Public route */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
