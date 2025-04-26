# VerifyEmailModern Component Documentation

## Introduction
Modern email verification component handling resend logic and authentication state management. Connects to AuthContext for user state.

## Props
N/A (Container component using context)

## Features
- Resend verification email
- Automatic redirects based on auth state
- Loading states and error handling
- Sign out capability

## Accessibility
- Semantic HTML structure
- ARIA live regions for loading states
- Color contrast compliant success/error messages (WCAG 2.1 AA compliant)
- Keyboard navigation support for all interactive elements
- Screen reader announcements for state changes

## Usage
```jsx:Usage Example
import VerifyEmailModern from '../../components/auth/VerifyEmailModern';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/verify-email" element={
        <AuthLayout>
          <VerifyEmailModern />
        </AuthLayout>
      } />
    </Routes>
  );
}
```

## Technical Debt
- Tracking in [Authentication Implementation](/technical-debt/Authentication_Implementation.md#verify-email)
- See detailed report: [VerifyEmailModern Technical Debt](/technical-debt/VerifyEmailModern_Technical_Debt.md)

## Edge Cases
- Expired verification links handled via auth service
- Network errors during email resend
- Concurrent verification attempts
- Browser autocomplete interfering with email display

## Implementation Details
**Key Functions:**
- `handleResendEmail`: Manages email resend logic with loading states
- Auth context integration for user state management
- Automatic redirects based on verification status

## Related Components
- [SignInModern](/auth/SignInModern.md)
- [SignUpModern](/auth/SignUpModern.md)
- [AuthLayout](/layouts/AuthLayout.md)

## Interactive Examples

```storybook
// Storybook embed
<iframe src="https://hypatia-storybook.example.com/iframe.html?id=authentication-verifyemailmodern--default"
  title="Verify Email Component Storybook"
  width="100%"
  height="400px"
/>
```

[View full Storybook](https://hypatia-storybook.example.com/?path=/story/authentication-verifyemailmodern--default)

## Version Compatibility
| Hypatia LMS | React | Auth Service | Router |
|-------------|-------|--------------|--------|
| 2.4+       | 18+   | Auth0 v2.1+  | v6.4+  |

**Dependencies:**
- [AuthContext](/contexts/AuthContext.tsx)
- [NotificationService](/services/NotificationService.ts)