import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';  // Import this to extend Jest with DOM-specific matchers

test('renders login page with all elements', () => {
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );

    // Ensure the page title is rendered
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    // Check if the Google login button is rendered
    expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();

    // Check if the email and password input fields are rendered
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // Check if the continue button is rendered
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();

    // Check if the sign-up link is present
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
});
