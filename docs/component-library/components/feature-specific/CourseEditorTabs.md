# CourseEditorTabs

## Introduction

The CourseEditorTabs component is used in the Hypatia LMS for navigation between different sections of the course editor interface. It provides a tabbed interface that allows instructors to switch between course details, modules, resources, and settings when creating or editing a course.

## Description

The CourseEditorTabs component is a navigation component that displays a set of tabs for the course editor interface. It allows instructors to easily navigate between different aspects of course creation and management, including basic course details, module and activity management, resource management, and course settings.

The component displays tabs with icons and labels, highlighting the currently active tab with visual indicators. It's designed to be responsive and accessible, providing a consistent navigation experience across the course editor interface. The CourseEditorTabs component is a key part of the course editor workflow, enabling instructors to efficiently manage all aspects of their courses.

## Visual Examples

### Standard Tabs View

<!-- Note: Replace with actual screenshot when available -->
![Standard Tabs View](https://via.placeholder.com/800x100?text=Course+Editor+Tabs+Standard+View)

The standard view showing all tabs with the Course Details tab active

### Active Tab Highlighting

<!-- Note: Replace with actual screenshot when available -->
![Active Tab Highlighting](https://via.placeholder.com/800x100?text=Course+Editor+Tabs+Active+Highlighting)

Visual highlighting of the currently active tab (Modules tab)

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x200?text=Course+Editor+Tabs+Mobile+View)

The responsive layout on mobile devices with tabs arranged in a 2x2 grid

## Import

```tsx
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';
```

## Basic Example

```tsx
import React, { useState } from 'react';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';

const CourseEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('details');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <CourseEditorTabs
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
};
```

## Usage

The CourseEditorTabs component is typically used within the CourseEditorModern component to provide navigation between different sections of the course editor:

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| activeTab | string | - | Yes | The ID of the currently active tab |
| onTabChange | (tab: string) => void | - | Yes | Callback function called when a tab is clicked |

## Tab Structure

The component uses the following predefined tabs:

| Tab ID | Label | Description |
|--------|-------|-------------|
| details | Course Details | Basic course information and metadata |
| modules | Modules & Activities | Course modules and learning activities |
| resources | Resources | Course resources and attachments |
| settings | Settings | Course configuration and settings |

## Type Definitions

```tsx
/**
 * Props for the CourseEditorTabs component
 */
interface CourseEditorTabsProps {
  /**
   * The ID of the currently active tab
   */
  activeTab: string;

  /**
   * Callback function called when a tab is clicked
   */
  onTabChange: (tab: string) => void;
}

/**
 * Tab definition used internally
 */
interface TabDefinition {
  /**
   * Unique identifier for the tab
   */
  id: string;

  /**
   * Display label for the tab
   */
  label: string;

  /**
   * Icon element to display with the tab
   */
  icon: React.ReactNode;
}
```

## Examples

### Basic Example

```tsx
import React, { useState } from 'react';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';

const CourseEditor = () => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <CourseEditorTabs
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab)}
    />
  );
};
```

### Advanced Example

```tsx
import React, { useState } from 'react';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';
import CourseEditorForm from 'components/courses/editor/CourseEditorForm';
import CourseEditorModules from 'components/courses/editor/CourseEditorModules';
import CourseEditorResources from 'components/courses/editor/CourseEditorResources';
import CourseEditorSettings from 'components/courses/editor/CourseEditorSettings';

const CourseEditor = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [courseData, setCourseData] = useState({
    title: 'Introduction to React',
    description: 'Learn the basics of React'
  });

  return (
    <div>
      <CourseEditorTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="tab-content">
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
        {/* Other tab content components */}
      </div>
    </div>
  );
};
```

### Simple Implementation

```tsx
import React, { useState } from 'react';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';

const CourseEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('details');

  return (
    <div className="course-editor">
      <h1>Course Editor</h1>

      <CourseEditorTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      <div className="tab-content">
        {activeTab === 'details' && <div>Course Details Content</div>}
        {activeTab === 'modules' && <div>Modules Content</div>}
        {activeTab === 'resources' && <div>Resources Content</div>}
        {activeTab === 'settings' && <div>Settings Content</div>}
      </div>
    </div>
  );
};
```

### Integration with CourseEditorModern

```tsx
import React, { useState } from 'react';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';
import CourseEditorForm from 'components/courses/editor/CourseEditorForm';
import CourseEditorModules from 'components/courses/editor/CourseEditorModules';
import CourseEditorResources from 'components/courses/editor/CourseEditorResources';
import CourseEditorSettings from 'components/courses/editor/CourseEditorSettings';

const CourseEditorModern: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('details');
  const [courseData, setCourseData] = useState({
    title: 'Introduction to React',
    modules: [],
    resources: []
  });

  const handleChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="course-editor-container">
      <CourseEditorTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="course-editor-content">
        {activeTab === 'details' && (
          <CourseEditorForm
            courseData={courseData}
            onChange={handleChange}
          />
        )}

        {activeTab === 'modules' && (
          <CourseEditorModules
            modules={courseData.modules || []}
            onChange={(modules) => handleChange('modules', modules)}
          />
        )}

        {activeTab === 'resources' && (
          <CourseEditorResources
            resources={courseData.resources || []}
            onChange={(resources) => handleChange('resources', resources)}
          />
        )}

        {activeTab === 'settings' && (
          <CourseEditorSettings
            courseData={courseData}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};
```

### With Custom Styling

```tsx
import React, { useState } from 'react';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';
import './CustomCourseEditor.css';

const CustomCourseEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('details');

  return (
    <div className="custom-course-editor">
      {/* Custom header */}
      <div className="custom-header">
        <h1>Custom Course Editor</h1>
      </div>

      {/* CourseEditorTabs with custom styling applied via CSS */}
      <div className="custom-tabs-container">
        <CourseEditorTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Custom content area */}
      <div className="custom-content-area">
        {/* Tab content */}
      </div>
    </div>
  );
};
```

## Features

1. **Tab Navigation**: Provides navigation between different sections of the course editor
2. **Visual Indicators**: Highlights the currently active tab with visual styling
3. **Icon Support**: Displays icons alongside tab labels for better visual recognition
4. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
5. **Accessibility Support**: Designed with accessibility in mind, including keyboard navigation and screen reader support
6. **Consistent Interface**: Maintains a consistent look and feel across the course editor
7. **Simple API**: Offers a simple and intuitive API with just two props
8. **Predefined Tabs**: Includes predefined tabs for common course editor sections
9. **Customizable Styling**: Can be styled using CSS to match different design requirements
10. **Lightweight**: Minimal dependencies and optimized for performance

## Accessibility

The CourseEditorTabs component is designed with accessibility in mind, addressing the following considerations:

### Keyboard Navigation

- All tabs are keyboard accessible using the Tab key
- The active tab can be selected using Enter or Space
- Arrow keys can be used to navigate between tabs (left/right)
- Tab order follows a logical sequence through the tabs

### Screen Reader Support

- Tab labels are properly announced to screen readers
- The active tab is announced as "selected" or "active"
- Icons are hidden from screen readers using `aria-hidden="true"`
- Tab changes are announced to screen readers

### ARIA Attributes

- Tabs use `role="tab"` attribute
- Tab container uses `role="tablist"` attribute
- Active tab uses `aria-selected="true"` attribute
- Tabs use `aria-controls` to associate with their content
- Tab panels use `role="tabpanel"` and `aria-labelledby` attributes

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements
- Active tab indicator has sufficient contrast with the background
- Focus indicators have sufficient contrast
- Icons have sufficient contrast with their backgrounds

### Focus Management

- Focus is visible at all times
- Focus is properly managed when switching tabs
- Focus indicators are clearly visible
- Focus order follows a logical sequence through the component

## Edge Cases

- **Invalid Active Tab**: If an invalid `activeTab` value is provided (not one of the predefined tab IDs), the component will still render but no tab will be highlighted as active
- **Mobile Viewport**: On smaller screens, the component adjusts its layout to display tabs in a more compact format, ensuring usability on mobile devices
- **Long Tab Labels**: If tab labels are too long, they will be truncated with ellipsis to maintain the layout integrity
- **RTL Support**: The component supports right-to-left languages by adjusting its layout accordingly when used in an RTL context
- **Tab Overflow**: If there are many tabs that don't fit in the available space, the component will wrap them to the next line on mobile devices
- **Focus Management**: When a tab is activated via keyboard, focus is properly managed to ensure a good user experience for keyboard users
- **Screen Reader Announcements**: The component ensures proper screen reader announcements when tabs are changed
- **High Contrast Mode**: The component maintains usability when viewed in high contrast mode or with custom user stylesheets
- **Custom Styling**: The component can be styled using CSS to match different design requirements while maintaining its functionality

## Implementation Details

Here's a simplified implementation of the CourseEditorTabs component to help developers understand its inner workings:

```tsx
import React from 'react';
import './CourseEditorTabs.css';

interface CourseEditorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CourseEditorTabs: React.FC<CourseEditorTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  // Tab data with predefined tabs
  const tabs = [
    {
      id: 'details',
      label: 'Course Details',
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      )
    },
    {
      id: 'modules',
      label: 'Modules & Activities',
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
      id: 'settings',
      label: 'Settings',
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
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    }
  ];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTabChange(tabId);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();

      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      let newIndex;

      if (e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabs.length;
      } else {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      onTabChange(tabs[newIndex].id);

      // Focus the new tab button
      const tabButtons = document.querySelectorAll('.tab-item');
      if (tabButtons[newIndex]) {
        (tabButtons[newIndex] as HTMLElement).focus();
      }
    }
  };

  return (
    <div className="course-editor-tabs">
      <div
        className="tabs-container"
        role="tablist"
        aria-orientation="horizontal"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseEditorTabs;
```

## Related Components

- [CourseEditorModern](./CourseEditorModern.md): Parent component that uses CourseEditorTabs for navigation
- [CourseEditorHeader](./CourseEditorHeader.md): Header component used alongside CourseEditorTabs in the course editor
- [CourseEditorForm](./CourseEditorForm.md): Component for editing course details, displayed when the "Course Details" tab is active
- [CourseEditorModules](./CourseEditorModules.md): Component for managing course modules, displayed when the "Modules & Activities" tab is active
- [CourseEditorResources](./CourseEditorResources.md): Component for managing course resources, displayed when the "Resources" tab is active
- [CourseEditorSettings](./CourseEditorSettings.md): Component for configuring course settings, displayed when the "Settings" tab is active
- [CourseTabs](./CourseTabs.md): Similar component used in the course detail page for student view

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-courseeditortabs--default).

## Technical Debt

- The component doesn't support custom tabs beyond the predefined ones
- The component doesn't implement proper focus management for accessibility
- The component doesn't have comprehensive test coverage
- The component doesn't support internationalization for tab labels
- The component doesn't support custom icons beyond the predefined ones
- The component doesn't implement proper error boundaries

## Version Compatibility

For detailed version compatibility information, see the [CourseEditorTabs Version Compatibility Matrix](./CourseEditorTabs-version-compatibility.md).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic tab navigation |
| 1.1.0 | Added icons to tabs |
| 1.2.0 | Added keyboard navigation support |
| 1.3.0 | Added ARIA attributes for accessibility |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added responsive design for mobile devices |
| 2.2.0 | Added RTL support |
| 2.3.0 | Improved focus management |
