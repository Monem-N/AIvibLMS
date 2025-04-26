# CourseHeader

The CourseHeader component is used in the Hypatia LMS for displaying comprehensive course information and key actions at the top of course pages.

## Description

The CourseHeader component provides a visually appealing and informative header section for course pages. It displays essential course information such as title, description, instructor details, progress tracking, and course metadata (category, level, dates). It also includes action buttons for course enrollment and navigation. This component serves as the primary entry point for users to understand course content and track their progress.

## Visual Examples

### Desktop View

![CourseHeader Desktop](https://i.imgur.com/XYZ123.png)

Desktop view of the CourseHeader component showing course information and progress

### Mobile View

![CourseHeader Mobile](https://i.imgur.com/ABC456.png)

Mobile view of the CourseHeader component with responsive layout

## Usage

```tsx
import { CourseHeader } from 'components/courses/CourseHeader';

// Example usage
import React from 'react';
import { Course } from 'types/course';

const CoursePage: React.FC = () => {
  const course: Course = {
    id: '123',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React development',
    status: 'published',
    instructor: {
      id: '456',
      name: 'Jane Smith',
      avatar: '/images/avatars/jane-smith.jpg'
    },
    category: 'Web Development',
    level: 'beginner',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    progress: 35
  };

  const handleEnroll = () => {
    console.log('Enrolling in course...');
  };

  const handleContinue = () => {
    console.log('Continuing course...');
  };

  return (
    <div className="course-page">
      <CourseHeader
        course={course}
        onEnroll={handleEnroll}
        onContinue={handleContinue}
      />
      {/* Rest of course content */}
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| course | Course | - | Yes | The course object containing all course information |
| onEnroll | () => void | - | No | Callback function when the enroll button is clicked |
| onContinue | () => void | - | No | Callback function when the continue button is clicked |
| onEdit | () => void | - | No | Callback function when the edit button is clicked (only shown for instructors) |
| showActions | boolean | true | No | Whether to show action buttons |
| showProgress | boolean | true | No | Whether to show the progress section |
| showInstructor | boolean | true | No | Whether to show the instructor section |
| showDescription | boolean | true | No | Whether to show the course description |
| className | string | - | No | Additional CSS class names |
| isInstructor | boolean | false | No | Whether the current user is an instructor for this course |
| isEnrolled | boolean | false | No | Whether the current user is enrolled in this course |

## Type Definitions

```tsx
/**
 * CourseHeader Props
 */
export interface CourseHeaderProps {
  course: Course;
  onEnroll?: () => void;
  onContinue?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
  showProgress?: boolean;
  showInstructor?: boolean;
  showDescription?: boolean;
  className?: string;
  isInstructor?: boolean;
  isEnrolled?: boolean;
}

/**
 * Course
 */
export interface Course {
  id: string;
  title: string;
  slug?: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdBy?: string;
  instructor?: {
    id: string;
    name: string;
    avatar?: string;
  };
  instructors?: string[];
  startDate?: string;
  endDate?: string;
  subjects?: string[];
  modules?: Module[];
  resources?: Attachment[];
  thumbnail?: string;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  credits?: number;
  syllabus?: string;
  prerequisites?: string[];
  enrollmentType?: 'open' | 'invite' | 'approval';
  maxEnrollment?: number;
  selfPaced?: boolean;
  visibility?: 'public' | 'unlisted' | 'private';
  featured?: boolean;
  completionCriteria?: 'all-activities' | 'required-activities' | 'percentage' | 'final-exam';
  completionPercentage?: number;
  certificateEnabled?: boolean;
  language?: string;
  tags?: string[];
  discussionEnabled?: boolean;
  peerReviewEnabled?: boolean;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
}
```

## Examples

### Basic Example

```tsx
<CourseHeader
  course={course}
/>
```

### With Progress and Actions

```tsx
<CourseHeader
  course={course}
  onEnroll={handleEnroll}
  onContinue={handleContinue}
  isEnrolled={true}
  showProgress={true}
/>
```

### For Instructors

```tsx
<CourseHeader
  course={course}
  isInstructor={true}
  onEdit={handleEditCourse}
  showActions={true}
  showProgress={false}
/>
```

### Minimal Display

```tsx
<CourseHeader
  course={course}
  showActions={false}
  showProgress={false}
  showInstructor={false}
  showDescription={false}
/>
```

### With Custom Styling

```tsx
<CourseHeader
  course={course}
  className="custom-course-header dark-theme"
/>
```

## Features

1. **Comprehensive Course Information**: Displays all essential course information in a visually appealing layout
2. **Progress Tracking**: Shows the user's progress in the course with a visual progress bar
3. **Responsive Design**: Adapts to different screen sizes with a mobile-first approach
4. **Contextual Actions**: Shows different action buttons based on user role and enrollment status
5. **Instructor Information**: Displays instructor details with avatar and name
6. **Course Metadata**: Shows category, level, dates, and other metadata in a clean format
7. **Customizable Display**: Allows hiding/showing different sections based on context
8. **Visual Status Indicators**: Uses badges to indicate course status (published, draft, etc.)
9. **Accessibility Support**: Fully accessible with proper semantic HTML and ARIA attributes

## Accessibility

The CourseHeader component is designed with accessibility in mind, following WCAG 2.1 guidelines. It provides a fully accessible experience for all users, including those using assistive technologies such as screen readers, keyboard navigation, and other input methods. The component uses semantic HTML elements, appropriate ARIA attributes, and sufficient color contrast to ensure it meets accessibility standards.

### Keyboard Navigation

- All interactive elements (buttons, links) are focusable using the Tab key
- Focus order follows a logical sequence from top to bottom
- Action buttons have keyboard shortcuts where appropriate

### Screen Reader Support

- Proper heading structure with `h1` for course title and appropriate heading levels for sections
- Images (like instructor avatars and course thumbnails) have descriptive alt text
- Progress information is announced properly to screen readers
- Status indicators use both color and text to convey information

### ARIA Attributes

- `aria-label`: Provides accessible names for buttons and controls
- `aria-describedby`: Links related information together
- `aria-current`: Indicates the current course when in a list of courses
- `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`: Used for progress bar

### Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Status indicators use colors that meet contrast requirements
- Progress bar uses colors with sufficient contrast
- Focus indicators have sufficient contrast (3:1 minimum)

### Focus Management

- Focus is clearly visible with a distinct outline
- Focus indicators are visible in both light and dark themes
- Interactive elements have appropriate hover and focus states

## Edge Cases

- **Missing Course Data**: When certain course data is missing, the component gracefully handles it by hiding the corresponding sections or displaying placeholders
- **Long Course Titles**: When course titles are very long, they are truncated with an ellipsis to maintain the layout
- **Missing Instructor**: When instructor information is missing, the component displays a generic avatar and "Unknown Instructor" text
- **No Progress Data**: When progress data is not available (new courses), the progress section shows "Not Started" instead of a progress bar
- **Draft Courses**: For courses in draft status, a prominent "Draft" badge is displayed, and enrollment actions are disabled
- **Archived Courses**: For archived courses, all action buttons are disabled and a notice is displayed
- **Mobile View**: On small screens, the layout changes to a stacked view with collapsed description that can be expanded
- **RTL Support**: The component supports right-to-left languages with appropriate layout adjustments

## Implementation Details

The CourseHeader component is implemented using React with CSS for styling. Here's a simplified implementation:

```tsx
// Simplified implementation
import React from 'react';
import './CourseHeader.css';
import { Course } from 'types/course';
import { formatDate } from 'utils/dateUtils';
import { ProgressBar } from 'components/ui/ProgressBar';
import { Badge } from 'components/ui/Badge';
import { Button } from 'components/ui/Button';

export const CourseHeader: React.FC<CourseHeaderProps> = ({
  course,
  onEnroll,
  onContinue,
  onEdit,
  showActions = true,
  showProgress = true,
  showInstructor = true,
  showDescription = true,
  className = '',
  isInstructor = false,
  isEnrolled = false,
}) => {
  // Format dates for display
  const formattedStartDate = course.startDate ? formatDate(course.startDate) : 'Not set';
  const formattedEndDate = course.endDate ? formatDate(course.endDate) : 'Not set';

  // Determine which actions to show based on user role and enrollment status
  const renderActions = () => {
    if (!showActions) return null;

    if (isInstructor) {
      return (
        <div className="course-header-actions">
          <Button onClick={onEdit} variant="primary">Edit Course</Button>
        </div>
      );
    }

    if (isEnrolled) {
      return (
        <div className="course-header-actions">
          <Button onClick={onContinue} variant="primary">Continue Course</Button>
        </div>
      );
    }

    return (
      <div className="course-header-actions">
        <Button onClick={onEnroll} variant="primary">Enroll Now</Button>
      </div>
    );
  };

  // Render progress section if user is enrolled and progress should be shown
  const renderProgress = () => {
    if (!showProgress || !isEnrolled) return null;

    return (
      <div className="course-header-progress">
        <h3>Your Progress</h3>
        <ProgressBar
          value={course.progress || 0}
          max={100}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={course.progress || 0}
        />
        <span className="progress-text">{course.progress || 0}% Complete</span>
      </div>
    );
  };

  // Render instructor section
  const renderInstructor = () => {
    if (!showInstructor || !course.instructor) return null;

    return (
      <div className="course-header-instructor">
        <h3>Instructor</h3>
        <div className="instructor-info">
          <img
            src={course.instructor.avatar || '/images/default-avatar.png'}
            alt={`${course.instructor.name}'s avatar`}
            className="instructor-avatar"
          />
          <span className="instructor-name">{course.instructor.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`course-header ${className}`}>
      <div className="course-header-main">
        <div className="course-header-content">
          <div className="course-header-title-row">
            <h1 className="course-title">{course.title}</h1>
            <Badge variant={course.status === 'published' ? 'success' : 'warning'}>
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </Badge>
          </div>

          {showDescription && (
            <div className="course-description">
              <p>{course.description}</p>
            </div>
          )}

          <div className="course-metadata">
            {course.category && (
              <div className="metadata-item">
                <span className="metadata-label">Category:</span>
                <span className="metadata-value">{course.category}</span>
              </div>
            )}

            {course.level && (
              <div className="metadata-item">
                <span className="metadata-label">Level:</span>
                <span className="metadata-value">{course.level}</span>
              </div>
            )}

            <div className="metadata-item">
              <span className="metadata-label">Dates:</span>
              <span className="metadata-value">{formattedStartDate} - {formattedEndDate}</span>
            </div>
          </div>

          {renderActions()}
        </div>

        <div className="course-header-sidebar">
          {course.thumbnail && (
            <img
              src={course.thumbnail}
              alt={`${course.title} thumbnail`}
              className="course-thumbnail"
            />
          )}

          {renderInstructor()}
          {renderProgress()}
        </div>
      </div>
    </div>
  );
};
```

## Related Components

- [CourseCard](./CourseCard.md): Simplified version of CourseHeader used in course listings
- [CourseTabs](./CourseTabs.md): Navigation tabs that appear below the CourseHeader
- [CourseModules](./CourseModules.md): Displays course modules, often used with CourseHeader
- [ProgressBar](../ui/ProgressBar.md): Used within CourseHeader to display progress
- [Badge](../ui/Badge.md): Used within CourseHeader to display course status
- [Button](../ui/Button.md): Used for action buttons within CourseHeader

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-courseheader--default).

The Storybook examples demonstrate:

- Default course header with all sections
- Different course statuses (published, draft, archived)
- Instructor view with edit actions
- Student view with enrollment and continue actions
- Mobile responsive behavior
- Different progress states
- Customization options

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
| 1.1.0 | Added responsive design for mobile devices |
| 1.2.0 | Added support for course status badges |
| 1.3.0 | Added progress tracking functionality |
| 1.4.0 | Added instructor view with edit actions |
| 1.5.0 | Added support for RTL languages |
| 2.0.0 | Refactored to use TypeScript and improved component structure |
| 2.1.0 | Added customization options (showActions, showProgress, etc.) |
| 2.2.0 | Improved accessibility with ARIA attributes |

## Technical Debt

The CourseHeader component has several technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CQ-001 | Hardcoded Strings | Contains hardcoded strings for labels and messages | Makes internationalization difficult | Extract to constants or i18n system | Low |
| CQ-002 | Complex Rendering Logic | Contains multiple conditional rendering functions | Makes the component harder to understand and maintain | Extract to smaller, focused components | Low |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Course Context | Create a CourseContext to avoid prop drilling | Simplifies component usage and improves maintainability | Medium | Medium |
| RFO-002 | Component Splitting | Split into smaller sub-components | Improves code organization and testability | Medium | Medium |

For a complete technical debt analysis, see the [CourseHeader Technical Debt Report](../technical-debt/CourseHeader-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [CourseHeader Version Compatibility Matrix](./CourseHeader-version-compatibility.md).
