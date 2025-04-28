# Using the Hybrid Firebase/Supabase Approach

This document provides guidelines and examples for using the hybrid Firebase/Supabase approach in the AIvibLMS application.

## Overview

AIvibLMS uses a hybrid approach where:
- **Firebase** handles authentication and database operations
- **Supabase** handles file storage operations

This approach leverages the strengths of both platforms while minimizing their weaknesses.

## Service Initialization

The application initializes both Firebase and Supabase services using the `HybridInitializer` component:

```tsx
// In App.tsx
import HybridInitializer from './components/core/HybridInitializer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HybridInitializer>
        <AuthProvider>
          <NotificationProvider>
            {/* Application routes */}
          </NotificationProvider>
        </AuthProvider>
      </HybridInitializer>
    </Provider>
  );
};
```

## Authentication

Authentication is handled by Firebase through the `useHybridAuth` hook:

```tsx
// In a component
import { useAuthContext } from '../contexts/AuthContext';

const MyComponent: React.FC = () => {
  const { user, signIn, signOut } = useAuthContext();
  
  const handleSignIn = async () => {
    try {
      await signIn('user@example.com', 'password');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };
  
  return (
    <div>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};
```

## Database Operations

Database operations are performed using Firebase Firestore:

```tsx
// In a service or component
import { firebase } from '../services/hybridService';

const { firestore } = firebase;

// Create a document
const createCourse = async (courseData) => {
  try {
    const courseRef = doc(collection(firestore, 'courses'));
    await setDoc(courseRef, {
      ...courseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return courseRef.id;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Read a document
const getCourse = async (courseId) => {
  try {
    const courseDoc = await getDoc(doc(firestore, 'courses', courseId));
    if (courseDoc.exists()) {
      return courseDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting course:', error);
    throw error;
  }
};
```

## File Storage Operations

File operations are performed using Supabase Storage through the `fileService`:

```tsx
// In a component
import { uploadProfileImage } from '../services/fileService';

const ProfilePage: React.FC = () => {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const imageUrl = await uploadProfileImage(file);
      // Update user profile with the new image URL
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
    </div>
  );
};
```

## Using the FileUpload Component

For a more complete file upload experience, use the `FileUpload` component:

```tsx
// In a component
import FileUpload from '../components/common/FileUpload';

const CourseEditor: React.FC = () => {
  const handleUploadComplete = (url) => {
    console.log('File uploaded:', url);
    // Update course with the new file URL
  };
  
  return (
    <div>
      <h2>Course Materials</h2>
      <FileUpload 
        uploadType="course"
        courseId="course-123"
        onUploadComplete={handleUploadComplete}
        acceptedFileTypes="application/pdf,.doc,.docx"
        buttonText="Upload Course Material"
      />
    </div>
  );
};
```

## Displaying Files

Use the `FileDisplay` component to display files:

```tsx
// In a component
import FileDisplay from '../components/common/FileDisplay';

const CourseMaterial: React.FC = ({ fileUrl, fileName }) => {
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

## Best Practices

1. **Authentication**:
   - Always use the `useAuthContext` hook for authentication operations
   - Check user authentication status before performing operations
   - Handle authentication errors appropriately

2. **Database Operations**:
   - Use Firebase Firestore for all database operations
   - Structure your data according to Firestore best practices
   - Implement proper security rules in Firestore

3. **File Operations**:
   - Use Supabase Storage for all file operations
   - Store file metadata in Firestore
   - Use the provided components and services for file operations

4. **Error Handling**:
   - Implement proper error handling for all operations
   - Use try/catch blocks for async operations
   - Display user-friendly error messages

5. **Security**:
   - Validate user permissions before performing operations
   - Implement proper security rules in both Firebase and Supabase
   - Never expose sensitive information to the client

## Troubleshooting

### Firebase Authentication Issues

- Check if the user is properly authenticated
- Verify that Firebase Authentication is properly configured
- Check for errors in the browser console

### Firestore Database Issues

- Check if the user has the necessary permissions
- Verify that Firestore security rules are properly configured
- Check for errors in the browser console

### Supabase Storage Issues

- Check if the user is properly authenticated
- Verify that Supabase Storage is properly configured
- Check for CORS issues
- Check for errors in the browser console

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Hybrid Approach Architecture Decision](../architecture/decisions/0001-hybrid-firebase-supabase-approach.md)
- [File Storage Strategy](../architecture/file-storage-strategy.md)
