import React from 'react';
import './App.css';

const App = () => {
    return (
        <div className="container">
            <div className="login-buttons">
                <button className="login-btn">Login</button>
                <button className="signup-btn">SignUp</button>
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
