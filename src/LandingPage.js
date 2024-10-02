import React from 'react';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
    return (
        <div className="landing-container">
            {/* Top left corner: Light Bulb icon */}
            <img src="/images/Lightbulb.png" alt="Light Bulb" className="lightbulb-icon" />

            {/* Top right corner: Hey, User button */}
            <div className="user-button">
                Hey, User
            </div>

            {/* Center Content */}
            <div className="center-content">
                <h1 className="landing-title">Welcome to Rate Rate Professor</h1>
                <p className="landing-subtitle">Enter your major or Professor's name and start searching</p>

                {/* Books sticker */}
                <img src="/images/Books.png" alt="Books" className="books-icon" />

                {/* Search bar */}
                <div className="search-bar">
                    <input type="text" placeholder="Enter your major..." />
                    <button type="submit" className="search-btn">
                        <img src="/images/search.png" alt="Search" />
                    </button>
                </div>
            </div>

            {/* Bottom right corner: New Icon */}
            <img src="/images/protected.png" alt="protected" className="bottom-right-icon" />
        </div>
    );
};

export default LandingPage;
