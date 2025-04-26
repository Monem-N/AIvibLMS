# SignUpModern

The SignUpModern component is used in the Hypatia LMS for user registration, allowing new users to create accounts with their personal information.

## Description

The SignUpModern component provides a comprehensive registration form that handles user account creation in the Hypatia Learning Management System. It is a functional component built with React hooks that manages form state, validation, and submission. The component includes fields for first name, last name, optional second last name, email, password, and password confirmation. It performs client-side validation, displays error messages, and integrates with the authentication system through custom hooks. The component provides visual feedback during the registration process and includes a link to the sign-in page for existing users.

## Visual Examples

### Standard Sign-Up Form

<!-- Note: Replace with actual screenshot when available -->
![Standard Sign-Up Form](https://via.placeholder.com/800x500?text=Standard+Sign-Up+Form)

The standard sign-up form with all required fields

### Sign-Up Form with Validation Errors

<!-- Note: Replace with actual screenshot when available -->
![Sign-Up Form with Validation Errors](https://via.placeholder.com/800x500?text=Sign-Up+Form+with+Validation+Errors)

Sign-up form showing validation error messages

### Sign-Up Form in Loading State

<!-- Note: Replace with actual screenshot when available -->
![Sign-Up Form in Loading State](https://via.placeholder.com/800x500?text=Sign-Up+Form+in+Loading+State)

Sign-up form during submission with disabled inputs and loading indicator

## Import

```tsx
import SignUpModern from 'components/auth/SignUpModern';
```

## Usage

```tsx
import SignUpModern from 'components/auth/SignUpModern';

// Basic usage
<SignUpModern />

// With callbacks
<SignUpModern
  onSuccess={() => console.log('Sign up successful')}
  onCancel={() => console.log('Sign up cancelled')}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| onSuccess | () => void | - | No | Callback function called after successful registration |
| onCancel | () => void | - | No | Callback function called when the cancel button is clicked |

## Type Definitions

```tsx
/**
 * SignUpProps Interface
 * Defines the props for the SignUpModern component
 */
interface SignUpProps {
  /**
   * Callback function called after successful registration
   */
  onSuccess?: () => void;

  /**
   * Callback function called when the cancel button is clicked
   */
  onCancel?: () => void;
}

/**
 * Form Data Interface (internal to the component)
 */
interface FormData {
  firstName: string;
  lastName1: string;
  lastName2: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * UserInfo Interface (from types/user.ts)
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
import SignUpModern from 'components/auth/SignUpModern';

// Basic usage with no callbacks
const SignUpPage = () => {
  return (
    <div className="page-container">
      <SignUpModern />
    </div>
  );
};
```

### Advanced Example

```tsx
import { useNavigate } from 'react-router-dom';
import SignUpModern from 'components/auth/SignUpModern';

// With navigation after successful registration
const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    // Redirect to verification page after successful registration
    navigate('/verify-email');
  };

  const handleCancel = () => {
    // Redirect to home page when cancelled
    navigate('/');
  };

  return (
    <div className="page-container">
      <SignUpModern
        onSuccess={handleSignUpSuccess}
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
import SignUpModern from 'components/auth/SignUpModern';
import { NotificationProvider } from '../contexts/NotificationContext';

// With required context providers
const SignUpWithProviders = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NotificationProvider>
          <SignUpModern />
        </NotificationProvider>
      </BrowserRouter>
    </Provider>
  );
};
```

## Features

1. **Form State Management**: Uses React hooks (useState) to manage form input values and submission state
2. **Form Validation**: Validates all required fields and performs password matching validation
3. **Loading State**: Disables form inputs and changes button text during form submission
4. **Error Handling**: Displays error notifications for validation errors and registration failures
5. **Success Callback**: Calls the onSuccess callback function after successful registration
6. **Cancel Functionality**: Provides a cancel button that clears the form and calls the onCancel callback
7. **Sign-In Link**: Includes a "Sign in" link for existing users to navigate to the sign-in page
8. **Optional Fields**: Supports optional fields (second last name) with proper validation
9. **Responsive Design**: Adapts to different screen sizes with responsive styling
10. **Accessibility Support**: Includes proper form labeling and ARIA attributes for accessibility

## Accessibility

The SignUpModern component is designed with accessibility in mind to ensure all users, including those with disabilities, can successfully register for an account.

### Keyboard Navigation

- All form inputs and buttons are keyboard accessible
- Tab order follows the logical flow of the form (first name → last name 1 → last name 2 → email → password → confirm password → sign up button → cancel button → sign in link)
- Form can be submitted using the Enter key when focused on any input
- Buttons can be activated using the Enter or Space key
- Links can be activated using the Enter key

### Screen Reader Support

- The form has a `role="form"` attribute to identify it as a form to screen readers
- All form inputs have associated labels for screen reader identification
- Required inputs have the `required` attribute for screen reader announcement
- Button text changes from "Sign up" to "Signing up..." during submission to indicate loading state to screen readers
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

- **Empty Form Submission**: Validates all required fields and shows error messages if any are empty
- **Password Mismatch**: Validates that password and confirm password fields match and shows an error if they don't
- **Email Format**: Validates email format and shows an error for invalid email addresses
- **Existing Email**: Handles registration failures due to existing email addresses and displays appropriate error messages
- **Network Errors**: Handles network errors during registration and displays appropriate error messages
- **Multiple Submissions**: Prevents multiple submissions by disabling the form during the registration process
- **Successful Registration**: Clears the form, calls the onSuccess callback, and resets the submission state
- **Cancellation**: Clears the form, calls the onCancel callback, and resets the form state
- **Long Input Values**: Handles long input values with proper text overflow handling
- **Mobile Devices**: Adapts layout for smaller screens, stacking buttons vertically

## Implementation Details

The SignUpModern component is implemented using React with TypeScript. It uses React hooks for state management and custom hooks for authentication and notifications.

```tsx
// Simplified implementation
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { UserInfo } from '../../types/user';

// Import CSS
import './SignUp.css';

interface SignUpProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  firstName: string;
  lastName1: string;
  lastName2: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpModern: React.FC<SignUpProps> = ({ onSuccess, onCancel }) => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName1: '',
    lastName2: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Hooks
  const { signUp } = useAuth();
  const { showError, showSuccess } = useNotification();

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.firstName) {
      showError('First name is required');
      return false;
    }

    if (!formData.lastName1) {
      showError('Last name is required');
      return false;
    }

    if (!formData.email) {
      showError('Email is required');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Please enter a valid email address');
      return false;
    }

    if (!formData.password) {
      showError('Password is required');
      return false;
    }

    if (!formData.confirmPassword) {
      showError('Please confirm your password');
      return false;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Submit form
    setIsSubmitting(true);

    try {
      // Create user info object
      const userInfo: UserInfo = {
        firstName: formData.firstName,
        lastName1: formData.lastName1,
        lastName2: formData.lastName2 || undefined,
        displayName: `${formData.firstName} ${formData.lastName1}`,
        level: 1 // Default level for new users
      };

      // Register user
      await signUp(formData.email, formData.password, userInfo);

      // Show success message
      showSuccess('Account created successfully! Please check your email to verify your account.');

      // Clear form
      setFormData({
        firstName: '',
        lastName1: '',
        lastName2: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Error is handled by useAuth hook
      console.error('Sign up error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Clear form
    setFormData({
      firstName: '',
      lastName1: '',
      lastName2: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    // Call cancel callback
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="auth-container signup-container">
      <h2 className="auth-title">Create Account</h2>

      <form className="auth-form signup-form" onSubmit={handleSubmit} role="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName1">Last Name</label>
            <input
              type="text"
              id="lastName1"
              name="lastName1"
              value={formData.lastName1}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lastName2">Second Last Name (Optional)</label>
          <input
            type="text"
            id="lastName2"
            name="lastName2"
            value={formData.lastName2}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
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
          <div className="signin-link">
            Already have an account?{' '}
            <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpModern;
```

### CSS Implementation

```css
/* Simplified SignUp Component Styles */

.signup-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
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

.signin-link {
  text-align: center;
  color: #666;
}

.signin-link a {
  color: #4a90e2;
  text-decoration: none;
}

/* Responsive styles */
@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
```

## Related Components

- [SignInModern](./SignInModern.md): Companion component for user authentication
- [ForgotPasswordModern](./ForgotPasswordModern.md): Component for password recovery
- [VerifyEmailModern](./VerifyEmailModern.md): Component for email verification after registration
- [AuthLayout](../layout/AuthLayout.md): Layout component that wraps authentication components
- [Button](../ui/Button.md): Button component used within the form
- [FormInput](../form/FormInput.md): Input component that could be used to refactor this component

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/form-signupmodern--default).

The Storybook examples demonstrate:

- Default sign-up form
- Form with validation errors
- Form in loading state
- Form with success callback
- Form with cancel callback
- Responsive layout

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic registration functionality |
| 1.1.0 | Added form validation |
| 1.2.0 | Added loading state |
| 1.3.0 | Added responsive layout |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements |
| 2.2.0 | Added integration with notification system |

## Technical Debt

The SignUpModern component has a few technical debt issues that should be addressed in future releases:

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

For a complete technical debt analysis, see the [SignUpModern Technical Debt Report](../technical-debt/SignUpModern-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [SignUpModern Version Compatibility Matrix](./SignUpModern-version-compatibility.md)
