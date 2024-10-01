import React from 'react';
import './ForgotPasswordPage.css'; // Separate CSS file for Forgot Password page styling

const ForgotPasswordPage = () => {
    return (
        <div className="forgot-password-container">
            <h1 className="forgot-password-title">Forgot Password</h1>
            <p className="forgot-password-instruction">Enter your email to reset your password.</p>

            <form className="forgot-password-form"> {/* Form container */}
                <input type="email" placeholder="Email" className="forgot-password-input" />
                <button type="submit" className="reset-password-btn">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
