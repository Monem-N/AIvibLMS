# Data Model

The Reporting and Analytics feature relies on a comprehensive data model to store and process analytics data within the Hypatia LMS.

## Core Entities

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| AnalyticsEvent | id, userId, eventType, timestamp, properties, sessionId | Many-to-one with User |
| UserActivity | userId, activityType, resourceId, resourceType, startTime, endTime, duration, completionStatus | Many-to-one with User |
| CourseAnalytics | courseId, totalEnrollments, activeUsers, completionRate, averageGrade, engagementScore, updatedAt | One-to-one with Course |
| UserAnalytics | userId, lastActive, totalTimeSpent, resourcesAccessed, activitiesCompleted, averageGrade, engagementScore, updatedAt | One-to-one with User |
| AssessmentAnalytics | assessmentId, attemptCount, averageScore, completionRate, averageTimeSpent, difficultyScore, updatedAt | One-to-one with Assessment |
| ContentAnalytics | contentId, contentType, viewCount, averageTimeSpent, completionRate, engagementScore, updatedAt | One-to-many with various content types |
| Report | id, name, description, type, config, createdBy, createdAt, updatedAt, lastRun | Many-to-one with User (creator) |
| ReportSchedule | id, reportId, frequency, nextRunTime, recipients, format, status | Many-to-one with Report |
| Dashboard | id, name, userId, layout, widgets, isDefault, createdAt, updatedAt | Many-to-one with User |
| DashboardWidget | id, dashboardId, type, title, dataSource, config, position, size | Many-to-one with Dashboard |

## Event Tracking Schema

The AnalyticsEvent entity captures various user interactions with the system. The eventType field categorizes these events, and the properties field stores event-specific data as a JSON object.

### Common Event Types

| Event Type | Description | Properties |
|------------|-------------|------------|
| PAGE_VIEW | User viewed a page | path, referrer, timeOnPage |
| RESOURCE_ACCESS | User accessed a learning resource | resourceId, resourceType, contextId |
| ASSESSMENT_START | User started an assessment | assessmentId, attemptNumber |
| ASSESSMENT_SUBMIT | User submitted an assessment | assessmentId, attemptNumber, timeSpent, score |
| CONTENT_COMPLETE | User completed a content item | contentId, contentType, timeSpent |
| DISCUSSION_POST | User posted in a discussion | discussionId, postId, wordCount |
| SEARCH_QUERY | User performed a search | query, resultCount, selectedResult |
| LOGIN | User logged in | method, deviceType, browser |
| LOGOUT | User logged out | sessionDuration |

## Aggregated Analytics

Aggregated analytics data is stored in dedicated entities to optimize query performance for dashboards and reports.

### Time-Based Aggregations

| Entity | Attributes | Purpose |
|--------|------------|---------|
| DailyUserActivity | date, userId, totalTimeSpent, resourcesAccessed, activitiesCompleted | Track daily user activity metrics |
| WeeklyUserActivity | weekStartDate, userId, totalTimeSpent, resourcesAccessed, activitiesCompleted | Track weekly user activity metrics |
| MonthlyCourseStats | month, year, courseId, activeUsers, newEnrollments, completions, averageEngagement | Track monthly course performance |

### Dimensional Aggregations

| Entity | Attributes | Purpose |
|--------|------------|---------|
| UserCourseProgress | userId, courseId, progress, lastActivityDate, timeSpent, activitiesCompleted | Track user progress within a course |
| ContentTypeEngagement | contentType, totalViews, averageTimeSpent, completionRate, userCount | Track engagement by content type |
| AssessmentQuestionStats | assessmentId, questionId, correctResponseRate, averageAttempts, skipRate | Track performance on assessment questions |

## Relationships with Core LMS Entities

The analytics data model relates to the core LMS entities as follows:

- **User**: One-to-many with AnalyticsEvent, UserActivity; One-to-one with UserAnalytics
- **Course**: One-to-one with CourseAnalytics; One-to-many with CourseEnrollmentStats
- **Subject**: One-to-one with SubjectAnalytics; One-to-many with ContentAnalytics
- **Module**: One-to-one with ModuleAnalytics; One-to-many with ContentAnalytics
- **Activity**: One-to-one with ActivityAnalytics; One-to-many with UserActivity
- **Assessment**: One-to-one with AssessmentAnalytics; One-to-many with AssessmentAttempt
- **Content**: One-to-one with ContentAnalytics; One-to-many with UserActivity

## Data Retention

Analytics data is subject to retention policies:

- **Raw Events**: Retained for 90 days for detailed analysis
- **Daily Aggregations**: Retained for 1 year
- **Weekly Aggregations**: Retained for 3 years
- **Monthly Aggregations**: Retained indefinitely
- **User-specific Data**: Retained according to privacy policy and user preferences

## Data Privacy Considerations

The data model includes provisions for privacy:

- **User Identifiers**: Can be anonymized for certain reports and exports
- **Sensitive Data**: Excluded from analytics collection based on configuration
- **Consent Tracking**: Records user consent for analytics collection
- **Data Access Controls**: Restricts access to analytics data based on user roles
