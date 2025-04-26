# CourseResources

## Introduction

The CourseResources component is used in the Hypatia LMS for displaying and organizing course resources and learning materials.

## Description

The CourseResources component provides a user interface for students to browse, search, and download course resources. It organizes resources by type (images, videos, documents, etc.), displays metadata such as file size and upload date, and provides a search functionality to help students find specific resources. The component is designed to be responsive and accessible, with clear visual indicators for different file types and a clean, organized layout that makes it easy to scan through available materials.

## Visual Examples

### Standard Resources View

<!-- Note: Replace with actual screenshot when available -->
![Standard Resources View](https://via.placeholder.com/800x500?text=Course+Resources+Standard+View)

The standard view showing resources grouped by type with search functionality

### Empty State

<!-- Note: Replace with actual screenshot when available -->
![Empty State](https://via.placeholder.com/800x400?text=Course+Resources+Empty+State)

The empty state shown when a course has no resources

### Search Results

<!-- Note: Replace with actual screenshot when available -->
![Search Results](https://via.placeholder.com/800x500?text=Course+Resources+Search+Results)

The component showing filtered resources based on a search query

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x800?text=Course+Resources+Mobile+View)

The responsive layout on mobile devices

## Import

```tsx
import { CourseResources } from 'components/courses/CourseResources';
```

## Usage

```tsx
import React from 'react';
import { CourseResources } from 'components/courses/CourseResources';
import { Attachment } from 'types/course';

// Example resources
const courseResources: Attachment[] = [
  {
    id: 'resource-1',
    name: 'Course Syllabus.pdf',
    type: 'application/pdf',
    url: 'https://example.com/resources/syllabus.pdf',
    size: 1024000, // 1MB
    uploadedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: 'resource-2',
    name: 'Lecture Slides Week 1.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    url: 'https://example.com/resources/slides-week1.pptx',
    size: 5242880, // 5MB
    uploadedAt: '2023-01-20T14:15:00Z'
  }
];

const CourseDetailPage = () => {
  return (
    <div className="course-detail">
      <h1>Introduction to React</h1>

      {/* Other course components */}

      <CourseResources
        resources={courseResources}
        courseId="course-123"
      />
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| resources | Attachment[] | - | Yes | Array of course resource attachments to display |
| courseId | string | - | Yes | ID of the course the resources belong to |

## Type Definitions

```tsx
/**
 * CourseResourcesProps Interface
 */
interface CourseResourcesProps {
  /**
   * Array of course resource attachments to display
   */
  resources: Attachment[];

  /**
   * ID of the course the resources belong to
   */
  courseId: string;
}

/**
 * Attachment Interface (from types/course.ts)
 */
export interface Attachment {
  /**
   * Unique identifier for the attachment
   */
  id: string;

  /**
   * Display name of the attachment
   */
  name: string;

  /**
   * MIME type of the attachment (e.g., 'application/pdf')
   */
  type: string;

  /**
   * URL to access or download the attachment
   */
  url: string;

  /**
   * Size of the attachment in bytes
   */
  size: number;

  /**
   * ISO date string when the attachment was uploaded
   */
  uploadedAt: string;
}
```

## Examples

### Basic Example

```tsx
<CourseResources
  resources={courseResources}
  courseId="course-123"
/>
```

### Example with Empty Resources

```tsx
<CourseResources
  resources={[]}
  courseId="course-123"
/>
```

### Example in Course Detail Page

```tsx
import React, { useState } from 'react';
import CourseHeader from 'components/courses/CourseHeader';
import CourseTabs from 'components/courses/CourseTabs';
import CourseResources from 'components/courses/CourseResources';
import CourseModules from 'components/courses/CourseModules';
import { Course } from 'types/course';

const CourseDetailPage: React.FC<{ course: Course }> = ({ course }) => {
  const [activeTab, setActiveTab] = useState<string>('resources');

  return (
    <div className="course-detail">
      <CourseHeader course={course} />

      <CourseTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        course={course}
      />

      <div className="course-content">
        {activeTab === 'resources' && (
          <CourseResources
            resources={course.resources || []}
            courseId={course.id}
          />
        )}

        {activeTab === 'modules' && (
          <CourseModules
            modules={course.modules || []}
            courseId={course.id}
          />
        )}

        {/* Other tabs */}
      </div>
    </div>
  );
};
```

## Features

1. **Resource Grouping**: Automatically groups resources by type (Images, Videos, PDFs, Documents, etc.) for better organization
2. **Search Functionality**: Provides a search input that filters resources by name in real-time
3. **Resource Metadata**: Displays file size and upload date for each resource
4. **Type-specific Icons**: Shows different icons based on the resource type for easy visual identification
5. **Empty State Handling**: Displays appropriate messaging when no resources are available or when search returns no results
6. **Clear Search Button**: Provides a button to quickly clear the search query when no results are found
7. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
8. **External Links**: Opens resources in a new tab to prevent navigation away from the course
9. **Download Indicators**: Shows download icons that highlight on hover for better user experience
10. **Accessible Structure**: Uses semantic HTML and proper ARIA attributes for accessibility

## Accessibility

The CourseResources component is designed with accessibility in mind:

### Keyboard Navigation

- All interactive elements (search input, clear search button, resource links) are fully keyboard accessible
- Focus order follows a logical sequence through the component
- Resource links can be navigated using Tab key
- Search input can be cleared using the Escape key

### Screen Reader Support

- The component uses semantic HTML elements for better screen reader navigation
- Resource groups use proper heading hierarchy (h2 for component title, h3 for resource group titles)
- Resource names are properly marked up as headings (h4) for better navigation
- Resource metadata is presented in a way that screen readers can announce properly

### ARIA Attributes

- Search input has appropriate `aria-label` for screen readers
- Resource links have appropriate `aria-label` attributes that include the resource name and type
- SVG icons include appropriate ARIA attributes to ensure they are properly announced or hidden from screen readers
- Empty states use appropriate ARIA attributes to communicate status to screen readers

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Resource type icons use colors that provide sufficient contrast with their backgrounds
- Focus indicators have sufficient contrast with the background
- Interactive elements have hover and focus states with sufficient contrast

### Focus Management

- Focus is properly managed when clearing search results
- Focus indicators are clearly visible for all interactive elements
- Focus states are consistent with the rest of the application
- No focus traps are present in the component

## Edge Cases

- **No Resources**: When a course has no resources, the component displays an empty state with a message indicating that no resources are available
- **No Search Results**: When a search query returns no results, the component displays a message and a button to clear the search
- **Very Long Resource Names**: Long resource names are truncated with ellipsis to prevent layout issues while maintaining readability
- **Unknown File Types**: File types that don't match any of the predefined categories are grouped under "Other" with a generic file icon
- **Large Number of Resources**: The component handles large numbers of resources by grouping them by type and using a responsive grid layout
- **Very Large Files**: File sizes are formatted appropriately for different magnitudes (bytes, KB, MB, GB) to ensure readability
- **Missing Metadata**: If a resource is missing metadata like size or upload date, the component gracefully handles this by not displaying the missing information
- **Broken Resource Links**: External links open in new tabs, so if a resource link is broken, the user doesn't lose their place in the course
- **Mobile Devices**: On small screens, the layout adjusts to a single column and the search input expands to full width
- **Screen Readers**: The component is designed to work with screen readers, with appropriate ARIA attributes and semantic HTML

## Implementation Details

Here's a simplified implementation of the CourseResources component to help developers understand its inner workings:

```tsx
/**
 * CourseResources Component
 *
 * Displays the course resources.
 */

import React, { useState } from 'react';
import { Attachment } from '../../types/course';

// Import CSS
import './CourseResources.css';

interface CourseResourcesProps {
  resources: Attachment[];
  courseId: string;
}

const CourseResources: React.FC<CourseResourcesProps> = ({ resources, courseId }) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter resources by search query
  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group resources by type
  const groupedResources: Record<string, Attachment[]> = {};

  filteredResources.forEach(resource => {
    const type = getResourceType(resource.type);
    if (!groupedResources[type]) {
      groupedResources[type] = [];
    }
    groupedResources[type].push(resource);
  });

  // Get resource type from MIME type
  const getResourceType = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return 'Images';
    if (mimeType.startsWith('video/')) return 'Videos';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType === 'application/pdf') return 'PDFs';
    if (mimeType.includes('word')) return 'Documents';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Spreadsheets';
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'Presentations';
    return 'Other';
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  // If no resources, show empty state
  if (resources.length === 0) {
    return (
      <div className="course-resources">
        <div className="resources-empty">
          <h3>No Resources Available</h3>
          <p>This course does not have any resources yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-resources">
      <div className="resources-header">
        <h2 className="resources-title">Course Resources</h2>
        <div className="resources-search">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search resources"
          />
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
            className="search-icon"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <div className="resources-empty">
          <h3>No Resources Found</h3>
          <p>No resources match your search query.</p>
          <button
            className="btn btn-primary"
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="resources-content">
          {Object.entries(groupedResources).map(([type, resources]) => (
            <div key={type} className="resource-group">
              <h3 className="resource-group-title">{type}</h3>
              <div className="resource-list">
                {resources.map(resource => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-item"
                    aria-label={`${resource.name}, ${type} file, ${formatFileSize(resource.size)}`}
                  >
                    <div className="resource-icon-container">
                      {/* Resource type icon (SVG) would go here */}
                    </div>
                    <div className="resource-info">
                      <h4 className="resource-name">{resource.name}</h4>
                      <div className="resource-meta">
                        <span className="resource-size">
                          {formatFileSize(resource.size)}
                        </span>
                        <span className="resource-date">
                          {new Date(resource.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="resource-download">
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
                        className="download-icon"
                        aria-hidden="true"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseResources;
```

## Related Components

- [CourseDetailModern](./CourseDetailModern.md): Parent component that renders CourseResources in the resources tab
- [CourseTabs](./CourseTabs.md): Navigation component that allows switching to the resources tab
- [CourseEditorResources](./CourseEditorResources.md): Editor version of CourseResources for instructors to manage resources
- [CourseModules](./CourseModules.md): Sibling component that displays course modules in the modules tab
- [CourseAnnouncements](./CourseAnnouncements.md): Sibling component that displays course announcements in the announcements tab
- [CourseParticipants](./CourseParticipants.md): Sibling component that displays course participants in the participants tab

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/course-management-courseresources--default).

The Storybook examples demonstrate:

- Default CourseResources with various file types
- CourseResources with empty state (no resources)
- CourseResources with search functionality
- CourseResources with different resource groupings
- CourseResources in mobile viewport

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic resource display |
| 1.1.0 | Added search functionality |
| 1.2.0 | Added resource grouping by type |
| 1.3.0 | Added responsive design for mobile devices |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added accessibility improvements |
| 2.2.0 | Added empty state handling |

## Technical Debt

The CourseResources component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Inline SVG Icons | SVG icons are defined inline instead of using a component | Reduces reusability and increases file size | Extract SVG icons to separate components | Medium |
| LP-002 | Direct DOM Manipulation | Direct DOM manipulation for focus management | May cause issues with React's virtual DOM | Use React refs for focus management | Low |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing Keyboard Shortcuts | No keyboard shortcuts for common actions | Reduces efficiency for keyboard users | Add keyboard shortcuts for search and clear | Medium |
| A-002 | Incomplete ARIA Labels | Some elements have incomplete ARIA labels | May cause confusion for screen reader users | Add more descriptive ARIA labels | High |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Resource Pagination | Add pagination for courses with many resources | Improved performance for large resource lists | Medium | Medium |
| RFO-002 | Resource Preview | Add preview functionality for supported file types | Better user experience | High | Low |
| RFO-003 | Resource Sorting | Add ability to sort resources by name, size, or date | More flexible resource management | Low | Medium |

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [CourseResources Version Compatibility Matrix](./CourseResources-version-compatibility.md)
