// ForgotPasswordPage.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordPage from './ForgotPasswordPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders forgot password page with main elements', () => {
    render(
        <MemoryRouter>
            <ForgotPasswordPage />
        </MemoryRouter>
    );

    // Check if the title is rendered
    expect(screen.getByRole('heading', { name: /forgot password/i })).toBeInTheDocument();

    // Check if the email input field is rendered
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
});
