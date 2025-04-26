# API Endpoints

The Reporting and Analytics feature provides a set of API endpoints for accessing and managing analytics data within the Hypatia LMS.

## Analytics Data Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/analytics/events` | POST | Record a new analytics event |
| `/analytics/events` | GET | Retrieve analytics events with filtering options |
| `/analytics/users/${userId}/activity` | GET | Retrieve activity data for a specific user |
| `/analytics/courses/${courseId}/metrics` | GET | Retrieve analytics metrics for a specific course |
| `/analytics/subjects/${subjectId}/metrics` | GET | Retrieve analytics metrics for a specific subject |
| `/analytics/assessments/${assessmentId}/metrics` | GET | Retrieve analytics metrics for a specific assessment |
| `/analytics/content/${contentId}/metrics` | GET | Retrieve analytics metrics for a specific content item |
| `/analytics/dashboard/kpi` | GET | Retrieve key performance indicators for dashboards |
| `/analytics/search` | GET | Search analytics data with complex queries |

## Report Management Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/reports` | GET | Retrieve available reports |
| `/reports` | POST | Create a new report |
| `/reports/${reportId}` | GET | Retrieve a specific report |
| `/reports/${reportId}` | PUT | Update a specific report |
| `/reports/${reportId}` | DELETE | Delete a specific report |
| `/reports/${reportId}/generate` | POST | Generate a report with specified parameters |
| `/reports/${reportId}/export` | GET | Export a report in specified format |
| `/reports/templates` | GET | Retrieve available report templates |

## Dashboard Management Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/dashboards` | GET | Retrieve available dashboards |
| `/dashboards` | POST | Create a new dashboard |
| `/dashboards/${dashboardId}` | GET | Retrieve a specific dashboard |
| `/dashboards/${dashboardId}` | PUT | Update a specific dashboard |
| `/dashboards/${dashboardId}` | DELETE | Delete a specific dashboard |
| `/dashboards/${dashboardId}/widgets` | GET | Retrieve widgets for a dashboard |
| `/dashboards/${dashboardId}/widgets` | POST | Add a widget to a dashboard |
| `/dashboards/${dashboardId}/widgets/${widgetId}` | PUT | Update a dashboard widget |
| `/dashboards/${dashboardId}/widgets/${widgetId}` | DELETE | Remove a widget from a dashboard |

## Aggregated Data Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/analytics/aggregates/users/daily` | GET | Retrieve daily user activity aggregates |
| `/analytics/aggregates/users/weekly` | GET | Retrieve weekly user activity aggregates |
| `/analytics/aggregates/courses/monthly` | GET | Retrieve monthly course statistics |
| `/analytics/aggregates/content/engagement` | GET | Retrieve content engagement statistics |
| `/analytics/aggregates/assessments/performance` | GET | Retrieve assessment performance statistics |

## Configuration Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/analytics/config` | GET | Retrieve analytics configuration |
| `/analytics/config` | PUT | Update analytics configuration |
| `/analytics/tracking/consent` | GET | Check user consent status for analytics tracking |
| `/analytics/tracking/consent` | PUT | Update user consent for analytics tracking |

## Scheduled Reports Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/reports/schedules` | GET | Retrieve scheduled reports |
| `/reports/schedules` | POST | Create a new report schedule |
| `/reports/schedules/${scheduleId}` | GET | Retrieve a specific report schedule |
| `/reports/schedules/${scheduleId}` | PUT | Update a specific report schedule |
| `/reports/schedules/${scheduleId}` | DELETE | Delete a specific report schedule |
| `/reports/schedules/${scheduleId}/run` | POST | Manually run a scheduled report |

## Query Parameters

Most GET endpoints support the following query parameters:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `startDate` | Start date for time-based queries | `2023-01-01` |
| `endDate` | End date for time-based queries | `2023-12-31` |
| `userId` | Filter by user ID | `user123` |
| `courseId` | Filter by course ID | `course456` |
| `limit` | Maximum number of results to return | `50` |
| `offset` | Offset for pagination | `100` |
| `sort` | Field to sort by | `timestamp` |
| `order` | Sort order (asc or desc) | `desc` |
| `filter` | Complex filter expression | `status:active,role:student` |
| `fields` | Comma-separated list of fields to include | `id,name,value` |
| `groupBy` | Field to group results by | `contentType` |
| `format` | Response format (json, csv) | `json` |

## Response Format

API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "total": 100,
    "limit": 20,
    "offset": 0,
    "nextOffset": 20
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "You do not have permission to access this resource"
  }
}
```

## Authentication and Authorization

All analytics API endpoints require authentication. Access is restricted based on user roles:

- Administrators can access all endpoints
- Instructors can access endpoints for courses they teach
- Students can only access their own user-specific data
- API requests must include an authorization token in the header
