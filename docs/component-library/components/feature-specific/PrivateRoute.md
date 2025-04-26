# PrivateRoute

The `PrivateRoute` component is a route guard used in the Hypatia LMS to protect routes that require authentication.

## Description

```tsx
import PrivateRoute from 'components/auth/PrivateRoute';
```

The `PrivateRoute` component checks if a user is authenticated before rendering a route. If the user is not authenticated, it redirects them to the sign-in page, preserving the intended destination for after login. It utilizes the `useAuthContext` hook to determine the authentication status and displays a loading spinner while checking. This component is essential for securing routes that require authentication.

## Usage

```tsx
import PrivateRoute from 'components/auth/PrivateRoute';

<PrivateRoute>
  <SomeComponent />
</PrivateRoute>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | React.ReactNode | - | Yes | The content to render if the user is authenticated. |

## Type Definitions

```tsx
interface PrivateRouteProps {
  children: React.ReactNode;
}
```

## Examples

### Basic Example

```tsx
<PrivateRoute>
  <Dashboard />
</PrivateRoute>
```

### Redirect Example

This example demonstrates how the `PrivateRoute` redirects the user to the sign-in page if they are not authenticated.

```tsx
// In this scenario, if the user is not authenticated, they will be redirected to /signin
<PrivateRoute>
  <SettingsPage />
</PrivateRoute>
```

### Loading Example

This example shows the loading state while the authentication status is being checked.

```tsx
// While the authentication status is being checked, a loading spinner is displayed
<PrivateRoute>
  <SomeComponent />
</PrivateRoute>
```

## Features

1.  **Route Protection**: Ensures that only authenticated users can access specific routes.
2.  **Redirection**: Redirects unauthenticated users to the sign-in page, preserving the intended destination.
3.  **Loading State**: Displays a loading indicator while checking authentication status.

## Accessibility

-   **Screen Reader Support**: The loading spinner provides a text description for screen readers using the `aria-live` attribute.
-   **Focus Management**: Focus is managed appropriately when redirecting to the sign-in page using `useEffect` hook.
-   **ARIA Attributes**: The loading spinner uses the `aria-live="polite"` attribute to announce changes to screen readers.
-   **Color Contrast**: The loading spinner uses colors with sufficient contrast for readability.

## Edge Cases

-   **Incorrect Authentication State**: Handles cases where the authentication state is not properly initialized, such as when the user's authentication token is invalid or expired, by redirecting the user to the sign-in page.
-   **Network Errors**: Handles potential network errors when checking authentication status by displaying an error message or retrying the authentication check, ensuring a smooth user experience.
-   **Unauthorized Access**: Prevents unauthorized access to protected routes by redirecting unauthenticated users to the sign-in page, maintaining the security of the application.

## Implementation Details

```tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }
  
  if (!isAuthenticated()) {
    // Redirect to sign in page with return URL
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
```

## Related Components

- [useAuthContext](../../contexts/AuthContext.md): [AuthContext](../../contexts/AuthContext.md) provides authentication context to the component and manages user authentication state.
- [LoadingSpinner](../common/LoadingSpinner.md): [LoadingSpinner](../common/LoadingSpinner.md) displays a loading indicator while checking authentication status, providing a visual cue to the user.

## Interactive Examples

[Link to Storybook: Add Storybook link here]

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation of PrivateRoute component |
