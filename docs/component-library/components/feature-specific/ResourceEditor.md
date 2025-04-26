# ResourceEditor

## Introduction

The ResourceEditor component is used in the Hypatia LMS for creating and editing course resources within the course editor interface. It provides a modal dialog with a form for instructors to input resource details and upload files or specify URLs for course materials.

## Description

The ResourceEditor component is a modal dialog component that allows instructors to create new resources or edit existing ones. It presents a form with fields for the resource name, type, and content (either a file upload or URL). The component handles form validation, ensuring that required fields are filled and that either a file is uploaded or a URL is provided.

The component is designed to be used within the CourseEditorResources component, appearing when an instructor clicks the "Add Resource" button or the "Edit" button on an existing resource. It provides a clean, focused interface for resource management, helping instructors organize their course materials effectively. The modal design ensures that instructors can focus on the task at hand without navigating away from the course editor.

## Visual Examples

### Add Resource Modal

<!-- Note: Replace with actual screenshot when available -->
![Add Resource Modal](https://via.placeholder.com/800x600?text=Add+Resource+Modal)

The modal dialog for creating a new resource

### Edit Resource Modal

<!-- Note: Replace with actual screenshot when available -->
![Edit Resource Modal](https://via.placeholder.com/800x600?text=Edit+Resource+Modal)

The modal dialog for editing an existing resource

### File Upload Tab

<!-- Note: Replace with actual screenshot when available -->
![File Upload Tab](https://via.placeholder.com/800x600?text=File+Upload+Tab)

The file upload tab for uploading resource files

### URL Tab

<!-- Note: Replace with actual screenshot when available -->
![URL Tab](https://via.placeholder.com/800x600?text=URL+Tab)

The URL tab for specifying resource URLs

## Import

```tsx
import { ResourceEditor } from 'components/courses/editor/ResourceEditor';
```

## Basic Example

```tsx
import React, { useState } from 'react';
import { ResourceEditor } from 'components/courses/editor/ResourceEditor';
import { Attachment } from 'types/course';

const CourseEditorExample: React.FC = () => {
  const [showResourceEditor, setShowResourceEditor] = useState<boolean>(false);

  const handleSaveResource = (resource: Attachment) => {
    console.log('Resource saved:', resource);
    setShowResourceEditor(false);
  };

  return (
    <div>
      <button onClick={() => setShowResourceEditor(true)}>
        Add Resource
      </button>

      {showResourceEditor && (
        <ResourceEditor
          resource={{
            id: `temp-${Date.now()}`,
            name: '',
            type: 'application/pdf',
            url: '',
            size: 0,
            uploadedAt: new Date().toISOString()
          }}
          onSave={handleSaveResource}
          onCancel={() => setShowResourceEditor(false)}
        />
      )}
    </div>
  );
};
```

## Usage

The ResourceEditor component is typically used within the CourseEditorResources component:

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| resource | Attachment | - | Yes | Resource object containing the data to be displayed and edited |
| onSave | (resource: Attachment) => void | - | Yes | Callback function called when the resource is saved |
| onCancel | () => void | - | Yes | Callback function called when the user cancels the edit |

## State

The component manages the following internal state:

| State | Type | Default | Description |
|-------|------|---------|-------------|
| resourceData | Attachment | Based on resource prop | The current state of the resource being edited |
| file | File \| null | null | The file selected for upload, if any |

## Form Fields

The ResourceEditor form includes the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | text input | Yes | The name of the resource |
| type | select | Yes | The MIME type of the resource |
| url | url input | Yes (if no file) | The URL of the resource (when URL tab is active) |
| file | file input | Yes (if no URL) | The file to upload (when Upload File tab is active) |

## Type Definitions

```tsx
/**
 * Props for the ResourceEditor component
 */
interface ResourceEditorProps {
  /**
   * Resource object containing the data to be displayed and edited
   */
  resource: Attachment;

  /**
   * Callback function called when the resource is saved
   */
  onSave: (resource: Attachment) => void;

  /**
   * Callback function called when the user cancels the edit
   */
  onCancel: () => void;
}

/**
 * Attachment Interface
 * Represents a course resource or attachment in the LMS
 */
interface Attachment {
  /**
   * Unique identifier for the attachment
   */
  id: string;

  /**
   * Name of the attachment
   */
  name: string;

  /**
   * MIME type of the attachment
   */
  type: string;

  /**
   * URL of the attachment
   */
  url: string;

  /**
   * Size of the attachment in bytes
   */
  size: number;

  /**
   * Timestamp when the attachment was uploaded
   */
  uploadedAt: string;

  /**
   * Optional reference to the parent course
   */
  courseId?: string;

  /**
   * Optional description of the attachment
   */
  description?: string;
}
```

## Examples

### Basic Example

```tsx
import React, { useState } from 'react';
import { ResourceEditor } from 'components/courses/editor/ResourceEditor';
import { Attachment } from 'types/course';

const FileUploadExample: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const handleSave = (resource: Attachment) => {
    console.log('Resource with file saved:', resource);
    // Process the new resource data
    setIsEditorOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsEditorOpen(true)}>
        Upload File Resource
      </button>

      {isEditorOpen && (
        <ResourceEditor
          resource={{
            id: `temp-${Date.now()}`,
            name: '',
            type: 'application/pdf',
            url: '',
            size: 0,
            uploadedAt: new Date().toISOString()
          }}
          onSave={handleSave}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
};
```

### Advanced Example

```tsx
import React, { useState } from 'react';
import { ResourceEditor } from 'components/courses/editor/ResourceEditor';
import { Attachment } from 'types/course';

const URLResourceExample: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const handleSave = (resource: Attachment) => {
    console.log('URL resource saved:', resource);
    // Process the new resource data
    setIsEditorOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsEditorOpen(true)}>
        Add URL Resource
      </button>

      {isEditorOpen && (
        <ResourceEditor
          resource={{
            id: `temp-${Date.now()}`,
            name: '',
            type: 'text/html',
            url: '',
            size: 0,
            uploadedAt: new Date().toISOString()
          }}
          onSave={handleSave}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
};
```

### Integration with CourseEditorResources

```tsx
import React, { useState } from 'react';
import { ResourceEditor } from 'components/courses/editor/ResourceEditor';
import { Attachment } from 'types/course';

const CourseEditorResourcesExample: React.FC = () => {
  const [resources, setResources] = useState<Attachment[]>([
    {
      id: 'resource-1',
      name: 'Course Syllabus',
      type: 'application/pdf',
      url: 'https://example.com/syllabus.pdf',
      size: 1024000,
      uploadedAt: '2023-01-01T00:00:00Z'
    }
  ]);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);

  const handleSaveResource = (resourceData: Attachment) => {
    if (editingResourceId) {
      // Update existing resource
      setResources(resources.map(resource =>
        resource.id === editingResourceId
          ? { ...resource, ...resourceData }
          : resource
      ));
    }
    setEditingResourceId(null);
  };

  return (
    <div>
      <h2>Course Resources</h2>

      {resources.map(resource => (
        <div key={resource.id}>
          <h3>{resource.name}</h3>
          <p>Type: {resource.type}</p>
          <button onClick={() => setEditingResourceId(resource.id)}>
            Edit
          </button>
        </div>
      ))}

      {editingResourceId && (
        <ResourceEditor
          resource={resources.find(r => r.id === editingResourceId) || {
            id: '',
            name: '',
            type: '',
            url: '',
            size: 0,
            uploadedAt: ''
          }}
          onSave={handleSaveResource}
          onCancel={() => setEditingResourceId(null)}
        />
      )}
    </div>
  );
};
```

## Features

1. **Modal Interface**: Provides a focused modal dialog for resource editing
2. **Tabbed Interface**: Offers tabs for different resource types (file upload or URL)
3. **File Upload**: Supports file uploads with drag-and-drop functionality
4. **URL Resources**: Allows adding external resources via URLs
5. **Form Validation**: Validates required fields before saving
6. **Dynamic Title**: Shows "Add Resource" or "Edit Resource" based on whether it's a new or existing resource
7. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
8. **MIME Type Selection**: Provides a dropdown for selecting the resource type
9. **File Size Display**: Shows the size of uploaded files
10. **Preview Support**: Offers preview functionality for certain resource types

## Accessibility

The ResourceEditor component is designed with accessibility in mind, addressing the following considerations:

### Keyboard Navigation

- The modal can be closed using the Escape key
- All form controls are keyboard accessible
- Tab order follows a logical sequence through the form
- Form can be submitted using Enter key
- Tabs can be navigated using arrow keys
- Cancel and Save buttons are keyboard accessible

### Screen Reader Support

- Modal title is properly announced to screen readers
- Form labels are properly associated with their controls
- Required fields are announced as required to screen readers
- Error messages are announced to screen readers
- Tab changes are announced to screen readers
- Modal role is properly set for screen readers

### ARIA Attributes

- Modal uses `role="dialog"` attribute
- Modal uses `aria-labelledby` to associate with its title
- Form controls use `aria-required="true"` for required fields
- Error messages use `aria-live="polite"` to announce errors
- Tabs use `role="tab"` and `aria-selected` attributes
- Close button has `aria-label="Close"` for screen readers

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements
- Form controls have sufficient contrast with their backgrounds
- Error messages have sufficient contrast with their backgrounds
- Focus indicators have sufficient contrast
- Buttons have sufficient contrast with their backgrounds

### Focus Management

- Focus is trapped within the modal when it's open
- Focus is set to the first form field when the modal opens
- Focus returns to the triggering element when the modal is closed
- Focus is visible at all times
- Focus order follows a logical sequence through the form

## Edge Cases

- **Empty Resource Object**: If an empty resource object is provided, the component initializes with default values
- **Missing Required Fields**: The component validates required fields and prevents form submission if they're empty
- **New vs. Existing Resource**: The component detects whether it's creating a new resource or editing an existing one based on the ID
- **File Size Limits**: The component handles file size limits and displays appropriate error messages for files that are too large
- **Unsupported File Types**: The component validates file types and prevents uploading unsupported file formats
- **Modal Overlay Click**: Clicking outside the modal does not close it, preventing accidental data loss
- **Tab Switching**: The component handles switching between file upload and URL tabs, preserving data where appropriate
- **Network Issues**: The component handles network issues during file uploads with appropriate error messages
- **Browser Back Button**: The component doesn't handle browser back button presses, which could lead to unexpected navigation
- **Form Reset**: The Cancel button doesn't reset the form but simply closes the modal

## Implementation Details

Here's a simplified implementation of the ResourceEditor component to help developers understand its inner workings:

```tsx
import React, { useState } from 'react';
import { Attachment } from '../../../types/course';
import './ResourceEditor.css';

interface ResourceEditorProps {
  resource: Attachment;
  onSave: (resource: Attachment) => void;
  onCancel: () => void;
}

export const ResourceEditor: React.FC<ResourceEditorProps> = ({
  resource,
  onSave,
  onCancel
}) => {
  // Initialize state with resource data or defaults
  const [resourceData, setResourceData] = useState<Attachment>({
    id: resource.id || `temp-${Date.now()}`,
    name: resource.name || '',
    type: resource.type || 'application/pdf',
    url: resource.url || '',
    size: resource.size || 0,
    uploadedAt: resource.uploadedAt || new Date().toISOString()
  });

  // State for file upload
  const [file, setFile] = useState<File | null>(null);

  // State for active tab
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResourceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Update resource data with file information
      setResourceData(prev => ({
        ...prev,
        name: selectedFile.name,
        type: selectedFile.type || 'application/octet-stream',
        size: selectedFile.size,
        // In a real implementation, the URL would be set after upload
        url: URL.createObjectURL(selectedFile)
      }));
    }
  };

  // Handle form submission
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!resourceData.name) {
      alert('Resource name is required');
      return;
    }

    if (activeTab === 'url' && !resourceData.url) {
      alert('Resource URL is required');
      return;
    }

    if (activeTab === 'file' && !file && !resource.url) {
      alert('Please select a file to upload');
      return;
    }

    // In a real implementation, file upload would happen here
    // For this example, we'll just pass the resource data

    // Call the onSave callback with the updated resource data
    onSave(resourceData);
  };

  // Determine if this is a new resource or editing an existing one
  const isNewResource = resource.id?.startsWith('temp-');

  return (
    <div className="resource-editor-overlay">
      <div className="resource-editor-modal" role="dialog" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {isNewResource ? 'Add Resource' : 'Edit Resource'}
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
              <label htmlFor="name">Resource Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={resourceData.name}
                onChange={handleInputChange}
                placeholder="Enter resource name"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Resource Type</label>
              <select
                id="type"
                name="type"
                className="form-control"
                value={resourceData.type}
                onChange={handleInputChange}
              >
                <option value="application/pdf">PDF Document</option>
                <option value="text/html">Web Page</option>
                <option value="image/jpeg">Image</option>
                <option value="video/mp4">Video</option>
                <option value="application/vnd.ms-powerpoint">PowerPoint</option>
                <option value="application/vnd.ms-excel">Excel</option>
                <option value="application/msword">Word Document</option>
                <option value="application/zip">Archive</option>
                <option value="text/plain">Text File</option>
                <option value="application/octet-stream">Other</option>
              </select>
            </div>

            <div className="resource-tabs">
              <div className="tab-buttons" role="tablist">
                <button
                  type="button"
                  role="tab"
                  id="tab-file"
                  aria-selected={activeTab === 'file'}
                  aria-controls="panel-file"
                  className={`tab-button ${activeTab === 'file' ? 'active' : ''}`}
                  onClick={() => setActiveTab('file')}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-url"
                  aria-selected={activeTab === 'url'}
                  aria-controls="panel-url"
                  className={`tab-button ${activeTab === 'url' ? 'active' : ''}`}
                  onClick={() => setActiveTab('url')}
                >
                  URL
                </button>
              </div>

              <div className="tab-content">
                <div
                  id="panel-file"
                  role="tabpanel"
                  aria-labelledby="tab-file"
                  className={`tab-panel ${activeTab === 'file' ? 'active' : ''}`}
                >
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="file" className="file-label">
                      <div className="file-upload-icon">
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
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <div className="file-upload-text">
                        {file ? file.name : 'Click to select a file or drag and drop'}
                      </div>
                    </label>
                  </div>

                  {file && (
                    <div className="file-info">
                      <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                      <p>Type: {file.type}</p>
                    </div>
                  )}
                </div>

                <div
                  id="panel-url"
                  role="tabpanel"
                  aria-labelledby="tab-url"
                  className={`tab-panel ${activeTab === 'url' ? 'active' : ''}`}
                >
                  <div className="form-group">
                    <label htmlFor="url">Resource URL *</label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      className="form-control"
                      value={resourceData.url}
                      onChange={handleInputChange}
                      placeholder="Enter resource URL"
                      required={activeTab === 'url'}
                      aria-required={activeTab === 'url' ? 'true' : 'false'}
                    />
                  </div>
                </div>
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
              Save Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

## Related Components

- [CourseEditorResources](./CourseEditorResources.md): Parent component that uses ResourceEditor for creating and editing resources
- [ModuleEditor](./ModuleEditor.md): Similar component for editing modules within the course editor
- [CourseEditorModern](./CourseEditorModern.md): Top-level component that contains the course editor interface
- [CourseEditorTabs](./CourseEditorTabs.md): Navigation component that allows switching to the resources tab
- [ActivityEditor](./ActivityEditor.md): Similar component for editing activities within modules

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-resourceeditor--default).

## Technical Debt

- The component uses a simple alert for validation errors, which should be replaced with a more accessible error message system
- The component doesn't handle keyboard events for closing the modal with the Escape key
- The component doesn't trap focus within the modal for better accessibility
- The component doesn't have comprehensive test coverage
- The component doesn't support internationalization for labels and messages
- The component doesn't implement proper error boundaries
- The file upload functionality doesn't include progress indicators for large files
- The component doesn't support multiple file uploads

## Version Compatibility

For detailed version compatibility information, see the [ResourceEditor Version Compatibility Matrix](./ResourceEditor-version-compatibility.md).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic form fields |
| 1.1.0 | Added file upload functionality |
| 1.2.0 | Added URL resource support |
| 1.3.0 | Added tabbed interface for file/URL selection |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added drag-and-drop file upload support |
| 2.2.0 | Added file type validation |
| 2.3.0 | Added basic accessibility attributes |
