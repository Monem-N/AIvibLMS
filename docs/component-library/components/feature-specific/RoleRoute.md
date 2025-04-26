# RoleRoute

## Introduction

The RoleRoute component is used in the Hypatia LMS for restricting route access based on user roles.

## Description

The RoleRoute component provides a route guard that restricts access to specific routes based on user roles. It is used in the application's routing system to protect routes that should only be accessible to users with specific roles (e.g., instructor, admin). The component checks if the current user has at least one of the required roles and redirects to the dashboard if the user doesn't have the necessary permissions. It also handles authentication checks and loading states, ensuring a smooth user experience during permission verification.

## Visual Examples

### Role-Based Access Control

<!-- Note: Replace with actual screenshot when available -->
![Role-Based Access Control](https://via.placeholder.com/800x400?text=Role+Based+Access+Control)

The RoleRoute component restricting access to a course editor page for instructors and admins only

### Unauthorized Access Redirection

<!-- Note: Replace with actual screenshot when available -->
![Unauthorized Access Redirection](https://via.placeholder.com/800x400?text=Unauthorized+Access+Redirection)

The RoleRoute component redirecting a student to the dashboard when attempting to access an instructor-only page

## Import

```tsx
import { RoleRoute } from 'components/auth/RoleRoute';
```

Note: The actual import in the codebase is a default export, so you would use:

```tsx
import RoleRoute from 'components/auth/RoleRoute';
```

## Usage

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleRoute from 'components/auth/RoleRoute';
import CourseEditorModern from 'components/courses/editor/CourseEditorModern';
import { AuthProvider } from 'contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route that requires instructor or admin role */}
          <Route
            path="/courses/new"
            element={
              <RoleRoute roles={['instructor', 'admin']}>
                <CourseEditorModern />
              </RoleRoute>
            }
          />

          {/* Route that requires admin role only */}
          <Route
            path="/admin/settings"
            element={
              <RoleRoute roles={['admin']}>
                <AdminSettings />
              </RoleRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | React.ReactNode | - | Yes | The child components to render if the user has the required role |
| roles | string[] | - | Yes | Array of role names that are allowed to access the route (e.g., ['instructor', 'admin']) |

## Type Definitions

```tsx
/**
 * RoleRouteProps Interface
 * Defines the props for the RoleRoute component
 */
interface RoleRouteProps {
  /**
   * The child components to render if the user has the required role
   */
  children: React.ReactNode;

  /**
   * Array of role names that are allowed to access the route
   */
  roles: string[];
}

/**
 * AuthContextType Interface (from contexts/AuthContext.tsx)
 * Relevant parts used by RoleRoute
 */
interface AuthContextType {
  // Other properties omitted for brevity

  /**
   * Loading state of authentication
   */
  loading: boolean;

  /**
   * Function to check if user is authenticated
   */
  isAuthenticated: () => boolean;

  /**
   * Function to check if user has one of the required roles
   */
  hasRole: (roles: string[]) => boolean;
}
```

## Examples

### Basic Example

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleRoute from 'components/auth/RoleRoute';
import AdminDashboard from 'components/admin/AdminDashboard';
import { AuthProvider } from 'contexts/AuthContext';

const AdminRoute = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/admin"
            element={
              <RoleRoute roles={['admin']}>
                <AdminDashboard />
              </RoleRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

### Example with Multiple Roles

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleRoute from 'components/auth/RoleRoute';
import GradingDashboard from 'components/grading/GradingDashboard';
import { AuthProvider } from 'contexts/AuthContext';

const GradingRoute = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/courses/:courseId/grading"
            element={
              <RoleRoute roles={['instructor', 'admin', 'teaching_assistant']}>
                <GradingDashboard />
              </RoleRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

### Example with Nested Routes

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleRoute from 'components/auth/RoleRoute';
import PrivateRoute from 'components/auth/PrivateRoute';
import CourseEditor from 'components/courses/CourseEditor';
import { AuthProvider } from 'contexts/AuthContext';

const NestedRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/courses/:courseId/edit"
            element={
              <PrivateRoute>
                <RoleRoute roles={['instructor', 'admin']}>
                  <CourseEditor />
                </RoleRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

## Features

1. **Role-Based Access Control**: Restricts access to routes based on user roles, allowing only users with specific roles to access protected content
2. **Multiple Role Support**: Accepts an array of roles, allowing access if the user has any of the specified roles
3. **Authentication Check**: Verifies that the user is authenticated before checking roles, redirecting to the sign-in page if not
4. **Loading State Handling**: Displays a loading spinner while checking authentication and permissions
5. **Redirect with Return URL**: Stores the current URL when redirecting to the sign-in page, allowing users to return after authentication
6. **Dashboard Fallback**: Redirects users without the required role to the dashboard instead of showing an error
7. **React Router Integration**: Seamlessly integrates with React Router v6 using the element prop
8. **Children Rendering**: Renders child components only when the user has the required permissions
9. **TypeScript Support**: Fully typed with TypeScript for better developer experience and type safety

## Accessibility

The RoleRoute component is primarily a logical component that doesn't render UI elements directly, but it does have some accessibility implications:

### Loading State

- The loading spinner displayed during authentication checks includes appropriate accessibility attributes
- The loading message "Checking permissions..." is visible to screen readers
- The loading state prevents interaction with protected content until permissions are verified

### Navigation and Redirects

- Redirects are performed using React Router's Navigate component, which maintains proper focus management
- The component preserves the current URL when redirecting to the sign-in page, allowing users to return to their intended destination
- Redirects are performed with the `replace` option to maintain a clean browser history

### Screen Reader Considerations

- The component doesn't announce its presence to screen readers since it's a wrapper component
- The loading spinner component used during authentication checks should include appropriate ARIA attributes
- When redirecting, screen readers will announce the new page content

### Focus Management

- The component doesn't directly manage focus, relying on React Router's navigation system
- When redirecting to the sign-in page or dashboard, focus is handled by the target component
- No focus traps are implemented since this is a routing component

## Edge Cases

- **No Roles Provided**: If an empty array is provided to the `roles` prop, the component will redirect to the dashboard since the user can't have any of the required roles
- **Authentication Loading**: During authentication loading state, the component displays a loading spinner instead of immediately redirecting
- **Role Not Found**: If the user doesn't have any of the required roles, they are redirected to the dashboard
- **Not Authenticated**: If the user is not authenticated, they are redirected to the sign-in page with the current URL stored for return
- **Multiple Roles**: If multiple roles are provided and the user has any one of them, access is granted
- **Nested Routes**: When used with nested routes, each RoleRoute component performs its own role check
- **Role Changes**: If a user's role changes while they are on a protected page, they will need to refresh the page to trigger a new role check
- **Missing AuthContext**: If the component is used outside of an AuthProvider, it will throw an error about missing AuthContext
- **Deep Linking**: When a user directly accesses a protected URL, the component will check authentication and roles before rendering

## Implementation Details

Here's a simplified implementation of the RoleRoute component to help developers understand its inner workings:

```tsx
/**
 * RoleRoute Component
 *
 * Route guard that redirects to dashboard if user doesn't have required role.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface RoleRouteProps {
  children: React.ReactNode;
  roles: string[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, hasRole, loading } = useAuthContext();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner message="Checking permissions..." />;
  }

  // Redirect to sign in page if not authenticated
  if (!isAuthenticated()) {
    // Store the current URL for return after authentication
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  // Redirect to dashboard if user doesn't have required role
  if (!hasRole(roles)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render children if user has required role
  return <>{children}</>;
};

export default RoleRoute;
```

### AuthContext Implementation (Simplified)

```tsx
/**
 * Simplified AuthContext implementation to show how hasRole works
 */

import { createContext, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: () => boolean;
  hasRole: (roles: string[]) => boolean;
  // Other auth methods...
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

// In the AuthProvider component:
const authContextValue = {
  user,
  loading,

  isAuthenticated: () => {
    return !!user;
  },

  hasRole: (roles: string[]) => {
    if (!user || !user.roles) {
      return false;
    }

    // Check if user has any of the required roles
    return roles.some(role => user.roles.includes(role));
  },

  // Other auth methods...
};
```

## Related Components

- [PrivateRoute](./PrivateRoute.md): Similar component that checks only for authentication without role requirements
- [AuthProvider](./AuthProvider.md): Context provider that supplies authentication state and methods
- [LoadingSpinner](../ui/LoadingSpinner.md): Component used to display loading state during authentication checks
- [SignIn](./SignIn.md): Component that users are redirected to when not authenticated
- [Dashboard](../feature-specific/Dashboard.md): Component that users are redirected to when they don't have the required role

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/authentication-roleroute--default).

The Storybook examples demonstrate:

- Default RoleRoute with admin role requirement
- RoleRoute with multiple role options
- RoleRoute in loading state
- RoleRoute redirecting unauthorized users
- RoleRoute with nested routes

Note: Since this component relies on authentication context and routing, the Storybook examples use mocked authentication context to demonstrate different states.

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic role checking |
| 1.1.0 | Added loading spinner during authentication checks |
| 1.2.0 | Updated to work with React Router v6 |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added support for multiple roles |
| 2.2.0 | Added state preservation when redirecting to sign-in page |

## Technical Debt

The RoleRoute component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Direct Dashboard Redirect | Hardcoded redirect to dashboard when user doesn't have required role | Reduces flexibility for different applications | Make redirect path configurable | Medium |
| LP-002 | No Unauthorized Page | Redirects to dashboard instead of showing an unauthorized page | May confuse users about why they can't access content | Add option to redirect to unauthorized page | Low |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | No Notification | No notification to users about why they were redirected | Users may not understand why they were redirected | Add toast notification explaining the redirect | Medium |
| A-002 | Loading Message | Loading message is not customizable | May not provide enough context in all situations | Make loading message configurable | Low |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Permission-Based Access | Add support for fine-grained permissions in addition to roles | More flexible access control | Medium | Medium |
| RFO-002 | Caching | Cache role check results to avoid repeated checks | Improved performance | Low | Low |
| RFO-003 | Custom Fallback | Allow custom fallback component instead of redirect | Better user experience | Low | Medium |

For a complete technical debt analysis, see the [RoleRoute Technical Debt Report](../technical-debt/RoleRoute-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [RoleRoute Version Compatibility Matrix](./RoleRoute-version-compatibility.md)
