import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate(); // Create navigate function

    // Function to handle form submission
    const handleContinueClick = (event) => {
        event.preventDefault(); // Prevent default form submission
        navigate('/landing'); // Navigate to the LandingPage
    };

    return (
        <div className="full-page-wrapper">
            <div className="signup-container">
                <h1 className="signup-title">
                    <b>Student</b> SignUp
                </h1>

                <button className="google-signup-btn">
                    <img src={`${process.env.PUBLIC_URL}/images/google.png`} alt="Google Logo" className="google-icon" />
                    Sign up with Google
                </button>

                <div className="divider">
                    <span className="divider-text">or sign up with email</span>
                </div>

                {/* Signup form */}
                <form className="signup-form" onSubmit={handleContinueClick}>
                    <input type="text" placeholder="Username" className="signup-input" />
                    <input type="text" placeholder="Nickname" className="signup-input" />
                    <input type="text" placeholder="Major" className="signup-input" />
                    <input type="email" placeholder="Email" className="signup-input" />
                    <input type="password" placeholder="Password" className="signup-input" />
                    <button type="submit" className="continue-btn">Continue</button>
                </form>

                <p className="signup-text">
                    Already have an account? <a href="/login" className="signup-link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
