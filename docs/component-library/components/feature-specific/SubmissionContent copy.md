# SubmissionContent Component

## Overview
The SubmissionContent component is a React component that displays the content of a submission in a grading system. It provides a structured view of submission details including text content, attachments, activity instructions, and previous grades if available.

## Import
```tsx
import { SubmissionContent } from '@/components/grading/SubmissionContent';
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| submission | Submission | Yes | The submission object containing all submission details |

### Submission Type Definition
```typescript
interface Submission {
  student?: {
    name: string;
  };
  submittedAt: Date;
  content?: string;
  attachments?: Attachment[];
  activity?: {
    content?: string;
  };
  grade?: {
    score: number;
    maxScore: number;
    percentage: number;
    gradedBy?: {
      name: string;
    };
    gradedAt?: Date;
    feedback?: string;
  };
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string; // MIME type
  size: number; // in bytes
}
```

## Features

### 1. Submission Information
- Displays student name and submission timestamp
- Shows submission text content if available

### 2. File Attachments
- Supports multiple file types with appropriate icons:
  - Images
  - Videos
  - Audio files
  - PDF documents
  - Other document types
- Shows file name and size
- Provides download functionality

### 3. Activity Instructions
- Displays the original activity instructions if available

### 4. Previous Grade Information
- Shows score and percentage
- Displays grader information
- Includes grading timestamp
- Shows feedback if provided

## Accessibility

- Uses semantic HTML elements (h2, h3, h4 for headings)
- Includes proper ARIA attributes for interactive elements
- Provides clear visual hierarchy through consistent styling
- Ensures proper color contrast for text elements
- Implements keyboard-navigable interface

## Usage Example

```tsx
import { SubmissionContent } from '@/components/grading/SubmissionContent';

const ExampleSubmission = () => {
  const submission = {
    student: {
      name: 'John Doe'
    },
    submittedAt: new Date(),
    content: 'This is my submission text',
    attachments: [
      {
        id: '1',
        name: 'assignment.pdf',
        url: '/files/assignment.pdf',
        type: 'application/pdf',
        size: 1024000
      }
    ],
    grade: {
      score: 85,
      maxScore: 100,
      percentage: 85,
      gradedBy: {
        name: 'Professor Smith'
      },
      gradedAt: new Date(),
      feedback: 'Great work!'
    }
  };

  return <SubmissionContent submission={submission} />;
};
```

## Styling

The component uses a dedicated CSS module for styling. Key style features include:

- Clean, modern design with consistent spacing
- Responsive layout that adapts to different screen sizes
- Visual feedback for interactive elements
- Clear typography hierarchy
- Subtle animations for hover states

## Technical Considerations

### Performance
- Efficiently handles large text content
- Lazy loads file icons based on MIME types
- Optimized rendering for multiple attachments

### Error Handling
- Gracefully handles missing or null values
- Provides fallbacks for unsupported file types
- Validates submission data structure

## Dependencies

- React
- TypeScript
- date-fns (for date formatting)

## Version Compatibility

| Version | React | TypeScript |
|---------|-------|------------|
| 1.0.0   | ≥16.8 | ≥4.0      |

## Changelog

### 1.0.0
- Initial release
- Basic submission display functionality
- File attachment support
- Grading information display