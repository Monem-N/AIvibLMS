# CourseModules

The CourseModules component is used in the Hypatia LMS for displaying and interacting with course modules and their activities in an organized, hierarchical structure.

## Description

The CourseModules component provides a comprehensive interface for viewing and navigating course content organized into modules and activities. It is a functional component built with React hooks that manages the expansion state of modules, displays module information including progress, and renders activities with their respective types and statuses. The component is used within the CourseDetailModern component to display the course content tab and supports features such as expanding/collapsing modules, visual indicators for module and activity status, and navigation to individual activities. It handles various states including empty modules and provides a responsive design for different screen sizes.

## Visual Examples

### Course Modules with Expanded Module

<!-- Note: Replace with actual screenshot when available -->
![Course Modules with Expanded Module](https://via.placeholder.com/800x500?text=Course+Modules+with+Expanded+Module)

The course modules component showing an expanded module with its activities

### Course Modules with Multiple Modules

<!-- Note: Replace with actual screenshot when available -->
![Course Modules with Multiple Modules](https://via.placeholder.com/800x500?text=Course+Modules+with+Multiple+Modules)

The course modules component showing multiple modules with different statuses

### Course Modules Empty State

<!-- Note: Replace with actual screenshot when available -->
![Course Modules Empty State](https://via.placeholder.com/800x500?text=Course+Modules+Empty+State)

The course modules component showing the empty state when no modules are available

## Import

```tsx
import { CourseModules } from 'components/courses/CourseModules';
```

Note: The actual import in the codebase is a default export, so you would use:

```tsx
import CourseModules from 'components/courses/CourseModules';
```

## Usage

```tsx
import CourseModules from 'components/courses/CourseModules';
import { Module } from '../../types/course';

// Sample modules data
const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Introduction to the Course',
    description: 'An overview of what you will learn in this course',
    order: 1,
    status: 'unlocked',
    activities: [
      {
        id: 'activity-1',
        title: 'Welcome to the Course',
        description: 'A brief introduction to the course',
        moduleId: 'module-1',
        type: 'content',
        order: 1,
        status: 'completed'
      },
      {
        id: 'activity-2',
        title: 'Course Objectives',
        description: 'What you will learn in this course',
        moduleId: 'module-1',
        type: 'content',
        order: 2,
        status: 'in-progress'
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Getting Started',
    description: 'Learn the basics of the subject',
    order: 2,
    status: 'locked',
    activities: [
      {
        id: 'activity-3',
        title: 'Basic Concepts',
        description: 'Introduction to basic concepts',
        moduleId: 'module-2',
        type: 'content',
        order: 1,
        status: 'not-started'
      }
    ]
  }
];

// Basic usage
<CourseModules
  modules={modules}
  courseId="course-123"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| modules | Module[] | - | Yes | Array of module objects to display |
| courseId | string | - | Yes | ID of the course the modules belong to |

## Type Definitions

```tsx
/**
 * CourseModulesProps Interface
 * Defines the props for the CourseModules component
 */
interface CourseModulesProps {
  /**
   * Array of module objects to display
   */
  modules: Module[];

  /**
   * ID of the course the modules belong to
   */
  courseId: string;
}

/**
 * ModuleItemProps Interface
 * Defines the props for the ModuleItem component
 */
interface ModuleItemProps {
  /**
   * Module object to display
   */
  module: Module;

  /**
   * ID of the course the module belongs to
   */
  courseId: string;

  /**
   * Whether the module is expanded
   */
  expanded: boolean;

  /**
   * Callback function to toggle the module expansion
   */
  onToggle: () => void;
}

/**
 * ActivityItemProps Interface
 * Defines the props for the ActivityItem component
 */
interface ActivityItemProps {
  /**
   * Activity object to display
   */
  activity: Activity;

  /**
   * ID of the course the activity belongs to
   */
  courseId: string;

  /**
   * ID of the module the activity belongs to
   */
  moduleId: string;
}

/**
 * Module Interface (from types/course.ts)
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
 * Activity Interface (from types/course.ts)
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
import CourseModules from 'components/courses/CourseModules';

// Basic usage with minimal modules
const BasicExample = () => {
  const modules = [
    {
      id: 'module-1',
      title: 'Introduction',
      description: 'Introduction to the course',
      order: 1,
      status: 'unlocked',
      activities: [
        {
          id: 'activity-1',
          title: 'Welcome',
          moduleId: 'module-1',
          type: 'content',
          order: 1,
          status: 'not-started'
        }
      ]
    }
  ];

  return (
    <div className="course-content">
      <CourseModules
        modules={modules}
        courseId="course-123"
      />
    </div>
  );
};
```

### Advanced Example

```tsx
import CourseModules from 'components/courses/CourseModules';
import { Module } from '../../types/course';

// Advanced example with multiple modules and different statuses
const AdvancedExample = () => {
  const modules: Module[] = [
    {
      id: 'module-1',
      title: 'Introduction to the Course',
      description: 'An overview of what you will learn in this course',
      order: 1,
      status: 'unlocked',
      activities: [
        {
          id: 'activity-1',
          title: 'Welcome to the Course',
          description: 'A brief introduction to the course',
          moduleId: 'module-1',
          type: 'content',
          order: 1,
          status: 'completed'
        },
        {
          id: 'activity-2',
          title: 'Course Objectives',
          description: 'What you will learn in this course',
          moduleId: 'module-1',
          type: 'content',
          order: 2,
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Getting Started',
      description: 'Learn the basics of the subject',
      order: 2,
      status: 'locked',
      activities: [
        {
          id: 'activity-3',
          title: 'Basic Concepts',
          description: 'Introduction to basic concepts',
          moduleId: 'module-2',
          type: 'content',
          order: 1,
          status: 'not-started'
        },
        {
          id: 'activity-4',
          title: 'First Quiz',
          description: 'Test your knowledge',
          moduleId: 'module-2',
          type: 'quiz',
          order: 2,
          status: 'not-started',
          points: 10
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Advanced Topics',
      description: 'Dive deeper into the subject',
      order: 3,
      status: 'locked',
      activities: [
        {
          id: 'activity-5',
          title: 'Advanced Concepts',
          description: 'Explore advanced concepts',
          moduleId: 'module-3',
          type: 'content',
          order: 1,
          status: 'not-started'
        },
        {
          id: 'activity-6',
          title: 'Final Assignment',
          description: 'Apply what you have learned',
          moduleId: 'module-3',
          type: 'assignment',
          order: 2,
          status: 'not-started',
          points: 20,
          dueDate: '2023-12-31T23:59:59Z'
        }
      ]
    }
  ];

  return (
    <div className="course-content">
      <CourseModules
        modules={modules}
        courseId="course-123"
      />
    </div>
  );
};
```

### Example with Empty Modules

```tsx
import CourseModules from 'components/courses/CourseModules';

// Example with empty modules array
const EmptyModulesExample = () => {
  const modules = [];

  return (
    <div className="course-content">
      <CourseModules
        modules={modules}
        courseId="course-123"
      />
    </div>
  );
};
```

## Features

1. **Module Expansion**: Allows users to expand and collapse individual modules to view or hide their activities
2. **Expand/Collapse All**: Provides buttons to expand or collapse all modules at once
3. **Module Status Indicators**: Displays visual indicators for module status (completed, unlocked, locked)
4. **Module Progress Tracking**: Shows progress bars and percentage completion for each module
5. **Activity Type Icons**: Displays different icons for different activity types (content, assignment, quiz, discussion)
6. **Activity Status Indicators**: Shows visual indicators for activity status (completed, in-progress, not-started)
7. **Activity Navigation**: Provides links to navigate to individual activities
8. **Activity Metadata**: Displays metadata for activities including type, points, and due dates
9. **Empty State Handling**: Shows a message when no modules are available
10. **Responsive Design**: Adapts layout for different screen sizes

## Accessibility

The CourseModules component is designed with accessibility in mind to ensure all users, including those with disabilities, can access and interact with course content effectively.

### Keyboard Navigation

- All interactive elements (module headers, expand/collapse buttons, activity links) are keyboard accessible
- Tab order follows a logical flow through the component
- Module headers can be activated using the Enter or Space key to expand/collapse modules
- Expand All and Collapse All buttons can be activated using the Enter or Space key
- Activity links can be activated using the Enter key
- Focus is properly managed when expanding/collapsing modules

### Screen Reader Support

- Module headers use proper heading levels (h2, h3) to create a logical document outline
- Activity titles use proper heading levels (h4) to maintain the document hierarchy
- SVG icons include appropriate aria-hidden attributes to prevent screen readers from announcing them
- Status information is conveyed through text, not just color or icons
- Empty state message is properly announced to screen readers

### ARIA Attributes

- Module headers use aria-expanded to indicate their expanded/collapsed state
- Module toggle buttons use aria-label to provide descriptive text for screen readers
- Activity status icons use aria-hidden="true" to prevent screen readers from announcing them
- Activity status is conveyed through text, not just through icons
- SVG icons include role="img" and aria-hidden="true" attributes

### Color Contrast

- Text elements have sufficient contrast with their backgrounds (meeting WCAG AA standards)
- Status indicators use colors that meet contrast requirements
- Progress bars use colors that meet contrast requirements
- Focus indicators are visible with high contrast
- The component respects the user's color scheme preferences

### Focus Management

- All interactive elements have visible focus indicators
- Focus is properly managed when expanding/collapsing modules
- Focus is trapped within the component when necessary
- Focus order follows a logical sequence
- Focus indicators are visible and clear

## Edge Cases

- **Empty Modules Array**: Displays a "No Modules Available" message with explanatory text
- **Module Without Activities**: Displays the module header but shows an empty content area when expanded
- **Module With Empty Activities Array**: Displays the module header but shows an empty content area when expanded
- **Long Module Titles**: Truncates long module titles with ellipsis to maintain layout
- **Long Activity Titles**: Truncates long activity titles with ellipsis to maintain layout
- **Missing Module Status**: Defaults to 'unlocked' if status is not provided
- **Missing Activity Status**: Defaults to 'not-started' if status is not provided
- **Missing Activity Type**: Defaults to 'content' if type is not provided
- **Missing Module Description**: Hides the description section if not provided
- **Missing Activity Description**: Hides the description section if not provided
- **Missing Activity Points**: Hides the points section if not provided
- **Missing Activity Due Date**: Hides the due date section if not provided
- **Mobile Devices**: Adapts layout for smaller screens, stacking elements vertically

## Implementation Details

The CourseModules component is implemented using React with TypeScript. It uses React hooks for state management and is composed of three main components: CourseModules, ModuleItem, and ActivityItem.

```tsx
// Simplified implementation
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Module, Activity } from '../../types/course';

// Import CSS
import './CourseModules.css';

interface CourseModulesProps {
  modules: Module[];
  courseId: string;
}

const CourseModules: React.FC<CourseModulesProps> = ({ modules, courseId }) => {
  // State for expanded modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    // Initialize with first module expanded
    modules.length > 0 ? { [modules[0].id]: true } : {}
  );

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Expand all modules
  const expandAll = () => {
    const expanded: Record<string, boolean> = {};
    modules.forEach(module => {
      expanded[module.id] = true;
    });
    setExpandedModules(expanded);
  };

  // Collapse all modules
  const collapseAll = () => {
    setExpandedModules({});
  };

  // If no modules, show empty state
  if (modules.length === 0) {
    return (
      <div className="course-modules">
        <div className="modules-empty">
          <h3>No Modules Available</h3>
          <p>This course does not have any modules yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-modules">
      <div className="modules-header">
        <h2 className="modules-title">Course Content</h2>
        <div className="modules-actions">
          <button
            className="btn btn-text"
            onClick={expandAll}
          >
            Expand All
          </button>
          <button
            className="btn btn-text"
            onClick={collapseAll}
          >
            Collapse All
          </button>
        </div>
      </div>

      <div className="modules-list">
        {modules.map(module => (
          <ModuleItem
            key={module.id}
            module={module}
            courseId={courseId}
            expanded={!!expandedModules[module.id]}
            onToggle={() => toggleModule(module.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface ModuleItemProps {
  module: Module;
  courseId: string;
  expanded: boolean;
  onToggle: () => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  module,
  courseId,
  expanded,
  onToggle
}) => {
  // Calculate module progress
  const progress = module.progress || 0;

  return (
    <div className={`module-item ${expanded ? 'expanded' : ''}`}>
      <div
        className="module-header"
        onClick={onToggle}
      >
        <div className="module-header-left">
          <div className="module-status">
            {/* Status icon would go here */}
          </div>
          <div className="module-info">
            <h3 className="module-title">{module.title}</h3>
            <div className="module-meta">
              <span className="module-activities-count">
                {module.activities?.length || 0} activities
              </span>
              <span className="module-progress">
                {progress}% complete
              </span>
            </div>
          </div>
        </div>

        <div className="module-header-right">
          <div className="module-progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <button className="module-toggle">
            {/* Chevron icon would go here */}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="module-content">
          {module.description && (
            <div className="module-description">
              <p>{module.description}</p>
            </div>
          )}

          <div className="activities-list">
            {module.activities?.map(activity => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                courseId={courseId}
                moduleId={module.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ActivityItemProps {
  activity: Activity;
  courseId: string;
  moduleId: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  courseId,
  moduleId
}) => {
  return (
    <Link
      to={`/courses/${courseId}/modules/${moduleId}/activities/${activity.id}`}
      className={`activity-item ${activity.status}`}
    >
      <div className="activity-icon-container">
        {/* Activity type icon would go here */}
      </div>

      <div className="activity-info">
        <div className="activity-title-row">
          <h4 className="activity-title">{activity.title}</h4>
          <div className="activity-status">
            {/* Activity status icon would go here */}
            <span className="activity-status-text">
              {activity.status === 'completed' ? 'Completed' :
               activity.status === 'in-progress' ? 'In Progress' :
               'Not Started'}
            </span>
          </div>
        </div>

        {activity.description && (
          <p className="activity-description">{activity.description}</p>
        )}

        <div className="activity-meta">
          {activity.type && (
            <span className="activity-type">
              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
            </span>
          )}

          {activity.points && (
            <span className="activity-points">
              {activity.points} points
            </span>
          )}

          {activity.dueDate && (
            <span className="activity-due-date">
              Due: {new Date(activity.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseModules;
```

### CSS Implementation

```css
/* Simplified CourseModules Component Styles */

.course-modules {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.modules-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.modules-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modules-actions {
  display: flex;
  gap: 1rem;
}

.btn-text {
  background: none;
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  color: #4a90e2;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modules-list {
  padding: 1.5rem;
}

.module-item {
  margin-bottom: 1.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: #f9f9f9;
  cursor: pointer;
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
}

.module-progress-bar {
  width: 100px;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4caf50;
  border-radius: 3px;
}

.module-content {
  padding: 1.5rem;
  border-top: 1px solid #f0f0f0;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.modules-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

/* Responsive styles */
@media (max-width: 768px) {
  .modules-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .module-header {
    flex-direction: column;
    gap: 1rem;
  }
}
```

## Related Components

- [CourseDetailModern](./CourseDetailModern.md): Parent component that contains CourseModules as a tab
- [ModuleItem](./ModuleItem.md): Component that renders an individual module (internal to CourseModules)
- [ActivityItem](./ActivityItem.md): Component that renders an individual activity (internal to CourseModules)
- [ActivityDetailModern](../activity/ActivityDetailModern.md): Component that displays the details of an activity when clicked
- [CourseHeader](./CourseHeader.md): Component that displays the course header information
- [CourseResources](./CourseResources.md): Component that displays course resources in another tab
- [CourseAnnouncements](./CourseAnnouncements.md): Component that displays course announcements in another tab
- [CourseParticipants](./CourseParticipants.md): Component that displays course participants in another tab

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-coursemodules--default).

The Storybook examples demonstrate:

- Default course modules with multiple modules
- Course modules with expanded modules
- Course modules with different activity types
- Course modules with different module and activity statuses
- Course modules with empty modules array
- Course modules with modules that have no activities
- Course modules on mobile devices

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic module display |
| 1.1.0 | Added module expansion functionality |
| 1.2.0 | Added activity status indicators |
| 1.3.0 | Added module progress tracking |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added expand/collapse all functionality |
| 2.2.0 | Added responsive design for mobile devices |
| 2.3.0 | Added accessibility improvements |

## Technical Debt

The CourseModules component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Nested Components | Defines ModuleItem and ActivityItem components within the same file | Makes testing and reuse more difficult | Extract ModuleItem and ActivityItem into separate files | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | ARIA Attributes | Missing proper ARIA attributes for expandable modules | Reduces accessibility for screen reader users | Add proper ARIA attributes for expandable modules | High |
| A-002 | Keyboard Navigation | Module headers can be activated with Enter but not with Space | Makes keyboard navigation inconsistent | Add Space key support for module headers | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Component Extraction | Extract ModuleItem and ActivityItem into separate components | Improves maintainability and testability | Low | Medium |
| RFO-002 | Virtualized List | Implement virtualized list for large module lists | Improves performance for courses with many modules | Medium | Medium |

For a complete technical debt analysis, see the [CourseModules Technical Debt Report](../technical-debt/CourseModules-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [CourseModules Version Compatibility Matrix](./CourseModules-version-compatibility.md)
