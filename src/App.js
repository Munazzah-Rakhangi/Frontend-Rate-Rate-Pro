import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';  // Import the LoginPage component
import ForgotPasswordPage from './ForgotPasswordPage'; // Import ForgotPasswordPage component

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');  // State to hold the search query
    const navigate = useNavigate();  // This hook will help navigate between pages

    // Navigate to the Login page
    const handleLoginClick = () => {
        navigate('/login');
    };

    // Navigate to the Signup page
    const handleSignupClick = () => {
        navigate('/signup');
    };

    // Handle the search and navigate to the Professor Results Page
    const handleSearch = () => {
        // Check if searchQuery is not empty
        if (searchQuery.trim() !== '') {
            // Navigate to the Professor Results Page and pass the searchQuery as a state or query parameter
            navigate('/professor-results', { state: { query: searchQuery } });
        }
    };

    return (
        <div className="container">
            <div className="login-buttons">
                <button className="login-btn" onClick={handleLoginClick}>Login</button>
                <button className="signup-btn" onClick={handleSignupClick}>SignUp</button>
            </div>

            {/* Add the sticker at the top-left corner */}
            <img src="/images/rating-system.png" alt="Rating System Sticker" className="sticker-top-left" />

            <h1>Rate Rate Professor</h1>

            <p>Enter the name of your professor or department and start rating.</p>

            {/* Thumbs up image inserted here */}
            <img src="/images/thumps_up.png" alt="Thumbs Up" className="thumbs-up" />

            {/* Search bar with a button to trigger the search */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for professor or department....."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
                />
                <img
                    src="/images/search.png"
                    alt="Search Icon"
                    className="search-icon"
                    onClick={handleSearch}  // Trigger the search on click
                    style={{ cursor: 'pointer' }}
                />
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
