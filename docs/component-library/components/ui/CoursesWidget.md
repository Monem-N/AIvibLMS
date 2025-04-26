# CoursesWidget

## Introduction

The **CoursesWidget** component is a dashboard widget in the Hypatia Modern LMS that displays a user's courses. It provides filtering options to view all courses, active courses, or completed courses. The widget also supports refreshing the course list and links to the full courses page.

## Description

This component accepts an array of course objects and renders them with filtering options. It handles loading and error states during refresh and displays a friendly message when no courses are available.

## Features

1. Displays courses with filtering by status (all, active, completed).
2. Refresh button to reload courses.
3. Shows progress bars for course completion.
4. Responsive layout with CSS grid and flexbox.
5. Links to detailed course pages and browse courses.

## Usage

```tsx
import CoursesWidget from 'src/components/dashboard/widgets/CoursesWidget';

const courses = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React.',
    status: 'published',
    progress: 45,
    startDate: '2023-01-01',
    endDate: '2023-03-01',
  },
  // more courses...
];

<CoursesWidget courses={courses} />
```

## Props

| Prop      | Type                 | Default | Required | Description                                  |
|-----------|----------------------|---------|----------|----------------------------------------------|
| courses   | Course[]             | -       | Yes      | Array of course objects to display           |
| className | string               | ''      | No       | Optional additional CSS class for the widget |

## Accessibility

The component uses semantic HTML elements and ARIA roles where appropriate. Filter buttons are keyboard accessible, and links are navigable via keyboard. Color contrast in badges and buttons meets WCAG AA standards.

## Technical Debt

No known technical debt at this time.

## Version Compatibility

Compatible with React 17+ and TypeScript 4+.

## Edge Cases

- Displays a friendly message and browse link when no courses are available.
- Handles loading and error states during refresh.
- Gracefully handles missing or incomplete course data (e.g., missing dates).

## Implementation Details

The component uses React functional components with hooks (`useState`) for state management. It filters courses based on status: all, active (published), completed (archived). It includes a nested `CourseCard` component for individual course display. The layout is styled with CSS grid and flexbox for responsiveness. A progress bar visually indicates course completion percentage.

## Related Components

- [DashboardWidget](./DashboardWidget.md) - Wrapper component providing common dashboard widget UI.
- [MessagesWidget](./MessagesWidget.md) - Another dashboard widget component.

## Examples

### Basic Example

```tsx
<CoursesWidget courses={courses} />
```

### Advanced Example

```tsx
<CoursesWidget courses={courses} className="custom-widget" />
```

## Edge Case Descriptions

- When no courses are provided, the widget displays a message and a link to browse courses.
- If the refresh operation fails, an error message is shown.
- Courses with missing dates display "N/A" for those dates.

## Interactive Examples

<!-- Add Storybook link here -->
