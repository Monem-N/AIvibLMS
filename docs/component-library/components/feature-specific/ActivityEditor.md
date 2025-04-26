# ActivityEditor

## Introduction

The ActivityEditor component is used in the Hypatia LMS for creating and editing course activities within the course editor interface.

## Description

The ActivityEditor component provides a modal interface for instructors and course creators to add or edit activities within course modules. It supports various activity types (content, assignment, quiz, discussion) and allows users to configure activity details such as title, description, due date, points, and content. The component is designed to be user-friendly and accessible, with clear form labels, validation, and responsive layout for different screen sizes.

## Visual Examples

### Add Activity Modal

<!-- Note: Replace with actual screenshot when available -->
![Add Activity Modal](https://via.placeholder.com/800x600?text=Add+Activity+Modal)

The modal interface for adding a new activity to a course module

### Edit Activity Modal

<!-- Note: Replace with actual screenshot when available -->
![Edit Activity Modal](https://via.placeholder.com/800x600?text=Edit+Activity+Modal)

The modal interface for editing an existing activity

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x800?text=Activity+Editor+Mobile+View)

The responsive layout on mobile devices

## Import

```tsx
import { ActivityEditor } from 'components/courses/editor/ActivityEditor';
```

## Usage

```tsx
import React, { useState } from 'react';
import { ActivityEditor } from 'components/courses/editor/ActivityEditor';
import { Activity } from 'types/course';

const CourseEditorModules: React.FC = () => {
  // State for tracking which activity is being edited
  const [editingActivity, setEditingActivity] = useState<{
    moduleId: string;
    activityId?: string;
  } | null>(null);

  // Function to handle saving an activity
  const handleSaveActivity = (updatedActivity: Partial<Activity>) => {
    // Save the activity to your data store
    console.log('Saving activity:', updatedActivity);

    // Close the editor
    setEditingActivity(null);
  };

  // Function to handle canceling the edit
  const handleCancelEdit = () => {
    setEditingActivity(null);
  };

  return (
    <div>
      {/* Other course editor content */}

      {/* Render the ActivityEditor when an activity is being edited */}
      {editingActivity && (
        <ActivityEditor
          activity={{
            id: editingActivity.activityId || `temp-${Date.now()}`,
            title: '',
            description: '',
            type: 'content',
            status: 'not-started',
            moduleId: editingActivity.moduleId,
            order: 0
          }}
          onSave={handleSaveActivity}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| activity | Partial\<Activity\> | - | Yes | The activity object to edit or a partial activity object for new activities |
| onSave | (activity: Partial\<Activity\>) => void | - | Yes | Callback function called when the activity is saved |
| onCancel | () => void | - | Yes | Callback function called when the edit is canceled |

## Type Definitions

```tsx
/**
 * ActivityEditorProps Interface
 */
interface ActivityEditorProps {
  /**
   * The activity object to edit or a partial activity object for new activities
   */
  activity: Partial<Activity>;

  /**
   * Callback function called when the activity is saved
   */
  onSave: (activity: Partial<Activity>) => void;

  /**
   * Callback function called when the edit is canceled
   */
  onCancel: () => void;
}

/**
 * Activity Interface (from types/course.ts)
 * Relevant properties used by ActivityEditor
 */
interface Activity {
  /**
   * Unique identifier for the activity
   */
  id: string;

  /**
   * Activity title
   */
  title: string;

  /**
   * Activity description
   */
  description?: string;

  /**
   * ID of the module this activity belongs to
   */
  moduleId: string;

  /**
   * Type of activity
   */
  type: 'content' | 'assignment' | 'quiz' | 'discussion';

  /**
   * Activity status
   */
  status?: 'not-started' | 'in-progress' | 'completed';

  /**
   * Points assigned to the activity
   */
  points?: number;

  /**
   * Due date for the activity
   */
  dueDate?: string;

  /**
   * Markdown content for the activity
   */
  content?: string;

  /**
   * Order of the activity within the module
   */
  order: number;

  // Other activity properties...
}
```

## Examples

### Basic Example

```tsx
<ActivityEditor
  activity={{
    id: `temp-${Date.now()}`,
    title: '',
    description: '',
    type: 'content',
    status: 'not-started',
    moduleId: 'module-123',
    order: 0
  }}
  onSave={(activity) => console.log('Saved:', activity)}
  onCancel={() => console.log('Cancelled')}
/>
```

### Advanced Example

```tsx
<ActivityEditor
  activity={{
    id: 'activity-123',
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    type: 'assignment',
    status: 'not-started',
    moduleId: 'module-123',
    content: '# Introduction\n\nReact is a JavaScript library for building user interfaces.',
    points: 10,
    dueDate: '2023-12-31T23:59:59Z',
    order: 0
  }}
  onSave={(updatedActivity) => {
    console.log('Updated activity:', updatedActivity);
    // Save to database or state
  }}
  onCancel={() => {
    console.log('Cancelled');
    // Close the modal or update state
  }}
/>
```

### Example with Context

```tsx
import { useState } from 'react';
import { ActivityEditor } from 'components/courses/editor/ActivityEditor';
import { Activity } from 'types/course';

// Component that uses ActivityEditor
const CourseEditorExample = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  const handleAddActivity = () => {
    setShowEditor(true);
  };

  const handleSaveActivity = (activity: Partial<Activity>) => {
    const newActivity = {
      ...activity,
      id: activity.id || `activity-${Date.now()}`
    } as Activity;

    setActivities([...activities, newActivity]);
    setShowEditor(false);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
  };

  return (
    <div>
      <button onClick={handleAddActivity}>Add Activity</button>

      {showEditor && (
        <ActivityEditor
          activity={{
            id: `temp-${Date.now()}`,
            title: '',
            description: '',
            type: 'content',
            status: 'not-started',
            moduleId: 'module-123',
            order: activities.length
          }}
          onSave={handleSaveActivity}
          onCancel={handleCancelEdit}
        />
      )}

      <div>
        {activities.map(activity => (
          <div key={activity.id}>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Creating a New Activity

```tsx
import React from 'react';
import { ActivityEditor } from 'components/courses/editor/ActivityEditor';

const NewActivityExample: React.FC = () => {
  const handleSave = (activity) => {
    console.log('New activity:', activity);
    // Save to database or state
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // Close the modal or update state
  };

  return (
    <ActivityEditor
      activity={{
        id: `temp-${Date.now()}`,
        title: '',
        description: '',
        type: 'content',
        status: 'not-started',
        moduleId: 'module-123',
        order: 0
      }}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
```

### Editing an Existing Activity

```tsx
import React from 'react';
import { ActivityEditor } from 'components/courses/editor/ActivityEditor';
import { Activity } from 'types/course';

const EditActivityExample: React.FC = () => {
  // Example existing activity
  const existingActivity: Activity = {
    id: 'activity-123',
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    type: 'content',
    status: 'not-started',
    moduleId: 'module-123',
    content: '# Introduction\n\nReact is a JavaScript library for building user interfaces.',
    points: 10,
    dueDate: '2023-12-31T23:59:59Z',
    order: 0
  };

  const handleSave = (updatedActivity) => {
    console.log('Updated activity:', updatedActivity);
    // Save to database or state
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // Close the modal or update state
  };

  return (
    <ActivityEditor
      activity={existingActivity}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
```

### Integration with CourseEditorModules

```tsx
import React, { useState } from 'react';
import { ActivityEditor } from 'components/courses/editor/ActivityEditor';
import { Module, Activity } from 'types/course';

interface CourseEditorModulesProps {
  modules: Module[];
  onChange: (modules: Module[]) => void;
}

const CourseEditorModules: React.FC<CourseEditorModulesProps> = ({
  modules,
  onChange
}) => {
  // State for tracking which activity is being edited
  const [editingActivity, setEditingActivity] = useState<{
    moduleId: string;
    activityId?: string;
  } | null>(null);

  // Handle save activity
  const handleSaveActivity = (updatedActivity: Partial<Activity>) => {
    if (editingActivity) {
      // Implementation details...

      // Close the editor
      setEditingActivity(null);
    }
  };

  return (
    <div className="course-editor-modules">
      {/* Module and activity list rendering */}

      {/* Activity editor modal */}
      {editingActivity && (
        <ActivityEditor
          activity={{
            id: `temp-${Date.now()}`,
            title: '',
            description: '',
            type: 'content',
            status: 'not-started',
            moduleId: editingActivity.moduleId,
            order: 0
          }}
          onSave={handleSaveActivity}
          onCancel={() => setEditingActivity(null)}
        />
      )}
    </div>
  );
};
```

## Features

1. **Modal Interface**: Provides a modal overlay for editing activities without navigating away from the course editor
2. **Activity Type Selection**: Supports different activity types (content, assignment, quiz, discussion)
3. **Form Validation**: Validates required fields before saving
4. **Markdown Support**: Includes a content editor with Markdown support
5. **Due Date Handling**: Provides a date picker for setting due dates
6. **Points Assignment**: Allows assigning point values to activities
7. **Status Management**: Supports setting activity status (not started, in progress, completed)
8. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
9. **Keyboard Navigation**: Supports keyboard navigation for accessibility
10. **Cancel and Save Actions**: Provides clear actions for canceling or saving changes

## Accessibility

The ActivityEditor component is designed with accessibility in mind:

### Keyboard Navigation

- The modal can be navigated using the Tab key
- Form fields follow a logical tab order
- The modal can be closed using the Escape key
- Form can be submitted using Enter when a field is focused
- Cancel and Save buttons are keyboard accessible

### Screen Reader Support

- Form fields have proper labels that are announced by screen readers
- Required fields are properly indicated to screen readers
- Error messages are announced when validation fails
- The modal title indicates whether it's for adding or editing an activity
- Form hints (like Markdown support) are properly associated with their fields

### ARIA Attributes

- The modal has `role="dialog"` and `aria-modal="true"` attributes
- The modal has an appropriate `aria-labelledby` attribute pointing to the title
- Form fields have appropriate `aria-required` attributes for required fields
- Error messages use `aria-live` regions to announce validation errors
- The close button has an appropriate `aria-label`

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Form field borders have sufficient contrast with the background
- Error messages have sufficient contrast
- Buttons have sufficient contrast in all states (default, hover, focus)

### Focus Management

- Focus is trapped within the modal when it's open
- Focus is automatically set to the first form field when the modal opens
- Focus is returned to the triggering element when the modal is closed
- Focus indicators are clearly visible for all interactive elements

## Edge Cases

- **Empty Activity**: When creating a new activity, the component initializes with empty values and validates required fields before saving
- **Invalid Due Date**: If an invalid date format is entered, the component handles this gracefully by clearing the date or showing an error
- **Large Content**: For activities with large content, the textarea expands to accommodate the content while maintaining usability
- **Missing Module ID**: If no moduleId is provided, the component shows an error and prevents saving
- **Form Validation**: The component validates that the activity title is provided before saving
- **Modal Overflow**: On small screens, the modal becomes scrollable to ensure all form fields are accessible
- **Escape Key Handling**: Pressing the Escape key closes the modal without saving changes
- **Unsaved Changes**: The component does not currently warn about unsaved changes when canceling
- **Date Formatting**: The component handles different date formats and timezones when displaying and saving dates
- **Content Preview**: The component does not currently provide a preview of Markdown content

## Implementation Details

Here's a simplified implementation of the ActivityEditor component to help developers understand its inner workings:

```tsx
/**
 * ActivityEditor Component
 *
 * Modal for editing activity details.
 */

import React, { useState } from 'react';
import { Activity } from '../../../types/course';

// Import CSS
import './ActivityEditor.css';

interface ActivityEditorProps {
  activity: Partial<Activity>;
  onSave: (activity: Partial<Activity>) => void;
  onCancel: () => void;
}

const ActivityEditor: React.FC<ActivityEditorProps> = ({
  activity,
  onSave,
  onCancel
}) => {
  // State for the activity data
  const [activityData, setActivityData] = useState<Partial<Activity>>({
    title: activity.title || '',
    description: activity.description || '',
    type: activity.type || 'content',
    status: activity.status || 'not-started',
    points: activity.points || 0,
    dueDate: activity.dueDate || '',
    content: activity.content || ''
  });

  // Handle input change for text and select inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setActivityData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivityData(prev => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : undefined
    }));
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivityData(prev => ({
      ...prev,
      [name]: value ? new Date(value).toISOString() : ''
    }));
  };

  // Format date for input
  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };

  // Handle save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!activityData.title) {
      alert('Activity title is required');
      return;
    }

    onSave({
      ...activity, // Keep original properties
      ...activityData // Override with updated properties
    });
  };

  // Determine if this is a new activity or editing an existing one
  const isNewActivity = activity.id?.startsWith('temp-');

  return (
    <div className="activity-editor-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="activity-editor-modal">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {isNewActivity ? 'Add Activity' : 'Edit Activity'}
          </h2>
          <button
            className="modal-close"
            onClick={onCancel}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Activity Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={activityData.title}
                onChange={handleInputChange}
                placeholder="Enter activity title"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Activity Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={activityData.description}
                onChange={handleInputChange}
                placeholder="Enter activity description"
                rows={3}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Activity Type</label>
                <select
                  id="type"
                  name="type"
                  className="form-control"
                  value={activityData.type}
                  onChange={handleInputChange}
                >
                  <option value="content">Content</option>
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="discussion">Discussion</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Activity Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={activityData.status}
                  onChange={handleInputChange}
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="points">Points</label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  className="form-control"
                  value={activityData.points || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 100"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-control"
                  value={formatDateForInput(activityData.dueDate)}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                value={activityData.content}
                onChange={handleInputChange}
                placeholder="Enter activity content (supports Markdown)"
                rows={8}
              ></textarea>
              <div className="form-hint" id="content-hint">
                You can use Markdown to format your content
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityEditor;
```

## Related Components

- [CourseEditorModules](./CourseEditorModules.md): Parent component that uses ActivityEditor for creating and editing activities
- [ModuleEditor](./ModuleEditor.md): Similar editor component for modules
- [CourseEditor](./CourseEditor.md): Top-level course editor component
- [ActivityHeader](./ActivityHeader.md): Component for displaying activity headers
- [ActivityContent](./ActivityContent.md): Component for displaying activity content
- [ActivityDetailModern](./ActivityDetailModern.md): Component for displaying activity details

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/editor-activityeditor--default).

The Storybook examples demonstrate:

- Creating a new activity
- Editing an existing activity
- Different activity types (content, assignment, quiz, discussion)
- Form validation
- Responsive layout
- Keyboard navigation

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic activity editing |
| 1.1.0 | Added support for different activity types |
| 1.2.0 | Added form validation |
| 1.3.0 | Added responsive design for mobile devices |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements |
| 2.2.0 | Added Markdown support for content |

## Technical Debt

The ActivityEditor component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Inline SVG Icons | SVG icons are defined inline instead of using a component | Reduces reusability and increases file size | Extract SVG icons to separate components | Medium |
| LP-002 | Alert for Validation | Uses browser alert for validation errors | Poor user experience and accessibility | Replace with inline form validation | High |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing Focus Trap | Focus can escape the modal with Tab | Reduces accessibility for keyboard users | Implement focus trap in modal | High |
| A-002 | Missing Escape Key Handler | No explicit handler for Escape key | Reduces accessibility for keyboard users | Add Escape key handler | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Markdown Preview | Add preview for Markdown content | Better user experience | Medium | Medium |
| RFO-002 | Unsaved Changes Warning | Add warning when closing with unsaved changes | Prevents accidental data loss | Low | Medium |
| RFO-003 | Rich Text Editor | Replace plain textarea with rich text editor | Better content editing experience | High | Low |

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [ActivityEditor Version Compatibility Matrix](./ActivityEditor-version-compatibility.md)
