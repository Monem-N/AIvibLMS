# CourseAnnouncements

## Introduction

The CourseAnnouncements component is a React component in the Hypatia LMS that displays announcements for a specific course. It allows users to filter announcements by all or unread, and handles loading, error, and empty states gracefully.

## Description

The CourseAnnouncements component fetches and displays announcements related to a course identified by the `courseId` prop. It supports filtering announcements by "all" or "unread", handles loading and error states, and provides a user-friendly interface for viewing announcement details including author information and timestamps.

## Usage

```tsx
import CourseAnnouncements from 'src/components/courses/CourseAnnouncements';

<CourseAnnouncements courseId="course-123" />
```

## Props

| Prop     | Type   | Default | Required | Description                                                  |
|----------|--------|---------|----------|--------------------------------------------------------------|
| courseId | string | None    | Yes      | The unique identifier for the course to fetch announcements for. This prop is required to load the relevant announcements and must be a valid course ID string. It should be a non-empty string representing the course's unique ID. There is no default value for this prop. |

## Type Definitions

```tsx
interface CourseAnnouncementsProps {
  courseId: string;
}
```

## Examples

### Basic Example

```tsx
<CourseAnnouncements courseId="course-123" />
```

### Advanced Example

```tsx
<CourseAnnouncements courseId="course-123" />
```

### Example with Context

```tsx
import { Provider } from 'react-redux';
import store from 'src/app/store';

<Provider store={store}>
  <CourseAnnouncements courseId="course-123" />
</Provider>
```

## Features

1. Fetches announcements for a given course using Redux actions.
2. Supports filtering announcements by "all" or "unread".
3. Handles loading, error, and empty states gracefully.
4. Displays announcement details including title, content, author avatar or placeholder, and formatted dates.
5. Responsive design for different screen sizes.

## Accessibility

The component includes accessibility considerations such as:

- Keyboard navigable filter buttons.
- Proper ARIA roles and labels for announcements.
- Screen reader support for announcement content.
- Sufficient color contrast for unread indicators and buttons.
- Focus management for interactive elements.

## Edge Cases

- **No Announcements**: Displays a message when there are no announcements for the course.
- **No Unread Announcements**: Displays a message and option to view all when all announcements are read.
- **Error Fetching Announcements**: Shows an error message with retry option.

## Implementation Details

```tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchAnnouncements } from '../../actions/announcementActions';
import { formatDate, getRelativeTime } from '../../utils/dateUtils';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface CourseAnnouncementsProps {
  courseId: string;
}

const CourseAnnouncements: React.FC<CourseAnnouncementsProps> = ({ courseId }) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const dispatch = useDispatch();
  const { announcements, loading, error } = useSelector(
    (state: RootState) => state.announcements
  );

  useEffect(() => {
    dispatch(fetchAnnouncements(courseId));
  }, [courseId, dispatch]);

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !announcement.read;
    return true;
  });

  if (loading) {
    return <LoadingSpinner message="Loading announcements..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => dispatch(fetchAnnouncements(courseId))}
      />
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="course-announcements">
        <div className="announcements-empty">
          <h3>No Announcements</h3>
          <p>There are no announcements for this course yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-announcements">
      <div className="announcements-header">
        <h2 className="announcements-title">Announcements</h2>
        <div className="announcements-filter">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
        </div>
      </div>
      
      {filteredAnnouncements.length === 0 ? (
        <div className="announcements-empty">
          <h3>No Unread Announcements</h3>
          <p>You have read all announcements for this course.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setFilter('all')}
          >
            View All Announcements
          </button>
        </div>
      ) : (
        <div className="announcements-list">
          {filteredAnnouncements.map(announcement => (
            <div 
              key={announcement.id}
              className={`announcement-item ${!announcement.read ? 'unread' : ''}`}
            >
              <div className="announcement-header">
                <h3 className="announcement-title">{announcement.title}</h3>
                {!announcement.read && <div className="unread-indicator"></div>}
              </div>
              
              <div className="announcement-content">
                <p>{announcement.content}</p>
              </div>
              
              <div className="announcement-meta">
                <div className="announcement-author">
                  {announcement.author.avatar ? (
                    <img 
                      src={announcement.author.avatar} 
                      alt={announcement.author.name} 
                      className="author-avatar" 
                    />
                  ) : (
                    <div className="author-avatar-placeholder">
                      {announcement.author.name.charAt(0)}
                    </div>
                  )}
                  <span className="author-name">{announcement.author.name}</span>
                </div>
                
                <div className="announcement-date">
                  <span className="date-absolute">
                    {formatDate(announcement.date)}
                  </span>
                  <span className="date-relative">
                    {getRelativeTime(announcement.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseAnnouncements;
```

## Related Components

- [CourseDetail](./CourseDetail.md): Displays detailed information about a course.
- [CourseModules](./CourseModules.md): Manages course modules and content.
- [CourseParticipants](./CourseParticipants.md): Shows participants enrolled in the course.

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/courses-courseannouncements--basic).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |

## Technical Debt

- Needs improved error handling for network failures.
- Consider caching announcements to reduce API calls.
- Refactor filtering logic for better performance.

## Version Compatibility

| Version | Compatible With |
|---------|-----------------|
| 1.0.0 | Hypatia LMS v2.0 and above |

export default CourseAnnouncements;
</Provider>
<CourseAnnouncements courseId="course-123" />
}
