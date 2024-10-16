import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate(); // For navigation after login
    const [username, setUsername] = useState(''); // Updated field name
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        try { 
            const response = await fetchWithTimeout(
                'http://54.144.209.246:8000/v1/user/login/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }), // Changed from email to username
                },
                10000 // Set a timeout of 10 seconds
            );
    
            if (!response.ok) {
                // Parse the JSON response to extract error message
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed. Please check your credentials.'); // Display API error message or generic message
            }
    
            const data = await response.json(); // Parse the JSON response
    
            // Handle the successful login, e.g., save the token
            localStorage.setItem('token', data.token); // Store token or session info
            navigate('/landing'); // Redirect to landing page after successful login
        } catch (error) {
            setError(error.message); // Display an error message if login fails
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

            <button className="google-login-btn">
                <img src="/images/google.png" alt="Google Logo" className="google-icon" />
                Login with Google
            </button>

            <div className="divider">
                <span className="divider-text">or login with username</span>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username" // Updated placeholder
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Capture username input
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
                <button type="submit" className="continue-btn">
                    Continue
                </button>
            </form>

            {error && <p className="error-message">{error}</p>} {/* Display error if any */}

            <p className="signup-text">
                Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
            </p>
        </div>
    );
};

export default LoginPage;