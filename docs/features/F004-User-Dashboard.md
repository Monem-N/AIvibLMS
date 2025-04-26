# Feature Documentation: User Dashboard

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | User Dashboard |
| **Feature ID** | F004 |
| **Category** | Learning Experience |
| **Priority** | High |
| **Status in Legacy System** | Partially Implemented |

## Functional Description

The User Dashboard feature provides a personalized central hub for users to access their courses, activities, and communications within the Hypatia LMS. It serves as the main landing page after login, displaying relevant information based on the user's role and enrollments. The dashboard presents a consolidated view of the user's subjects, upcoming activities, announcements, and direct messages, enabling efficient navigation to key areas of the platform.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can access all dashboard features; sees system-wide announcements and administrative tools |
| Instructor | Can access dashboard with focus on teaching activities; sees courses they teach and related activities |
| Student | Can access dashboard with focus on learning activities; sees enrolled courses and upcoming assignments |
| Anonymous User | Cannot access the dashboard (redirected to login) |

## User Workflows

### Dashboard Access

1. User logs into the system
2. System automatically redirects to the dashboard or user clicks on dashboard link in navigation
3. System loads personalized dashboard content based on user role and enrollments
4. User views their subjects, activities, and messages

### Subject Navigation

1. User views the "My subjects" section on the dashboard
2. User selects a subject from the list
3. System navigates to the selected subject's detail page
4. User can access subject content and activities

### Activity Management

1. User views the "My current activities" section on the dashboard
2. User sees upcoming activities with due dates
3. User selects an activity to view details
4. User can access activity content and submission options
5. User can track activity status (upcoming, in progress, completed)

### Announcement Viewing

1. User views the announcement banner at the top of the dashboard
2. User reads system-wide announcements and important notifications
3. User can dismiss announcements (not implemented in legacy system)

### Message Access

1. User views the "My direct messages" section on the dashboard
2. User sees recent messages from instructors and peers
3. User selects a message to view the conversation (not fully implemented in legacy system)
4. User can respond to messages (not implemented in legacy system)

## UI Components

- **Dashboard Container**: Main layout container for the dashboard
- **Announcement Banner**: Banner displaying system-wide announcements
- **Subject List**: List of the user's enrolled subjects with instructor information
- **Activity List**: List of upcoming activities with due dates and action buttons
- **Message List**: List of recent direct messages (partially implemented in legacy system)
- **Action Buttons**: Icons for common actions (announcements, downloads, uploads, chat)
- **Loading Indicator**: Spinner displayed while dashboard content is loading

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| User | uid, email, info (firstName, lastName, displayName, level) | One-to-many with Enrollments |
| Course | id, title, slug, startDate, endDate, status | One-to-many with Subjects |
| Subject | id, title, slug, courseId, teachers | Many-to-one with Course, Many-to-many with Users (teachers) |
| Activity | id, title, slug, startDate, endDate, moduleId | Many-to-one with Module |
| Enrollment | userId, courseId, subjectId, status, finalGrade | Many-to-one with User, Course, Subject |
| Message | id, senderId, recipientId, content, timestamp, read | Many-to-one with User (sender and recipient) |
| Announcement | id, title, content, startDate, endDate, priority | Global entity |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/users/${userId}/courses` | GET | Retrieve user's enrolled courses |
| `/users/${userId}/courses/${courseId}` | GET | Retrieve user's enrollment in a specific course |
| `/subjects` | GET | Retrieve all subjects |
| `/activities` | GET | Retrieve all activities |
| `/users` | GET | Retrieve user information |
| `/announcements` | GET | Retrieve system announcements |
| `/messages/${userId}` | GET | Retrieve user's messages |

## Dependencies

- Firebase Realtime Database for data storage
- React for UI components
- Redux for state management
- Moment.js for date formatting
- jQuery for DOM manipulation
- React Router for navigation

## Testing Considerations

- Test dashboard loading with various user roles
- Test subject and activity display for enrolled and non-enrolled users
- Test dashboard responsiveness on different screen sizes
- Test loading states and error handling
- Test navigation to linked pages (subjects, activities)
- Test announcement display
- Test performance with large numbers of subjects and activities
- Test dashboard access for unauthenticated users

## Migration Notes

### Current Implementation Status

The dashboard in the legacy Hypatia LMS is partially implemented with the following features:

1. **Subject List**: Displays the user's enrolled subjects with teacher information
2. **Activity List**: Shows upcoming activities with due dates and action buttons
3. **Announcement Banner**: Displays a hardcoded system announcement
4. **Message List**: Shows hardcoded direct messages (not functional)
5. **Basic Navigation**: Links to subjects and activities
6. **Visual Design**: Basic three-column layout with color-coded items

The current implementation has several limitations:

1. **Hardcoded Content**: Some elements like messages and announcements are hardcoded
2. **Limited Interactivity**: Action buttons (download, upload, chat) are not functional
3. **No Customization**: Users cannot customize their dashboard
4. **No Filtering**: No ability to filter or search dashboard content
5. **jQuery Dependency**: Uses jQuery for DOM manipulation
6. **Direct Firebase Integration**: Components directly call Firebase methods
7. **Limited Responsiveness**: Basic mobile support
8. **No Analytics**: No user activity tracking or analytics

### Migration Recommendations

1. **Dynamic Content**: Replace hardcoded content with dynamic data from the database
2. **Enhanced Interactivity**: Implement functional action buttons and interactive elements
3. **Customization Options**: Allow users to customize their dashboard layout and content
4. **Filtering and Search**: Add ability to filter and search dashboard content
5. **Remove jQuery Dependency**: Use React state and effects for UI interactions
6. **Service Layer Abstraction**: Create a service layer to abstract Firebase interactions
7. **Improved Responsiveness**: Enhance mobile experience with responsive design
8. **User Analytics**: Add analytics to track user engagement and activity
9. **Role-Based Views**: Customize dashboard based on user role (student, instructor, admin)
10. **Real-time Updates**: Implement real-time updates for dashboard content

## Code References from Legacy System

### Dashboard Component

```javascript
// From src/app/themes/nekomy/pages/dashboard/dashboard.jsx
class Dashboard extends Component {

  componentDidMount() {
    this.props.setLoading(false);
    $('.js-main').removeClass().addClass('main js-main dashboard-page');
  }

  render() {
    let subjects = null;
    const activities = [];

    if (isLoaded(this.props.subjects) && !isEmpty(this.props.subjects) &&
    isLoaded(this.props.activities) && !isEmpty(this.props.activities) &&
    isLoaded(this.props.users) && !isEmpty(this.props.users)) {
      subjects = Object.keys(this.props.users[this.props.user.uid].courses).map((key) => {
        const course = this.props.users[this.props.user.uid].courses[key];

        return Object.keys(course).map((subject, c) => {
          let teachers = '';

          if (this.props.subjects[subject].activities) {
            const newActivities = this.props.subjects[subject].activities.map(activity => (
              <li
                key={activity}
                className="item"
                style={{
                  borderLeftColor: this.props.colors[c]
                }}
              >
                <Link to={`/activities/${this.props.activities[activity].slug}`}>{this.props.activities[activity].title}</Link>
                <div className="meta">
                  Due in
                  <span className="date">{moment(this.props.activities[activity].endDate).format('D MMMM YYYY')}</span>
                </div>
                <div className="actions">
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Announcement} /></Link>
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Download} /></Link>
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Upload} /></Link>
                  <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Chat} /></Link>
                </div>
              </li>
            ));

            activities.push(newActivities);
          }

          if (this.props.subjects[subject].teachers) {
            for (let i = 0; i < this.props.subjects[subject].teachers.length; i += 1) {
              const teacher = this.props.users[this.props.subjects[subject].teachers[i]];
              if (teacher) {
                teachers += `${teacher.info.firstName} ${teacher.info.lastName1}`;
                if (i < this.props.subjects[subject].teachers.length - 1) {
                  teachers += ', ';
                }
              }
            }
          }

          return (
            <li
              key={subject}
              className="item"
              style={{
                borderLeftColor: this.props.colors[c]
              }}
            >
              <Link to={`/subjects/${this.props.subjects[subject].slug}`}>{this.props.subjects[subject].title}</Link>
              <div className="teachers"><Icon glyph={Teacher} />{teachers}</div>
            </li>
          );
        });
      });
    }

    return (
      <section className="dashboard page">
        {(!isLoaded(subjects) && !isLoaded(activities))
          ? <div className="loader-small" />
          : <div className="page-wrapper">
            <div className="announcement">
              <Icon glyph={Info} />
              From August 15th 23:00pm until August 16th 8am, the website will be offline due to maintenance works. Apologies for the trouble. (Hardcoded)
            </div>
            <div className="columns">
              <div className="column">
                <h1 className="dashboard-title">My subjects</h1>
                <ul className="items-list">
                  {!isEmpty(subjects)
                    ? subjects
                    : 'None'}
                </ul>
              </div>
              <div className="column">
                <h1 className="dashboard-title">My current activities</h1>
                <ul className="items-list">
                  {!isEmpty(activities)
                    ? activities
                    : 'None'}
                </ul>
              </div>
              <div className="column">
                <h1 className="dashboard-title">My direct messages (Hardcoded)</h1>
                <ul className="items-list">
                  <li className="item">
                    <div>John Smith</div>
                    <div>#maths #test1</div>
                    <div>I've uploaded the new formulas. Please let me know when you are available to...</div>
                  </li>
                  <li className="item">
                    <div>Martin Lee</div>
                    <div>#french #assignment1</div>
                    <div>Hi Joan. In the 2nd question, you said 'trais bien' but the correct answer is 'très...</div>
                  </li>
                  <li className="item">
                    <div>Morgan Freeman, John Doe</div>
                    <div>#history #assignment2</div>
                    <div>Hi Joan and John, the result of your assignment is already published. Well done!</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>}
      </section>
    );
  }
}
```

### Dashboard Styling

```css
// From src/app/themes/nekomy/pages/dashboard/dashboard.scss
.dashboard {
	.announcement {
		font-size: 14px;
		padding: 10px;
		display: inline-block;
		border: 1px solid $light-grey;
		margin: 20px 20px 0 20px;
		width: calc(100% - 40px);
		border-radius: 5px;
		
		.icon {
			margin-right: 10px;
		}
	}
	
	.columns {
		padding: 0;
	}
	
	.dashboard-title {
		font-size: 18px;
	}
	
	.items-list {
		list-style-type: none;
		padding: 0;
		
		.item {
			padding: 10px 0;
			border-bottom: 1px solid $light-grey;
			border-left: 4px solid;
    		padding-left: 10px;
		    margin-bottom: 5px;
		}
	}
	
	.meta {
		text-align: left;
		padding: 0;
	}
	
	.actions, .teachers {
		.icon {
			margin-right: 10px;
		}
	}
}
```

### Dashboard Navigation

```javascript
// From src/app/themes/nekomy/components/topnav/topnav.jsx
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
```

## Modern Implementation Approach

### Dashboard Service

```typescript
// Example of a modern implementation approach
export class DashboardService {
  private db = getFirestore();
  
  async getUserDashboardData(userId: string): Promise<DashboardData> {
    try {
      // Get user enrollments
      const enrollmentsRef = collection(this.db, 'enrollments');
      const enrollmentsQuery = query(enrollmentsRef, where('userId', '==', userId));
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      
      // Extract course and subject IDs from enrollments
      const courseIds = new Set<string>();
      const subjectIds = new Set<string>();
      
      enrollmentsSnapshot.forEach(doc => {
        const enrollment = doc.data();
        courseIds.add(enrollment.courseId);
        subjectIds.add(enrollment.subjectId);
      });
      
      // Get subjects data
      const subjectsData: Subject[] = [];
      for (const subjectId of subjectIds) {
        const subjectRef = doc(this.db, 'subjects', subjectId);
        const subjectSnap = await getDoc(subjectRef);
        
        if (subjectSnap.exists()) {
          subjectsData.push({
            id: subjectSnap.id,
            ...subjectSnap.data()
          } as Subject);
        }
      }
      
      // Get activities for these subjects
      const activitiesRef = collection(this.db, 'activities');
      const activitiesQuery = query(
        activitiesRef,
        where('moduleId', 'in', subjectsData.flatMap(subject => subject.modules || []))
      );
      const activitiesSnapshot = await getDocs(activitiesQuery);
      
      const activitiesData: Activity[] = [];
      activitiesSnapshot.forEach(doc => {
        activitiesData.push({
          id: doc.id,
          ...doc.data()
        } as Activity);
      });
      
      // Get announcements
      const announcementsRef = collection(this.db, 'announcements');
      const announcementsQuery = query(
        announcementsRef,
        where('endDate', '>', new Date()),
        orderBy('endDate'),
        limit(5)
      );
      const announcementsSnapshot = await getDocs(announcementsQuery);
      
      const announcementsData: Announcement[] = [];
      announcementsSnapshot.forEach(doc => {
        announcementsData.push({
          id: doc.id,
          ...doc.data()
        } as Announcement);
      });
      
      // Get messages
      const messagesRef = collection(this.db, 'messages');
      const messagesQuery = query(
        messagesRef,
        where('recipientId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const messagesSnapshot = await getDocs(messagesQuery);
      
      const messagesData: Message[] = [];
      messagesSnapshot.forEach(doc => {
        messagesData.push({
          id: doc.id,
          ...doc.data()
        } as Message);
      });
      
      // Return consolidated dashboard data
      return {
        subjects: subjectsData,
        activities: activitiesData,
        announcements: announcementsData,
        messages: messagesData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  private handleError(error: any): Error {
    console.error('Dashboard service error:', error);
    return new Error(`Dashboard operation failed: ${error.message}`);
  }
}
```

### Dashboard Component

```typescript
// Example of a modern implementation approach
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Alert, 
  CircularProgress, 
  IconButton,
  Divider
} from '@mui/material';
import { 
  Announcement as AnnouncementIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Chat as ChatIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useGetUserDashboardQuery } from '../api/apiSlice';
import { RootState } from '../store';

export const Dashboard: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { data: dashboardData, isLoading, error } = useGetUserDashboardQuery(
    currentUser?.uid || '', 
    { skip: !currentUser }
  );
  
  if (!currentUser) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Please log in to view your dashboard</Alert>
      </Box>
    );
  }
  
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
        <Alert severity="error">
          Error loading dashboard: {error.toString()}
        </Alert>
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      {dashboardData?.announcements && dashboardData.announcements.length > 0 && (
        <Alert 
          severity="info" 
          sx={{ mb: 3 }}
          icon={<AnnouncementIcon />}
        >
          {dashboardData.announcements[0].content}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              My Subjects
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {dashboardData?.subjects && dashboardData.subjects.length > 0 ? (
              <List>
                {dashboardData.subjects.map((subject) => (
                  <ListItem 
                    key={subject.id}
                    component={Link}
                    to={`/subjects/${subject.slug}`}
                    sx={{ 
                      borderLeft: '4px solid',
                      borderLeftColor: 'primary.main',
                      mb: 1,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }}
                  >
                    <ListItemText
                      primary={subject.title}
                      secondary={
                        subject.teachers && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
                            <Typography variant="body2">
                              {subject.teachers.join(', ')}
                            </Typography>
                          </Box>
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                You are not enrolled in any subjects
              </Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              My Current Activities
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {dashboardData?.activities && dashboardData.activities.length > 0 ? (
              <List>
                {dashboardData.activities.map((activity) => (
                  <ListItem 
                    key={activity.id}
                    component={Link}
                    to={`/activities/${activity.slug}`}
                    sx={{ 
                      borderLeft: '4px solid',
                      borderLeftColor: 'secondary.main',
                      mb: 1,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }}
                  >
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <>
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2">
                              Due: {format(new Date(activity.endDate), 'PPP')}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <IconButton size="small">
                              <AnnouncementIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <UploadIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <ChatIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                You have no current activities
              </Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              My Direct Messages
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {dashboardData?.messages && dashboardData.messages.length > 0 ? (
              <List>
                {dashboardData.messages.map((message) => (
                  <ListItem 
                    key={message.id}
                    component={Link}
                    to={`/messages/${message.id}`}
                    sx={{ 
                      borderLeft: '4px solid',
                      borderLeftColor: 'info.main',
                      mb: 1,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }}
                  >
                    <ListItemText
                      primary={message.senderName}
                      secondary={
                        <>
                          <Box sx={{ mt: 0.5 }}>
                            <Chip 
                              label={message.subject} 
                              size="small" 
                              sx={{ mr: 0.5 }}
                            />
                          </Box>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {message.content.substring(0, 60)}...
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                You have no messages
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
```

## Additional Notes

- The dashboard is a critical component of the user experience in the LMS
- The current implementation has basic functionality but lacks advanced features
- The dashboard should be customizable to accommodate different user roles and preferences
- Consider implementing analytics to track user engagement and activity
- Mobile responsiveness is essential for users accessing the dashboard on different devices
- Real-time updates would enhance the user experience, especially for notifications and messages
