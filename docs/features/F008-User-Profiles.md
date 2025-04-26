# Feature Documentation: User Profiles

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | User Profiles |
| **Feature ID** | F008 |
| **Category** | User Management |
| **Priority** | Medium |
| **Status in Legacy System** | Partially Implemented |

## Functional Description

The User Profiles feature allows users to manage their personal information, account settings, and preferences within the Hypatia LMS. It enables users to view and update their profile details, change their password, and customize their learning experience. User profiles also serve as the identity representation across the platform, displaying user information in various contexts such as course enrollments, discussions, and messaging.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can view and edit all user profiles; can manage user roles and permissions |
| Instructor | Can view their own profile and edit personal information; can view limited profile information of students in their courses |
| Student | Can view and edit their own profile; can view limited profile information of instructors and peers |
| Anonymous User | Cannot access user profiles |

## User Workflows

### Profile Viewing

1. User navigates to their profile page via the user menu or dashboard
2. System displays the user's profile information including personal details and account settings
3. User can view their profile information organized in sections (personal details, account settings, etc.)

### Profile Editing

1. User navigates to their profile or account settings page
2. User selects "Edit" or directly modifies profile fields
3. User updates their information (name, contact details, etc.)
4. User saves the changes
5. System validates the input and updates the profile information
6. System displays a success message confirming the update

### Password Management

1. User navigates to the account settings section
2. User selects the password change option
3. User enters their current password and new password (twice for confirmation)
4. User submits the password change request
5. System validates the input and updates the password
6. System displays a success message confirming the password change

### Profile Picture Management

1. User navigates to their profile page
2. User selects the option to update their profile picture
3. User uploads a new image or selects from available options (not fully implemented in legacy system)
4. System processes the image and updates the profile picture
5. System displays the updated profile picture across the platform

## UI Components

- **Profile Page**: Main page displaying user profile information
- **Account Settings Page**: Page for managing account-related settings
- **Profile Editor**: Form for editing profile information
- **Password Change Form**: Form for changing password
- **Profile Picture Uploader**: Component for uploading and managing profile pictures (partially implemented in legacy system)
- **User Avatar**: Component displaying user's profile picture in various contexts (navigation, comments, etc.)

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| User (Firebase Auth) | uid, email, emailVerified, password (hashed) | One-to-one with UserProfile |
| UserProfile | firstName, lastName1, lastName2, displayName, email, level (role), address, city, country, postcode | One-to-one with User |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/users/${userId}/info` | GET | Retrieve user profile information |
| `/users/${userId}/info` | SET | Update user profile information |
| Firebase Auth API | - | Manage authentication-related operations (password change, etc.) |

## Dependencies

- Firebase Authentication for user identity management
- Firebase Realtime Database for profile data storage
- Gravatar for profile pictures (current implementation)
- React for UI components
- Redux for state management
- jQuery for DOM manipulation

## Testing Considerations

- Test profile information update with various input combinations
- Test password change functionality
- Test profile display in different contexts (navigation, course pages, etc.)
- Test profile access permissions for different user roles
- Test validation of profile information
- Test error handling for invalid inputs
- Test profile picture display and update (when implemented)
- Test performance with large numbers of users

## Migration Notes

### Current Implementation Status

The user profile functionality in the legacy Hypatia LMS is partially implemented with the following features:

1. **Basic Profile Information**: Users have basic profile fields (name, email, etc.)
2. **Account Settings Page**: A placeholder page exists but with limited functionality
3. **Password Change**: Basic password change functionality is implemented
4. **Profile Picture**: Uses Gravatar based on email address, no custom upload
5. **User Display**: Basic display of user information in navigation and course pages

The current implementation has several limitations:

1. **Limited Profile Fields**: Only basic profile information is supported
2. **Incomplete Settings Page**: Account settings page is not fully implemented
3. **No Profile Picture Upload**: No direct profile picture upload functionality
4. **jQuery Dependency**: Uses jQuery for DOM manipulation
5. **Direct Firebase Integration**: Components directly call Firebase methods
6. **Limited Validation**: Basic validation of profile information
7. **No Profile Privacy Settings**: No ability to control profile visibility
8. **No Profile Customization**: Limited ability to customize profile appearance

### Migration Recommendations

1. **Enhanced Profile Fields**: Add more comprehensive profile fields including education, interests, and biography
2. **Complete Settings Page**: Fully implement the account settings page with all necessary functionality
3. **Profile Picture Upload**: Add direct profile picture upload and management
4. **Remove jQuery Dependency**: Use React state and effects for UI interactions
5. **Service Layer Abstraction**: Create a service layer to abstract Firebase interactions
6. **Improved Validation**: Enhance validation of profile information
7. **Profile Privacy Settings**: Add ability to control profile visibility
8. **Profile Customization**: Allow users to customize their profile appearance
9. **Role-Based Profiles**: Customize profile fields and display based on user role
10. **Profile Analytics**: Add analytics to track profile completeness and usage

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

  // Component JSX here
};
```

## Modern Implementation Approach

### User Profile Service

```typescript
// Example of a modern implementation approach
export class UserProfileService {
  private auth = getAuth();
  private db = getFirestore();
  private storage = getStorage();
  
  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profileRef = doc(this.db, 'users', userId);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        return { id: profileSnap.id, ...profileSnap.data() } as UserProfile;
      } else {
        return null;
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Update user profile
  async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
    try {
      const profileRef = doc(this.db, 'users', userId);
      
      await updateDoc(profileRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Update password
  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = this.auth.currentUser;
      
      if (!user || !user.email) {
        throw new Error('User not authenticated');
      }
      
      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Upload profile picture
  async uploadProfilePicture(userId: string, file: File): Promise<string> {
    try {
      const fileName = `profile-pictures/${userId}/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, fileName);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update user profile with new picture URL
      const profileRef = doc(this.db, 'users', userId);
      await updateDoc(profileRef, {
        profilePicture: downloadURL,
        updatedAt: serverTimestamp()
      });
      
      return downloadURL;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Error handling
  private handleError(error: any): Error {
    console.error('User profile service error:', error);
    
    // Return user-friendly error message
    return new Error(`Profile operation failed: ${error.message}`);
  }
}
```

### User Profile Component

```typescript
// Example of a modern implementation approach
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  Tabs, 
  Tab, 
  Divider, 
  Grid, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { 
  Person as PersonIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useUserProfileService } from '../hooks/useUserProfileService';
import { RootState } from '../store';
import { UserProfile } from '../types/user';
import { ProfilePictureUploader } from './ProfilePictureUploader';

export const ProfilePage: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  const { 
    getUserProfile, 
    updateUserProfile, 
    updatePassword, 
    loading, 
    error 
  } = useUserProfileService();
  
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<UserProfile>();
  
  useEffect(() => {
    if (currentUser) {
      const loadProfile = async () => {
        try {
          const profile = await getUserProfile(currentUser.uid);
          
          if (profile) {
            // Set form values
            Object.entries(profile).forEach(([key, value]) => {
              setValue(key as any, value);
            });
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      };
      
      loadProfile();
    }
  }, [currentUser, getUserProfile, setValue]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const onSubmit = async (data: UserProfile) => {
    try {
      if (currentUser) {
        await updateUserProfile(currentUser.uid, data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  if (!currentUser) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Please log in to view your profile</Alert>
      </Box>
    );
  }
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Controller
            name="profilePicture"
            control={control}
            defaultValue=""
            render={({ field: { value } }) => (
              <ProfilePictureUploader
                value={value}
                email={currentUser.email || ''}
                userId={currentUser.uid}
                disabled={!isEditing}
              />
            )}
          />
          
          <Box sx={{ ml: 2 }}>
            <Controller
              name="displayName"
              control={control}
              defaultValue=""
              render={({ field: { value } }) => (
                <Typography variant="h5">{value || 'User'}</Typography>
              )}
            />
            
            <Typography variant="body2" color="text.secondary">
              {currentUser.email}
            </Typography>
            
            {!isEditing ? (
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mt: 1 }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ mt: 1 }}>
                <Button 
                  variant="contained" 
                  size="small" 
                  sx={{ mr: 1 }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab icon={<PersonIcon />} label="Personal Info" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<SettingsIcon />} label="Preferences" />
        </Tabs>
        
        <Divider sx={{ mb: 3 }} />
        
        {activeTab === 0 && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'First name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Last name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="bio"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Bio"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      disabled={!isEditing}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Country"
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="City"
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        
        {activeTab === 1 && (
          <PasswordChangeForm updatePassword={updatePassword} />
        )}
        
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Preferences
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Preference settings will be available in a future update.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
```

## Additional Notes

- User profiles are essential for personalization and identity within the LMS
- The current implementation has basic functionality but lacks advanced features
- Profile completeness can impact user engagement and platform adoption
- Consider implementing profile completion incentives
- Privacy considerations are important for user profile information
- Mobile responsiveness is essential for users accessing profiles on different devices
