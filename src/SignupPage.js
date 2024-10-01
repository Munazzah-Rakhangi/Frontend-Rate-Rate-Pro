import React from 'react';
import './SignupPage.css';  // Import the new SignupPage CSS

const SignupPage = () => {
    return (
        <div className="signup-container">
            <h1 className="signup-title">
                <b>Student</b> SignUp  {/* Bold "Student", normal "SignUp" */}
            </h1>

            <button className="google-signup-btn">
                <img src={`${process.env.PUBLIC_URL}/images/google.png`} alt="Google Logo" className="google-icon" />
                Sign up with Google
            </button>

            <div className="divider">
                <span className="divider-text">or sign up with email</span>
            </div>

            <form className="signup-form">
                <input type="email" placeholder="Email" className="signup-input" />
                <input type="password" placeholder="Password" className="signup-input" />
                <button type="submit" className="continue-btn">Continue</button>
            </form>

            <p className="signup-text">
                Already have an account? <a href="/login" className="signup-link">Login</a>
            </p>
        </div>
    );
};

export default SignupPage;
