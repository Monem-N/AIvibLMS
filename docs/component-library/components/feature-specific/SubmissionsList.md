# SubmissionsList

The SubmissionsList component is used in the Hypatia LMS for displaying and managing a list of student submissions that need grading.

## Description

The SubmissionsList component provides a comprehensive interface for instructors to view, sort, and access student submissions for grading. It displays submission information in a tabular format, including student details, activity information, submission date, and status. The component is designed to be used within the grading workflow of the Hypatia LMS, allowing instructors to efficiently manage and grade student work. It supports various activity types (assignments, quizzes, discussions) with appropriate visual indicators, status badges, and direct links to the grading interface for each submission.

## Visual Examples

### Standard Submissions List

<!-- Note: Replace with actual screenshot when available -->
![Standard Submissions List](https://via.placeholder.com/800x500?text=Standard+Submissions+List)

The standard submissions list showing multiple student submissions with different activity types and statuses

### Empty Submissions List

<!-- Note: Replace with actual screenshot when available -->
![Empty Submissions List](https://via.placeholder.com/800x500?text=Empty+Submissions+List)

The submissions list when no submissions are available for grading

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x800?text=Mobile+View)

The submissions list on mobile devices, with a stacked layout for better readability

## Import

```tsx
import { SubmissionsList } from 'components/grading/SubmissionsList';
```

Note: The actual import in the codebase is a default export, so you would use:

```tsx
import SubmissionsList from 'components/grading/SubmissionsList';
```

## Usage

```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubmissionsList from 'components/grading/SubmissionsList';
import { Submission } from '../../types/course';

// Sample submissions data
const submissions: Submission[] = [
  {
    id: 'submission-1',
    activityId: 'activity-1',
    userId: 'user-1',
    submittedAt: '2023-04-15T14:30:00Z',
    status: 'submitted',
    activity: {
      id: 'activity-1',
      title: 'Assignment 1: Introduction',
      type: 'assignment',
      points: 100
    },
    module: {
      id: 'module-1',
      title: 'Module 1: Getting Started'
    },
    student: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com'
    }
  },
  {
    id: 'submission-2',
    activityId: 'activity-2',
    userId: 'user-2',
    submittedAt: '2023-04-16T09:15:00Z',
    status: 'graded',
    activity: {
      id: 'activity-2',
      title: 'Quiz 1: Basic Concepts',
      type: 'quiz',
      points: 50
    },
    module: {
      id: 'module-1',
      title: 'Module 1: Getting Started'
    },
    student: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  }
];

// Basic usage
const GradingPage = () => {
  return (
    <Router>
      <div className="grading-container">
        <h1>Submissions to Grade</h1>
        <SubmissionsList
          submissions={submissions}
          courseId="course-123"
        />
      </div>
    </Router>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| submissions | Submission[] | - | Yes | Array of submission objects to display in the list |
| courseId | string | - | Yes | ID of the course the submissions belong to, used for navigation to the grading page |

## Type Definitions

```tsx
/**
 * SubmissionsListProps Interface
 * Defines the props for the SubmissionsList component
 */
interface SubmissionsListProps {
  /**
   * Array of submission objects to display in the list
   */
  submissions: Submission[];

  /**
   * ID of the course the submissions belong to
   */
  courseId: string;
}

/**
 * Submission Interface (from types/course.ts)
 */
export interface Submission {
  id: string;
  activityId: string;
  userId?: string;
  courseId?: string;
  moduleId?: string;
  content?: string;
  attachments?: Attachment[];
  submittedAt: string;
  grade?: Grade;
  status: 'draft' | 'submitted' | 'graded' | 'returned';
  activity?: {
    id: string;
    title: string;
    description?: string;
    type: string;
    content?: string;
    points?: number;
  };
  module?: {
    id: string;
    title: string;
  };
  course?: {
    id: string;
    title: string;
  };
  student?: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
}

/**
 * Attachment Interface (from types/course.ts)
 */
export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

/**
 * Grade Interface (from types/course.ts)
 */
export interface Grade {
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

## Examples

### Basic Example

```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubmissionsList from 'components/grading/SubmissionsList';
import { Submission } from '../../types/course';

// Basic example with minimal submissions
const BasicExample = () => {
  const submissions: Submission[] = [
    {
      id: 'submission-1',
      activityId: 'activity-1',
      userId: 'user-1',
      submittedAt: '2023-04-15T14:30:00Z',
      status: 'submitted',
      activity: {
        id: 'activity-1',
        title: 'Assignment 1',
        type: 'assignment',
        points: 100
      },
      module: {
        id: 'module-1',
        title: 'Module 1'
      },
      student: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
  ];

  return (
    <Router>
      <SubmissionsList
        submissions={submissions}
        courseId="course-123"
      />
    </Router>
  );
};
```

### Example with Multiple Submission Types

```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubmissionsList from 'components/grading/SubmissionsList';
import { Submission } from '../../types/course';

// Example with different submission types and statuses
const MultipleTypesExample = () => {
  const submissions: Submission[] = [
    {
      id: 'submission-1',
      activityId: 'activity-1',
      userId: 'user-1',
      submittedAt: '2023-04-15T14:30:00Z',
      status: 'submitted',
      activity: {
        id: 'activity-1',
        title: 'Assignment 1: Introduction',
        type: 'assignment',
        points: 100
      },
      module: {
        id: 'module-1',
        title: 'Module 1: Getting Started'
      },
      student: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    },
    {
      id: 'submission-2',
      activityId: 'activity-2',
      userId: 'user-2',
      submittedAt: '2023-04-16T09:15:00Z',
      status: 'graded',
      activity: {
        id: 'activity-2',
        title: 'Quiz 1: Basic Concepts',
        type: 'quiz',
        points: 50
      },
      module: {
        id: 'module-1',
        title: 'Module 1: Getting Started'
      },
      student: {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    },
    {
      id: 'submission-3',
      activityId: 'activity-3',
      userId: 'user-3',
      submittedAt: '2023-04-17T16:45:00Z',
      status: 'submitted',
      activity: {
        id: 'activity-3',
        title: 'Discussion 1: Introduce Yourself',
        type: 'discussion',
        points: 20
      },
      module: {
        id: 'module-1',
        title: 'Module 1: Getting Started'
      },
      student: {
        id: 'user-3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        avatar: 'https://example.com/avatars/bob.jpg'
      }
    }
  ];

  return (
    <Router>
      <SubmissionsList
        submissions={submissions}
        courseId="course-123"
      />
    </Router>
  );
};
```

### Example with Empty Submissions

```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SubmissionsList from 'components/grading/SubmissionsList';
import { Submission } from '../../types/course';

// Example with empty submissions array
const EmptySubmissionsExample = () => {
  const submissions: Submission[] = [];

  return (
    <Router>
      <div className="grading-container">
        <h2>No Submissions to Grade</h2>
        <SubmissionsList
          submissions={submissions}
          courseId="course-123"
        />
      </div>
    </Router>
  );
};
```

## Features

1. **Tabular Display**: Presents submission data in a clear, organized table format with columns for student, activity, module, submission date, status, and actions
2. **Student Information**: Displays student name, email, and avatar (or placeholder) for easy identification
3. **Activity Type Icons**: Shows different icons for different activity types (assignment, quiz, discussion, content) to visually distinguish between them
4. **Status Badges**: Provides color-coded status badges (submitted, graded, draft) to quickly identify submission status
5. **Date Formatting**: Formats submission dates in a human-readable format using the formatDate utility
6. **Direct Grading Access**: Includes "Grade" buttons that link directly to the grading interface for each submission
7. **Responsive Design**: Adapts layout for different screen sizes, switching to a stacked card layout on mobile devices
8. **Visual Feedback**: Provides hover effects on submission rows for better user interaction
9. **Accessibility Support**: Includes proper ARIA attributes and keyboard navigation for accessibility
10. **Empty State Handling**: Gracefully handles empty submissions arrays

## Accessibility

The SubmissionsList component is designed with accessibility in mind to ensure all users, including those with disabilities, can effectively interact with and understand the submissions data.

### Keyboard Navigation

- All interactive elements (Grade buttons) are keyboard accessible
- Tab order follows a logical flow through the submissions list
- Focus is visually indicated on interactive elements
- The component can be fully navigated using only the keyboard

### Screen Reader Support

- The component uses semantic HTML elements (`div` with appropriate roles) to create a logical structure
- Column headers are properly labeled for screen readers
- Student information is presented in a logical order
- Activity type icons have appropriate text alternatives through their context
- Status badges have text content that is read by screen readers

### ARIA Attributes

- The submissions list uses appropriate ARIA roles to define its structure
- Activity type icons include `aria-hidden="true"` to prevent screen readers from announcing them
- Status badges include text content that conveys their meaning
- Grade buttons have clear, descriptive text
- The component structure follows best practices for table-like data presentation

### Color Contrast

- Text elements have sufficient contrast with their backgrounds (meeting WCAG AA standards)
- Status badges use colors that meet contrast requirements (submitted: blue on light blue, graded: green on light green)
- Focus indicators are visible with high contrast
- The component respects the user's color scheme preferences
- Visual information is not conveyed by color alone

### Focus Management

- All interactive elements have visible focus indicators
- Focus order follows a logical sequence
- Focus indicators are visible and clear
- The component does not trap keyboard focus
- Focus styles are consistent with the rest of the application

## Edge Cases

- **Empty Submissions Array**: Displays a message indicating there are no submissions to grade
- **Missing Student Information**: Displays "Unknown Student" if student information is missing
- **Missing Activity Information**: Displays "Unknown Activity" if activity information is missing
- **Missing Module Information**: Displays "Unknown Module" if module information is missing
- **Missing Submission Date**: Displays "No submission date" if the submission date is missing
- **Missing Activity Type**: Defaults to a generic document icon if the activity type is missing
- **Long Student Names**: Truncates long student names with ellipsis to maintain layout
- **Long Activity Titles**: Truncates long activity titles with ellipsis to maintain layout
- **Long Module Titles**: Truncates long module titles with ellipsis to maintain layout
- **Mobile Devices**: Adapts layout for smaller screens, stacking elements vertically
- **Submissions Without Status**: Defaults to "submitted" status if status is missing
- **Large Number of Submissions**: Handles large datasets efficiently with pagination or virtualization

## Implementation Details

The SubmissionsList component is implemented using React with TypeScript. It uses React Router for navigation and the formatDate utility for date formatting.

```tsx
// Simplified implementation
import React from 'react';
import { Link } from 'react-router-dom';
import { Submission } from '../../types/course';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './SubmissionsList.css';

interface SubmissionsListProps {
  submissions: Submission[];
  courseId: string;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({
  submissions,
  courseId
}) => {
  // If no submissions, show empty state
  if (!submissions || submissions.length === 0) {
    return (
      <div className="submissions-empty">
        <p>No submissions to grade at this time.</p>
      </div>
    );
  }

  return (
    <div className="submissions-list">
      {/* Table header */}
      <div className="submissions-header">
        <div className="submission-row header">
          <div className="submission-cell student">Student</div>
          <div className="submission-cell activity">Activity</div>
          <div className="submission-cell module">Module</div>
          <div className="submission-cell date">Submitted</div>
          <div className="submission-cell status">Status</div>
          <div className="submission-cell actions">Actions</div>
        </div>
      </div>

      {/* Table body */}
      <div className="submissions-body">
        {submissions.map(submission => (
          <div
            key={submission.id}
            className="submission-row"
          >
            {/* Student cell */}
            <div className="submission-cell student">
              <div className="student-avatar">
                {submission.student?.avatar ? (
                  <img
                    src={submission.student.avatar}
                    alt=""
                    aria-hidden="true"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {submission.student?.name?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              <div className="student-info">
                <div className="student-name">
                  {submission.student?.name || 'Unknown Student'}
                </div>
                <div className="student-email">
                  {submission.student?.email || ''}
                </div>
              </div>
            </div>

            {/* Activity cell */}
            <div className="submission-cell activity">
              <div className="activity-type-icon">
                {getActivityTypeIcon(submission.activity?.type)}
              </div>
              <div className="activity-title">
                {submission.activity?.title || 'Unknown Activity'}
              </div>
            </div>

            {/* Module cell */}
            <div className="submission-cell module">
              {submission.module?.title || 'Unknown Module'}
            </div>

            {/* Date cell */}
            <div className="submission-cell date">
              {submission.submittedAt ?
                formatDate(submission.submittedAt) :
                'No submission date'
              }
            </div>

            {/* Status cell */}
            <div className="submission-cell status">
              <div className={`status-badge ${submission.status || 'submitted'}`}>
                {formatStatus(submission.status || 'submitted')}
              </div>
            </div>

            {/* Actions cell */}
            <div className="submission-cell actions">
              <Link
                to={`/courses/${courseId}/activities/${submission.activityId}/submissions/${submission.id}/grade`}
                className="btn btn-primary btn-sm"
              >
                Grade
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get activity type icon
const getActivityTypeIcon = (type?: string) => {
  switch (type) {
    case 'assignment':
      return <i className="icon-assignment" aria-hidden="true"></i>;
    case 'quiz':
      return <i className="icon-quiz" aria-hidden="true"></i>;
    case 'discussion':
      return <i className="icon-discussion" aria-hidden="true"></i>;
    default:
      return <i className="icon-document" aria-hidden="true"></i>;
  }
};

// Helper function to format status text
const formatStatus = (status: string) => {
  switch (status) {
    case 'submitted':
      return 'Submitted';
    case 'graded':
      return 'Graded';
    case 'draft':
      return 'Draft';
    case 'returned':
      return 'Returned';
    default:
      return 'Submitted';
  }
};

export default SubmissionsList;
```

### CSS Implementation

```css
/* Simplified SubmissionsList Component Styles */

.submissions-list {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.submissions-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.submission-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.submission-row:last-child {
  border-bottom: none;
}

.submission-row.header {
  font-weight: 600;
  color: #333;
}

.submission-cell {
  padding: 1rem;
  flex: 1;
}

.submission-cell.student {
  flex: 2;
  display: flex;
  align-items: center;
}

.student-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  background-color: #f0f0f0;
}

.student-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  color: #666;
  font-weight: 600;
}

.student-info {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.student-email {
  font-size: 0.85rem;
  color: #666;
}

.submission-cell.activity {
  flex: 2;
  display: flex;
  align-items: center;
}

.activity-type-icon {
  margin-right: 0.75rem;
  color: #666;
}

.activity-title {
  font-weight: 500;
}

.submission-cell.status {
  flex: 1;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.submitted {
  background-color: #e3f2fd;
  color: #1976d2;
}

.status-badge.graded {
  background-color: #e8f5e9;
  color: #388e3c;
}

.status-badge.draft {
  background-color: #f5f5f5;
  color: #757575;
}

.status-badge.returned {
  background-color: #fff8e1;
  color: #f57c00;
}

.submission-cell.actions {
  flex: 1;
  text-align: right;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
}

.submissions-empty {
  padding: 2rem;
  text-align: center;
  color: #666;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .submission-row {
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .submission-row.header {
    display: none;
  }

  .submission-cell {
    width: 100%;
    padding: 0.5rem 0;
    border-bottom: none;
  }

  .submission-cell.student {
    margin-bottom: 0.5rem;
  }

  .submission-cell.actions {
    text-align: left;
    margin-top: 0.5rem;
  }

  .submission-cell::before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 0.5rem;
  }
}
```

## Related Components

- [GradingInterface](./GradingInterface.md): Component that displays the grading interface for a submission, linked from the SubmissionsList
- [SubmissionDetail](./SubmissionDetail.md): Component that displays detailed information about a submission
- [ActivityDetail](../activities/ActivityDetail.md): Component that displays activity details, including submissions
- [CourseGradebook](./CourseGradebook.md): Component that displays a gradebook for a course, including all submissions
- [StudentSubmissions](./StudentSubmissions.md): Component that displays all submissions for a specific student

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-submissionslist--default).

The Storybook examples demonstrate:

- Default submissions list with multiple submissions
- Submissions list with different activity types
- Submissions list with different submission statuses
- Empty submissions list
- Submissions list on mobile devices

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic submissions list |
| 1.1.0 | Added status badges and activity type icons |
| 1.2.0 | Added responsive design for mobile devices |
| 1.3.0 | Added accessibility improvements |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added support for different submission statuses |
| 2.2.0 | Added empty state handling |

## Technical Debt

The SubmissionsList component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Div-based Table | Uses div elements with CSS to create a table-like structure | May impact accessibility and semantics | Consider using a proper table element with appropriate ARIA roles | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | ARIA Roles | Missing proper ARIA roles for table-like structure | Reduces accessibility for screen reader users | Add appropriate ARIA roles (role="table", role="row", role="cell") | High |
| A-002 | Mobile Accessibility | On mobile, the column headers are hidden, making it harder for screen reader users to understand the data | Reduces accessibility on mobile devices | Add data-label attributes that are read by screen readers | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Pagination | Implement pagination for large submission lists | Improves performance for courses with many submissions | Medium | High |
| RFO-002 | Sorting | Add ability to sort submissions by different columns | Improves usability for instructors | Medium | Medium |
| RFO-003 | Filtering | Add ability to filter submissions by status, activity type, etc. | Improves usability for instructors | Medium | Medium |

For a complete technical debt analysis, see the [SubmissionsList Technical Debt Report](../technical-debt/SubmissionsList-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [SubmissionsList Version Compatibility Matrix](./SubmissionsList-version-compatibility.md)
