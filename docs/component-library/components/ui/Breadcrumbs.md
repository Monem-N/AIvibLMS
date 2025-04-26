# Breadcrumbs

The Breadcrumbs component is used in the Hypatia LMS for displaying hierarchical navigation paths to help users understand their current location within the application.

## Description

The Breadcrumbs component provides a navigation aid that shows the user's current location in the application hierarchy. It displays a trail of links representing the path from the home page to the current page, allowing users to easily navigate back to previous levels. The component is used throughout the application on content pages, course pages, assignment pages, and other nested views to improve navigation and orientation.

## Visual Examples

### Basic Breadcrumbs

<!-- Note: Replace with actual screenshot when available -->
![Basic Breadcrumbs](https://via.placeholder.com/600x50?text=Basic+Breadcrumbs)

Standard breadcrumbs showing the navigation path

### Breadcrumbs with Long Paths

<!-- Note: Replace with actual screenshot when available -->
![Breadcrumbs with Long Paths](https://via.placeholder.com/600x50?text=Breadcrumbs+with+Long+Paths)

Breadcrumbs with multiple levels showing a deep navigation path

## Import

```tsx
import { Breadcrumbs } from 'components/common/Breadcrumbs';
```

Note: The actual import in code is:

```tsx
import Breadcrumbs from 'components/common/Breadcrumbs';
```

## Usage

```tsx
// Basic usage with location from react-router
import { useLocation } from 'react-router-dom';

const MyComponent = () => {
  const location = useLocation();

  return (
    <Breadcrumbs location={location} />
  );
};

// The breadcrumbs data comes from Redux store
// Example of how breadcrumbs are stored in Redux:
/*
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Introduction to React', path: '/courses/123' }
];
*/
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| location | { pathname: string } | - | Yes | The current location object from react-router |

Note: While the component accepts a `location` prop, the actual breadcrumb items are retrieved from the Redux store. The location prop is used to determine the current path for highlighting the current breadcrumb.

## Type Definitions

```tsx
/**
 * Breadcrumb item
 */
export interface Breadcrumb {
  name: string;  // Display name for the breadcrumb
  path: string;  // URL path for the breadcrumb link
}

/**
 * Breadcrumbs props
 */
export interface BreadcrumbsProps {
  location: {
    pathname: string;  // Current URL path from react-router
  };
}
```

## Examples

### Basic Example

```tsx
import { useLocation } from 'react-router-dom';
import Breadcrumbs from 'components/common/Breadcrumbs';

const CoursePage = () => {
  const location = useLocation();

  return (
    <div className="course-page">
      <Breadcrumbs location={location} />
      <h1>Course Title</h1>
      {/* Course content */}
    </div>
  );
};
```

### With Redux Setup

```tsx
// In your Redux slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Breadcrumb } from 'types/navigation';

interface MainState {
  breadcrumbs: Breadcrumb[];
  // other state properties
}

const initialState: MainState = {
  breadcrumbs: [],
  // other initial state
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<Breadcrumb[]>) => {
      state.breadcrumbs = action.payload;
    },
    // other reducers
  },
});

export const { setBreadcrumbs } = mainSlice.actions;
export default mainSlice.reducer;

// In your component
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setBreadcrumbs } from 'store/mainSlice';
import Breadcrumbs from 'components/common/Breadcrumbs';

const CoursePage = ({ courseId, courseTitle }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Set breadcrumbs based on the current route
    dispatch(setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: courseTitle, path: `/courses/${courseId}` }
    ]));
  }, [dispatch, courseId, courseTitle]);

  return (
    <div className="course-page">
      <Breadcrumbs location={location} />
      <h1>{courseTitle}</h1>
      {/* Course content */}
    </div>
  );
};
```

### With Custom Styling

```tsx
import { useLocation } from 'react-router-dom';
import Breadcrumbs from 'components/common/Breadcrumbs';
import './CustomBreadcrumbs.css';

const CustomPage = () => {
  const location = useLocation();

  return (
    <div className="custom-page">
      <div className="custom-breadcrumbs-container">
        <Breadcrumbs location={location} />
      </div>
      {/* Page content */}
    </div>
  );
};

// In CustomBreadcrumbs.css
/*
.custom-breadcrumbs-container .breadcrumbs {
  background-color: #f0f8ff;
  border-radius: 4px;
  padding: 12px 24px;
}

.custom-breadcrumbs-container .breadcrumb-link {
  color: #0066cc;
  font-weight: 500;
}

.custom-breadcrumbs-container .breadcrumb-text.current {
  color: #004080;
  font-weight: 600;
}
*/
```

## Features

1. **Hierarchical Navigation**: Displays the user's current location in the application hierarchy
2. **Interactive Links**: Provides clickable links to navigate to parent pages
3. **Current Page Indicator**: Visually distinguishes the current page from navigation links
4. **Redux Integration**: Retrieves breadcrumb data from the Redux store for centralized state management
5. **Responsive Design**: Adapts to different screen sizes with proper text wrapping
6. **Customizable Styling**: Can be styled to match the application's design system
7. **Accessible Navigation**: Follows accessibility best practices for navigation components
8. **Automatic Rendering**: Conditionally renders only when breadcrumb data is available

## Accessibility

The Breadcrumbs component is designed with accessibility in mind to ensure all users, including those with disabilities, can navigate the application effectively.

### Keyboard Navigation

- All breadcrumb links are keyboard navigable
- Links can be focused using the Tab key
- Links can be activated using the Enter key
- Focus order follows the visual order of the breadcrumbs

### Screen Reader Support

- The component uses semantic HTML (`<ul>` and `<li>` elements) for proper list structure
- The current page is not a link, preventing redundant navigation
- Link text is descriptive and indicates the destination

### ARIA Attributes

- The component should be enhanced with appropriate ARIA attributes in a future update:
  - Adding `aria-label="Breadcrumb"` to the container
  - Adding `aria-current="page"` to the current page breadcrumb

### Color Contrast

- Breadcrumb links use a high-contrast blue color against the light background
- The current page text has sufficient contrast with the background
- The separator character has sufficient contrast with the background

### Focus Management

- Breadcrumb links have a visible focus indicator
- Focus styles are consistent with the application's design system
- Focus is not trapped within the breadcrumb component

## Edge Cases

- **No Breadcrumbs**: When no breadcrumbs are available in the Redux store, the component renders nothing
- **Single Breadcrumb**: When only one breadcrumb is available, it's displayed as the current page without any links
- **Long Breadcrumb Titles**: Long breadcrumb titles wrap to the next line while maintaining the component's layout
- **Deep Navigation Paths**: For deep navigation paths with many levels, all breadcrumbs are displayed in order
- **Missing Location Prop**: If the location prop is not provided, the component will still render but won't be able to determine the current page
- **URL Parameters**: The component handles URLs with query parameters correctly by focusing on the pathname
- **Special Characters**: Breadcrumb names with special characters are displayed correctly
- **RTL Support**: The component layout should be mirrored in right-to-left languages

## Implementation Details

The Breadcrumbs component is implemented using React with TypeScript. It retrieves breadcrumb data from the Redux store and renders a list of links with the current page highlighted.

```tsx
// Simplified implementation
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BreadcrumbsProps, Breadcrumb } from '../../types/navigation';
import { RootState } from '../../types/state';

// Import CSS
import './Breadcrumbs.css';

/**
 * Breadcrumbs component - Displays navigation breadcrumbs
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ location }) => {
  // Get breadcrumbs from Redux store
  const breadcrumbs = useSelector((state: RootState) => state.mainReducer.breadcrumbs);

  // If no breadcrumbs, return null
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div className="breadcrumbs">
      <ul className="breadcrumb-list">
        {breadcrumbs.map((crumb: Breadcrumb, index: number) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={index} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-text current">{crumb.name}</span>
              ) : (
                <Link to={crumb.path} className="breadcrumb-link">
                  {crumb.name}
                </Link>
              )}
              {!isLast && <span className="breadcrumb-separator">/</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
```

### CSS Implementation

```css
/* Breadcrumbs component styles */

.breadcrumbs {
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
}

.breadcrumb-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
}

.breadcrumb-link {
  color: #2196f3;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #0d47a1;
  text-decoration: underline;
}

.breadcrumb-text {
  color: #666;
}

.breadcrumb-text.current {
  font-weight: bold;
  color: #333;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}
```

## Related Components

- [Navigation](../navigation/Navigation.md): The main navigation component that often appears alongside Breadcrumbs
- [TopNavModern](../navigation/TopNavModern.md): The top navigation bar that may contain Breadcrumbs
- [Link](../ui/Link.md): Used within Breadcrumbs for navigation links
- [Button](./Button.md): Sometimes used alongside Breadcrumbs for page-level actions

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/ui-breadcrumbs--default).

The Storybook examples demonstrate:

- Basic breadcrumbs with a few levels
- Breadcrumbs with many levels (deep navigation)
- Breadcrumbs with long titles
- Breadcrumbs in different contexts (course page, assignment page, etc.)

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic breadcrumbs |
| 1.1.0 | Added Redux integration |
| 1.2.0 | Improved styling and accessibility |
| 2.0.0 | Refactored to TypeScript |

## Technical Debt

The Breadcrumbs component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Redux Coupling | Tightly coupled to Redux store structure | Makes the component less reusable | Accept breadcrumbs as a prop with Redux as a fallback | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Attributes | Component lacks proper ARIA attributes for screen readers | Reduces accessibility for screen reader users | Add aria-label="Breadcrumb" and aria-current="page" | High |
| A-002 | Separator Character | Uses a slash character as separator | May be confusing for screen readers | Use a more semantic separator with proper aria-hidden | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Truncation for Long Paths | Add truncation for very long breadcrumb paths | Improves UI for deep navigation | Medium | Medium |
| RFO-002 | Microdata Support | Add schema.org microdata for SEO | Improves SEO | Low | Low |

For a complete technical debt analysis, see the [Breadcrumbs Technical Debt Report](../technical-debt/Breadcrumbs-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [Breadcrumbs Version Compatibility Matrix](./Breadcrumbs-version-compatibility.md)
