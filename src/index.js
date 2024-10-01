import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';  // Import the SignupPage component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} /> {/* Login Page Route */}
        <Route path="/signup" element={<SignupPage />} /> {/* Signup Page Route */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
