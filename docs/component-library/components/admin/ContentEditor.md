# ContentEditor

## Introduction

The ContentEditor component is used in the AIvibLMS for creating and editing content such as pages and announcements in the admin interface. It provides a comprehensive editing experience with rich text editing, image uploads, and content preview.

## Description

The ContentEditor component is a modal dialog component that allows administrators to create new content or edit existing content. It presents a form with fields for content metadata (title, status, etc.) and a rich text editor for the main content. The component handles form validation, ensuring that required fields are filled, and provides a preview of how the content will appear to users.

The component follows a modular architecture with separate components for each tab (Content, Settings, SEO) and uses custom hooks for form state management. This design improves maintainability, testability, and extensibility while ensuring a consistent user experience.

## Visual Examples

### Create Content Modal

<!-- Note: Replace with actual screenshot when available -->
![Create Content Modal](https://via.placeholder.com/800x600?text=Create+Content+Modal)

The modal interface for creating new content

### Edit Content Modal

<!-- Note: Replace with actual screenshot when available -->
![Edit Content Modal](https://via.placeholder.com/800x600?text=Edit+Content+Modal)

The modal interface for editing existing content

### Content Preview

<!-- Note: Replace with actual screenshot when available -->
![Content Preview](https://via.placeholder.com/800x600?text=Content+Preview)

The preview mode showing how content will appear to users

## Import

```tsx
import { ContentEditor } from 'components/admin/ContentEditor';
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| contentType | 'page' \| 'announcement' | Yes | - | The type of content being edited |
| content | Page \| Announcement \| null | No | null | The content to edit (null for new content) |
| onSave | (content: Page \| Announcement) => Promise<void> | Yes | - | Callback function called when content is saved |
| onCancel | () => void | Yes | - | Callback function called when editing is cancelled |
| open | boolean | Yes | - | Whether the editor modal is open |

## Usage

```tsx
import { useState } from 'react';
import { ContentEditor } from 'components/admin/ContentEditor';
import { Page } from 'services/contentService';

const ContentManagement = () => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<Page | null>(null);

  const handleCreateContent = () => {
    setCurrentContent(null); // null indicates new content
    setEditorOpen(true);
  };

  const handleEditContent = (content: Page) => {
    setCurrentContent(content);
    setEditorOpen(true);
  };

  const handleSaveContent = async (content: Page) => {
    try {
      // Save content logic here
      console.log('Saving content:', content);
      setEditorOpen(false);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateContent}>Create New Page</button>

      {/* Content list would go here */}

      <ContentEditor
        contentType="page"
        content={currentContent}
        onSave={handleSaveContent}
        onCancel={() => setEditorOpen(false)}
        open={editorOpen}
      />
    </div>
  );
};
```

## Features

1. **Rich Text Editing**: Provides a full-featured Tiptap editor for content creation
2. **Image Uploads**: Allows uploading and embedding images in content
3. **Content Preview**: Provides a preview of how content will appear to users with HTML sanitization
4. **Schema-based Validation**: Uses Yup for comprehensive form validation with clear error messages
5. **Modular Architecture**: Separates concerns into smaller, focused components
6. **Responsive Design**: Works well on different screen sizes
7. **Accessibility**: Follows accessibility best practices with proper ARIA attributes
8. **Security**: Implements HTML sanitization to prevent XSS attacks
9. **Unified State Management**: Uses custom hooks for centralized form state management

## Component Architecture

The ContentEditor component follows a modular architecture with separate components for each tab and custom hooks for state management:

### Main Components

```tsx
// Main ContentEditor component
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Page, Announcement } from '../../services/contentService';
import { useAuth } from '../../hooks/useAuth';
import { useContentForm } from '../../hooks/useContentForm';
import { contentImageService } from '../../services/contentImageService';

// Tab Components
import TabPanel from './content/TabPanel';
import ContentTab from './content/ContentTab';
import SettingsTab from './content/SettingsTab';
import SEOTab from './content/SEOTab';

// ContentEditor component implementation
const ContentEditor: React.FC<ContentEditorProps> = ({
  contentType,
  content,
  onSave,
  onCancel,
  open
}) => {
  // UI state
  const [activeTab, setActiveTab] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Get form state and handlers from custom hook
  const {
    formData,
    errors,
    isSubmitting,
    errorMessage,
    showErrorSnackbar,
    setIsSubmitting,
    setErrorMessage,
    setShowErrorSnackbar,
    handleChange,
    handleEditorChange,
    handleAudienceChange,
    updateFeaturedImage,
    insertImageIntoContent,
    validateForm
  } = useContentForm({
    contentType,
    initialContent: content
  });

  // Component implementation...
};
```

### Tab Components

```tsx
// ContentTab component
const ContentTab: React.FC<ContentTabProps> = ({
  title,
  content,
  titleError,
  contentError,
  onTitleChange,
  onContentChange
}) => {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <Box>
      <TextField
        name="title"
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={onTitleChange}
        error={!!titleError}
        helperText={titleError}
        required
        inputProps={{ maxLength: 255 }}
      />

      {/* Content editor and preview */}
    </Box>
  );
};

// SettingsTab component
const SettingsTab: React.FC<SettingsTabProps> = ({
  contentType,
  status,
  publishDate,
  expiryDate,
  audience,
  featuredImage,
  // Other props...
}) => {
  return (
    <Box>
      {/* Status selection */}
      {/* Content type specific settings */}
    </Box>
  );
};

// SEOTab component
const SEOTab: React.FC<SEOTabProps> = ({
  metaTitle,
  metaDescription,
  keywords,
  // Other props...
}) => {
  return (
    <Box>
      {/* SEO fields */}
    </Box>
  );
};
```

### Supporting Components

```tsx
// AudienceSelector component
const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  selectedAudiences,
  onChange,
  error
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const values = event.target.value as string[];

    // Mutual exclusivity logic for "All Users"
    if (values.includes('All Users') && values.length > 1) {
      if (selectedAudiences.includes('All Users')) {
        onChange(values.filter(v => v !== 'All Users'));
      } else {
        onChange(['All Users']);
      }
    } else {
      onChange(values);
    }
  };

  return (
    <FormControl fullWidth margin="normal" error={!!error}>
      {/* Select component implementation */}
    </FormControl>
  );
};

// ImageUploader component
const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  uploading,
  currentImage
}) => {
  return (
    <>
      {/* Image upload UI */}
      {/* Image preview */}
    </>
  );
};
```

### Custom Hooks

```tsx
// useContentForm hook
export const useContentForm = ({ contentType, initialContent }: UseContentFormProps) => {
  // Form state
  const [formData, setFormData] = useState<ContentFormData>(getInitialFormData(contentType));
  const [errors, setErrors] = useState<ContentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  // Initialize form with content data if editing
  useEffect(() => {
    // Initialization logic
  }, [initialContent, contentType]);

  // Form field handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name?: string; value: unknown } }) => {
    // Update form data
  };

  // Validation logic
  const validateForm = async (): Promise<boolean> => {
    // Schema-based validation with Yup
  };

  return {
    formData,
    errors,
    isSubmitting,
    errorMessage,
    showErrorSnackbar,
    setFormData,
    setErrors,
    setIsSubmitting,
    setErrorMessage,
    setShowErrorSnackbar,
    handleChange,
    handleEditorChange,
    handleAudienceChange,
    updateFeaturedImage,
    insertImageIntoContent,
    validateForm
  };
};
```

## Related Components

- [ContentManagement](./ContentManagement.md): Parent component that uses ContentEditor for creating and editing content
- [ContentTab](./content/ContentTab.md): Component for editing content title and body
- [SettingsTab](./content/SettingsTab.md): Component for editing content settings
- [SEOTab](./content/SEOTab.md): Component for editing SEO metadata
- [AudienceSelector](./content/AudienceSelector.md): Component for selecting content audience
- [ImageUploader](./content/ImageUploader.md): Component for uploading images
- [TabPanel](./content/TabPanel.md): Component for tab content
- [TiptapEditor](../common/TiptapEditor.md): Component for rich text editing

## Technical Debt

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| TD-001 | Form Library Integration | Replace custom form state with Formik or React Hook Form | More robust form handling with less code | Medium | High |
| TD-002 | Content Versioning | Add support for content versioning | Track changes and allow reverting to previous versions | High | Medium |
| TD-003 | Content Templates | Add support for content templates | Speed up content creation with predefined templates | Medium | Low |
| TD-004 | Content Scheduling | Enhance scheduling capabilities | More granular control over content publishing | Medium | Medium |
| TD-005 | Content Workflow | Add support for review and approval workflows | Better content quality control | High | Low |
| TD-006 | Comprehensive Testing | Add unit and integration tests | Ensure component reliability | Medium | High |

## Accessibility Considerations

- All form inputs have proper labels and ARIA attributes
- Error messages are associated with their respective form fields
- The rich text editor supports keyboard navigation
- The preview mode provides a way to check content appearance
- Color contrast meets WCAG 2.1 AA standards
- Tab panels have proper ARIA roles and attributes
- Buttons have descriptive aria-labels
- Form validation provides clear error messages

## Performance Considerations

- Component architecture reduces unnecessary re-renders
- The Tiptap editor is loaded only when needed
- Custom hooks optimize state management
- Images are optimized before upload
- Form validation is performed client-side for immediate feedback
- Modular structure allows for code splitting and lazy loading
- Error handling is optimized to prevent cascading failures

## Security Considerations

- HTML content is sanitized using DOMPurify to prevent XSS attacks
- Form inputs are validated using schema-based validation with Yup
- File uploads are validated for type and size
- User permissions are checked before allowing content creation or editing
- Content is validated both client-side and server-side before saving
- Error messages are generic enough to avoid leaking sensitive information

## Best Practices

1. **Component Decomposition**: Break down complex components into smaller, focused components
2. **Custom Hooks**: Extract complex state logic into custom hooks
3. **Schema-based Validation**: Use schema-based validation for comprehensive form validation
4. **HTML Sanitization**: Always sanitize HTML content before rendering to prevent XSS attacks
5. **Unified State Management**: Use a single state object for form state
6. **Proper Error Handling**: Provide clear error messages and feedback
7. **Content Validation**: Always validate content before saving to ensure it meets quality standards
8. **Image Optimization**: Optimize images before uploading to reduce page load times
9. **SEO Metadata**: Provide meaningful SEO metadata for pages to improve search engine visibility
10. **Content Preview**: Always preview content before publishing to ensure it appears as expected
11. **Audience Targeting**: Use audience targeting to deliver relevant content to specific user groups

## Future Enhancements

- Add support for more content types (e.g., courses, modules)
- Implement content versioning
- Add support for content templates
- Enhance the rich text editor with more formatting options
- Implement content workflow for review and approval
- Add support for content scheduling with more granular control
