import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');  // State to hold the search query
    const [searchResults, setSearchResults] = useState([]);  // State to hold search results
    const navigate = useNavigate();  // To navigate between pages
    const location = useLocation();  // Access the location state
    const [logoutMessage, setLogoutMessage] = useState(''); // State to hold logout message

    useEffect(() => {
        // Check if the 'from' field in the state is '/landing'
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

    // Fetch the search results from the API
    const handleSearch = async (query) => {
        setSearchQuery(query);  // Update search query state
        if (query.trim() !== '') {
            try {
                const response = await fetch(`http://54.144.209.246:8000/v1/user/search/?query=${query}`);
                if (response.ok) {
                    const result = await response.json();
                    setSearchResults(result); // Store search results
                } else {
                    console.error("Error fetching search results");
                    setSearchResults([]); // Reset results if there's an error
                }
            } catch (error) {
                console.error(error.message);
                setSearchResults([]); // Reset results on error
            }
        } else {
            setSearchResults([]); // Clear search results if the query is empty
        }
    };

    // Handle when a professor is selected from the dropdown
    const handleResultSelect = (professor) => {
        navigate('/professor-results', { state: { professor } });
        setSearchQuery('');  // Clear the search query
        setSearchResults([]);  // Hide the dropdown
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

            {/* Search bar with dropdown results */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for professor..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}  // Call handleSearch on input change
                />
                {/* {searchResults.length > 0 && (
                    <ul className="search-dropdown">
                        {searchResults.map((professor) => (
                            <li key={professor.userid} onClick={() => handleResultSelect(professor)}>
                                {professor.username} ({professor.role})
                            </li>
                        ))}
                    </ul>
                )} */}

                {searchResults.length > 0 && (
                        <div className="search-dropdown">
                            {searchResults.map((professor) => (
                                <div
                                    key={professor.userid}
                                    className="search-dropdown-item"
                                    onClick={() => handleResultSelect(professor)} >
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
