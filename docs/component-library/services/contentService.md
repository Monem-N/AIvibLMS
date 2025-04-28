# contentService

## Description

The `contentService` is a service that provides methods for managing content like pages and announcements in the AIvibLMS system. It implements CRUD operations for different content types and integrates with Firebase Firestore for data storage and Supabase Storage for file uploads.

## Usage

```tsx
import { 
  getPages, 
  createPage, 
  updatePage, 
  deletePage,
  getAnnouncements,
  createAnnouncement,
  uploadContentImage
} from 'services/contentService';

// Get all pages
const pages = await getPages({ status: 'published' });

// Create a new page
const pageId = await createPage({
  title: 'Welcome to AIvibLMS',
  content: '# Welcome\n\nThis is the welcome page for AIvibLMS.',
  status: 'published',
  author: 'Admin',
  authorId: currentUser.uid
});

// Update a page
await updatePage(pageId, {
  title: 'Updated Title',
  content: 'Updated content'
});

// Delete a page
await deletePage(pageId);

// Upload a content image
const imageUrl = await uploadContentImage(file, 'page', pageId);
```

## API

### Page Management

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| getPages | options?: { status?: string, search?: string } | Promise<Page[]> | Gets all pages with optional filtering |
| getPage | id: string | Promise<Page> | Gets a specific page by ID |
| createPage | pageData: Partial<Page> | Promise<string> | Creates a new page and returns its ID |
| updatePage | id: string, pageData: Partial<Page> | Promise<void> | Updates an existing page |
| deletePage | id: string | Promise<void> | Deletes a page |

### Announcement Management

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| getAnnouncements | options?: { status?: string, search?: string } | Promise<Announcement[]> | Gets all announcements with optional filtering |
| getAnnouncement | id: string | Promise<Announcement> | Gets a specific announcement by ID |
| createAnnouncement | announcementData: Partial<Announcement> | Promise<string> | Creates a new announcement and returns its ID |
| updateAnnouncement | id: string, announcementData: Partial<Announcement> | Promise<void> | Updates an existing announcement |
| deleteAnnouncement | id: string | Promise<void> | Deletes an announcement |

### File Management

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| uploadContentImage | file: File, contentType: string, contentId?: string | Promise<string> | Uploads an image for content and returns the public URL |

## Data Models

### Page

```typescript
interface Page {
  id?: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  featuredImage?: string;
  author: string;
  authorId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  lastUpdated?: string; // Formatted date string for display
}
```

### Announcement

```typescript
interface Announcement {
  id?: string;
  title: string;
  content: string;
  status: 'active' | 'scheduled' | 'expired';
  publishDate: Timestamp | string;
  expiryDate: Timestamp | string;
  audience: string[];
  author: string;
  authorId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
```

## Examples

### Creating a Page

```typescript
import { createPage } from 'services/contentService';
import { useAuth } from 'hooks/useAuth';

const ContentCreator = () => {
  const { user } = useAuth();
  
  const handleCreatePage = async () => {
    try {
      const pageId = await createPage({
        title: 'Getting Started with AIvibLMS',
        content: '# Getting Started\n\nWelcome to AIvibLMS! This guide will help you get started with the platform.',
        status: 'published',
        author: user.displayName || 'Unknown User',
        authorId: user.uid
      });
      
      console.log('Page created with ID:', pageId);
    } catch (error) {
      console.error('Error creating page:', error);
    }
  };
  
  return (
    <button onClick={handleCreatePage}>Create Page</button>
  );
};
```

### Listing Pages with Filtering

```typescript
import { useState, useEffect } from 'react';
import { getPages, Page } from 'services/contentService';

const PageList = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const fetchedPages = await getPages({ 
          status: status !== 'all' ? status : undefined,
          search: search || undefined
        });
        setPages(fetchedPages);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPages();
  }, [status, search]);
  
  return (
    <div>
      <div className="filters">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pages..."
        />
      </div>
      
      {loading ? (
        <p>Loading pages...</p>
      ) : (
        <ul>
          {pages.map(page => (
            <li key={page.id}>
              <h3>{page.title}</h3>
              <p>Status: {page.status}</p>
              <p>Last Updated: {page.lastUpdated}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### Uploading and Using Content Images

```typescript
import { useState } from 'react';
import { uploadContentImage } from 'services/contentService';

const ImageUploader = ({ contentType, contentId, onUpload }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const imageUrl = await uploadContentImage(file, contentType, contentId);
      onUpload(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};
```

## Integration with Other Services

The `contentService` integrates with:

- **Firebase Firestore**: For storing and retrieving content data
- **Supabase Storage**: For storing and retrieving content images
- **Authentication Service**: For getting current user information

## Error Handling

All methods in the `contentService` include error handling and will throw errors with descriptive messages. It's recommended to wrap calls to these methods in try/catch blocks to handle errors appropriately.

## Performance Considerations

- The service uses Firestore queries with appropriate filters to minimize data transfer
- Client-side filtering is used for search functionality to provide a responsive user experience
- Consider implementing pagination for large content collections

## Security Considerations

- The service assumes that authentication and authorization are handled at the component level
- Firestore security rules should be configured to restrict access to content based on user roles
- Content validation should be performed both client-side and server-side

## Future Enhancements

- Content versioning for tracking changes
- Content scheduling for future publishing
- Content templates for faster creation
- Content analytics for tracking views and engagement
- Content workflow for review and approval processes
