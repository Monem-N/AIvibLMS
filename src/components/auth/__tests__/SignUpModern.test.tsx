/**
 * SignUpModern Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpModern from '../SignUpModern';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    signUp: jest.fn().mockImplementation((email, password, userInfo) => {
      if (email === 'test@example.com' && password === 'password123') {
        return Promise.resolve({ user: { uid: '123', email } });
      } else {
        return Promise.reject(new Error('Failed to create account'));
      }
    }),
  })),
}));

// Mock the useNotification hook
jest.mock('../../../hooks/useNotification', () => ({
  useNotification: jest.fn(() => ({
    showError: jest.fn(),
  })),
}));

describe('SignUpModern Component', () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();
  
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <SignUpModern onSuccess={mockOnSuccess} onCancel={mockOnCancel} />
      </BrowserRouter>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders without crashing', () => {
    renderComponent();
    
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Second Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
  
  it('updates form values when typing', () => {
    renderComponent();
    
    const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^Password/i) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i) as HTMLInputElement;
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });
  
  it('calls onCancel when cancel button is clicked', () => {
    renderComponent();
    
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
  
  it('shows validation errors when form is submitted with invalid data', async () => {
    renderComponent();
    
    const createAccountButton = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.click(createAccountButton);
    
    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
    
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  
  it('shows error when passwords do not match', async () => {
    renderComponent();
    
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const createAccountButton = screen.getByRole('button', { name: /Create Account/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.click(createAccountButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
    
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  
  it('submits the form with valid data', async () => {
    const { useAuth } = require('../../../hooks/useAuth');
    const mockSignUp = jest.fn().mockResolvedValue({ user: { uid: '123', email: 'test@example.com' } });
    useAuth.mockReturnValue({ signUp: mockSignUp });
    
    renderComponent();
    
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const createAccountButton = screen.getByRole('button', { name: /Create Account/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(createAccountButton);
    
    expect(mockSignUp).toHaveBeenCalledWith(
      'test@example.com',
      'password123',
      {
        firstName: 'John',
        lastName1: 'Doe',
        lastName2: '',
        displayName: 'John Doe',
        level: 1
      }
    );
    
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
  
  it('handles sign up error', async () => {
    const { useAuth } = require('../../../hooks/useAuth');
    const mockSignUp = jest.fn().mockRejectedValue(new Error('Failed to create account'));
    useAuth.mockReturnValue({ signUp: mockSignUp });
    
    renderComponent();
    
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    const createAccountButton = screen.getByRole('button', { name: /Create Account/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(createAccountButton);
    
    expect(mockSignUp).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });
  
  it('disables form elements during submission', async () => {
    const { useAuth } = require('../../../hooks/useAuth');
    
    // Create a promise that we can resolve manually
    let resolveSignUp: (value: any) => void;
    const signUpPromise = new Promise((resolve) => {
      resolveSignUp = resolve;
    });
    
    const mockSignUp = jest.fn().mockImplementation(() => signUpPromise);
    useAuth.mockReturnValue({ signUp: mockSignUp });
    
    renderComponent();
    
    const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/^Password/i) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i) as HTMLInputElement;
    const createAccountButton = screen.getByRole('button', { name: /Create Account/i });
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(createAccountButton);
    
    // Check if the button text changes to "Creating Account..."
    expect(screen.getByRole('button', { name: /Creating Account/i })).toBeInTheDocument();
    
    // Check if the inputs and button are disabled
    expect(firstNameInput).toBeDisabled();
    expect(lastNameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(confirmPasswordInput).toBeDisabled();
    expect(createAccountButton).toBeDisabled();
    
    // Resolve the signUp promise
    resolveSignUp({ user: { uid: '123', email: 'test@example.com' } });
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    });
  });
});
