# Feature Documentation: Content Management

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | Content Management |
| **Feature ID** | F002 |
| **Category** | Content Management |
| **Priority** | Critical |
| **Status in Legacy System** | Fully Implemented |

## Functional Description

The Content Management feature allows administrators and instructors to create, edit, organize, and publish educational content within the Hypatia LMS. Content is organized hierarchically (courses > subjects > modules > activities) and can include text, images, videos, and other media. The system uses Markdown for content formatting and Firebase Storage for file management.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can create, edit, and delete all content types; can manage file uploads; can publish/unpublish content |
| Instructor | Can create and edit content within assigned courses; can upload files for their content |
| Student | Can view published content; cannot create or edit content |
| Anonymous User | Can view public content only |

## User Workflows

### Content Creation

1. User navigates to the Admin section
2. User selects the content type to create (course, subject, module, activity)
3. User enters basic metadata (title, code, status)
4. User adds content using Markdown editor
5. User uploads and links media files if needed
6. User sets relationships to other content (e.g., linking a module to a subject)
7. User saves the content

### Content Editing

1. User navigates to the Admin section
2. User selects the content type and finds the item to edit
3. User modifies metadata, content, or relationships
4. User saves the changes

### File Management

1. User navigates to the Admin section and selects "Files"
2. User uploads a new file or selects an existing file
3. User can view file metadata and preview the file
4. User can delete files that are no longer needed
5. User can link files to content (e.g., as featured images)

## UI Components

- **Admin Interface**: Main interface for content management
- **Content Editor**: Markdown editor for content creation (SimpleMDE)
- **File Uploader**: Component for uploading and managing files
- **Content Selector**: Dropdown for selecting related content items
- **Content Preview**: Preview of how content will appear to users
- **Content List**: List of existing content items with filtering and sorting

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| Course | title, code, slug, content1, content2, content3, status, featuredImage, level, price, startDate, endDate | One-to-many with Subjects |
| Subject | title, code, slug, content1, content2, content3, status, featuredImage, course | One-to-many with Modules, Many-to-one with Course |
| Module | title, code, slug, content1, content2, content3, status, featuredImage, subject, authors | One-to-many with Activities, Many-to-one with Subject |
| Activity | title, slug, content1, content2, content3, status, featuredImage, module, startDate, endDate, gradeDate, authors | Many-to-one with Module |
| File | title, file, type, url, status | Referenced by content entities |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/courses` | GET | Retrieve all courses |
| `/courses` | PUSH | Create a new course |
| `/courses/${id}` | GET | Retrieve a specific course |
| `/courses/${id}` | SET | Update a specific course |
| `/subjects` | GET | Retrieve all subjects |
| `/subjects` | PUSH | Create a new subject |
| `/subjects/${id}` | GET | Retrieve a specific subject |
| `/subjects/${id}` | SET | Update a specific subject |
| `/modules` | GET | Retrieve all modules |
| `/modules` | PUSH | Create a new module |
| `/modules/${id}` | GET | Retrieve a specific module |
| `/modules/${id}` | SET | Update a specific module |
| `/activities` | GET | Retrieve all activities |
| `/activities` | PUSH | Create a new activity |
| `/activities/${id}` | GET | Retrieve a specific activity |
| `/activities/${id}` | SET | Update a specific activity |
| `/files` | GET | Retrieve all files |
| `/files` | PUSH | Create a new file record |
| `/files/${id}` | GET | Retrieve a specific file record |
| `/files/${id}` | SET | Update a specific file record |
| Firebase Storage | PUT | Upload a file |
| Firebase Storage | DELETE | Delete a file |

## Dependencies

- Firebase Realtime Database for content storage
- Firebase Storage for file storage
- SimpleMDE for Markdown editing
- Showdown for Markdown to HTML conversion
- jQuery for UI interactions
- Redux for state management

## Testing Considerations

- Test content creation with various content types and formats
- Test file uploads with different file types and sizes
- Test content relationships and navigation
- Test Markdown rendering in different contexts
- Test content visibility based on user roles
- Test content search and filtering
- Test performance with large content items and many files

## Migration Notes

### Current Implementation Issues

1. **Fragmented Content Management**: Content creation is split across different admin sections
2. **Limited Markdown Editor**: Basic editor without advanced features
3. **Manual Relationship Management**: Relationships between content items must be manually established
4. **jQuery Dependency**: Uses jQuery for UI interactions
5. **No Content Versioning**: No history of content changes
6. **Limited Content Organization**: Fixed hierarchy without flexible organization options
7. **Basic File Management**: Limited file organization and metadata
8. **Markdown Conversion**: Uses Showdown for client-side Markdown conversion

### Migration Recommendations

1. **Unified Content Management**: Create a unified interface for managing all content types
2. **Enhanced Rich Text Editor**: Implement a more powerful editor with WYSIWYG capabilities
3. **Automatic Relationship Management**: Simplify relationship management with better UI
4. **Remove jQuery Dependency**: Use React state and effects for UI interactions
5. **Add Content Versioning**: Implement version history for content changes
6. **Flexible Content Organization**: Allow more flexible content organization options
7. **Improved File Management**: Enhance file organization, tagging, and search
8. **Server-side Rendering**: Consider server-side Markdown rendering for better performance and SEO

## Code References from Legacy System

### Content Creation in Admin Panel

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
```

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
    // Handle error
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

### Content Display in Frontend

```javascript
// From src/app/themes/nekomy/pages/course/course.jsx
<div className="column page-content">
  {featuredImage
    ? <img alt="" className="featured-image" role="presentation" src={featuredImage.url} />
    : ''}
  <div
    className="content" dangerouslySetInnerHTML={{
      __html: CONSTANTS.converter.makeHtml(course.content1)
    }}
  />
</div>
{course.content2
  ? <div className="column page-sidebar">
    <div
      className="content" dangerouslySetInnerHTML={{
        __html: CONSTANTS.converter.makeHtml(course.content2)
      }}
    />
  </div>
  : ''}
{course.content3
  ? <div className="column page-sidebar">
    <div
      className="content" dangerouslySetInnerHTML={{
        __html: CONSTANTS.converter.makeHtml(course.content3)
      }}
    />
  </div>
  : ''}
```

## Modern Implementation Approach

### Content Service

```typescript
// Example of a modern implementation approach
export class ContentService {
  private db = getFirestore();
  private storage = getStorage();
  
  // Course methods
  async createCourse(courseData: CourseData): Promise<string> {
    try {
      const courseRef = collection(this.db, 'courses');
      const slug = this.generateSlug(courseData.title);
      
      const docRef = await addDoc(courseRef, {
        ...courseData,
        slug,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateCourse(courseId: string, courseData: Partial<CourseData>): Promise<void> {
    try {
      const courseRef = doc(this.db, 'courses', courseId);
      
      await updateDoc(courseRef, {
        ...courseData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // File methods
  async uploadFile(file: File, path: string = 'files'): Promise<FileData> {
    try {
      const storageRef = ref(this.storage, `${path}/${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      const fileData: FileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        url: downloadURL,
        path: `${path}/${file.name}`,
        createdAt: serverTimestamp()
      };
      
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
  
  // Helper methods
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  
  private handleError(error: any): Error {
    console.error('Content service error:', error);
    return new Error(`Content operation failed: ${error.message}`);
  }
}
```

## Additional Notes

- The content management feature is central to the LMS functionality
- The current implementation uses a simple content model with three content blocks per item
- Content is formatted using Markdown and converted to HTML for display
- Files are stored in Firebase Storage and referenced in content
- The content hierarchy (courses > subjects > modules > activities) is fixed
- There is no workflow for content review or approval
- Content versioning would be a valuable addition to the modern implementation
