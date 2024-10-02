import React, { useState } from 'react';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
    // State to toggle the dropdown visibility
    const [showDropdown, setShowDropdown] = useState(false);

    // Toggle dropdown visibility on button click
    const handleUserButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="landing-container">
            {/* Top left corner: Light Bulb icon */}
            <img src="/images/Lightbulb.png" alt="Light Bulb" className="lightbulb-icon" />

            {/* Top right corner: Hey, User button */}
            <div className="user-button" onClick={handleUserButtonClick}>
                Hey, User
            </div>

            {/* Dropdown menu that appears when "Hey, User" is clicked */}
            {showDropdown && (
                <div className="dropdown-menu">
                    <div className="dropdown-item">Profile</div>
                    <div className="dropdown-item">Account Settings</div>
                    <div className="dropdown-item">Your Ratings</div>
                    <div className="dropdown-item">Saved Professor</div>
                    <div className="dropdown-item">Logout</div>
                </div>
            )}

            {/* Center Content */}
            <div className="center-content">
                <h1 className="landing-title">Rate Rate Professor</h1>
                <p className="landing-subtitle">Enter your major and get started</p>

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
