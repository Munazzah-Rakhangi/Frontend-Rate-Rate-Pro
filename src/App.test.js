// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App'; // Ensure this points to your main component
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders app page with main elements', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText(/rate your professor/i)).toBeInTheDocument();

    // Check if there is a login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

    // Check if there is a signup button (adjusted for "SignUp")
    expect(screen.getByRole('button', { name: /signup/i })).toBeInTheDocument();
});
