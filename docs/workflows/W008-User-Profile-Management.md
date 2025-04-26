# Workflow Documentation: User Profile Management

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | User Profile Management |
| **Workflow ID** | W008 |
| **User Role(s)** | All Users |
| **Priority** | Medium |
| **Status in Legacy System** | Partially Implemented |

## Workflow Description

The User Profile Management workflow enables users to view, update, and manage their personal information and account settings within the Hypatia LMS. This workflow is essential for maintaining accurate user information, personalizing the learning experience, and ensuring proper system functionality. It includes managing profile details, updating passwords, and configuring notification preferences.

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│  Access Profile │────▶│ View Profile    │────▶│ Edit Profile    │────▶│ Save Profile    │
│                 │     │ Information     │     │ Information     │     │ Changes         │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                │                                               │
                                │                                               │
                                ▼                                               ▼
┌─────────────────┐     ┌─────────────────┐                          ┌─────────────────┐
│                 │     │                 │                          │                 │
│ Manage Account  │◀────│ Access Account  │                          │ View Updated    │
│ Settings        │     │ Settings        │                          │ Profile         │
└─────────────────┘     └─────────────────┘                          └─────────────────┘
        │
        │
        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│ Change Password │────▶│ Update          │────▶│ Receive         │
│                 │     │ Notification    │     │ Confirmation    │
└─────────────────┘     │ Preferences     │     │                 │
                        └─────────────────┘     └─────────────────┘
```

## Detailed Steps

### 1. Access Profile

**Description**: User accesses their profile page.

**User Actions**:
- Log in to the LMS
- Click on user avatar/name in the navigation bar
- Select "Profile" or "My Profile" from the dropdown menu

**System Actions**:
- Authenticate the user
- Retrieve user profile data from the database
- Navigate to the profile page

**UI Components**:
- Navigation bar with user menu
- User dropdown menu
- Profile menu item

**Data Involved**:
- User authentication data
- User profile data

**Conditions and Rules**:
- User must be logged in
- System should handle any errors in retrieving profile data

### 2. View Profile Information

**Description**: User views their current profile information.

**User Actions**:
- Review personal information (name, email, etc.)
- View profile picture
- Check account status and role

**System Actions**:
- Display user profile information in a structured format
- Show profile picture (from Gravatar or uploaded image)
- Display account status and role information
- Provide options to edit profile

**UI Components**:
- Profile information display
- Profile picture display
- Edit profile button
- Profile sections (personal info, account info, etc.)

**Data Involved**:
- User profile data (name, email, address, etc.)
- Profile picture data
- Account status and role data

**Conditions and Rules**:
- All users should be able to view their own profile
- Some profile fields may be read-only depending on system configuration
- Profile picture may be sourced from Gravatar or a custom upload

### 3. Edit Profile Information

**Description**: User edits their profile information.

**User Actions**:
- Click "Edit Profile" or equivalent button
- Modify profile fields (name, contact information, etc.)
- Upload or change profile picture (if supported)
- Add or update additional information (bio, interests, etc.)

**System Actions**:
- Switch profile display to edit mode
- Present editable form fields with current values
- Provide file upload interface for profile picture (if supported)
- Validate input as user types or on submission

**UI Components**:
- Edit profile form
- Form fields for various profile attributes
- Profile picture upload control
- Validation error messages
- Save and cancel buttons

**Data Involved**:
- Current profile data (for pre-filling form)
- User input for updated profile fields
- Profile picture file (if being changed)

**Conditions and Rules**:
- Certain fields may be required (e.g., name)
- Email changes may require verification
- Profile picture may have size and format restrictions
- Some fields may have format validation (e.g., phone numbers)

### 4. Save Profile Changes

**Description**: User saves their updated profile information.

**User Actions**:
- Review changes
- Click "Save" or "Update Profile" button

**System Actions**:
- Validate all input fields
- Save updated profile data to the database
- Update profile picture in storage (if changed)
- Display success message
- Return to profile view mode

**UI Components**:
- Save button
- Validation error messages
- Success message
- Loading indicator during save

**Data Involved**:
- Updated profile data
- Profile picture data (if changed)

**Conditions and Rules**:
- All required fields must be filled
- All fields must pass validation
- System should handle any errors during save operation
- Changes should be atomic (all succeed or all fail)

### 5. View Updated Profile

**Description**: User views their profile with the updated information.

**User Actions**:
- Review updated profile information
- Verify changes were applied correctly

**System Actions**:
- Display updated profile information
- Show confirmation message that changes were saved

**UI Components**:
- Profile information display
- Success message

**Data Involved**:
- Updated user profile data

**Conditions and Rules**:
- Updated information should be immediately visible
- System should handle any errors in retrieving updated profile data

### 6. Access Account Settings

**Description**: User accesses their account settings.

**User Actions**:
- Navigate to account settings from profile page or user menu
- Select specific settings section (password, notifications, etc.)

**System Actions**:
- Retrieve current account settings
- Display settings interface
- Present options based on user role and permissions

**UI Components**:
- Account settings navigation
- Settings categories
- Settings interface

**Data Involved**:
- User account settings data
- User permissions data

**Conditions and Rules**:
- User must be logged in
- Some settings may be restricted based on user role
- System should handle any errors in retrieving settings data

### 7. Manage Account Settings

**Description**: User manages various account settings.

**User Actions**:
- Navigate between different settings categories
- Review current settings
- Select settings to modify

**System Actions**:
- Display appropriate settings interface for each category
- Show current settings values
- Provide controls for modifying settings

**UI Components**:
- Settings category navigation
- Settings controls (toggles, dropdowns, etc.)
- Save buttons for each settings section

**Data Involved**:
- User account settings data
- Available options for each setting

**Conditions and Rules**:
- Settings may have dependencies on each other
- Some settings may require confirmation
- Settings changes may affect system behavior immediately

### 8. Change Password

**Description**: User changes their account password.

**User Actions**:
- Navigate to password change section
- Enter current password
- Enter new password
- Confirm new password
- Submit password change

**System Actions**:
- Validate current password
- Validate new password strength and confirmation match
- Update password in authentication system
- Log out other sessions (optional)
- Display success message

**UI Components**:
- Password change form
- Password strength indicator
- Validation error messages
- Submit button
- Success message

**Data Involved**:
- Current password (for verification)
- New password
- Password policy rules

**Conditions and Rules**:
- Current password must be correct
- New password must meet strength requirements
- New password must match confirmation
- Password change may require re-authentication
- System should handle any errors during password change

### 9. Update Notification Preferences

**Description**: User configures their notification preferences.

**User Actions**:
- Navigate to notification settings
- Review current notification settings
- Toggle notifications on/off for different categories
- Set notification frequency or delivery method
- Save notification preferences

**System Actions**:
- Display current notification settings
- Provide controls for each notification type
- Save updated preferences to the database
- Apply new notification settings immediately

**UI Components**:
- Notification settings interface
- Toggle switches for each notification type
- Frequency/delivery method selectors
- Save button
- Success message

**Data Involved**:
- Current notification preferences
- Available notification types
- Delivery method options

**Conditions and Rules**:
- Some notifications may be required and cannot be disabled
- Changes should take effect immediately
- System should handle any errors during preference update

### 10. Receive Confirmation

**Description**: User receives confirmation of account settings changes.

**User Actions**:
- Review confirmation message
- Navigate away from settings page

**System Actions**:
- Display success message with details of changes
- Send confirmation email for critical changes (optional)
- Log settings changes for audit purposes

**UI Components**:
- Success message
- Confirmation details
- Return to profile button

**Data Involved**:
- Details of changes made
- Confirmation message data

**Conditions and Rules**:
- Confirmation should be clear about what changes were made
- Critical changes may require additional confirmation
- System should provide a way to revert changes if needed

## Alternative Flows

### Profile Picture Management Flow

For systems that support custom profile pictures:

1. User selects "Change Profile Picture" option
2. User uploads a new image or selects from a gallery
3. System validates image (size, format, content)
4. User crops or adjusts the image
5. System saves the new profile picture
6. Updated picture is displayed in the profile

### Account Deactivation Flow

For users who wish to deactivate their account:

1. User navigates to account settings
2. User selects "Deactivate Account" option
3. System explains the consequences of deactivation
4. User confirms deactivation intent
5. System may require password verification
6. Account is deactivated and user is logged out
7. User receives confirmation email

### Profile Privacy Settings Flow

For systems with social or public profile features:

1. User navigates to privacy settings
2. User configures what profile information is visible to others
3. User sets visibility for different user groups (public, registered users, connections)
4. System saves privacy preferences
5. Profile information visibility is updated according to settings

## Integration Points

### Integration with Authentication System

- Profile management is tied to user authentication
- Password changes are handled by the authentication system
- Email changes may require re-verification

### Integration with Notification System

- Notification preferences affect how the system communicates with the user
- Profile updates may trigger notifications to the user or administrators
- Critical account changes send confirmation notifications

### Integration with File Management

- Profile picture uploads use the file management system
- Uploaded files are stored and managed according to file system rules

### Integration with User Dashboard

- Profile information is displayed in the user dashboard
- Account status and notifications appear in the dashboard
- Quick access to profile management is provided from the dashboard

## Current Implementation Status

The User Profile Management workflow in the legacy Hypatia LMS is partially implemented:

1. **Basic Profile Information**: Users have basic profile fields (name, email, address, etc.)
2. **Account Settings Page**: A placeholder page exists but with limited functionality
3. **Password Change**: Basic password change functionality is implemented
4. **Profile Picture**: Uses Gravatar based on email address, no custom upload
5. **User Display**: Basic display of user information in navigation and course pages

The current implementation has several limitations:

1. **Limited Profile Fields**: Only basic profile information is supported
2. **No Custom Profile Pictures**: Relies on Gravatar, no custom upload
3. **Basic Settings**: Limited account settings options
4. **No Notification Preferences**: No way to configure notification preferences
5. **Minimal Privacy Controls**: No granular privacy settings
6. **jQuery Dependency**: Heavy reliance on jQuery for UI interactions

## Code References from Legacy System

### User Profile Data Structure

```javascript
// From data/demo-data.json
"users" : {
  "jXV6ugDA2WOAVIoNOlpnncsmp0C2" : {
    "info" : {
      "address" : "tst",
      "city" : "Barcelona",
      "country" : "Spain",
      "displayName" : "User",
      "email" : "user@gmail.com",
      "firstName" : "Jason",
      "lastName1" : "Bourne",
      "lastName2" : "",
      "level" : 5,
      "postcode" : "28080"
    },
    "status" : "active"
  }
}
```

### User Profile Creation

```javascript
// From src/app/themes/nekomy/components/signup/signup.jsx
const saveUser = (user, firstname, lastname, email) => {
  return firebase.database().ref(`users/${user.uid}/info`).set({
    firstName: firstname,
    lastName1: lastname,
    email,
    displayName: `${firstname} ${lastname}`
  }).then(() => {
    user.sendEmailVerification();
    $('.js-btn-signup').show();
    $('.js-signup-loader').hide();
    $('.js-overlay').click();
    dispatch(setNotification({ message: USER_CONFIRM_EMAIL, type: 'success' }));
  })
  .catch((error) => {
    $('.js-btn-signup').show();
    $('.js-signup-loader').hide();
    dispatch(setNotification({ message: String(error), type: 'error' }));
  });
};
```

### User Profile Display in Navigation

```javascript
// From src/app/themes/nekomy/components/topnav/topnav.jsx
<div className="user-controls-cta account-cta">
  {user && (
    <Link to="/dashboard">
      {user.email ? <img alt="" className="photo" src={`https://www.gravatar.com/avatar/${md5(user.email)}.jpg?s=20`} /> : <Icon glyph={Avatar} />}
      <span>{user.info?.displayName || ''}</span>
    </Link>
  )}
  <button
    onClick={() => {
      dispatch(setUser(null));
    }}
  >
    <Icon glyph={Logout} className="icon sign-out" />
  </button>
</div>
```

### Account Settings Page

```javascript
// From src/app/themes/nekomy/pages/account/settings.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import md5 from 'md5';
import $ from 'jquery';
import { setLoading, setNotification } from '../../../../core/actions/actions';
import * as CONSTANTS from '../../../../core/constants/constants';
import Icon from '../../../../core/common/lib/icon/icon';
import Avatar from '../../../../../../static/svg/avatar.svg';

const Settings = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user);

  const [info, setInfo] = useState({});

  useEffect(() => {
    dispatch(setLoading(false));
    $('.js-main').removeClass().addClass('main js-main account-settings-page');

    if (!info && userData) {
      setInfo(userData.info);
    }
  }, [dispatch, info, userData]);

  const updatePassword = () => {
    if (passwordRef.current.value === password2Ref.current.value) {
      if (passwordRef.current.value.length >= 6) {
        if (user.email !== CONSTANTS.DEMO_EMAIL) {
          $('.js-btn-password').hide();
          $('.js-password-loader').show();

          user.updatePassword(passwordRef.current.value).then(() => {
            $('.js-btn-password').show();
            $('.js-password-loader').hide();
            dispatch(setNotification({ message: CONSTANTS.PASSWORD_CHANGED, type: 'success' }));
          });
        }
      }
    }
  };

  return (
    <div>
      {/* Component JSX here */}
    </div>
  );
};

export default Settings;
```

## Modern Implementation Approach

The modern implementation of the User Profile Management workflow will leverage React, TypeScript, and Firebase Authentication/Firestore to create a comprehensive profile management system.

### Key Components

1. **UserProfileService**: Service for managing user profile data
2. **ProfilePage**: Main component for viewing and editing profile
3. **ProfileHeader**: Component for displaying profile summary and picture
4. **ProfileForm**: Component for editing profile information
5. **AccountSettings**: Component for managing account settings
6. **PasswordChangeForm**: Component for changing password
7. **NotificationSettings**: Component for managing notification preferences
8. **ProfilePictureUploader**: Component for uploading and cropping profile pictures

### Data Model

```typescript
// User profile model
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  phone?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  role: 'admin' | 'instructor' | 'student';
  status: 'active' | 'inactive' | 'pending';
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

// User preferences model
interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    courseUpdates: boolean;
    discussionReplies: boolean;
    gradeReleases: boolean;
    systemAnnouncements: boolean;
    [key: string]: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'registered' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    showSocialLinks: boolean;
    [key: string]: boolean | string;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    [key: string]: string;
  };
}
```

### Service Layer

```typescript
// User profile service
export class UserProfileService {
  private auth = getAuth();
  private db = getFirestore();
  
  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile>;
  
  // Update user profile
  async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<void>;
  
  // Upload profile picture
  async uploadProfilePicture(userId: string, file: File): Promise<string>;
  
  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void>;
  
  // Update user preferences
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<void>;
  
  // Get user preferences
  async getUserPreferences(userId: string): Promise<UserPreferences>;
  
  // Update email address
  async updateEmail(newEmail: string, password: string): Promise<void>;
  
  // Deactivate account
  async deactivateAccount(userId: string, password: string): Promise<void>;
}
```

### UI Implementation

```typescript
// Profile page component
export const ProfilePage: React.FC = () => {
  // Component implementation
};

// Profile form component
export const ProfileForm: React.FC<ProfileFormProps> = ({ 
  profile, 
  onSave 
}) => {
  // Component implementation
};

// Password change form component
export const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ 
  onPasswordChange 
}) => {
  // Component implementation
};

// Notification settings component
export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  preferences, 
  onUpdate 
}) => {
  // Component implementation
};

// Profile picture uploader component
export const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({ 
  currentPicture, 
  onUpload 
}) => {
  // Component implementation
};
```

## Recommendations for Implementation

1. **Service Abstraction**: Create a comprehensive user profile service that abstracts all interactions with Firebase Authentication and Firestore.

2. **Form Validation**: Implement robust form validation for all profile fields using a form library like Formik or React Hook Form.

3. **Progressive Enhancement**: Implement the profile management system in phases, starting with basic profile information and expanding to more advanced features.

4. **Responsive Design**: Ensure the profile management interface works well on all device sizes.

5. **Profile Completeness**: Add a profile completeness indicator to encourage users to complete their profiles.

6. **Privacy Controls**: Implement granular privacy controls for profile information.

7. **Custom Profile Pictures**: Support custom profile picture uploads with cropping and resizing.

8. **Role-Based Fields**: Show different profile fields based on user role.

9. **Notification Preferences**: Implement detailed notification preferences for different types of system notifications.

10. **Account Security**: Add security features like two-factor authentication and login history.

11. **Accessibility**: Ensure all profile management interfaces are accessible to users with disabilities.

12. **Internationalization**: Support multiple languages for profile fields and interface elements.

13. **Data Export**: Allow users to export their profile data in compliance with privacy regulations.

14. **Profile Verification**: Implement verification for certain profile information (email, phone, etc.).

15. **Audit Logging**: Log all profile changes for security and support purposes.
