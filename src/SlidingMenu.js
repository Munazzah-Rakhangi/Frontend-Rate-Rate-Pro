import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SlidingMenu.css';

const SlidingMenu = () => {
    const location = useLocation();
    const initialTab = location.state?.selectedOption || 'Profile';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [user, setUser] = useState(null);

    // Fetch user data from localStorage on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
            }
        } else {
            console.warn("No user data found in localStorage");
        }
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <div className="tab-content">
                        <div className="profile-section">
                            <div className="profile-info">
                                <div className="profile-label">Username</div>
                                <div className="profile-value">{user?.username || 'N/A'}</div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-label">Email</div>
                                <div className="profile-value">{user?.email || 'N/A'}</div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-label">Nickname</div>
                                <div className="profile-value">{user?.nickname || 'N/A'}</div>
                            </div>
                            <div className="profile-info">
                                <div className="profile-label">Major</div>
                                <div className="profile-value">{user?.major || 'N/A'}</div>
                            </div>
                        </div>
                        <button className="edit-button">Edit</button>
                    </div>
                );
            case 'Account Settings':
                return (
                    <div className="tab-content">
                        <h2>Account Settings</h2>
                    </div>
                );
            case 'Ratings':
                return (
                    <div className="tab-content">
                        <h2>Your Ratings</h2>
                    </div>
                );
            case 'Saved Professors':
                return (
                    <div className="tab-content">
                        <h2>Saved Professors</h2>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="full-screen-container">
            <div className="sliding-menu-container">
                <div className="sliding-header">
                    <h1 className="sliding-title">Hey, {user?.username || 'User'}</h1>
                </div>

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

                <div className="content-container">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SlidingMenu;
