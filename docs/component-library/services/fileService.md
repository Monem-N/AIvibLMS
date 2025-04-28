# fileService

## Description

The `fileService` is a service that provides methods for file operations using Supabase Storage, while integrating with Firebase for authentication and user management. It implements the hybrid approach where Firebase is used for authentication and database operations, while Supabase is used for file storage.

## Usage

```tsx
import { 
  uploadProfileImage, 
  uploadCourseMaterial, 
  uploadSubmission 
} from 'services/fileService';

// Upload a profile image
const imageUrl = await uploadProfileImage(file);

// Upload a course material
const materialUrl = await uploadCourseMaterial(courseId, file);

// Upload a submission
const submissionUrl = await uploadSubmission(assignmentId, file);
```

## API

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| uploadProfileImage | file: File | Promise<string> | Uploads a profile image and returns the public URL |
| uploadCourseMaterial | courseId: string, file: File, fileName?: string | Promise<string> | Uploads a course material and returns the public URL |
| uploadSubmission | assignmentId: string, file: File | Promise<string> | Uploads a submission and returns the public URL |
| listCourseMaterials | courseId: string | Promise<Array<Object>> | Lists all course materials for a course |
| deleteFile | bucket: string, path: string | Promise<void> | Deletes a file from Supabase Storage |

## Examples

### Upload a Profile Image

```tsx
import { uploadProfileImage } from 'services/fileService';

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

### Upload a Course Material

```tsx
import { uploadCourseMaterial } from 'services/fileService';

const handleFileUpload = async (file, courseId) => {
  try {
    const fileUrl = await uploadCourseMaterial(courseId, file);
    // Add the file to the course materials
    await addCourseMaterial(courseId, {
      name: file.name,
      url: fileUrl,
      type: file.type,
      size: file.size,
      uploadedAt: new Date()
    });
  } catch (error) {
    console.error('Error uploading course material:', error);
  }
};
```

### List Course Materials

```tsx
import { listCourseMaterials } from 'services/fileService';

const fetchCourseMaterials = async (courseId) => {
  try {
    const materials = await listCourseMaterials(courseId);
    return materials;
  } catch (error) {
    console.error('Error listing course materials:', error);
    return [];
  }
};
```

## Implementation Details

The `fileService` uses Supabase Storage for file operations while getting the current user ID from Firebase Authentication:

```tsx
// Get the current user ID from Firebase
const getCurrentUserId = (): string => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  return user.uid;
};

// Upload a profile image
export const uploadProfileImage = async (file: File): Promise<string> => {
  try {
    const userId = getCurrentUserId();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload to Supabase
    await supabaseStorage.uploadFile(
      supabaseStorage.BUCKETS.PROFILE_IMAGES,
      filePath,
      file,
      { userId }
    );
    
    // Get the public URL
    const publicUrl = supabaseStorage.getPublicUrl(
      supabaseStorage.BUCKETS.PROFILE_IMAGES,
      filePath
    );
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};
```

## Edge Cases

- **Authentication**: The service checks if the user is authenticated before performing file operations.
- **File Types**: The service handles different file types appropriately.
- **Error Handling**: The service provides meaningful error messages for different error scenarios.
- **Large Files**: The service handles large files efficiently.

## Related Services

- [hybridService](./hybridService.md): Service that initializes and exports both Firebase and Supabase services
- [supabaseStorageService](./supabaseStorageService.md): Low-level service for Supabase Storage operations

## Related Components

- [FileUpload](../components/ui/FileUpload.md): Component that uses this service for file uploads
- [FileDisplay](../components/ui/FileDisplay.md): Component that displays files uploaded using this service
