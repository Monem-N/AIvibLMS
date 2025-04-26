# User Workflow: Content Authoring

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | Content Authoring |
| **Workflow ID** | W003 |
| **User Role(s)** | Administrator, Instructor |
| **Related Features** | Content Management (F002), File Management (F005) |
| **Frequency** | High (regular content creation and updates) |
| **Criticality** | Critical |

## Workflow Overview

This workflow describes the process of creating, editing, and publishing educational content within the Hypatia LMS. It includes authoring content for various content types (courses, subjects, modules, activities), formatting content using Markdown, embedding media, and managing content relationships. The workflow is essential for building the educational materials that students will interact with.

## Preconditions

- User is authenticated and has appropriate permissions (administrator or instructor)
- Content structure (courses, subjects, modules) exists or user has permission to create it
- Any referenced files or media have been uploaded to the system

## Workflow Steps

### Content Creation Flow

#### Step 1: Navigate to Admin Section

**Actor**: Administrator or Instructor

**Action**: User logs in and navigates to the Admin section of the platform.

**System Response**: System displays the Admin dashboard with options for managing different content types.

**UI Components**: Admin navigation, Content type selector

**Alternative Flows**: 
- If user doesn't have admin access, they cannot access this section
- Instructors may have limited access to only their assigned courses

#### Step 2: Select Content Type

**Actor**: Administrator or Instructor

**Action**: User selects the type of content to create (course, subject, module, or activity).

**System Response**: System displays a list of existing content of the selected type with a "New" button.

**UI Components**: Content type tabs, Content list, New button

**Alternative Flows**: None

#### Step 3: Create New Content Item

**Actor**: Administrator or Instructor

**Action**: User clicks the "New" button to create a new content item.

**System Response**: System displays the content creation form with appropriate fields for the selected content type.

**UI Components**: Content creation form with fields specific to the content type

**Alternative Flows**: None

#### Step 4: Enter Basic Metadata

**Actor**: Administrator or Instructor

**Action**: User enters basic metadata for the content item:
- Title (required)
- Code (optional)
- Status (active, inactive, draft)
- Relationships to other content (e.g., selecting a subject for a module)
- Featured image (optional)
- Dates (if applicable)

**System Response**: System validates the input as the user enters information.

**UI Components**: Metadata form fields, Validation messages, Image selector

**Alternative Flows**: 
- If validation fails, system displays error messages
- User can cancel creation and return to the content list

#### Step 5: Author Primary Content

**Actor**: Administrator or Instructor

**Action**: User clicks on the "Primary content block" section and uses the Markdown editor to create the main content. User can:
- Write and format text using Markdown syntax
- Create headings, lists, and tables
- Add links to external resources
- Embed images and other media

**System Response**: System displays the Markdown editor with a preview of the formatted content.

**UI Components**: SimpleMDE Markdown editor, Content preview

**Alternative Flows**: None

#### Step 6: Author Secondary Content (Optional)

**Actor**: Administrator or Instructor

**Action**: User clicks on the "Secondary content block" section and uses the Markdown editor to create additional content.

**System Response**: System displays another Markdown editor for the secondary content.

**UI Components**: SimpleMDE Markdown editor, Content preview

**Alternative Flows**: 
- User can skip this step if secondary content is not needed

#### Step 7: Add Requirements or Notes (Optional)

**Actor**: Administrator or Instructor

**Action**: User clicks on the "Requirements" or "Private notes" sections to add additional information.

**System Response**: System displays additional Markdown editors for these sections.

**UI Components**: SimpleMDE Markdown editor for requirements and notes

**Alternative Flows**: 
- User can skip this step if these sections are not needed

#### Step 8: Save Content

**Actor**: Administrator or Instructor

**Action**: User clicks the "Save" button to save the content.

**System Response**: 
1. System validates all required fields
2. System saves the content to the database
3. System generates a slug based on the title (if not already provided)
4. System displays a success message
5. System redirects to the edit view of the newly created content

**UI Components**: Save button, Loading indicator, Success notification

**Alternative Flows**:
- If validation fails, system displays error messages and prevents saving
- If saving fails, system displays an error message

### Content Editing Flow

#### Step 1: Navigate to Content

**Actor**: Administrator or Instructor

**Action**: User navigates to the Admin section and selects the content type, then finds and selects the content item to edit.

**System Response**: System loads the content item and displays it in the edit form.

**UI Components**: Content type selector, Content list, Search/filter controls

**Alternative Flows**: 
- User can also access edit functionality from the frontend by clicking an "Edit" link (if they have appropriate permissions)

#### Step 2: Modify Content

**Actor**: Administrator or Instructor

**Action**: User modifies the content's metadata, primary content, secondary content, or other fields as needed.

**System Response**: System updates the form with the user's changes.

**UI Components**: Content edit form, Markdown editors

**Alternative Flows**: None

#### Step 3: Save Changes

**Actor**: Administrator or Instructor

**Action**: User clicks the "Save" button to save the changes.

**System Response**: 
1. System validates all required fields
2. System saves the updated content to the database
3. System displays a success message

**UI Components**: Save button, Loading indicator, Success notification

**Alternative Flows**:
- If validation fails, system displays error messages and prevents saving
- If saving fails, system displays an error message

### File Embedding Flow

#### Step 1: Upload File (If Needed)

**Actor**: Administrator or Instructor

**Action**: If the file is not already uploaded, user navigates to the Files section in Admin and uploads the file.

**System Response**: System uploads the file to Firebase Storage and creates a metadata record.

**UI Components**: File upload form, File list

**Alternative Flows**: 
- If file upload fails, system displays an error message

#### Step 2: Copy File URL

**Actor**: Administrator or Instructor

**Action**: User finds the uploaded file in the Files section and copies its URL.

**System Response**: System displays the file details including the URL.

**UI Components**: File details view, URL field

**Alternative Flows**: None

#### Step 3: Embed File in Content

**Actor**: Administrator or Instructor

**Action**: User returns to the content editor and embeds the file using Markdown syntax:
- For images: `![Alt text](file_url)`
- For links: `[Link text](file_url)`
- For videos or other media: Custom Markdown or HTML as needed

**System Response**: System updates the content preview to show the embedded file.

**UI Components**: Markdown editor, Content preview

**Alternative Flows**: None

### Content Publishing Flow

#### Step 1: Review Content

**Actor**: Administrator or Instructor

**Action**: User reviews the content to ensure it's ready for publication.

**System Response**: System displays the content in edit mode for review.

**UI Components**: Content edit form, Preview option

**Alternative Flows**: 
- User can make additional edits if needed

#### Step 2: Set Status to Active

**Actor**: Administrator or Instructor

**Action**: User sets the content status to "active" using the status checkbox.

**System Response**: System updates the status field.

**UI Components**: Status checkbox

**Alternative Flows**: None

#### Step 3: Save and Publish

**Actor**: Administrator or Instructor

**Action**: User clicks the "Save" button to publish the content.

**System Response**: 
1. System saves the content with "active" status
2. System displays a success message
3. The content is now visible to appropriate users in the frontend

**UI Components**: Save button, Success notification

**Alternative Flows**:
- If saving fails, system displays an error message

## Postconditions

- New or updated content is saved in the database
- Content is accessible based on its status and relationships
- Content appears in the appropriate location in the content hierarchy
- If published (status = active), content is visible to students in the frontend

## Error Conditions and Recovery

| Error Condition | Recovery Path |
|-----------------|---------------|
| Missing required fields | System displays validation errors; user adds missing information |
| File upload failure | System displays error message; user retries upload or uses a different file |
| Save operation failure | System displays error message; user retries save operation |
| Markdown syntax errors | Content preview shows unexpected formatting; user corrects Markdown syntax |
| Permission issues | System prevents access; user contacts administrator for appropriate permissions |
| Network connectivity issues | System displays error message; user retries when connection is restored |

## Performance Expectations

- Content editor should load within 3 seconds
- Content saving should complete within 2 seconds
- File uploads should process at a reasonable speed based on file size
- Markdown preview should update in real-time as user types

## User Experience Considerations

- Clear indication of required fields
- Real-time validation of input
- Markdown syntax help or cheat sheet
- Autosave functionality to prevent data loss
- Mobile-friendly content editing (where possible)
- Accessible content creation for users with disabilities
- Clear feedback on successful operations

## Testing Scenarios

1. Create new content items of each type (course, subject, module, activity)
2. Edit existing content items
3. Upload and embed different file types (images, documents, videos)
4. Test Markdown formatting for various content structures
5. Test content relationships (linking modules to subjects, etc.)
6. Test content visibility based on status
7. Test content editing with very large content blocks
8. Test concurrent editing by multiple users
9. Test content creation and editing on different devices and browsers

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Navigate to    │     │  Select         │     │  Create New     │
│  Admin Section  │────▶│  Content Type   │────▶│  Content Item   │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Author         │     │  Author Primary │     │  Enter Basic    │
│  Secondary      │◀────│  Content        │◀────│  Metadata       │
│  Content        │     └─────────────────┘     └─────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Add            │     │  Save           │
│  Requirements   │────▶│  Content        │
│  or Notes       │     └─────────────────┘
└─────────────────┘


File Embedding Flow:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Upload File    │     │  Copy File      │     │  Embed File     │
│  (If Needed)    │────▶│  URL            │────▶│  in Content     │
└─────────────────┘     └─────────────────┘     └─────────────────┘


Content Publishing Flow:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Review         │     │  Set Status     │     │  Save and       │
│  Content        │────▶│  to Active      │────▶│  Publish        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Code References from Legacy System

### Content Editor Implementation

```javascript
// From src/app/core/admin/admin.jsx
<div
  className={classNames({
    hidden: (this.state.type === 'users' || this.state.type === 'files')
  })}
>
  <h4 className="heading active" ref="editor1-heading" onClick={() => ((this.toggleElement('editor1-heading'), this.toggleElement('editor1-wrapper')))}>Primary content block<Icon glyph={Forward} /></h4>
  <div className="editor-wrapper active" ref="editor1-wrapper">
    <SimpleMDE
      options={{
        spellChecker: false
      }} ref="editor1" value={(this.state.selectedItem && this.state.selectedItem.content1)
      ? this.state.selectedItem.content1
      : ''} onChange={event => this.updateItem(event, 'content1')}
    />
  </div>
</div>

<div
  className={classNames({
    hidden: (this.state.type === 'levels' || this.state.type === 'users' || this.state.type === 'posts' || this.state.type === 'files')
  })}
>
  <h4 className="heading" ref="editor2-heading" onClick={() => ((this.toggleElement('editor2-heading'), this.toggleElement('editor2-wrapper')))}>Secondary content block<Icon glyph={Forward} /></h4>
  <div className="editor-wrapper" ref="editor2-wrapper">
    <SimpleMDE
      options={{
        spellChecker: false
      }} ref="editor2" value={(this.state.selectedItem && this.state.selectedItem.content2)
        ? this.state.selectedItem.content2
        : ''} onChange={event => this.updateItem(event, 'content2')}
    />
  </div>
</div>
```

### Content Saving

```javascript
// From src/app/core/admin/admin.jsx
save() {
  if (this.props.userData.info.level === CONSTANTS.ADMIN_LEVEL) {
    const item = this.state.selectedItem;
    const method = (this.state.action === 'new')
      ? 'push'
      : 'set';
    const path = (this.state.action === 'new')
      ? this.state.type
      : `${this.state.type}/${this.state.selectedId}`;
    let uploadFile = false;

    if (item && (item.title || this.state.type === 'users')) {
      if (this.state.type !== 'files' && this.state.type !== 'users') {
        item.slug = Helpers.slugify(item.title);
      } else if (this.tempFile) {
        item.file = this.tempFile.name;
        uploadFile = true;
        this.uploadFile(this.tempFile);
      }

      // Handle dates and status

      this.toggleButtons(false);

      if (!uploadFile) {
        this.props.firebase[method](path, item).then((snap) => {
          this.toggleButtons(true);
          this.props.setNotification({ message: CONSTANTS.ITEM_SAVED, type: 'success' });

          if (snap) {
            this.setState({
              selectedId: snap.key
            }, () => {
              this.loadItem(snap.key, 'edit', this.state.type);
            });
          }
        });
      }
    } else {
      this.props.setNotification({ message: CONSTANTS.NEED_TITLE, type: 'error' });
    }
  } else {
    this.props.setNotification({ message: CONSTANTS.ADMIN_REQUIRED, type: 'error' });
  }
}
```

### Content Display in Frontend

```javascript
// From src/app/themes/nekomy/pages/module/module.jsx
<div
  className={classNames('columns', {
    'single-column': (!module.content2 && !module.content2)
  })}
>
  <div className="column page-content">
    {featuredImage
      ? <img alt="" className="featured-image" role="presentation" src={featuredImage.url} />
      : ''}
    <div
      className="content" dangerouslySetInnerHTML={{
        __html: CONSTANTS.converter.makeHtml(module.content1)
      }}
    />
  </div>
  {module.content2
    ? <div className="column page-sidebar">
      <div
        className="content" dangerouslySetInnerHTML={{
          __html: CONSTANTS.converter.makeHtml(module.content2)
        }}
      />
    </div>
    : ''}
  {module.content3
    ? <div className="column page-sidebar">
      <div
        className="content" dangerouslySetInnerHTML={{
          __html: CONSTANTS.converter.makeHtml(module.content3)
        }}
      />
    </div>
    : ''}
</div>
```

### Edit Link in Frontend

```javascript
// From src/app/core/common/lib/edit/edit.jsx
export default function Edit({ editLink, newLink }) {
  return (
    <div style={linksStyle}>
      <Icon glyph={EditIcon} style={iconStyle} />
      <Link to={editLink}>Edit</Link>
      <Icon glyph={NewIcon} style={iconStyle} />
      <Link to={newLink}>New</Link>
    </div>
  );
}
```

## Migration Notes

### Current Implementation Issues

1. **Basic Markdown Editor**: SimpleMDE provides basic Markdown editing but lacks advanced features
2. **Multiple Content Blocks**: Content is split into primary, secondary, and tertiary blocks without clear purpose
3. **jQuery Dependency**: Uses jQuery for DOM manipulation and UI interactions
4. **Direct Firebase Integration**: Components directly call Firebase methods
5. **Limited Media Embedding**: Basic support for embedding media in content
6. **No Collaborative Editing**: No support for multiple authors working on the same content
7. **Limited Content Preview**: Basic preview of Markdown content
8. **No Content Versioning**: No history of content changes
9. **Manual Relationship Management**: Relationships between content items must be manually established

### Migration Recommendations

1. **Enhanced Rich Text Editor**: Implement a more powerful editor with WYSIWYG capabilities and better Markdown support
2. **Unified Content Structure**: Simplify content structure with a single content field and better semantic organization
3. **Remove jQuery Dependency**: Use React state and effects for UI interactions
4. **Service Layer Abstraction**: Create a service layer to abstract Firebase interactions
5. **Improved Media Embedding**: Enhance media embedding with better preview and management
6. **Collaborative Editing**: Add support for collaborative editing with conflict resolution
7. **Live Preview**: Implement a live preview of content as it will appear to students
8. **Content Versioning**: Add version history for content changes
9. **Automatic Relationship Management**: Simplify relationship management between content items

## Modern Implementation Approach

### Content Editor Component

```typescript
// Example of a modern implementation approach
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Switch, 
  FormControlLabel, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Alert,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { MDXEditor } from '@mdxeditor/editor';
import { useContentService } from '../hooks/useContentService';
import { ContentData, ContentType } from '../types/content';
import { FileSelector } from './FileSelector';
import { RelationshipSelector } from './RelationshipSelector';
import { ContentPreview } from './ContentPreview';

interface ContentEditorProps {
  contentType: ContentType;
  isNew?: boolean;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({ contentType, isNew = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  
  const { 
    getContent, 
    createContent, 
    updateContent, 
    loading, 
    error 
  } = useContentService(contentType);
  
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContentData>();
  const contentWatch = watch('content');
  
  useEffect(() => {
    if (!isNew && id) {
      const loadContent = async () => {
        try {
          const content = await getContent(id);
          
          // Set form values
          Object.entries(content).forEach(([key, value]) => {
            setValue(key as any, value);
          });
        } catch (error) {
          console.error('Error loading content:', error);
        }
      };
      
      loadContent();
    }
  }, [isNew, id, getContent, setValue]);
  
  const onSubmit = async (data: ContentData) => {
    try {
      if (isNew) {
        const newId = await createContent(data);
        navigate(`/admin/${contentType}/${newId}`);
      } else if (id) {
        await updateContent(id, data);
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  if (loading && !isNew) {
    return <CircularProgress />;
  }
  
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">
          {isNew ? `New ${contentType.slice(0, -1)}` : `Edit ${contentType.slice(0, -1)}`}
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            sx={{ mr: 1 }} 
            onClick={() => navigate(`/admin/${contentType}`)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </Box>
      </Box>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Basic Information" />
          <Tab label="Content" />
          <Tab label="Relationships" />
          <Tab label="Advanced" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    margin="normal"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
              
              <Controller
                name="code"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Code"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              
              <Controller
                name="slug"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Slug"
                    fullWidth
                    margin="normal"
                    helperText="Leave empty to auto-generate from title"
                  />
                )}
              />
              
              <Controller
                name="status"
                control={control}
                defaultValue="draft"
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value === 'active'}
                        onChange={(e) => onChange(e.target.checked ? 'active' : 'draft')}
                      />
                    }
                    label={`Status: ${value === 'active' ? 'Active' : 'Draft'}`}
                  />
                )}
              />
              
              <Controller
                name="featuredImage"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <FileSelector
                    value={value}
                    onChange={onChange}
                    fileType="image"
                    label="Featured Image"
                  />
                )}
              />
            </Box>
          )}
          
          {activeTab === 1 && (
            <Box>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Content</Typography>
                <Button
                  variant="outlined"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? 'Edit' : 'Preview'}
                </Button>
              </Box>
              
              {previewMode ? (
                <ContentPreview content={contentWatch || ''} />
              ) : (
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  render={({ field: { value, onChange } }) => (
                    <MDXEditor
                      markdown={value}
                      onChange={onChange}
                      contentEditableClassName="content-editable"
                      style={{ height: '500px', border: '1px solid #ccc' }}
                    />
                  )}
                />
              )}
            </Box>
          )}
          
          {activeTab === 2 && (
            <Box>
              {contentType === 'subjects' && (
                <Controller
                  name="courseId"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Course is required' }}
                  render={({ field }) => (
                    <RelationshipSelector
                      {...field}
                      label="Course"
                      contentType="courses"
                      error={!!errors.courseId}
                      helperText={errors.courseId?.message}
                    />
                  )}
                />
              )}
              
              {contentType === 'modules' && (
                <Controller
                  name="subjectId"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Subject is required' }}
                  render={({ field }) => (
                    <RelationshipSelector
                      {...field}
                      label="Subject"
                      contentType="subjects"
                      error={!!errors.subjectId}
                      helperText={errors.subjectId?.message}
                    />
                  )}
                />
              )}
              
              {contentType === 'activities' && (
                <Controller
                  name="moduleId"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Module is required' }}
                  render={({ field }) => (
                    <RelationshipSelector
                      {...field}
                      label="Module"
                      contentType="modules"
                      error={!!errors.moduleId}
                      helperText={errors.moduleId?.message}
                    />
                  )}
                />
              )}
            </Box>
          )}
          
          {activeTab === 3 && (
            <Box>
              <Controller
                name="notes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Private Notes"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                )}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
```

## Additional Notes

- Content authoring is a core workflow for instructors and administrators
- The current implementation uses SimpleMDE for Markdown editing
- Content is organized hierarchically (courses > subjects > modules > activities)
- Each content type has similar fields but different relationships
- The modern implementation should provide a more intuitive and powerful content editing experience
- Consider implementing content templates to streamline the creation process
- Accessibility is important for content authors with disabilities
