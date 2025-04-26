# SubmissionContent Component Documentation

## Introduction

A modern component for displaying submission content including text, attachments, and activity instructions. Provides a rich interface for viewing student submissions with file type-specific icons and formatting.

## Visual Examples

```jsx
// Example of SubmissionContent with text and attachments
<SubmissionContent 
  submission={{
    content: "This is my assignment submission",
    attachments: [
      { name: "report.pdf", size: 1024576, type: "application/pdf" },
      { name: "presentation.pptx", size: 2048576, type: "application/vnd.ms-powerpoint" }
    ]
  }}
/>
```

## Props

```typescript
interface Attachment {
  name: string;       // File name with extension
  size: number;       // File size in bytes
  type: string;       // MIME type of the file
  url?: string;       // Optional download URL
  preview?: string;   // Optional preview URL for images
}

interface Submission {
  content: string;              // Text content of the submission
  attachments?: Attachment[];   // Array of attached files
  activityInstructions?: string; // Original activity instructions
  submittedAt: Date;           // Submission timestamp
  status: 'draft' | 'submitted' | 'graded'; // Current status
}

interface SubmissionContentProps {
  submission: Submission;      // Submission object containing content and attachments
  onDownload?: (attachment: Attachment) => void; // Optional download handler
  showInstructions?: boolean;  // Whether to display activity instructions
  className?: string;         // Optional CSS class name
}
```

## Features

- File attachment display with type-specific icons
- File size formatting
- Activity instructions rendering
- Downloadable attachments
- Support for multiple file types (image, video, audio, PDF, etc.)
- Clean and organized content layout

## Accessibility

- Semantic HTML structure with proper headings
- ARIA attributes for interactive elements
- Clear visual hierarchy
- Keyboard-navigable attachment links
- Screen reader friendly file information
- High contrast icons and text

## Usage

```jsx:Usage Example
import SubmissionContent from '../../components/grading/SubmissionContent';

function GradingView({ submission }) {
  return (
    <div className="grading-container">
      <SubmissionContent submission={submission} />
    </div>
  );
}
```

## Implementation Details

**Key Functions:**

- `formatFileSize`: Converts bytes to human-readable file sizes
- `getFileIcon`: Returns appropriate SVG icon based on file MIME type
- `renderAttachments`: Displays list of submission attachments
- `renderActivityInstructions`: Shows activity instructions if available

**File Type Support:**

- Images (image/*)
- Videos (video/*)
- Audio (audio/*)
- PDF (application/pdf)
- Generic documents (fallback)

## Edge Cases

- Empty or missing attachments handled gracefully
- Missing activity instructions managed appropriately
- Large file size formatting
- Various MIME type handling
- Secure file downloads with proper attributes

## Related Components

- [GradingView](/grading/GradingView.md)
- [SubmissionList](/grading/SubmissionList.md)
- [ActivityInstructions](/activities/ActivityInstructions.md)

## Version Compatibility

| Hypatia LMS | React | File Service |
|-------------|-------|---------------|
| 2.4+        | 18+   | v2.0+         |

**Dependencies:**

- [dateUtils](/utils/dateUtils.ts)
- CSS Modules
- SVG Icons Library
