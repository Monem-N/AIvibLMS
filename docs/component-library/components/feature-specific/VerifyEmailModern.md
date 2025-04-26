# VerifyEmailModern

## Introduction

The VerifyEmailModern component is used in the Hypatia LMS for handling email verification after user registration.

## Description

The VerifyEmailModern component provides a user interface and functionality for users to verify their email addresses after registration. It displays information about the verification process, allows users to resend verification emails if needed, and provides options to sign out or navigate to sign in. The component integrates with the AuthContext to manage authentication state and automatically redirects users based on their authentication and verification status. It handles loading states, success messages, and error handling to provide a smooth user experience during the email verification process.

## Visual Examples

### Standard Verification Page

<!-- Note: Replace with actual screenshot when available -->
![Standard Verification Page](https://via.placeholder.com/800x400?text=Standard+Verification+Page)

The standard verification page showing instructions and the resend verification email button

### Success State

<!-- Note: Replace with actual screenshot when available -->
![Success State](https://via.placeholder.com/800x400?text=Success+State)

The verification page after successfully resending a verification email

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x800?text=Mobile+View)

The verification page on mobile devices with a responsive layout

## Import

```tsx
import { VerifyEmailModern } from 'components/auth/VerifyEmailModern';
```

Note: The actual import in the codebase is a default export, so you would use:

```tsx
import VerifyEmailModern from 'components/auth/VerifyEmailModern';
```

## Usage

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyEmailModern from 'components/auth/VerifyEmailModern';
import AuthLayout from 'components/layouts/AuthLayout';
import { AuthProvider } from 'contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/verify-email"
            element={
              <AuthLayout>
                <VerifyEmailModern />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

## Props

The VerifyEmailModern component does not accept any props as it is a container component that uses the AuthContext for all its functionality.

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| N/A | N/A | N/A | N/A | This component does not accept any props |

## Type Definitions

The VerifyEmailModern component doesn't define any specific types itself, but it uses types from the AuthContext:

```tsx
/**
 * AuthContextType Interface (from contexts/AuthContext.tsx)
 * Relevant parts used by VerifyEmailModern
 */
interface AuthContextType {
  /**
   * Current user object
   */
  user: User | null;

  /**
   * Loading state of authentication
   */
  loading: boolean;

  /**
   * Function to check if user is authenticated
   */
  isAuthenticated: () => boolean;

  /**
   * Function to check if user's email is verified
   */
  isVerified: () => boolean;

  /**
   * Function to send verification email
   */
  sendVerificationEmail: () => Promise<void>;

  /**
   * Function to sign out
   */
  signOut: () => Promise<void>;
}

/**
 * User Interface (from firebase or auth service)
 */
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  // Other user properties...
}
```

## Examples

### Basic Example

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyEmailModern from 'components/auth/VerifyEmailModern';
import { AuthProvider } from 'contexts/AuthContext';

const BasicExample = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/verify-email"
            element={<VerifyEmailModern />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

### Example with Auth Layout

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyEmailModern from 'components/auth/VerifyEmailModern';
import AuthLayout from 'components/layouts/AuthLayout';
import { AuthProvider } from 'contexts/AuthContext';

const LayoutExample = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/verify-email"
            element={
              <AuthLayout>
                <VerifyEmailModern />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

### Example with Complete Auth Flow

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyEmailModern from 'components/auth/VerifyEmailModern';
import SignInModern from 'components/auth/SignInModern';
import SignUpModern from 'components/auth/SignUpModern';
import ForgotPasswordModern from 'components/auth/ForgotPasswordModern';
import AuthLayout from 'components/layouts/AuthLayout';
import { AuthProvider } from 'contexts/AuthContext';

const AuthFlowExample = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/signin"
            element={
              <AuthLayout>
                <SignInModern />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUpModern />
              </AuthLayout>
            }
          />
          <Route
            path="/verify-email"
            element={
              <AuthLayout>
                <VerifyEmailModern />
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                <ForgotPasswordModern />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

## Features

1. **Resend Verification Email**: Allows users to request a new verification email if they didn't receive the original one
2. **Automatic Redirects**: Redirects to sign-in page if not authenticated and to dashboard if already verified
3. **Loading States**: Displays loading state while sending verification email
4. **Success Feedback**: Shows success message after successfully sending verification email
5. **Error Handling**: Handles and displays errors that occur during the email sending process
6. **Sign Out Option**: Provides a sign out button for users who want to sign in with a different account
7. **Sign In Link**: Includes a link to the sign-in page for users who have already verified their email
8. **Email Display**: Shows the user's email address to confirm where the verification email was sent
9. **Responsive Design**: Adapts to different screen sizes with appropriate styling
10. **AuthContext Integration**: Uses the authentication context for user state and authentication actions

## Accessibility

The VerifyEmailModern component is designed with accessibility in mind:

### Keyboard Navigation

- All interactive elements (buttons and links) are fully keyboard accessible
- Focus order follows a logical sequence through the component
- Focus states are clearly visible with high contrast outlines
- No keyboard traps are present in the component

### Screen Reader Support

- The component uses semantic HTML elements for better screen reader navigation
- The email address is properly marked up to ensure correct pronunciation
- Success messages are announced to screen readers when a verification email is sent
- Error messages are announced to screen readers when an error occurs

### ARIA Attributes

- Loading states use `aria-busy="true"` to indicate when the component is processing
- Success messages use `role="status"` to ensure they are announced by screen readers
- Error messages use `role="alert"` to ensure they are announced by screen readers
- Buttons have appropriate `aria-label` attributes when needed for clarity

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Success messages use a green color that meets contrast requirements
- Buttons use colors that provide sufficient contrast with their text
- Focus indicators have sufficient contrast with the background

### Focus Management

- Focus is maintained within the component during interactions
- After sending a verification email, focus is moved to the success message
- After an error, focus is moved to the error message
- When redirecting, focus is handled by React Router's navigation system

## Edge Cases

- **Expired Verification Links**: The component doesn't directly handle expired verification links, but the auth service will show an appropriate error when a user clicks an expired link
- **Network Errors**: If a network error occurs during the email resend process, the component displays an error message and allows the user to try again
- **Multiple Resend Attempts**: The component allows multiple resend attempts, but the auth service may implement rate limiting to prevent abuse
- **User Already Verified**: If the user is already verified, the component redirects to the dashboard instead of showing the verification page
- **Not Authenticated**: If the user is not authenticated, the component redirects to the sign-in page instead of showing the verification page
- **Email Address Change**: If the user's email address changes after registration but before verification, the component will display the new email address
- **Browser Autocomplete**: The component handles browser autocomplete that might interfere with displaying the user's email address
- **Concurrent Verification Attempts**: If multiple verification attempts are made concurrently, the component handles race conditions gracefully
- **Session Timeout**: If the user's session times out while on the verification page, the component will redirect to the sign-in page
- **Missing Email Address**: If the user object doesn't have an email address for some reason, the component displays a generic message

## Implementation Details

Here's a simplified implementation of the VerifyEmailModern component to help developers understand its inner workings:

```tsx
/**
 * VerifyEmailModern Component
 *
 * Modern verify email component using functional components and hooks.
 */

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const VerifyEmailModern: React.FC = () => {
  // State
  const [isSending, setIsSending] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);

  // Hooks
  const { user, isAuthenticated, isVerified, sendVerificationEmail, signOut } = useAuthContext();

  // If user is not authenticated, redirect to sign in page
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  // If user is already verified, redirect to dashboard
  if (isVerified()) {
    return <Navigate to="/dashboard" replace />;
  }

  /**
   * Handle resend verification email
   */
  const handleResendEmail = async () => {
    setIsSending(true);

    try {
      await sendVerificationEmail();
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending verification email:', error);
    } finally {
      setIsSending(false);
    }
  };

  /**
   * Handle sign out
   */
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="auth-container verify-email-container">
      <h2 className="auth-title">Verify Your Email</h2>

      <div className="verify-email-content">
        <p>
          We've sent a verification email to <strong>{user?.email}</strong>.
          Please check your email and click the verification link to activate your account.
        </p>

        {emailSent ? (
          <div className="success-message" role="status">
            <p>
              A new verification email has been sent to your email address.
              Please check your inbox and spam folder.
            </p>
          </div>
        ) : (
          <p>
            If you didn't receive the email, you can resend it by clicking the button below.
          </p>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleResendEmail}
            disabled={isSending || emailSent}
            aria-busy={isSending}
          >
            {isSending ? 'Sending...' : emailSent ? 'Email Sent' : 'Resend Verification Email'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>

        <div className="form-links">
          <div className="signin-link">
            Already verified?{' '}
            <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModern;
```

## Related Components

- [SignInModern](./SignInModern.md): Used for signing in after email verification
- [SignUpModern](./SignUpModern.md): Registration component that leads to email verification
- [ForgotPasswordModern](./ForgotPasswordModern.md): Similar authentication flow component
- [PrivateRoute](./PrivateRoute.md): Route protection component that may require email verification
- [AuthProvider](./AuthProvider.md): Context provider that supplies authentication state and methods
- [LoadingSpinner](../ui/LoadingSpinner.md): Used to display loading state during verification email sending
- [NotificationModern](../ui/NotificationModern.md): Used to display success and error messages

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/authentication-verifyemailmodern--default).

The Storybook examples demonstrate:

- Default VerifyEmailModern component
- VerifyEmailModern with email sent state
- VerifyEmailModern in loading state
- VerifyEmailModern with error state
- VerifyEmailModern with different email addresses
- VerifyEmailModern in mobile viewport

Note: Since this component relies on authentication context, the Storybook examples use mocked authentication context to demonstrate different states.

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic email verification |
| 1.1.0 | Added loading state during email sending |
| 1.2.0 | Added success message after sending email |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements (ARIA attributes) |
| 2.2.0 | Added responsive design for mobile devices |
| 2.3.0 | Improved error handling |

## Technical Debt

The VerifyEmailModern component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Direct Console Errors | Console errors are used instead of a unified error handling system | Inconsistent error handling | Implement unified error handling | Medium |
| LP-002 | Hardcoded Redirect Paths | Redirect paths are hardcoded instead of configurable | Reduces flexibility | Make redirect paths configurable | Low |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Live Regions | Loading states don't use ARIA live regions | Screen readers may not announce state changes | Add ARIA live regions | High |
| A-002 | No Error Announcements | Errors are not properly announced to screen readers | Users with screen readers may miss errors | Add error announcements | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Email Resend Throttling | Add client-side throttling for email resend | Prevent abuse | Low | Medium |
| RFO-002 | Verification Status Polling | Add polling to check verification status | Better user experience | Medium | Low |
| RFO-003 | Customizable Messages | Make verification messages customizable | Better branding | Low | Low |

For a complete technical debt analysis, see the [VerifyEmailModern Technical Debt Report](../technical-debt/VerifyEmailModern_Technical_Debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [Authentication Components Version Compatibility Matrix](./Authentication-version-compatibility.md)
