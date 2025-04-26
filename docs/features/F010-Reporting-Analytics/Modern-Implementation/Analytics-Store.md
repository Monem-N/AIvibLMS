# Analytics Store

The Analytics Store provides Redux state management for analytics data in the Hypatia Modern LMS.

## Analytics Slice

```typescript
// src/store/slices/analyticsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsEvent, UserActivity } from '../../types/analytics';

interface AnalyticsState {
  recentEvents: AnalyticsEvent[];
  recentActivities: UserActivity[];
  dashboardTimeframe: 'day' | 'week' | 'month' | 'year' | 'custom';
  startDate: string | null;
  endDate: string | null;
  selectedCourseId: string | null;
  selectedUserId: string | null;
  isTrackingEnabled: boolean;
}

const initialState: AnalyticsState = {
  recentEvents: [],
  recentActivities: [],
  dashboardTimeframe: 'month',
  startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  endDate: new Date().toISOString(),
  selectedCourseId: null,
  selectedUserId: null,
  isTrackingEnabled: true
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<AnalyticsEvent>) => {
      state.recentEvents.unshift(action.payload);
      // Keep only the most recent events
      if (state.recentEvents.length > 50) {
        state.recentEvents.pop();
      }
    },
    addActivity: (state, action: PayloadAction<UserActivity>) => {
      state.recentActivities.unshift(action.payload);
      // Keep only the most recent activities
      if (state.recentActivities.length > 20) {
        state.recentActivities.pop();
      }
    },
    setDashboardTimeframe: (state, action: PayloadAction<{
      timeframe: 'day' | 'week' | 'month' | 'year' | 'custom';
      startDate?: string;
      endDate?: string;
    }>) => {
      state.dashboardTimeframe = action.payload.timeframe;
      
      if (action.payload.timeframe === 'custom') {
        if (action.payload.startDate) {
          state.startDate = action.payload.startDate;
        }
        if (action.payload.endDate) {
          state.endDate = action.payload.endDate;
        }
      } else {
        const now = new Date();
        let startDate: Date;
        
        switch (action.payload.timeframe) {
          case 'day':
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 1);
            break;
          case 'year':
            startDate = new Date(now);
            startDate.setFullYear(now.getFullYear() - 1);
            break;
          default:
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 1);
        }
        
        state.startDate = startDate.toISOString();
        state.endDate = now.toISOString();
      }
    },
    setSelectedCourse: (state, action: PayloadAction<string | null>) => {
      state.selectedCourseId = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    setTrackingEnabled: (state, action: PayloadAction<boolean>) => {
      state.isTrackingEnabled = action.payload;
    },
    clearAnalyticsData: (state) => {
      state.recentEvents = [];
      state.recentActivities = [];
    }
  }
});

export const { 
  addEvent, 
  addActivity, 
  setDashboardTimeframe, 
  setSelectedCourse,
  setSelectedUser,
  setTrackingEnabled,
  clearAnalyticsData
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
```

## Analytics API Slice

```typescript
// src/api/analyticsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuth } from 'firebase/auth';
import { 
  AnalyticsEvent, 
  UserActivity, 
  AnalyticsFilter 
} from '../types/analytics';

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/analytics',
    prepareHeaders: async (headers) => {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        const token = await user.getIdToken();
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAnalyticsEvents: builder.query<AnalyticsEvent[], AnalyticsFilter>({
      query: (filter) => ({
        url: '/events',
        params: filter
      })
    }),
    getUserActivities: builder.query<UserActivity[], AnalyticsFilter>({
      query: (filter) => ({
        url: '/activities',
        params: filter
      })
    }),
    getDashboardMetrics: builder.query<any, {
      userId: string;
      courseId?: string;
      startDate?: string;
      endDate?: string;
    }>({
      query: ({ userId, courseId, startDate, endDate }) => ({
        url: '/dashboard/metrics',
        params: {
          userId,
          courseId,
          startDate,
          endDate
        }
      })
    }),
    getUserAnalytics: builder.query<any, string>({
      query: (userId) => `/users/${userId}/analytics`
    }),
    getCourseAnalytics: builder.query<any, string>({
      query: (courseId) => `/courses/${courseId}/analytics`
    }),
    getSystemMetrics: builder.query<any, void>({
      query: () => '/system/metrics'
    }),
    trackEvent: builder.mutation<string, {
      eventType: string;
      properties: Record<string, any>;
    }>({
      query: (data) => ({
        url: '/events',
        method: 'POST',
        body: data
      })
    }),
    trackActivity: builder.mutation<string, {
      activityType: string;
      resourceId: string;
      resourceType: string;
      duration: number;
      completionStatus: 'started' | 'in-progress' | 'completed' | 'abandoned';
    }>({
      query: (data) => ({
        url: '/activities',
        method: 'POST',
        body: data
      })
    })
  })
});

export const {
  useGetAnalyticsEventsQuery,
  useGetUserActivitiesQuery,
  useGetDashboardMetricsQuery,
  useGetUserAnalyticsQuery,
  useGetCourseAnalyticsQuery,
  useGetSystemMetricsQuery,
  useTrackEventMutation,
  useTrackActivityMutation
} = analyticsApi;
```

## Analytics Middleware

```typescript
// src/store/middleware/analyticsMiddleware.ts
import { Middleware } from 'redux';
import { analyticsService } from '../../services/analyticsService';
import { addEvent, addActivity } from '../slices/analyticsSlice';

// Actions that should trigger analytics events
const TRACKED_ACTIONS = [
  'user/login',
  'user/logout',
  'courses/viewCourse',
  'subjects/viewSubject',
  'modules/viewModule',
  'activities/viewActivity',
  'assessments/startAssessment',
  'assessments/submitAssessment',
  'content/viewContent',
  'content/completeContent',
  'discussions/createPost',
  'discussions/replyToPost'
];

export const analyticsMiddleware: Middleware = store => next => action => {
  // First, dispatch the action
  const result = next(action);
  
  // Check if analytics tracking is enabled
  const { isTrackingEnabled } = store.getState().analytics;
  
  if (!isTrackingEnabled) {
    return result;
  }
  
  // Track specific actions
  if (TRACKED_ACTIONS.includes(action.type)) {
    const { type, payload } = action;
    
    // Map action types to analytics event types
    const eventTypeMap: Record<string, string> = {
      'user/login': 'LOGIN',
      'user/logout': 'LOGOUT',
      'courses/viewCourse': 'COURSE_VIEW',
      'subjects/viewSubject': 'SUBJECT_VIEW',
      'modules/viewModule': 'MODULE_VIEW',
      'activities/viewActivity': 'ACTIVITY_VIEW',
      'assessments/startAssessment': 'ASSESSMENT_START',
      'assessments/submitAssessment': 'ASSESSMENT_SUBMIT',
      'content/viewContent': 'CONTENT_VIEW',
      'content/completeContent': 'CONTENT_COMPLETE',
      'discussions/createPost': 'DISCUSSION_POST',
      'discussions/replyToPost': 'DISCUSSION_REPLY'
    };
    
    const eventType = eventTypeMap[type] || type;
    
    // Track the event
    analyticsService.trackEvent(eventType, payload)
      .then(eventId => {
        if (eventId) {
          // Add to recent events in store
          store.dispatch(addEvent({
            id: eventId,
            eventType,
            properties: payload,
            userId: store.getState().user.currentUser?.uid || '',
            timestamp: new Date(),
            sessionId: ''
          }));
        }
      })
      .catch(error => {
        console.error('Error tracking event:', error);
      });
    
    // Track activities for certain actions
    if (['CONTENT_VIEW', 'CONTENT_COMPLETE', 'ASSESSMENT_SUBMIT'].includes(eventType)) {
      const activityTypeMap: Record<string, string> = {
        'CONTENT_VIEW': 'content_view',
        'CONTENT_COMPLETE': 'content_complete',
        'ASSESSMENT_SUBMIT': 'assessment_submit'
      };
      
      const activityType = activityTypeMap[eventType];
      const resourceId = payload.id || payload.contentId || payload.assessmentId;
      const resourceType = payload.type || payload.contentType || 'assessment';
      const duration = payload.timeSpent || 0;
      const completionStatus = eventType === 'CONTENT_COMPLETE' ? 'completed' : 'in-progress';
      
      analyticsService.trackActivity(
        activityType,
        resourceId,
        resourceType,
        duration,
        completionStatus
      )
        .then(activityId => {
          if (activityId) {
            // Add to recent activities in store
            store.dispatch(addActivity({
              id: activityId,
              activityType,
              resourceId,
              resourceType,
              startTime: new Date(Date.now() - duration * 1000),
              endTime: new Date(),
              duration,
              completionStatus,
              userId: store.getState().user.currentUser?.uid || '',
              createdAt: new Date()
            }));
          }
        })
        .catch(error => {
          console.error('Error tracking activity:', error);
        });
    }
  }
  
  return result;
};
```

## Store Configuration

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import courseReducer from './slices/courseSlice';
import analyticsReducer from './slices/analyticsSlice';
import { analyticsApi } from '../api/analyticsApi';
import { coursesApi } from '../api/coursesApi';
import { analyticsMiddleware } from './middleware/analyticsMiddleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: courseReducer,
    analytics: analyticsReducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in specific action types
        ignoredActions: ['analytics/addEvent', 'analytics/addActivity']
      }
    })
      .concat(analyticsApi.middleware)
      .concat(coursesApi.middleware)
      .concat(analyticsMiddleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Analytics Hooks

```typescript
// src/hooks/useAnalyticsTracking.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTrackEventMutation } from '../api/analyticsApi';
import { RootState } from '../store';

export function usePageTracking() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isTrackingEnabled } = useSelector((state: RootState) => state.analytics);
  const [trackEvent] = useTrackEventMutation();
  
  useEffect(() => {
    if (isTrackingEnabled) {
      // Track page view when location changes
      trackEvent({
        eventType: 'PAGE_VIEW',
        properties: {
          path: location.pathname,
          referrer: document.referrer,
          title: document.title
        }
      });
    }
  }, [location, isTrackingEnabled, trackEvent]);
}

export function useResourceTracking(resourceId: string, resourceType: string) {
  const { isTrackingEnabled } = useSelector((state: RootState) => state.analytics);
  const [trackEvent, { isLoading: isTrackingEvent }] = useTrackEventMutation();
  const [trackActivity, { isLoading: isTrackingActivity }] = useTrackActivityMutation();
  
  useEffect(() => {
    if (!isTrackingEnabled || !resourceId || !resourceType) {
      return;
    }
    
    // Track resource access on mount
    trackEvent({
      eventType: 'RESOURCE_ACCESS',
      properties: {
        resourceId,
        resourceType
      }
    });
    
    // Start activity tracking
    const startTime = Date.now();
    
    // Return cleanup function to track activity duration on unmount
    return () => {
      const duration = Math.round((Date.now() - startTime) / 1000); // Convert to seconds
      
      // Only track if the user spent at least 5 seconds on the resource
      if (duration >= 5) {
        trackActivity({
          activityType: `${resourceType}_view`,
          resourceId,
          resourceType,
          duration,
          completionStatus: duration < 10 ? 'abandoned' : 'completed'
        });
      }
    };
  }, [resourceId, resourceType, isTrackingEnabled, trackEvent, trackActivity]);
  
  return {
    isTracking: isTrackingEvent || isTrackingActivity
  };
}
```
