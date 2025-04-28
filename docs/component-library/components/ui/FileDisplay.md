# FileDisplay

## Description

The `FileDisplay` component provides a reusable interface for displaying files from Supabase Storage. It supports different file types (images, audio, video, documents) and provides appropriate rendering for each type.

This component is part of the hybrid Firebase/Supabase architecture, where Supabase is used for file storage while Firebase handles authentication and database operations.

## Usage

```tsx
import FileDisplay from 'components/common/FileDisplay';

<FileDisplay
  url="https://example.com/file.pdf"
  fileName="Course Material"
  fileType="application/pdf"
  showPreview={true}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| url | string | - | Yes | URL of the file to display |
| fileName | string | - | No | Name of the file to display |
| fileType | string | - | No | MIME type of the file (auto-detected from URL if not provided) |
| showPreview | boolean | true | No | Whether to show a preview of the file |
| width | string \| number | '100%' | No | Width of the preview |
| height | string \| number | 'auto' | No | Height of the preview |

## Examples

### Image Display

```tsx
<FileDisplay
  url="https://example.com/image.jpg"
  fileName="Profile Picture"
  fileType="image/jpeg"
  showPreview={true}
  width={200}
  height={200}
/>
```

### PDF Display

```tsx
<FileDisplay
  url="https://example.com/document.pdf"
  fileName="Course Syllabus"
  fileType="application/pdf"
  showPreview={true}
/>
```

### Audio Display

```tsx
<FileDisplay
  url="https://example.com/lecture.mp3"
  fileName="Lecture Recording"
  fileType="audio/mpeg"
  showPreview={true}
/>
```

## Implementation Details

The `FileDisplay` component:

1. Determines the file type from the URL or provided fileType prop
2. Renders an appropriate preview based on the file type
3. Provides a download link for the file
4. Shows file metadata (name, type, etc.)

The component supports the following file types:
- Images (jpg, jpeg, png, gif, webp, svg)
- Audio (mp3, wav, ogg, aac)
- Video (mp4, webm, ogv, mov)
- PDF documents
- Other file types (generic file icon)

## Accessibility

- Images have appropriate alt text
- Audio and video elements have proper controls
- The component meets color contrast requirements
- Download links are properly labeled
- The component is keyboard navigable

## Edge Cases

- **Unsupported File Types**: The component shows a generic file icon for unsupported file types
- **Missing File Name**: The component extracts the file name from the URL if not provided
- **Loading Errors**: The component handles loading errors gracefully
- **Large Files**: The component optimizes preview rendering for large files
- **CORS Issues**: The component handles CORS issues with appropriate error messages

## Related Components

- [FileUpload](./FileUpload.md): Component for uploading files to Supabase Storage
- [HybridInitializer](../core/HybridInitializer.md): Initializes Supabase Storage used by this component
