// LandingPage.test.js
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders landing page with main elements', () => {
    render(
        <MemoryRouter>
            <LandingPage />
        </MemoryRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText(/rate rate professor/i)).toBeInTheDocument();

    // Check if there's a search bar for finding professors
    expect(screen.getByPlaceholderText(/enter professor name/i)).toBeInTheDocument();

    // Check if the "Hey, User" element is present (as a div)
    expect(screen.getByText(/hey, user/i)).toBeInTheDocument();
});


