# ActivityContent

The ActivityContent component is used in the Hypatia LMS for displaying the content of an activity based on its type.

## Description

The ActivityContent component renders different types of educational activities in the Hypatia LMS. It provides specialized layouts and interactive elements for various activity types including content pages, assignments, quizzes, and discussions. The component adapts its display based on the activity type, showing appropriate UI elements and controls for each context.

## Visual Examples

### Content Activity

<!-- Note: Replace with actual screenshot when available -->
![Content Activity](https://via.placeholder.com/800x400?text=Content+Activity+Example)

Content activity showing text and attachments

### Assignment Activity

<!-- Note: Replace with actual screenshot when available -->
![Assignment Activity](https://via.placeholder.com/800x400?text=Assignment+Activity+Example)

Assignment activity showing instructions and submission options

### Quiz Activity

<!-- Note: Replace with actual screenshot when available -->
![Quiz Activity](https://via.placeholder.com/800x400?text=Quiz+Activity+Example)

Quiz activity showing instructions and start button

### Discussion Activity

<!-- Note: Replace with actual screenshot when available -->
![Discussion Activity](https://via.placeholder.com/800x400?text=Discussion+Activity+Example)

Discussion activity showing prompt and reply form

## Usage

```tsx
import { ActivityContent } from 'components/activities/ActivityContent';
import { Activity } from 'types/course';

// Example activity object
const activity: Activity = {
  id: '123',
  title: 'Introduction to React',
  moduleId: 'module-1',
  type: 'content',
  content: '# Introduction\n\nReact is a JavaScript library for building user interfaces.',
  order: 1,
  attachments: [
    {
      id: 'attachment-1',
      name: 'react-cheatsheet.pdf',
      type: 'application/pdf',
      url: '/files/react-cheatsheet.pdf',
      size: 1024000,
      uploadedAt: '2023-01-01T00:00:00Z'
    }
  ]
};

// Basic usage
<ActivityContent activity={activity} />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| activity | Activity | - | Yes | The activity object to display |

## Type Definitions

```tsx
/**
 * Activity
 */
export interface Activity {
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

/**
 * Attachment
 */
export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}
```

## Examples

### Content Activity Example

```tsx
const contentActivity: Activity = {
  id: '123',
  title: 'Introduction to React',
  moduleId: 'module-1',
  type: 'content',
  content: '# Introduction\n\nReact is a JavaScript library for building user interfaces.',
  order: 1,
  attachments: [
    {
      id: 'attachment-1',
      name: 'react-cheatsheet.pdf',
      type: 'application/pdf',
      url: '/files/react-cheatsheet.pdf',
      size: 1024000,
      uploadedAt: '2023-01-01T00:00:00Z'
    }
  ]
};

<ActivityContent activity={contentActivity} />
```

### Assignment Activity Example

```tsx
const assignmentActivity: Activity = {
  id: '124',
  title: 'React Components Assignment',
  moduleId: 'module-1',
  type: 'assignment',
  content: '# Instructions\n\nCreate a React component that displays a list of items.',
  order: 2,
  points: 10,
  dueDate: '2023-01-15T23:59:59Z',
  attachments: [
    {
      id: 'attachment-2',
      name: 'assignment-rubric.pdf',
      type: 'application/pdf',
      url: '/files/assignment-rubric.pdf',
      size: 512000,
      uploadedAt: '2023-01-01T00:00:00Z'
    }
  ]
};

<ActivityContent activity={assignmentActivity} />
```

### Quiz Activity Example

```tsx
const quizActivity: Activity = {
  id: '125',
  title: 'React Fundamentals Quiz',
  moduleId: 'module-1',
  type: 'quiz',
  content: '# Quiz Instructions\n\nThis quiz covers React fundamentals. You have 30 minutes to complete it.',
  order: 3,
  points: 20
};

<ActivityContent activity={quizActivity} />
```

### Discussion Activity Example

```tsx
const discussionActivity: Activity = {
  id: '126',
  title: 'React vs Angular Discussion',
  moduleId: 'module-1',
  type: 'discussion',
  content: '# Discussion Prompt\n\nCompare and contrast React and Angular. What are the strengths and weaknesses of each?',
  order: 4
};

<ActivityContent activity={discussionActivity} />
```

## Features

1. **Content Type Rendering**: Renders different layouts based on activity type (content, assignment, quiz, discussion)
2. **Markdown Support**: Renders Markdown content with proper formatting
3. **Attachment Display**: Shows attachments with appropriate icons based on file type
4. **File Size Formatting**: Automatically formats file sizes in human-readable format
5. **Responsive Design**: Adapts to different screen sizes
6. **Quiz Information Display**: Shows quiz metadata like time limit, attempts, and question count
7. **Discussion Forum Interface**: Provides a discussion forum interface with reply functionality
8. **File Type Icons**: Displays appropriate icons for different file types
9. **Download Links**: Provides download links for attachments
10. **Fallback Handling**: Handles unknown activity types gracefully

## Accessibility

The ActivityContent component is designed with accessibility in mind, following WCAG 2.1 guidelines. It provides a fully accessible experience for all users, including those using assistive technologies.

### Keyboard Navigation

- All interactive elements (buttons, links, form controls) are fully keyboard accessible
- The Tab key navigates through all interactive elements in a logical order
- Form controls use proper labels and associations

### Screen Reader Support

- Proper semantic HTML elements are used throughout the component
- Images and icons have appropriate alternative text
- Attachment information is properly structured for screen readers
- Markdown content is rendered with proper heading hierarchy

### ARIA Attributes

- `aria-label` is used where appropriate to provide additional context
- Form controls have proper labels and descriptions
- Interactive elements have appropriate roles

### Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- UI elements have sufficient contrast against their background
- Focus indicators have a contrast ratio of at least 3:1

### Focus Management

- Focus is clearly visible with a distinct outline
- Focus order follows a logical sequence that matches the visual layout

## Edge Cases

- **Empty Content**: When an activity has no content, the component displays an appropriate message
- **No Attachments**: When an activity has no attachments, the attachments section is not displayed
- **Long Attachment Names**: Long attachment names are truncated with an ellipsis
- **Unsupported Activity Types**: Unknown activity types display a fallback message
- **Large Attachments**: File sizes are formatted appropriately for all sizes (bytes to TB)
- **Markdown Rendering**: Handles various Markdown edge cases including code blocks, tables, and images
- **Mobile View**: Adapts layout for small screens, stacking elements vertically
- **Empty Discussion**: Shows appropriate message when a discussion has no posts
- **RTL Support**: Supports right-to-left languages with appropriate layout adjustments

## Implementation Details

The ActivityContent component is implemented using React with TypeScript. It uses the react-markdown library to render Markdown content.

```tsx
// Simplified implementation
import React from 'react';
import { Activity, Attachment } from '../../types/course';
import ReactMarkdown from 'react-markdown';
import './ActivityContent.css';

interface ActivityContentProps {
  activity: Activity;
}

const ActivityContent: React.FC<ActivityContentProps> = ({ activity }) => {
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get file icon based on MIME type
  const getFileIcon = (mimeType: string): JSX.Element => {
    // Implementation details omitted for brevity
    return <svg className="file-icon document">...</svg>;
  };
  
  // Render attachments
  const renderAttachments = (attachments: Attachment[]) => {
    if (!attachments || attachments.length === 0) {
      return null;
    }
    
    return (
      <div className="activity-attachments">
        <h3 className="attachments-title">Attachments</h3>
        <div className="attachments-list">
          {attachments.map(attachment => (
            <a 
              key={attachment.id}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="attachment-item"
            >
              <div className="attachment-icon">
                {getFileIcon(attachment.type)}
              </div>
              <div className="attachment-info">
                <span className="attachment-name">{attachment.name}</span>
                <span className="attachment-size">{formatFileSize(attachment.size)}</span>
              </div>
              <div className="attachment-download">
                <svg className="download-icon">...</svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  // Render content based on activity type
  const renderContent = () => {
    switch (activity.type) {
      case 'content':
        return (
          <div className="content-activity">
            {activity.content && (
              <div className="content-text">
                <ReactMarkdown>{activity.content}</ReactMarkdown>
              </div>
            )}
            {renderAttachments(activity.attachments || [])}
          </div>
        );
      
      case 'assignment':
        return (
          <div className="assignment-activity">
            <div className="assignment-instructions">
              <h3 className="section-title">Instructions</h3>
              {activity.content && (
                <div className="content-text">
                  <ReactMarkdown>{activity.content}</ReactMarkdown>
                </div>
              )}
            </div>
            {renderAttachments(activity.attachments || [])}
          </div>
        );
      
      case 'quiz':
        return (
          <div className="quiz-activity">
            {/* Quiz implementation details omitted for brevity */}
          </div>
        );
      
      case 'discussion':
        return (
          <div className="discussion-activity">
            {/* Discussion implementation details omitted for brevity */}
          </div>
        );
      
      default:
        return (
          <div className="unknown-activity">
            <p>This activity type is not supported.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="activity-content">
      {renderContent()}
    </div>
  );
};

export default ActivityContent;
```

## Related Components

- [ActivityHeader](./ActivityHeader.md): Displays the header information for an activity
- [ActivitySubmission](./ActivitySubmission.md): Handles submission of assignments and quizzes
- [ActivityFeedback](./ActivityFeedback.md): Displays feedback for submitted activities
- [ActivityNavigation](./ActivityNavigation.md): Provides navigation between activities
- [DiscussionForum](../discussion/DiscussionForum.md): Full-featured discussion forum component

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/activities-activitycontent--default).

The Storybook examples demonstrate:

- Content activity with text and attachments
- Assignment activity with instructions and submission options
- Quiz activity with instructions and start button
- Discussion activity with prompt and reply form
- Responsive behavior on different screen sizes
- Different attachment types and sizes

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
| 1.1.0 | Added support for quiz activities |
| 1.2.0 | Added support for discussion activities |
| 1.3.0 | Improved attachment handling with file type icons |
| 1.4.0 | Added responsive design for mobile devices |
| 2.0.0 | Refactored to use TypeScript and React Hooks |
| 2.1.0 | Added accessibility improvements |
| 2.2.0 | Added RTL language support |

## Technical Debt

The ActivityContent component has several technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Inline SVG Icons | Contains hardcoded SVG icons instead of using an icon component | Makes maintenance difficult and increases bundle size | Extract to a reusable Icon component | Medium |

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CQ-001 | Hardcoded Strings | Contains hardcoded strings for labels and messages | Makes internationalization difficult | Extract to constants or i18n system | Low |
| CQ-002 | Hardcoded Quiz Info | Quiz information (time limit, attempts) is hardcoded | Makes the component less reusable | Move to props or activity data model | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Component Splitting | Split into smaller sub-components for each activity type | Improves code organization and testability | Medium | Medium |
| RFO-002 | Memoization | Add memoization to prevent unnecessary re-renders | Improves performance | Low | Low |

For a complete technical debt analysis, see the [ActivityContent Technical Debt Report](../technical-debt/ActivityContent-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [ActivityContent Version Compatibility Matrix](./ActivityContent-version-compatibility.md).
