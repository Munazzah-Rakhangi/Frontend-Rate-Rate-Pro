import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import LandingPage from './LandingPage';
import SlidingMenu from './SlidingMenu'; // Import the new SlidingMenu component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/menu" element={<SlidingMenu />} /> {/* Add route for SlidingMenu */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
