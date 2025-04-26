# Authentication Implementation

This document describes the implementation of the modern authentication system for the Hypatia LMS. The authentication system is built using Firebase Authentication and follows modern React patterns with hooks and TypeScript.

## Overview

The authentication system provides the following functionality:

- User sign in with email and password
- User sign up with email and password
- Email verification
- Password reset
- User profile management
- Protected routes
- Authentication state management

## Architecture

The authentication system is built using the following components:

1. **Authentication Service**: A service that provides methods for user authentication using Firebase Authentication.
2. **Authentication Hook**: A custom hook that provides authentication functionality to components.
3. **Authentication Context**: A context that provides authentication state and methods to components.
4. **Authentication Components**: Components for sign in, sign up, password reset, and email verification.
5. **Protected Route Component**: A component that protects routes that require authentication.
6. **Notification System**: A system for displaying notifications to users.

## Authentication Service

The authentication service (`authService.ts`) provides methods for user authentication using Firebase Authentication. It includes methods for:

- Sign in with email and password
- Sign up with email and password
- Sign out
- Password reset
- Email verification
- User profile management
- Authentication state management

The service also integrates with Firestore to store additional user information.

## Authentication Hook

The authentication hook (`useAuth.ts`) provides authentication functionality to components. It uses the authentication service to perform authentication operations and manages authentication state. The hook provides:

- Authentication state (user, loading, initialized)
- Authentication methods (signIn, signUp, signOut, resetPassword, etc.)
- Authentication state management (isAuthenticated, isVerified)

## Authentication Context

The authentication context (`AuthContext.tsx`) provides authentication state and methods to components. It uses the authentication hook to provide authentication functionality to the entire application.

## Authentication Components

The authentication system includes the following components:

1. **SignInModern**: A component for user sign in.
2. **SignUpModern**: A component for user sign up.
3. **ForgotPasswordModern**: A component for password reset.
4. **VerifyEmailModern**: A component for email verification.
5. **ProtectedRoute**: A component that protects routes that require authentication.

### SignInModern

The SignInModern component provides a form for users to sign in with their email and password. It includes:

- Email and password input fields
- Sign in button
- Cancel button
- Forgot password link
- Sign up link
- Loading state
- Error handling

### SignUpModern

The SignUpModern component provides a form for users to create a new account. It includes:

- First name, last name, and second last name input fields
- Email input field
- Password and confirm password input fields
- Create account button
- Cancel button
- Sign in link
- Form validation
- Loading state
- Error handling

### ForgotPasswordModern

The ForgotPasswordModern component provides a form for users to reset their password. It includes:

- Email input field
- Send reset link button
- Cancel button
- Sign in link
- Success message
- Loading state
- Error handling

### VerifyEmailModern

The VerifyEmailModern component provides a page for users to verify their email address. It includes:

- Information about the verification process
- Resend verification email button
- Sign out button
- Sign in link
- Success message
- Loading state
- Error handling

### ProtectedRoute

The ProtectedRoute component protects routes that require authentication. It redirects users to the sign in page if they are not authenticated. It also supports requiring email verification for certain routes.

## Notification System

The notification system provides a way to display notifications to users. It includes:

- Notification hook (`useNotification.ts`): A custom hook that provides methods for showing notifications.
- Notification component (`NotificationModern.tsx`): A component that displays notifications.
- Notification actions and reducer: Redux actions and reducer for managing notifications.

## Redux Integration

The authentication system integrates with Redux for state management. It includes:

- User actions (`userActions.ts`): Actions for user state management.
- User reducer (`userReducer.ts`): Reducer for user state management.
- Notification actions (`notificationActions.ts`): Actions for notification state management.
- Notification reducer (`notificationReducer.ts`): Reducer for notification state management.

## Testing

The authentication system includes tests for the authentication components:

- SignInModern tests: Tests for the sign in component.
- SignUpModern tests: Tests for the sign up component.

## Usage

### Protected Routes

To protect a route that requires authentication:

```tsx
import { Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

To protect a route that requires email verification:

```tsx
<Route
  path="/courses"
  element={
    <ProtectedRoute requireVerified={true}>
      <Courses />
    </ProtectedRoute>
  }
/>
```

### Authentication Context

To use the authentication context in a component:

```tsx
import { useAuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuthContext();
  
  // Use authentication state and methods
};
```

### Authentication Hook

To use the authentication hook directly in a component:

```tsx
import { useAuth } from '../hooks/useAuth';

const SignIn = () => {
  const { signIn } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };
};
```

### Notification Hook

To use the notification hook in a component:

```tsx
import { useNotification } from '../hooks/useNotification';

const ProfilePage = () => {
  const { showSuccess, showError } = useNotification();
  
  const handleSave = async () => {
    try {
      await saveProfile();
      showSuccess('Profile saved successfully');
    } catch (error) {
      showError('Failed to save profile');
    }
  };
};
```

## Conclusion

The modern authentication system provides a secure and user-friendly way for users to authenticate with the Hypatia LMS. It follows modern React patterns with hooks and TypeScript, and integrates with Firebase Authentication for secure authentication.
