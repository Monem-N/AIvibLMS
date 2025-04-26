# SubmissionHeader Component Documentation

## Introduction
The SubmissionHeader component displays critical submission metadata and navigation controls for the grading interface in the Hypatia LMS. It provides contextual information about the student submission being reviewed and maintains breadcrumb navigation back to parent views.

## Visual Examples
![SubmissionHeader Screenshot](/static/img/components/submission-header.png)

## Import & Usage
```tsx
import SubmissionHeader from '../../src/components/grading/SubmissionHeader';

// Usage in parent component
<SubmissionHeader 
  submission={activeSubmission}
  courseId={selectedCourse.id}
/>
```

## Props & Types
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| submission | Submission | Yes | - | Submission object containing metadata |
| courseId | string | Yes | - | ID of the current course |

Submission Type Definition:
```ts
interface Submission {
  id: string;
  student: {
    id: string;
    name: string;
  };
  activity: {
    id: string;
    title: string;
    points?: number;
  };
  module?: {
    id: string;
    title: string;
  };
  submittedAt: Date;
  status: 'draft' | 'submitted' | 'graded' | 'returned';
}
```

## Accessibility
- Uses semantic HTML structure with ARIA landmarks
- Breadcrumbs implemented with nav/ol/li structure
- Status badges use high-contrast color combinations
- Responsive layout maintains readability at all screen sizes
- Keyboard navigation supported through focus states

## Code Examples
### Basic Usage
```tsx
const exampleSubmission = {
  id: 'sub_123',
  student: { id: 'stu_456', name: 'John Doe' },
  activity: { id: 'act_789', title: 'Algebra Final Exam', points: 100 },
  submittedAt: new Date('2025-04-25T14:30:00Z'),
  status: 'graded'
};

<SubmissionHeader 
  submission={exampleSubmission}
  courseId="math_101"
/>
```

## Technical Debt Report
- TODO: Implement loading states for async data
- TODO: Add prop-type validation
- REFACTOR: Consider extracting Breadcrumbs to shared component
- LIMITATION: Does not support bulk grading workflows

## Version Compatibility
| React | TypeScript | Hypatia Core |
|-------|------------|--------------|
| 18.2+ | 4.9+       | 2.1+         |

## Related Components
- SubmissionsList
- GradingForm
- CourseHeader
