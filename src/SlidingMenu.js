import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SlidingMenu.css';

const SlidingMenu = () => {
    const location = useLocation();
    const initialTab = location.state?.selectedOption || 'Profile';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [user, setUser] = useState(null);
    const [userRatings, setUserRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing stored user data:', error);
            }
        } else {
            console.warn('No user data found in localStorage');
        }
    }, []);

    // Fetch ratings from the API
    useEffect(() => {
        if (user?.id) {
            setIsLoading(true);
            console.log('Fetching ratings for user ID:', user.id);
            fetch(`http://54.209.124.57:8000/v1/ratings/student/?student_id=${user.id}`)
                .then((response) => {
                    console.log('API response status:', response.status);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Fetched ratings data:', data);
                    setUserRatings(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching ratings:', error);
                    setError('Failed to load ratings. Please try again later.');
                    setIsLoading(false);
                });
        }
    }, [user?.id]);

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
                        {isLoading ? (
                            <p>Loading ratings...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : userRatings.length > 0 ? (
                            <div className="ratings-list">
                                {userRatings.map((rating) => (
                                    <div className="rating-card" key={rating.id}>
                                        <div className="rating-header">
                                            <h3 className="professor-name">
                                                Professor ID: {rating.professor_id}
                                            </h3>
                                            <button className="edit-rating-button">Edit</button>
                                        </div>
                                        <hr className="divider" />
                                        <div className="rating-body">
                                            <div className="sliding-overall-rating">
                                                <div className="rating-label"></div>
                                                <div className="rating-value">{rating.overall_rating}</div>
                                            </div>
                                            <div className="rating-details">
                                                <p>
                                                    <strong>Would take again:</strong>{' '}
                                                    {rating.would_take_again === '1' ? 'Yes' : 'No'}
                                                </p>
                                                <p>
                                                    <strong>Feedback:</strong>{' '}
                                                    {rating.feedback || 'No feedback provided'}
                                                </p>
                                                {/* <p>
                                                    <strong>Timestamp:</strong>{' '}
                                                    {new Date(rating.timestamp).toLocaleString()}
                                                </p> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No ratings provided yet.</p>
                        )}
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

                <div className="content-container">{renderContent()}</div>
            </div>
        </div>
    );
};

export default SlidingMenu;
