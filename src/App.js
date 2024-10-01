import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';  // Import the LoginPage component
import ForgotPasswordPage from './ForgotPasswordPage'; // Import ForgotPasswordPage component

const App = () => {
    const navigate = useNavigate();  // This hook will help navigate between pages

    const handleLoginClick = () => {
        navigate('/login');  // This will navigate to the Login page
    };

    const handleSignupClick = () => {
        navigate('/signup');  // Navigate to signup page
    };

    return (
        <div className="container">
            <div className="login-buttons">
                <button className="login-btn" onClick={handleLoginClick}>Login</button>
                <button className="signup-btn" onClick={handleSignupClick}>SignUp</button> {/* Add onClick here */}
            </div>

            {/* Add the sticker at the top-left corner */}
            <img src="/images/rating-system.png" alt="Rating System Sticker" className="sticker-top-left" />

            <h1>Rate Rate Professor</h1>

            <p>Enter the name of your professor or department and start rating.</p>

            {/* Thumbs up image inserted here */}
            <img src="/images/thumps_up.png" alt="Thumbs Up" className="thumbs-up" />

            <div className="search-bar">
                <input type="text" placeholder="Search for professor or department....." />
                <img src="/images/search.png" alt="Search Icon" className="search-icon" />
            </div>

            <div className="footer-links">
                <div>
                    <a href="#">Help</a> | <a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a>
                </div>
                <div className="footer-icons">
                    <a href="#"><img src="/images/facebook.png" alt="Facebook" /></a>
                    <a href="#"><img src="/images/instagram.png" alt="Instagram" /></a>
                    <a href="#"><img src="/images/gmail.png" alt="Email" /></a>
                </div>
            </div>
        </div>
    );
};

export default App;
