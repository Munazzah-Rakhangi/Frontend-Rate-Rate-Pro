import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
    const [searchQuery, setSearchQuery] = useState('');  // State to hold the search query
    const [searchResults, setSearchResults] = useState([]);  // State to hold the search results
    const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
    const navigate = useNavigate();  // This hook will help navigate between pages

    // Function to call the search API
    const callSearchAPI = async (query) => {
        try {
            const response = await fetch(`https://your-api-endpoint.com/search?query=${query}`, {
                method: 'GET',  // Use appropriate HTTP method (GET, POST, etc.)
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // Parse the JSON data from the API

            // Set the search results
            setSearchResults(data);
            setShowDropdown(true);  // Show the dropdown with results
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    // Handle the search and call the search API
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            callSearchAPI(searchQuery);
        }
    };

    // Navigate to the Professor Results Page on result click
    const handleResultClick = (result) => {
        navigate('/professor-details', { state: { result } });
    };

    return (
        <div className="container">
            <div className="login-buttons">
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="signup-btn" onClick={() => navigate('/signup')}>SignUp</button>
            </div>

            <img src="/images/rating-system.png" alt="Rating System Sticker" className="sticker-top-left" />

            <h1>Rate Rate Professor</h1>

            <p>Enter the name of your professor or department and start rating.</p>

            <img src="/images/thumps_up.png" alt="Thumbs Up" className="thumbs-up" />

            {/* Search bar with a button to trigger the search */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for professor or department....."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
                    onFocus={() => setShowDropdown(true)}  // Show dropdown when input is focused
                />
                <img
                    src="/images/search.png"
                    alt="Search Icon"
                    className="search-icon"
                    onClick={handleSearch}  // Trigger the search on click
                    style={{ cursor: 'pointer' }}
                />

                {/* Dropdown for search results */}
                {showDropdown && searchResults.length > 0 && (
                    <div className="search-dropdown">
                        {searchResults.map((result) => (
                            <div
                                key={result.userid}
                                className="search-dropdown-item"
                                onClick={() => handleResultClick(result)}
                            >
                                <strong>{result.username}</strong> ({result.role})
                                <div>{result.major}</div>
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
