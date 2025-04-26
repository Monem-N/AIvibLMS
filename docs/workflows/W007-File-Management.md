# Workflow Documentation: File Management

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | File Management |
| **Workflow ID** | W007 |
| **User Role(s)** | Administrator, Instructor |
| **Priority** | Medium |
| **Status in Legacy System** | Partially Implemented |

## Workflow Description

The File Management workflow enables administrators and instructors to upload, organize, manage, and use files within the Hypatia LMS. Files can include images, documents, videos, and other media that are used throughout the platform. This workflow is essential for content creation, course materials, and providing resources to students.

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│  Access File    │────▶│  Upload File    │────▶│ View File List  │────▶│ Edit File       │
│  Management     │     │                 │     │                 │     │ Metadata        │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        │
                                                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│ Use File in     │◀────│ Select File     │◀────│ Preview File    │◀────│ Delete File     │
│ Content         │     │                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Detailed Steps

### 1. Access File Management

**Description**: User accesses the file management interface.

**User Actions**:
- Log in to the LMS
- Navigate to the Admin section
- Select "Files" from the admin menu

**System Actions**:
- Authenticate the user and verify permissions
- Load the file management interface
- Retrieve the list of files from the database
- Display the file management tools

**UI Components**:
- Login form
- Admin navigation menu
- File management interface

**Data Involved**:
- User authentication data
- User permission data
- File metadata

**Conditions and Rules**:
- User must have administrator or instructor role
- Instructors may have limited file management permissions
- System may enforce storage quotas

### 2. Upload File

**Description**: User uploads a new file to the system.

**User Actions**:
- Click on file upload button or drag-and-drop area
- Select a file from their local device
- Optionally, provide metadata (title, description)
- Confirm the upload

**System Actions**:
- Validate the file (type, size, security checks)
- Upload the file to Firebase Storage
- Show upload progress
- Create metadata record in the database
- Generate preview if applicable
- Confirm successful upload

**UI Components**:
- File upload button
- Drag-and-drop area
- File input field
- Upload progress indicator
- Metadata input fields
- Confirmation message

**Data Involved**:
- File binary data
- File metadata (name, type, size)
- Upload progress data
- Storage location information

**Conditions and Rules**:
- File size may be limited
- Certain file types may be restricted
- Duplicate filenames may be handled by renaming
- Upload may be canceled or paused
- Large files may require special handling

### 3. View File List

**Description**: User views the list of uploaded files.

**User Actions**:
- Browse the file list
- Sort or filter files by various criteria
- Search for specific files
- Select a file for further actions

**System Actions**:
- Retrieve file metadata from the database
- Apply any sorting, filtering, or search criteria
- Display file list with previews and metadata
- Provide options for file management

**UI Components**:
- File list/grid view
- Sort and filter controls
- Search input
- File preview thumbnails
- File metadata display
- Action buttons

**Data Involved**:
- File metadata collection
- File preview data
- Search and filter criteria

**Conditions and Rules**:
- Files may be organized by type, date, or other criteria
- Preview generation may depend on file type
- Large collections may require pagination
- Instructors may only see their own files

### 4. Edit File Metadata

**Description**: User edits the metadata for a file.

**User Actions**:
- Select a file from the list
- View current metadata
- Edit metadata fields (title, description, tags)
- Save changes

**System Actions**:
- Load the complete metadata for the selected file
- Display metadata editing interface
- Validate metadata changes
- Save updated metadata to the database
- Confirm successful update

**UI Components**:
- File selection interface
- Metadata editing form
- Save button
- Confirmation message

**Data Involved**:
- File metadata
- User input for metadata fields

**Conditions and Rules**:
- Certain metadata fields may be required
- Some metadata may be system-generated and not editable
- Changes may need to be propagated to references

### 5. Preview File

**Description**: User previews a file to verify its content.

**User Actions**:
- Select a file from the list
- View the file preview
- Interact with the preview (if applicable)

**System Actions**:
- Determine appropriate preview method based on file type
- Load file content or generate preview
- Display the preview in the appropriate format
- Provide preview controls if applicable

**UI Components**:
- File preview container
- Preview controls (zoom, play/pause, etc.)
- Preview information display

**Data Involved**:
- File content
- File metadata
- Preview configuration

**Conditions and Rules**:
- Preview capabilities depend on file type
- Large files may have limited preview
- Some file types may not support preview
- Preview may require specific browser capabilities

### 6. Delete File

**Description**: User deletes a file from the system.

**User Actions**:
- Select a file from the list
- Click delete button
- Confirm deletion

**System Actions**:
- Check if file is in use by any content
- Display warning if file is in use
- Delete file from storage
- Remove metadata from database
- Confirm successful deletion

**UI Components**:
- Delete button
- Confirmation dialog
- Warning message (if file is in use)
- Success message

**Data Involved**:
- File metadata
- File usage information
- Deletion confirmation

**Conditions and Rules**:
- System may prevent deletion of files in use
- Deletion may be permanent or moved to trash
- Deletion may require higher permissions
- System may track deletion for audit purposes

### 7. Select File

**Description**: User selects a file to use in content.

**User Actions**:
- Navigate to content creation/editing interface
- Access file selection tool
- Browse available files
- Select desired file
- Confirm selection

**System Actions**:
- Load file selection interface
- Retrieve available files
- Display file list with previews
- Apply selection to content
- Copy file URL to clipboard (if applicable)

**UI Components**:
- File selection dialog
- File list/grid view
- Search and filter controls
- Preview thumbnails
- Selection confirmation

**Data Involved**:
- File metadata
- Content association data
- Selection criteria

**Conditions and Rules**:
- File selection may be filtered by type
- Recently used files may be highlighted
- Selection may be limited by content context
- Multiple files may be selectable

### 8. Use File in Content

**Description**: User incorporates a selected file into content.

**User Actions**:
- Position cursor where file should be inserted
- Insert file reference or embed
- Adjust file display properties if needed
- Save content with file reference

**System Actions**:
- Insert file reference in appropriate format
- Update content with file information
- Create association between content and file
- Preview file in content context

**UI Components**:
- Content editor
- File embedding controls
- File display options
- Content preview

**Data Involved**:
- File reference data
- Content data
- Display configuration

**Conditions and Rules**:
- File embedding may depend on file type
- Different content areas may support different file types
- System may track file usage for reference integrity
- File display may be configurable (size, alignment, etc.)

## Alternative Flows

### Bulk Upload Flow

For uploading multiple files at once:

1. User selects multiple files for upload
2. System processes files in batch
3. Progress is shown for the entire batch
4. Metadata can be edited for each file after upload
5. System confirms when all files are uploaded

### File Replacement Flow

For replacing an existing file with a new version:

1. User selects a file to replace
2. User uploads new version of the file
3. System maintains the same file ID and references
4. System updates the file content and relevant metadata
5. All content using the file automatically uses the new version

### File Organization Flow

For organizing files into folders or categories:

1. User creates or selects a folder/category
2. User moves files into the folder/category
3. System updates file metadata with organization information
4. Files are displayed within their organizational structure
5. User can navigate the organizational hierarchy

## Integration Points

### Integration with Content Management

- Files are used as resources in content
- Featured images are selected from uploaded files
- Content editor can embed files
- File references are maintained when content is edited

### Integration with Course Management

- Course materials include uploaded files
- Course featured images are selected from files
- Course resources are organized using the file system

### Integration with Assessment System

- Assessment materials can include file resources
- File uploads can be used for assignment submissions
- Feedback can include file attachments

### Integration with User Profiles

- Profile pictures are managed through the file system
- User-specific files can be stored and managed

## Current Implementation Status

The File Management workflow in the legacy Hypatia LMS is partially implemented:

1. **Basic Upload**: Users can upload files through the admin interface.
2. **File Storage**: Files are stored in Firebase Storage.
3. **Metadata Storage**: Basic file metadata is stored in Firebase Realtime Database.
4. **File Preview**: Basic preview functionality exists for images, videos, and other file types.
5. **File Selection**: Files can be selected as featured images for content.
6. **File Deletion**: Files can be deleted from the system.

However, the implementation has several limitations:

1. **Limited Organization**: No folder structure or categorization.
2. **Basic Metadata**: Limited metadata fields and no tagging.
3. **No Reference Tracking**: No tracking of where files are used.
4. **jQuery Dependency**: Heavy reliance on jQuery for UI interactions.
5. **Limited Preview**: Basic preview capabilities for some file types.
6. **No Versioning**: No support for file versions.
7. **Limited Search**: Basic search functionality.

## Code References from Legacy System

### File Upload Implementation

```javascript
// From src/app/core/admin/admin.jsx
uploadFile(file) {
  this.uploadTask = this.storageRef.child(`files/${file.name}`).put(file);
  $('.file-input').hide();
  $('.file-upload-wrapper').show();

  this.uploadTask.on(this.props.firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    $('.file-progress').attr('value', progress);

    switch (snapshot.state) {
      case this.props.firebase.storage.TaskState.PAUSED:
        this.uploadStatus = 'paused';
        break;
      case this.props.firebase.storage.TaskState.RUNNING:
        this.uploadStatus = 'uploading';
        break;
      default:
    }
  }, (error) => {
    $('.file-input').show();
    $('.file-upload-wrapper').hide();
    this.toggleButtons(true);
    this.uploadStatus = '';

    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;
      case 'storage/unknown':
        break;
      default:
    }
  }, () => {
    $('.file-input').show();
    $('.file-upload-wrapper').hide();
    this.tempFile = null;
    this.uploadStatus = '';

    this.updateItem(this.uploadTask.snapshot.metadata.contentType, 'type');
    this.updateItem(this.uploadTask.snapshot.downloadURL, 'url', () => {
      this.save();
    });
  });
}
```

### File Metadata Handling

```javascript
// From src/app/core/admin/admin.jsx
loadItem(id, action, type) {
  if (id !== '') {
    const selectedItem = this.props[type][id];

    this.setState({
      action,
      type,
      selectedId: id,
      selectedItem
    }, () => {
      if (type !== 'users') {
        history.push(`/admin/${type}/edit/${selectedItem.slug}`);
      } else {
        history.push(`/admin/${type}/edit/${id}`);
      }

      if (type === 'files') {
        // Load file meta data
        const fileRef = this.storageRef.child(`files/${this.state.selectedItem.file}`);
        fileRef.getMetadata().then((metadata) => {
          this.setState({ fileMetadata: metadata });
        }).catch((error) => {
          this.props.setNotification({ message: error, type: 'error' });
        });
      }
    });
  }
}
```

### File Selection for Content

```javascript
// From src/app/core/admin/admin.jsx
fileSelected(select) {
  const key = (select.selectedIndex >= 0)
    ? select.options[select.selectedIndex].value
    : '';
  if (key) {
    Helpers.copyTextToClipboard(this.props.files[key].url);
    if (this.props.files[key].type.indexOf('image') !== -1) {
      $(this.refs['btn-featured-image']).removeClass('disabled');
      this.selectedImage = key;
    } else {
      $(this.refs['btn-featured-image']).addClass('disabled');
      this.selectedImage = null;
    }
  } else {
    $(this.refs['btn-featured-image']).addClass('disabled');
    this.selectedImage = null;
  }
}
```

### File Preview

```javascript
// From src/app/core/admin/admin.jsx
render() {
  // ...
  
  // File preview based on content type
  const fileContentType = (this.state.selectedItem && this.state.selectedItem.type) ? this.state.selectedItem.type : '';
  
  return (
    // ...
    <div className="file-preview-wrapper">
      {(fileContentType.indexOf('image') !== -1)
        ? <img alt="" className="file-preview" src={this.state.selectedItem.url} /> : null}
      {(fileContentType.indexOf('video') !== -1)
        ? <video className="file-preview" src={this.state.selectedItem.url} controls />
        : <object className="file-preview" data={this.state.selectedItem.url} width="50%" height="80%" type={fileContentType} />}
    </div>
    // ...
  );
}
```

### File Deletion

```javascript
// From src/app/core/admin/admin.jsx
delete() {
  this.setState({
    modalTitle: `${CONSTANTS.CONFIRM_DELETE} "${this.state.selectedItem.title}"?`
  }, () => {
    $('.js-modal-box-wrapper').show().animateCss('fade-in');
  });
}

modalBoxAnswer(answer) {
  if (answer === 'accept') {
    this.toggleButtons(false);

    // Delete the file first (if there's any)
    if (this.state.selectedItem.file) {
      const desertRef = this.storageRef.child(`files/${this.state.selectedItem.file}`);

      desertRef.delete().then(() => {
        this.props.firebase.remove(`${this.state.type}/${this.state.selectedId}`, () => {
          this.toggleButtons(true);
          this.cancel();
          this.props.setNotification({ message: CONSTANTS.ITEM_REMOVED, type: 'success' });
        });
      }).catch((error) => {
        this.props.setNotification({ message: error, type: 'error' });
      });
    } else {
      this.props.firebase.remove(`${this.state.type}/${this.state.selectedId}`, () => {
        this.toggleButtons(true);
        this.cancel();
        this.props.setNotification({ message: CONSTANTS.ITEM_REMOVED, type: 'success' });
      });
    }
  }
}
```

## Modern Implementation Approach

The modern implementation of the File Management workflow will leverage React, TypeScript, and Firebase Storage/Firestore to create a comprehensive file management system.

### Key Components

1. **FileService**: Service for file operations and metadata management
2. **FileUploader**: Component for uploading files with drag-and-drop support
3. **FileList**: Component for displaying and managing files
4. **FilePreview**: Component for previewing different file types
5. **FileSelector**: Component for selecting files to use in content
6. **FileOrganizer**: Component for organizing files into folders/categories
7. **FileSearch**: Component for searching and filtering files

### Data Model

```typescript
// File model
interface File {
  id: string;
  name: string;
  originalName: string;
  type: string;
  size: number;
  url: string;
  storagePath: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  folderId?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Folder model
interface Folder {
  id: string;
  name: string;
  parentId?: string;
  path: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// File usage model
interface FileUsage {
  fileId: string;
  entityId: string;
  entityType: 'course' | 'subject' | 'module' | 'activity' | 'content' | 'user';
  usageType: 'featuredImage' | 'embed' | 'attachment' | 'profilePicture';
  createdAt: Date;
}
```

### Service Layer

```typescript
// File service
export class FileService {
  private storage = getStorage();
  private db = getFirestore();
  
  // Upload methods
  async uploadFile(file: File, folderId?: string, metadata?: Record<string, any>): Promise<File>;
  async uploadMultipleFiles(files: File[], folderId?: string): Promise<File[]>;
  async replaceFile(fileId: string, newFile: File): Promise<File>;
  
  // Retrieval methods
  async getFile(fileId: string): Promise<File>;
  async getFiles(options?: { folderId?: string, type?: string, tags?: string[], search?: string }): Promise<File[]>;
  async getFileUsages(fileId: string): Promise<FileUsage[]>;
  
  // Management methods
  async updateFileMetadata(fileId: string, metadata: Partial<File>): Promise<void>;
  async moveFile(fileId: string, newFolderId: string): Promise<void>;
  async deleteFile(fileId: string, force?: boolean): Promise<void>;
  
  // Folder methods
  async createFolder(name: string, parentId?: string): Promise<Folder>;
  async getFolders(): Promise<Folder[]>;
  async updateFolder(folderId: string, data: Partial<Folder>): Promise<void>;
  async deleteFolder(folderId: string): Promise<void>;
  
  // Helper methods
  async generateThumbnail(file: File): Promise<string>;
  async trackFileUsage(fileId: string, entityId: string, entityType: string, usageType: string): Promise<void>;
}
```

### UI Implementation

```typescript
// File uploader component
export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onUploadComplete,
  folderId,
  multiple = false
}) => {
  // Component implementation
};

// File list component
export const FileList: React.FC<FileListProps> = ({ 
  files,
  onSelect,
  onDelete,
  onEdit
}) => {
  // Component implementation
};

// File preview component
export const FilePreview: React.FC<FilePreviewProps> = ({ 
  file
}) => {
  // Component implementation
};

// File selector component
export const FileSelector: React.FC<FileSelectorProps> = ({ 
  onSelect,
  filter,
  multiple = false
}) => {
  // Component implementation
};

// File organizer component
export const FileOrganizer: React.FC<FileOrganizerProps> = ({ 
  folders,
  onCreateFolder,
  onMoveFile
}) => {
  // Component implementation
};
```

## Recommendations for Implementation

1. **Service Abstraction**: Create a comprehensive file service that abstracts all interactions with Firebase Storage and Firestore.

2. **Folder Structure**: Implement a folder structure for better organization of files.

3. **Tagging System**: Add support for tagging files to improve searchability.

4. **Reference Tracking**: Implement tracking of file usage to prevent orphaned files and maintain reference integrity.

5. **Bulk Operations**: Support bulk upload, delete, and move operations for efficiency.

6. **Drag-and-Drop**: Implement drag-and-drop for file upload and organization.

7. **Thumbnails**: Generate and store thumbnails for quick previews.

8. **Advanced Preview**: Enhance preview capabilities for various file types, including documents and audio.

9. **Version Control**: Add basic versioning for important files.

10. **Access Control**: Implement fine-grained access control based on user roles and ownership.

11. **Quota Management**: Add storage quota management to prevent abuse.

12. **Metadata Extraction**: Automatically extract and store metadata from uploaded files.

13. **Search Optimization**: Implement full-text search for file content where possible.

14. **Mobile Support**: Ensure the file management interface works well on mobile devices.

15. **Offline Support**: Add basic offline support for recently accessed files.
