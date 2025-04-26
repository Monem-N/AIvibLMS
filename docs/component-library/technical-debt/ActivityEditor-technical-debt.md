# Technical Debt Review for ActivityEditor

## Summary

| Category | Count | Severity | Overall Impact |
|----------|-------|----------|----------------|
| Legacy Patterns | 2 | Medium-High | Medium |
| Accessibility Issues | 2 | High | High |
| Required Future Optimizations | 3 | Low-Medium | Medium |
| **Total** | **7** | **Medium-High** | **Medium-High** |

## Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Inline SVG Icons | SVG icons are defined inline instead of using a component | Reduces reusability and increases file size | Extract SVG icons to separate components | Medium |
| LP-002 | Alert for Validation | Uses browser alert for validation errors | Poor user experience and accessibility | Replace with inline form validation | High |

## Deprecated Props

| ID | Prop | Version Deprecated | Replacement | Migration Path | Breaking Change |
|----|------|-------------------|-------------|----------------|----------------|
| N/A | N/A | N/A | N/A | N/A | N/A |

## Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Markdown Preview | Add preview for Markdown content | Better user experience | Medium | Medium |
| RFO-002 | Unsaved Changes Warning | Add warning when closing with unsaved changes | Prevents accidental data loss | Low | Medium |
| RFO-003 | Rich Text Editor | Replace plain textarea with rich text editor | Better content editing experience | High | Low |

## Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing Focus Trap | Focus can escape the modal with Tab | Reduces accessibility for keyboard users | Implement focus trap in modal | High |
| A-002 | Missing Escape Key Handler | No explicit handler for Escape key | Reduces accessibility for keyboard users | Add Escape key handler | Medium |

## Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| LP-002 | Alert for Validation | High | 2 days | 2.3.0 | None |
| A-001 | Missing Focus Trap | High | 1 day | 2.3.0 | None |
| A-002 | Missing Escape Key Handler | Medium | 0.5 days | 2.3.0 | None |
| LP-001 | Inline SVG Icons | Medium | 1 day | 2.4.0 | Icon component library |
| RFO-002 | Unsaved Changes Warning | Medium | 1 day | 2.4.0 | None |
| RFO-001 | Markdown Preview | Medium | 3 days | 2.5.0 | Markdown preview library |
| RFO-003 | Rich Text Editor | Low | 5 days | 3.0.0 | Rich text editor library |

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

### Extracting SVG Icons to Components

```tsx
// Before: Inline SVG icons
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

// After: Using Icon components
import { CloseIcon } from 'components/icons';

<button 
  className="modal-close"
  onClick={onCancel}
  aria-label="Close"
>
  <CloseIcon size={24} aria-hidden="true" />
</button>
```

### Replacing Alert with Inline Validation

```tsx
// Before: Using browser alert
const handleSave = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate required fields
  if (!activityData.title) {
    alert('Activity title is required');
    return;
  }
  
  onSave(activityData);
};

// After: Using inline validation
const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};
  
  if (!activityData.title) {
    newErrors.title = 'Activity title is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSave = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validateForm()) {
    onSave(activityData);
  }
};

// In the JSX
<div className="form-group">
  <label htmlFor="title">Activity Title *</label>
  <input
    type="text"
    id="title"
    name="title"
    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
    value={activityData.title}
    onChange={handleInputChange}
    placeholder="Enter activity title"
    required
    aria-required="true"
    aria-invalid={!!errors.title}
    aria-describedby={errors.title ? 'title-error' : undefined}
  />
  {errors.title && (
    <div 
      className="invalid-feedback" 
      id="title-error"
      role="alert"
    >
      {errors.title}
    </div>
  )}
</div>
```

### Implementing Focus Trap

```tsx
// Before: No focus trap
return (
  <div className="activity-editor-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div className="activity-editor-modal">
      {/* Modal content */}
    </div>
  </div>
);

// After: With focus trap
import { useEffect, useRef } from 'react';

const ActivityEditor: React.FC<ActivityEditorProps> = ({ 
  activity, 
  onSave, 
  onCancel 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  
  // Focus the title input when the modal opens
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);
  
  // Implement focus trap
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        // If shift+tab and focus is on first element, move to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // If tab and focus is on last element, move to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, []);
  
  return (
    <div className="activity-editor-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="activity-editor-modal" ref={modalRef}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {activity.id?.startsWith('temp-') ? 'Add Activity' : 'Edit Activity'}
          </h2>
          <button 
            ref={closeButtonRef}
            className="modal-close"
            onClick={onCancel}
            aria-label="Close"
          >
            {/* Close icon */}
          </button>
        </div>
        
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Activity Title *</label>
              <input
                ref={titleInputRef}
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
            
            {/* Other form fields */}
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
              ref={saveButtonRef}
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
```

### Adding Escape Key Handler

```tsx
// Before: No explicit Escape key handler
const ActivityEditor: React.FC<ActivityEditorProps> = ({ 
  activity, 
  onSave, 
  onCancel 
}) => {
  // Component implementation
};

// After: With Escape key handler
const ActivityEditor: React.FC<ActivityEditorProps> = ({ 
  activity, 
  onSave, 
  onCancel 
}) => {
  // Add Escape key handler
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onCancel]);
  
  // Rest of component implementation
};
```

### Adding Markdown Preview

```tsx
// Before: No Markdown preview
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

// After: With Markdown preview
import ReactMarkdown from 'react-markdown';

const [showPreview, setShowPreview] = useState<boolean>(false);

// In the JSX
<div className="form-group">
  <div className="content-header">
    <label htmlFor="content">Content</label>
    <div className="content-tabs">
      <button
        type="button"
        className={`content-tab ${!showPreview ? 'active' : ''}`}
        onClick={() => setShowPreview(false)}
        aria-pressed={!showPreview}
      >
        Edit
      </button>
      <button
        type="button"
        className={`content-tab ${showPreview ? 'active' : ''}`}
        onClick={() => setShowPreview(true)}
        aria-pressed={showPreview}
      >
        Preview
      </button>
    </div>
  </div>
  
  {!showPreview ? (
    <>
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
    </>
  ) : (
    <div className="markdown-preview">
      {activityData.content ? (
        <ReactMarkdown>{activityData.content}</ReactMarkdown>
      ) : (
        <div className="preview-empty">
          No content to preview
        </div>
      )}
    </div>
  )}
</div>
```

### Adding Unsaved Changes Warning

```tsx
// Before: No unsaved changes warning
const handleCancel = () => {
  onCancel();
};

// After: With unsaved changes warning
const [initialData, setInitialData] = useState<Partial<Activity>>({});
const [hasChanges, setHasChanges] = useState<boolean>(false);

// Set initial data when component mounts
useEffect(() => {
  setInitialData({
    title: activity.title || '',
    description: activity.description || '',
    type: activity.type || 'content',
    status: activity.status || 'not-started',
    points: activity.points || 0,
    dueDate: activity.dueDate || '',
    content: activity.content || ''
  });
}, [activity]);

// Check for changes when activityData changes
useEffect(() => {
  const checkChanges = () => {
    return (
      initialData.title !== activityData.title ||
      initialData.description !== activityData.description ||
      initialData.type !== activityData.type ||
      initialData.status !== activityData.status ||
      initialData.points !== activityData.points ||
      initialData.dueDate !== activityData.dueDate ||
      initialData.content !== activityData.content
    );
  };
  
  setHasChanges(checkChanges());
}, [activityData, initialData]);

// Handle cancel with confirmation
const handleCancel = () => {
  if (hasChanges) {
    const confirmCancel = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
    if (!confirmCancel) {
      return;
    }
  }
  
  onCancel();
};
```
