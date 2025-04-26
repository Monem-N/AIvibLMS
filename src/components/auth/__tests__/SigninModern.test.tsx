import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SigninModern from '../SigninModern';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    signIn: jest.fn().mockImplementation((email, password) => {
      if (email === 'test@example.com' && password === 'password123') {
        return Promise.resolve({ uid: '123', email });
      } else {
        return Promise.reject(new Error('Invalid email or password'));
      }
    }),
  })),
}));

// Mock the useNotification hook
jest.mock('../../../hooks/useNotification', () => ({
  useNotification: jest.fn(() => ({
    showNotification: jest.fn(),
  })),
}));

describe('SigninModern Component', () => {
  const mockOnSuccess = jest.fn();
  
  beforeEach(() => {
    // Reset the mocks before each test
    mockOnSuccess.mockClear();
  });
  
  it('renders without crashing', () => {
    render(<SigninModern />);
    
    // Check if the form is rendered
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('auth-form');
    expect(form).toHaveClass('signin-form');
    
    // Check if the email and password inputs are rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    
    // Check if the sign in button is rendered
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    
    // Check if the forgot password link is rendered
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });
  
  it('updates form values when typing', () => {
    render(<SigninModern />);
    
    // Get the email and password inputs
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    
    // Type in the email input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Type in the password input
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Check if the inputs have the correct values
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  
  it('submits the form with valid credentials', async () => {
    const { useAuth } = require('../../../hooks/useAuth');
    const { useNotification } = require('../../../hooks/useNotification');
    
    const mockSignIn = jest.fn().mockResolvedValue({ uid: '123', email: 'test@example.com' });
    const mockShowNotification = jest.fn();
    
    useAuth.mockReturnValue({ signIn: mockSignIn });
    useNotification.mockReturnValue({ showNotification: mockShowNotification });
    
    render(<SigninModern onSuccess={mockOnSuccess} />);
    
    // Get the email and password inputs
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    // Type in the email input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Type in the password input
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    fireEvent.click(signInButton);
    
    // Check if signIn is called with the correct credentials
    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    
    // Wait for the form submission to complete
    await waitFor(() => {
      // Check if onSuccess is called
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
  
  it('shows an error notification with invalid credentials', async () => {
    const { useAuth } = require('../../../hooks/useAuth');
    const { useNotification } = require('../../../hooks/useNotification');
    
    const mockSignIn = jest.fn().mockRejectedValue(new Error('Invalid email or password'));
    const mockShowNotification = jest.fn();
    
    useAuth.mockReturnValue({ signIn: mockSignIn });
    useNotification.mockReturnValue({ showNotification: mockShowNotification });
    
    render(<SigninModern onSuccess={mockOnSuccess} />);
    
    // Get the email and password inputs
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    // Type in the email input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Type in the password input
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    
    // Submit the form
    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    fireEvent.click(signInButton);
    
    // Check if signIn is called with the correct credentials
    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    
    // Wait for the form submission to complete
    await waitFor(() => {
      // Check if showNotification is called with the error message
      expect(mockShowNotification).toHaveBeenCalledWith({
        message: 'Invalid email or password',
        type: 'error'
      });
    });
    
    // Check if onSuccess is not called
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  
  it('shows an error notification when form is incomplete', () => {
    const { useNotification } = require('../../../hooks/useNotification');
    
    const mockShowNotification = jest.fn();
    
    useNotification.mockReturnValue({ showNotification: mockShowNotification });
    
    render(<SigninModern onSuccess={mockOnSuccess} />);
    
    // Submit the form without filling in the inputs
    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    fireEvent.click(signInButton);
    
    // Check if showNotification is called with the error message
    expect(mockShowNotification).toHaveBeenCalledWith({
      message: 'Please enter both email and password',
      type: 'error'
    });
    
    // Check if onSuccess is not called
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  
  it('disables form elements during submission', async () => {
    const { useAuth } = require('../../../hooks/useAuth');
    
    // Create a promise that we can resolve manually
    let resolveSignIn;
    const signInPromise = new Promise((resolve) => {
      resolveSignIn = resolve;
    });
    
    const mockSignIn = jest.fn().mockImplementation(() => signInPromise);
    
    useAuth.mockReturnValue({ signIn: mockSignIn });
    
    render(<SigninModern onSuccess={mockOnSuccess} />);
    
    // Get the email and password inputs
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    
    // Type in the email input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Type in the password input
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    const signInButton = screen.getByRole('button', { name: 'Sign in' });
    fireEvent.click(signInButton);
    
    // Check if the button text changes to "Signing in..."
    expect(screen.getByRole('button', { name: 'Signing in...' })).toBeInTheDocument();
    
    // Check if the inputs and button are disabled
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(signInButton).toBeDisabled();
    
    // Resolve the signIn promise
    resolveSignIn({ uid: '123', email: 'test@example.com' });
    
    // Wait for the form submission to complete
    await waitFor(() => {
      // Check if the button text changes back to "Sign in"
      expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    });
    
    // Check if the inputs and button are enabled
    expect(emailInput).not.toBeDisabled();
    expect(passwordInput).not.toBeDisabled();
    expect(signInButton).not.toBeDisabled();
  });
});
