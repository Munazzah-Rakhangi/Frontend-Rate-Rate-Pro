import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate(); // For navigation after login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await fetchWithTimeout(
                'https://your-api-endpoint.com/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }), // Send credentials in the request body
                },
                10000 // Set a timeout of 10 seconds
            );

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
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
                <span className="divider-text">or login with email</span>
            </div>

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
