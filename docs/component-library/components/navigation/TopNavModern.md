# TopNavModern

The TopNavModern component is used in the Hypatia LMS for providing the main navigation bar at the top of the application.

## Description

The TopNavModern component provides a modern, responsive top navigation bar for the Hypatia LMS. It serves as the primary navigation interface, offering quick access to key application features, user account management, and search functionality. This component is a modernized version of the original TopNav component, eliminating jQuery dependencies and implementing React best practices.

## Visual Examples

### Desktop View

<!-- Note: Replace with actual screenshot when available -->
![TopNavModern Desktop](https://via.placeholder.com/800x100?text=TopNavModern+Desktop+View)

Desktop view of the TopNavModern component showing the logo, navigation controls, and user menu

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![TopNavModern Mobile](https://via.placeholder.com/400x200?text=TopNavModern+Mobile+View)

Mobile view of the TopNavModern component with collapsed navigation

## Usage

```tsx
import { TopNavModern } from 'components/navigation/TopNavModern';

// Basic usage
<TopNavModern />

// With custom class name
<TopNavModern className="custom-top-nav" />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| className | string | '' | No | Additional CSS class names for styling |

### Redux Connected Props

The TopNavModern component is connected to Redux and receives the following props automatically:

| Prop | Type | Description |
|------|------|-------------|
| user | User | The currently authenticated user |
| isAuthenticated | boolean | Whether a user is currently authenticated |
| notifications | Notification[] | List of user notifications |
| unreadCount | number | Count of unread notifications |
| toggleSidenav | () => void | Function to toggle the side navigation |
| toggleSearch | () => void | Function to toggle the search panel |
| logout | () => void | Function to log the user out |
| markAllNotificationsAsRead | () => void | Function to mark all notifications as read |

## Type Definitions

```tsx
/**
 * TopNavModern Props
 */
export interface TopNavModernProps {
  className?: string;
}

/**
 * Redux State Props
 */
export interface StateProps {
  user: User | null;
  isAuthenticated: boolean;
  notifications: Notification[];
  unreadCount: number;
}

/**
 * Redux Dispatch Props
 */
export interface DispatchProps {
  toggleSidenav: () => void;
  toggleSearch: () => void;
  logout: () => void;
  markAllNotificationsAsRead: () => void;
}

/**
 * User
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User Role
 */
export type UserRole = 'student' | 'instructor' | 'admin';

/**
 * Notification
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

/**
 * Notification Type
 */
export type NotificationType = 'announcement' | 'grade' | 'message' | 'activity' | 'system';
```

## Examples

### Basic Example

```tsx
<TopNavModern />
```

### With Custom Styling

```tsx
<TopNavModern className="custom-top-nav dark-theme" />
```

### With Redux Provider

```tsx
import { Provider } from 'react-redux';
import store from './store';

<Provider store={store}>
  <TopNavModern />
</Provider>
```

### In Application Layout

```tsx
import { TopNavModern } from 'components/navigation/TopNavModern';
import { Navigation } from 'components/navigation/Navigation';
import { Footer } from 'components/common/Footer';

const AppLayout = ({ children }) => {
  return (
    <div className="app-container">
      <TopNavModern />
      <div className="main-content">
        <Navigation />
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
```

## Features

1. **Responsive Design**: Adapts to different screen sizes with a mobile-first approach
2. **User Authentication**: Displays different navigation options based on authentication status
3. **Notifications Center**: Provides access to user notifications with unread count indicator
4. **User Menu**: Dropdown menu for user-related actions like profile access and logout
5. **Search Integration**: Quick access to the application's search functionality
6. **Navigation Toggle**: Controls for toggling the side navigation panel
7. **Branding**: Displays the application logo and branding
8. **Accessibility Support**: Fully accessible with proper semantic HTML and ARIA attributes
9. **Redux Integration**: Connected to Redux for state management
10. **Theme Support**: Can be styled with custom themes through CSS classes

## Accessibility

The TopNavModern component is designed with accessibility in mind, following WCAG 2.1 guidelines. It provides a fully accessible experience for all users, including those using assistive technologies such as screen readers, keyboard navigation, and other input methods.

### Keyboard Navigation

- All interactive elements (buttons, links, dropdowns) are fully keyboard accessible
- The Tab key navigates through all interactive elements in a logical order
- The Escape key closes any open dropdown menus
- Arrow keys navigate within dropdown menus
- Keyboard shortcuts are provided for common actions:
  - Alt+S: Toggle search panel
  - Alt+N: Toggle side navigation
  - Alt+U: Open user menu

### Screen Reader Support

- Proper semantic HTML elements are used throughout the component
- All interactive elements have appropriate accessible names
- Dropdown menus use proper ARIA attributes to indicate their expanded/collapsed state
- Notification counts are announced properly to screen readers
- The component structure follows a logical reading order

### ARIA Attributes

- `aria-expanded`: Used on dropdown toggles to indicate their current state
- `aria-haspopup`: Applied to elements that trigger popups or dropdown menus
- `aria-label`: Provides accessible names for buttons and controls without visible text
- `aria-live`: Used for dynamic content like notification counts
- `aria-current`: Indicates the current page in the navigation

### Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Icons have sufficient contrast against their background
- Focus indicators have a contrast ratio of at least 3:1
- The component works well with high contrast mode and custom color schemes

### Focus Management

- Focus is clearly visible with a distinct outline
- Focus is trapped within modal dialogs and dropdown menus
- Focus returns to the triggering element when a dropdown is closed
- Focus order follows a logical sequence that matches the visual layout

## Edge Cases

- **Unauthenticated User**: When no user is authenticated, the component displays login and registration links instead of the user menu and notifications
- **Long User Names**: When a user has a very long name, it is truncated with an ellipsis to maintain the layout
- **Many Notifications**: When there are many notifications, the dropdown displays a scrollable list with the most recent notifications at the top
- **High Notification Count**: When the unread notification count exceeds 99, it displays "99+" to maintain the layout
- **Mobile View**: On small screens, the component collapses less important elements into a hamburger menu
- **No Avatar**: When a user has no avatar image, a default avatar with their initials is displayed
- **Network Issues**: When network requests fail (e.g., for notifications), appropriate error states are displayed
- **RTL Support**: The component supports right-to-left languages with appropriate layout adjustments
- **Redux Connection**: If used without Redux, the component falls back to default values and disabled functionality

## Implementation Details

The TopNavModern component is implemented using React with Redux for state management. Here's a simplified implementation:

```tsx
// Simplified implementation
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './TopNav.css';
import { User, Notification } from 'types/user';
import { Icon } from 'common/Icon';
import { Link } from 'react-router-dom';
import { logout, markAllNotificationsAsRead } from 'actions/authActions';
import { toggleSidenav, toggleSearch } from 'actions/uiActions';

export const TopNavModern: React.FC<TopNavModernProps & StateProps & DispatchProps> = ({
  className = '',
  user,
  isAuthenticated,
  notifications = [],
  unreadCount = 0,
  toggleSidenav,
  toggleSearch,
  logout,
  markAllNotificationsAsRead
}) => {
  // State for dropdown menus
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Toggle user menu
  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
    if (notificationsOpen) {
      setNotificationsOpen(false);
    }
  };

  // Toggle notifications
  const handleNotificationsToggle = () => {
    setNotificationsOpen(!notificationsOpen);
    if (userMenuOpen) {
      setUserMenuOpen(false);
    }

    // Mark notifications as read when opening
    if (!notificationsOpen && unreadCount > 0) {
      markAllNotificationsAsRead();
    }
  };

  // Handle sidebar toggle
  const handleSidenavToggle = () => {
    toggleSidenav();
    // Close any open menus
    setUserMenuOpen(false);
    setNotificationsOpen(false);
  };

  // Handle search toggle
  const handleSearchToggle = () => {
    toggleSearch();
    // Close any open menus
    setUserMenuOpen(false);
    setNotificationsOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  return (
    <header className={`top-nav ${className}`}>
      <div className="top-nav-left">
        <button
          className="nav-toggle"
          onClick={handleSidenavToggle}
          aria-label="Toggle navigation menu"
        >
          <Icon name="menu" />
        </button>

        <Link to="/" className="logo">
          <img src="/logo.svg" alt="Hypatia LMS" />
        </Link>
      </div>

      <div className="top-nav-right">
        <button
          className="search-toggle"
          onClick={handleSearchToggle}
          aria-label="Toggle search"
        >
          <Icon name="search" />
        </button>

        {isAuthenticated ? (
          <>
            <div className="notifications-container">
              <button
                className="notifications-toggle"
                onClick={handleNotificationsToggle}
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={notificationsOpen}
              >
                <Icon name="notifications" />
                {unreadCount > 0 && (
                  <span className="notification-badge" aria-live="polite">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                  </div>

                  <div className="notifications-list">
                    {notifications.length === 0 ? (
                      <p className="no-notifications">No notifications</p>
                    ) : (
                      notifications.map(notification => (
                        <Link
                          key={notification.id}
                          to={notification.link || '#'}
                          className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        >
                          <div className="notification-icon">
                            <Icon name={notification.type} />
                          </div>
                          <div className="notification-content">
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <span className="notification-time">
                              {new Date(notification.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-menu-container">
              <button
                className="user-menu-toggle"
                onClick={handleUserMenuToggle}
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-fallback">
                    {getUserInitials()}
                  </div>
                )}
              </button>

              {userMenuOpen && (
                <div className="user-menu-dropdown">
                  <div className="user-info">
                    <h3>{user?.firstName} {user?.lastName}</h3>
                    <p>{user?.email}</p>
                  </div>

                  <ul className="user-menu-items">
                    <li>
                      <Link to="/profile">
                        <Icon name="person" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings">
                        <Icon name="settings" />
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>
                        <Icon name="logout" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="login-link">Log In</Link>
            <Link to="/register" className="register-link">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

// Connect to Redux
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  notifications: state.notifications.items,
  unreadCount: state.notifications.unreadCount
});

const mapDispatchToProps = {
  toggleSidenav,
  toggleSearch,
  logout,
  markAllNotificationsAsRead
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavModern);
```

## Related Components

- [Navigation](./Navigation.md): Side navigation component that works in conjunction with TopNavModern
- [Search](../search/Search.md): Search component that is toggled by the TopNavModern
- [Icon](../common/Icon.md): Icon component used for various icons in the TopNavModern
- [Button](../ui/Button.md): Button component used for various buttons in the TopNavModern
- [Link](../common/Link.md): Link component used for navigation links in the TopNavModern

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/navigation-topnavmodern--default).

The Storybook examples demonstrate:

- Default top navigation with all features
- Authenticated user view with notifications and user menu
- Unauthenticated user view with login and register links
- Mobile responsive behavior
- Different notification states (none, few, many)
- RTL language support

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
| 1.1.0 | Added responsive design for mobile devices |
| 1.2.0 | Added notifications center |
| 1.3.0 | Added user menu with profile and settings |
| 1.4.0 | Added search integration |
| 1.5.0 | Added RTL support |
| 2.0.0 | Refactored to use TypeScript and Redux |
| 2.1.0 | Added accessibility improvements with ARIA attributes |
| 2.2.0 | Added keyboard navigation support |

## Technical Debt

The TopNavModern component has several technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CQ-001 | Redux Connect HOC | Uses older connect HOC pattern instead of hooks | Makes component harder to test and maintain | Refactor to use Redux hooks (useSelector, useDispatch) | Medium |
| CQ-002 | Hardcoded Strings | Contains hardcoded strings for labels and messages | Makes internationalization difficult | Extract to constants or i18n system | Low |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Component Splitting | Split into smaller sub-components (UserMenu, NotificationsMenu) | Improves code organization and testability | Medium | Medium |
| RFO-002 | Memoization | Add memoization to prevent unnecessary re-renders | Improves performance | Low | Low |

For a complete technical debt analysis, see the [TopNavModern Technical Debt Report](../technical-debt/TopNavModern-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [TopNavModern Version Compatibility Matrix](./TopNavModern-version-compatibility.md).
