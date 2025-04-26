# ActivityFeedback Component Documentation

## Introduction and Description
The `ActivityFeedback` component displays feedback and grades for an activity within the Hypatia LMS platform. It provides a visual summary of the grade, including percentage, letter grade, score details, grader information, graded date, and instructor feedback.

## Visual Examples
<!-- Add screenshots or GIFs demonstrating the component here -->

## Import and Usage

```tsx
import ActivityFeedback from 'hypatia-modern/src/components/activities/ActivityFeedback';

<ActivityFeedback grade={grade} />
```

## Props and Type Definitions

### Props

| Prop  | Type  | Description                          |
|-------|-------|------------------------------------|
| grade | Grade | The grade object containing score, maxScore, percentage, letter grade, feedback, graded date, and grader info |

### Grade Interface

```ts
interface Grade {
  score: number;
  maxScore: number;
  percentage: number;
  letter?: string;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: {
    id: string;
    name: string;
  };
}
```

## Comprehensive Examples

```tsx
const exampleGrade = {
  score: 85,
  maxScore: 100,
  percentage: 85,
  letter: 'B',
  feedback: 'Good work, but room for improvement.',
  gradedAt: '2024-06-01T14:30:00Z',
  gradedBy: {
    id: 'instructor123',
    name: 'Dr. Smith',
  },
};

<ActivityFeedback grade={exampleGrade} />
```

## Features
- Color-coded grade circle based on percentage.
- Displays letter grade, score, and max score.
- Shows grader's name and graded date if available.
- Displays instructor feedback text.
- Responsive design for different screen sizes.

## Accessibility Considerations
- Semantic HTML elements used for headings and sections.
- Text content is clear and readable.
- Color contrast meets accessibility standards for grade colors.

## Edge Cases
- Handles missing letter grade by calculating from percentage.
- Gracefully handles missing graded date or grader information.
- Displays feedback section only if feedback text is provided.

## Implementation Details

### TypeScript (ActivityFeedback.tsx)

```tsx
// See hypatia-modern/src/components/activities/ActivityFeedback.tsx for full source code
```

### CSS (ActivityFeedback.css)

```css
/* See hypatia-modern/src/components/activities/ActivityFeedback.css for full styles */
```

## Related Components
- Other activity-related components in `hypatia-modern/src/components/activities/`

## Interactive Examples
<!-- Add links or embeds for interactive examples if available -->

## Changelog
- Initial documentation created on 2024-06-XX.

## Technical Debt
- No known technical debt specific to this component.
