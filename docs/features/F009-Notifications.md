# Feature Documentation: Notifications

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | Notifications |
| **Feature ID** | F009 |
| **Category** | Communication |
| **Priority** | Medium |
| **Status in Legacy System** | Partially Implemented |

## Functional Description

The Notifications feature provides a system for alerting users about important events, updates, and actions within the Hypatia LMS. It enables timely communication of system messages, course updates, assignment deadlines, grade postings, and other relevant information to users. Notifications can be displayed within the application interface and potentially delivered through other channels such as email or mobile push notifications. This feature enhances user engagement and ensures that users stay informed about activities that require their attention.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can send system-wide notifications; can configure notification settings; can view all notification types |
| Instructor | Can send course-specific notifications to enrolled students; can configure notification preferences for courses they teach |
| Student | Can view notifications relevant to their enrolled courses and activities; can configure personal notification preferences |
| Anonymous User | Can view public system announcements only |

## User Workflows

### Notification Viewing

1. User logs into the system
2. System displays recent unread notifications in the notification area
3. User clicks on a notification to view details
4. System marks the notification as read
5. User can navigate to related content (if applicable)

### Notification Management

1. User navigates to notification settings
2. System displays notification preferences
3. User configures notification types and delivery methods
4. User saves preferences
5. System updates notification settings

### Notification Creation (Instructor/Admin)

1. Instructor/Admin navigates to course or admin panel
2. User selects "Send Notification" option
3. System displays notification creation form
4. User enters notification details (recipients, message, priority, etc.)
5. User submits the notification
6. System delivers the notification to recipients

### Notification Center

1. User clicks on notification icon in the navigation bar
2. System displays notification center with all notifications
3. User can filter notifications by type, date, or read/unread status
4. User can mark notifications as read or delete them
5. User can navigate to related content from notifications

## UI Components

- **Notification Toast**: Temporary pop-up notification for immediate alerts
- **Notification Icon**: Icon in navigation bar showing unread notification count
- **Notification Center**: Panel displaying all notifications with filtering options
- **Notification Settings**: Interface for configuring notification preferences
- **Notification Creation Form**: Form for creating and sending notifications
- **Notification List Item**: Individual notification display in lists

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| Notification | id, type, title, message, createdAt, expiresAt, priority, link, isRead | Many-to-many with User |
| NotificationType | id, name, description, icon, defaultDeliveryMethods | One-to-many with Notification |
| UserNotification | userId, notificationId, isRead, readAt, deliveryStatus | Many-to-one with User and Notification |
| NotificationPreference | userId, notificationTypeId, isEnabled, deliveryMethods | Many-to-one with User and NotificationType |
| NotificationDeliveryMethod | id, name, description, isEnabled | Many-to-many with NotificationPreference |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/notifications` | GET | Retrieve all notifications for the current user |
| `/notifications` | POST | Create a new notification |
| `/notifications/${id}` | GET | Retrieve a specific notification |
| `/notifications/${id}` | PUT | Update a specific notification |
| `/notifications/${id}/read` | PUT | Mark a notification as read |
| `/notifications/unread-count` | GET | Get count of unread notifications |
| `/notifications/preferences` | GET | Retrieve notification preferences |
| `/notifications/preferences` | PUT | Update notification preferences |
| `/notifications/types` | GET | Retrieve available notification types |

## Dependencies

- Firebase Firestore for notification storage
- Redux for state management
- React for UI components
- Firebase Cloud Messaging (potential future use for push notifications)
- Email delivery service (potential future use for email notifications)

## Testing Considerations

- Test notification display with various notification types
- Test notification delivery to different user roles
- Test notification preferences and filtering
- Test notification expiration and cleanup
- Test notification links and navigation
- Test notification read/unread status
- Test notification center UI on different screen sizes
- Test performance with large numbers of notifications
- Test notification creation and delivery flow
- Test error handling for notification delivery failures

## Migration Notes

### Current Implementation Status

The notification functionality in the legacy Hypatia LMS is partially implemented with the following components:

1. **Notification Toast**: A simple toast notification component that displays messages
2. **Notification Types**: Basic support for success, error, and info notification types
3. **Notification Action**: Redux action for setting notifications
4. **Notification Reducer**: Redux reducer for storing notification state
5. **Notification Page**: A placeholder page for notifications (not implemented)

The current implementation has several limitations:

1. **Temporary Notifications Only**: Only supports temporary toast notifications, not persistent notifications
2. **No Notification Storage**: Notifications are not stored in the database
3. **Limited Notification Types**: Only supports basic notification types (success, error, info)
4. **No Notification Center**: No central place to view all notifications
5. **No Notification Preferences**: No way to configure notification settings
6. **No Delivery Methods**: Only supports in-app notifications, no email or push notifications
7. **No Targeting**: No way to target notifications to specific users or groups
8. **jQuery Dependency**: Uses jQuery for animations and DOM manipulation

### Migration Recommendations

1. **Persistent Notifications**: Implement storage of notifications in Firestore
2. **Notification Center**: Create a central notification center UI
3. **Enhanced Notification Types**: Expand notification types for different scenarios
4. **Notification Preferences**: Add user-configurable notification preferences
5. **Multiple Delivery Methods**: Support for in-app, email, and push notifications
6. **Targeted Notifications**: Allow targeting notifications to specific users or groups
7. **Remove jQuery Dependency**: Use React animations and state management
8. **Real-time Updates**: Implement real-time notification delivery
9. **Notification Analytics**: Add tracking of notification engagement
10. **Batch Notifications**: Group similar notifications to prevent notification fatigue

## Code References from Legacy System

### Notification Component

```javascript
// From src/app/themes/nekomy/components/notification/notification.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import { setNotification } from '../../../../core/actions/actions';
import Icon from '../../../../core/common/lib/icon/icon';
import Tick from '../../../../../../static/svg/tick.svg';
import Close from '../../../../../../static/svg/close.svg';
import Info from '../../../../../../static/svg/info.svg';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.mainReducer.notification);

  useEffect(() => {
    if (notification.message !== '') {
      showNotification();
    }
  }, [notification]);

  const showNotification = () => {
    const $el = $('.js-notification');

    setTimeout(() => {
      $el.show().animateCss('slideInRight');
    }, 1000);

    setTimeout(() => {
      $el.animateCss('slideOutRight', () => {
        $el.hide();
        dispatch(setNotification({ message: '', type: '' }));
      });
    }, 7000);
  };

  return (
    <div className={`notification js-notification ${notification.type}`}>
      <Icon className="icon success-icon" glyph={Tick} />
      <Icon className="icon error-icon" glyph={Close} />
      <Icon className="icon info-icon" glyph={Info} />
      <span className="message">{notification.message}</span>
    </div>
  );
};

export default Notification;
```

### Notification Styling

```css
// From src/app/themes/nekomy/components/notification/notification.scss
.notification {
	display: none;
	border: 1px solid $black;
	background-color: rgba(255,255,255,.95);
	padding: 10px;
	position: fixed;
	top: 20px;
	margin-right: 20px;
    right: 0;
    width: 200px;
	z-index: 3;
	border-radius: 5px;
	color: $black;
	animation-duration: .4s;
	
	&.success {
		border: 1px solid $green;
		
		.success-icon {
			display: inline-block;
			fill: $green;
		}
		.info-icon {
			display: none;
		}
	}
	
	&.error {
		border: 1px solid $red;
		
		.error-icon {
			display: inline-block;
			fill: $red;
		}
		.info-icon {
			display: none;
		}
	}
	
	.info-icon {
		fill: $blue;
	}
	
	.icon {
		margin-right: 10px;
	}
	
	.error-icon, .success-icon {
		display: none;
	}
	
	.message {
		font-size: 12px;
	}
}
```

### Notification Action

```javascript
// From src/app/core/actions/actions.jsx
import * as CONSTANTS from '../constants/constants';

export function setNotification(state) {
  return { type: CONSTANTS.SET_NOTIFICATION, payload: state };
}
```

### Notification Reducer

```javascript
// From src/app/core/reducers/mainReducer.jsx
import * as CONSTANTS from '../constants/constants';

// State is not the application state, only the state this reducer is respondible for
export default function main(state = {
  isLoading: true,
  user: null,
  panel: '',
  isDesktop: true,
  breadcrumbs: [],
  notification: {
    message: '',
    type: ''
  },
  userData: {}
}, action) {
  switch (action.type) {
    case CONSTANTS.SET_NOTIFICATION:
      return Object.assign({}, state, { notification: action.payload });
    // Other cases...
    default:
      return state;
  }
}
```

### Notification Usage Example

```javascript
// From src/app/themes/nekomy/components/signin/signin.jsx
const handleSignin = (e) => {
  e.preventDefault();
  $('.js-btn-signin').hide();
  $('.js-signin-loader').show();

  const email = String(emailRef.current.value);
  const password = passwordRef.current.value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    $('.js-btn-signin').show();
    $('.js-signin-loader').hide();
    $('.js-overlay').click();
  }).catch((error) => {
    $('.js-btn-signin').show();
    $('.js-signin-loader').hide();
    dispatch(setNotification({ message: String(error), type: 'error' }));
  });
};
```

## Modern Implementation Approach

### Notification Service

```typescript
// Example of a modern implementation approach
export class NotificationService {
  private db = getFirestore();
  
  // Get user notifications
  async getUserNotifications(userId: string, options?: { limit?: number, status?: 'read' | 'unread' | 'all' }): Promise<Notification[]> {
    try {
      const limit = options?.limit || 20;
      const status = options?.status || 'all';
      
      let userNotificationsQuery = query(
        collection(this.db, 'userNotifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      if (status === 'read') {
        userNotificationsQuery = query(userNotificationsQuery, where('isRead', '==', true));
      } else if (status === 'unread') {
        userNotificationsQuery = query(userNotificationsQuery, where('isRead', '==', false));
      }
      
      const querySnapshot = await getDocs(userNotificationsQuery);
      
      const notificationIds = querySnapshot.docs.map(doc => doc.data().notificationId);
      
      if (notificationIds.length === 0) {
        return [];
      }
      
      // Get the actual notifications
      const notificationsQuery = query(
        collection(this.db, 'notifications'),
        where(documentId(), 'in', notificationIds)
      );
      
      const notificationsSnapshot = await getDocs(notificationsQuery);
      
      // Combine notification data with user-specific read status
      return querySnapshot.docs.map(userNotifDoc => {
        const userNotif = userNotifDoc.data();
        const notifDoc = notificationsSnapshot.docs.find(doc => doc.id === userNotif.notificationId);
        
        if (!notifDoc) {
          return null;
        }
        
        return {
          id: notifDoc.id,
          ...notifDoc.data(),
          isRead: userNotif.isRead,
          readAt: userNotif.readAt
        } as Notification;
      }).filter(Boolean) as Notification[];
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Get unread notification count
  async getUnreadCount(userId: string): Promise<number> {
    try {
      const unreadQuery = query(
        collection(this.db, 'userNotifications'),
        where('userId', '==', userId),
        where('isRead', '==', false)
      );
      
      const querySnapshot = await getDocs(unreadQuery);
      
      return querySnapshot.size;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Mark notification as read
  async markAsRead(userId: string, notificationId: string): Promise<void> {
    try {
      const userNotifQuery = query(
        collection(this.db, 'userNotifications'),
        where('userId', '==', userId),
        where('notificationId', '==', notificationId),
        limit(1)
      );
      
      const querySnapshot = await getDocs(userNotifQuery);
      
      if (querySnapshot.empty) {
        throw new Error('Notification not found');
      }
      
      const userNotifDoc = querySnapshot.docs[0];
      
      await updateDoc(userNotifDoc.ref, {
        isRead: true,
        readAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Create notification
  async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>, recipientIds: string[]): Promise<string> {
    try {
      // Create the notification
      const notificationRef = collection(this.db, 'notifications');
      
      const docRef = await addDoc(notificationRef, {
        ...notificationData,
        createdAt: serverTimestamp()
      });
      
      // Create user notifications for each recipient
      const batch = writeBatch(this.db);
      
      for (const userId of recipientIds) {
        const userNotifRef = doc(collection(this.db, 'userNotifications'));
        
        batch.set(userNotifRef, {
          userId,
          notificationId: docRef.id,
          isRead: false,
          readAt: null,
          createdAt: serverTimestamp()
        });
      }
      
      await batch.commit();
      
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Get notification preferences
  async getNotificationPreferences(userId: string): Promise<NotificationPreference[]> {
    try {
      const preferencesQuery = query(
        collection(this.db, 'notificationPreferences'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(preferencesQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NotificationPreference[];
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Update notification preferences
  async updateNotificationPreferences(userId: string, preferences: Partial<NotificationPreference>[]): Promise<void> {
    try {
      const batch = writeBatch(this.db);
      
      for (const pref of preferences) {
        if (!pref.id) {
          continue;
        }
        
        const prefRef = doc(this.db, 'notificationPreferences', pref.id);
        
        batch.update(prefRef, {
          ...pref,
          updatedAt: serverTimestamp()
        });
      }
      
      await batch.commit();
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Error handling
  private handleError(error: any): Error {
    console.error('Notification service error:', error);
    return new Error(`Notification operation failed: ${error.message}`);
  }
}
```

### Notification Components

```typescript
// Example of a modern implementation approach - Notification Toast Component
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Snackbar, 
  Alert, 
  AlertTitle 
} from '@mui/material';
import { clearToast } from '../store/slices/notificationSlice';
import { RootState } from '../store';

export const NotificationToast: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useSelector((state: RootState) => state.notifications);
  
  const handleClose = () => {
    dispatch(clearToast());
  };
  
  return (
    <Snackbar
      open={!!toast}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {toast && (
        <Alert 
          onClose={handleClose} 
          severity={toast.type || 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
          {toast.message}
        </Alert>
      )}
    </Snackbar>
  );
};
```

```typescript
// Example of a modern implementation approach - Notification Center Component
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Badge, 
  IconButton, 
  Popover, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Divider, 
  Button, 
  CircularProgress, 
  Tabs, 
  Tab 
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  MarkEmailRead as MarkReadIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useGetUserNotificationsQuery, useMarkNotificationAsReadMutation } from '../api/apiSlice';
import { RootState } from '../store';

export const NotificationCenter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const { 
    data: notifications, 
    isLoading, 
    refetch 
  } = useGetUserNotificationsQuery(
    { 
      userId: currentUser?.uid || '', 
      status: activeTab === 0 ? 'all' : activeTab === 1 ? 'unread' : 'read',
      limit: 10 
    },
    { skip: !currentUser || !anchorEl }
  );
  
  const [markAsRead] = useMarkNotificationAsReadMutation();
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    refetch();
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const handleMarkAsRead = async (notificationId: string) => {
    if (currentUser) {
      try {
        await markAsRead({ 
          userId: currentUser.uid, 
          notificationId 
        }).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };
  
  const handleMarkAllAsRead = async () => {
    if (currentUser && notifications) {
      try {
        const unreadNotifications = notifications.filter(n => !n.isRead);
        
        for (const notification of unreadNotifications) {
          await markAsRead({ 
            userId: currentUser.uid, 
            notificationId: notification.id 
          }).unwrap();
        }
        
        refetch();
      } catch (error) {
        console.error('Failed to mark all notifications as read:', error);
      }
    }
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;
  
  return (
    <>
      <IconButton
        color="inherit"
        aria-describedby={id}
        onClick={handleClick}
      >
        <Badge 
          badgeContent={notifications?.filter(n => !n.isRead).length || 0} 
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 320, maxHeight: 500 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          <Button 
            startIcon={<MarkReadIcon />}
            size="small"
            onClick={handleMarkAllAsRead}
            disabled={!notifications || notifications.filter(n => !n.isRead).length === 0}
          >
            Mark all as read
          </Button>
        </Box>
        
        <Divider />
        
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="All" />
          <Tab label="Unread" />
          <Tab label="Read" />
        </Tabs>
        
        <Divider />
        
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <>
            {notifications && notifications.length > 0 ? (
              <List sx={{ p: 0 }}>
                {notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{ 
                        bgcolor: notification.isRead ? 'inherit' : 'action.hover',
                        '&:hover': {
                          bgcolor: 'action.selected'
                        }
                      }}
                      secondaryAction={
                        !notification.isRead && (
                          <IconButton 
                            edge="end" 
                            size="small"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <MarkReadIcon fontSize="small" />
                          </IconButton>
                        )
                      }
                      component={notification.link ? Link : 'li'}
                      to={notification.link || '#'}
                      onClick={() => {
                        if (!notification.isRead) {
                          handleMarkAsRead(notification.id);
                        }
                        if (!notification.link) {
                          handleClose();
                        }
                      }}
                    >
                      <ListItemText
                        primary={notification.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ display: 'block' }}
                            >
                              {notification.message}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              {format(new Date(notification.createdAt), 'PPp')}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No notifications
                </Typography>
              </Box>
            )}
            
            {notifications && notifications.length > 0 && (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button 
                  component={Link} 
                  to="/notifications"
                  size="small"
                  onClick={handleClose}
                >
                  View all notifications
                </Button>
              </Box>
            )}
          </>
        )}
      </Popover>
    </>
  );
};
```

## Additional Notes

- Notifications are a critical component for user engagement and communication
- The current implementation is limited to temporary toast notifications
- Consider implementing a notification center for persistent notifications
- Email and push notifications can enhance the user experience for important alerts
- Notification preferences are important for user control and reducing notification fatigue
- Analytics on notification engagement can provide insights for improving communication
- Consider implementing notification categories for better organization
- Mobile responsiveness is essential for notifications on different devices
