import React from 'react';
import './LoginPage.css';  // Using the same styles as LoginPage for now

const SignupPage = () => {
    return (
        <div className="login-container">
            <h1 className="login-title">Sign Up</h1>

            <button className="google-login-btn">
                <img src={`${process.env.PUBLIC_URL}/images/google.png`} alt="Google Logo" className="google-icon" />
                Sign Up with Google
            </button>

            <div className="divider">
                <span className="divider-text">or sign up with email</span>
            </div>

            <form className="login-form">
                <input type="email" placeholder="Email" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button type="submit" className="continue-btn">Continue</button>
            </form>

            <p className="signup-text">
                Already have an account? <a href="/login" className="signup-link">Login</a>
            </p>
        </div>
    );
};

export default SignupPage;
