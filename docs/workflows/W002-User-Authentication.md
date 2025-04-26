# User Workflow: User Authentication

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | User Authentication |
| **Workflow ID** | W002 |
| **User Role(s)** | All Users |
| **Related Features** | User Authentication (F001), User Profiles |
| **Frequency** | Very High (multiple times daily) |
| **Criticality** | Critical |

## Workflow Overview

This workflow describes the process of user authentication in the Hypatia LMS, including user registration, email verification, login, password reset, and logout. Authentication is a critical workflow that serves as the gateway to the platform and ensures that users can securely access their accounts and appropriate content.

## Preconditions

- User has access to the Hypatia LMS platform
- User has a valid email address for registration
- User has internet connectivity

## Workflow Steps

### Registration Flow

#### Step 1: Navigate to Signup Form

**Actor**: Anonymous User

**Action**: User clicks on the "Sign Up" button in the navigation bar or login form.

**System Response**: System displays the signup form with fields for email, password, first name, and last name.

**UI Components**: Navigation bar, Signup button, Signup form

**Alternative Flows**: None

#### Step 2: Enter Registration Information

**Actor**: Anonymous User

**Action**: User enters their email address, password (twice for confirmation), first name, and last name.

**System Response**: System validates the input in real-time (email format, password strength).

**UI Components**: Signup form, Input validation messages

**Alternative Flows**: 
- If validation fails, system displays error messages and prevents submission
- User can cancel registration and return to previous page

#### Step 3: Submit Registration

**Actor**: Anonymous User

**Action**: User clicks the "Sign Up" button on the form.

**System Response**: 
1. System shows a loading indicator
2. System creates a new user account in Firebase Authentication
3. System creates a user profile in the Firebase Realtime Database
4. System sends a verification email to the user
5. System displays a success message instructing the user to verify their email

**UI Components**: Submit button, Loading indicator, Success message

**Alternative Flows**:
- If email is already registered, system displays an error message
- If registration fails for any reason, system displays an appropriate error message

#### Step 4: Verify Email

**Actor**: Registered User

**Action**: User receives the verification email and clicks the verification link.

**System Response**: 
1. System verifies the user's email address in Firebase Authentication
2. System displays a confirmation message
3. System redirects the user to the login page

**UI Components**: Email verification page, Confirmation message

**Alternative Flows**:
- If verification link is expired, system provides option to request a new verification email
- If verification fails, system displays an error message with troubleshooting steps

### Login Flow

#### Step 1: Navigate to Login Form

**Actor**: Registered User

**Action**: User clicks on the "Login" button in the navigation bar.

**System Response**: System displays the login form with fields for email and password.

**UI Components**: Navigation bar, Login button, Login form

**Alternative Flows**: None

#### Step 2: Enter Credentials

**Actor**: Registered User

**Action**: User enters their email address and password.

**System Response**: System validates the input format.

**UI Components**: Login form, Input validation messages

**Alternative Flows**: 
- If validation fails, system displays error messages and prevents submission
- User can click "Forgot Password" to initiate password reset flow

#### Step 3: Submit Login

**Actor**: Registered User

**Action**: User clicks the "Login" button on the form.

**System Response**: 
1. System shows a loading indicator
2. System authenticates the user with Firebase Authentication
3. If email is verified, system logs the user in and redirects to dashboard
4. If email is not verified, system shows a message to verify email

**UI Components**: Submit button, Loading indicator, Error/success messages

**Alternative Flows**:
- If credentials are incorrect, system displays an error message
- If account doesn't exist, system suggests registration

### Password Reset Flow

#### Step 1: Initiate Password Reset

**Actor**: Registered User

**Action**: User clicks "Forgot Password" on the login form.

**System Response**: System displays the password reset form with a field for email address.

**UI Components**: Forgot password link, Password reset form

**Alternative Flows**: None

#### Step 2: Enter Email Address

**Actor**: Registered User

**Action**: User enters their email address.

**System Response**: System validates the email format.

**UI Components**: Email input field, Validation messages

**Alternative Flows**: 
- If validation fails, system displays error message and prevents submission

#### Step 3: Submit Password Reset Request

**Actor**: Registered User

**Action**: User clicks the "Reset Password" button.

**System Response**: 
1. System shows a loading indicator
2. System sends a password reset email via Firebase Authentication
3. System displays a confirmation message

**UI Components**: Submit button, Loading indicator, Confirmation message

**Alternative Flows**:
- If email is not registered, system still shows success message (for security)
- If request fails, system displays an error message

#### Step 4: Reset Password

**Actor**: Registered User

**Action**: User receives the password reset email and clicks the reset link.

**System Response**: System displays a form to enter a new password.

**UI Components**: Password reset form, Password strength indicator

**Alternative Flows**:
- If reset link is expired, system provides option to request a new reset email

#### Step 5: Submit New Password

**Actor**: Registered User

**Action**: User enters a new password (twice for confirmation) and submits.

**System Response**: 
1. System updates the user's password in Firebase Authentication
2. System displays a success message
3. System redirects the user to the login page

**UI Components**: Submit button, Success message

**Alternative Flows**:
- If passwords don't match or don't meet strength requirements, system displays error message

### Logout Flow

#### Step 1: Initiate Logout

**Actor**: Authenticated User

**Action**: User clicks the "Logout" option in the user menu.

**System Response**: 
1. System logs the user out of Firebase Authentication
2. System clears the user's session
3. System redirects the user to the home page

**UI Components**: User menu, Logout option

**Alternative Flows**: None

## Postconditions

- For Registration: User account is created and email verification is sent
- For Login: User is authenticated and can access appropriate content
- For Password Reset: User's password is updated
- For Logout: User is signed out and session is terminated

## Error Conditions and Recovery

| Error Condition | Recovery Path |
|-----------------|---------------|
| Email already registered | User is prompted to login or reset password |
| Invalid email format | User is prompted to enter a valid email |
| Weak password | User is prompted to enter a stronger password |
| Incorrect login credentials | User is prompted to try again or reset password |
| Unverified email | User is prompted to check email and verify account |
| Expired verification/reset link | User can request a new link |
| Network connectivity issues | User is prompted to check connection and retry |

## Performance Expectations

- Registration form submission should complete within 3 seconds
- Login should complete within 2 seconds
- Password reset email should be sent within 3 seconds
- Logout should complete within 1 second

## User Experience Considerations

- Clear error messages that guide users to resolution
- Visual indicators for password strength
- Persistent login option for convenience
- Clear indication of email verification requirement
- Mobile-friendly authentication forms
- Accessibility considerations for all authentication forms

## Testing Scenarios

1. Register with valid information
2. Register with an email that's already in use
3. Register with invalid email format
4. Register with weak password
5. Login with correct credentials
6. Login with incorrect credentials
7. Login with unverified email
8. Reset password with valid email
9. Reset password with invalid email
10. Logout from different pages
11. Test authentication persistence across browser sessions
12. Test authentication with network interruptions

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Navigate to    │     │  Enter          │     │  Submit         │
│  Signup Form    │────▶│  Registration   │────▶│  Registration   │────┐
└─────────────────┘     │  Information    │     └─────────────────┘    │
                        └─────────────────┘                            │
                                                                       ▼
┌─────────────────┐                                          ┌─────────────────┐
│  Navigate to    │                                          │  Verify         │
│  Login Form     │◀─────────────────────────────────────────│  Email          │
└────────┬────────┘                                          └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Enter          │     │  Submit         │
│  Credentials    │────▶│  Login          │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐
│  Initiate       │     │  Enter          │
│  Logout         │     │  Dashboard      │
└─────────────────┘◀────└─────────────────┘


Password Reset Flow:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Initiate       │     │  Enter          │     │  Submit         │
│  Password Reset │────▶│  Email Address  │────▶│  Reset Request  │────┐
└─────────────────┘     └─────────────────┘     └─────────────────┘    │
                                                                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Navigate to    │     │  Submit         │     │  Reset          │
│  Login Form     │◀────│  New Password   │◀────│  Password       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Code References from Legacy System

### User Registration

```javascript
// From src/app/themes/nekomy/components/signup/signup.jsx
handleSignup(e) {
  e.preventDefault();

  const { password, password2, firstname, lastname } = this.refs;

  if (password.value === password2.value) {
    $('.js-btn-signup').hide();
    $('.js-signup-loader').show();

    const email = String(this.refs.email.value);

    firebase.auth().createUserWithEmailAndPassword(email, password.value).then((user) => {
      this.saveUser(user, firstname.value, lastname.value, email);
    }).catch((error) => {
      $('.js-btn-signup').show();
      $('.js-signup-loader').hide();
      this.props.setNotification({ message: String(error), type: 'error' });
    });
  } else {
    this.props.setNotification({ message: PASSWORD_MATCH_ERROR, type: 'error' });
  }
}

saveUser(user, firstname, lastname, email) {
  return firebase.database().ref(`users/${user.uid}/info`).set({
    firstName: firstname,
    lastName1: lastname,
    email,
    displayName: `${firstname} ${lastname}`
  }).then(() => {
    user.sendEmailVerification().then(() => {
      this.props.setNotification({ message: USER_CREATED, type: 'success' });
      $('.js-btn-signup').show();
      $('.js-signup-loader').hide();
    });
  });
}
```

### User Login

```javascript
// From src/app/themes/nekomy/components/signin/signin.jsx
handleSignin(e) {
  e.preventDefault();
  $('.js-btn-signin').hide();
  $('.js-signin-loader').show();

  const email = String(this.refs.email.value);
  const password = this.refs.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    $('.js-btn-signin').show();
    $('.js-signin-loader').hide();
    $('.js-overlay').click();
  }).catch((error) => {
    $('.js-btn-signin').show();
    $('.js-signin-loader').hide();
    this.props.setNotification({ message: String(error), type: 'error' });
  });
}
```

### Authentication State Management

```javascript
// From src/app/core/app.jsx
componentDidMount() {
  this.onResize();
  window.onresize = _.debounce(() => this.onResize(), 500);

  this.removeListener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (user.emailVerified) {
        this.props.setUser(user);
        firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
          if (snapshot.val()) {
            this.props.setUserData(snapshot.val());
          }
        });
      } else {
        this.props.setNotification({ message: USER_CONFIRM_EMAIL, type: 'info' });
      }
    }
  });
}
```

### User Logout

```javascript
// From src/app/themes/nekomy/components/dropdown/dropdown.jsx
handleSignout() {
  firebase.auth().signOut().then(() => {
    this.props.clearUser();
    this.props.setNotification({ message: USER_SIGNOUT, type: 'success' });
  }, (error) => {
    this.props.setNotification({ message: String(error), type: 'error' });
  });
}
```

## Migration Notes

### Current Implementation Issues

1. **Direct Firebase Integration**: Components directly call Firebase methods
2. **jQuery Dependency**: Uses jQuery for DOM manipulation (show/hide elements)
3. **String Refs**: Uses deprecated string refs for form elements
4. **Limited Error Handling**: Basic error handling without specific user guidance
5. **No Password Strength Indicator**: No visual feedback on password strength
6. **Limited Accessibility**: No explicit accessibility considerations
7. **No Social Login Options**: Only email/password authentication is supported
8. **Basic Email Verification**: Simple email verification without customization

### Migration Recommendations

1. **Authentication Service Layer**: Create a service to abstract Firebase Authentication
2. **React State Management**: Use React state for UI changes instead of jQuery
3. **Form Validation Library**: Implement a form validation library like Formik or React Hook Form
4. **Enhanced Error Handling**: Provide more specific error messages and recovery paths
5. **Password Strength Meter**: Add visual feedback for password strength
6. **Accessibility Improvements**: Ensure all forms are fully accessible
7. **Social Login Options**: Add support for Google, Facebook, and other authentication providers
8. **Enhanced Email Templates**: Customize email verification and password reset emails
9. **Two-Factor Authentication**: Add optional 2FA for enhanced security
10. **Session Management**: Improve session persistence and timeout handling

## Modern Implementation Approach

### Authentication Service

```typescript
// Example of a modern implementation approach
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();
  
  // Registration
  async registerUser(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      // Create user profile in Firestore
      await setDoc(doc(this.db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        displayName: `${firstName} ${lastName}`,
        role: 'student', // Default role
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Send verification email
      await sendEmailVerification(user);
      
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  // Login
  async loginUser(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      if (!user.emailVerified) {
        throw new Error('Please verify your email address before logging in.');
      }
      
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  // Logout
  async logoutUser(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  // Password reset
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  // Get current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
  
  // Listen for auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(this.auth, callback);
  }
  
  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(this.db, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  // Error handling
  private handleAuthError(error: any): Error {
    console.error('Authentication error:', error);
    
    // Provide user-friendly error messages
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return new Error('This email is already registered. Please sign in or reset your password.');
      case 'auth/invalid-email':
        return new Error('Please enter a valid email address.');
      case 'auth/weak-password':
        return new Error('Password is too weak. Please use at least 8 characters with letters and numbers.');
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return new Error('Invalid email or password. Please try again.');
      case 'auth/user-disabled':
        return new Error('This account has been disabled. Please contact support.');
      case 'auth/too-many-requests':
        return new Error('Too many unsuccessful login attempts. Please try again later or reset your password.');
      default:
        return new Error(`Authentication error: ${error.message}`);
    }
  }
}
```

## Additional Notes

- Authentication is a critical security feature and should be implemented with best practices
- The current implementation has basic functionality but lacks modern security features
- Email verification is required before login, which is a good security practice
- The modern implementation should enhance security while improving user experience
- Consider implementing progressive security measures based on user role and content sensitivity
