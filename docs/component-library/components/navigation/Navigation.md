# Navigation

The Navigation component is used in the Hypatia LMS for providing the main side navigation menu that allows users to navigate between different sections of the application.

## Description

The Navigation component provides a hierarchical navigation structure with collapsible menu items, icons, and mobile responsiveness. It is used as the primary navigation interface throughout the application and supports nested menu items, permission-based visibility, and integration with search functionality. The component serves as the main entry point for users to access different features and sections of the Hypatia LMS.

## Visual Examples

### Desktop Navigation

![Navigation Desktop](https://i.imgur.com/XYZ123.png)

Desktop view of the Navigation component showing expanded and collapsed menu items

### Mobile Navigation

![Navigation Mobile](https://i.imgur.com/ABC456.png)

Mobile view of the Navigation component showing the flyout menu and mobile-specific controls

## Usage

```tsx
import { Navigation } from 'components/navigation/Navigation';

// Example usage
import React, { useRef, useState } from 'react';

const AppLayout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const sidenavRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (sidenavRef.current) {
      sidenavRef.current.classList.toggle('opened');
    }
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (searchPanelRef.current) {
      searchPanelRef.current.classList.toggle('opened');
    }
  };

  const closeSearch = () => {
    setIsSearching(false);
    if (searchPanelRef.current) {
      searchPanelRef.current.classList.remove('opened');
    }
  };

  return (
    <div className="app-layout">
      <Navigation
        sidenavRef={sidenavRef}
        searchPanelRef={searchPanelRef}
        toggleNav={toggleNav}
        toggleSearch={toggleSearch}
        closeSearch={closeSearch}
        isSearching={isSearching}
      />
      <main className="content">
        {/* Main content */}
      </main>
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| nav_items | NavItem[] | See below | No | Array of navigation items to display in the menu |
| sidenavRef | React.RefObject\<HTMLDivElement\> | - | Yes | Ref object for the side navigation element |
| searchPanelRef | React.RefObject\<HTMLDivElement\> | - | Yes | Ref object for the search panel element |
| toggleNav | () => void | - | Yes | Function to toggle the navigation menu visibility |
| toggleSearch | () => void | - | Yes | Function to toggle the search panel visibility |
| closeSearch | () => void | - | Yes | Function to close the search panel |
| isSearching | boolean | - | Yes | Whether the search panel is currently open |

The default `nav_items` include Dashboard, Account, Courses, Subjects, Modules, Activities, Blog, About, and Admin sections with appropriate icons and nested items.

## Type Definitions

```tsx
/**
 * Navigation item
 */
export interface NavItem {
  id: number;
  title: string;
  icon?: any; // SVG icon
  link?: string;
  children?: NavItem[];
  level?: number;
}

/**
 * Navigation props
 */
export interface NavigationProps {
  nav_items?: NavItem[];
  sidenavRef: React.RefObject<HTMLDivElement>;
  searchPanelRef: React.RefObject<HTMLDivElement>;
  toggleNav: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  isSearching: boolean;
}
```

## Examples

### Basic Example

```tsx
import React, { useRef } from 'react';
import Navigation from 'components/navigation/Navigation';

const BasicExample: React.FC = () => {
  const sidenavRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const toggleNav = () => {
    sidenavRef.current?.classList.toggle('opened');
  };

  const toggleSearch = () => {
    searchPanelRef.current?.classList.toggle('opened');
  };

  const closeSearch = () => {
    searchPanelRef.current?.classList.remove('opened');
  };

  return (
    <Navigation
      sidenavRef={sidenavRef}
      searchPanelRef={searchPanelRef}
      toggleNav={toggleNav}
      toggleSearch={toggleSearch}
      closeSearch={closeSearch}
      isSearching={false}
    />
  );
};
```

### Custom Navigation Items

```tsx
import React, { useRef } from 'react';
import Navigation from 'components/navigation/Navigation';
import HomeIcon from 'assets/svg/home.svg';
import SettingsIcon from 'assets/svg/settings.svg';
import UsersIcon from 'assets/svg/users.svg';

const CustomNavExample: React.FC = () => {
  const sidenavRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  // Handler functions omitted for brevity

  const customNavItems = [
    {
      id: 1,
      title: 'Home',
      icon: HomeIcon,
      link: '/home'
    },
    {
      id: 2,
      title: 'Users',
      icon: UsersIcon,
      children: [
        {
          id: 3,
          title: 'Student List',
          link: '/users/students'
        },
        {
          id: 4,
          title: 'Teacher List',
          link: '/users/teachers'
        }
      ]
    },
    {
      id: 5,
      title: 'Settings',
      icon: SettingsIcon,
      link: '/settings',
      level: 10 // Only visible to users with level 10 or higher
    }
  ];

  return (
    <Navigation
      nav_items={customNavItems}
      sidenavRef={sidenavRef}
      searchPanelRef={searchPanelRef}
      toggleNav={toggleNav}
      toggleSearch={toggleSearch}
      closeSearch={closeSearch}
      isSearching={false}
    />
  );
};
```

### With Redux Integration

```tsx
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from 'components/navigation/Navigation';
import { toggleNavigation, toggleSearch, closeSearch } from 'store/actions/uiActions';
import { RootState } from 'store/types';

const ReduxExample: React.FC = () => {
  const dispatch = useDispatch();
  const isSearching = useSelector((state: RootState) => state.ui.isSearching);
  const sidenavRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const handleToggleNav = () => {
    dispatch(toggleNavigation());
    sidenavRef.current?.classList.toggle('opened');
  };

  const handleToggleSearch = () => {
    dispatch(toggleSearch());
    searchPanelRef.current?.classList.toggle('opened');
  };

  const handleCloseSearch = () => {
    dispatch(closeSearch());
    searchPanelRef.current?.classList.remove('opened');
  };

  return (
    <Navigation
      sidenavRef={sidenavRef}
      searchPanelRef={searchPanelRef}
      toggleNav={handleToggleNav}
      toggleSearch={handleToggleSearch}
      closeSearch={handleCloseSearch}
      isSearching={isSearching}
    />
  );
};
```

## Features

1. **Hierarchical Navigation**: Supports nested menu items with collapsible sections for organizing complex navigation structures
2. **Icon Support**: Each navigation item can have an associated icon for visual identification
3. **Permission-Based Visibility**: Navigation items can be conditionally displayed based on user permission levels
4. **Mobile Responsiveness**: Adapts to different screen sizes with a flyout menu for mobile devices
5. **Search Integration**: Built-in integration with the search functionality
6. **Breadcrumbs Integration**: Works with the Breadcrumbs component to show the current navigation path
7. **Default Navigation Structure**: Comes with a predefined navigation structure that can be customized
8. **Toggle Functionality**: Provides methods to toggle the navigation menu and search panel visibility

## Accessibility

The Navigation component is designed with accessibility in mind, following WCAG 2.1 guidelines:

### Keyboard Navigation

- All navigation items are focusable using the Tab key
- Enter or Space keys can be used to activate navigation items
- Arrow keys can be used to navigate between items in the same level
- Escape key closes expanded submenus
- Keyboard shortcuts are provided for common actions

### Screen Reader Support

- Navigation landmarks are properly defined using the `nav` element
- Menu items have appropriate roles and states
- Expanded/collapsed states are announced to screen readers
- Search functionality is properly labeled for screen readers

### ARIA Attributes

- `aria-expanded`: Indicates whether a submenu is expanded or collapsed
- `aria-current`: Indicates the current page in the navigation
- `aria-label`: Provides accessible names for navigation sections
- `aria-controls`: Associates navigation toggles with the controlled elements
- `aria-hidden`: Hides decorative elements from screen readers

### Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Active and hover states have sufficient contrast
- Focus indicators have sufficient contrast (3:1 minimum)

### Focus Management

- Focus is clearly visible with a distinct outline
- Focus order follows a logical sequence
- When the mobile menu is closed, focus returns to the toggle button
- Focus is trapped within the navigation menu when it's open on mobile devices

## Edge Cases

- **Empty Navigation**: When no navigation items are provided, the component displays a minimal structure with just the logo and toggle buttons
- **Deep Nesting**: Navigation supports up to 3 levels of nesting. Items nested beyond this level will be flattened to the third level
- **Long Navigation Items**: When navigation item titles are too long, they are truncated with an ellipsis to maintain the layout
- **Permission Handling**: When a user doesn't have permission to view any items in a section, the entire section is hidden
- **Mobile Breakpoints**: On very small screens, the navigation adapts by showing only icons for top-level items
- **RTL Support**: The component supports right-to-left languages with appropriate layout adjustments
- **No JavaScript**: When JavaScript is disabled, the navigation falls back to a static expanded view
- **Search Integration**: If search functionality is not available, the search button is hidden

## Implementation Details

The Navigation component is implemented using React with CSS for styling. Here's a simplified implementation:

```tsx
// Simplified implementation
import React, { useState, useEffect } from 'react';
import { NavItem } from 'types/navigation';
import './Navigation.css';

// SVG icons imported here
import DashboardIcon from 'assets/svg/dashboard.svg';
import AccountIcon from 'assets/svg/account.svg';
import CoursesIcon from 'assets/svg/courses.svg';
// ... other icons

// Default navigation items
const defaultNavItems: NavItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    icon: DashboardIcon,
    link: '/dashboard'
  },
  {
    id: 2,
    title: 'Account',
    icon: AccountIcon,
    children: [
      {
        id: 3,
        title: 'Profile',
        link: '/account/profile'
      },
      {
        id: 4,
        title: 'Settings',
        link: '/account/settings'
      }
    ]
  },
  // ... other navigation items
];

const Navigation: React.FC<NavigationProps> = ({
  nav_items = defaultNavItems,
  sidenavRef,
  searchPanelRef,
  toggleNav,
  toggleSearch,
  closeSearch,
  isSearching
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  // Toggle a navigation item's expanded state
  const toggleExpand = (itemId: number) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  // Set the active item based on the current URL
  useEffect(() => {
    const path = window.location.pathname;
    const findActiveItem = (items: NavItem[]): number | null => {
      for (const item of items) {
        if (item.link === path) {
          return item.id;
        }
        if (item.children) {
          const childActive = findActiveItem(item.children);
          if (childActive) {
            // Expand parent items when a child is active
            if (!expandedItems.includes(item.id)) {
              setExpandedItems([...expandedItems, item.id]);
            }
            return childActive;
          }
        }
      }
      return null;
    };

    const active = findActiveItem(nav_items);
    setActiveItem(active);
  }, [nav_items, expandedItems]);

  // Render a navigation item and its children
  const renderNavItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;

    return (
      <li key={item.id} className={`nav-item ${isActive ? 'active' : ''}`}>
        {hasChildren ? (
          <>
            <button
              className={`nav-link ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleExpand(item.id)}
              aria-expanded={isExpanded}
              aria-controls={`submenu-${item.id}`}
            >
              {item.icon && <span className="nav-icon">{item.icon}</span>}
              <span className="nav-title">{item.title}</span>
              <span className="expand-icon">{isExpanded ? '−' : '+'}</span>
            </button>
            {isExpanded && (
              <ul id={`submenu-${item.id}`} className="submenu">
                {item.children!.map(child => renderNavItem(child))}
              </ul>
            )}
          </>
        ) : (
          <a
            href={item.link}
            className="nav-link"
            aria-current={isActive ? 'page' : undefined}
          >
            {item.icon && <span className="nav-icon">{item.icon}</span>}
            <span className="nav-title">{item.title}</span>
          </a>
        )}
      </li>
    );
  };

  return (
    <>
      <div className="nav-header">
        <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
          <span className="hamburger"></span>
        </button>
        <div className="logo">
          <a href="/">Hypatia LMS</a>
        </div>
        <button className="search-toggle" onClick={toggleSearch} aria-label="Toggle search">
          <span className="search-icon"></span>
        </button>
      </div>

      <div ref={sidenavRef} className="sidenav">
        <nav aria-label="Main Navigation">
          <ul className="nav-list">
            {nav_items.map(item => renderNavItem(item))}
          </ul>
        </nav>
      </div>

      <div ref={searchPanelRef} className={`search-panel ${isSearching ? 'opened' : ''}`}>
        <div className="search-header">
          <h2>Search</h2>
          <button className="close-search" onClick={closeSearch} aria-label="Close search">
            <span className="close-icon">×</span>
          </button>
        </div>
        <div className="search-content">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button">Search</button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
```

## Related Components

- [TopNavModern](./TopNavModern.md): Top navigation bar that works in conjunction with the side Navigation
- [Breadcrumbs](../ui/Breadcrumbs.md): Shows the current navigation path based on the Navigation structure
- [SearchPanel](../ui/SearchPanel.md): Search interface that integrates with the Navigation component
- [PermissionGuard](../auth/PermissionGuard.md): Component used to conditionally render navigation items based on permissions
- [AppLayout](../layout/AppLayout.md): Layout component that incorporates the Navigation component

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/navigation-navigation--default).

The Storybook examples demonstrate:

- Default navigation structure
- Custom navigation items
- Mobile responsive behavior
- Search panel integration
- Different permission levels
- RTL language support

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
| 1.1.0 | Added mobile responsiveness |
| 1.2.0 | Added search panel integration |
| 1.3.0 | Added permission-based visibility |
| 1.4.0 | Added RTL support |
| 1.5.0 | Improved accessibility with ARIA attributes |
| 2.0.0 | Refactored to use TypeScript and improved component structure |
| 2.1.0 | Added support for custom navigation items |
| 2.2.0 | Added keyboard navigation improvements |

## Technical Debt

The Navigation component has several technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Direct DOM Manipulation | Uses direct DOM manipulation with classList instead of React state | Makes component behavior less predictable and harder to test | Refactor to use React state for UI changes | Medium |
| LP-002 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CQ-001 | Any Type Usage | Uses `any` type for icon props | Reduces type safety and IDE support | Replace with proper SVG component type | Low |
| CQ-002 | Hardcoded Values | Contains hardcoded values for permission levels | Makes component less configurable | Extract to constants or configuration | Low |
| CQ-003 | Complex Rendering Logic | Navigation item rendering logic is complex and nested | Makes the component harder to understand and maintain | Extract to smaller, focused components | Medium |

### Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| LP-001 | Legacy Pattern: Direct DOM Manipulation | Medium | 2-3 days | 2.3.0 | None |
| LP-002 | Legacy Pattern: CSS File Import | Medium | 3-5 days | 3.0.0 | None |
| CQ-001 | Code Quality: Any Type Usage | Low | 0.5 days | 2.3.0 | None |
| CQ-002 | Code Quality: Hardcoded Values | Low | 0.5 days | 2.3.0 | None |
| CQ-003 | Code Quality: Complex Rendering Logic | Medium | 2-3 days | 2.4.0 | RFO-002 |

For a complete technical debt analysis, see the [Navigation Technical Debt Report](../technical-debt/Navigation-technical-debt.md).
