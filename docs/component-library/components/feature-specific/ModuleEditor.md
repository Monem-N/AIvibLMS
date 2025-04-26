# ModuleEditor

## Introduction

The ModuleEditor component is used in the Hypatia LMS for creating and editing course modules within the course editor interface. It provides a modal dialog with a form for instructors to input module details such as title, description, and status.

## Description

The ModuleEditor component is a modal dialog component that allows instructors to create new modules or edit existing ones. It presents a form with fields for the module title, description, and status (locked or unlocked). The component handles form validation, ensuring that required fields like the module title are filled before saving.

The component is designed to be used within the CourseEditorModules component, appearing when an instructor clicks the "Add Module" button or the "Edit" button on an existing module. It provides a clean, focused interface for module management, helping instructors organize their course content effectively. The modal design ensures that instructors can focus on the task at hand without navigating away from the course editor.

## Visual Examples

### Add Module Modal

<!-- Note: Replace with actual screenshot when available -->
![Add Module Modal](https://via.placeholder.com/800x600?text=Add+Module+Modal)

The modal dialog for creating a new module

### Edit Module Modal

<!-- Note: Replace with actual screenshot when available -->
![Edit Module Modal](https://via.placeholder.com/800x600?text=Edit+Module+Modal)

The modal dialog for editing an existing module

### Form Validation

<!-- Note: Replace with actual screenshot when available -->
![Form Validation](https://via.placeholder.com/800x600?text=Form+Validation)

The modal showing validation error when required fields are not filled

## Import

```tsx
import { ModuleEditor } from 'components/courses/editor/ModuleEditor';
```

## Usage Example

```tsx
import React, { useState } from 'react';
import { ModuleEditor } from 'components/courses/editor/ModuleEditor';
import { Module } from 'types/course';

const CourseEditorExample: React.FC = () => {
  const [showModuleEditor, setShowModuleEditor] = useState<boolean>(false);
  const [modules, setModules] = useState<Module[]>([]);

  const handleSaveModule = (moduleData: Partial<Module>) => {
    // Create a new module with the provided data
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: moduleData.title || '',
      description: moduleData.description || '',
      order: modules.length,
      status: moduleData.status as 'locked' | 'unlocked' || 'locked',
      activities: []
    };

    // Add the new module to the modules array
    setModules([...modules, newModule]);

    // Close the module editor
    setShowModuleEditor(false);
  };

  return (
    <div>
      <button onClick={() => setShowModuleEditor(true)}>
        Add Module
      </button>

      {showModuleEditor && (
        <ModuleEditor
          module={{
            title: '',
            description: '',
            status: 'locked'
          }}
          onSave={handleSaveModule}
          onCancel={() => setShowModuleEditor(false)}
        />
      )}

      {/* Display modules */}
      <div>
        {modules.map(module => (
          <div key={module.id}>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <p>Status: {module.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Usage

The ModuleEditor component is typically used within the CourseEditorModules component:

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| module | Partial\<Module\> | - | Yes | Module object containing the data to be displayed and edited |
| onSave | (module: Partial\<Module\>) => void | - | Yes | Callback function called when the module is saved |
| onCancel | () => void | - | Yes | Callback function called when the user cancels the edit |

## State

The component manages the following internal state:

| State | Type | Default | Description |
|-------|------|---------|-------------|
| moduleData | Partial\<Module\> | Based on module prop | The current state of the module being edited |

## Form Fields

The ModuleEditor form includes the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | text input | Yes | The title of the module |
| description | textarea | No | A detailed description of the module content |
| status | select | Yes | The access status of the module (locked or unlocked) |

## Type Definitions

```tsx
/**
 * Props for the ModuleEditor component
 */
interface ModuleEditorProps {
  /**
   * Module object containing the data to be displayed and edited
   */
  module: Partial<Module>;

  /**
   * Callback function called when the module is saved
   */
  onSave: (module: Partial<Module>) => void;

  /**
   * Callback function called when the user cancels the edit
   */
  onCancel: () => void;
}

/**
 * Module Interface
 * Represents a course module in the LMS
 */
interface Module {
  /**
   * Unique identifier for the module
   */
  id: string;

  /**
   * Title of the module
   */
  title: string;

  /**
   * Optional detailed description of the module
   */
  description?: string;

  /**
   * Optional reference to the parent course
   */
  courseId?: string;

  /**
   * Position of the module in the course
   */
  order: number;

  /**
   * Access status of the module
   */
  status?: 'locked' | 'unlocked';

  /**
   * Optional array of activities within the module
   */
  activities?: Activity[];

  /**
   * Optional creation timestamp
   */
  createdAt?: string;

  /**
   * Optional last update timestamp
   */
  updatedAt?: string;
}
```

## Examples

### Basic Example

```tsx
import React, { useState } from 'react';
import { ModuleEditor } from 'components/courses/editor/ModuleEditor';
import { Module } from 'types/course';

const NewModuleExample: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const handleSave = (moduleData: Partial<Module>) => {
    console.log('New module data:', moduleData);
    // Process the new module data
    setIsEditorOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsEditorOpen(true)}>
        Create New Module
      </button>

      {isEditorOpen && (
        <ModuleEditor
          module={{
            id: `temp-${Date.now()}`,
            title: '',
            description: '',
            status: 'locked'
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
import { ModuleEditor } from 'components/courses/editor/ModuleEditor';
import { Module } from 'types/course';

const EditModuleExample: React.FC = () => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [module, setModule] = useState<Module>({
    id: 'module-123',
    title: 'Introduction to React',
    description: 'Learn the basics of React and build your first application.',
    order: 0,
    status: 'locked',
    activities: []
  });

  const handleSave = (moduleData: Partial<Module>) => {
    // Update the module with the new data
    setModule({
      ...module,
      ...moduleData
    });
    setIsEditorOpen(false);
  };

  return (
    <div>
      <div>
        <h3>{module.title}</h3>
        <p>{module.description}</p>
        <p>Status: {module.status}</p>
        <button onClick={() => setIsEditorOpen(true)}>
          Edit Module
        </button>
      </div>

      {isEditorOpen && (
        <ModuleEditor
          module={module}
          onSave={handleSave}
          onCancel={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
};
```

### Integration with CourseEditorModules

```tsx
import React, { useState } from 'react';
import { ModuleEditor } from 'components/courses/editor/ModuleEditor';
import { Module } from 'types/course';

const CourseEditorModulesExample: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'module-1',
      title: 'Getting Started',
      description: 'Introduction to the course',
      order: 0,
      status: 'unlocked',
      activities: []
    }
  ]);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  const handleSaveModule = (moduleData: Partial<Module>) => {
    if (editingModuleId) {
      // Update existing module
      setModules(modules.map(module =>
        module.id === editingModuleId
          ? { ...module, ...moduleData }
          : module
      ));
    }
    setEditingModuleId(null);
  };

  return (
    <div>
      <h2>Course Modules</h2>

      {modules.map(module => (
        <div key={module.id}>
          <h3>{module.title}</h3>
          <p>{module.description}</p>
          <button onClick={() => setEditingModuleId(module.id)}>
            Edit
          </button>
        </div>
      ))}

      {editingModuleId && (
        <ModuleEditor
          module={modules.find(m => m.id === editingModuleId) || {}}
          onSave={handleSaveModule}
          onCancel={() => setEditingModuleId(null)}
        />
      )}
    </div>
  );
};
```

## Features

1. **Modal Interface**: Provides a focused modal dialog for module editing
2. **Form Validation**: Validates required fields before saving
3. **Dynamic Title**: Shows "Add Module" or "Edit Module" based on whether it's a new or existing module
4. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
5. **Keyboard Navigation**: Supports keyboard navigation for improved accessibility
6. **Form Controls**: Includes text input, textarea, and select controls for different field types
7. **Cancel Functionality**: Allows users to cancel edits without saving changes
8. **Status Management**: Enables instructors to set module status (locked or unlocked)
9. **Clean UI**: Provides a clean, distraction-free interface for module management
10. **Reusable Component**: Can be used in different contexts within the course editor

## Accessibility

The ModuleEditor component is designed with accessibility in mind, addressing the following considerations:

### Keyboard Navigation

- The modal can be closed using the Escape key
- All form controls are keyboard accessible
- Tab order follows a logical sequence through the form
- Form can be submitted using Enter key
- Cancel and Save buttons are keyboard accessible

### Screen Reader Support

- Modal title is properly announced to screen readers
- Form labels are properly associated with their controls
- Required fields are announced as required to screen readers
- Error messages are announced to screen readers
- Modal role is properly set for screen readers

### ARIA Attributes

- Modal uses `role="dialog"` attribute
- Modal uses `aria-labelledby` to associate with its title
- Form controls use `aria-required="true"` for required fields
- Error messages use `aria-live="polite"` to announce errors
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

- **Empty Module Object**: If an empty module object is provided, the component initializes with default values
- **Missing Required Fields**: The component validates required fields and prevents form submission if they're empty
- **New vs. Existing Module**: The component detects whether it's creating a new module or editing an existing one based on the ID
- **Form Submission**: The component prevents default form submission behavior and handles it through the onSave callback
- **Modal Overlay Click**: Clicking outside the modal does not close it, preventing accidental data loss
- **Long Text Content**: The component handles long text content in the description field with scrolling
- **Mobile Viewport**: On smaller screens, the component adjusts its layout for better usability
- **Escape Key Press**: The component handles Escape key press to cancel editing
- **Browser Back Button**: The component doesn't handle browser back button presses, which could lead to unexpected navigation
- **Form Reset**: The Cancel button doesn't reset the form but simply closes the modal

## Implementation Details

Here's a simplified implementation of the ModuleEditor component to help developers understand its inner workings:

```tsx
import React, { useState } from 'react';
import { Module } from '../../../types/course';
import './ModuleEditor.css';

interface ModuleEditorProps {
  module: Partial<Module>;
  onSave: (module: Partial<Module>) => void;
  onCancel: () => void;
}

const ModuleEditor: React.FC<ModuleEditorProps> = ({
  module,
  onSave,
  onCancel
}) => {
  // Initialize state with module data or defaults
  const [moduleData, setModuleData] = useState<Partial<Module>>({
    title: module.title || '',
    description: module.description || '',
    status: module.status || 'locked'
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModuleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!moduleData.title) {
      alert('Module title is required');
      return;
    }

    // Call the onSave callback with the updated module data
    onSave(moduleData);
  };

  // Determine if this is a new module or editing an existing one
  const isNewModule = module.id?.startsWith('temp-');

  return (
    <div className="module-editor-overlay">
      <div className="module-editor-modal" role="dialog" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {isNewModule ? 'Add Module' : 'Edit Module'}
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
              <label htmlFor="title">Module Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={moduleData.title}
                onChange={handleInputChange}
                placeholder="Enter module title"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Module Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={moduleData.description}
                onChange={handleInputChange}
                placeholder="Enter module description"
                rows={4}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="status">Module Status</label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={moduleData.status}
                onChange={handleInputChange}
              >
                <option value="locked">Locked</option>
                <option value="unlocked">Unlocked</option>
              </select>
              <div className="form-hint">
                Locked modules are not accessible to students until you unlock them
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
              Save Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleEditor;
```

## Related Components

- [CourseEditorModules](./CourseEditorModules.md): Parent component that uses ModuleEditor for creating and editing modules
- [ActivityEditor](./ActivityEditor.md): Similar component for editing activities within modules
- [CourseEditorModern](./CourseEditorModern.md): Top-level component that contains the course editor interface
- [CourseEditorTabs](./CourseEditorTabs.md): Navigation component that allows switching to the modules tab
- [ResourceEditor](./ResourceEditor.md): Similar component for editing course resources

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-moduleeditor--default).

## Technical Debt

- The component uses a simple alert for validation errors, which should be replaced with a more accessible error message system
- The component doesn't handle keyboard events for closing the modal with the Escape key
- The component doesn't trap focus within the modal for better accessibility
- The component doesn't have comprehensive test coverage
- The component doesn't support internationalization for labels and messages
- The component doesn't implement proper error boundaries

## Version Compatibility

For detailed version compatibility information, see the [ModuleEditor Version Compatibility Matrix](./ModuleEditor-version-compatibility.md).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic form fields |
| 1.1.0 | Added validation for required fields |
| 1.2.0 | Added module status field |
| 1.3.0 | Improved modal styling and responsiveness |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added support for new vs. existing module detection |
| 2.2.0 | Improved form field styling |
| 2.3.0 | Added basic accessibility attributes |
