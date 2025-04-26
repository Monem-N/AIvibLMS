# SubmissionGraderModern

The SubmissionGraderModern component is used in the Hypatia LMS for grading student submissions and providing feedback.

## Introduction

The `SubmissionGraderModern` component is a key part of the grading workflow in the Hypatia LMS. It allows instructors to review and grade student submissions efficiently, providing a seamless user experience.

## Features List (Refined)

1. **Submission Details**: Displays the content and attachments of student submissions.
2. **Grading Form**: Allows instructors to assign grades and provide feedback.
3. **Error Handling**: Handles loading, error, and "not found" states gracefully.
4. **Role-Based Access**: Ensures only authorized users can access grading functionality.
5. **Accessibility**: Includes ARIA roles, keyboard navigation, and screen reader support.

## Technical Debt

Refer to the [Technical Debt Report](../../technical-debt/SubmissionGraderModern-technical-debt.md) for known issues and recommendations.

## Version Compatibility

Refer to the [Version Compatibility Matrix](../../version-compatibility/SubmissionGraderModern-version-compatibility.md) for supported React and TypeScript versions.

## Detailed Description (Finalized)

The `SubmissionGraderModern` component is designed to streamline the grading process for instructors. It integrates with the Hypatia LMS to fetch submission data, display submission details, and provide a user-friendly interface for assigning grades and feedback. The component ensures secure access through role-based authentication and handles various states, such as loading, errors, and empty submissions.

## Props Table (Refined)

| Prop          | Type               | Default | Required | Description                                      |
|---------------|--------------------|---------|----------|--------------------------------------------------|
| courseId      | string             | -       | Yes      | The ID of the course to which the submission belongs. |
| submissionId  | string             | -       | Yes      | The ID of the submission to be graded.          |
| onGradeSubmit | (grade: number) => void | -       | No       | Callback function triggered when a grade is submitted. |
| className     | string             | -       | No       | Additional CSS class names.                     |

## Usage (Refined)

### Import Statement

```tsx
import SubmissionGraderModern from 'components/grading/SubmissionGraderModern';
```

### Basic Usage Example

```tsx
<SubmissionGraderModern courseId="course-123" submissionId="submission-456" />
```

### Advanced Usage Example

```tsx
<SubmissionGraderModern 
  courseId="course-123" 
  submissionId="submission-456" 
  onGradeSubmit={(grade) => console.log(`Grade submitted: ${grade}`)}
  className="custom-class"
/>
```

### Example with Context

```tsx
<AuthProvider>
  <NotificationProvider>
    <SubmissionGraderModern courseId="course-123" submissionId="submission-456" />
  </NotificationProvider>
</AuthProvider>
```

## Accessibility

- **Keyboard Navigation**: Fully navigable using keyboard shortcuts.
- **Screen Reader Support**: Includes ARIA roles and labels for all interactive elements.
- **Color Contrast**: Ensures sufficient contrast for text and UI elements.
- **Focus Management**: Proper focus handling for modal dialogs and form elements.

## Edge Cases

- **Invalid Submission ID**: Displays an error message if the submission ID is invalid.
- **Network Errors**: Shows a retry option when network errors occur.
- **Empty Submission**: Handles cases where the submission has no content or attachments.

## Implementation Details

```tsx
// Simplified implementation
import React from 'react';

export const SubmissionGraderModern: React.FC<{ courseId: string; submissionId: string; onGradeSubmit?: (grade: number) => void; className?: string }> = ({
  courseId,
  submissionId,
  onGradeSubmit,
  className,
}) => {
  // Fetch submission data and handle grading logic
  return (
    <div className={className}>
      {/* Render submission details and grading form */}
    </div>
  );
};
```

## Related Components

- [GradingForm](./GradingForm.md): Used for submitting grades and feedback.
- [SubmissionHeader](./SubmissionHeader.md): Displays metadata about the submission.
- [SubmissionContent](./SubmissionContent.md): Renders the content and attachments of the submission.

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-submissiongradermodern--basic).

## Changelog

| Version | Changes                     |
|---------|-----------------------------|
| 1.0.0   | Initial implementation      |
| 1.1.0   | Added onGradeSubmit prop    |
| 1.2.0   | Improved accessibility      |
