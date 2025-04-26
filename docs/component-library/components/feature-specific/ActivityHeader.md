# ActivityHeader

The ActivityHeader component is used in the Hypatia LMS for displaying the header section of an activity page, including title, metadata, navigation, and action buttons.

## Description

The ActivityHeader component provides a consistent header for all activity types in the learning management system. It displays the activity title, description, type, points, due date, status, and navigation breadcrumbs. It also includes action buttons such as "Back to Course" and conditionally shows a "Download" button for content-type activities. This component serves as the primary navigation and context provider for users when viewing an activity.

## Visual Examples

### Basic Activity Header

<!-- Note: Replace with actual screenshot when available -->
![Basic Activity Header](https://via.placeholder.com/800x200?text=Basic+Activity+Header)

Standard header for an assignment activity showing title, description, and metadata

### Content Activity Header with Download Button

<!-- Note: Replace with actual screenshot when available -->
![Content Activity Header](https://via.placeholder.com/800x200?text=Content+Activity+Header)

Header for a content activity showing the download button

### Completed Activity Header

<!-- Note: Replace with actual screenshot when available -->
![Completed Activity Header](https://via.placeholder.com/800x200?text=Completed+Activity+Header)

Header showing a completed activity with success status badge

## Import

```tsx
import { ActivityHeader } from 'components/activities/ActivityHeader';
```

Note: The actual import in code is:

```tsx
import ActivityHeader from 'components/activities/ActivityHeader';
```

## Usage

```tsx
import ActivityHeader from 'components/activities/ActivityHeader';
import { Activity } from 'types/course';

// Example activity object
const activity: Activity = {
  id: 'activity-123',
  title: 'Introduction to React Hooks',
  description: 'Learn about React Hooks and how to use them in your applications.',
  type: 'assignment',
  status: 'not-started',
  dueDate: '2023-12-31T23:59:59Z',
  points: 100,
  moduleId: 'module-123',
  moduleTitle: 'React Fundamentals',
  order: 1
};

// Basic usage
<ActivityHeader
  activity={activity}
  courseId="course-123"
  moduleId="module-123"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| activity | Activity | - | Yes | The activity object containing all activity data |
| courseId | string | - | Yes | The ID of the course the activity belongs to |
| moduleId | string | - | Yes | The ID of the module the activity belongs to |

## Type Definitions

```tsx
/**
 * ActivityHeader Props Interface
 */
interface ActivityHeaderProps {
  /**
   * The activity object containing all activity data
   */
  activity: Activity;

  /**
   * The ID of the course the activity belongs to
   */
  courseId: string;

  /**
   * The ID of the module the activity belongs to
   */
  moduleId: string;
}

/**
 * Activity Interface (from types/course.ts)
 */
interface Activity {
  id: string;
  title: string;
  description?: string;
  moduleId: string;
  courseId?: string;
  moduleTitle?: string;
  type: 'content' | 'assignment' | 'quiz' | 'discussion';
  content?: string;
  dueDate?: string;
  points?: number;
  order: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  submissions?: Submission[];
  attachments?: Attachment[];
  grade?: Grade;
  createdAt?: string;
  updatedAt?: string;
}
```

## Examples

### Basic Example

```tsx
import ActivityHeader from 'components/activities/ActivityHeader';

const activity = {
  id: 'activity-123',
  title: 'Introduction to React Hooks',
  description: 'Learn about React Hooks and how to use them in your applications.',
  type: 'assignment',
  status: 'not-started',
  dueDate: '2023-12-31T23:59:59Z',
  points: 100,
  moduleId: 'module-123',
  moduleTitle: 'React Fundamentals',
  order: 1
};

<ActivityHeader
  activity={activity}
  courseId="course-123"
  moduleId="module-123"
/>
```

### Content Activity Example

```tsx
import ActivityHeader from 'components/activities/ActivityHeader';

const contentActivity = {
  id: 'activity-456',
  title: 'React Hooks Documentation',
  description: 'Official documentation for React Hooks.',
  type: 'content',
  status: 'not-started',
  moduleId: 'module-123',
  moduleTitle: 'React Fundamentals',
  order: 2
};

<ActivityHeader
  activity={contentActivity}
  courseId="course-123"
  moduleId="module-123"
/>
```

### Completed Activity Example

```tsx
import ActivityHeader from 'components/activities/ActivityHeader';

const completedActivity = {
  id: 'activity-789',
  title: 'React Hooks Quiz',
  description: 'Test your knowledge of React Hooks.',
  type: 'quiz',
  status: 'completed',
  dueDate: '2023-12-31T23:59:59Z',
  points: 50,
  moduleId: 'module-123',
  moduleTitle: 'React Fundamentals',
  order: 3,
  grade: {
    score: 45,
    maxScore: 50,
    percentage: 90,
    letter: 'A',
    feedback: 'Great job!',
    gradedAt: '2023-12-30T14:30:00Z',
    gradedBy: {
      id: 'instructor-123',
      name: 'John Doe'
    }
  }
};

<ActivityHeader
  activity={completedActivity}
  courseId="course-123"
  moduleId="module-123"
/>
```

### With Router Context

```tsx
import { BrowserRouter } from 'react-router-dom';
import ActivityHeader from 'components/activities/ActivityHeader';

// The component uses react-router-dom's Link component internally,
// so it needs to be wrapped in a Router context when used in isolation
<BrowserRouter>
  <ActivityHeader
    activity={activity}
    courseId="course-123"
    moduleId="module-123"
  />
</BrowserRouter>
```

## Features

1. **Activity Title and Description**: Displays the activity title and description prominently
2. **Breadcrumb Navigation**: Shows the navigation path from course to module to activity
3. **Activity Type Indicator**: Displays the type of activity (content, assignment, quiz, discussion)
4. **Points Display**: Shows the point value for graded activities
5. **Due Date Information**: Displays the due date for activities with deadlines
6. **Status Badge**: Shows the current status of the activity (not started, in progress, completed)
7. **Back to Course Button**: Provides a quick way to return to the course page
8. **Download Button**: Conditionally shows a download button for content-type activities
9. **Responsive Design**: Adapts to different screen sizes with a responsive layout
10. **Accessibility Support**: Includes proper ARIA attributes and keyboard navigation

## Accessibility

The ActivityHeader component is designed with accessibility in mind to ensure all users, including those with disabilities, can navigate and understand activity content.

### Keyboard Navigation

- All interactive elements (links and buttons) are keyboard accessible
- The "Back to Course" button can be focused using the Tab key
- The "Download" button (when present) can be focused using the Tab key
- All buttons can be activated using the Enter or Space key
- Focus order follows the visual layout of the component

### Screen Reader Support

- The component uses semantic HTML elements for proper screen reader navigation
- The activity title is wrapped in an `<h1>` element for proper heading structure
- The activity type, points, and due date are announced to screen readers
- The status badge is announced with its current state

### ARIA Attributes

- The breadcrumb navigation uses `aria-label="Breadcrumb"` to identify its purpose
- The current page in the breadcrumb uses `aria-current="page"` to indicate the current location
- The status badge uses appropriate ARIA attributes based on its state
- The "Back to Course" button has a descriptive `aria-label`
- The "Download" button has a descriptive `aria-label` when present

### Color Contrast

- All text elements have sufficient contrast with their backgrounds
- The status badges use colors that meet contrast requirements
- The action buttons have sufficient contrast for both text and background
- Focus indicators are visible with high contrast

### Focus Management

- All interactive elements have visible focus indicators
- Focus styles are consistent with the application's design system
- Focus is not trapped within the component

## Edge Cases

- **Missing Description**: When an activity has no description, the component only displays the title without any empty space
- **Missing Due Date**: For activities without a due date, the due date section is not displayed
- **Missing Points**: For activities without points (like content activities), the points section is not displayed
- **Long Titles**: Long activity titles wrap to multiple lines while maintaining the component's layout
- **Different Activity Types**: The component displays different metadata based on the activity type
- **Status Variations**: The component handles different status values with appropriate badge styling
- **Missing Module Title**: If moduleTitle is not provided, the breadcrumb shows "Module" instead
- **RTL Support**: The component layout is mirrored in right-to-left languages
- **Mobile View**: On small screens, the layout adjusts to stack elements vertically

## Implementation Details

The ActivityHeader component is implemented using React with TypeScript. It uses React Router for navigation and utility functions for date formatting.

```tsx
// Simplified implementation
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../../types/course';
import { formatDate, isOverdue } from '../../utils/dateUtils';

// Import CSS
import './ActivityHeader.css';

interface ActivityHeaderProps {
  activity: Activity;
  courseId: string;
  moduleId: string;
}

const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  activity,
  courseId,
  moduleId
}) => {
  // Format due date
  const formattedDueDate = activity.dueDate
    ? formatDate(activity.dueDate, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
    : null;

  // Check if activity is overdue
  const overdue = activity.dueDate ? isOverdue(activity.dueDate) : false;

  // Get activity type icon
  const getActivityTypeIcon = () => {
    switch (activity.type) {
      case 'content':
        return <ContentIcon className="activity-icon content" />;
      case 'assignment':
        return <AssignmentIcon className="activity-icon assignment" />;
      case 'quiz':
        return <QuizIcon className="activity-icon quiz" />;
      case 'discussion':
        return <DiscussionIcon className="activity-icon discussion" />;
      default:
        return null;
    }
  };

  // Get activity status badge
  const getStatusBadge = () => {
    switch (activity.status) {
      case 'completed':
        return <span className="badge badge-success">Completed</span>;
      case 'in-progress':
        return <span className="badge badge-primary">In Progress</span>;
      case 'not-started':
        return <span className="badge badge-secondary">Not Started</span>;
      default:
        return null;
    }
  };

  // Format activity type
  const formatActivityType = (type: string) => {
    switch (type) {
      case 'content':
        return 'Content';
      case 'assignment':
        return 'Assignment';
      case 'quiz':
        return 'Quiz';
      case 'discussion':
        return 'Discussion';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className="activity-header">
      <div className="activity-header-top">
        <div className="activity-breadcrumbs" aria-label="Breadcrumb">
          <Link to={`/courses/${courseId}`} className="breadcrumb-link">
            Course
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/courses/${courseId}`} className="breadcrumb-link">
            {activity.moduleTitle || 'Module'}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current" aria-current="page">
            {activity.title}
          </span>
        </div>

        <div className="activity-actions">
          {activity.type === 'content' && (
            <button className="btn btn-outline" aria-label="Download content">
              <DownloadIcon />
              <span>Download</span>
            </button>
          )}

          <Link
            to={`/courses/${courseId}`}
            className="btn btn-outline"
            aria-label="Go back to course page"
          >
            <BackIcon />
            <span>Back to Course</span>
          </Link>
        </div>
      </div>

      <div className="activity-header-main">
        <div className="activity-type-icon">
          {getActivityTypeIcon()}
        </div>

        <div className="activity-info">
          <div className="activity-title-row">
            <h1 className="activity-title">{activity.title}</h1>
            {getStatusBadge()}
          </div>

          <div className="activity-meta">
            <div className="activity-type">
              {formatActivityType(activity.type)}
            </div>

            {activity.points !== undefined && (
              <div className="activity-points">
                <PointsIcon />
                <span>{activity.points} points</span>
              </div>
            )}

            {formattedDueDate && (
              <div className={`activity-due-date ${overdue ? 'overdue' : ''}`}>
                <ClockIcon />
                <span>
                  {overdue ? 'Due date passed: ' : 'Due: '}
                  {formattedDueDate}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {activity.description && (
        <div className="activity-description">
          <p>{activity.description}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityHeader;
```

### CSS Implementation

```css
/* Simplified ActivityHeader Component Styles */

.activity-header {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.activity-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.activity-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.breadcrumb-link {
  color: #4a90e2;
  text-decoration: none;
}

.breadcrumb-current {
  color: #666;
  font-weight: 500;
}

.activity-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.activity-header-main {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.activity-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.85rem;
}

.activity-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}

.activity-description {
  font-size: 1rem;
  line-height: 1.6;
}

/* Responsive styles */
@media (max-width: 768px) {
  .activity-header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .activity-header-main {
    flex-direction: column;
    gap: 1rem;
  }
}
```

## Related Components

- [ActivityDetailModern](./ActivityDetailModern.md): Parent component that contains ActivityHeader
- [ActivityContent](./ActivityContent.md): Often displayed below ActivityHeader to show the main content
- [ActivitySubmission](./ActivitySubmission.md): Often displayed below ActivityHeader for assignment and quiz activities
- [ActivityNavigation](./ActivityNavigation.md): Often displayed alongside ActivityHeader to provide navigation between activities
- [ActivityFeedback](./ActivityFeedback.md): Often displayed below ActivityHeader for graded activities

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-activityheader--default).

The Storybook examples demonstrate:

- Different activity types (content, assignment, quiz, discussion)
- Different status states (not started, in progress, completed)
- Activities with and without due dates
- Activities with and without points
- Activities with and without descriptions
- Responsive layout
- Overdue activities

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic activity header |
| 1.1.0 | Added status badges |
| 1.2.0 | Added activity type icons |
| 1.3.0 | Added responsive layout |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements |
| 2.2.0 | Added overdue status for due dates |

## Technical Debt

The ActivityHeader component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | SVG Icons | Uses inline SVG elements instead of an icon component system | Makes icon management and updates more difficult | Implement an icon component system | Low |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Attributes | Some elements lack proper ARIA attributes | Reduces accessibility for screen reader users | Add missing ARIA attributes | High |
| A-002 | Color Contrast | Some status badges may not meet contrast requirements | May be difficult to read for users with visual impairments | Ensure all colors meet WCAG AA contrast requirements | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Memoization | Add memoization to prevent unnecessary re-renders | Improves performance | Low | Low |
| RFO-002 | Icon System | Replace inline SVGs with an icon component system | Reduces bundle size and improves maintainability | Medium | Medium |

For a complete technical debt analysis, see the [ActivityHeader Technical Debt Report](../technical-debt/ActivityHeader-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [ActivityHeader Version Compatibility Matrix](./ActivityHeader-version-compatibility.md)
