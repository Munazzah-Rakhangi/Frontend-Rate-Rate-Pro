import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleUserButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDropdownItemClick = (option) => {
        navigate('/menu', { state: { selectedOption: option } });
    };

    return (
        <div className="landing-container">
            <img src="/images/Lightbulb.png" alt="Light Bulb" className="lightbulb-icon" />
            <div className="user-button" onClick={handleUserButtonClick}>
                Hey, User
            </div>

            {showDropdown && (
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Profile")}>Profile</div>
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Account Settings")}>Account Settings</div>
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Ratings")}>Your Ratings</div>
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Saved Professors")}>Saved Professor</div>
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Logout")}>Logout</div>
                </div>
            )}

            <div className="center-content">
                <h1 className="landing-title">Rate Rate Professor</h1>
                <p className="landing-subtitle">Enter your major and get started</p>
                <img src="/images/Books.png" alt="Books" className="books-icon" />

                <div className="search-bar">
                    <input type="text" placeholder="Enter your major..." />
                    <button type="submit" className="search-btn">
                        <img src="/images/search.png" alt="Search" />
                    </button>
                </div>
            </div>
            <img src="/images/protected.png" alt="protected" className="bottom-right-icon" />
        </div>
    );
};

export default LandingPage;
