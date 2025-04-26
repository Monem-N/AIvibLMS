# Analytics Service

The Analytics Service is the core service responsible for tracking, storing, and retrieving analytics data in the Hypatia Modern LMS.

## Service Structure

```typescript
// src/services/analyticsService.ts
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter, 
  Timestamp, 
  serverTimestamp, 
  writeBatch, 
  DocumentData 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { AnalyticsEvent, UserActivity, AnalyticsFilter, AggregatedMetrics } from '../types/analytics';

export class AnalyticsService {
  private db = getFirestore();
  private auth = getAuth();
  
  // Track an analytics event
  async trackEvent(eventType: string, properties: Record<string, any> = {}): Promise<string> {
    try {
      const user = this.auth.currentUser;
      
      if (!user) {
        // For anonymous tracking, we could generate a session ID
        // or just return without tracking
        return '';
      }
      
      const eventRef = collection(this.db, 'analyticsEvents');
      
      const event: Omit<AnalyticsEvent, 'id'> = {
        userId: user.uid,
        eventType,
        properties,
        timestamp: serverTimestamp() as Timestamp,
        sessionId: this.getSessionId()
      };
      
      const docRef = await addDoc(eventRef, event);
      return docRef.id;
    } catch (error) {
      console.error('Error tracking event:', error);
      return '';
    }
  }
  
  // Track user activity (longer duration interactions)
  async trackActivity(
    activityType: string, 
    resourceId: string, 
    resourceType: string, 
    duration: number, 
    completionStatus: 'started' | 'in-progress' | 'completed' | 'abandoned'
  ): Promise<string> {
    try {
      const user = this.auth.currentUser;
      
      if (!user) {
        return '';
      }
      
      const activityRef = collection(this.db, 'userActivities');
      
      const activity: Omit<UserActivity, 'id'> = {
        userId: user.uid,
        activityType,
        resourceId,
        resourceType,
        startTime: new Date(Date.now() - duration),
        endTime: new Date(),
        duration,
        completionStatus,
        createdAt: serverTimestamp() as Timestamp
      };
      
      const docRef = await addDoc(activityRef, activity);
      return docRef.id;
    } catch (error) {
      console.error('Error tracking activity:', error);
      return '';
    }
  }
  
  // Get user analytics data
  async getUserAnalytics(userId: string): Promise<AggregatedMetrics> {
    try {
      const userAnalyticsRef = doc(this.db, 'userAnalytics', userId);
      const userAnalyticsSnap = await getDoc(userAnalyticsRef);
      
      if (userAnalyticsSnap.exists()) {
        return userAnalyticsSnap.data() as AggregatedMetrics;
      }
      
      // If no aggregated data exists, return default values
      return {
        totalTimeSpent: 0,
        resourcesAccessed: 0,
        activitiesCompleted: 0,
        averageGrade: 0,
        engagementScore: 0,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error getting user analytics:', error);
      throw error;
    }
  }
  
  // Get course analytics data
  async getCourseAnalytics(courseId: string): Promise<AggregatedMetrics> {
    try {
      const courseAnalyticsRef = doc(this.db, 'courseAnalytics', courseId);
      const courseAnalyticsSnap = await getDoc(courseAnalyticsRef);
      
      if (courseAnalyticsSnap.exists()) {
        return courseAnalyticsSnap.data() as AggregatedMetrics;
      }
      
      // If no aggregated data exists, return default values
      return {
        totalEnrollments: 0,
        activeUsers: 0,
        completionRate: 0,
        averageGrade: 0,
        engagementScore: 0,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error getting course analytics:', error);
      throw error;
    }
  }
  
  // Get analytics events with filtering
  async getAnalyticsEvents(filters: AnalyticsFilter): Promise<AnalyticsEvent[]> {
    try {
      let eventsQuery = collection(this.db, 'analyticsEvents');
      
      // Apply filters
      if (filters.userId) {
        eventsQuery = query(eventsQuery, where('userId', '==', filters.userId));
      }
      
      if (filters.eventType) {
        eventsQuery = query(eventsQuery, where('eventType', '==', filters.eventType));
      }
      
      if (filters.startDate) {
        eventsQuery = query(eventsQuery, where('timestamp', '>=', filters.startDate));
      }
      
      if (filters.endDate) {
        eventsQuery = query(eventsQuery, where('timestamp', '<=', filters.endDate));
      }
      
      // Apply sorting
      eventsQuery = query(eventsQuery, orderBy('timestamp', 'desc'));
      
      // Apply pagination
      if (filters.limit) {
        eventsQuery = query(eventsQuery, limit(filters.limit));
      }
      
      if (filters.startAfter) {
        const startAfterDoc = await getDoc(doc(this.db, 'analyticsEvents', filters.startAfter));
        if (startAfterDoc.exists()) {
          eventsQuery = query(eventsQuery, startAfter(startAfterDoc));
        }
      }
      
      const querySnapshot = await getDocs(eventsQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AnalyticsEvent[];
    } catch (error) {
      console.error('Error getting analytics events:', error);
      throw error;
    }
  }
  
  // Get user activities with filtering
  async getUserActivities(filters: AnalyticsFilter): Promise<UserActivity[]> {
    try {
      let activitiesQuery = collection(this.db, 'userActivities');
      
      // Apply filters
      if (filters.userId) {
        activitiesQuery = query(activitiesQuery, where('userId', '==', filters.userId));
      }
      
      if (filters.resourceType) {
        activitiesQuery = query(activitiesQuery, where('resourceType', '==', filters.resourceType));
      }
      
      if (filters.resourceId) {
        activitiesQuery = query(activitiesQuery, where('resourceId', '==', filters.resourceId));
      }
      
      if (filters.startDate) {
        activitiesQuery = query(activitiesQuery, where('startTime', '>=', filters.startDate));
      }
      
      if (filters.endDate) {
        activitiesQuery = query(activitiesQuery, where('endTime', '<=', filters.endDate));
      }
      
      // Apply sorting
      activitiesQuery = query(activitiesQuery, orderBy('startTime', 'desc'));
      
      // Apply pagination
      if (filters.limit) {
        activitiesQuery = query(activitiesQuery, limit(filters.limit));
      }
      
      if (filters.startAfter) {
        const startAfterDoc = await getDoc(doc(this.db, 'userActivities', filters.startAfter));
        if (startAfterDoc.exists()) {
          activitiesQuery = query(activitiesQuery, startAfter(startAfterDoc));
        }
      }
      
      const querySnapshot = await getDocs(activitiesQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserActivity[];
    } catch (error) {
      console.error('Error getting user activities:', error);
      throw error;
    }
  }
  
  // Get aggregated metrics for dashboard
  async getDashboardMetrics(userId: string, courseId?: string): Promise<Record<string, any>> {
    try {
      // Get user-specific metrics
      const userMetrics = await this.getUserAnalytics(userId);
      
      // Get course-specific metrics if courseId is provided
      let courseMetrics = {};
      if (courseId) {
        courseMetrics = await this.getCourseAnalytics(courseId);
      }
      
      // Get recent activities
      const recentActivities = await this.getUserActivities({
        userId,
        limit: 5
      });
      
      // Return combined metrics
      return {
        user: userMetrics,
        course: courseMetrics,
        recentActivities
      };
    } catch (error) {
      console.error('Error getting dashboard metrics:', error);
      throw error;
    }
  }
  
  // Helper method to get or create a session ID
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    
    return sessionId;
  }
}

// Create a singleton instance
export const analyticsService = new AnalyticsService();
```

## Analytics Event Tracking

The service provides methods for tracking various types of analytics events:

### Page Views

```typescript
// Track page view
analyticsService.trackEvent('PAGE_VIEW', {
  path: window.location.pathname,
  referrer: document.referrer,
  title: document.title
});
```

### Resource Access

```typescript
// Track resource access
analyticsService.trackEvent('RESOURCE_ACCESS', {
  resourceId: 'module123',
  resourceType: 'module',
  contextId: 'course456'
});
```

### Assessment Interactions

```typescript
// Track assessment start
analyticsService.trackEvent('ASSESSMENT_START', {
  assessmentId: 'assessment789',
  attemptNumber: 1
});

// Track assessment submission
analyticsService.trackEvent('ASSESSMENT_SUBMIT', {
  assessmentId: 'assessment789',
  attemptNumber: 1,
  timeSpent: 1200, // seconds
  score: 85
});
```

### Content Completion

```typescript
// Track content completion
analyticsService.trackEvent('CONTENT_COMPLETE', {
  contentId: 'video123',
  contentType: 'video',
  timeSpent: 300 // seconds
});
```

## Activity Tracking

For longer duration interactions, the service provides a method to track user activities:

```typescript
// Track a completed video viewing activity
analyticsService.trackActivity(
  'video_view',
  'video123',
  'video',
  300, // duration in seconds
  'completed'
);

// Track an in-progress course activity
analyticsService.trackActivity(
  'course_progress',
  'course456',
  'course',
  1800, // duration in seconds
  'in-progress'
);
```

## Analytics Types

```typescript
// src/types/analytics.ts
import { Timestamp } from 'firebase/firestore';

export interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: string;
  properties: Record<string, any>;
  timestamp: Timestamp;
  sessionId: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  activityType: string;
  resourceId: string;
  resourceType: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  completionStatus: 'started' | 'in-progress' | 'completed' | 'abandoned';
  createdAt: Timestamp;
}

export interface AnalyticsFilter {
  userId?: string;
  eventType?: string;
  resourceType?: string;
  resourceId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  startAfter?: string;
}

export interface AggregatedMetrics {
  [key: string]: any;
  lastUpdated: Date;
}

export interface UserAnalyticsMetrics extends AggregatedMetrics {
  totalTimeSpent: number;
  resourcesAccessed: number;
  activitiesCompleted: number;
  averageGrade: number;
  engagementScore: number;
}

export interface CourseAnalyticsMetrics extends AggregatedMetrics {
  totalEnrollments: number;
  activeUsers: number;
  completionRate: number;
  averageGrade: number;
  engagementScore: number;
}
```

## Analytics Hooks

```typescript
// src/hooks/useAnalytics.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../services/analyticsService';

export function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view when location changes
    analyticsService.trackEvent('PAGE_VIEW', {
      path: location.pathname,
      referrer: document.referrer,
      title: document.title
    });
  }, [location]);
}

export function useResourceTracking(resourceId: string, resourceType: string) {
  useEffect(() => {
    // Track resource access on mount
    analyticsService.trackEvent('RESOURCE_ACCESS', {
      resourceId,
      resourceType
    });
    
    // Start activity tracking
    const startTime = Date.now();
    
    // Return cleanup function to track activity duration on unmount
    return () => {
      const duration = (Date.now() - startTime) / 1000; // Convert to seconds
      
      // Only track if the user spent at least 5 seconds on the resource
      if (duration >= 5) {
        analyticsService.trackActivity(
          `${resourceType}_view`,
          resourceId,
          resourceType,
          duration,
          duration < 10 ? 'abandoned' : 'completed'
        );
      }
    };
  }, [resourceId, resourceType]);
}
```

## Usage in Components

```typescript
// Example usage in a course component
import React from 'react';
import { usePageTracking, useResourceTracking } from '../hooks/useAnalytics';

interface CourseViewProps {
  courseId: string;
}

export const CourseView: React.FC<CourseViewProps> = ({ courseId }) => {
  // Track page view
  usePageTracking();
  
  // Track resource access and time spent
  useResourceTracking(courseId, 'course');
  
  // Component implementation
  return (
    <div>
      {/* Course content */}
    </div>
  );
};
```
