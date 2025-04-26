# Hypatia Modern Component Inventory

This document provides a comprehensive inventory of all components in the Hypatia Modern codebase, categorized by type for documentation purposes.

## Component Categories

For documentation purposes, we'll categorize components into the following groups:

1. **UI Components**: Basic UI elements such as buttons, loading spinners, error messages, etc.
2. **Form Components**: Form elements and validation components
3. **Navigation Components**: Navigation elements such as menus, breadcrumbs, etc.
4. **Activity Components**: Components related to activities and assignments
5. **Authentication Components**: Components related to user authentication
6. **Course Management Components**: Components related to course display and management
7. **Editor Components**: Components related to content editing
8. **Dashboard Components**: Components related to the dashboard
9. **Grading Components**: Components related to grading and submissions
10. **Search Components**: Components related to search functionality

## Component Inventory

### UI Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| Button | /components/ui/Button.tsx | Primary interaction element | ✅ Complete |
| Breadcrumbs | /components/common/Breadcrumbs.tsx | Hierarchical navigation path | 🔄 Planned |
| ErrorMessage | /components/common/ErrorMessage.tsx | Error display component | 🔄 Planned |
| LoadingSpinner | /components/common/LoadingSpinner.tsx | Loading indicator | 🔄 Planned |
| NotificationModern | /components/common/NotificationModern.tsx | Notification display component | 🔄 Planned |

### Form Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| Input | /components/form/Input.tsx | Text input field | ✅ Complete |
| Select | /components/form/Select.tsx | Dropdown selection field | ✅ Complete |
| Checkbox | /components/form/Checkbox.tsx | Boolean selection field | ✅ Complete |

### Navigation Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| Navigation | /components/navigation/Navigation.tsx | Main navigation component | ✅ Complete |
| TopNavModern | /components/navigation/TopNavModern.tsx | Top navigation bar | 🔄 Planned |
| Search | /components/search/Search.tsx | Search component | 🔄 Planned |

### Activity Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| ActivityContent | /components/activities/ActivityContent.tsx | Activity content display | 🔄 Planned |
| ActivityDetailModern | /components/activities/ActivityDetailModern.tsx | Activity detail page | 🔄 Planned |
| ActivityFeedback | /components/activities/ActivityFeedback.tsx | Activity feedback display | 🔄 Planned |
| ActivityHeader | /components/activities/ActivityHeader.tsx | Activity header component | 🔄 Planned |
| ActivityNavigation | /components/activities/ActivityNavigation.tsx | Activity navigation component | 🔄 Planned |
| ActivitySubmission | /components/activities/ActivitySubmission.tsx | Activity submission component | 🔄 Planned |

### Authentication Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| ForgotPasswordModern | /components/auth/ForgotPasswordModern.tsx | Password recovery form | 🔄 Planned |
| PrivateRoute | /components/auth/PrivateRoute.tsx | Route that requires authentication | 🔄 Planned |
| ProtectedRoute | /components/auth/ProtectedRoute.tsx | Route with protection rules | 🔄 Planned |
| RoleRoute | /components/auth/RoleRoute.tsx | Route that requires specific role | 🔄 Planned |
| SignInModern | /components/auth/SignInModern.tsx | User login form | 🔄 Planned |
| SignUpModern | /components/auth/SignUpModern.tsx | User registration form | 🔄 Planned |
| VerifyEmailModern | /components/auth/VerifyEmailModern.tsx | Email verification component | 🔄 Planned |

### Dashboard Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| DashboardHeader | /components/dashboard/DashboardHeader.tsx | Dashboard header component | 🔄 Planned |
| DashboardModern | /components/dashboard/DashboardModern.tsx | Main dashboard component | 🔄 Planned |
| DashboardWidget | /components/dashboard/DashboardWidget.tsx | Generic dashboard widget | 🔄 Planned |
| ActivitiesWidget | /components/dashboard/widgets/ActivitiesWidget.tsx | Activities widget | 🔄 Planned |
| AnnouncementsWidget | /components/dashboard/widgets/AnnouncementsWidget.tsx | Announcements widget | 🔄 Planned |
| CalendarWidget | /components/dashboard/widgets/CalendarWidget.tsx | Calendar widget | 🔄 Planned |
| CoursesWidget | /components/dashboard/widgets/CoursesWidget.tsx | Courses widget | 🔄 Planned |
| MessagesWidget | /components/dashboard/widgets/MessagesWidget.tsx | Messages widget | 🔄 Planned |
| ProgressWidget | /components/dashboard/widgets/ProgressWidget.tsx | Progress widget | 🔄 Planned |

### Course Management Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| CourseAnnouncements | /components/courses/CourseAnnouncements.tsx | Course announcements component | 🔄 Planned |
| CourseDetailModern | /components/courses/CourseDetailModern.tsx | Course detail page | 🔄 Planned |
| CourseHeader | /components/courses/CourseHeader.tsx | Header for course details | ✅ Complete |
| CourseModules | /components/courses/CourseModules.tsx | List of course modules | 🔄 Planned |
| CourseParticipants | /components/courses/CourseParticipants.tsx | Course participants list | 🔄 Planned |
| CourseResources | /components/courses/CourseResources.tsx | Course resources component | 🔄 Planned |
| CourseTabs | /components/courses/CourseTabs.tsx | Course tabs navigation | 🔄 Planned |

### Editor Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| ActivityEditor | /components/courses/editor/ActivityEditor.tsx | Activity editing component | 🔄 Planned |
| CourseEditorForm | /components/courses/editor/CourseEditorForm.tsx | Course editor form | 🔄 Planned |
| CourseEditorHeader | /components/courses/editor/CourseEditorHeader.tsx | Course editor header | 🔄 Planned |
| CourseEditorModern | /components/courses/editor/CourseEditorModern.tsx | Main course editor component | 🔄 Planned |
| CourseEditorModules | /components/courses/editor/CourseEditorModules.tsx | Course modules editor | 🔄 Planned |
| CourseEditorResources | /components/courses/editor/CourseEditorResources.tsx | Course resources editor | 🔄 Planned |
| CourseEditorSettings | /components/courses/editor/CourseEditorSettings.tsx | Course settings editor | 🔄 Planned |
| CourseEditorTabs | /components/courses/editor/CourseEditorTabs.tsx | Course editor tabs | 🔄 Planned |
| ModuleEditor | /components/courses/editor/ModuleEditor.tsx | Module editing component | 🔄 Planned |
| ResourceEditor | /components/courses/editor/ResourceEditor.tsx | Resource editing component | 🔄 Planned |

### Grading Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| GradingDashboardModern | /components/grading/GradingDashboardModern.tsx | Grading dashboard | 🔄 Planned |
| GradingFilters | /components/grading/GradingFilters.tsx | Filters for grading dashboard | 🔄 Planned |
| GradingForm | /components/grading/GradingForm.tsx | Form for grading submissions | ✅ Complete |
| GradingHeader | /components/grading/GradingHeader.tsx | Grading header component | 🔄 Planned |
| SubmissionContent | /components/grading/SubmissionContent.tsx | Display for submission content | 🔄 Planned |
| SubmissionGraderModern | /components/grading/SubmissionGraderModern.tsx | Submission grader component | 🔄 Planned |
| SubmissionHeader | /components/grading/SubmissionHeader.tsx | Header for submission details | 🔄 Planned |
| SubmissionsList | /components/grading/SubmissionsList.tsx | List of student submissions | 🔄 Planned |

### Search Components

| Component | File Path | Description | Status |
|-----------|-----------|-------------|--------|
| Search | /components/search/Search.tsx | Search component | 🔄 Planned |

## Component Count Summary

| Category | Total Components | Documented | Progress |
|----------|------------------|------------|----------|
| UI Components | 5 | 1 | 20.0% |
| Form Components | 3 | 3 | 100.0% |
| Navigation Components | 3 | 1 | 33.3% |
| Activity Components | 6 | 0 | 0.0% |
| Authentication Components | 7 | 0 | 0.0% |
| Course Management Components | 7 | 1 | 14.3% |
| Editor Components | 10 | 0 | 0.0% |
| Dashboard Components | 9 | 0 | 0.0% |
| Grading Components | 8 | 1 | 12.5% |
| Search Components | 1 | 0 | 0.0% |
| **Total** | **59** | **7** | **11.9%** |

Last updated: 2023-08-18
