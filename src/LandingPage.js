import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search query
    const [searchResults, setSearchResults] = useState([]); // State for the search results
    const navigate = useNavigate();

    const handleUserButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDropdownItemClick = (option) => {
        navigate('/menu', { state: { selectedOption: option } });
    };

    // Function to handle search input change
    const handleSearchChange = async (e) => {
        const query = e.target.value; // Capture the search query from the input field
        setSearchTerm(query); // Update the state with the search query

        if (query.length > 1) { // Trigger API when more than 1 character is typed
            try {
                const response = await fetch(`http://54.144.209.246:8000/v1/user/search/?query=${query}`); // Use query for API call
                if (response.ok) {
                    const data = await response.json(); // Parse the API response
                    setSearchResults(data); // Update the search results state
                } else {
                    throw new Error('Error fetching search results');
                }
            } catch (error) {
                console.error(error.message);
            }
        } else {
            setSearchResults([]); // Clear the results if the query is too short
        }
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
                    <input
                        type="text"
                        placeholder="Enter your major..."
                        value={searchTerm} // Controlled input bound to searchTerm
                        onChange={handleSearchChange} // Trigger search on input change
                    />
                    <button type="submit" className="search-btn">
                        <img src="/images/search.png" alt="Search" />
                    </button>

                    {/* Display search results as a dropdown */}
                    {searchResults.length > 0 && (
                        <div className="search-dropdown">
                            {searchResults.map((result) => (
                                <div key={result.userid} className="search-dropdown-item">
                                    {result.username} ({result.role}) - {result.major}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <img src="/images/protected.png" alt="protected" className="bottom-right-icon" />
        </div>
    );
};

export default LandingPage;
