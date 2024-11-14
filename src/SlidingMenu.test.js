// SlidingMenu.test.js
import { render, screen } from '@testing-library/react';
import SlidingMenu from './SlidingMenu';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders menu page with navigation options', () => {
    render(
        <MemoryRouter>
            <SlidingMenu />
        </MemoryRouter>
    );

    // Check for existing tabs in the SlidingMenu component
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/account settings/i)).toBeInTheDocument();
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
    expect(screen.getByText(/saved professors/i)).toBeInTheDocument();
});


