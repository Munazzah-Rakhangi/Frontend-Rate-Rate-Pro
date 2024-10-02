import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();  // To handle navigation after login

    const handleLogin = (e) => {
        e.preventDefault();
        // Logic for handling login, like authentication
        // After successful login:
        navigate('/landing');  // Navigate to the landing page after login
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
                <input type="email" placeholder="Email" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
                <button type="submit" className="continue-btn">Continue</button>
            </form>

            <p className="signup-text">
                Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
            </p>
        </div>
    );
};

export default LoginPage;
