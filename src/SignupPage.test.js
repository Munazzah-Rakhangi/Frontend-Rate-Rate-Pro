import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from './SignupPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';  // Import jest-dom matchers for better assertions

// Mock console.log and console.error to suppress logs during tests
beforeAll(() => {
    jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());
    jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
});

afterAll(() => {
    console.log.mockRestore();
    console.error.mockRestore();
});

// Test that all elements are rendered
test('renders signup page with all elements', () => {
    render(
        <MemoryRouter>
            <SignupPage />
        </MemoryRouter>
    );

    // Check if the title is rendered
    expect(screen.getByRole('heading', { name: /student signup/i })).toBeInTheDocument();

    // Check if Google sign-up button is rendered
    expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();

    // Check if the form input fields are rendered
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/nickname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/major/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    // Check if the continue button is rendered
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();

    // Check if the login link is present
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
});

// Test that the form submits with valid inputs
test('allows form submission with valid inputs', async () => {
    render(
        <MemoryRouter>
            <SignupPage />
        </MemoryRouter>
    );

    // Simulate user input in all fields
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/nickname/i), {
        target: { value: 'testnick' },
    });
    fireEvent.change(screen.getByPlaceholderText(/major/i), {
        target: { value: 'Computer Science' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'password123' },
    });

    // Simulate clicking the "Continue" button
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Ensure no error message is displayed initially
    await waitFor(() => {
        expect(screen.queryByText(/error creating user/i)).toBeNull();
    });
});

// Test that error message is displayed on failed submission
test('displays error message on failed signup', async () => {
    // Mock the fetch function to simulate a failed signup
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ error: 'Error creating user' }),
        })
    );

    render(
        <MemoryRouter>
            <SignupPage />
        </MemoryRouter>
    );

    // Simulate user input in all fields
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
        target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/nickname/i), {
        target: { value: 'testnick' },
    });
    fireEvent.change(screen.getByPlaceholderText(/major/i), {
        target: { value: 'Computer Science' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'password123' },
    });

    // Simulate clicking the "Continue" button
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Wait for the error message to be displayed
    await waitFor(() => {
        expect(screen.getByText(/error creating user/i)).toBeInTheDocument();
    });
});
