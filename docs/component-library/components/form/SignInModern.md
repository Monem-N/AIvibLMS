# SignInModern

The SignInModern component is used in the Hypatia LMS for user authentication, allowing users to sign in to the platform with their email and password.

## Description

The SignInModern component provides a clean, modern sign-in form that handles user authentication in the Hypatia Learning Management System. It is a functional component built with React hooks that manages form state, validation, and submission. The component includes email and password inputs, a submit button, a cancel button, and links for password recovery and account creation. It integrates with the authentication system through custom hooks and provides visual feedback during the authentication process.

## Visual Examples

### Standard Sign-In Form

<!-- Note: Replace with actual screenshot when available -->
![Standard Sign-In Form](https://via.placeholder.com/800x500?text=Standard+Sign-In+Form)

The standard sign-in form with email and password fields

### Sign-In Form with Validation Error

<!-- Note: Replace with actual screenshot when available -->
![Sign-In Form with Validation Error](https://via.placeholder.com/800x500?text=Sign-In+Form+with+Validation+Error)

Sign-in form showing validation error message

### Sign-In Form in Loading State

<!-- Note: Replace with actual screenshot when available -->
![Sign-In Form in Loading State](https://via.placeholder.com/800x500?text=Sign-In+Form+in+Loading+State)

Sign-in form during submission with disabled inputs and loading indicator

## Import

```tsx
import SignInModern from 'components/auth/SignInModern';
```

## Usage

```tsx
import SignInModern from 'components/auth/SignInModern';

// Basic usage
<SignInModern />

// With callbacks
<SignInModern
  onSuccess={() => console.log('Sign in successful')}
  onCancel={() => console.log('Sign in cancelled')}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| onSuccess | () => void | - | No | Callback function called after successful sign-in |
| onCancel | () => void | - | No | Callback function called when the cancel button is clicked |

## Type Definitions

```tsx
/**
 * SignInProps Interface
 * Defines the props for the SignInModern component
 */
interface SignInProps {
  /**
   * Callback function called after successful sign-in
   */
  onSuccess?: () => void;

  /**
   * Callback function called when the cancel button is clicked
   */
  onCancel?: () => void;
}

/**
 * From useAuth hook
 */
interface AuthHookReturn {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, userInfo: UserInfo) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateProfile: (userInfo: Partial<UserInfo>) => Promise<void>;
  isAuthenticated: () => boolean;
  isVerified: () => boolean;
}

/**
 * From useNotification hook
 */
interface NotificationHookReturn {
  showNotification: (notification: Omit<Notification, 'id' | 'visible'>, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
}
```

## Examples

### Basic Example

```tsx
import SignInModern from 'components/auth/SignInModern';

// Basic usage with no callbacks
const SignInPage = () => {
  return (
    <div className="page-container">
      <SignInModern />
    </div>
  );
};
```

### Advanced Example

```tsx
import { useNavigate } from 'react-router-dom';
import SignInModern from 'components/auth/SignInModern';

// With navigation after successful sign-in
const SignInPage = () => {
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    // Redirect to dashboard after successful sign-in
    navigate('/dashboard');
  };

  const handleCancel = () => {
    // Redirect to home page when cancelled
    navigate('/');
  };

  return (
    <div className="page-container">
      <SignInModern
        onSuccess={handleSignInSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};
```

### Example with Context

```tsx
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import SignInModern from 'components/auth/SignInModern';
import { NotificationProvider } from '../contexts/NotificationContext';

// With required context providers
const SignInWithProviders = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NotificationProvider>
          <SignInModern />
        </NotificationProvider>
      </BrowserRouter>
    </Provider>
  );
};
```

## Features

1. **Form State Management**: Uses React hooks (useState) to manage form input values and submission state
2. **Form Validation**: Validates that both email and password fields are filled before submission
3. **Loading State**: Disables form inputs and changes button text during form submission
4. **Error Handling**: Displays error notifications for validation errors and authentication failures
5. **Success Callback**: Calls the onSuccess callback function after successful authentication
6. **Cancel Functionality**: Provides a cancel button that clears the form and calls the onCancel callback
7. **Password Recovery**: Includes a "Forgot password?" link for password recovery
8. **Account Creation**: Includes a "Sign up" link for new user registration
9. **Responsive Design**: Adapts to different screen sizes with responsive styling
10. **Accessibility Support**: Includes proper form labeling and ARIA attributes for accessibility

## Accessibility

The SignInModern component is designed with accessibility in mind to ensure all users, including those with disabilities, can successfully authenticate.

### Keyboard Navigation

- All form inputs and buttons are keyboard accessible
- Tab order follows the logical flow of the form (email → password → sign in button → cancel button → forgot password link → sign up link)
- Form can be submitted using the Enter key when focused on any input
- Buttons can be activated using the Enter or Space key
- Links can be activated using the Enter key

### Screen Reader Support

- The form has a `role="form"` attribute to identify it as a form to screen readers
- All form inputs have associated labels for screen reader identification
- Required inputs have the `required` attribute for screen reader announcement
- Button text changes from "Sign in" to "Signing in..." during submission to indicate loading state to screen readers
- Error messages are announced to screen readers through the notification system

### ARIA Attributes

- Form inputs use standard HTML attributes (`required`, `disabled`) which are automatically translated to ARIA attributes
- The form has a `role="form"` attribute to identify it as a form
- Disabled inputs and buttons have the `disabled` attribute which is automatically translated to `aria-disabled="true"`
- Error notifications use `role="alert"` to announce errors to screen readers

### Color Contrast

- Text elements have sufficient contrast with their backgrounds (meeting WCAG AA standards)
- Form inputs have visible borders to distinguish them from the background
- Buttons use colors with sufficient contrast for both text and background
- Error messages use colors that meet contrast requirements
- Focus indicators are visible with high contrast

### Focus Management

- All interactive elements have visible focus indicators
- Focus is properly managed during form submission
- After successful submission, focus can be managed by the consuming component through the onSuccess callback
- After cancellation, focus can be managed by the consuming component through the onCancel callback

## Edge Cases

- **Empty Form Submission**: Validates both fields and shows an error message if either is empty
- **Invalid Credentials**: Displays an error notification when authentication fails due to invalid credentials
- **Network Errors**: Handles network errors during authentication and displays appropriate error messages
- **Multiple Submissions**: Prevents multiple submissions by disabling the form during the authentication process
- **Successful Authentication**: Clears the form, calls the onSuccess callback, and resets the submission state
- **Cancellation**: Clears the form, calls the onCancel callback, and resets the form state
- **Long Email/Password**: Handles long input values with proper text overflow handling
- **Mobile Devices**: Adapts layout for smaller screens, stacking buttons vertically
- **Keyboard Navigation**: Ensures proper tab order and keyboard accessibility for all interactive elements

## Implementation Details

The SignInModern component is implemented using React with TypeScript. It uses React hooks for state management and custom hooks for authentication and notifications.

```tsx
// Simplified implementation
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

// Import CSS
import './SignIn.css';

interface SignInProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SignInModern: React.FC<SignInProps> = ({ onSuccess, onCancel }) => {
  // State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Hooks
  const { signIn } = useAuth();
  const { showError } = useNotification();

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!email || !password) {
      showError('Please enter both email and password');
      return;
    }

    // Submit form
    setIsSubmitting(true);

    try {
      await signIn(email, password);

      // Clear form
      setEmail('');
      setPassword('');

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Error is handled by useAuth hook
      console.error('Sign in error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Clear form
    setEmail('');
    setPassword('');

    // Call cancel callback
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="auth-container signin-container">
      <h2 className="auth-title">Sign In</h2>

      <form className="auth-form signin-form" onSubmit={handleSubmit} role="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>

        <div className="form-links">
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot password?
          </Link>

          <div className="signup-link">
            Don't have an account?{' '}
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInModern;
```

### CSS Implementation

```css
/* Simplified SignIn Component Styles */

.signin-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

.btn-primary:hover {
  background-color: #3a80d2;
}

.btn-primary:disabled {
  background-color: #a0c3e8;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e5e5e5;
}

.btn-secondary:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.form-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.forgot-password-link {
  color: #4a90e2;
  text-decoration: none;
}

.signup-link {
  text-align: center;
  color: #666;
}

.signup-link a {
  color: #4a90e2;
  text-decoration: none;
}

/* Responsive styles */
@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
```

## Related Components

- [SignUpModern](./SignUpModern.md): Companion component for new user registration
- [ForgotPasswordModern](./ForgotPasswordModern.md): Component for password recovery
- [ResetPasswordModern](./ResetPasswordModern.md): Component for resetting password
- [AuthLayout](../layout/AuthLayout.md): Layout component that wraps authentication components
- [Button](../ui/Button.md): Button component used within the form
- [FormInput](../form/FormInput.md): Input component that could be used to refactor this component

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/form-signinmodern--default).

The Storybook examples demonstrate:

- Default sign-in form
- Form with validation errors
- Form in loading state
- Form with success callback
- Form with cancel callback
- Responsive layout

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic sign-in functionality |
| 1.1.0 | Added form validation |
| 1.2.0 | Added loading state |
| 1.3.0 | Added responsive layout |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements |
| 2.2.0 | Added integration with notification system |

## Technical Debt

The SignInModern component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Direct DOM Manipulation | Uses direct DOM manipulation for form handling instead of a form library | Makes form validation and handling more complex | Consider using a form library like Formik or React Hook Form | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Error Handling | Error messages are not directly associated with form fields | Reduces accessibility for screen reader users | Associate error messages with specific form fields using aria-describedby | High |
| A-002 | Form Validation | Client-side validation messages are not announced to screen readers | Users with screen readers may not be aware of validation errors | Add aria-live regions for validation messages | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Form Library Integration | Replace manual form handling with a form library | Improves maintainability and reduces code complexity | Medium | Medium |
| RFO-002 | Component Composition | Break down into smaller, reusable components | Improves maintainability and reusability | Medium | Medium |

For a complete technical debt analysis, see the [SignInModern Technical Debt Report](../technical-debt/SignInModern-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [SignInModern Version Compatibility Matrix](./SignInModern-version-compatibility.md)
