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
    const [success, setSuccess] = useState(''); // Success state

    // Function to handle form submission
    const handleContinueClick = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const userData = {
            username,
            nickname,
            major,
            email,
            password,
            role: 'Professor',  // Adjust this based on your form or backend logic
            department_id: 1     // Assuming a default value or dynamic input
        };

        try {
            // API call to create a user
            const response = await fetch('http://54.209.124.57:8000/v1/user/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), // Sending the form data
            });

            // Parse response JSON
            const data = await response.json();

            // Log the full response for debugging
            console.log('Full API response:', data);

            // Check if the response was successful
            if (!response.ok) {
                throw new Error(data.error || 'Error creating user');
            }

            // Store the user data in localStorage
            if (data) {
                console.log('User:', data);  // Log the user data
                localStorage.setItem('user', JSON.stringify(data)); // Store user info
            } else {
                console.error('No user data found in response');
            }

            console.log('User created successfully:', data);

            // Show success message
            setSuccess('Signup successful! Redirecting to login page...');

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                navigate('/login'); // Navigate to login page upon successful signup
            }, 3000);

        } catch (error) {
            setError(error.message); // Display error if API call fails
            console.error('Error during signup:', error.message);
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
                {success && <p className="success-message">{success}</p>} {/* Display success message if signup is successful */}

                <p className="signup-text">
                    Already have an account? <a href="/login" className="signup-link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
