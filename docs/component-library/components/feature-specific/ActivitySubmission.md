# ActivitySubmission

The ActivitySubmission component handles student submissions for assignments and quizzes in the Hypatia LMS, providing:

- Text entry field for written responses
- File upload capabilities
- Submission history tracking
- Status feedback (pending/graded)
- Resubmission functionality

## Description

The ActivitySubmission component manages all aspects of student submissions including:

- Multi-format input (text, files, or both)
- Validation of submission content
- Integration with Redux for state management
- Notification system integration for user feedback
- Historical submission tracking with grades/feedback

```tsx
import { ActivitySubmission } from '../../components/activities/ActivitySubmission';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| activity | Activity | - | Yes | The activity being submitted (contains due dates, requirements, submissions history) |
| courseId | string | - | Yes | Current course context identifier |
| moduleId | string | - | Yes | Parent module identifier for navigation |

## Features

1. **Multi-type Submission Support**  
   - Text entry with markdown support  
   - File upload (multiple files, various formats)  
   - Combined text + file submissions  

2. **Submission Management**  
   - Draft autosave every 2 minutes  
   - File size validation (max 25MB total)  
   - Submission attempt limiting  

3. **Feedback System**  
   - Visual status indicators (pending/graded)  
   - Historical submission comparison  
   - Instructor feedback display  

## Accessibility

### Accessibility Considerations

- **Keyboard Navigation:** Full tab navigation through form elements  
- **Screen Reader Support:**  
  - ARIA labels for file upload controls  
  - Status alerts for submission outcomes  
- **Color Contrast:** 4.5:1 minimum ratio maintained  
- **ARIA Attributes:**  

  ```tsx
  <input 
    aria-label="File upload"
    role="region" 
    aria-labelledby="submission-heading"
  />
  ```

## Examples

### Basic Example

```tsx
function SubmissionExample() {
  return (
    <ActivitySubmission 
      activity={demoActivity}
      courseId="math-101" 
      moduleId="algebra-basics"
    />
  );
}
```

### Advanced Example with File Restrictions

```tsx
function RestrictedSubmission() {
  const restrictedActivity = {
    ...demoActivity,
    allowedFormats: ['pdf', 'docx'],
    maxFileSize: 10 * 1024 * 1024 // 10MB
  };

  return (
    <ActivitySubmission 
      activity={restrictedActivity}
      courseId="cs-201" 
      moduleId="oop-principles"
    />
  );
}
```

## Edge Cases

### Common Edge Cases

1. **Late Submissions**  
   - Visual indicator for overdue assignments  
   - Disabled submission after hard deadlines  

2. **Large File Handling**  
   - Progressive upload with cancellation  
   - Network interruption recovery  

3. **Empty Submissions**  
   - Client-side validation prevents blank submissions  
   - Clear error messaging  

## Implementation Details

### Component Structure

```tsx
function ActivitySubmission({ activity, courseId, moduleId }: Props) {
  // State management
  const [submissionText, setSubmissionText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  
  // Redux integration
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification();

  // Submission handler
  const handleSubmit = async (e) => {
    // Validation and submission logic
  }
}
```

### Key CSS Features

```css
/* Submission form container */
.submission-form {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* File upload area */
.file-uploader {
  border: 2px dashed var(--color-border);
  padding: 1.5rem;
  text-align: center;
  transition: border-color 0.3s ease;
}

/* Submission history timeline */
.submission-history {
  border-left: 3px solid var(--color-primary);
  padding-left: 1.5rem;
  margin-top: 2rem;
}
```

## Related Components

### Connected Components

- [GradeDisplay](../data/GradeDisplay.md) - Displays submission grades  
- [FilePreview](../ui/FilePreview.md) - Handles file previews  
- [NotificationSystem](../ui/NotificationSystem.md) - Manages user notifications  

## Technical Debt

1. **Mobile Responsiveness** - Needs better mobile layout optimization  
2. **Progress Indicators** - Missing file upload progress visualization  
3. **Autosave Configuration** - Hardcoded 2-minute autosave interval  

## Version Compatibility

| LMS Version | Component Version | Status     | Notes                  |
|-------------|-------------------|------------|------------------------|
| 2.4+        | 1.2               | Supported  | Full functionality     |
| 2.0-2.3     | 0.9               | Deprecated | Limited file support   |

## Interactive Examples

[View in Storybook](http://storybook.hypatia-lms.dev/?path=/docs/components-activities-activitysubmission--basic-usage)
