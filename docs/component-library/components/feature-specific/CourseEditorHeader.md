# CourseEditorHeader

## Introduction

The CourseEditorHeader component is used in the Hypatia LMS for displaying the header section of the course editor interface, providing course title, status, and action buttons.

## Description

The CourseEditorHeader component provides a clean and functional header for the course editor interface. It displays the course title, status badge, and contextual subtitle indicating whether the user is creating a new course or editing an existing one. The component also includes action buttons for saving, publishing, and canceling the editing process. This header serves as the primary navigation and action area for course creators and instructors when building or modifying courses.

## Visual Examples

### New Course Header

<!-- Note: Replace with actual screenshot when available -->
![New Course Header](https://via.placeholder.com/800x100?text=New+Course+Header)

The header when creating a new course, showing the default title and Draft status

### Edit Course Header

<!-- Note: Replace with actual screenshot when available -->
![Edit Course Header](https://via.placeholder.com/800x100?text=Edit+Course+Header)

The header when editing an existing course, showing the course title and status

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x200?text=CourseEditorHeader+Mobile+View)

The responsive layout on mobile devices

## Import

```tsx
import { CourseEditorHeader } from 'components/courses/editor/CourseEditorHeader';
```

## Usage

```tsx
import React, { useState } from 'react';
import { CourseEditorHeader } from 'components/courses/editor/CourseEditorHeader';

const CourseEditor: React.FC = () => {
  // State for saving status
  const [saving, setSaving] = useState<boolean>(false);

  // Handle save
  const handleSave = () => {
    setSaving(true);
    // Save course data
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  // Handle publish
  const handlePublish = () => {
    // Publish course
  };

  return (
    <div className="course-editor-container">
      <CourseEditorHeader
        isNew={false}
        title="Introduction to React"
        status="draft"
        onSave={handleSave}
        onPublish={handlePublish}
        saving={saving}
      />

      {/* Rest of the course editor */}
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| isNew | boolean | - | Yes | Whether the course is new or existing |
| title | string | - | Yes | The title of the course |
| status | 'draft' \| 'published' \| 'archived' | - | Yes | The current status of the course |
| onSave | () => void | - | Yes | Callback function called when the save button is clicked |
| onPublish | () => void | - | Yes | Callback function called when the publish button is clicked |
| saving | boolean | - | Yes | Whether the course is currently being saved |

## Type Definitions

```tsx
/**
 * CourseEditorHeaderProps Interface
 */
interface CourseEditorHeaderProps {
  /**
   * Whether the course is new or existing
   */
  isNew: boolean;

  /**
   * The title of the course
   */
  title: string;

  /**
   * The current status of the course
   */
  status: 'draft' | 'published' | 'archived';

  /**
   * Callback function called when the save button is clicked
   */
  onSave: () => void;

  /**
   * Callback function called when the publish button is clicked
   */
  onPublish: () => void;

  /**
   * Whether the course is currently being saved
   */
  saving: boolean;
}
```

## Examples

### Basic Example

```tsx
<CourseEditorHeader
  isNew={true}
  title="New Course"
  status="draft"
  onSave={() => console.log('Save clicked')}
  onPublish={() => console.log('Publish clicked')}
  saving={false}
/>
```

### Draft Course Example

```tsx
<CourseEditorHeader
  isNew={false}
  title="Introduction to React"
  status="draft"
  onSave={() => console.log('Save clicked')}
  onPublish={() => console.log('Publish clicked')}
  saving={false}
/>
```

### Published Course Example

```tsx
<CourseEditorHeader
  isNew={false}
  title="Introduction to React"
  status="published"
  onSave={() => console.log('Save clicked')}
  onPublish={() => console.log('Publish clicked')}
  saving={false}
/>
```

### Saving State Example

```tsx
<CourseEditorHeader
  isNew={false}
  title="Introduction to React"
  status="draft"
  onSave={() => console.log('Save clicked')}
  onPublish={() => console.log('Publish clicked')}
  saving={true}
/>
```

### Example with CourseEditorModern

```tsx
import React, { useState } from 'react';
import { CourseEditorHeader } from 'components/courses/editor/CourseEditorHeader';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';
import { CourseEditorForm } from 'components/courses/editor/CourseEditorForm';
import { Course } from 'types/course';

const CourseEditorModern: React.FC = () => {
  // State for course data
  const [courseData, setCourseData] = useState<Partial<Course>>({
    title: '',
    description: '',
    status: 'draft'
  });

  // State for saving status
  const [saving, setSaving] = useState<boolean>(false);

  // State for active tab
  const [activeTab, setActiveTab] = useState('details');

  // Handle save
  const handleSave = () => {
    setSaving(true);
    // Save course data
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  // Handle publish
  const handlePublish = () => {
    // Publish course
  };

  return (
    <div className="course-editor-container">
      <CourseEditorHeader
        isNew={true}
        title={courseData.title || 'New Course'}
        status={courseData.status || 'draft'}
        onSave={handleSave}
        onPublish={handlePublish}
        saving={saving}
      />

      <CourseEditorTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="course-editor-content">
        {activeTab === 'details' && (
          <CourseEditorForm
            courseData={courseData}
            onChange={(field, value) => {
              setCourseData(prev => ({
                ...prev,
                [field]: value
              }));
            }}
          />
        )}

        {/* Other tabs content */}
      </div>
    </div>
  );
};
```

## Features

1. **Course Title Display**: Prominently displays the course title with appropriate styling
2. **Status Badge**: Shows the current course status (draft, published, archived) with color-coded badges
3. **Contextual Subtitle**: Displays different subtitles based on whether the course is new or existing
4. **Save Button**: Provides a primary action button for saving course changes
5. **Publish Button**: Conditionally displays a publish button for draft courses that aren't new
6. **Cancel Link**: Provides a way to cancel editing and return to the courses list
7. **Saving State**: Shows a "Saving..." text when the course is being saved
8. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
9. **Visual Hierarchy**: Uses size, color, and spacing to create a clear visual hierarchy
10. **Consistent Styling**: Follows the application's design system for buttons, badges, and typography

## Accessibility

The CourseEditorHeader component is designed with accessibility in mind:

### Keyboard Navigation

- All buttons and links are fully keyboard accessible using the Tab key
- The component follows a logical tab order from left to right
- Action buttons have appropriate keyboard event handlers

### Screen Reader Support

- The component uses semantic HTML elements for proper screen reader interpretation
- The course title is in an `<h1>` element, providing proper document structure
- Status badges have appropriate text that is announced by screen readers
- Buttons have descriptive text that clearly indicates their purpose

### ARIA Attributes

- The save button indicates its loading state with appropriate ARIA attributes when saving
- Disabled buttons have `aria-disabled="true"` to indicate their state to screen readers
- The status badge uses appropriate ARIA attributes to convey its meaning

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Status badges use colors that have sufficient contrast with their text
- Buttons have sufficient contrast in both their default and hover states
- The component maintains contrast requirements in both light and dark themes

### Focus Management

- All interactive elements have clearly visible focus indicators
- Focus indicators are consistent with the rest of the application
- Focus order follows a logical sequence
- Focus states are visually distinct and meet contrast requirements

## Edge Cases

- **Empty Title**: When the title is empty, the component displays "New Course" for new courses or "Untitled Course" for existing courses
- **Long Titles**: For very long course titles, the component truncates the title with an ellipsis to prevent layout issues
- **Mobile Viewport**: On small screens, the component stacks the title and actions vertically for better usability
- **Disabled Buttons**: When saving is in progress, the save and publish buttons are disabled to prevent multiple submissions
- **Published Courses**: For published courses, the publish button is not displayed as it's no longer needed
- **Archived Courses**: For archived courses, both save and publish buttons are disabled as archived courses cannot be modified
- **Network Issues**: If a save operation fails due to network issues, the component reverts to the non-saving state and allows retrying
- **Unsaved Changes**: The component itself doesn't track unsaved changes, but works with parent components that do
- **RTL Languages**: The component supports right-to-left languages by reversing its layout appropriately
- **High Contrast Mode**: The component maintains usability in high contrast mode with appropriate styling

## Implementation Details

Here's a simplified implementation of the CourseEditorHeader component to help developers understand its inner workings:

```tsx
/**
 * CourseEditorHeader Component
 *
 * Displays the header for the course editor with title, status, and action buttons.
 */

import React from 'react';
import { Link } from 'react-router-dom';

// Import CSS
import './CourseEditorHeader.css';

interface CourseEditorHeaderProps {
  isNew: boolean;
  title: string;
  status: 'draft' | 'published' | 'archived';
  onSave: () => void;
  onPublish: () => void;
  saving: boolean;
}

const CourseEditorHeader: React.FC<CourseEditorHeaderProps> = ({
  isNew,
  title,
  status,
  onSave,
  onPublish,
  saving
}) => {
  // Get status badge
  const getStatusBadge = () => {
    switch (status) {
      case 'published':
        return <span className="badge badge-success">Published</span>;
      case 'archived':
        return <span className="badge badge-secondary">Archived</span>;
      case 'draft':
      default:
        return <span className="badge badge-warning">Draft</span>;
    }
  };

  // Determine if publish button should be shown
  const showPublishButton = !isNew && status !== 'published';

  // Determine if buttons should be disabled
  const disableButtons = saving || status === 'archived';

  // Get display title
  const displayTitle = title || (isNew ? 'New Course' : 'Untitled Course');

  return (
    <div className="course-editor-header">
      <div className="header-left">
        <div className="header-title-section">
          <h1 className="editor-title">{displayTitle}</h1>
          <div className="editor-status">
            {getStatusBadge()}
          </div>
        </div>
        <div className="header-subtitle">
          {isNew ? 'Create a new course' : 'Edit course'}
        </div>
      </div>

      <div className="header-actions">
        <Link
          to="/courses"
          className="btn btn-outline"
          aria-label="Cancel and return to courses"
        >
          Cancel
        </Link>

        <button
          className="btn btn-primary"
          onClick={onSave}
          disabled={disableButtons}
          aria-disabled={disableButtons}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>

        {showPublishButton && (
          <button
            className="btn btn-success"
            onClick={onPublish}
            disabled={disableButtons}
            aria-disabled={disableButtons}
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseEditorHeader;
```

## Related Components

- [CourseEditorModern](./CourseEditorModern.md): Parent component that uses CourseEditorHeader at the top of the editor
- [CourseEditorForm](./CourseEditorForm.md): Form component used alongside CourseEditorHeader in the course editor
- [CourseEditorTabs](./CourseEditorTabs.md): Tab navigation component that appears below CourseEditorHeader
- [CourseHeader](./CourseHeader.md): Similar component used for displaying course information in the course view
- [Badge](../ui/Badge.md): Used within CourseEditorHeader to display course status

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-courseeditorheader--basic).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic header functionality |
| 1.1.0 | Added status badges for different course states |
| 1.2.0 | Added responsive design for mobile devices |
| 1.3.0 | Added saving state indicator |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements |
| 2.2.0 | Added support for archived courses |

## Technical Debt

- The component currently uses direct CSS imports, which could be improved with CSS modules or styled components
- The status badge logic could be extracted into a separate component for reusability
- The component doesn't have comprehensive test coverage
- The component doesn't handle internationalization for status labels
- The component doesn't provide a way to customize the cancel link destination

## Version Compatibility

For detailed version compatibility information, see the [CourseEditorHeader Version Compatibility Matrix](./CourseEditorHeader-version-compatibility.md).
