import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import TopNavModern from '../TopNavModern';

// Mock the useSelector and useDispatch hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the Navigation component
jest.mock('../Navigation', () => {
  return function MockNavigation(props) {
    return (
      <div data-testid="navigation-mock">
        <button onClick={props.toggleNav}>Toggle Nav</button>
        <button onClick={props.toggleSearch}>Toggle Search</button>
        <button onClick={props.closeSearch}>Close Search</button>
      </div>
    );
  };
});

// Mock the Signup component
jest.mock('../../auth/Signup', () => {
  return function MockSignup() {
    return <div data-testid="signup-mock" />;
  };
});

// Mock the Signin component
jest.mock('../../auth/Signin', () => {
  return function MockSignin() {
    return <div data-testid="signin-mock" />;
  };
});

describe('TopNavModern Component', () => {
  const mockDispatch = jest.fn();
  
  beforeEach(() => {
    // Reset the mocks before each test
    (useSelector as jest.Mock).mockClear();
    (useDispatch as jest.Mock).mockClear();
    mockDispatch.mockClear();
    
    // Mock the useDispatch to return mockDispatch
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    
    // Mock the useSelector to return user and panel
    (useSelector as jest.Mock).mockImplementation((selector) => {
      return { user: null, panel: '' };
    });
    
    // Create a mock implementation of Element.prototype.classList
    const mockClassList = {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn(),
    };
    
    // Mock the classList property
    Object.defineProperty(HTMLElement.prototype, 'classList', {
      value: mockClassList,
      configurable: true,
    });
  });
  
  it('renders without crashing', () => {
    render(<TopNavModern />);
    
    // Check if the top nav component is rendered
    const topNav = screen.getByRole('button', { name: /toggle nav/i }).closest('section');
    expect(topNav).toBeInTheDocument();
    expect(topNav).toHaveClass('top-nav');
    
    // Check if the navigation component is rendered
    const navigation = screen.getByTestId('navigation-mock');
    expect(navigation).toBeInTheDocument();
  });
  
  it('renders sign up and sign in buttons when user is not logged in', () => {
    // Mock the useSelector to return null user
    (useSelector as jest.Mock).mockReturnValue({ user: null, panel: '' });
    
    render(<TopNavModern />);
    
    // Check if the sign up and sign in buttons are rendered
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    
    // Check if the signup and signin components are rendered
    expect(screen.getByTestId('signup-mock')).toBeInTheDocument();
    expect(screen.getByTestId('signin-mock')).toBeInTheDocument();
  });
  
  it('renders user controls when user is logged in', () => {
    // Mock the useSelector to return a logged in user
    (useSelector as jest.Mock).mockReturnValue({ 
      user: { 
        emailVerified: true,
        email: 'test@example.com',
        info: { displayName: 'Test User' }
      }, 
      panel: '' 
    });
    
    render(<TopNavModern />);
    
    // Check if the user display name is rendered
    expect(screen.getByText('Test User')).toBeInTheDocument();
    
    // Check if the sign out button is rendered
    const signOutButton = screen.getByRole('button', { name: '' });
    expect(signOutButton).toBeInTheDocument();
    
    // Check if the user controls are rendered
    const userControls = screen.getByText('Test User').closest('.user-controls');
    expect(userControls).toBeInTheDocument();
  });
  
  it('toggles navigation when nav icon is clicked', () => {
    render(<TopNavModern />);
    
    // Find the nav icon button
    const navIconButton = screen.getAllByRole('button')[0];
    
    // Click the nav icon button
    fireEvent.click(navIconButton);
    
    // Check if the navigation is toggled
    expect(document.body.style.overflow).toBe('hidden');
    
    // Click the nav icon button again
    fireEvent.click(navIconButton);
    
    // Check if the navigation is toggled back
    expect(document.body.style.overflow).toBe('auto');
  });
  
  it('toggles search when search icon is clicked', () => {
    render(<TopNavModern />);
    
    // Find the search icon button
    const searchIconButton = screen.getAllByRole('button')[1];
    
    // Click the search icon button
    fireEvent.click(searchIconButton);
    
    // Check if the search is toggled
    expect(document.body.style.overflow).toBe('hidden');
    
    // Click the search icon button again
    fireEvent.click(searchIconButton);
    
    // Check if the search is toggled back
    expect(document.body.style.overflow).toBe('auto');
  });
  
  it('changes panel when panel buttons are clicked', () => {
    // Mock the useSelector to return a logged in user
    (useSelector as jest.Mock).mockReturnValue({ 
      user: { 
        emailVerified: true,
        email: 'test@example.com',
        info: { displayName: 'Test User' }
      }, 
      panel: '' 
    });
    
    render(<TopNavModern />);
    
    // Find the calendar button
    const calendarButton = screen.getAllByRole('button')[2];
    
    // Click the calendar button
    fireEvent.click(calendarButton);
    
    // Check if the panel is changed
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: expect.any(String),
      payload: 'calendar'
    }));
  });
  
  it('logs out user when sign out button is clicked', () => {
    // Mock the useSelector to return a logged in user
    (useSelector as jest.Mock).mockReturnValue({ 
      user: { 
        emailVerified: true,
        email: 'test@example.com',
        info: { displayName: 'Test User' }
      }, 
      panel: '' 
    });
    
    render(<TopNavModern />);
    
    // Find the sign out button
    const signOutButton = screen.getByRole('button', { name: '' });
    
    // Click the sign out button
    fireEvent.click(signOutButton);
    
    // Check if the user is logged out
    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: expect.any(String),
      payload: null
    }));
  });
});
