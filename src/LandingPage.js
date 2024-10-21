import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search query
    const [searchResults, setSearchResults] = useState([]); // State for the search results
    const [userName, setUserName] = useState('User'); // Default value for user name
    const navigate = useNavigate();
    const location = useLocation(); // Access the current location

    // Effect to retrieve user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Retrieve user data from localStorage
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUserName(userData.username); // Set the user's name from localStorage
        }

        // Add an event listener for the 'popstate' event (back button)
        const handlePopState = () => {
            if (location.pathname === '/landing') {
                localStorage.removeItem('user'); // Clear user data from localStorage
                navigate('/', { state: { message: "You have been logged out. See you soon!", from: '/landing' } });
            }
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate, location.pathname]); // Re-run effect if location changes

    const handleUserButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDropdownItemClick = (option) => {
        navigate('/menu', { state: { selectedOption: option } });
    };

    // Function to handle search input change
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchTerm(query); // Update the state with the search query

        if (query.length > 1) { // Trigger API when more than 1 character is typed
            try {
                const response = await fetch(`http://54.144.209.246:8000/v1/user/search/?query=${query}`);
                if (response.ok) {
                    const data = await response.json();
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

    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        navigate('/', { state: { message: "You have been logged out. See you soon!", from: '/landing' } });
    };

    const handleProfessorSelect = (professor) => {
        // Store professor details in local storage
        localStorage.setItem('selectedProfessor', JSON.stringify({
            username: professor.username,
            department: professor.major,  // Assuming 'major' is the department
        }));
        
        // Navigate to the professor results page
        navigate('/professor-results', {
            state: {
                professor: {
                    username: professor.username,
                    department: professor.major,  // Pass the dynamic department
                    email: professor.email,
                    id: professor.userid,  // Assuming you have an ID
                },
            },
        });
    };
    

    return (
        <div className="landing-container">
            <img src="/images/Lightbulb.png" alt="Light Bulb" className="lightbulb-icon" />
            <div className="user-button" onClick={handleUserButtonClick}>
                Hey, {userName}
            </div>

            {showDropdown && (
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Profile")}>Profile</div>
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Account Settings")}>Account Settings</div>
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Ratings")}>Your Ratings</div>
                    <div className="dropdown-item" onClick={() => handleDropdownItemClick("Saved Professors")}>Saved Professor</div>
                    <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                </div>
            )}

            <div className="center-content">
                <h1 className="landing-title">Rate Rate Professor</h1>
                <p className="landing-subtitle">Enter professor name and start rating</p>
                <img src="/images/Books.png" alt="Books" className="books-icon" />

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter professor name...."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="search-btn">
                        <img src="/images/search.png" alt="Search" />
                    </button>

                    {searchResults.length > 0 && (
                        <div className="search-dropdown">
                            {searchResults.map((result) => (
                                <div
                                    key={result.userid}
                                    className="search-dropdown-item"
                                    onClick={() => handleProfessorSelect(result)} // Pass the professor data when clicked
                                >
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
