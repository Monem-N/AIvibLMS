import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation';

// Mock the useSelector hook
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

// Mock the Breadcrumbs component
jest.mock('../../common/Breadcrumbs', () => {
  return function MockBreadcrumbs() {
    return <div data-testid="breadcrumbs-mock" />;
  };
});

// Mock the Search component
jest.mock('../../search/Search', () => {
  return function MockSearch({ searchPanelRef, closeSearch, isSearching }) {
    return (
      <div 
        data-testid="search-mock" 
        data-is-searching={isSearching}
        ref={searchPanelRef}
      >
        <button onClick={closeSearch}>Close Search</button>
      </div>
    );
  };
});

describe('Navigation Component', () => {
  const mockToggleNav = jest.fn();
  const mockToggleSearch = jest.fn();
  const mockCloseSearch = jest.fn();
  const mockSidenavRef = { current: document.createElement('div') };
  const mockSearchPanelRef = { current: document.createElement('div') };
  
  beforeEach(() => {
    // Reset the mocks before each test
    mockToggleNav.mockClear();
    mockToggleSearch.mockClear();
    mockCloseSearch.mockClear();
    (useSelector as jest.Mock).mockClear();
    
    // Mock the useSelector to return user and userData
    (useSelector as jest.Mock).mockImplementation((selector) => {
      // Return different values based on the selector function
      return null; // Default return value
    });
  });
  
  it('renders without crashing', () => {
    render(
      <Navigation 
        sidenavRef={mockSidenavRef}
        searchPanelRef={mockSearchPanelRef}
        toggleNav={mockToggleNav}
        toggleSearch={mockToggleSearch}
        closeSearch={mockCloseSearch}
        isSearching={false}
      />
    );
    
    // Check if the navigation component is rendered
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
    
    // Check if the breadcrumbs component is rendered
    const breadcrumbs = screen.getByTestId('breadcrumbs-mock');
    expect(breadcrumbs).toBeInTheDocument();
    
    // Check if the search component is rendered
    const search = screen.getByTestId('search-mock');
    expect(search).toBeInTheDocument();
  });
  
  it('renders navigation items correctly', () => {
    render(
      <Navigation 
        sidenavRef={mockSidenavRef}
        searchPanelRef={mockSearchPanelRef}
        toggleNav={mockToggleNav}
        toggleSearch={mockToggleSearch}
        closeSearch={mockCloseSearch}
        isSearching={false}
      />
    );
    
    // Check if the default navigation items are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Subjects')).toBeInTheDocument();
    expect(screen.getByText('Modules')).toBeInTheDocument();
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
  
  it('toggles navigation items when clicked', () => {
    render(
      <Navigation 
        sidenavRef={mockSidenavRef}
        searchPanelRef={mockSearchPanelRef}
        toggleNav={mockToggleNav}
        toggleSearch={mockToggleSearch}
        closeSearch={mockCloseSearch}
        isSearching={false}
      />
    );
    
    // Find a navigation item with children
    const accountItem = screen.getByText('Account');
    const accountButton = accountItem.closest('button');
    
    // Click the navigation item
    fireEvent.click(accountButton);
    
    // Check if the navigation item is expanded
    const accountNavItem = accountButton.closest('.nav-item');
    expect(accountNavItem).toHaveClass('opened');
    
    // Check if the child item is visible
    expect(screen.getByText('My account')).toBeInTheDocument();
    
    // Click the navigation item again
    fireEvent.click(accountButton);
    
    // Check if the navigation item is collapsed
    expect(accountNavItem).not.toHaveClass('opened');
  });
  
  it('calls toggleNav when a navigation link is clicked', () => {
    render(
      <Navigation 
        sidenavRef={mockSidenavRef}
        searchPanelRef={mockSearchPanelRef}
        toggleNav={mockToggleNav}
        toggleSearch={mockToggleSearch}
        closeSearch={mockCloseSearch}
        isSearching={false}
      />
    );
    
    // Find a navigation link
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    
    // Click the navigation link
    fireEvent.click(dashboardLink);
    
    // Check if toggleNav is called
    expect(mockToggleNav).toHaveBeenCalled();
  });
  
  it('calls toggleSearch when the search button is clicked', () => {
    render(
      <Navigation 
        sidenavRef={mockSidenavRef}
        searchPanelRef={mockSearchPanelRef}
        toggleNav={mockToggleNav}
        toggleSearch={mockToggleSearch}
        closeSearch={mockCloseSearch}
        isSearching={false}
      />
    );
    
    // Find the search button
    const searchButton = screen.getByText('Search').closest('button');
    
    // Click the search button
    fireEvent.click(searchButton);
    
    // Check if toggleSearch is called
    expect(mockToggleSearch).toHaveBeenCalled();
  });
  
  it('passes isSearching prop to Search component', () => {
    render(
      <Navigation 
        sidenavRef={mockSidenavRef}
        searchPanelRef={mockSearchPanelRef}
        toggleNav={mockToggleNav}
        toggleSearch={mockToggleSearch}
        closeSearch={mockCloseSearch}
        isSearching={true}
      />
    );
    
    // Check if the isSearching prop is passed to the Search component
    const search = screen.getByTestId('search-mock');
    expect(search).toHaveAttribute('data-is-searching', 'true');
  });
});
