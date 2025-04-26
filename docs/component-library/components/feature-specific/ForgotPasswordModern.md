# ForgotPasswordModern

The ForgotPasswordModern component is used in the Hypatia LMS for allowing users to reset their forgotten passwords.

## Description

The ForgotPasswordModern component provides a user interface and functionality for users to initiate the password reset process. It allows users to enter their email address, which triggers a password reset email to be sent via the `useAuth` hook. The component handles the submission state and displays a success message upon successful submission. It is used in the authentication flow of the application and supports email input, submission handling, and success message display.

## Usage

```tsx
import ForgotPasswordModern from 'hypatia-modern/src/components/auth/ForgotPasswordModern';

<ForgotPasswordModern onSuccess={() => console.log('Password reset email sent')} onCancel={() => console.log('Password reset cancelled')} />
```

## Props

| Prop      | Type         | Default | Required | Description                                  |
|-----------|--------------|---------|----------|----------------------------------------------|
| onSuccess | `() => void` | `-`     | No       | Callback function executed on successful submission |
| onCancel  | `() => void` | `-`     | No       | Callback function executed when cancelled    |

## Type Definitions

```tsx
interface ForgotPasswordProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}
```

## Examples

### Basic Example

```tsx
<ForgotPasswordModern />
```

### Example with Callbacks

```tsx
<ForgotPasswordModern 
  onSuccess={() => alert('Password reset email sent!')} 
  onCancel={() => alert('Password reset cancelled.')} 
/>
```

### Success State Example

```tsx
// This example demonstrates the component's appearance after a successful submission.
// In a real application, the 'isSubmitted' state would be managed internally.
<ForgotPasswordModern /> 
// Assume isSubmitted is true internally, showing the success message.
```

## Features

1.  **Password Reset Initiation**: Allows users to request a password reset email by providing their email address.
2.  **Form Validation**: Basic validation to ensure an email address is entered before submission.
3.  **Loading State**: Disables the submit button while the password reset request is being processed.
4.  **Success Message Display**: Shows a confirmation message with instructions after a successful password reset email is sent.
5.  **Callback Support**: Provides `onSuccess` and `onCancel` props for integrating with parent components or navigation.
6.  **Navigation Links**: Includes links to the Sign In page.

## Accessibility

-   **Keyboard Navigation**: All interactive elements (input field, buttons, links) should be navigable using a keyboard. Ensure a logical tab order.
-   **Screen Reader Support**: Use semantic HTML elements and appropriate ARIA attributes (e.g., `role="form"`) to convey the purpose and state of elements to screen readers. Labels are associated with input fields using the `htmlFor` attribute.
-   **Color Contrast**: Ensure sufficient color contrast between text and background for readability.
-   **Focus Management**: Manage focus appropriately, especially after form submission or state changes.

## Edge Cases

-   **Invalid Email Format**: The component relies on the browser's built-in email input validation and the backend service for more robust validation. The component itself only checks for an empty input field before attempting submission.
-   **Email Not Found**: If the entered email address does not correspond to an existing user account, the `useAuth` hook's `resetPassword` function will handle this scenario, typically by not sending an email and potentially indicating an error through the notification system.
-   **Network Errors**: If a network issue occurs during the password reset request, the `handleSubmit` function's error handling will catch it. The `useAuth` and `useNotification` hooks are responsible for displaying an appropriate error message to the user.
-   **Rate Limiting**: The backend authentication service may implement rate limiting on password reset requests to prevent abuse. If a user exceeds this limit, the service will return an error, which will be handled by the component's error handling mechanism, resulting in an error notification.

## Implementation Details

```tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

interface ForgotPasswordProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ForgotPasswordModern: React.FC<ForgotPasswordProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { resetPassword } = useAuth();
  const { showError } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      showError('Please enter your email address');
      return;
    }
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setIsSubmitted(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="auth-container forgot-password-container">
        <h2 className="auth-title">Reset Password</h2>
        <div className="success-message">
          <p>We've sent a password reset link to <strong>{email}</strong>.</p>
          <p>If you don't receive the email within a few minutes, please check your spam folder.</p>
          <div className="form-actions">
            <button type="button" className="btn btn-primary" onClick={handleTryAgain}>Try Again</button>
            <Link to="/signin" className="btn btn-secondary">Back to Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container forgot-password-container">
      <h2 className="auth-title">Reset Password</h2>
      <p className="auth-description">Enter your email address and we'll send you a link to reset your password.</p>
      <form className="auth-form forgot-password-form" onSubmit={handleSubmit} role="form">
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
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
        <div className="form-links">
          <div className="signin-link">
            Remember your password?{' '}
            <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordModern;
```

## Related Components

-   [SignInModern](../feature-specific/SignInModern.md): The sign-in component, often linked from the forgot password page.
-   [SignUpModern](../feature-specific/SignUpModern.md): The sign-up component, part of the authentication flow.
-   [useAuth](../../../hooks/useAuth.md): The hook providing the `resetPassword` functionality used by this component.
-   [useNotification](../../../hooks/useNotification.md): The hook used for displaying error notifications and success messages.

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/authentication-forgotpasswordmodern--basic).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0   | Initial implementation of ForgotPasswordModern component. |
