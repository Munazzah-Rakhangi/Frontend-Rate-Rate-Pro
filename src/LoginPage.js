import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate(); // For navigation after login
    const location = useLocation(); // For accessing the state passed during redirection
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [error, setError] = useState(''); // State for errors
    const [redirectMessage, setRedirectMessage] = useState(''); // State for the message passed during redirection

    // Checking if the message was passed during redirection
    useEffect(() => {
        if (location.state?.message) {
            setRedirectMessage(location.state.message);
            console.log("Redirect message received: ", location.state.message); // Debugging
        }
    }, [location.state]);

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            console.log("Login attempt for user:", email); // Debugging

            // API request to login
            const response = await fetchWithTimeout(
                'http://54.145.162.200:8000/v1/user/login/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: email, password }), // Send email and password
                },
                10000 // Timeout of 10 seconds
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed. Please check your credentials.');
            }

            const data = await response.json();
            console.log("Login successful. User data: ", data); // Debugging

            // Save user info securely (no passwords or sensitive info)
            const userToStore = {
                id: data.id,
                username: data.username,
                email: data.email, 
                nickname: data.nickname,
                role: data.role,
                major: data.major,
            };

            localStorage.setItem('user', JSON.stringify(userToStore));

            // Redirect to the landing page after successful login
            navigate('/landing');
        } catch (error) {
            setError(error.message); // Set error message if login fails
            console.error("Login error: ", error); // Debugging
        }
    };

    // Custom fetch function with timeout
    const fetchWithTimeout = (url, options, timeout = 10000) => {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => reject(new Error('Request timed out.')), timeout);
            fetch(url, options)
                .then((response) => {
                    clearTimeout(timeoutId);
                    resolve(response);
                })
                .catch((error) => {
                    clearTimeout(timeoutId);
                    reject(error);
                });
        });
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>

            {/* Display a redirect message if it exists */}
            {redirectMessage && <p className="redirect-message">{redirectMessage}</p>}
            
            <button className="google-login-btn">
                <img src="/images/google.png" alt="Google Logo" className="google-icon" />
                Login with Google
            </button>

            <div className="divider">
                <span className="divider-text">or login with email</span>
            </div>

            {/* Login form */}
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Capture email input
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Capture password input
                    required
                />
                <a href="/forgot-password" className="forgot-password-link">
                    Forgot Password?
                </a>
                <button type="submit" className="continue-btn">Continue</button>
            </form>

            {/* Display error message if login fails */}
            {error && <p className="error-message">{error}</p>} 

            <p className="signup-text">
                Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
            </p>
        </div>
    );
};

export default LoginPage;
