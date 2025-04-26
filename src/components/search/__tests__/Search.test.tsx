import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Search from '../Search';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Search Component', () => {
  const mockCloseSearch = jest.fn();
  const mockNavigate = jest.fn();
  const mockSearchPanelRef = { current: document.createElement('div') };
  
  beforeEach(() => {
    // Reset the mocks before each test
    mockCloseSearch.mockClear();
    mockNavigate.mockClear();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });
  
  it('renders without crashing', () => {
    render(
      <Search 
        searchPanelRef={mockSearchPanelRef} 
        closeSearch={mockCloseSearch} 
        isSearching={true} 
      />
    );
    
    // Check if the search input is rendered
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
    
    // Check if the search button is rendered
    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });
  
  it('focuses the input when isSearching is true', () => {
    render(
      <Search 
        searchPanelRef={mockSearchPanelRef} 
        closeSearch={mockCloseSearch} 
        isSearching={true} 
      />
    );
    
    // Check if the search input is focused
    const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    expect(document.activeElement).toBe(searchInput);
  });
  
  it('updates the search term when typing', () => {
    render(
      <Search 
        searchPanelRef={mockSearchPanelRef} 
        closeSearch={mockCloseSearch} 
        isSearching={true} 
      />
    );
    
    // Get the search input
    const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    
    // Type in the search input
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    // Check if the search term is updated
    expect(searchInput.value).toBe('test search');
  });
  
  it('navigates to search results page on form submission', () => {
    render(
      <Search 
        searchPanelRef={mockSearchPanelRef} 
        closeSearch={mockCloseSearch} 
        isSearching={true} 
      />
    );
    
    // Get the search input and form
    const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    const searchForm = searchInput.closest('form') as HTMLFormElement;
    
    // Type in the search input
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    // Submit the form
    fireEvent.submit(searchForm);
    
    // Check if closeSearch is called
    expect(mockCloseSearch).toHaveBeenCalled();
    
    // Check if navigate is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/search?q=test%20search');
    
    // Check if the search term is cleared
    expect(searchInput.value).toBe('');
  });
  
  it('does not navigate if search term is empty', () => {
    render(
      <Search 
        searchPanelRef={mockSearchPanelRef} 
        closeSearch={mockCloseSearch} 
        isSearching={true} 
      />
    );
    
    // Get the search input and form
    const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    const searchForm = searchInput.closest('form') as HTMLFormElement;
    
    // Submit the form without typing anything
    fireEvent.submit(searchForm);
    
    // Check if closeSearch is not called
    expect(mockCloseSearch).not.toHaveBeenCalled();
    
    // Check if navigate is not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
