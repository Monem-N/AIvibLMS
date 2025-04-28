# AIvibLMS File Storage Strategy

## Overview

AIvibLMS implements a hybrid file storage strategy that leverages Supabase Storage for file storage while using Firebase for authentication and database operations. This document details the approach, implementation, and best practices for file management in the system.

## Storage Architecture

### Hybrid Approach

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Application                        │
│                                                                 │
│  ┌─────────────────────┐            ┌─────────────────────┐     │
│  │   File Upload UI    │            │   File Display UI   │     │
│  └──────────┬──────────┘            └──────────┬──────────┘     │
└─────────────┼───────────────────────────────────┼───────────────┘
              │                                   │
              ▼                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                         File Service                            │
│                                                                 │
│  ┌─────────────────────┐            ┌─────────────────────┐     │
│  │ Firebase Auth Check │            │ File URL Generation │     │
│  └──────────┬──────────┘            └──────────┬──────────┘     │
└─────────────┼───────────────────────────────────┼───────────────┘
              │                                   │
              ▼                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Supabase Storage                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │   Course    │  │   Profile   │  │ Submissions │  │Resources│ │
│  │  Materials  │  │   Images    │  │             │  │         │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────────────┘
              │                                   │
              ▼                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Firebase Firestore                         │
│                                                                 │
│  ┌─────────────────────┐            ┌─────────────────────┐     │
│  │   File Metadata     │            │  Access Control     │     │
│  │   Storage           │            │  Logic              │     │
│  └─────────────────────┘            └─────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Components

1. **Client-Side Components**:
   - `FileUpload.tsx`: Reusable component for file uploads
   - `FileDisplay.tsx`: Reusable component for displaying files

2. **Service Layer**:
   - `supabaseStorageService.ts`: Low-level Supabase Storage operations
   - `fileService.ts`: High-level file operations integrating Firebase auth

3. **Backend Services**:
   - Supabase Storage: For storing the actual files
   - Firebase Firestore: For storing file metadata and access control

## Storage Buckets

AIvibLMS uses the following Supabase Storage buckets:

1. **course-materials**:
   - Purpose: Store course-related files (PDFs, presentations, etc.)
   - Access: Instructors can upload, all enrolled users can view
   - Organization: `/{courseId}/{fileName}`

2. **profile-images**:
   - Purpose: Store user profile pictures
   - Access: Users can upload their own, everyone can view
   - Organization: `/{userId}.{extension}`

3. **submissions**:
   - Purpose: Store student assignment submissions
   - Access: Students can upload their own, instructors can view
   - Organization: `/{assignmentId}/{userId}_{timestamp}.{extension}`

4. **resources**:
   - Purpose: Store general resources and shared materials
   - Access: Admins and instructors can upload, all users can view
   - Organization: `/{category}/{fileName}`

## File Metadata

File metadata is stored in Firebase Firestore to maintain consistency with the rest of the application data and to leverage Firebase's security rules.

### Metadata Schema

```typescript
interface FileMetadata {
  id: string;              // Unique identifier
  fileName: string;        // Original file name
  fileType: string;        // MIME type
  fileSize: number;        // Size in bytes
  url: string;             // Supabase Storage URL
  bucket: string;          // Storage bucket name
  path: string;            // Path within the bucket
  uploadedBy: string;      // User ID of uploader
  uploadedAt: Timestamp;   // Upload timestamp
  lastAccessed?: Timestamp; // Last access timestamp
  accessCount?: number;    // Number of accesses
  metadata?: {             // Additional metadata
    [key: string]: any;
  };
}
```

### Collection Structure

- **files**: General collection for file metadata
- **users/{userId}/files**: User-specific files
- **courses/{courseId}/files**: Course-specific files
- **assignments/{assignmentId}/submissions/{userId}/files**: Assignment submissions

## File Operations

### Upload Process

1. **Client Initiates Upload**:
   - User selects a file through the `FileUpload` component
   - Component validates file type and size

2. **Authentication Check**:
   - `fileService.ts` verifies the user is authenticated with Firebase
   - Checks user permissions for the specific operation

3. **File Upload to Supabase**:
   - File is uploaded to the appropriate Supabase Storage bucket
   - User ID and other metadata are included

4. **Metadata Storage in Firestore**:
   - File metadata is stored in the appropriate Firestore collection
   - References the Supabase Storage URL

5. **Response to Client**:
   - Success confirmation and file URL are returned to the client

### Download/View Process

1. **Client Requests File**:
   - User clicks on a file in the `FileDisplay` component

2. **Authentication Check**:
   - `fileService.ts` verifies the user is authenticated with Firebase
   - Checks user permissions for accessing the file

3. **URL Generation**:
   - For public files: Returns the public URL
   - For private files: Generates a signed URL with expiration

4. **Access Logging**:
   - Updates the file metadata with access information
   - Increments access count

5. **File Delivery**:
   - File is served from Supabase Storage's CDN

## Security Considerations

### Authentication Integration

Firebase Authentication is used to secure file operations:

```typescript
// Example from fileService.ts
const getCurrentUserId = (): string => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  return user.uid;
};
```

### Access Control

1. **Bucket-Level Policies**:
   - Public buckets: `profile-images`, `resources`
   - Private buckets: `course-materials`, `submissions`

2. **File-Level Access Control**:
   - Metadata in Firestore controls who can access specific files
   - Firebase security rules enforce access control

3. **Signed URLs**:
   - Short-lived signed URLs for private files
   - Expiration times based on file sensitivity

### Security Rules

Example Supabase Storage RLS policy:

```sql
-- Allow users to access their own submissions
CREATE POLICY "Users can access their own submissions"
ON storage.objects
FOR SELECT
USING (
  auth.uid()::text = (storage.foldername(name))[1]
);
```

## Performance Optimization

### CDN Integration

Supabase Storage automatically serves files through a CDN for fast global access.

### Image Optimization

1. **Client-Side Resizing**:
   - Large images are resized before upload to reduce storage and bandwidth

2. **Responsive Images**:
   - `FileDisplay` component uses responsive image techniques

### Caching Strategy

1. **Browser Caching**:
   - Appropriate cache headers for static files

2. **CDN Caching**:
   - Optimized cache settings for different file types

## Implementation Examples

### Uploading a Profile Image

```typescript
// In a profile component
import { uploadProfileImage } from '../services/fileService';

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  try {
    const imageUrl = await uploadProfileImage(file);
    // Update user profile with the new image URL
    await updateUserProfile(user.uid, { avatarUrl: imageUrl });
  } catch (error) {
    console.error('Error uploading profile image:', error);
  }
};
```

### Displaying Course Materials

```typescript
// In a course materials component
import { listCourseMaterials } from '../services/fileService';
import FileDisplay from '../components/common/FileDisplay';

const CourseMaterials = ({ courseId }) => {
  const [materials, setMaterials] = useState([]);
  
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const files = await listCourseMaterials(courseId);
        setMaterials(files);
      } catch (error) {
        console.error('Error fetching course materials:', error);
      }
    };
    
    fetchMaterials();
  }, [courseId]);
  
  return (
    <div>
      <h2>Course Materials</h2>
      {materials.map(file => (
        <FileDisplay
          key={file.id}
          url={file.url}
          fileName={file.name}
          fileType={file.contentType}
        />
      ))}
    </div>
  );
};
```

## Best Practices

1. **File Naming**:
   - Use consistent naming conventions
   - Include timestamps or UUIDs to prevent collisions

2. **Error Handling**:
   - Implement robust error handling for upload/download failures
   - Provide clear error messages to users

3. **Progress Indication**:
   - Show upload progress for large files
   - Provide visual feedback during file operations

4. **Cleanup Procedures**:
   - Implement cleanup for orphaned files
   - Regular audits of storage usage

5. **Monitoring**:
   - Track storage usage and costs
   - Monitor file access patterns

## Future Enhancements

1. **Server-Side Processing**:
   - Image resizing and optimization
   - Video transcoding
   - Document conversion

2. **Advanced Security**:
   - Virus scanning for uploaded files
   - Content moderation for images

3. **AI Integration**:
   - Automatic tagging of images
   - Content extraction from documents
   - Video transcription

## Conclusion

The hybrid Firebase/Supabase approach for file storage in AIvibLMS provides a cost-effective, performant, and secure solution for handling user-generated content. By leveraging the strengths of both platforms, we achieve a balance of functionality, cost, and developer experience.
