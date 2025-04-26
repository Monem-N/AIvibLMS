# DashboardModern

The DashboardModern component is used in the Hypatia LMS for displaying a personalized dashboard that provides users with an overview of their courses, activities, announcements, and other relevant information.

## Description

The DashboardModern component serves as the main landing page for authenticated users in the Hypatia Learning Management System. It is a functional component built with React hooks that aggregates and displays various widgets containing user-specific information. The component includes a personalized header with user information, a grid layout for widgets, and handles different states such as loading, error, and empty data. It integrates with Redux for state management, React Router for navigation, and custom hooks for authentication and notifications. The dashboard is designed to be responsive, accessible, and customizable based on user roles and preferences.

## Visual Examples

### Standard Dashboard View

<!-- Note: Replace with actual screenshot when available -->
![Standard Dashboard View](https://via.placeholder.com/800x500?text=Standard+Dashboard+View)

The standard dashboard view showing various widgets including courses, upcoming activities, and announcements

### Dashboard Loading State

<!-- Note: Replace with actual screenshot when available -->
![Dashboard Loading State](https://via.placeholder.com/800x500?text=Dashboard+Loading+State)

The dashboard in loading state with skeleton loaders for widgets

### Empty Dashboard State

<!-- Note: Replace with actual screenshot when available -->
![Empty Dashboard State](https://via.placeholder.com/800x500?text=Empty+Dashboard+State)

The dashboard when a user has no courses or activities

## Import

```tsx
import { DashboardModern } from 'components/dashboard/DashboardModern';
```

Note: The actual import in the codebase is a default export, so you would use:

```tsx
import DashboardModern from 'components/dashboard/DashboardModern';
```

## Usage

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import DashboardModern from 'components/dashboard/DashboardModern';
import PrivateRoute from './components/auth/PrivateRoute';

// The component requires several context providers and should be used within a Router
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardModern />
                  </PrivateRoute>
                }
              />
              {/* Other routes */}
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  );
};
```

Note that DashboardModern doesn't accept any props directly. It retrieves the user data from the authentication context and fetches other data from Redux.

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| N/A | N/A | N/A | N/A | The DashboardModern component doesn't accept any props directly. It retrieves the user data from the authentication context and fetches other data from Redux. |

### Context Dependencies

The component depends on the following contexts:

| Context | Purpose |
|---------|---------|
| AuthContext | Provides user authentication state and methods |
| NotificationContext | Provides notification display functionality |

### Redux State

The component uses the following Redux state:

| State | Type | Description |
|-------|------|-------------|
| courses | Course[] | List of user's courses |
| activities | Activity[] | List of user's upcoming activities |
| announcements | Announcement[] | List of recent announcements |
| loading | boolean | Loading state for dashboard data |
| error | string | Error message if data fetching fails |

## Type Definitions

```tsx
/**
 * User Interface (from types/user.ts)
 */
export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName?: string | null;
  photoURL?: string | null;
  info?: UserInfo;
  metadata?: UserMetadata;
}

/**
 * User Info Interface (from types/user.ts)
 */
export interface UserInfo {
  firstName: string;
  lastName1: string;
  lastName2?: string;
  displayName: string;
  level: number;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  language?: string;
}

/**
 * User Metadata Interface (from types/user.ts)
 */
export interface UserMetadata {
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  claimsUpdated?: boolean;
  claimsUpdatedAt?: string;
}

/**
 * Course Interface (from types/course.ts)
 */
export interface Course {
  id: string;
  title: string;
  slug?: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdBy?: string;
  instructor?: {
    id: string;
    name: string;
    avatar?: string;
  };
  startDate?: string;
  endDate?: string;
  progress?: number;
  // Other course properties...
}

/**
 * Activity Interface (from types/course.ts)
 */
export interface Activity {
  id: string;
  title: string;
  description?: string;
  moduleId: string;
  courseId?: string;
  moduleTitle?: string;
  type: 'content' | 'assignment' | 'quiz' | 'discussion';
  dueDate?: string;
  points?: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  // Other activity properties...
}

/**
 * Announcement Interface (from types/announcement.ts)
 */
export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  courseId?: string;
  courseName?: string;
  important?: boolean;
}

/**
 * RootState Interface (from types/state.ts)
 */
export interface RootState {
  user: {
    userData: {
      courses: Course[];
      activities: Activity[];
      announcements: Announcement[];
      events: Event[];
      messages: Message[];
      progress: Record<string, number>;
    };
    loading: boolean;
    error: string | null;
  };
  // Other state slices...
}
```

## Examples

### Basic Example

```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import DashboardModern from './components/dashboard/DashboardModern';

const DashboardPage = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <DashboardModern />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default DashboardPage;
```

### Example with Mock Data for Testing

```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthContext } from './contexts/AuthContext';
import DashboardModern from './components/dashboard/DashboardModern';

// Mock user data
const mockUser = {
  uid: 'user123',
  email: 'user@example.com',
  emailVerified: true,
  displayName: 'Test User',
  metadata: {
    lastLoginAt: new Date().toISOString()
  }
};

// Mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
  user: {
    userData: {
      courses: [
        {
          id: 'course1',
          title: 'Introduction to React',
          description: 'Learn the basics of React',
          status: 'published',
          progress: 75,
          startDate: '2023-01-15',
          endDate: '2023-05-30'
        }
      ],
      activities: [
        {
          id: 'activity1',
          title: 'Complete Assignment 1',
          moduleId: 'module1',
          courseId: 'course1',
          type: 'assignment',
          dueDate: '2023-04-15',
          status: 'in-progress'
        }
      ],
      announcements: [],
      events: [],
      messages: [],
      progress: { 'course1': 75 }
    },
    loading: false,
    error: null
  }
});

const TestDashboard = () => {
  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user: mockUser, loading: false }}>
        <Router>
          <DashboardModern />
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
};

export default TestDashboard;
```

### Example with Loading State

```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthContext } from './contexts/AuthContext';
import DashboardModern from './components/dashboard/DashboardModern';

// Mock user data
const mockUser = {
  uid: 'user123',
  email: 'user@example.com',
  emailVerified: true,
  displayName: 'Test User'
};

// Mock Redux store with loading state
const mockStore = configureStore([]);
const store = mockStore({
  user: {
    userData: null,
    loading: true,
    error: null
  }
});

const LoadingDashboard = () => {
  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user: mockUser, loading: false }}>
        <Router>
          <DashboardModern />
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
};

export default LoadingDashboard;
```

## Features

1. **Personalized Dashboard**: Displays user-specific information and content based on the authenticated user
2. **Widget-Based Layout**: Organizes information into modular widgets that can be customized or rearranged
3. **Course Overview**: Shows the user's enrolled courses with progress indicators and status information
4. **Activity Tracking**: Displays upcoming activities, assignments, and deadlines
5. **Progress Visualization**: Shows visual indicators of course and assignment progress
6. **Announcements Display**: Shows recent announcements from courses and system-wide notifications
7. **Calendar Integration**: Displays upcoming events and deadlines in a calendar widget
8. **Messaging Center**: Provides access to recent messages and notifications
9. **Loading States**: Handles loading states with skeleton loaders and spinners
10. **Error Handling**: Gracefully handles and displays error states with retry options
11. **Empty States**: Shows appropriate messaging and actions when no data is available
12. **Responsive Design**: Adapts layout for different screen sizes and devices

## Accessibility

The DashboardModern component is designed with accessibility in mind to ensure all users, including those with disabilities, can access and interact with their dashboard effectively.

### Keyboard Navigation

- All interactive elements (buttons, links, tabs) are keyboard accessible
- Tab order follows a logical flow through the dashboard widgets
- Focus is properly managed when loading states change
- Refresh buttons and action links can be activated using the Enter key
- Widget content can be navigated using standard keyboard controls

### Screen Reader Support

- Proper heading hierarchy (h1, h2, h3) is used to create a logical document outline
- Loading and error states are properly announced to screen readers
- Empty states provide clear text alternatives
- SVG icons include appropriate aria-hidden attributes
- Dynamic content updates are announced appropriately

### ARIA Attributes

- Widget refresh buttons include aria-label attributes
- Loading spinners use appropriate ARIA roles and states
- Error messages are associated with their containers
- Progress bars include aria-valuenow, aria-valuemin, and aria-valuemax attributes
- Expandable sections use aria-expanded attributes

### Color Contrast

- All text elements have sufficient contrast with their backgrounds (meeting WCAG AA standards)
- Status indicators use colors that meet contrast requirements
- Progress bars use colors that meet contrast requirements
- Focus indicators are visible with high contrast
- The component respects the user's color scheme preferences

### Focus Management

- All interactive elements have visible focus indicators
- Focus is properly managed during loading state changes
- Focus is trapped within modal dialogs when present
- Focus order follows a logical sequence
- Focus indicators are visible and clear

## Edge Cases

- **No User Data**: Displays a loading state until authentication is complete, then shows appropriate empty states for each widget
- **Authentication Error**: Redirects to login page if user authentication fails or token expires
- **Network Failure**: Shows error state with retry button when data fetching fails
- **Empty Courses List**: Displays a message encouraging the user to browse and enroll in courses
- **Empty Activities List**: Shows a message indicating no upcoming activities
- **Empty Announcements**: Hides the announcements widget or shows a message indicating no announcements
- **Partial Data Loading**: Handles cases where some widgets have data while others are still loading
- **Large Data Sets**: Implements pagination or virtualized lists for widgets with many items
- **User Role Changes**: Updates dashboard content based on user role (student, instructor, admin)
- **Mobile Devices**: Adapts layout for smaller screens, stacking widgets vertically
- **Offline Mode**: Provides limited functionality when the user is offline
- **Session Timeout**: Handles session timeouts gracefully with appropriate messaging

## Implementation Details

The DashboardModern component is implemented using React with TypeScript. It uses React hooks for state management and integrates with Redux for data fetching and storage.

```tsx
// Simplified implementation
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/state';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFirebase } from '../../hooks/useFirebase';
import DashboardHeader from './DashboardHeader';
import DashboardWidget from './DashboardWidget';
import CoursesWidget from './widgets/CoursesWidget';
import ActivitiesWidget from './widgets/ActivitiesWidget';
import ProgressWidget from './widgets/ProgressWidget';
import MessagesWidget from './widgets/MessagesWidget';
import CalendarWidget from './widgets/CalendarWidget';
import AnnouncementsWidget from './widgets/AnnouncementsWidget';

// Import CSS
import './Dashboard.css';

const DashboardModern: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const { user } = useAuthContext();
  const { fetchUserData } = useFirebase();

  // Redux state
  const userData = useSelector((state: RootState) => state.user.userData);

  // Effect to fetch user data
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        await fetchUserData(user.uid);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [user, fetchUserData]);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          <div className="error-icon">!</div>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader
        user={user}
        lastLogin={user?.metadata?.lastLoginAt}
      />

      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="dashboard-row">
            <CoursesWidget
              className="widget-large"
              courses={userData?.courses || []}
            />
          </div>

          <div className="dashboard-row">
            <ActivitiesWidget
              className="widget-medium"
              activities={userData?.activities || []}
            />

            <ProgressWidget
              className="widget-medium"
              progress={userData?.progress || {}}
            />
          </div>
        </div>

        <div className="dashboard-sidebar">
          <CalendarWidget
            className="widget-full"
            events={userData?.events || []}
          />

          <MessagesWidget
            className="widget-full"
            messages={userData?.messages || []}
          />

          <AnnouncementsWidget
            className="widget-full"
            announcements={userData?.announcements || []}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardModern;
```

### CSS Implementation

```css
/* Simplified Dashboard Component Styles */

.dashboard-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
}

.dashboard-content {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-sidebar {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-row {
  display: flex;
  gap: 2rem;
}

.dashboard-loading,
.dashboard-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4a90e2;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

.error-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e74c3c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .dashboard-content {
    flex-direction: column;
  }

  .dashboard-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .dashboard-row {
    flex-direction: column;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## Related Components

- [DashboardHeader](./DashboardHeader.md): Header component for the dashboard that displays user information and last login time
- [DashboardWidget](./DashboardWidget.md): Base component for all dashboard widgets providing consistent styling and behavior
- [CoursesWidget](./widgets/CoursesWidget.md): Widget that displays the user's enrolled courses
- [ActivitiesWidget](./widgets/ActivitiesWidget.md): Widget that displays upcoming activities and assignments
- [ProgressWidget](./widgets/ProgressWidget.md): Widget that displays course and assignment progress
- [MessagesWidget](./widgets/MessagesWidget.md): Widget that displays recent messages and notifications
- [CalendarWidget](./widgets/CalendarWidget.md): Widget that displays upcoming events in a calendar view
- [AnnouncementsWidget](./widgets/AnnouncementsWidget.md): Widget that displays recent announcements
- [PrivateRoute](../auth/PrivateRoute.md): Route component that ensures the user is authenticated before rendering the dashboard

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-dashboardmodern--default).

The Storybook examples demonstrate:

- Default dashboard with sample data
- Dashboard loading state
- Dashboard error state
- Empty dashboard state
- Dashboard with different user roles (student, instructor, admin)
- Dashboard on mobile devices
- Dashboard with different color themes

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic dashboard layout |
| 1.1.0 | Added loading and error states |
| 1.2.0 | Added responsive design for mobile devices |
| 1.3.0 | Added widget refresh functionality |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added role-based dashboard customization |
| 2.2.0 | Added accessibility improvements |
| 2.3.0 | Added theme support |

## Technical Debt

The DashboardModern component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Direct DOM Manipulation | Uses window.location.reload() for error retry | Causes full page reload instead of component refresh | Replace with React state management | High |
| LP-003 | Nested Components | Some widget components are tightly coupled to the dashboard | Makes testing and reuse more difficult | Extract into separate, more generic components | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | ARIA Attributes | Missing proper ARIA attributes for loading and error states | Reduces accessibility for screen reader users | Add proper ARIA attributes | High |
| A-002 | Color Contrast | Some status indicators may not meet contrast requirements | Makes content difficult to read for users with visual impairments | Improve color contrast | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Widget Lazy Loading | Implement lazy loading for widgets | Improves initial load performance | Medium | High |
| RFO-002 | Data Caching | Implement caching for dashboard data | Reduces API calls and improves performance | Medium | Medium |
| RFO-003 | Widget Customization | Allow users to customize widget layout and visibility | Improves user experience | High | Low |

For a complete technical debt analysis, see the [DashboardModern Technical Debt Report](../technical-debt/DashboardModern-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [DashboardModern Version Compatibility Matrix](./DashboardModern-version-compatibility.md)
