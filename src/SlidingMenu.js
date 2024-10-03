import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SlidingMenu.css';

const SlidingMenu = () => {
    const location = useLocation();
    const initialTab = location.state?.selectedOption || 'Profile';
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        if (location.state?.selectedOption) {
            setActiveTab(location.state.selectedOption);
        }
    }, [location.state]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <div className="tab-content">
                        <div className="profile-section">
                            <div className="profile-info">
                                <div className="profile-label">First Name</div>
                                <div className="profile-value">User</div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-label">Last Name</div>
                                <div className="profile-value"></div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-label">School</div>
                                <div className="profile-value">School of Science and Engineering</div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-label">Field of Study</div>
                                <div className="profile-value">Artificial Intelligence</div>
                            </div>
                        </div>
                        <button className="edit-button">Edit</button>
                    </div>
                );
            case 'Account Settings':
                return (
                    <div className="tab-content">
                        <h2>Account Settings</h2>
                        <p>This is where account settings details will go.</p>
                        <button className="edit-button">Edit</button>
                    </div>
                );
            case 'Ratings':
                return (
                    <div className="tab-content">
                        <h2>Your Ratings</h2>
                        <p>This is where your ratings will be displayed.</p>
                        <button className="edit-button">Edit</button>
                    </div>
                );
            case 'Saved Professors':
                return (
                    <div className="tab-content">
                        <h2>Saved Professors</h2>
                        <p>This is where your saved professors will be displayed.</p>
                        <button className="edit-button">Edit</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="full-screen-container">
            <div className="sliding-menu-container">
                {/* Header Section */}
                <div className="sliding-header">
                    <h1 className="sliding-title">Hey, User</h1>
                </div>

                {/* Tabs Section */}
                <div className="tabs-container">
                    <div
                        className={`tab ${activeTab === 'Profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Profile')}
                    >
                        Profile
                    </div>
                    <div
                        className={`tab ${activeTab === 'Account Settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Account Settings')}
                    >
                        Account Settings
                    </div>
                    <div
                        className={`tab ${activeTab === 'Ratings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Ratings')}
                    >
                        Ratings
                    </div>
                    <div
                        className={`tab ${activeTab === 'Saved Professors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Saved Professors')}
                    >
                        Saved Professors
                    </div>
                </div>

                {/* Content Section */}
                <div className="content-container">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SlidingMenu;
