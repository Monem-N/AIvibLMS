# Feature Documentation: File Management

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | File Management |
| **Feature ID** | F005 |
| **Category** | Content Management |
| **Priority** | High |
| **Status in Legacy System** | Fully Implemented |

## Functional Description

The File Management feature allows administrators and instructors to upload, organize, and manage files within the Hypatia LMS. Files can include images, documents, videos, and other media that are used throughout the platform. The system uses Firebase Storage for file storage and maintains metadata about files in the Firebase Realtime Database. Files can be linked to various content types such as courses, subjects, modules, and activities.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can upload, view, edit, and delete all files; can manage file organization |
| Instructor | Can upload files for their own content; can view and use existing files |
| Student | Can view files associated with their enrolled courses; cannot upload or manage files |
| Anonymous User | Cannot access file management; can only view public files embedded in content |

## User Workflows

### File Upload

1. User navigates to the Admin section and selects "Files"
2. User clicks on the file input or drag-and-drops a file
3. System uploads the file to Firebase Storage
4. System creates a metadata record in the Firebase Realtime Database
5. System displays the file in the file list with preview and metadata

### File Management

1. User navigates to the Admin section and selects "Files"
2. User can view all uploaded files with previews and metadata
3. User can search or filter files by name, type, or other attributes
4. User can edit file metadata (title, description)
5. User can delete files that are no longer needed

### File Usage

1. When creating or editing content, user can select from existing files
2. User can choose a file as a featured image for content
3. User can embed files in content using Markdown syntax
4. System displays the file appropriately based on its type (image, video, document)

## UI Components

- **File Uploader**: Component for uploading files with drag-and-drop support
- **File List**: Grid or list view of uploaded files with previews
- **File Preview**: Component for previewing files based on their type
- **File Metadata Editor**: Form for editing file metadata
- **File Selector**: Component for selecting files to associate with content
- **File Embed**: Component for embedding files in content

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| File | title, file (filename), type (MIME type), url (download URL), status | Referenced by content entities |
| FileMetadata | contentType, size, timeCreated, updated, fullPath | Associated with File |
| Course | featuredImage | References File |
| Subject | featuredImage | References File |
| Module | featuredImage | References File |
| Activity | featuredImage | References File |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/files` | GET | Retrieve all files |
| `/files` | PUSH | Create a new file record |
| `/files/${id}` | GET | Retrieve a specific file record |
| `/files/${id}` | SET | Update a specific file record |
| `/files/${id}` | DELETE | Delete a file record |
| Firebase Storage | PUT | Upload a file |
| Firebase Storage | GET | Download a file |
| Firebase Storage | DELETE | Delete a file |

## Dependencies

- Firebase Storage for file storage
- Firebase Realtime Database for file metadata
- Firebase Authentication for access control
- jQuery for UI interactions
- Redux for state management

## Testing Considerations

- Test file upload with various file types and sizes
- Test file preview for different file types
- Test file deletion and reference integrity
- Test file selection and association with content
- Test file embedding in content
- Test file access control based on user roles
- Test performance with large numbers of files
- Test error handling for upload failures

## Migration Notes

### Current Implementation Issues

1. **Limited File Organization**: No folder structure or tagging system
2. **Basic Metadata**: Limited metadata for files
3. **Manual Reference Management**: No automatic tracking of file usage
4. **jQuery Dependency**: Uses jQuery for UI interactions
5. **Limited Search Capabilities**: Basic search functionality
6. **No Version Control**: No versioning for files
7. **Limited Preview Options**: Basic preview capabilities
8. **Direct Firebase Integration**: Direct calls to Firebase Storage

### Migration Recommendations

1. **Enhanced File Organization**: Implement folders, tags, and categories
2. **Rich Metadata**: Add more comprehensive metadata including tags, descriptions, and custom attributes
3. **Reference Tracking**: Automatically track where files are used
4. **Modern UI Components**: Replace jQuery with React components
5. **Advanced Search**: Implement full-text search and filtering
6. **Version Control**: Add versioning for files
7. **Enhanced Previews**: Improve preview capabilities for various file types
8. **Service Layer Abstraction**: Create a service layer to abstract Firebase Storage interactions

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

### File Deletion

```javascript
// From src/app/core/admin/admin.jsx
modalBoxAnswer(answer) {
  if (answer === 'yes') {
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

## Modern Implementation Approach

### File Service

```typescript
// Example of a modern implementation approach
export class FileService {
  private storage = getStorage();
  private db = getFirestore();
  
  async uploadFile(file: File, path: string = 'files', metadata?: any): Promise<FileData> {
    try {
      // Create a unique filename to prevent collisions
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${path}/${fileName}`;
      const storageRef = ref(this.storage, filePath);
      
      // Upload the file with metadata
      const uploadResult = await uploadBytes(storageRef, file, {
        customMetadata: metadata
      });
      
      // Get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      // Create file data object
      const fileData: FileData = {
        name: file.name,
        storagePath: filePath,
        type: file.type,
        size: file.size,
        url: downloadURL,
        metadata: {
          ...metadata,
          contentType: file.type,
          timeCreated: new Date().toISOString(),
          updated: new Date().toISOString()
        },
        tags: [],
        createdAt: serverTimestamp()
      };
      
      // Save file metadata to Firestore
      const fileRef = collection(this.db, 'files');
      const docRef = await addDoc(fileRef, fileData);
      
      return {
        ...fileData,
        id: docRef.id
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getFiles(options?: { limit?: number, orderBy?: string, tags?: string[] }): Promise<FileData[]> {
    try {
      let filesQuery = collection(this.db, 'files');
      
      // Apply query options
      if (options) {
        if (options.tags && options.tags.length > 0) {
          filesQuery = query(filesQuery, where('tags', 'array-contains-any', options.tags));
        }
        
        if (options.orderBy) {
          filesQuery = query(filesQuery, orderBy(options.orderBy, 'desc'));
        }
        
        if (options.limit) {
          filesQuery = query(filesQuery, limit(options.limit));
        }
      }
      
      const querySnapshot = await getDocs(filesQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FileData));
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async deleteFile(fileId: string): Promise<void> {
    try {
      // Get file data
      const fileDoc = await getDoc(doc(this.db, 'files', fileId));
      
      if (!fileDoc.exists()) {
        throw new Error('File not found');
      }
      
      const fileData = fileDoc.data() as FileData;
      
      // Delete from storage
      const storageRef = ref(this.storage, fileData.storagePath);
      await deleteObject(storageRef);
      
      // Delete from Firestore
      await deleteDoc(doc(this.db, 'files', fileId));
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateFileMetadata(fileId: string, metadata: Partial<FileData>): Promise<void> {
    try {
      await updateDoc(doc(this.db, 'files', fileId), {
        ...metadata,
        'metadata.updated': new Date().toISOString(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  private handleError(error: any): Error {
    console.error('File service error:', error);
    return new Error(`File operation failed: ${error.message}`);
  }
}
```

## Additional Notes

- The file management feature is used extensively throughout the platform
- Files are primarily used as featured images for content and embedded in content
- The current implementation has limited organization capabilities
- There is no automatic cleanup of unused files
- File previews are basic and depend on browser capabilities
- The modern implementation should provide better organization, search, and preview capabilities
