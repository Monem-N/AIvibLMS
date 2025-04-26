# List of All Components in hypatia-modern

This document provides a comprehensive list of all components in the `hypatia-modern/src/components` directory, categorized by their functionality and implementation type.
It serves as a reference for developers working with the component library.

## Component Categories

The components are organized into the following categories:

1. **Core Components**: Basic building blocks of the application.
2. **Activity Components**: Components related to activities within the course.
3. **Authentication Components**: Components for user authentication and authorization.
4. **Common UI Components**: Reusable components for common UI elements.
5. **Course Management**: Components for managing course-related functionalities.
6. **Editor Components**: Components for editing course content and resources.
7. **Dashboard Components**: Components for the dashboard and widgets.
8. **Navigation**: Components for navigation and routing.
9. **Form Components**: Components for form handling and input elements.
10. **Grading Components**: Components related to grading and feedback.

## Component Structure and Implementation

The components are implemented using modern React patterns, with a focus on functional components and hooks. The architecture follows best practices for component design, including separation of concerns, reusability, and maintainability.
The components are implemented in both legacy JSX and modern TypeScript (TSX) formats. The legacy components are primarily written in JSX, while the modern components leverage TypeScript for better type safety and developer experience.

The modern components are designed to be more modular and reusable, following best practices in React development. They utilize hooks, functional components, and TypeScript features to enhance maintainability and scalability.

## Component File Structure

The components are structured in a feature-based directory layout, with modern TypeScript (TSX) implementations alongside legacy JSX components. This allows for a clear separation of concerns and better maintainability.

### Core Components

list of all components in the hypatia-modern/src/components directory:

1. **Core Components**

- `CourseActions.jsx` (JSX)
- `CourseDescription.jsx` (JSX)
- `CourseDescriptionFixed.jsx` (JSX)

2. **Activity Components**

- `ActivityContent.tsx` (TSX)
- `ActivityDetailModern.tsx` (TSX)
- `ActivityFeedback.tsx` (TSX)
- `ActivityHeader.tsx` (TSX)
- `ActivityNavigation.tsx` (TSX)
- `ActivitySubmission.tsx` (TSX)

3. **Authentication Components**

- `ForgotPasswordModern.tsx` (TSX)
- `PrivateRoute.tsx` (TSX)
- `SignInModern.tsx` (TSX)
- `SignUpModern.tsx` (TSX)
- `VerifyEmailModern.tsx` (TSX)

4. **Common UI Components**

- `Breadcrumbs.jsx`/`Breadcrumbs.tsx` (JSX/TSX)
- `ErrorMessage.tsx` (TSX)
- `LoadingSpinner.tsx` (TSX)
- `NotificationModern.tsx` (TSX)
- `Button.tsx` (TSX)

5. **Course Management**

- `CourseAnnouncements.tsx` (TSX)
- `CourseDetailModern.tsx` (TSX)
- `CourseHeader.tsx` (TSX)
- `CourseModules.tsx` (TSX)
- `CourseParticipants.tsx` (TSX)
- `CourseResources.tsx` (TSX)
- `CourseTabs.tsx` (TSX)

6. **Editor Components**

- `ActivityEditor.tsx` (TSX)
- `CourseEditorModern.tsx` (TSX)
- `CourseEditorForm.tsx` (TSX)
- `ModuleEditor.tsx` (TSX)
- `ResourceEditor.tsx` (TSX)

7. **Dashboard Components**

- `DashboardModern.tsx` (TSX)
- `DashboardWidget.tsx` (TSX)
- `ActivitiesWidget.tsx` (TSX)
- `AnnouncementsWidget.tsx` (TSX)
- `CalendarWidget.tsx` (TSX)

8. **Navigation**

- `Navigation.tsx` (TSX)
- `TopNavModern.tsx` (TSX)

9. **Form Components**

- `Checkbox.tsx` (TSX)
- `Input.tsx` (TSX)
- `Select.tsx` (TSX)

10. **Grading Components**

- `GradingDashboardModern.tsx` (TSX)
- `SubmissionGraderModern.tsx` (TSX)
- `SubmissionsList.tsx` (TSX)

Components are organized in a feature-based directory structure with modern TypeScript implementations (TSX) alongside legacy JSX components. The architecture follows contemporary React patterns with separated presentational and container components.
