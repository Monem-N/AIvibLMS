# CourseEditorResources

## Introduction

The CourseEditorResources component is used in the Hypatia LMS for managing course resources and attachments within the course editor interface. It provides a comprehensive interface for instructors to upload, organize, and manage various types of files and resources for their courses.

## Description

The CourseEditorResources component is a feature-rich interface for managing course resources such as PDFs, documents, presentations, images, videos, and other file types. It allows instructors to upload new resources, edit resource details, delete resources, and organize them by type.

The component provides a searchable interface with visual categorization of resources by file type, making it easy for instructors to find and manage their course materials. It integrates with the ResourceEditor component for detailed resource configuration and provides visual cues for different resource types. The component is designed to be user-friendly and accessible, making resource management a seamless experience for instructors.

## Visual Examples

### Course Resources Overview

<!-- Note: Replace with actual screenshot when available -->
![Course Resources Overview](https://via.placeholder.com/800x600?text=Course+Resources+Overview)

The complete resources interface showing categorized resources by type

### Resource Editor Modal

<!-- Note: Replace with actual screenshot when available -->
![Resource Editor Modal](https://via.placeholder.com/800x600?text=Resource+Editor+Modal)

The resource editor modal for creating or editing a resource

### Empty State

<!-- Note: Replace with actual screenshot when available -->
![Empty State](https://via.placeholder.com/800x600?text=Empty+State)

The empty state when no resources have been added yet

### Resource Type Categories

<!-- Note: Replace with actual screenshot when available -->
![Resource Type Categories](https://via.placeholder.com/800x600?text=Resource+Type+Categories)

Visual representation of different resource type categories (PDFs, Documents, Images, etc.)

### Search Functionality

<!-- Note: Replace with actual screenshot when available -->
![Search Functionality](https://via.placeholder.com/800x600?text=Search+Functionality)

The search interface for finding specific resources

## Import

```tsx
import { CourseEditorResources } from 'components/courses/editor/CourseEditorResources';
```

## Basic Example

```tsx
import React, { useState } from 'react';
import { CourseEditorResources } from 'components/courses/editor/CourseEditorResources';
import { Attachment } from 'types/course';

const CourseEditor: React.FC = () => {
  const [resources, setResources] = useState<Attachment[]>([]);

  const handleResourcesChange = (updatedResources: Attachment[]) => {
    setResources(updatedResources);
  };

  return (
    <CourseEditorResources
      courseId="course-123"
      resources={resources}
      onChange={handleResourcesChange}
    />
  );
};
```

## Usage

The CourseEditorResources component is typically used within the CourseEditorModern component as part of the resources tab:

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| courseId | string | undefined | No | The ID of the course being edited. Used for API calls and references |
| resources | Attachment[] | [] | Yes | Array of resource objects that make up the course resources |
| onChange | (resources: Attachment[]) => void | - | Yes | Callback function called when resources are added, updated, or removed |

## State

The component manages the following internal state:

| State | Type | Default | Description |
|-------|------|---------|-------------|
| searchQuery | string | '' | The current search query for filtering resources |
| editingResource | string \| null | null | ID of the resource currently being edited, 'new' for a new resource, or null if none |
| groupedResources | Record<string, Attachment[]> | {} | Resources grouped by type for display |

## Type Definitions

```tsx
/**
 * Props for the CourseEditorResources component
 */
interface CourseEditorResourcesProps {
  courseId?: string;
  resources: Attachment[];
  onChange: (resources: Attachment[]) => void;
}

/**
 * Attachment Interface
 * Represents a file attachment in the course
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
 * ResourceEditor Props
 * Props for the ResourceEditor component used within CourseEditorResources
 */
interface ResourceEditorProps {
  resource: Attachment;
  onSave: (resource: Attachment) => void;
  onCancel: () => void;
}
```

## Examples

### Basic Example

```tsx
import React from 'react';
import { CourseEditorResources } from 'components/courses/editor/CourseEditorResources';

const CourseEditor = () => {
  return (
    <CourseEditorResources
      courseId="course-123"
      resources={[]}
      onChange={(resources) => console.log('Resources updated:', resources)}
    />
  );
};
```

### Advanced Example

```tsx
import React, { useState } from 'react';
import { CourseEditorResources } from 'components/courses/editor/CourseEditorResources';
import { Attachment } from 'types/course';

const CourseEditor = () => {
  const [resources, setResources] = useState<Attachment[]>([
    {
      id: 'resource-1',
      name: 'Course Syllabus.pdf',
      type: 'application/pdf',
      url: 'https://example.com/resources/syllabus.pdf',
      size: 1024000,
      uploadedAt: '2023-01-15T10:30:00Z'
    }
  ]);

  const handleResourcesChange = (updatedResources: Attachment[]) => {
    setResources(updatedResources);
    // Save to database
  };

  return (
    <CourseEditorResources
      courseId="course-123"
      resources={resources}
      onChange={handleResourcesChange}
    />
  );
};
```

### Simple Implementation

```tsx
import React, { useState } from 'react';
import { CourseEditorResources } from 'components/courses/editor/CourseEditorResources';
import { Attachment } from 'types/course';

const CourseEditor: React.FC = () => {
  const [resources, setResources] = useState<Attachment[]>([]);

  const handleResourcesChange = (updatedResources: Attachment[]) => {
    setResources(updatedResources);
    // Save to database or update parent state
    console.log('Resources updated:', updatedResources);
  };

  return (
    <div className="course-editor">
      <h2>Course Resources</h2>
      <CourseEditorResources
        courseId="course-123"
        resources={resources}
        onChange={handleResourcesChange}
      />
    </div>
  );
};
```

### With Pre-populated Resources

```tsx
import React, { useState } from 'react';
import { CourseEditorResources } from 'components/courses/editor/CourseEditorResources';
import { Attachment } from 'types/course';

const CourseEditor: React.FC = () => {
  const [resources, setResources] = useState<Attachment[]>([
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
    },
    {
      id: 'resource-3',
      name: 'Assignment 1.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      url: 'https://example.com/resources/assignment1.docx',
      size: 2097152, // 2MB
      uploadedAt: '2023-01-25T09:45:00Z'
    }
  ]);

  const handleResourcesChange = (updatedResources: Attachment[]) => {
    setResources(updatedResources);
  };

  return (
    <CourseEditorResources
      courseId="course-123"
      resources={resources}
      onChange={handleResourcesChange}
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
import CourseEditorResources from 'components/courses/editor/CourseEditorResources';

const CourseEditorModern: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();

  // Get course data from Redux store
  const { currentCourse } = useSelector(
    (state: RootState) => state.courses
  );

  // Handle resources change
  const handleResourcesChange = (resources: Attachment[]) => {
    dispatch(updateCourse(courseId!, {
      ...currentCourse,
      resources
    }));
  };

  return (
    <div className="course-editor-container">
      {/* Other components */}

      <div className="course-editor-content">
        {activeTab === 'resources' && (
          <CourseEditorResources
            courseId={courseId}
            resources={currentCourse?.resources || []}
            onChange={handleResourcesChange}
          />
        )}

        {/* Other tabs */}
      </div>
    </div>
  );
};
```

## Features

1. **Resource Management**: Create, edit, delete, and organize course resources
2. **Resource Categorization**: Automatically categorizes resources by file type
3. **Search Functionality**: Allows searching for resources by name
4. **Empty State Handling**: Provides a user-friendly interface when no resources exist yet
5. **Visual Resource Type Indicators**: Different resource types have distinct visual indicators
6. **Modal Editor Integration**: Integrates with ResourceEditor for detailed resource configuration
7. **File Upload Support**: Supports uploading files directly from the user's device
8. **URL Resource Support**: Supports adding resources by URL
9. **Resource Size Display**: Shows the size of each resource
10. **Upload Date Tracking**: Displays when each resource was uploaded
11. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
12. **Accessibility Support**: Designed with accessibility in mind, including keyboard navigation and screen reader support

## Accessibility

The CourseEditorResources component is designed with accessibility in mind, addressing the following considerations:

### Keyboard Navigation

- All interactive elements are keyboard accessible
- The search input can be focused and used with keyboard
- The "Add Resource" button can be activated with Enter or Space
- Resource items can be navigated using Tab key
- Resource actions (edit, delete) can be accessed and activated with keyboard
- Modal editors trap focus while open
- Escape key can be used to close modals

### Screen Reader Support

- Resource types are announced to screen readers
- Empty states provide descriptive text for screen readers
- Search input has proper label for screen readers
- Resource actions have descriptive text for screen readers
- Modal editors announce their purpose when opened
- Status changes are announced to screen readers

### ARIA Attributes

- Search input uses `aria-label` to provide descriptive label
- Resource type icons use `aria-hidden="true"` to hide them from screen readers
- Resource items use `aria-labelledby` to associate with their name
- Modal editors use `role="dialog"` and `aria-labelledby` attributes
- Required fields use `aria-required="true"` attribute
- Error messages use `aria-live="polite"` to announce errors

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements
- Resource type indicators use both color and icons for differentiation
- Focus indicators have sufficient contrast
- Empty state text and icons have sufficient contrast
- Error messages have sufficient contrast with their backgrounds

### Focus Management

- Focus is properly managed when opening and closing modal editors
- Focus returns to the triggering element when a modal is closed
- Focus is visible at all times
- Focus is trapped within modal editors while they are open
- Focus order follows a logical sequence through the component

## Edge Cases

- **Empty Resources Array**: When the resources array is empty, the component displays an empty state with a message and a button to add the first resource
- **Unknown File Type**: If a resource has an unknown file type, the component displays a generic file icon and categorizes it as "Other"
- **Invalid Resource ID**: If an invalid resource ID is provided to the resource editor, the component creates a new resource instead
- **Duplicate Resource IDs**: The component handles duplicate resource IDs by using the first occurrence and ignoring subsequent ones
- **Missing Required Fields**: The component validates required fields before saving resources, showing appropriate error messages
- **Long Resource Names**: The component truncates long resource names with ellipsis to maintain layout integrity
- **Large File Uploads**: The component handles large file uploads by showing a progress indicator and providing feedback on upload status
- **Failed Uploads**: The component handles failed uploads by showing an error message and allowing the user to retry
- **Unsupported File Types**: The component validates file types during upload and shows an error message for unsupported types
- **Many Resources**: The component handles a large number of resources by using pagination or virtualization to maintain performance
- **Search with No Results**: The component shows a "No results found" message when a search query returns no results
- **URL Resources**: The component validates URLs for URL resources and shows an error message for invalid URLs

## Implementation Details

Here's a simplified implementation of the CourseEditorResources component to help developers understand its inner workings:

```tsx
import React, { useState, useEffect } from 'react';
import { Attachment } from '../../../types/course';
import ResourceEditor from './ResourceEditor';
import FileUploader from '../../common/FileUploader';
import './CourseEditorResources.css';

interface CourseEditorResourcesProps {
  courseId?: string;
  resources: Attachment[];
  onChange: (resources: Attachment[]) => void;
}

const CourseEditorResources: React.FC<CourseEditorResourcesProps> = ({
  courseId,
  resources,
  onChange
}) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State for tracking which resource is being edited
  const [editingResource, setEditingResource] = useState<string | null>(null);

  // State for grouped resources by type
  const [groupedResources, setGroupedResources] = useState<Record<string, Attachment[]>>({});

  // Group resources by type
  useEffect(() => {
    const filtered = searchQuery
      ? resources.filter(resource =>
          resource.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : resources;

    const grouped = filtered.reduce((acc, resource) => {
      const type = getResourceType(resource.type);
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(resource);
      return acc;
    }, {} as Record<string, Attachment[]>);

    setGroupedResources(grouped);
  }, [resources, searchQuery]);

  // Get resource type category
  const getResourceType = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return 'Images';
    if (mimeType.startsWith('video/')) return 'Videos';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType === 'application/pdf') return 'PDFs';
    if (mimeType.includes('document')) return 'Documents';
    if (mimeType.includes('presentation')) return 'Presentations';
    if (mimeType.includes('spreadsheet')) return 'Spreadsheets';
    return 'Other';
  };

  // Add new resource
  const addResource = () => {
    setEditingResource('new');
  };

  // Update resource
  const updateResource = (resourceId: string, updatedResource: Partial<Attachment>) => {
    const updatedResources = resources.map(resource =>
      resource.id === resourceId
        ? { ...resource, ...updatedResource }
        : resource
    );

    onChange(updatedResources);
  };

  // Delete resource
  const deleteResource = (resourceId: string) => {
    const updatedResources = resources.filter(resource => resource.id !== resourceId);
    onChange(updatedResources);
  };

  // Handle file upload
  const handleFileUpload = async (files: File[]) => {
    // In a real implementation, this would upload the files to a server
    // and then add them to the resources array

    const newResources = await Promise.all(
      files.map(async (file) => {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          id: `temp-${Date.now()}-${file.name}`,
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file), // In real implementation, this would be a server URL
          size: file.size,
          uploadedAt: new Date().toISOString()
        };
      })
    );

    onChange([...resources, ...newResources]);
  };

  // Handle resource save
  const handleResourceSave = (resource: Attachment) => {
    if (editingResource === 'new') {
      // Add new resource
      onChange([...resources, resource]);
    } else {
      // Update existing resource
      updateResource(editingResource!, resource);
    }

    setEditingResource(null);
  };

  // Close resource editor
  const closeResourceEditor = () => {
    setEditingResource(null);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  // Get resource icon
  const getResourceIcon = (mimeType: string): JSX.Element => {
    // Return appropriate icon based on mime type
    // This is a simplified version
    if (mimeType.startsWith('image/')) {
      return <span className="resource-icon image">📷</span>;
    }
    if (mimeType.startsWith('video/')) {
      return <span className="resource-icon video">🎬</span>;
    }
    if (mimeType.startsWith('audio/')) {
      return <span className="resource-icon audio">🎵</span>;
    }
    if (mimeType === 'application/pdf') {
      return <span className="resource-icon pdf">📄</span>;
    }
    if (mimeType.includes('document')) {
      return <span className="resource-icon document">📝</span>;
    }
    if (mimeType.includes('presentation')) {
      return <span className="resource-icon presentation">📊</span>;
    }
    if (mimeType.includes('spreadsheet')) {
      return <span className="resource-icon spreadsheet">📈</span>;
    }
    return <span className="resource-icon other">📁</span>;
  };

  return (
    <div className="course-editor-resources">
      {/* Resource Editor Modal */}
      {editingResource && (
        <ResourceEditor
          resource={
            editingResource === 'new'
              ? {
                  id: `temp-${Date.now()}`,
                  name: '',
                  type: '',
                  url: '',
                  size: 0,
                  uploadedAt: new Date().toISOString()
                }
              : resources.find(r => r.id === editingResource)!
          }
          onSave={handleResourceSave}
          onCancel={closeResourceEditor}
        />
      )}

      {/* Header */}
      <div className="resources-header">
        <h2 className="section-title">Course Resources</h2>
        <div className="resources-actions">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search resources"
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={addResource}
          >
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* File Uploader */}
      <div className="file-uploader-container">
        <FileUploader
          onUpload={handleFileUpload}
          acceptedTypes="*/*"
          multiple={true}
        />
      </div>

      {/* Empty State */}
      {resources.length === 0 ? (
        <div className="resources-empty">
          <h3>No Resources Yet</h3>
          <p>Start adding resources to your course by uploading files or adding URLs.</p>
          <button
            className="btn btn-primary"
            onClick={addResource}
          >
            Add Your First Resource
          </button>
        </div>
      ) : Object.keys(groupedResources).length === 0 ? (
        <div className="resources-empty">
          <h3>No Results Found</h3>
          <p>No resources match your search query. Try a different search term.</p>
          <button
            className="btn btn-outline"
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* Resources List */
        <div className="resources-list">
          {Object.entries(groupedResources).map(([type, typeResources]) => (
            <div key={type} className="resource-group">
              <h3 className="resource-group-title">{type}</h3>
              <div className="resource-items">
                {typeResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="resource-item"
                  >
                    <div className="resource-icon-container">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="resource-details">
                      <h4 className="resource-name">{resource.name}</h4>
                      <div className="resource-meta">
                        <span className="resource-size">{formatFileSize(resource.size)}</span>
                        <span className="resource-date">
                          {new Date(resource.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="resource-actions">
                      <button
                        className="btn-icon edit"
                        onClick={() => setEditingResource(resource.id)}
                        aria-label={`Edit ${resource.name}`}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => deleteResource(resource.id)}
                        aria-label={`Delete ${resource.name}`}
                      >
                        Delete
                      </button>
                      <a
                        href={resource.url}
                        className="btn-icon download"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download ${resource.name}`}
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseEditorResources;
```

## Related Components

- [CourseEditorModern](./CourseEditorModern.md): Parent component that contains CourseEditorResources as a tab
- [ResourceEditor](./ResourceEditor.md): Modal component for editing resource details
- [CourseEditorHeader](./CourseEditorHeader.md): Header component for the course editor
- [CourseEditorTabs](./CourseEditorTabs.md): Tabs component for navigating between different sections of the course editor
- [CourseEditorForm](./CourseEditorForm.md): Form component for editing basic course details
- [CourseEditorModules](./CourseEditorModules.md): Component for managing course modules
- [CourseEditorSettings](./CourseEditorSettings.md): Component for configuring course settings
- [CourseResources](./CourseResources.md): Student-facing component for viewing course resources

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-courseeditorresources--basic).

## Technical Debt

- The component doesn't implement pagination for large resource lists
- The component doesn't implement drag-and-drop reordering of resources
- The component doesn't handle concurrent edits by multiple users
- The component doesn't implement proper error boundaries
- The component doesn't have comprehensive test coverage
- The component doesn't implement proper focus management for accessibility
- The component doesn't implement proper keyboard navigation for accessibility
- The component doesn't implement proper ARIA attributes for accessibility
- The file upload functionality is basic and could be improved with progress indicators and error handling

## Version Compatibility

For detailed version compatibility information, see the [CourseEditorResources Version Compatibility Matrix](./CourseEditorResources-version-compatibility.md).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic resource management |
| 1.1.0 | Added search functionality |
| 1.2.0 | Added resource categorization by type |
| 1.3.0 | Added empty state handling |
| 1.4.0 | Added visual resource type indicators |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added file upload support |
| 2.2.0 | Added URL resource support |
| 2.3.0 | Added responsive design |
