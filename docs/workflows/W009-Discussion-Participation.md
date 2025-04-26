# Workflow Documentation: Discussion Participation

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | Discussion Participation |
| **Workflow ID** | W009 |
| **User Role(s)** | All Users |
| **Priority** | Medium |
| **Status in Legacy System** | Minimally Implemented |

## Workflow Description

The Discussion Participation workflow enables users to engage in asynchronous communication and collaboration within the Hypatia LMS. It covers the entire process from browsing discussion forums to creating topics, posting replies, and moderating content. This workflow is essential for building community, facilitating peer learning, and enabling instructor-student interaction outside of synchronous class sessions.

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│  Browse Forums  │────▶│ View Topic List │────▶│ View Topic      │────▶│ Create Reply    │
│                 │     │                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │                                               │
        │                        │                                               │
        ▼                        ▼                                               ▼
┌─────────────────┐     ┌─────────────────┐                          ┌─────────────────┐
│                 │     │                 │                          │                 │
│ Create New Topic│     │ Search Forums   │                          │ Edit/Delete     │
│                 │     │                 │                          │ Own Post        │
└─────────────────┘     └─────────────────┘                          └─────────────────┘
                                                                              │
                                                                              │
                                                                              ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│ Subscribe to    │◀────│ Receive         │◀────│ Moderate        │◀────│ Rate/Like Post  │
│ Topic           │     │ Notifications   │     │ Content         │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Detailed Steps

### 1. Browse Forums

**Description**: User browses available forum categories and forums.

**User Actions**:
- Navigate to the forums section of the LMS
- View available forum categories
- Select a category to view its forums
- Browse forums based on interest or course enrollment

**System Actions**:
- Retrieve forum categories from the database
- Display categories in a structured format
- Retrieve forums for selected category
- Display forum list with metadata (topic count, last post, etc.)
- Apply access controls based on user role and course enrollment

**UI Components**:
- Forum navigation
- Category list
- Forum list
- Forum metadata display (topic count, last post)
- Access indicators

**Data Involved**:
- Forum category data
- Forum data
- User enrollment data
- Access control rules

**Conditions and Rules**:
- Some forums may be restricted to specific courses or user roles
- Forums may be ordered by administrator-defined sequence
- System may highlight unread or recently active forums

### 2. View Topic List

**Description**: User views the list of topics within a forum.

**User Actions**:
- Select a forum from the list
- Browse topics within the forum
- Sort or filter topics as needed
- Select a topic to view

**System Actions**:
- Retrieve topics for the selected forum
- Apply sorting and filtering based on user selection
- Display topic list with metadata
- Track forum view for analytics
- Mark previously read topics

**UI Components**:
- Topic list
- Sort and filter controls
- Topic metadata display (author, replies, views, last post)
- Pagination controls
- New topic button

**Data Involved**:
- Topic data
- Topic metadata (reply count, view count)
- User read status data

**Conditions and Rules**:
- Topics may be pinned to the top of the list
- Locked topics may be visually indicated
- Unread topics may be highlighted
- Topics may be sorted by various criteria (recent activity, creation date, etc.)

### 3. View Topic

**Description**: User views a topic and its replies.

**User Actions**:
- Select a topic from the list
- Read the initial post and replies
- Navigate through multiple pages of replies (if applicable)
- View attachments (if any)

**System Actions**:
- Retrieve topic data and replies
- Display topic and replies in threaded or flat view
- Track topic view for analytics
- Mark topic as read for the user
- Display attachments and embedded media

**UI Components**:
- Topic header (title, author, metadata)
- Post display
- Reply thread display
- Attachment display
- Navigation controls
- Reply button
- Moderation controls (for authorized users)

**Data Involved**:
- Topic data
- Post data
- Reply data
- Attachment data
- User read status data

**Conditions and Rules**:
- Replies may be displayed in threaded or flat view
- Long topics may be paginated
- Deleted posts may be hidden or shown as placeholders
- Moderators may see additional controls

### 4. Create Reply

**Description**: User replies to a topic or to another reply.

**User Actions**:
- Click "Reply" on the topic or on a specific post
- Compose reply content using the editor
- Add formatting, links, or media (if supported)
- Upload attachments (if supported)
- Preview reply (optional)
- Submit reply

**System Actions**:
- Display reply editor
- Process text formatting and media embedding
- Validate reply content
- Upload and process attachments
- Save reply to the database
- Update topic metadata (reply count, last post)
- Notify subscribers of new reply

**UI Components**:
- Reply editor
- Rich text formatting controls
- Attachment upload
- Preview button
- Submit button
- Cancel button

**Data Involved**:
- Reply content
- Formatting data
- Attachment data
- Parent post reference (for threaded replies)

**Conditions and Rules**:
- User must have permission to reply
- Topic must not be locked
- Reply content may have minimum/maximum length
- Attachments may have size and type restrictions
- Rate limiting may apply to prevent spam

### 5. Create New Topic

**Description**: User creates a new discussion topic.

**User Actions**:
- Click "New Topic" or similar button
- Select topic type (if applicable)
- Enter topic title
- Compose topic content
- Add formatting, links, or media
- Upload attachments (if supported)
- Preview topic (optional)
- Submit topic

**System Actions**:
- Display topic creation form
- Process text formatting and media embedding
- Validate topic content
- Upload and process attachments
- Save topic to the database
- Update forum metadata (topic count, last post)
- Notify subscribers of new topic

**UI Components**:
- Topic creation form
- Topic type selector
- Title input
- Content editor
- Rich text formatting controls
- Attachment upload
- Preview button
- Submit button
- Cancel button

**Data Involved**:
- Topic title
- Topic content
- Topic type
- Formatting data
- Attachment data

**Conditions and Rules**:
- User must have permission to create topics
- Forum must allow new topics
- Topic title and content may have minimum/maximum length
- Attachments may have size and type restrictions
- Rate limiting may apply to prevent spam

### 6. Search Forums

**Description**: User searches for specific content within forums.

**User Actions**:
- Access forum search
- Enter search terms
- Apply filters (forum, date range, author, etc.)
- View search results
- Select a result to view

**System Actions**:
- Process search query
- Apply search filters
- Retrieve matching topics and posts
- Display search results with context
- Highlight matching terms

**UI Components**:
- Search input
- Search filters
- Results display
- Result context preview
- Pagination controls

**Data Involved**:
- Search query
- Search filter criteria
- Topic and post data
- Search index data

**Conditions and Rules**:
- Search may be limited to specific forums based on user access
- Results may be ranked by relevance or date
- Search may include topic titles, content, and replies
- Advanced search options may be available

### 7. Edit/Delete Own Post

**Description**: User edits or deletes their own post.

**User Actions**:
- Locate own post
- Click edit or delete button
- For edit: modify content and submit changes
- For delete: confirm deletion

**System Actions**:
- Verify user ownership of post
- For edit: display editor with current content, save changes, mark post as edited
- For delete: remove post or mark as deleted
- Update topic metadata

**UI Components**:
- Edit/delete buttons
- Edit form
- Confirmation dialog
- Success message

**Data Involved**:
- Post content
- Edit history
- Deletion status

**Conditions and Rules**:
- Time limits may apply for editing/deleting
- First posts in topics may have different rules than replies
- Edited posts may be marked as such
- Deleted posts may be hidden or shown as placeholders

### 8. Rate/Like Post

**Description**: User rates, likes, or otherwise reacts to a post.

**User Actions**:
- View a post
- Click rating/like button
- Optionally select rating value (if applicable)

**System Actions**:
- Record user's rating/like
- Update post's rating/like count
- Update post's rating/like display
- Notify post author (optional)

**UI Components**:
- Rating/like buttons
- Rating/like count display
- Rating/like confirmation

**Data Involved**:
- Rating/like data
- User rating history
- Post rating statistics

**Conditions and Rules**:
- Users may be limited to one rating/like per post
- Users may be able to change or remove their rating/like
- Rating/like may affect post visibility or sorting
- Self-rating may be prohibited

### 9. Moderate Content

**Description**: Authorized users moderate forum content.

**User Actions**:
- Review reported or flagged content
- Select moderation action (edit, delete, lock, pin, etc.)
- Provide reason for moderation (optional)
- Apply moderation action

**System Actions**:
- Verify user moderation permissions
- Apply selected moderation action
- Record moderation action in audit log
- Notify affected users (optional)
- Update topic/forum display

**UI Components**:
- Moderation controls
- Moderation action selector
- Reason input
- Confirmation dialog
- Success message

**Data Involved**:
- Moderation action data
- Moderation reason
- Audit log data
- User notification data

**Conditions and Rules**:
- Moderation permissions may vary by forum and user role
- Some moderation actions may require higher permissions
- Moderation history should be preserved for audit purposes
- Automated moderation may flag content for review

### 10. Receive Notifications

**Description**: User receives notifications about forum activity.

**User Actions**:
- View notifications
- Click on notification to navigate to relevant content
- Mark notifications as read
- Configure notification preferences (optional)

**System Actions**:
- Generate notifications for relevant events
- Deliver notifications via appropriate channels
- Track notification read status
- Apply user notification preferences

**UI Components**:
- Notification indicator
- Notification list
- Notification detail
- Notification preferences

**Data Involved**:
- Notification data
- Notification read status
- Notification preference data

**Conditions and Rules**:
- Notifications may be generated for various events (new topics, replies, mentions)
- Notification delivery may depend on user preferences
- Notifications may be aggregated to prevent overload
- Notification frequency may be limited

### 11. Subscribe to Topic

**Description**: User subscribes to a topic to receive notifications about new replies.

**User Actions**:
- View a topic
- Click subscribe button
- Select notification preferences (if applicable)

**System Actions**:
- Record user's subscription
- Update subscription display
- Apply subscription to notification system

**UI Components**:
- Subscribe button
- Subscription status indicator
- Notification preference selector

**Data Involved**:
- Subscription data
- Notification preference data

**Conditions and Rules**:
- Users may be automatically subscribed to their own topics
- Subscription may have different notification levels
- Users may be able to manage all subscriptions from a central location
- Course-related forums may have default subscription settings

## Alternative Flows

### Topic Reporting Flow

For reporting inappropriate content:

1. User identifies inappropriate content
2. User clicks "Report" button
3. User selects reason for report and adds comments
4. System records report and notifies moderators
5. Moderators review reported content
6. Moderators take appropriate action
7. User who reported is notified of outcome (optional)

### Poll Creation Flow

For creating and participating in polls:

1. User creates a new topic with poll option
2. User defines poll question and answer options
3. User configures poll settings (multiple choice, public/private results, etc.)
4. System creates topic with embedded poll
5. Other users view and vote in the poll
6. System tracks votes and displays results
7. Poll closes automatically or manually

### Announcement Flow

For important announcements:

1. Authorized user creates a new topic as announcement
2. System marks topic as announcement and pins it
3. System sends notification to all forum subscribers
4. Announcement appears prominently in forum
5. Users can view but may not be able to reply (configurable)
6. Announcement may have expiration date

## Integration Points

### Integration with Course Management

- Forums can be associated with specific courses
- Course enrollment may determine forum access
- Course events may trigger forum announcements
- Course content may link to related discussions

### Integration with Notification System

- Forum activity generates notifications
- Notification preferences control delivery
- Notifications link back to forum content
- Notification aggregation prevents overload

### Integration with User Management

- User profiles link to forum activity
- User roles determine forum permissions
- User settings control forum preferences
- User reputation may be built through forum participation

### Integration with Content Management

- Content may reference or embed forum discussions
- Forum posts may reference or link to content
- Content updates may trigger forum notifications
- Forum discussions may inform content revisions

## Current Implementation Status

The Discussion Participation workflow in the legacy Hypatia LMS is minimally implemented:

1. **Chat Integration**: There is a Slack integration for real-time chat, but no dedicated forum system.
2. **Basic UI Elements**: The UI includes chat icons and panels, but no forum-specific components.
3. **Limited Functionality**: The system supports basic messaging through Slack, but lacks threaded discussions, topic organization, and other forum features.
4. **No Moderation Tools**: There are no tools for moderating user-generated content.
5. **No Search Functionality**: There is no way to search discussion content.
6. **No Notification System**: There is no dedicated notification system for discussions.

The current implementation has several limitations:

1. **External Dependency**: Relies on Slack for chat functionality, requiring external accounts.
2. **No Persistence**: Chat messages may not be persistently stored or easily searchable.
3. **Limited Organization**: No way to organize discussions by topic or category.
4. **No Asynchronous Discussion**: Focus on real-time chat rather than threaded discussions.
5. **No Rich Content**: Limited support for formatting, attachments, or media.
6. **No Integration**: Limited integration with course content and activities.

## Code References from Legacy System

### Chat Component

```javascript
// From src/app/themes/nekomy/components/chat/chat.jsx
import React, { Component } from 'react';
import { firebase, helpers } from 'redux-react-firebase';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { rtm, channels, chat } from 'slack';
import { load as emojiLoader, parse as emojiParser } from 'gh-emoji';
import $ from 'jquery';
import moment from 'moment';
import User from './user';
import { history } from '../../../../store';
import { setLoading } from '../../../../core/actions/actions';
import { DEMO_EMAIL, DEMO_CHAT_WARNING } from '../../../../core/constants/constants';

// Component implementation...

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

### Chat UI

```javascript
// From src/app/themes/nekomy/components/chat/chat.jsx
render() {
  // Component rendering...

  return (
    <section className={`chat-panel ${this.props.class}`}>
      <ul className="groups">
        {slackGroups}
      </ul>
      <div className="sidebar">
        <h3 className="sidebar-heading">Channels ({this.state.channelList.length})</h3>
        <ul className="channels">
          {this.state.channelList.map(channel => <li
            key={channel.id}
            ref={channel.id}
            className={classNames('channel', {
              active: (channel.name === 'general')
            })} onClick={() => this.changeCurrentChannel(channel.id)}
          >
            # {channel.name}
          </li>)}
        </ul>
        <h3 className="sidebar-heading">Users ({this.state.users.length})</h3>
        <ul className="users">
          {this.state.users.map(user => <li key={user.id} ref={user.id} className={`user ${user.presence}`}>• {user.real_name}</li>)}
        </ul>
      </div>

      <div className="messages-wrapper">
        <h2 className="channel-title">
          <span className="group-title">{this.state.currentGroup.title}</span>#{this.state.currentChannel.name}</h2>
        {connected
          ? <ul className="messages" ref="reactSlakChatMessages">
            {this.state.messages.map((message, i) => this.formatMessage(message, i))}
          </ul>
          : null}
        {connected
          ? <div>
            <input
              type="text"
              className="new-message"
              placeholder={`Message #${this.state.currentChannel.name} ${demoUser}`}
              value={this.state.postMyMessage}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.postMessage(this.state.postMyMessage);
                }
              }}
              onChange={e => this.handleChange(e)}
            />
            <div className="users-writing">
              <span className="users-writing-names" />
              <span className="users-writing-message" />
            </div>
          </div>
          : <div className="slack-info-wrapper">
            <a className="slack-button" href={`https://slack.com/oauth/authorize?scope=client&client_id=${this.state.currentGroup.slackClientId}&state=hypatia-slack`}>
              <img
                alt="Connect with Slack"
                height="40"
                width="139"
                src="https://platform.slack-edge.com/img/add_to_slack.png"
                srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
              />
            </a>
            <p className="slack-info">To access this chat group, you teacher has to invite you and you need to login with Slack</p>
          </div>}
      </div>
    </section>
  );
}
```

### Chat Button in Navigation

```javascript
// From src/app/themes/nekomy/components/topnav/topnav.jsx
<div className="user-controls">
  <div className="lang">EN</div>
  <button className="chat-icon" onClick={() => changePanel('chat')}>
    {panel === 'chat' ? <Icon glyph={Close} className="icon close-chat" /> : <Icon glyph={Chat} className="icon chat" />}
  </button>

  <div className="user-controls-cta account-cta">
    {user && (
      <Link to="/dashboard">
        {user.email ? <img alt="" className="photo" src={`https://www.gravatar.com/avatar/${md5(user.email)}.jpg?s=20`} /> : <Icon glyph={Avatar} />}
        <span>{user.info?.displayName || ''}</span>
      </Link>
    )}
    <button
      onClick={() => {
        dispatch(setUser(null));
      }}
    >
      <Icon glyph={Logout} className="icon sign-out" />
    </button>
  </div>
</div>
```

## Modern Implementation Approach

The modern implementation of the Discussion Participation workflow will leverage React, TypeScript, and Firebase Firestore to create a comprehensive forum system.

### Key Components

1. **ForumService**: Service for managing forum data and operations
2. **ForumList**: Component for displaying forum categories and forums
3. **TopicList**: Component for displaying topics within a forum
4. **TopicView**: Component for viewing a topic and its replies
5. **PostEditor**: Rich text editor for creating topics and replies
6. **PostItem**: Component for displaying individual posts
7. **ForumSearch**: Component for searching forum content
8. **ModerationTools**: Components for moderating forum content

### Data Model

```typescript
// Forum category model
interface ForumCategory {
  id: string;
  title: string;
  description: string;
  slug: string;
  courseId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Forum model
interface Forum {
  id: string;
  title: string;
  description: string;
  slug: string;
  categoryId: string;
  order: number;
  topicCount: number;
  postCount: number;
  lastPost?: {
    id: string;
    title: string;
    authorId: string;
    authorName: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Topic model
interface Topic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  forumId: string;
  type: 'discussion' | 'question' | 'announcement';
  status: 'open' | 'closed' | 'resolved';
  pinned: boolean;
  locked: boolean;
  replyCount: number;
  viewCount: number;
  lastReply?: {
    id: string;
    authorId: string;
    authorName: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Post model
interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  topicId: string;
  parentId?: string;
  isAnswer?: boolean;
  attachments?: Attachment[];
  likes: number;
  likedBy: string[];
  edited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Attachment model
interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
}

// Subscription model
interface Subscription {
  id: string;
  userId: string;
  entityType: 'forum' | 'topic';
  entityId: string;
  notificationType: 'all' | 'mentions' | 'none';
  createdAt: Date;
  updatedAt: Date;
}
```

### Service Layer

```typescript
// Forum service
export class ForumService {
  private db = getFirestore();
  
  // Forum category methods
  async getForumCategories(options?: { courseId?: string }): Promise<ForumCategory[]>;
  async createForumCategory(data: Omit<ForumCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<string>;
  async updateForumCategory(id: string, data: Partial<ForumCategory>): Promise<void>;
  async deleteForumCategory(id: string): Promise<void>;
  
  // Forum methods
  async getForums(categoryId: string): Promise<Forum[]>;
  async createForum(data: Omit<Forum, 'id' | 'topicCount' | 'postCount' | 'lastPost' | 'createdAt' | 'updatedAt'>): Promise<string>;
  async updateForum(id: string, data: Partial<Forum>): Promise<void>;
  async deleteForum(id: string): Promise<void>;
  
  // Topic methods
  async getTopics(forumId: string, options?: { limit?: number, page?: number }): Promise<{ topics: Topic[], total: number }>;
  async getTopic(id: string): Promise<Topic>;
  async createTopic(data: Omit<Topic, 'id' | 'replyCount' | 'viewCount' | 'lastReply' | 'createdAt' | 'updatedAt'>): Promise<string>;
  async updateTopic(id: string, data: Partial<Topic>): Promise<void>;
  async deleteTopic(id: string): Promise<void>;
  async incrementTopicViewCount(id: string): Promise<void>;
  
  // Post methods
  async getPosts(topicId: string, options?: { limit?: number, page?: number }): Promise<{ posts: Post[], total: number }>;
  async createPost(data: Omit<Post, 'id' | 'likes' | 'likedBy' | 'edited' | 'createdAt' | 'updatedAt'>): Promise<string>;
  async updatePost(id: string, data: Partial<Post>): Promise<void>;
  async deletePost(id: string): Promise<void>;
  async likePost(id: string, userId: string): Promise<void>;
  async unlikePost(id: string, userId: string): Promise<void>;
  
  // Subscription methods
  async getSubscriptions(userId: string, entityType?: 'forum' | 'topic'): Promise<Subscription[]>;
  async subscribe(userId: string, entityType: 'forum' | 'topic', entityId: string, notificationType: 'all' | 'mentions' | 'none'): Promise<string>;
  async unsubscribe(userId: string, entityType: 'forum' | 'topic', entityId: string): Promise<void>;
  
  // Search methods
  async searchForums(query: string): Promise<{ topics: Topic[], posts: Post[] }>;
  
  // Moderation methods
  async moderateTopic(topicId: string, action: 'pin' | 'unpin' | 'lock' | 'unlock' | 'delete'): Promise<void>;
  async moderatePost(postId: string, action: 'edit' | 'delete'): Promise<void>;
}
```

### UI Implementation

```typescript
// Forum list component
export const ForumList: React.FC = () => {
  // Component implementation
};

// Topic list component
export const TopicList: React.FC<TopicListProps> = ({ 
  forumId 
}) => {
  // Component implementation
};

// Topic view component
export const TopicView: React.FC<TopicViewProps> = ({ 
  topicId 
}) => {
  // Component implementation
};

// Post editor component
export const PostEditor: React.FC<PostEditorProps> = ({ 
  topicId,
  parentId,
  initialContent,
  onSubmit,
  onCancel
}) => {
  // Component implementation
};

// Post item component
export const PostItem: React.FC<PostItemProps> = ({ 
  post,
  isAuthor,
  isModerator,
  onReply,
  onEdit,
  onDelete,
  onLike
}) => {
  // Component implementation
};

// Forum search component
export const ForumSearch: React.FC<ForumSearchProps> = ({ 
  onSearch 
}) => {
  // Component implementation
};
```

## Recommendations for Implementation

1. **Phased Approach**: Implement the forum system in phases, starting with basic functionality and expanding to more advanced features.

2. **Rich Text Support**: Implement a rich text editor for creating posts with formatting, links, and media embedding.

3. **File Attachments**: Add support for attaching files to posts, with preview capabilities for common file types.

4. **Threaded Replies**: Implement threaded replies to facilitate organized discussions.

5. **Notification System**: Create a comprehensive notification system for forum activity.

6. **Search Functionality**: Implement robust search capabilities for finding content across forums.

7. **Moderation Tools**: Develop tools for moderating content, including reporting, editing, and deletion.

8. **Mobile Optimization**: Ensure the forum system works well on mobile devices.

9. **Accessibility**: Make the forum system accessible to all users, including those with disabilities.

10. **Performance Optimization**: Implement pagination, lazy loading, and other techniques to ensure good performance even with large numbers of posts.

11. **Integration with Courses**: Integrate forums with course structure to provide context-specific discussions.

12. **Analytics**: Add analytics to track forum engagement and identify active/inactive discussions.

13. **Gamification**: Consider adding gamification elements to encourage participation.

14. **Offline Support**: Implement basic offline support for reading recent discussions.

15. **Export Functionality**: Allow exporting discussions for archiving or reference.
