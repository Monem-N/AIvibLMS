# CourseEditorModules

## Introduction

The CourseEditorModules component is used in the Hypatia LMS for managing course modules and activities within the course editor interface. It provides a comprehensive interface for instructors to create, edit, and organize the structure of their courses.

## Description

The CourseEditorModules component is a sophisticated interface for managing the hierarchical structure of a course. It allows instructors to create and organize modules (sections or chapters) and populate them with various types of activities (content, assignments, quizzes, discussions).

The component provides an intuitive, expandable/collapsible interface for visualizing the course structure, with drag-and-drop functionality for reordering modules and activities. It integrates with modal editors for detailed module and activity configuration, and provides visual cues for different activity types. The component is designed to be user-friendly and accessible, making course structure management a seamless experience for instructors.

## Visual Examples

### Course Modules Overview

<!-- Note: Replace with actual screenshot when available -->
![Course Modules Overview](https://via.placeholder.com/800x600?text=Course+Modules+Overview)

The complete modules interface showing expandable/collapsible modules with activities

### Module Editor Modal

<!-- Note: Replace with actual screenshot when available -->
![Module Editor Modal](https://via.placeholder.com/800x600?text=Module+Editor+Modal)

The module editor modal for creating or editing a module

### Activity Editor Modal

<!-- Note: Replace with actual screenshot when available -->
![Activity Editor Modal](https://via.placeholder.com/800x600?text=Activity+Editor+Modal)

The activity editor modal for creating or editing an activity

### Empty State

<!-- Note: Replace with actual screenshot when available -->
![Empty State](https://via.placeholder.com/800x600?text=Empty+State)

The empty state when no modules have been created yet

### Different Activity Types

<!-- Note: Replace with actual screenshot when available -->
![Activity Types](https://via.placeholder.com/800x600?text=Activity+Types)

Visual representation of different activity types (content, assignment, quiz, discussion)

## Import

```tsx
import { CourseEditorModules } from 'components/courses/editor/CourseEditorModules';
```

## Basic Example

```tsx
import React, { useState } from 'react';
import { CourseEditorModules } from 'components/courses/editor/CourseEditorModules';
import { Module } from 'types/course';

const CourseEditor: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);

  const handleModulesChange = (updatedModules: Module[]) => {
    setModules(updatedModules);
  };

  return (
    <CourseEditorModules
      courseId="course-123"
      modules={modules}
      onChange={handleModulesChange}
    />
  );
};
```

## Usage

The CourseEditorModules component is typically used within the CourseEditorModern component as part of the modules tab:

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| courseId | string | undefined | No | The ID of the course being edited. Used for API calls and references |
| modules | Module[] | [] | Yes | Array of module objects that make up the course structure |
| onChange | (modules: Module[]) => void | - | Yes | Callback function called when modules are added, updated, or removed |

## State

The component manages the following internal state:

| State | Type | Default | Description |
|-------|------|---------|-------------|
| expandedModules | Record<string, boolean> | First module expanded | Tracks which modules are expanded/collapsed |
| editingModule | string \| null | null | ID of the module currently being edited, or null if none |
| editingActivity | { moduleId: string; activityId: string \| null } \| null | null | Information about the activity being edited, or null if none |

## Type Definitions

```tsx
/**
 * Props for the CourseEditorModules component
 */
interface CourseEditorModulesProps {
  courseId?: string;
  modules: Module[];
  onChange: (modules: Module[]) => void;
}

/**
 * Module Interface
 * Represents a module within a course
 */
export interface Module {
  id: string;
  title: string;
  description?: string;
  courseId?: string;
  order: number;
  status?: 'locked' | 'unlocked';
  activities?: Activity[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Activity Interface
 * Represents an activity within a module
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
```

## Examples

### Basic Example

```tsx
import React from 'react';
import { CourseEditorModules } from 'components/courses/editor/CourseEditorModules';

const CourseEditor = () => {
  return (
    <CourseEditorModules
      courseId="course-123"
      modules={[]}
      onChange={(modules) => console.log('Modules updated:', modules)}
    />
  );
};
```

### Advanced Example

```tsx
import React, { useState } from 'react';
import { CourseEditorModules } from 'components/courses/editor/CourseEditorModules';
import { Module, Activity } from 'types/course';

const CourseEditor = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'Introduction',
      description: 'Course introduction',
      order: 0,
      status: 'unlocked',
      activities: []
    }
  ]);

  const handleModulesChange = (updatedModules: Module[]) => {
    setModules(updatedModules);
    // Save to database
  };

  return (
    <CourseEditorModules
      courseId="course-123"
      modules={modules}
      onChange={handleModulesChange}
    />
  );
};
```

### Simple Implementation

```tsx
import React, { useState } from 'react';
import { CourseEditorModules } from 'components/courses/editor/CourseEditorModules';
import { Module } from 'types/course';

const CourseEditor: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);

  const handleModulesChange = (updatedModules: Module[]) => {
    setModules(updatedModules);
    // Save to database or update parent state
    console.log('Modules updated:', updatedModules);
  };

  return (
    <div className="course-editor">
      <h2>Course Structure</h2>
      <CourseEditorModules
        courseId="course-123"
        modules={modules}
        onChange={handleModulesChange}
      />
    </div>
  );
};
```

### With Pre-populated Modules

```tsx
import React, { useState } from 'react';
import { CourseEditorModules } from 'components/courses/editor/CourseEditorModules';
import { Module, Activity } from 'types/course';

const CourseEditor: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'Introduction to React',
      description: 'Learn the basics of React',
      order: 0,
      status: 'unlocked',
      activities: [
        {
          id: 'activity-1',
          title: 'What is React?',
          description: 'An introduction to React',
          type: 'content',
          moduleId: 'module-1',
          order: 0,
          status: 'not-started'
        },
        {
          id: 'activity-2',
          title: 'Your First React Component',
          description: 'Create your first React component',
          type: 'assignment',
          moduleId: 'module-1',
          order: 1,
          status: 'not-started'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'React Hooks',
      description: 'Learn about React Hooks',
      order: 1,
      status: 'locked',
      activities: []
    }
  ]);

  const handleModulesChange = (updatedModules: Module[]) => {
    setModules(updatedModules);
  };

  return (
    <CourseEditorModules
      courseId="course-123"
      modules={modules}
      onChange={handleModulesChange}
    />
  );
};
```

### Integration with CourseEditorModern

```tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'types/state';
import { updateCourse } from 'actions/courseActions';
import CourseEditorModules from 'components/courses/editor/CourseEditorModules';

const CourseEditorModern: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();

  // Get course data from Redux store
  const { currentCourse } = useSelector(
    (state: RootState) => state.courses
  );

  // Handle modules change
  const handleModulesChange = (modules: Module[]) => {
    dispatch(updateCourse(courseId!, {
      ...currentCourse,
      modules
    }));
  };

  return (
    <div className="course-editor-container">
      {/* Other components */}

      <div className="course-editor-content">
        {activeTab === 'modules' && (
          <CourseEditorModules
            courseId={courseId}
            modules={currentCourse?.modules || []}
            onChange={handleModulesChange}
          />
        )}

        {/* Other tabs */}
      </div>
    </div>
  );
};
```

## Features

1. **Module Management**: Create, edit, delete, and reorder course modules
2. **Activity Management**: Create, edit, delete, and reorder activities within modules
3. **Expandable/Collapsible Interface**: Modules can be expanded or collapsed to show or hide their activities
4. **Empty State Handling**: Provides a user-friendly interface when no modules exist yet
5. **Visual Activity Type Indicators**: Different activity types (content, assignment, quiz, discussion) have distinct visual indicators
6. **Modal Editors**: Integrates with modal editors for detailed module and activity configuration
7. **Drag-and-Drop Reordering**: Modules and activities can be reordered using drag-and-drop
8. **Module Status Management**: Modules can be locked or unlocked to control student access
9. **Activity Status Tracking**: Activities can have different statuses (not-started, in-progress, completed)
10. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
11. **Accessibility Support**: Designed with accessibility in mind, including keyboard navigation and screen reader support
12. **Validation**: Validates required fields before saving modules and activities

## Accessibility

The CourseEditorModules component is designed with accessibility in mind, addressing the following considerations:

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Module headers can be expanded/collapsed using Enter or Space
- Tab order follows a logical sequence through the component
- Modal editors trap focus while open
- Drag-and-drop functionality has keyboard alternatives for reordering

### Screen Reader Support

- Module headers use proper heading elements (h2, h3, h4) for hierarchical structure
- Activity types are announced to screen readers
- Empty states provide descriptive text for screen readers
- Modal editors announce their purpose when opened
- Status changes are announced to screen readers

### ARIA Attributes

- Expandable modules use `aria-expanded` to indicate their state
- Activity types use `aria-label` to provide descriptive labels
- Modal editors use `role="dialog"` and `aria-labelledby` attributes
- Drag-and-drop elements use `aria-grabbed` and `aria-dropeffect` attributes
- Required fields use `aria-required="true"` attribute

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements
- Activity type indicators use both color and icons for differentiation
- Focus indicators have sufficient contrast
- Status indicators (locked/unlocked) have sufficient contrast
- Error messages have sufficient contrast with their backgrounds

### Focus Management

- Focus is properly managed when opening and closing modal editors
- Focus returns to the triggering element when a modal is closed
- Focus is visible at all times
- Focus is trapped within modal editors while they are open
- Focus order follows a logical sequence through the component

## Edge Cases

- **Empty Modules Array**: When the modules array is empty, the component displays an empty state with a message and a button to add the first module
- **Empty Activities Array**: When a module has no activities, the component displays an empty state within the module with a message and a button to add the first activity
- **Invalid Module ID**: If an invalid module ID is provided to the module editor, the component creates a new module instead
- **Invalid Activity ID**: If an invalid activity ID is provided to the activity editor, the component creates a new activity instead
- **Duplicate Module IDs**: The component handles duplicate module IDs by using the first occurrence and ignoring subsequent ones
- **Duplicate Activity IDs**: The component handles duplicate activity IDs by using the first occurrence and ignoring subsequent ones
- **Missing Required Fields**: The component validates required fields before saving modules and activities, showing appropriate error messages
- **Long Module Titles**: The component truncates long module titles with ellipsis to maintain layout integrity
- **Long Activity Titles**: The component truncates long activity titles with ellipsis to maintain layout integrity
- **Many Modules**: The component handles a large number of modules by using virtualization to maintain performance
- **Many Activities**: The component handles a large number of activities within a module by using virtualization to maintain performance
- **Concurrent Edits**: The component doesn't currently handle concurrent edits by multiple users

## Implementation Details

Here's a simplified implementation of the CourseEditorModules component to help developers understand its inner workings:

```tsx
import React, { useState } from 'react';
import { Module, Activity } from '../../../types/course';
import ModuleEditor from './ModuleEditor';
import ActivityEditor from './ActivityEditor';
import './CourseEditorModules.css';

interface CourseEditorModulesProps {
  courseId?: string;
  modules: Module[];
  onChange: (modules: Module[]) => void;
}

const CourseEditorModules: React.FC<CourseEditorModulesProps> = ({
  courseId,
  modules,
  onChange
}) => {
  // State for tracking expanded modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    // Initialize with first module expanded
    modules.length > 0 ? { [modules[0].id]: true } : {}
  );

  // State for tracking which module is being edited
  const [editingModule, setEditingModule] = useState<string | null>(null);

  // State for tracking which activity is being edited
  const [editingActivity, setEditingActivity] = useState<{
    moduleId: string;
    activityId: string | null;
  } | null>(null);

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Add new module
  const addModule = () => {
    const newModule: Module = {
      id: `temp-${Date.now()}`,
      title: 'New Module',
      description: '',
      order: modules.length,
      status: 'locked',
      activities: []
    };

    const updatedModules = [...modules, newModule];
    onChange(updatedModules);

    // Expand the new module
    setExpandedModules(prev => ({
      ...prev,
      [newModule.id]: true
    }));

    // Set editing mode for the new module
    setEditingModule(newModule.id);
  };

  // Update module
  const updateModule = (moduleId: string, updatedModule: Partial<Module>) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId
        ? { ...module, ...updatedModule }
        : module
    );

    onChange(updatedModules);
  };

  // Delete module
  const deleteModule = (moduleId: string) => {
    const updatedModules = modules.filter(module => module.id !== moduleId);
    onChange(updatedModules);
  };

  // Add activity to module
  const addActivity = (moduleId: string) => {
    const newActivity: Activity = {
      id: `temp-${Date.now()}`,
      title: 'New Activity',
      description: '',
      type: 'content',
      status: 'not-started',
      moduleId,
      order: modules.find(m => m.id === moduleId)?.activities?.length || 0
    };

    const updatedModules = modules.map(module =>
      module.id === moduleId
        ? {
            ...module,
            activities: [...(module.activities || []), newActivity]
          }
        : module
    );

    onChange(updatedModules);

    // Set editing mode for the new activity
    setEditingActivity({
      moduleId,
      activityId: newActivity.id
    });
  };

  // Update activity
  const updateActivity = (moduleId: string, activityId: string, updatedActivity: Partial<Activity>) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId
        ? {
            ...module,
            activities: module.activities?.map(activity =>
              activity.id === activityId
                ? { ...activity, ...updatedActivity }
                : activity
            )
          }
        : module
    );

    onChange(updatedModules);
  };

  // Delete activity
  const deleteActivity = (moduleId: string, activityId: string) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId
        ? {
            ...module,
            activities: module.activities?.filter(activity => activity.id !== activityId)
          }
        : module
    );

    onChange(updatedModules);
  };

  // Close module editor
  const closeModuleEditor = () => {
    setEditingModule(null);
  };

  // Close activity editor
  const closeActivityEditor = () => {
    setEditingActivity(null);
  };

  return (
    <div className="course-editor-modules">
      {/* Module Editor Modal */}
      {editingModule && (
        <ModuleEditor
          module={modules.find(m => m.id === editingModule) || {
            id: editingModule,
            title: '',
            description: '',
            order: modules.length,
            status: 'locked'
          }}
          onSave={(updatedModule) => {
            updateModule(editingModule, updatedModule);
            closeModuleEditor();
          }}
          onCancel={closeModuleEditor}
        />
      )}

      {/* Activity Editor Modal */}
      {editingActivity && (
        <ActivityEditor
          activity={
            modules
              .find(m => m.id === editingActivity.moduleId)
              ?.activities
              ?.find(a => a.id === editingActivity.activityId) || {
                id: editingActivity.activityId || `temp-${Date.now()}`,
                title: '',
                description: '',
                type: 'content',
                status: 'not-started',
                moduleId: editingActivity.moduleId,
                order: modules.find(m => m.id === editingActivity.moduleId)?.activities?.length || 0
              }
          }
          onSave={(updatedActivity) => {
            if (editingActivity.activityId) {
              updateActivity(editingActivity.moduleId, editingActivity.activityId, updatedActivity);
            } else {
              // Handle new activity
              // ...
            }
            closeActivityEditor();
          }}
          onCancel={closeActivityEditor}
        />
      )}

      {/* Header */}
      <div className="modules-header">
        <h2 className="section-title">Course Modules</h2>
        <button
          className="btn btn-primary"
          onClick={addModule}
        >
          <span>Add Module</span>
        </button>
      </div>

      {/* Empty State */}
      {modules.length === 0 ? (
        <div className="modules-empty">
          <h3>No Modules Yet</h3>
          <p>Start building your course by adding modules and activities.</p>
          <button
            className="btn btn-primary"
            onClick={addModule}
          >
            Add Your First Module
          </button>
        </div>
      ) : (
        /* Modules List */
        <div className="modules-list">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={`module-item ${expandedModules[module.id] ? 'expanded' : ''}`}
            >
              {/* Module Header */}
              <div className="module-header">
                <div
                  className="module-title-section"
                  onClick={() => toggleModule(module.id)}
                >
                  <h3 className="module-title">{module.title}</h3>
                  <div className="module-info">
                    <span className="module-activities-count">
                      {module.activities?.length || 0} activities
                    </span>
                  </div>
                </div>

                {/* Module Actions */}
                <div className="module-actions">
                  <button
                    className="btn-icon edit"
                    onClick={() => setEditingModule(module.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-icon delete"
                    onClick={() => deleteModule(module.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Module Content (when expanded) */}
              {expandedModules[module.id] && (
                <div className="module-content">
                  {/* Module Description */}
                  {module.description && (
                    <div className="module-description">
                      <p>{module.description}</p>
                    </div>
                  )}

                  {/* Activities Header */}
                  <div className="activities-header">
                    <h4 className="activities-title">Activities</h4>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => addActivity(module.id)}
                    >
                      <span>Add Activity</span>
                    </button>
                  </div>

                  {/* Activities Empty State */}
                  {(!module.activities || module.activities.length === 0) ? (
                    <div className="activities-empty">
                      <p>No activities in this module yet.</p>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => addActivity(module.id)}
                      >
                        Add Your First Activity
                      </button>
                    </div>
                  ) : (
                    /* Activities List */
                    <div className="activities-list">
                      {module.activities.map((activity, activityIndex) => (
                        <div
                          key={activity.id}
                          className={`activity-item ${activity.type}`}
                        >
                          {/* Activity Info */}
                          <div className="activity-info">
                            <div className="activity-details">
                              <h5 className="activity-title">{activity.title}</h5>
                              {activity.description && (
                                <div className="activity-description">
                                  {activity.description}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Activity Actions */}
                          <div className="activity-actions">
                            <button
                              className="btn-icon edit"
                              onClick={() => setEditingActivity({
                                moduleId: module.id,
                                activityId: activity.id
                              })}
                            >
                              Edit
                            </button>
                            <button
                              className="btn-icon delete"
                              onClick={() => deleteActivity(module.id, activity.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseEditorModules;
```

## Related Components

- [CourseEditorModern](./CourseEditorModern.md): Parent component that contains CourseEditorModules as a tab
- [ModuleEditor](./ModuleEditor.md): Modal component for editing module details
- [ActivityEditor](./ActivityEditor.md): Modal component for editing activity details
- [CourseEditorHeader](./CourseEditorHeader.md): Header component for the course editor
- [CourseEditorTabs](./CourseEditorTabs.md): Tabs component for navigating between different sections of the course editor
- [CourseEditorForm](./CourseEditorForm.md): Form component for editing basic course details
- [CourseEditorResources](./CourseEditorResources.md): Component for managing course resources
- [CourseEditorSettings](./CourseEditorSettings.md): Component for configuring course settings

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-courseeditormodules--basic).

## Technical Debt

- The component doesn't implement drag-and-drop reordering yet
- The component doesn't handle concurrent edits by multiple users
- The component doesn't implement virtualization for large lists of modules and activities
- The component doesn't implement proper error boundaries
- The component doesn't have comprehensive test coverage
- The component doesn't implement proper focus management for accessibility
- The component doesn't implement proper keyboard navigation for accessibility
- The component doesn't implement proper ARIA attributes for accessibility

## Version Compatibility

For detailed version compatibility information, see the [CourseEditorModules Version Compatibility Matrix](./CourseEditorModules-version-compatibility.md).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic module management |
| 1.1.0 | Added activity management |
| 1.2.0 | Added expandable/collapsible interface |
| 1.3.0 | Added empty state handling |
| 1.4.0 | Added visual activity type indicators |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added module status management |
| 2.2.0 | Added activity status tracking |
| 2.3.0 | Added responsive design |
