# Feature Documentation: User Authentication

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | User Authentication |
| **Feature ID** | F001 |
| **Category** | User Management |
| **Priority** | Critical |
| **Status in Legacy System** | Fully Implemented |

## Functional Description

The User Authentication feature allows users to create accounts, verify their email addresses, log in to the system, reset passwords, and log out. It serves as the foundation for user identity and access control throughout the platform. The system uses Firebase Authentication for identity management and stores additional user profile information in the Firebase Realtime Database.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Anonymous User | Can view the login/signup forms, create an account, and reset password |
| Registered User | Can log in, log out, view and edit their profile, and change their password |
| Administrator | Can view user information and change user roles in addition to regular user permissions |

## User Workflows

### User Registration

1. User navigates to the signup form
2. User enters email, password, first name, and last name
3. System validates the input (email format, password strength)
4. System creates a new user account in Firebase Authentication
5. System creates a user profile in the Firebase Realtime Database
6. System sends a verification email to the user
7. User receives a confirmation message to verify their email

### User Login

1. User navigates to the login form
2. User enters email and password
3. System validates credentials with Firebase Authentication
4. If email is verified, system logs the user in and redirects to dashboard
5. If email is not verified, system shows a message to verify email

### Password Reset

1. User clicks "Forgot Password" on the login form
2. User enters their email address
3. System sends a password reset email
4. User clicks the link in the email
5. User sets a new password
6. System confirms password has been reset

### User Logout

1. User clicks the logout button in the navigation
2. System logs the user out of Firebase Authentication
3. System redirects the user to the home page

## UI Components

- **SignupForm**: Form for new user registration with fields for first name, last name, email, and password
- **SigninForm**: Form for user login with email and password
- **ForgotPasswordForm**: Form for initiating password reset (not fully implemented in legacy system)
- **UserProfileDropdown**: Dropdown in navigation showing user info and logout option
- **EmailVerificationMessage**: Message displayed when email verification is required

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| User (Firebase Auth) | uid, email, emailVerified, password (hashed) | One-to-one with UserProfile |
| UserProfile (Realtime DB) | firstName, lastName1, email, displayName, level (role) | One-to-one with User |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| Firebase Auth API | createUserWithEmailAndPassword | Create new user account |
| Firebase Auth API | signInWithEmailAndPassword | Authenticate user |
| Firebase Auth API | sendPasswordResetEmail | Send password reset email |
| Firebase Auth API | signOut | Log user out |
| `/users/${uid}/info` | SET | Create or update user profile data |
| `/users/${uid}` | GET | Retrieve user profile data |

## Dependencies

- Firebase Authentication for identity management
- Firebase Realtime Database for user profile storage
- Redux for state management
- React for UI components

## Testing Considerations

- Test account creation with valid and invalid inputs
- Test login with correct and incorrect credentials
- Test email verification flow
- Test password reset flow
- Test access control for different user roles
- Test error handling for network issues
- Test session persistence and timeout

## Migration Notes

### Current Implementation Issues

1. **Direct Firebase Integration**: Components directly call Firebase methods instead of using a service layer
2. **jQuery Dependency**: Uses jQuery for DOM manipulation (show/hide elements)
3. **Class Components**: Uses older React class component pattern
4. **Refs Usage**: Uses string refs which are deprecated
5. **Limited Error Handling**: Basic error handling without specific user guidance
6. **Tight Coupling**: UI and authentication logic are tightly coupled

### Migration Recommendations

1. **Create Authentication Service**: Abstract Firebase authentication behind a service layer
2. **Use React State**: Replace jQuery DOM manipulation with React state
3. **Implement Functional Components**: Use functional components with hooks
4. **Add Form Validation**: Implement proper form validation with helpful error messages
5. **Enhance Security**: Add additional security features like 2FA
6. **Improve UX**: Create a more user-friendly authentication flow

## Code References from Legacy System

### User Signup

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

## Modern Implementation Approach

### Authentication Service

```typescript
// Example of a modern implementation approach
export class AuthService {
  private auth = getAuth();
  
  async signUp(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      // Create user profile
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        displayName: `${firstName} ${lastName}`,
        createdAt: serverTimestamp()
      });
      
      // Send verification email
      await sendEmailVerification(user);
      
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  async signOut(): Promise<void> {
    return signOut(this.auth);
  }
  
  async resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
  
  onAuthStateChanged(callback: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(this.auth, callback);
  }
  
  private handleAuthError(error: any): Error {
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
      default:
        return new Error(`Authentication error: ${error.message}`);
    }
  }
}
```

## Additional Notes

- The current implementation mixes UI concerns with authentication logic
- jQuery is used for showing/hiding elements during authentication flows
- Error handling could be improved with more specific error messages
- The system currently requires email verification before login
- User roles are determined by a "level" field in the user profile
- The modern implementation should separate concerns and provide a cleaner authentication flow
