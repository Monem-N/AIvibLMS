# DashboardHeader

## Introduction

The DashboardHeader component is used in the Hypatia LMS for displaying personalized welcome information and user details at the top of the dashboard interface. It serves as the primary header for the user dashboard, providing context about the current user and quick access to profile and settings.

## Description

The DashboardHeader component is a functional React component that displays a personalized welcome message, the user's last login time, their role in the system, and quick navigation links to profile and settings pages. It extracts and formats user information from the provided user object, including display name and role, and presents it in a visually appealing header.

The component is designed to be used at the top of the dashboard interface, providing users with immediate context about their identity and status within the system. It enhances the user experience by offering personalization and quick access to frequently used functions. The responsive design ensures that the header remains usable across different device sizes, adapting its layout for optimal viewing on mobile devices.

## Visual Examples

### Standard Dashboard Header

<!-- Note: Replace with actual screenshot when available -->
![Standard Dashboard Header](https://via.placeholder.com/800x150?text=Dashboard+Header+Standard+View)

The standard view of the dashboard header showing welcome message, last login time, user role, and action buttons

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x200?text=Dashboard+Header+Mobile+View)

The responsive layout on mobile devices with stacked elements

### Different User Roles

<!-- Note: Replace with actual screenshot when available -->
![Different User Roles](https://via.placeholder.com/800x150?text=Dashboard+Header+Different+Roles)

The dashboard header showing different styling for various user roles (admin, instructor, student)

## Import

```tsx
import { DashboardHeader } from 'components/dashboard/DashboardHeader';
```

## Usage

```tsx
import React from 'react';
import { DashboardHeader } from 'components/dashboard/DashboardHeader';
import { User } from 'types/user';

const DashboardPage: React.FC = () => {
  // Example user data
  const user: User = {
    uid: 'user123',
    email: 'user@example.com',
    emailVerified: true,
    displayName: 'John Doe',
    info: {
      firstName: 'John',
      lastName1: 'Doe',
      displayName: 'John Doe',
      level: 1,
      role: 'student'
    },
    metadata: {
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      lastLoginAt: '2023-08-15T14:30:00Z'
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader
        user={user}
        lastLogin={user.metadata?.lastLoginAt}
      />

      {/* Rest of dashboard content */}
    </div>
  );
};
```

## Common Usage Patterns

The DashboardHeader component is typically used at the top of the dashboard page:

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| user | User \| null | - | Yes | User object containing user information including display name and role |
| lastLogin | string | - | No | ISO timestamp string of the user's last login time |

## User Object Structure

The component expects a User object with the following structure:

| Property | Type | Description |
|----------|------|-------------|
| uid | string | Unique identifier for the user |
| email | string \| null | User's email address |
| displayName | string \| null | User's display name (fallback if info.displayName is not available) |
| info | UserInfo | Object containing detailed user information |
| info.displayName | string | User's formatted display name |
| info.role | string | User's role in the system (admin, instructor, assistant, student) |
| metadata | UserMetadata | Object containing user metadata |
| metadata.lastLoginAt | string | ISO timestamp of the user's last login time |

## Type Definitions

```tsx
/**
 * Props for the DashboardHeader component
 */
interface DashboardHeaderProps {
  /**
   * User object containing user information
   */
  user: User | null;

  /**
   * ISO timestamp string of the user's last login time
   */
  lastLogin?: string;
}

/**
 * User Interface
 */
interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName?: string | null;
  photoURL?: string | null;
  info?: UserInfo;
  metadata?: UserMetadata;
}

/**
 * User Info Interface
 */
interface UserInfo {
  firstName: string;
  lastName1: string;
  lastName2?: string;
  displayName: string;
  level: number;
  role?: string;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  language?: string;
}

/**
 * User Metadata Interface
 */
interface UserMetadata {
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  claimsUpdated?: boolean;
  claimsUpdatedAt?: string;
}
```

## Examples

### Basic Example

```tsx
import React from 'react';
import { DashboardHeader } from 'components/dashboard/DashboardHeader';

const BasicExample: React.FC = () => {
  const user = {
    uid: 'user123',
    email: 'user@example.com',
    displayName: 'John Doe',
    info: {
      displayName: 'John Doe',
      role: 'student'
    }
  };

  return <DashboardHeader user={user} lastLogin="2023-08-18T10:30:00Z" />;
};
```

### Advanced Example

```tsx
import React, { useEffect, useState } from 'react';
import { DashboardHeader } from 'components/dashboard/DashboardHeader';
import { useAuth } from 'contexts/AuthContext';
import { fetchUserData } from 'services/userService';

const AdvancedExample: React.FC = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        try {
          const data = await fetchUserData(currentUser.uid);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardHeader
      user={userData}
      lastLogin={userData?.metadata?.lastLoginAt}
    />
  );
};
```

### With Admin User

```tsx
import React from 'react';
import { DashboardHeader } from 'components/dashboard/DashboardHeader';

const AdminDashboard: React.FC = () => {
  const adminUser = {
    uid: 'admin123',
    email: 'admin@example.com',
    emailVerified: true,
    displayName: 'Admin User',
    info: {
      firstName: 'Admin',
      lastName1: 'User',
      displayName: 'Admin User',
      level: 10,
      role: 'admin'
    },
    metadata: {
      lastLoginAt: '2023-08-17T09:15:00Z'
    }
  };

  return (
    <DashboardHeader
      user={adminUser}
      lastLogin={adminUser.metadata?.lastLoginAt}
    />
  );
};
```

### With Instructor User

```tsx
import React from 'react';
import DashboardHeader from 'components/dashboard/DashboardHeader';

const InstructorDashboard: React.FC = () => {
  const instructorUser = {
    uid: 'instructor123',
    email: 'instructor@example.com',
    emailVerified: true,
    displayName: 'Jane Smith',
    info: {
      firstName: 'Jane',
      lastName1: 'Smith',
      displayName: 'Prof. Jane Smith',
      level: 5,
      role: 'instructor'
    },
    metadata: {
      lastLoginAt: '2023-08-16T14:30:00Z'
    }
  };

  return (
    <DashboardHeader
      user={instructorUser}
      lastLogin={instructorUser.metadata?.lastLoginAt}
    />
  );
};
```

### With No User (Loading State)

```tsx
import React from 'react';
import DashboardHeader from 'components/dashboard/DashboardHeader';

const LoadingDashboard: React.FC = () => {
  // When user is null, the component will show a generic greeting
  return (
    <DashboardHeader
      user={null}
      lastLogin={undefined}
    />
  );
};
```

## Features

1. **Personalized Welcome**: Displays a personalized welcome message with the user's display name
2. **Last Login Display**: Shows the user's last login time in a human-readable format
3. **Role Indicator**: Visually indicates the user's role in the system with appropriate styling
4. **Quick Navigation**: Provides quick access to profile and settings pages
5. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
6. **Fallback Handling**: Gracefully handles missing user information with sensible defaults
7. **Role Formatting**: Formats role names for better readability (e.g., "admin" becomes "Administrator")
8. **Visual Hierarchy**: Uses visual hierarchy to emphasize important information
9. **Consistent Styling**: Maintains consistent styling with the rest of the dashboard
10. **Lightweight**: Minimal dependencies and optimized for performance

## Accessibility

The DashboardHeader component is designed with accessibility in mind, addressing the following considerations:

### Semantic HTML

- Uses semantic HTML elements for proper document structure
- Heading elements (`<h1>`) are used for the welcome message
- Paragraph elements (`<p>`) are used for descriptive text
- Link elements (`<a>`) are used for navigation

### Keyboard Navigation

- All interactive elements (links) are keyboard accessible
- Tab order follows a logical sequence
- Focus states are clearly visible

### Screen Reader Support

- Proper heading structure provides context for screen reader users
- Text alternatives are provided for any non-text content
- Meaningful link text helps screen reader users understand destinations

### Color Contrast

- Text colors have sufficient contrast with their backgrounds
- The user role badge maintains WCAG 2.1 AA contrast requirements
- Interactive elements have clear visual states

### Focus Management

- Focus indicators are clearly visible
- Interactive elements have appropriate focus styles
- Focus order follows a logical sequence through the component

## Edge Cases

- **Null User**: When the `user` prop is null, the component displays a generic "Welcome" message without a name
- **Missing Display Name**: If the user object doesn't have a display name, the component falls back to "User"
- **Missing Role**: If the user object doesn't have a role, the component defaults to "student" role
- **Invalid Role**: If the user has a role that doesn't match any of the predefined roles, it displays "User"
- **Missing Last Login**: If the `lastLogin` prop is not provided, the component displays "Unknown" for the last login time
- **Invalid Last Login Format**: If the `lastLogin` prop is not a valid date string, the component handles the error and displays "Unknown"
- **Long Display Names**: The component handles long display names by allowing them to wrap naturally
- **Mobile Viewport**: On smaller screens, the component adjusts its layout to stack elements vertically
- **RTL Support**: The component supports right-to-left languages by adjusting its layout accordingly
- **High Contrast Mode**: The component maintains usability when viewed in high contrast mode

## Implementation Details

Here's a simplified implementation of the DashboardHeader component to help developers understand its inner workings:

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types/user';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './DashboardHeader.css';

interface DashboardHeaderProps {
  user: User | null;
  lastLogin?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, lastLogin }) => {
  // Format last login time
  const formattedLastLogin = lastLogin ? formatDate(lastLogin) : 'Unknown';

  // Get user display name
  const displayName = user?.info?.displayName || user?.displayName || 'User';

  // Get user role
  const userRole = user?.info?.role || 'student';

  // Get formatted role
  const formattedRole = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrator';
      case 'instructor':
        return 'Instructor';
      case 'assistant':
        return 'Teaching Assistant';
      case 'student':
        return 'Student';
      default:
        return 'User';
    }
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-welcome">
        <h1>Welcome back, {displayName}!</h1>
        <p className="last-login">
          Last login: {formattedLastLogin}
        </p>
      </div>

      <div className="dashboard-user-info">
        <div className="user-role">{formattedRole()}</div>
        <div className="user-actions">
          <Link to="/profile" className="btn btn-outline">
            View Profile
          </Link>
          <Link to="/settings" className="btn btn-outline">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
```

## Related Components

- [DashboardModern](./DashboardModern.md): Parent component that uses DashboardHeader at the top of the dashboard
- [DashboardWidget](./DashboardWidget.md): Component used for displaying widgets in the dashboard below the header
- [UserProfile](./UserProfile.md): Component linked from the DashboardHeader for viewing and editing user profile
- [UserSettings](./UserSettings.md): Component linked from the DashboardHeader for managing user settings
- [CoursesWidget](./widgets/CoursesWidget.md): Widget component displayed in the dashboard below the header

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/dashboard-dashboardheader--default).

## Technical Debt

- The component doesn't support internationalization for text strings
- The component doesn't implement proper error boundaries
- The component doesn't have comprehensive test coverage
- The role formatting logic should be moved to a utility function
- The component doesn't support custom action buttons
- The component doesn't support custom styling for different user roles

## Version Compatibility

For detailed version compatibility information, see the [DashboardHeader Version Compatibility Matrix](./DashboardHeader-version-compatibility.md).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic user information display |
| 1.1.0 | Added role formatting and styling |
| 1.2.0 | Added last login time display |
| 1.3.0 | Added responsive design for mobile devices |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added profile and settings links |
| 2.2.0 | Improved error handling for missing user data |
| 2.3.0 | Added accessibility improvements |
