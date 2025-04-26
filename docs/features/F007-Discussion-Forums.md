# Feature Documentation: Discussion Forums

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | Discussion Forums |
| **Feature ID** | F007 |
| **Category** | Communication |
| **Priority** | Medium |
| **Status in Legacy System** | Minimally Implemented |

## Functional Description

The Discussion Forums feature provides a platform for asynchronous communication and collaboration between students, instructors, and administrators within the Hypatia LMS. It enables users to create discussion topics, post messages, reply to others' messages, and engage in course-related conversations. The forums can be organized by course, subject, or topic, allowing for focused discussions that enhance the learning experience through peer interaction and instructor guidance.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can create, edit, and delete all forum categories and posts; can moderate discussions; can pin important topics |
| Instructor | Can create and manage forums for their courses; can moderate discussions in their courses; can create announcements |
| Student | Can view forums for enrolled courses; can create topics and reply to posts in those forums; can edit or delete their own posts |
| Anonymous User | Cannot access forums (view-only access to public forums could be considered) |

## User Workflows

### Forum Navigation

1. User navigates to the Forums section from the main navigation or course page
2. System displays available forum categories based on user's role and enrollments
3. User selects a forum category to view
4. System displays topics within the selected forum
5. User can browse topics, search for specific content, or filter by various criteria

### Topic Creation

1. User navigates to the appropriate forum
2. User clicks "New Topic" or similar button
3. System displays the topic creation form
4. User enters topic title, content, and optional attachments
5. User selects topic type (question, discussion, announcement, etc.)
6. User submits the form
7. System creates the new topic and displays it in the forum
8. System notifies relevant users about the new topic (optional)

### Post Reply

1. User navigates to a topic
2. User reads existing posts
3. User clicks "Reply" on the topic or on a specific post
4. System displays the reply form
5. User enters reply content and optional attachments
6. User submits the form
7. System adds the reply to the topic thread
8. System notifies relevant users about the new reply (optional)

### Forum Moderation

1. Administrator or instructor navigates to a forum or topic
2. User identifies content that requires moderation
3. User selects moderation action (edit, delete, pin, lock, etc.)
4. System applies the moderation action
5. System logs the moderation action for audit purposes

## UI Components

- **Forum List**: Displays available forum categories
- **Topic List**: Displays topics within a forum
- **Topic View**: Displays a topic and its replies
- **Post Editor**: Rich text editor for creating topics and replies
- **Search and Filter**: Tools for finding specific content
- **Moderation Tools**: Interface for moderating forum content
- **Notification Controls**: Options for managing forum notifications

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| ForumCategory | title, description, slug, courseId (optional), order | One-to-many with Forums |
| Forum | title, description, slug, categoryId, order | One-to-many with Topics, Many-to-one with ForumCategory |
| Topic | title, content, authorId, forumId, type, status, pinned, locked, createdAt, updatedAt, viewCount | Many-to-one with Forum, One-to-many with Posts |
| Post | content, authorId, topicId, parentId (for replies to posts), createdAt, updatedAt, editedAt | Many-to-one with Topic, Many-to-one with User (author) |
| Attachment | fileName, fileType, fileSize, fileUrl, postId | Many-to-one with Post |
| Subscription | userId, entityType (forum/topic), entityId, notificationType | Many-to-one with User |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/forumCategories` | GET | Retrieve all forum categories |
| `/forumCategories` | POST | Create a new forum category |
| `/forumCategories/${id}` | GET | Retrieve a specific forum category |
| `/forumCategories/${id}` | PUT | Update a specific forum category |
| `/forumCategories/${id}` | DELETE | Delete a specific forum category |
| `/forums` | GET | Retrieve all forums |
| `/forums` | POST | Create a new forum |
| `/forums/${id}` | GET | Retrieve a specific forum |
| `/forums/${id}` | PUT | Update a specific forum |
| `/forums/${id}` | DELETE | Delete a specific forum |
| `/topics` | GET | Retrieve all topics |
| `/topics` | POST | Create a new topic |
| `/topics/${id}` | GET | Retrieve a specific topic |
| `/topics/${id}` | PUT | Update a specific topic |
| `/topics/${id}` | DELETE | Delete a specific topic |
| `/topics/${id}/posts` | GET | Retrieve posts for a specific topic |
| `/posts` | POST | Create a new post |
| `/posts/${id}` | GET | Retrieve a specific post |
| `/posts/${id}` | PUT | Update a specific post |
| `/posts/${id}` | DELETE | Delete a specific post |
| `/users/${userId}/subscriptions` | GET | Retrieve user's forum subscriptions |
| `/search/forums` | GET | Search forum content |

## Dependencies

- Firebase Firestore for data storage
- Rich text editor for post creation
- File storage for attachments
- Notification system for alerts
- User authentication for access control
- Search functionality for content discovery

## Testing Considerations

- Test forum creation and management with various permission levels
- Test topic and post creation with different content types
- Test reply threading and conversation flow
- Test moderation actions (edit, delete, pin, lock)
- Test notification delivery for new posts
- Test search functionality with various queries
- Test performance with large numbers of posts
- Test mobile responsiveness of forum interfaces
- Test accessibility for users with disabilities
- Test file attachment upload and display

## Migration Notes

### Current Implementation Status

The discussion functionality in the legacy Hypatia LMS is minimally implemented, with the following components:

1. **Chat Integration**: There is a Slack integration for real-time chat, but no dedicated forum system
2. **Post Component**: There is a basic post component for displaying content, but it's not used for discussions
3. **Comments**: No dedicated commenting system exists
4. **Announcements**: Simple announcement display on the dashboard, but no interactive features

The current implementation has several limitations:

1. **No Dedicated Forums**: No structured forum system for course discussions
2. **Limited Asynchronous Communication**: Focus on real-time chat rather than persistent discussions
3. **No Topic Organization**: No way to organize discussions by topic or category
4. **No Moderation Tools**: No tools for moderating user-generated content
5. **No Search Functionality**: No way to search discussion content
6. **No Notification System**: No notifications for new posts or replies
7. **No Rich Text Support**: Limited formatting options for messages
8. **No File Attachments**: No support for attaching files to discussions

### Migration Recommendations

1. **Implement Forum Structure**: Create a hierarchical forum structure (categories, forums, topics, posts)
2. **Rich Text Editor**: Implement a rich text editor for creating posts with formatting
3. **File Attachments**: Add support for attaching files to posts
4. **Moderation Tools**: Create tools for moderating forum content
5. **Search Functionality**: Implement search for finding specific content
6. **Notification System**: Add notifications for new posts and replies
7. **Mobile Optimization**: Ensure forums are responsive and mobile-friendly
8. **Course Integration**: Integrate forums with course structure
9. **Analytics**: Add analytics to track forum engagement
10. **Accessibility**: Ensure forums are accessible to all users

## Code References from Legacy System

### Chat Component (Slack Integration)

```javascript
// From src/app/themes/nekomy/components/chat/chat.jsx
postMessage(text) {
  if (text !== '' && this.state.signedIn) {
    return chat.postMessage({
      token: sessionStorage.getItem(`access_token_${this.state.currentGroup.slackClientId}`),
      channel: this.state.currentChannel.id,
      text,
      username: this.props.user.displayName,
      as_user: true
    }, (err, data) => {
      if (err) {
        Chat.debugLog('failed to post', data, 'err:', err);
        return;
      }

      Chat.debugLog('Successfully posted message', text, 'response:', data);
      this.setState({
        postMyMessage: '',
        sendingLoader: false
      }, () => {
        // Adjust scroll height
        setTimeout(() => {
          const chatMessages = this.refs.reactSlakChatMessages;
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
      });

      this.forceUpdate();
    });
  }
  return false;
}
```

### Post Component (Not Used for Discussions)

```javascript
// From src/app/themes/nekomy/pages/post/post.jsx
render() {
  let post = null;
  let featuredImage = null;

  if (isLoaded(this.props.post) && isLoaded(this.props.files) && !isEmpty(this.props.post)) {
    Object.keys(this.props.post).map((key) => {
      post = this.props.post[key];
      if (post.featuredImage) {
        Object.keys(this.props.files).map((fileKey) => {
          if (fileKey === post.featuredImage) {
            featuredImage = this.props.files[fileKey];
          }
          return false;
        });
      }
      return false;
    });
  }

  return (
    <section className="page post">
      {post
        ? <div className="page-wrapper">
          <h1 className="title">{post.title}</h1>
          <div className="meta">
            <div className="date">{moment(post.date).format('Do MMMM YYYY, h:mm a')}</div>
            {isLoaded(this.props.userData) && !isEmpty(this.props.userData) && this.props.userData.info.level >= CONSTANTS.ADMIN_LEVEL
              ? <Edit editLink={`/admin/posts/edit/${post.slug}`} newLink="/admin/posts/new" />
              : ''}
          </div>
          <div
            className={classNames('columns', {
              'single-column': (!post.content2 && !post.content2)
            })}
          >
            <div className="column page-content">
              {featuredImage
                ? <img className="featured-image" src={featuredImage.url} alt="" />
                : ''}
              <div
                className="content" dangerouslySetInnerHTML={{
                  __html: CONSTANTS.converter.makeHtml(post.content1)
                }}
              />
            </div>
            {/* Additional content columns */}
          </div>
        </div>
        : <div className="loader-small" />}
    </section>
  );
}
```

## Modern Implementation Approach

### Forum Service

```typescript
// Example of a modern implementation approach
export class ForumService {
  private db = getFirestore();
  
  // Forum Category methods
  async getForumCategories(options?: { courseId?: string }): Promise<ForumCategory[]> {
    try {
      let categoriesQuery = collection(this.db, 'forumCategories');
      
      if (options?.courseId) {
        categoriesQuery = query(
          categoriesQuery, 
          where('courseId', '==', options.courseId)
        );
      }
      
      categoriesQuery = query(categoriesQuery, orderBy('order'));
      const querySnapshot = await getDocs(categoriesQuery);
      
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }) as ForumCategory);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Forum methods
  async getForums(categoryId: string): Promise<Forum[]> {
    try {
      const forumsQuery = query(
        collection(this.db, 'forums'),
        where('categoryId', '==', categoryId),
        orderBy('order')
      );
      
      const querySnapshot = await getDocs(forumsQuery);
      
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }) as Forum);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Topic methods
  async getTopics(forumId: string, options?: { limit?: number, page?: number }): Promise<{ topics: Topic[], total: number }> {
    try {
      const limit = options?.limit || 20;
      const page = options?.page || 1;
      
      // Get total count
      const countQuery = query(
        collection(this.db, 'topics'),
        where('forumId', '==', forumId)
      );
      
      const countSnapshot = await getDocs(countQuery);
      const total = countSnapshot.size;
      
      // Get paginated topics
      const topicsQuery = query(
        collection(this.db, 'topics'),
        where('forumId', '==', forumId),
        orderBy('pinned', 'desc'),
        orderBy('updatedAt', 'desc'),
        limit(limit),
        startAfter((page - 1) * limit)
      );
      
      const querySnapshot = await getDocs(topicsQuery);
      
      const topics = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }) as Topic);
      
      return { topics, total };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async createTopic(topicData: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>): Promise<string> {
    try {
      const topicRef = collection(this.db, 'topics');
      
      const docRef = await addDoc(topicRef, {
        ...topicData,
        viewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Post methods
  async getPosts(topicId: string): Promise<Post[]> {
    try {
      const postsQuery = query(
        collection(this.db, 'posts'),
        where('topicId', '==', topicId),
        orderBy('createdAt')
      );
      
      const querySnapshot = await getDocs(postsQuery);
      
      return querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }) as Post);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const postRef = collection(this.db, 'posts');
      
      const docRef = await addDoc(postRef, {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Update topic's updatedAt timestamp
      const topicRef = doc(this.db, 'topics', postData.topicId);
      await updateDoc(topicRef, {
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Moderation methods
  async moderateTopic(topicId: string, action: 'pin' | 'unpin' | 'lock' | 'unlock' | 'delete'): Promise<void> {
    try {
      const topicRef = doc(this.db, 'topics', topicId);
      
      switch (action) {
        case 'pin':
          await updateDoc(topicRef, { pinned: true });
          break;
        case 'unpin':
          await updateDoc(topicRef, { pinned: false });
          break;
        case 'lock':
          await updateDoc(topicRef, { locked: true });
          break;
        case 'unlock':
          await updateDoc(topicRef, { locked: false });
          break;
        case 'delete':
          // Delete all posts in the topic first
          const postsQuery = query(
            collection(this.db, 'posts'),
            where('topicId', '==', topicId)
          );
          const postsSnapshot = await getDocs(postsQuery);
          
          const batch = writeBatch(this.db);
          postsSnapshot.docs.forEach(postDoc => {
            batch.delete(postDoc.ref);
          });
          
          // Delete the topic
          batch.delete(topicRef);
          
          await batch.commit();
          break;
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Search methods
  async searchForums(query: string): Promise<{ topics: Topic[], posts: Post[] }> {
    try {
      // This is a simplified implementation
      // In a real application, you would use a dedicated search service like Algolia
      
      // Search topics
      const topicsQuery = query(
        collection(this.db, 'topics'),
        where('title', '>=', query),
        where('title', '<=', query + '\uf8ff'),
        limit(10)
      );
      
      const topicsSnapshot = await getDocs(topicsQuery);
      const topics = topicsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }) as Topic);
      
      // Search posts
      const postsQuery = query(
        collection(this.db, 'posts'),
        where('content', '>=', query),
        where('content', '<=', query + '\uf8ff'),
        limit(10)
      );
      
      const postsSnapshot = await getDocs(postsQuery);
      const posts = postsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }) as Post);
      
      return { topics, posts };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Error handling
  private handleError(error: any): Error {
    console.error('Forum service error:', error);
    return new Error(`Forum operation failed: ${error.message}`);
  }
}
```

### Forum Components

```typescript
// Example of a modern implementation approach - Forum List Component
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip, 
  Button, 
  CircularProgress 
} from '@mui/material';
import { 
  Forum as ForumIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useGetForumsQuery } from '../api/apiSlice';
import { useAuth } from '../hooks/useAuth';

export const ForumList: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { data: forums, isLoading, error } = useGetForumsQuery(categoryId || '');
  const { currentUser, hasPermission } = useAuth();
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading forums: {error.toString()}</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Forums</Typography>
        {hasPermission('createForum') && (
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            component={Link}
            to={`/forums/categories/${categoryId}/new`}
          >
            New Forum
          </Button>
        )}
      </Box>
      
      <Paper>
        <List>
          {forums?.map((forum, index) => (
            <React.Fragment key={forum.id}>
              {index > 0 && <Divider />}
              <ListItem 
                component={Link} 
                to={`/forums/${forum.id}`}
                sx={{ 
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ForumIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6">{forum.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {forum.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Chip 
                      size="small" 
                      label={`${forum.topicCount || 0} topics`} 
                      sx={{ mr: 1 }} 
                    />
                    <Chip 
                      size="small" 
                      label={`${forum.postCount || 0} posts`} 
                    />
                  </Box>
                  {forum.lastPost && (
                    <Typography variant="caption">
                      Last post: {new Date(forum.lastPost.createdAt).toLocaleString()}
                    </Typography>
                  )}
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
          
          {forums?.length === 0 && (
            <ListItem>
              <ListItemText 
                primary="No forums found" 
                secondary="There are no forums in this category yet." 
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};
```

## Additional Notes

- Discussion forums are a critical component for building community and facilitating peer learning
- The current implementation lacks dedicated forum functionality
- Consider integrating forums with course content to provide context-specific discussions
- Moderation tools are essential for maintaining a positive learning environment
- Search functionality is important for finding relevant discussions
- Mobile responsiveness is crucial for students accessing forums on different devices
- Consider implementing gamification elements to encourage participation
- Analytics can provide valuable insights into student engagement
- Accessibility is important for ensuring all students can participate in discussions
