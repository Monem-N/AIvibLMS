# Hybrid Firebase/Supabase Setup for AIvibLMS

This document explains the hybrid approach used in AIvibLMS, which combines:
- **Firebase** for authentication and database (Firestore)
- **Supabase** for file storage

## Why a Hybrid Approach?

### Firebase Strengths (Auth & Database)
- Mature authentication system with multiple providers
- Real-time database capabilities
- Seamless integration with other Google services
- Robust security rules

### Supabase Strengths (Storage)
- SQL-based storage with powerful querying capabilities
- Generous free tier (1GB storage)
- Simple API for file operations
- Built-in CDN for fast content delivery

## Setup Instructions

### 1. Firebase Setup

Follow the instructions in `docs/firebase-setup.md` to set up Firebase for authentication and database, but skip the Storage setup.

### 2. Supabase Setup (Storage Only)

1. **Create a Supabase Project**:
   - Go to the [Supabase Dashboard](https://app.supabase.io/)
   - Click "New Project"
   - Enter a project name (e.g., "AIvibLMS-Storage")
   - Set a secure database password
   - Choose a region closest to your users
   - Click "Create New Project"

2. **Create Storage Buckets**:
   - Go to Storage in your Supabase project
   - Create the following buckets:
     - `course-materials`: For storing course materials
     - `profile-images`: For storing user profile images
     - `submissions`: For storing assignment submissions
     - `resources`: For storing course resources

3. **Configure Storage Permissions**:
   - For each bucket, set appropriate permissions:
     - For development, you can start with public access
     - For production, set up Row Level Security (RLS) policies

### 3. Environment Variables

Configure your `.env.local` file with both Firebase and Supabase credentials:

```
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_DATABASE_URL=your_firebase_database_url

# Supabase Configuration (for Storage only)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Architecture Overview

### Services

1. **Firebase Services**:
   - `src/services/firebaseService.ts`: Main Firebase initialization
   - `src/services/authService.ts`: Authentication operations
   - `src/services/databaseService.ts`: Firestore database operations

2. **Supabase Services**:
   - `src/services/supabaseStorageService.ts`: Supabase Storage operations

3. **Hybrid Services**:
   - `src/services/fileService.ts`: Combines Firebase auth with Supabase storage

### Components

1. **File Upload Component**:
   - `src/components/common/FileUpload.tsx`: Reusable component for file uploads

2. **File Display Component**:
   - `src/components/common/FileDisplay.tsx`: Reusable component for displaying files

## Usage Examples

### Uploading a Profile Image

```jsx
import { FileUpload } from '../components/common/FileUpload';

const ProfilePage = () => {
  const handleUploadComplete = (url) => {
    console.log('Profile image uploaded:', url);
    // Update user profile with the new image URL
  };

  return (
    <div>
      <h2>Profile</h2>
      <FileUpload 
        uploadType="profile"
        onUploadComplete={handleUploadComplete}
        acceptedFileTypes="image/*"
        buttonText="Upload Profile Picture"
      />
    </div>
  );
};
```

### Displaying a File

```jsx
import { FileDisplay } from '../components/common/FileDisplay';

const CourseMaterial = ({ fileUrl, fileName }) => {
  return (
    <div>
      <h3>Course Material</h3>
      <FileDisplay 
        url={fileUrl}
        fileName={fileName}
        showPreview={true}
      />
    </div>
  );
};
```

## Security Considerations

### Firebase Authentication with Supabase Storage

When using Supabase Storage with Firebase Authentication, consider these security approaches:

1. **Public Buckets with Metadata Validation**:
   - Make buckets public but include user ID in metadata
   - Validate ownership in your application code

2. **Signed URLs**:
   - Generate short-lived signed URLs for private files
   - Implement server functions to validate access before generating URLs

3. **Custom Claims**:
   - Use Firebase custom claims to store roles
   - Pass these roles to Supabase for access control

## Troubleshooting

### CORS Issues
If you encounter CORS issues when accessing Supabase Storage:
1. Go to your Supabase project settings
2. Add your application domain to the allowed origins

### Authentication Issues
If users can't access their files:
1. Ensure the user is properly authenticated in Firebase
2. Check that the file paths and bucket names are correct
3. Verify that the file metadata includes the correct user ID

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Supabase Storage Documentation](https://supabase.io/docs/guides/storage)
- [Supabase JavaScript Client](https://supabase.io/docs/reference/javascript/storage-createbucket)
