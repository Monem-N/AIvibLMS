# ProtectedRoute

The `ProtectedRoute` component is a route guard used in the Hypatia LMS to protect routes that require authentication and optional email verification.

## Description

```tsx
import ProtectedRoute from 'components/auth/ProtectedRoute';
```

The `ProtectedRoute` component checks if a user is authenticated and, optionally, if their email is verified before rendering a route. If the user is not authenticated, it redirects them to the sign-in page, preserving the intended destination for after login. If the user is not verified and verification is required, it redirects them to the verify-email page. It utilizes the `useAuthContext` hook to determine the authentication and verification status. This component is essential for securing routes that require authentication and email verification.

## Usage

```tsx
import ProtectedRoute from 'components/auth/ProtectedRoute';

<ProtectedRoute>
  <SomeComponent />
</ProtectedRoute>

<ProtectedRoute requireVerified>
  <SomeComponent />
</ProtectedRoute>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | React.ReactNode | - | Yes | The content to render if the user is authenticated and verified (if required). |
| requireVerified | boolean | false | No | Whether the user's email must be verified to access the route. |

## Type Definitions

```tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}
```

## Examples

### Basic Example

```tsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### Require Verification Example

This example demonstrates how the `ProtectedRoute` redirects the user to the verify-email page if they are not verified.

```tsx
<ProtectedRoute requireVerified>
  <SettingsPage />
</ProtectedRoute>
```

### Loading Example

This example shows the loading state while the authentication status is being checked.

```tsx
<ProtectedRoute>
  <SomeComponent />
</ProtectedRoute>
```

## Features

1.  **Route Protection**: Ensures that only authenticated users can access specific routes.
2.  **Email Verification**: Optionally requires users to verify their email before accessing specific routes.
3.  **Redirection**: Redirects unauthenticated or unverified users to the appropriate pages.

## Accessibility

-   **Screen Reader Support**: The loading message provides a text description for screen readers using the `aria-live` attribute.
-   **Focus Management**: Focus is managed appropriately when redirecting to the sign-in or verify-email pages using `useEffect` hook.
-   **ARIA Attributes**: The loading message uses the `aria-live="polite"` attribute to announce changes to screen readers.
-   **Color Contrast**: The loading message uses colors with sufficient contrast for readability.

## Edge Cases

-   **Incorrect Authentication State**: Handles cases where the authentication state is not properly initialized, such as when the user's authentication token is invalid or expired, by redirecting the user to the sign-in page.
-   **Network Errors**: Handles potential network errors when checking authentication status by displaying an error message or retrying the authentication check, ensuring a smooth user experience.
-   **Unauthorized Access**: Prevents unauthorized access to protected routes by redirecting unauthenticated users to the sign-in page, maintaining the security of the application.
-   **Unverified Email**: Handles cases where the user's email is not verified when `requireVerified` is true, redirecting them to the verify-email page, prompting them to verify their email before proceeding.

## Implementation Details

```tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireVerified = false 
}) => {
  const { user, loading, initialized, isAuthenticated, isVerified } = useAuthContext();
  const location = useLocation();
  
  // If auth is not initialized yet, show loading
  if (!initialized) {
    return <div className="loading">Loading...</div>;
  }
  
  // If user is not authenticated, redirect to sign in page
  if (!isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  // If verification is required and user is not verified, redirect to verification page
  if (requireVerified && !isVerified()) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }
  
  // If user is authenticated (and verified if required), render children
  return <>{children}</>;
};

export default ProtectedRoute;
```

## Related Components

- [useAuthContext](../../contexts/AuthContext.md): [AuthContext](../../contexts/AuthContext.md) provides authentication context to the component and manages user authentication state. It also provides the `isVerified` function.

## Interactive Examples

[Link to Storybook: Add Storybook link here]

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation of ProtectedRoute component |
