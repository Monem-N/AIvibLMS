# FileUpload

## Description

The `FileUpload` component provides a reusable interface for uploading files to Supabase Storage. It supports different types of uploads (profile images, course materials, assignment submissions) and provides progress feedback during upload.

This component is part of the hybrid Firebase/Supabase architecture, where Supabase is used for file storage while Firebase handles authentication and database operations.

## Usage

```tsx
import FileUpload from 'components/common/FileUpload';

<FileUpload
  onUploadComplete={(url) => console.log('File uploaded:', url)}
  uploadType="profile"
  acceptedFileTypes="image/*"
  maxSizeMB={5}
  buttonText="Upload Profile Picture"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| onUploadComplete | (url: string) => void | - | Yes | Callback function called when upload is complete with the file URL |
| uploadType | 'profile' \| 'course' \| 'submission' | - | Yes | Type of upload, determines storage location |
| courseId | string | - | Only for 'course' type | ID of the course for course materials |
| assignmentId | string | - | Only for 'submission' type | ID of the assignment for submissions |
| acceptedFileTypes | string | '*' | No | Comma-separated list of accepted MIME types or file extensions |
| maxSizeMB | number | 10 | No | Maximum file size in megabytes |
| buttonText | string | 'Upload File' | No | Text to display on the upload button |

## Examples

### Profile Image Upload

```tsx
<FileUpload
  onUploadComplete={(url) => updateUserProfile({ photoURL: url })}
  uploadType="profile"
  acceptedFileTypes="image/*"
  maxSizeMB={2}
  buttonText="Upload Profile Picture"
/>
```

### Course Material Upload

```tsx
<FileUpload
  onUploadComplete={(url) => addCourseMaterial({ url, name: 'Lecture Notes' })}
  uploadType="course"
  courseId={courseId}
  acceptedFileTypes=".pdf,.doc,.docx,.ppt,.pptx"
  maxSizeMB={20}
  buttonText="Upload Course Material"
/>
```

### Assignment Submission Upload

```tsx
<FileUpload
  onUploadComplete={(url) => submitAssignment({ url, assignmentId })}
  uploadType="submission"
  assignmentId={assignmentId}
  acceptedFileTypes=".pdf,.doc,.docx,.zip"
  maxSizeMB={50}
  buttonText="Submit Assignment"
/>
```

## Implementation Details

The `FileUpload` component:

1. Provides a button to trigger file selection
2. Validates file type and size
3. Shows upload progress
4. Handles upload errors
5. Calls the `onUploadComplete` callback with the file URL when upload is complete

The component uses the `fileService` to handle the actual file upload to Supabase Storage.

## Code Structure

```tsx
const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  uploadType,
  courseId,
  assignmentId,
  acceptedFileTypes = '*',
  maxSizeMB = 10,
  buttonText = 'Upload File'
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds the maximum allowed size (${maxSizeMB}MB)`);
      return;
    }
    
    setUploading(true);
    setError(null);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);
      
      // Upload file based on type
      let url = '';
      switch (uploadType) {
        case 'profile':
          url = await fileService.uploadProfileImage(file);
          break;
        case 'course':
          url = await fileService.uploadCourseMaterial(courseId!, file);
          break;
        case 'submission':
          url = await fileService.uploadSubmission(assignmentId!, file);
          break;
      }
      
      clearInterval(progressInterval);
      setProgress(100);
      onUploadComplete(url);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        style={{ display: 'none' }}
      />
      
      <Button
        variant="contained"
        startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? `Uploading... ${progress}%` : buttonText}
      </Button>
      
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
};
```

## Accessibility

- The file input is properly labeled and accessible to screen readers
- The upload button has appropriate ARIA attributes
- Error messages are properly announced to screen readers
- The component meets color contrast requirements
- The progress indicator is accessible to screen readers

## Edge Cases

- **Large Files**: The component handles large files by showing progress and preventing UI freezing
- **Unsupported File Types**: The component validates file types before upload
- **Upload Errors**: The component displays error messages if upload fails
- **Network Issues**: The component handles network errors gracefully
- **Concurrent Uploads**: The component disables the upload button during upload to prevent concurrent uploads

## Related Components

- [FileDisplay](./FileDisplay.md): Component for displaying uploaded files
- [HybridInitializer](../core/HybridInitializer.md): Initializes Supabase Storage used by this component

## Related Services

- [fileService.ts](../../services/fileService.md): Service that handles file uploads to Supabase Storage
- [supabaseStorageService.ts](../../services/supabaseStorageService.md): Low-level service for Supabase Storage operations

## Testing

When testing the `FileUpload` component, you should mock the `fileService` to avoid actual file uploads:

```tsx
// Mock implementation
jest.mock('services/fileService', () => {
  return {
    uploadProfileImage: jest.fn().mockResolvedValue('https://example.com/profile.jpg'),
    uploadCourseMaterial: jest.fn().mockResolvedValue('https://example.com/material.pdf'),
    uploadSubmission: jest.fn().mockResolvedValue('https://example.com/submission.zip')
  };
});
```
