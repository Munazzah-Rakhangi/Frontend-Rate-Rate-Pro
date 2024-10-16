import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate(); // Create navigate function

    // State for form inputs
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Error state

    // Function to handle form submission
    const handleContinueClick = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const userData = {
            username,
            nickname,
            major,
            email,
            password,
            role: 'Professor',  // You can adjust this based on your form or backend logic
            department_id: 1     // Assuming a default value or dynamic input
        };

        try {
            const response = await fetch('http://54.144.209.246:8000/v1/user/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // Sending the form data
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error creating user');
            }

            // Handle successful signup (you can store a token, session, etc.)
            const data = await response.json();
            console.log('User created successfully:', data);

            navigate('/landing'); // Navigate to landing page upon successful signup
        } catch (error) {
            setError(error.message); // Display error if API call fails
        }
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
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="signup-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Capture input
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Nickname" 
                        className="signup-input"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)} // Capture input
                        required
                    />
                    <input 
                        type="text" 
                        placeholder="Major" 
                        className="signup-input"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)} // Capture input
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="signup-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Capture input
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="signup-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Capture input
                        required
                    />
                    <button type="submit" className="continue-btn">Continue</button>
                </form>

                {error && <p className="error-message">{error}</p>} {/* Display error message if any */}

                <p className="signup-text">
                    Already have an account? <a href="/login" className="signup-link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
