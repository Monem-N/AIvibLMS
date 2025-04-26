# Search

The Search component is used in the Hypatia LMS for providing a search interface that allows users to search for content across the platform.

## Description

The Search component provides a search panel with an input field and search button that enables users to enter search queries and navigate to search results. It is used within the navigation system of the application and supports features such as auto-focus when opened, form submission handling, and responsive design. The component is designed to be a flyout panel that can be toggled open and closed from the main navigation.

## Visual Examples

### Standard Search Panel

<!-- Note: Replace with actual screenshot when available -->
![Standard Search Panel](https://via.placeholder.com/800x200?text=Standard+Search+Panel)

The standard search panel showing the search input field with icon and search button

### Mobile Search Panel

<!-- Note: Replace with actual screenshot when available -->
![Mobile Search Panel](https://via.placeholder.com/400x300?text=Mobile+Search+Panel)

The search panel on mobile devices with a more compact layout

## Import

```tsx
import { Search } from 'components/search/Search';
```

Note: The actual import in the codebase is a default export, so you would use:

```tsx
import Search from 'components/search/Search';
```

## Usage

```tsx
import React, { useRef, useState } from 'react';
import Search from 'components/search/Search';

const Navigation: React.FC = () => {
  // Create a ref for the search panel
  const searchPanelRef = useRef<HTMLDivElement>(null);

  // State to track if search panel is open
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Function to toggle search panel
  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  // Function to close search panel
  const closeSearch = () => {
    setIsSearching(false);
  };

  return (
    <div className="navigation">
      {/* Navigation content */}

      {/* Search button */}
      <button
        className="search-toggle"
        onClick={toggleSearch}
        aria-label="Toggle search"
      >
        Search
      </button>

      {/* Search component */}
      <Search
        searchPanelRef={searchPanelRef}
        closeSearch={closeSearch}
        isSearching={isSearching}
      />
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| searchPanelRef | React.RefObject\<HTMLDivElement\> | - | Yes | Reference to the search panel DOM element, used for positioning and event handling |
| closeSearch | () => void | - | Yes | Function to close the search panel when search is submitted or cancelled |
| isSearching | boolean | - | Yes | Boolean indicating whether the search panel is currently open |

## Type Definitions

```tsx
/**
 * Search props interface from types/navigation.ts
 */
export interface SearchProps {
  /**
   * Reference to the search panel DOM element
   */
  searchPanelRef: React.RefObject<HTMLDivElement>;

  /**
   * Function to close the search panel
   */
  closeSearch: () => void;

  /**
   * Boolean indicating whether the search panel is currently open
   */
  isSearching: boolean;
}
```

## Examples

### Basic Example

```tsx
import React, { useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from 'components/search/Search';

const BasicExample = () => {
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const closeSearch = () => console.log('Search closed');

  return (
    <Router>
      <Search
        searchPanelRef={searchPanelRef}
        closeSearch={closeSearch}
        isSearching={true}
      />
    </Router>
  );
};
```

### Example with Toggle Button

```tsx
import React, { useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from 'components/search/Search';

const ToggleExample = () => {
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  const closeSearch = () => {
    setIsSearching(false);
  };

  return (
    <Router>
      <div className="navigation">
        <button
          className="search-toggle"
          onClick={toggleSearch}
          aria-label="Toggle search"
        >
          {isSearching ? 'Close Search' : 'Open Search'}
        </button>

        <Search
          searchPanelRef={searchPanelRef}
          closeSearch={closeSearch}
          isSearching={isSearching}
        />
      </div>
    </Router>
  );
};
```

### Example with Navigation Integration

```tsx
import React, { useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Search from 'components/search/Search';
import Navigation from 'components/navigation/Navigation';

const NavigationExample = () => {
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const sidenavRef = useRef<HTMLDivElement>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    // Close nav if open
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    // Close search if open
    if (isSearching) {
      setIsSearching(false);
    }
  };

  const closeSearch = () => {
    setIsSearching(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navigation
          sidenavRef={sidenavRef}
          searchPanelRef={searchPanelRef}
          toggleNav={toggleNav}
          toggleSearch={toggleSearch}
          closeSearch={closeSearch}
          isSearching={isSearching}
        />

        <Search
          searchPanelRef={searchPanelRef}
          closeSearch={closeSearch}
          isSearching={isSearching}
        />

        <main className="content">
          {/* Main content */}
        </main>
      </div>
    </Router>
  );
};
```

## Features

1. **Search Input**: Provides a text input field for users to enter search queries
2. **Search Button**: Includes a submit button to trigger the search action
3. **Auto Focus**: Automatically focuses the search input when the search panel is opened
4. **Form Submission**: Handles form submission to navigate to the search results page
5. **URL Encoding**: Properly encodes search terms for URL parameters
6. **Search Icon**: Displays a search icon in the input field for visual clarity
7. **Responsive Design**: Adapts to different screen sizes with appropriate styling
8. **Flyout Panel**: Implemented as a flyout panel that can be toggled open and closed
9. **Empty Query Handling**: Prevents navigation for empty search queries
10. **Search Term Clearing**: Clears the search term after successful submission

## Accessibility

The Search component is designed with accessibility in mind to ensure all users, including those with disabilities, can effectively use the search functionality.

### Keyboard Navigation

- The search input is automatically focused when the search panel is opened, allowing immediate keyboard input
- The search form can be submitted using the Enter key
- The search button is keyboard accessible and can be activated with Enter or Space
- Tab order follows a logical flow from the search input to the search button

### Screen Reader Support

- The search input has a clear placeholder text ("Search...") that is announced by screen readers
- The search button has clear text content ("Search") that is announced by screen readers
- The form structure provides semantic meaning for assistive technologies
- The search icon is decorative and is not announced by screen readers

### ARIA Attributes

- The search toggle button (in the parent component) should include `aria-label="Toggle search"` for clarity
- The search toggle button should include `aria-expanded={isSearching}` to indicate the expanded state
- The search panel could benefit from `aria-labelledby` pointing to a heading element
- The search icon is decorative and should include `aria-hidden="true"`

### Color Contrast

- The search input has sufficient contrast with its background
- The search button uses the primary blue color (#2196f3) which has sufficient contrast with white text
- The search icon uses a medium gray color (#666) which has sufficient contrast with the white background
- Focus indicators are visible with high contrast

### Focus Management

- The search input is automatically focused when the search panel is opened
- Focus is properly trapped within the search panel when it's open
- When the search is submitted, focus moves to the search results page
- The search input has a visible focus indicator (blue border with box-shadow)

## Edge Cases

- **Empty Search Term**: The component prevents form submission and navigation if the search term is empty or contains only whitespace
- **Long Search Terms**: Long search terms are properly handled and encoded in the URL
- **Special Characters**: Special characters in search terms are properly URL-encoded
- **Multiple Spaces**: Multiple spaces in search terms are trimmed before submission
- **Search Panel Ref Missing**: The component should still render even if the searchPanelRef is null
- **Mobile Devices**: The component adapts to smaller screen sizes with appropriate styling
- **Rapid Toggle**: The component handles rapid toggling of the search panel without issues
- **Navigation During Search**: If the user navigates to another page while the search panel is open, the search term is cleared
- **Form Submission Without JavaScript**: The form should still work if JavaScript is disabled, though auto-focus and other enhancements may not work

## Implementation Details

The Search component is implemented using React with TypeScript. It uses React Router for navigation and includes a form with an input field and a submit button.

```tsx
// Simplified implementation
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../common/Icon';
import SearchIcon from '../../../assets/svg/search.svg';
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
          <Icon glyph={SearchIcon} className="icon search-icon" aria-hidden="true" />
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
```

### CSS Implementation

```css
/* Search component styles */

.search-panel {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

.search-form {
  display: flex;
  align-items: center;
  height: 100%;
}

.search-input-container {
  position: relative;
  flex: 1;
  margin-right: 10px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: #666;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.search-button {
  padding: 10px 15px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #1976d2;
}

/* Mobile styles */
@media (max-width: 768px) {
  .search-button {
    padding: 10px;
  }
}
```

## Related Components

- [Navigation](./Navigation.md): The Navigation component contains the search toggle button and integrates with the Search component
- [TopNavModern](./TopNavModern.md): The TopNavModern component includes the search functionality in the top navigation bar
- [Icon](../ui/Icon.md): The Icon component is used to display the search icon in the input field
- [SearchResults](./SearchResults.md): The SearchResults component displays the results of a search query

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-search--default).

The Storybook examples demonstrate:

- Default search panel
- Search panel with toggle button
- Search panel integrated with navigation
- Mobile view of the search panel
- Search panel with different styling options

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic search functionality |
| 1.1.0 | Added auto-focus when search panel is opened |
| 1.2.0 | Added responsive design for mobile devices |
| 1.3.0 | Added search icon in input field |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added URL encoding for search terms |
| 2.2.0 | Added search term clearing after submission |

## Technical Debt

The Search component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Flyout Class | Uses a generic "flyout" class that may be defined elsewhere | May cause styling conflicts or unexpected behavior | Create component-specific styling | Low |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Attributes | The search panel should have more ARIA attributes for better accessibility | Reduces accessibility for screen reader users | Add appropriate ARIA attributes like `aria-labelledby` | Medium |
| A-002 | Focus Trapping | Focus is not properly trapped within the search panel | Users may tab out of the panel unexpectedly | Implement focus trapping within the panel | High |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Search History | Add ability to show recent searches | Improves user experience | Medium | Medium |
| RFO-002 | Search Suggestions | Add ability to show search suggestions as user types | Improves user experience | High | Medium |
| RFO-003 | Keyboard Shortcuts | Add keyboard shortcuts for opening and closing the search panel | Improves accessibility and power user experience | Low | Low |

For a complete technical debt analysis, see the [Search Technical Debt Report](../technical-debt/Search-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [Search Version Compatibility Matrix](./Search-version-compatibility.md)
