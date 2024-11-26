import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [logoutMessage, setLogoutMessage] = useState('');

    useEffect(() => {
        if (location.state?.message && location.state?.from === '/landing') {
            setLogoutMessage(location.state.message);
            setTimeout(() => {
                setLogoutMessage('');
            }, 3000);
        }
    }, [location.state]);

    const closeLogoutMessage = () => {
        setLogoutMessage('');
        navigate('/', { replace: true });
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    // Fetch search results from the API
    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() !== '') {
            try {
                const response = await fetch(`http://54.209.124.57:8000/v1/user/search/?query=${query}`);
                if (response.ok) {
                    const result = await response.json();
                    console.log("Search Results:", result);  // Log to check if department is present
                    setSearchResults(result);
                } else {
                    console.error("Error fetching search results");
                    setSearchResults([]);
                }
            } catch (error) {
                console.error(error.message);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    // Handle when a professor is selected from the dropdown
    const handleResultSelect = (professor) => {
        // Store selected professor data in local storage
        localStorage.setItem('selectedProfessor', JSON.stringify({
            id: professor.userid,
            username: professor.username,
            department: professor.major, // Assuming 'major' is the department
            email: professor.email
        }));

        // Navigate to the professor results page with updated state
        navigate('/professor-results', {
            state: {
                professor: {
                    username: professor.username,
                    department: professor.major, // Pass the department
                    email: professor.email,
                    id: professor.userid  // Assuming you have an ID
                }
            }
        });

        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className="container">
            {logoutMessage && (
                <div className="logout-message">
                    <img src="/images/bye.png" alt="Logout Icon" className="logout-icon" />
                    <div>
                        <strong>Logged Out</strong>
                        <p>{logoutMessage}</p>
                    </div>
                    <button className="close-btn" onClick={closeLogoutMessage}>×</button>
                </div>
            )}

            <div className="login-buttons">
                <button className="login-btn" onClick={handleLoginClick}>Login</button>
                <button className="signup-btn" onClick={handleSignupClick}>SignUp</button>
            </div>

            <img src="/images/rating-system.png" alt="Rating System Sticker" className="sticker-top-left" />

            <h1>Rate Your Professor</h1>
            <p>Enter the name of your professor and start rating.</p>

            <img src="/images/thumps_up.png" alt="Thumbs Up" className="thumbs-up" />

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for professor..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {searchResults.length > 0 && (
                    <div className="search-dropdown">
                        {searchResults.map((professor) => (
                            <div
                                key={professor.userid}
                                className="search-dropdown-item"
                                onClick={() => handleResultSelect(professor)}
                            >
                                {professor.username} ({professor.role})
                            </div>
                        ))}
                    </div>
                )}
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
