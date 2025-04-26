# CourseTabs

## Introduction

The CourseTabs component is used in the Hypatia LMS for navigation between different sections of a course detail page.

## Description

The CourseTabs component provides a tabbed navigation interface for the course detail page, allowing users to switch between different views of course content such as modules, resources, announcements, and participants. It displays the count of items in each tab (e.g., number of modules, resources) and uses icons to visually represent each section. The component is designed to be responsive and accessible, with clear visual indicators for the active tab and hover states for better user experience.

## Visual Examples

### Standard Tabs View

<!-- Note: Replace with actual screenshot when available -->
![Standard Tabs View](https://via.placeholder.com/800x100?text=Course+Tabs+Standard+View)

The standard view showing all tabs with the Modules tab active

### Tabs with Counts

<!-- Note: Replace with actual screenshot when available -->
![Tabs with Counts](https://via.placeholder.com/800x100?text=Course+Tabs+With+Counts)

Tabs displaying the count of items in each section

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x200?text=Course+Tabs+Mobile+View)

The responsive layout on mobile devices with tabs arranged in a 2x2 grid

## Import

```tsx
import { CourseTabs } from 'components/courses/CourseTabs';
```

## Usage

```tsx
import React, { useState } from 'react';
import { CourseTabs } from 'components/courses/CourseTabs';
import { Course } from 'types/course';

// Example course data
const course: Course = {
  id: 'course-123',
  title: 'Introduction to React',
  modules: [/* array of modules */],
  resources: [/* array of resources */],
  announcements: [/* array of announcements */],
  enrollmentCount: 25,
  // other course properties
};

const CourseDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('modules');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="course-detail">
      {/* Course header */}

      <CourseTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        course={course}
      />

      {/* Tab content based on activeTab */}
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| activeTab | string | - | Yes | The ID of the currently active tab |
| onTabChange | (tab: string) => void | - | Yes | Callback function called when a tab is clicked |
| course | Course | - | Yes | The course object containing data for tab counts |

## Type Definitions

```tsx
/**
 * CourseTabsProps Interface
 */
interface CourseTabsProps {
  /**
   * The ID of the currently active tab
   */
  activeTab: string;

  /**
   * Callback function called when a tab is clicked
   */
  onTabChange: (tab: string) => void;

  /**
   * The course object containing data for tab counts
   */
  course: Course;
}

/**
 * Course Interface (from types/course.ts)
 * Relevant properties used by CourseTabs
 */
interface Course {
  /**
   * Unique identifier for the course
   */
  id: string;

  /**
   * Course title
   */
  title: string;

  /**
   * Array of course modules
   */
  modules?: Module[];

  /**
   * Array of course resources
   */
  resources?: Attachment[];

  /**
   * Array of course announcements
   */
  announcements?: Announcement[];

  /**
   * Number of enrolled students
   */
  enrollmentCount?: number;

  // Other course properties...
}
```

## Examples

### Basic Example

```tsx
<CourseTabs
  activeTab="modules"
  onTabChange={(tab) => setActiveTab(tab)}
  course={course}
/>
```

### Example with Course Detail Page

```tsx
import React, { useState } from 'react';
import { CourseTabs } from 'components/courses/CourseTabs';
import CourseHeader from 'components/courses/CourseHeader';
import CourseModules from 'components/courses/CourseModules';
import CourseResources from 'components/courses/CourseResources';
import CourseAnnouncements from 'components/courses/CourseAnnouncements';
import CourseParticipants from 'components/courses/CourseParticipants';
import { Course } from 'types/course';

const CourseDetailPage: React.FC<{ course: Course }> = ({ course }) => {
  const [activeTab, setActiveTab] = useState<string>('modules');

  return (
    <div className="course-detail">
      <CourseHeader course={course} />

      <CourseTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        course={course}
      />

      <div className="course-content">
        {activeTab === 'modules' && (
          <CourseModules
            modules={course.modules || []}
            courseId={course.id}
          />
        )}

        {activeTab === 'resources' && (
          <CourseResources
            resources={course.resources || []}
            courseId={course.id}
          />
        )}

        {activeTab === 'announcements' && (
          <CourseAnnouncements
            courseId={course.id}
          />
        )}

        {activeTab === 'participants' && (
          <CourseParticipants
            courseId={course.id}
          />
        )}
      </div>
    </div>
  );
};
```

### Example with Empty Course

```tsx
// Course with no modules, resources, announcements, or participants
const emptyCourse: Course = {
  id: 'course-123',
  title: 'New Course',
  modules: [],
  resources: [],
  announcements: [],
  enrollmentCount: 0
};

<CourseTabs
  activeTab="modules"
  onTabChange={(tab) => setActiveTab(tab)}
  course={emptyCourse}
/>
```

## Features

1. **Tab Navigation**: Provides a tabbed interface for navigating between different sections of a course
2. **Item Counts**: Displays the count of items in each tab (modules, resources, announcements, participants)
3. **Visual Icons**: Uses SVG icons to visually represent each tab section
4. **Active Tab Indication**: Clearly indicates the active tab with color and border styling
5. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
6. **Hover States**: Provides visual feedback on hover for better user experience
7. **Accessible Navigation**: Uses semantic HTML and proper ARIA attributes for accessibility
8. **Dynamic Content**: Automatically updates tab counts based on course data
9. **Flexible Integration**: Easily integrates with course detail pages and other components
10. **Consistent Styling**: Follows the design system for consistent look and feel

## Accessibility

The CourseTabs component is designed with accessibility in mind:

### Keyboard Navigation

- All tab buttons are fully keyboard accessible using the Tab key
- The active tab can be triggered using the Enter or Space key
- Tab order follows a logical sequence from left to right
- Focus indicators are clearly visible with high contrast outlines

### Screen Reader Support

- Tab buttons use semantic HTML (button elements) for better screen reader navigation
- Tab labels are properly announced by screen readers
- Tab counts are properly announced as part of the tab label
- SVG icons include appropriate ARIA attributes to ensure they are properly announced or hidden from screen readers

### ARIA Attributes

- The active tab has `aria-pressed="true"` to indicate its selected state
- SVG icons have `aria-hidden="true"` to prevent them from being announced separately
- Tab counts are part of the accessible name of the tab button
- The tabs container has appropriate ARIA attributes to indicate its role

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- The active tab indicator has sufficient contrast with the background
- Tab count badges have sufficient contrast with their backgrounds
- Focus indicators have sufficient contrast with the background

### Focus Management

- Focus is properly managed when switching between tabs
- Focus indicators are clearly visible for all interactive elements
- Focus states are consistent with the rest of the application
- No focus traps are present in the component

## Edge Cases

- **Empty Course**: When a course has no modules, resources, announcements, or participants, the component still displays all tabs but without count badges
- **Missing Course Data**: If the course object is missing certain properties (e.g., no modules array), the component gracefully handles this by defaulting to zero for the count
- **Long Tab Labels**: If tab labels are too long, they will be truncated with ellipsis to maintain the layout
- **Many Tabs**: The component is designed to handle the four standard tabs (modules, resources, announcements, participants), but can accommodate additional tabs if needed
- **Mobile Devices**: On small screens, the tabs reorganize into a 2x2 grid to maintain usability
- **Active Tab Not Found**: If the activeTab prop doesn't match any tab ID, the component will still render but no tab will be highlighted as active
- **Tab Switching**: When switching tabs, the component handles the state change smoothly without flickering
- **High Counts**: For tabs with very high counts (e.g., hundreds of participants), the count badge maintains its size and readability
- **RTL Support**: The component supports right-to-left languages by adjusting the layout and alignment
- **Theme Variations**: The component adapts to different theme colors while maintaining accessibility and usability

## Implementation Details

Here's a simplified implementation of the CourseTabs component to help developers understand its inner workings:

```tsx
/**
 * CourseTabs Component
 *
 * Navigation tabs for the course detail page.
 */

import React from 'react';
import { Course } from '../../types/course';

// Import CSS
import './CourseTabs.css';

interface CourseTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  course: Course;
}

const CourseTabs: React.FC<CourseTabsProps> = ({
  activeTab,
  onTabChange,
  course
}) => {
  // Get module count
  const moduleCount = course.modules?.length || 0;

  // Get resource count
  const resourceCount = course.resources?.length || 0;

  // Get announcement count
  const announcementCount = course.announcements?.length || 0;

  // Get participant count
  const participantCount = course.enrollmentCount || 0;

  // Tab data
  const tabs = [
    {
      id: 'modules',
      label: 'Modules',
      count: moduleCount,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      id: 'resources',
      label: 'Resources',
      count: resourceCount,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      id: 'announcements',
      label: 'Announcements',
      count: announcementCount,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    {
      id: 'participants',
      label: 'Participants',
      count: participantCount,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="course-tabs" role="tablist">
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.count > 0 && (
              <span className="tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseTabs;
```

## Related Components

- [CourseDetailModern](./CourseDetailModern.md): Parent component that contains CourseTabs for navigation
- [CourseHeader](./CourseHeader.md): Component that displays the course header information above the tabs
- [CourseModules](./CourseModules.md): Component that displays course modules in the modules tab
- [CourseResources](./CourseResources.md): Component that displays course resources in the resources tab
- [CourseAnnouncements](./CourseAnnouncements.md): Component that displays course announcements in the announcements tab
- [CourseParticipants](./CourseParticipants.md): Component that displays course participants in the participants tab
- [CourseEditorTabs](./CourseEditorTabs.md): Similar component used in the course editor interface

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/course-management-coursetabs--default).

The Storybook examples demonstrate:

- Default CourseTabs with all tabs
- CourseTabs with different active tabs
- CourseTabs with varying item counts
- CourseTabs with empty course data
- CourseTabs in mobile viewport
- CourseTabs with keyboard navigation

Note: Since this component relies on course data and tab state, the Storybook examples use mocked course data and state management to demonstrate different states.

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic tab functionality |
| 1.1.0 | Added count badges for each tab |
| 1.2.0 | Added responsive design for mobile devices |
| 1.3.0 | Added SVG icons for each tab |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements (ARIA attributes) |
| 2.2.0 | Added support for RTL languages |

## Technical Debt

The CourseTabs component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Inline SVG Icons | SVG icons are defined inline instead of using a component | Reduces reusability and increases file size | Extract SVG icons to separate components | Medium |
| LP-002 | Hardcoded Tab Structure | Tab structure is hardcoded in the component | Makes it difficult to add or remove tabs | Make tabs configurable via props | Low |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing Keyboard Navigation | No keyboard shortcuts for navigating between tabs | Reduces efficiency for keyboard users | Add left/right arrow key navigation | Medium |
| A-002 | Incomplete ARIA Implementation | ARIA attributes are incomplete for full tab panel implementation | May cause confusion for screen reader users | Implement complete ARIA tab pattern | High |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Tab Configuration | Make tabs configurable via props | More flexible tab system | Medium | Medium |
| RFO-002 | Theme Support | Add better theme support for different color schemes | Consistent appearance across themes | Low | Low |
| RFO-003 | Animation | Add smooth transitions when switching tabs | Better user experience | Low | Low |

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [CourseTabs Version Compatibility Matrix](./CourseTabs-version-compatibility.md)
