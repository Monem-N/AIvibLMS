import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { SearchProps } from '../../types/navigation';

// Import CSS
import './Search.css';

/**
 * Search component - Search panel for the application
 * Modernized version without jQuery dependencies
 */
const Search: React.FC<SearchProps> = ({ searchPanelRef, closeSearch, isSearching }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus search input when search panel is opened
  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  /**
   * Handle search form submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (searchTerm.trim()) {
      // Close search panel
      closeSearch();

      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);

      // Clear search term
      setSearchTerm('');
    }
  };

  return (
    <div className="search-panel flyout" ref={searchPanelRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-container">
          <SearchIcon className="icon search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={searchInputRef}
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
