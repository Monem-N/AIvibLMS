# Technical Debt Review for CourseEditorModules

## Summary

| Category | Count | Severity | Overall Impact |
|----------|-------|----------|----------------|
| UX Improvements | 3 | Medium | Medium |
| Performance Issues | 2 | Medium-High | Medium |
| Accessibility Issues | 3 | High | High |
| Testing Gaps | 2 | High | High |
| **Total** | **10** | **Medium-High** | **Medium-High** |

## UX Improvements

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| UX-001 | Missing Drag-and-Drop | No drag-and-drop functionality for reordering modules and activities | Reduces usability for instructors | Implement drag-and-drop using react-dnd or similar | High |
| UX-002 | Confirmation Dialogs | No confirmation dialogs for destructive actions like deleting modules or activities | Can lead to accidental data loss | Add confirmation dialogs | Medium |
| UX-003 | Unsaved Changes Warning | No warning when navigating away with unsaved changes | Can lead to data loss | Add unsaved changes detection and warning | Medium |

## Performance Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| PERF-001 | No Virtualization | Doesn't implement virtualization for large lists | Performance issues with many modules/activities | Implement virtualization using react-window or similar | High |
| PERF-002 | Inefficient Rendering | Renders all modules and activities even when collapsed | Unnecessary rendering and potential performance issues | Implement lazy loading for collapsed modules | Medium |

## Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Attributes | Insufficient ARIA attributes for screen readers | Reduces accessibility for screen reader users | Add appropriate ARIA attributes | High |
| A-002 | Keyboard Navigation | Limited keyboard navigation support | Reduces accessibility for keyboard users | Improve keyboard navigation | High |
| A-003 | Focus Management | Poor focus management when opening/closing modals | Confusing for screen reader and keyboard users | Implement proper focus management | Medium |

## Testing Gaps

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| TEST-001 | Missing Unit Tests | Lacks comprehensive unit tests | Makes refactoring risky | Add unit tests for all functions | High |
| TEST-002 | Missing Integration Tests | Lacks integration tests with ModuleEditor and ActivityEditor | Can lead to integration issues | Add integration tests | Medium |

## Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| A-001 | Missing ARIA Attributes | High | 2 days | 2.4.0 | None |
| A-002 | Keyboard Navigation | High | 3 days | 2.4.0 | None |
| TEST-001 | Missing Unit Tests | High | 5 days | 2.4.0 | None |
| UX-001 | Missing Drag-and-Drop | High | 4 days | 2.5.0 | react-dnd |
| PERF-001 | No Virtualization | High | 3 days | 2.5.0 | react-window |
| UX-002 | Confirmation Dialogs | Medium | 1 day | 2.5.0 | None |
| A-003 | Focus Management | Medium | 2 days | 2.5.0 | None |
| TEST-002 | Missing Integration Tests | Medium | 3 days | 2.6.0 | None |
| UX-003 | Unsaved Changes Warning | Medium | 2 days | 2.6.0 | None |
| PERF-002 | Inefficient Rendering | Medium | 3 days | 2.6.0 | None |

## Migration Guide for Deprecated Features

```jsx
// No deprecated features in the current version
```

## Additional Notes

This technical debt analysis was automatically generated based on static code analysis and manual review. It may not capture all technical debt issues, and some identified issues may be false positives. Please review and validate each issue before addressing it.

The component was analyzed on 2023-08-18.

## Severity Definitions

| Severity | Definition |
|----------|------------|
| **High** | Critical issues that significantly impact maintainability, performance, or user experience. Should be addressed in the next release. |
| **Medium** | Important issues that have moderate impact. Should be addressed in the next few releases. |
| **Low** | Minor issues with limited impact. Can be addressed when convenient or as part of larger refactoring efforts. |

## Priority Definitions

| Priority | Definition |
|----------|------------|
| **High** | Should be addressed as soon as possible, ideally in the next sprint. |
| **Medium** | Should be addressed in the next 2-3 sprints. |
| **Low** | Can be addressed when convenient or as part of larger refactoring efforts. |

## Refactoring Examples

### Adding Drag-and-Drop Functionality

```tsx
// Before: No drag-and-drop functionality
<div className="modules-list">
  {modules.map((module, index) => (
    <div 
      key={module.id}
      className={`module-item ${expandedModules[module.id] ? 'expanded' : ''}`}
    >
      {/* Module content */}
    </div>
  ))}
</div>

// After: With drag-and-drop functionality
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ModuleItem = ({ module, index, moveModule }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'MODULE',
    item: { id: module.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'MODULE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveModule(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div 
      ref={(node) => drag(drop(node))}
      className={`module-item ${expandedModules[module.id] ? 'expanded' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Module content */}
    </div>
  );
};

// In the main component
const moveModule = (fromIndex, toIndex) => {
  const updatedModules = [...modules];
  const [movedModule] = updatedModules.splice(fromIndex, 1);
  updatedModules.splice(toIndex, 0, movedModule);
  
  // Update order property
  updatedModules.forEach((module, index) => {
    module.order = index;
  });
  
  onChange(updatedModules);
};

// In the render method
<DndProvider backend={HTML5Backend}>
  <div className="modules-list">
    {modules.map((module, index) => (
      <ModuleItem
        key={module.id}
        module={module}
        index={index}
        moveModule={moveModule}
      />
    ))}
  </div>
</DndProvider>
```

### Adding Virtualization for Performance

```tsx
// Before: No virtualization
<div className="modules-list">
  {modules.map((module, index) => (
    <div 
      key={module.id}
      className={`module-item ${expandedModules[module.id] ? 'expanded' : ''}`}
    >
      {/* Module content */}
    </div>
  ))}
</div>

// After: With virtualization
import { FixedSizeList as List } from 'react-window';

// In the render method
<div className="modules-list">
  <List
    height={500}
    width="100%"
    itemCount={modules.length}
    itemSize={expandedModules[modules[0]?.id] ? 300 : 60} // Approximate height
    itemData={{
      modules,
      expandedModules,
      toggleModule,
      setEditingModule,
      deleteModule,
      addActivity,
      setEditingActivity,
      deleteActivity
    }}
  >
    {({ index, style, data }) => {
      const module = data.modules[index];
      return (
        <div 
          style={style}
          key={module.id}
          className={`module-item ${data.expandedModules[module.id] ? 'expanded' : ''}`}
        >
          {/* Module content */}
        </div>
      );
    }}
  </List>
</div>
```

### Improving Accessibility with ARIA Attributes

```tsx
// Before: Limited ARIA attributes
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
</div>

// After: With proper ARIA attributes
<div 
  className="module-header"
  role="region"
  aria-labelledby={`module-title-${module.id}`}
>
  <div 
    className="module-title-section"
    onClick={() => toggleModule(module.id)}
    role="button"
    aria-expanded={expandedModules[module.id]}
    aria-controls={`module-content-${module.id}`}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleModule(module.id);
      }
    }}
  >
    <h3 
      id={`module-title-${module.id}`}
      className="module-title"
    >
      {module.title}
    </h3>
    <div className="module-info">
      <span 
        className="module-activities-count"
        aria-label={`${module.activities?.length || 0} activities`}
      >
        {module.activities?.length || 0} activities
      </span>
    </div>
  </div>
</div>

{expandedModules[module.id] && (
  <div 
    id={`module-content-${module.id}`}
    className="module-content"
    aria-labelledby={`module-title-${module.id}`}
  >
    {/* Module content */}
  </div>
)}
```

### Adding Confirmation Dialogs

```tsx
// Before: No confirmation dialog
const deleteModule = (moduleId: string) => {
  const updatedModules = modules.filter(module => module.id !== moduleId);
  onChange(updatedModules);
};

// After: With confirmation dialog
import { useState } from 'react';

// Add state for confirmation dialog
const [confirmDelete, setConfirmDelete] = useState<{
  type: 'module' | 'activity';
  moduleId: string;
  activityId?: string;
} | null>(null);

// Update delete functions
const handleDeleteModule = (moduleId: string) => {
  setConfirmDelete({
    type: 'module',
    moduleId
  });
};

const handleDeleteActivity = (moduleId: string, activityId: string) => {
  setConfirmDelete({
    type: 'activity',
    moduleId,
    activityId
  });
};

const confirmDeleteAction = () => {
  if (!confirmDelete) return;
  
  if (confirmDelete.type === 'module') {
    const updatedModules = modules.filter(module => module.id !== confirmDelete.moduleId);
    onChange(updatedModules);
  } else if (confirmDelete.type === 'activity' && confirmDelete.activityId) {
    const updatedModules = modules.map(module => 
      module.id === confirmDelete.moduleId
        ? {
            ...module,
            activities: module.activities?.filter(activity => activity.id !== confirmDelete.activityId)
          }
        : module
    );
    onChange(updatedModules);
  }
  
  setConfirmDelete(null);
};

// Add confirmation dialog to the component
{confirmDelete && (
  <div className="confirmation-dialog-overlay">
    <div 
      className="confirmation-dialog"
      role="dialog"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <h3 id="confirm-delete-title">Confirm Delete</h3>
      <p id="confirm-delete-description">
        {confirmDelete.type === 'module'
          ? 'Are you sure you want to delete this module? This action cannot be undone.'
          : 'Are you sure you want to delete this activity? This action cannot be undone.'}
      </p>
      <div className="dialog-actions">
        <button 
          className="btn btn-outline"
          onClick={() => setConfirmDelete(null)}
        >
          Cancel
        </button>
        <button 
          className="btn btn-danger"
          onClick={confirmDeleteAction}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
```

### Adding Comprehensive Tests

```tsx
// CourseEditorModules.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseEditorModules from '../CourseEditorModules';
import { Module, Activity } from '../../../types/course';

// Mock child components
jest.mock('../ModuleEditor', () => {
  return {
    __esModule: true,
    default: ({ module, onSave, onCancel }) => (
      <div data-testid="module-editor">
        <input
          data-testid="module-title-input"
          value={module.title}
          onChange={(e) => {}}
        />
        <button
          data-testid="save-module-button"
          onClick={() => onSave({ ...module, title: 'Updated Module' })}
        >
          Save
        </button>
        <button data-testid="cancel-module-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    ),
  };
});

jest.mock('../ActivityEditor', () => {
  return {
    __esModule: true,
    default: ({ activity, onSave, onCancel }) => (
      <div data-testid="activity-editor">
        <input
          data-testid="activity-title-input"
          value={activity.title}
          onChange={(e) => {}}
        />
        <button
          data-testid="save-activity-button"
          onClick={() => onSave({ ...activity, title: 'Updated Activity' })}
        >
          Save
        </button>
        <button data-testid="cancel-activity-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    ),
  };
});

describe('CourseEditorModules Component', () => {
  // Mock data
  const mockModules: Module[] = [
    {
      id: 'module-1',
      title: 'Module 1',
      description: 'Description 1',
      order: 0,
      status: 'unlocked',
      activities: [
        {
          id: 'activity-1',
          title: 'Activity 1',
          description: 'Activity Description 1',
          type: 'content',
          moduleId: 'module-1',
          order: 0,
          status: 'not-started'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Module 2',
      description: 'Description 2',
      order: 1,
      status: 'locked',
      activities: []
    }
  ];
  
  // Mock onChange function
  const mockOnChange = jest.fn();
  
  beforeEach(() => {
    mockOnChange.mockClear();
  });
  
  it('renders without crashing', () => {
    render(
      <CourseEditorModules 
        modules={mockModules}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByText('Course Modules')).toBeInTheDocument();
  });
  
  it('displays modules correctly', () => {
    render(
      <CourseEditorModules 
        modules={mockModules}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByText('Module 1')).toBeInTheDocument();
    expect(screen.getByText('Module 2')).toBeInTheDocument();
  });
  
  it('displays empty state when no modules', () => {
    render(
      <CourseEditorModules 
        modules={[]}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByText('No Modules Yet')).toBeInTheDocument();
    expect(screen.getByText('Start building your course by adding modules and activities.')).toBeInTheDocument();
  });
  
  it('adds a new module when Add Module button is clicked', () => {
    render(
      <CourseEditorModules 
        modules={mockModules}
        onChange={mockOnChange}
      />
    );
    
    fireEvent.click(screen.getByText('Add Module'));
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][0].length).toBe(3);
    expect(mockOnChange.mock.calls[0][0][2].title).toBe('New Module');
  });
  
  it('opens module editor when Edit button is clicked', () => {
    render(
      <CourseEditorModules 
        modules={mockModules}
        onChange={mockOnChange}
      />
    );
    
    // Find and click the edit button for the first module
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    expect(screen.getByTestId('module-editor')).toBeInTheDocument();
  });
  
  it('updates module when saved from editor', () => {
    render(
      <CourseEditorModules 
        modules={mockModules}
        onChange={mockOnChange}
      />
    );
    
    // Open module editor
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    
    // Save the module
    fireEvent.click(screen.getByTestId('save-module-button'));
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][0][0].title).toBe('Updated Module');
  });
  
  it('deletes module when Delete button is clicked', () => {
    render(
      <CourseEditorModules 
        modules={mockModules}
        onChange={mockOnChange}
      />
    );
    
    // Find and click the delete button for the first module
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][0].length).toBe(1);
    expect(mockOnChange.mock.calls[0][0][0].id).toBe('module-2');
  });
  
  // Add more tests for activities, expanding/collapsing, etc.
});
```
