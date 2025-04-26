# ActivityDetailModern

The ActivityDetailModern component is used in the Hypatia LMS for displaying detailed information about a learning activity, including content, submission options, and feedback.

## Description

The ActivityDetailModern component serves as the main container for viewing an individual learning activity within a course. It provides a comprehensive interface for students to access activity content, submit assignments or quizzes, view feedback, and navigate between activities. This component is a central part of the learning experience, handling various activity types (content, assignments, quizzes, discussions) and their associated states (loading, error, not found, authenticated).

## Visual Examples

### Activity Content View

<!-- Note: Replace with actual screenshot when available -->
![Activity Content View](https://via.placeholder.com/800x500?text=Activity+Content+View)

Standard view of an activity with content and navigation

### Assignment Submission View

<!-- Note: Replace with actual screenshot when available -->
![Assignment Submission View](https://via.placeholder.com/800x500?text=Assignment+Submission+View)

View of an activity with submission form for assignments

### Graded Activity with Feedback

<!-- Note: Replace with actual screenshot when available -->
![Graded Activity with Feedback](https://via.placeholder.com/800x500?text=Graded+Activity+with+Feedback)

View of a graded activity showing feedback and score

## Import

```tsx
import { ActivityDetailModern } from 'components/activities/ActivityDetailModern';
```

Note: The actual import in code is:

```tsx
import ActivityDetailModern from 'components/activities/ActivityDetailModern';
```

## Usage

```tsx
// The component is typically used in a route definition
import { Route } from 'react-router-dom';
import ActivityDetailModern from 'components/activities/ActivityDetailModern';

// In your routes configuration
<Route
  path="/courses/:courseId/modules/:moduleId/activities/:activityId"
  element={<ActivityDetailModern />}
/>

// The component automatically retrieves activity data based on URL parameters
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| N/A | N/A | N/A | N/A | This component doesn't accept any props directly |

The ActivityDetailModern component doesn't accept any props directly. Instead, it retrieves all necessary data from:

1. **URL Parameters**: Using React Router's `useParams` hook to get `courseId`, `moduleId`, and `activityId`
2. **Redux Store**: Using Redux's `useSelector` hook to get activity data, loading state, and error state
3. **Context**: Using the AuthContext to get user authentication status

This design makes the component self-contained and simplifies its usage in route definitions.

## Type Definitions

The component uses several types from the application's type system:

```tsx
/**
 * Activity
 */
export interface Activity {
  id: string;
  title: string;
  description?: string;
  moduleId: string;
  courseId?: string;
  moduleTitle?: string;
  type: 'content' | 'assignment' | 'quiz' | 'discussion';
  content?: string;
  dueDate?: string;
  points?: number;
  order: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  submissions?: Submission[];
  attachments?: Attachment[];
  grade?: Grade;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Grade
 */
export interface Grade {
  score: number;
  maxScore: number;
  percentage: number;
  letter?: string;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: {
    id: string;
    name: string;
  };
}

/**
 * Activities state in Redux store
 */
interface ActivitiesState {
  activities: Activity[];
  currentActivity: Activity | null;
  loading: boolean;
  error: string | null;
}
```

## Examples

### Basic Example

```tsx
// Basic usage in a route configuration
import { Route } from 'react-router-dom';
import ActivityDetailModern from 'components/activities/ActivityDetailModern';

<Route
  path="/courses/:courseId/modules/:moduleId/activities/:activityId"
  element={<ActivityDetailModern />}
/>
```

### Advanced Example

```tsx
// Advanced usage with layout and nested routes
import { Routes, Route } from 'react-router-dom';
import ActivityDetailModern from 'components/activities/ActivityDetailModern';
import CourseLayout from 'components/layouts/CourseLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Other routes */}
      <Route path="/courses/:courseId" element={<CourseLayout />}>
        <Route
          path="modules/:moduleId/activities/:activityId"
          element={<ActivityDetailModern />}
        />
      </Route>
    </Routes>
  );
};
```

### Example with Context

```tsx
// Example with authentication context
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import ActivityDetailModern from 'components/activities/ActivityDetailModern';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Other routes */}
      <Route
        path="/courses/:courseId/modules/:moduleId/activities/:activityId"
        element={
          <ProtectedRoute>
            <ActivityDetailModern />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
```

### Redux Store Setup

```tsx
// In your activities reducer
import { createSlice } from '@reduxjs/toolkit';
import { Activity } from '../../types/course';

interface ActivitiesState {
  activities: Activity[];
  currentActivity: Activity | null;
  loading: boolean;
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [],
  currentActivity: null,
  loading: false,
  error: null
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    // Reducers for activities
  },
  extraReducers: (builder) => {
    // Handle async actions
  }
});

export default activitiesSlice.reducer;

// In your store configuration
import { configureStore } from '@reduxjs/toolkit';
import activitiesReducer from './slices/activitiesSlice';

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    // Other reducers
  }
});
```

## Features

1. **Comprehensive Activity Display**: Renders different types of activities (content, assignments, quizzes, discussions) with appropriate UI components
2. **State Management**: Handles loading, error, and not-found states with appropriate feedback to users
3. **Authentication Integration**: Redirects unauthenticated users to the sign-in page with return URL
4. **Responsive Layout**: Adapts to different screen sizes with a responsive design
5. **Conditional Rendering**: Shows submission forms only for applicable activity types (assignments, quizzes)
6. **Feedback Display**: Shows grades and feedback when available
7. **Navigation**: Includes activity navigation to move between activities in a module
8. **Error Handling**: Provides error messages with retry functionality
9. **Loading States**: Shows loading indicators during data fetching
10. **Redux Integration**: Connects to the Redux store for state management

## Accessibility

The ActivityDetailModern component is designed with accessibility in mind, leveraging the accessibility features of its child components while providing an accessible container structure.

### Keyboard Navigation

- All interactive elements within the component are keyboard accessible
- The component maintains a logical tab order following the visual layout
- Navigation links can be accessed and activated using the keyboard
- Submission forms maintain proper keyboard navigation

### Screen Reader Support

- The component uses semantic HTML structure for proper screen reader navigation
- Loading and error states are announced to screen readers
- Activity content is structured with proper headings and landmarks
- Child components provide appropriate screen reader support

### ARIA Attributes

- The component should be enhanced with appropriate ARIA attributes in a future update:
  - Adding `aria-live="polite"` to the activity content area for dynamic content updates
  - Adding `aria-busy="true"` during loading states
  - Ensuring proper heading structure with `aria-level` attributes

### Color Contrast

- Text elements maintain sufficient contrast with their backgrounds
- Interactive elements have visible focus states
- Error and success states use colors that meet contrast requirements
- Child components follow color contrast guidelines

### Focus Management

- Focus is properly managed when navigating between activities
- Error states bring focus to error messages
- Loading states preserve focus position
- After form submission, focus is appropriately managed

## Edge Cases

- **Missing URL Parameters**: If courseId, moduleId, or activityId are missing, the component shows an error and redirects to the course page
- **Unauthenticated User**: Redirects to the sign-in page with a return URL to bring the user back after authentication
- **Activity Not Found**: Displays a "Not Found" message with a link to return to the course
- **Network Errors**: Shows an error message with a retry button to attempt fetching the activity again
- **Different Activity Types**: Conditionally renders different UI components based on the activity type
- **Graded vs. Ungraded Activities**: Shows feedback section only when grade information is available
- **Long Content**: Handles long activity content with proper scrolling and layout
- **Mobile Devices**: Adapts layout for smaller screens, moving the sidebar to the top
- **Slow Network**: Shows loading indicators during data fetching to provide feedback to users

## Implementation Details

The ActivityDetailModern component is implemented using React with TypeScript. It uses React Router for navigation, Redux for state management, and various hooks for authentication and notifications.

```tsx
// Simplified implementation
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchActivity } from '../../actions/activityActions';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';
import ActivityHeader from './ActivityHeader';
import ActivityContent from './ActivityContent';
import ActivitySubmission from './ActivitySubmission';
import ActivityFeedback from './ActivityFeedback';
import ActivityNavigation from './ActivityNavigation';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './ActivityDetail.css';

const ActivityDetailModern: React.FC = () => {
  // Get activity ID from URL params
  const { courseId, moduleId, activityId } = useParams<{
    courseId: string;
    moduleId: string;
    activityId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hooks
  const { isAuthenticated } = useAuthContext();
  const { showError } = useNotification();

  // Redux state
  const { currentActivity, loading, error } = useSelector(
    (state: RootState) => state.activities
  );

  // Effect to fetch activity data
  useEffect(() => {
    if (!courseId || !moduleId || !activityId) {
      showError('Activity information is missing');
      navigate(`/courses/${courseId}`);
      return;
    }

    if (!isAuthenticated()) {
      navigate('/signin', {
        state: { from: `/courses/${courseId}/modules/${moduleId}/activities/${activityId}` }
      });
      return;
    }

    dispatch(fetchActivity(activityId, moduleId, courseId));
  }, [activityId, moduleId, courseId, dispatch, isAuthenticated, navigate, showError]);

  // If loading, show loading state
  if (loading) {
    return (
      <div className="activity-detail-container">
        <LoadingSpinner message="Loading activity..." />
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="activity-detail-container">
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchActivity(activityId!, moduleId!, courseId!))}
        />
      </div>
    );
  }

  // If no activity, show not found state
  if (!currentActivity) {
    return (
      <div className="activity-detail-container">
        <div className="activity-not-found">
          <h2>Activity Not Found</h2>
          <p>The activity you are looking for does not exist or you do not have access to it.</p>
          <Link
            to={`/courses/${courseId}`}
            className="btn btn-primary"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-detail-container">
      <ActivityHeader
        activity={currentActivity}
        courseId={courseId!}
        moduleId={moduleId!}
      />

      <div className="activity-content-container">
        <div className="activity-main">
          <ActivityContent
            activity={currentActivity}
          />

          {(currentActivity.type === 'assignment' || currentActivity.type === 'quiz') && (
            <ActivitySubmission
              activity={currentActivity}
              courseId={courseId!}
              moduleId={moduleId!}
            />
          )}

          {currentActivity.grade && (
            <ActivityFeedback
              grade={currentActivity.grade}
            />
          )}
        </div>

        <div className="activity-sidebar">
          <ActivityNavigation
            courseId={courseId!}
            moduleId={moduleId!}
            currentActivityId={activityId!}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModern;
```

### CSS Implementation

```css
/* ActivityDetail Component Styles - Simplified */

.activity-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.activity-content-container {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.activity-main {
  flex: 1;
  min-width: 0;
}

.activity-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.activity-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

/* Responsive styles */
@media (max-width: 992px) {
  .activity-content-container {
    flex-direction: column;
  }

  .activity-sidebar {
    width: 100%;
    order: -1;
  }
}
```

## Related Components

- [ActivityHeader](./ActivityHeader.md): Displays the activity title, due date, and points
- [ActivityContent](./ActivityContent.md): Renders the main content of the activity
- [ActivitySubmission](./ActivitySubmission.md): Provides submission functionality for assignments and quizzes
- [ActivityFeedback](./ActivityFeedback.md): Displays grades and feedback for graded activities
- [ActivityNavigation](./ActivityNavigation.md): Provides navigation between activities in a module
- [LoadingSpinner](../ui/LoadingSpinner.md): Used to indicate loading states
- [ErrorMessage](../ui/ErrorMessage.md): Displays error messages with retry functionality

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-activitydetailmodern--default).

The Storybook examples demonstrate:

- Different activity types (content, assignment, quiz, discussion)
- Loading state
- Error state
- Not found state
- Graded activity with feedback
- Responsive layout
- Different authentication states

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic activity display |
| 1.1.0 | Added support for different activity types |
| 1.2.0 | Added loading and error states |
| 1.3.0 | Added responsive layout |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added authentication integration |
| 2.2.0 | Improved accessibility |

## Technical Debt

The ActivityDetailModern component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Redux Coupling | Tightly coupled to Redux store structure | Makes the component less reusable | Accept activity data as a prop with Redux as a fallback | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Attributes | Component lacks proper ARIA attributes for screen readers | Reduces accessibility for screen reader users | Add aria-live="polite" and aria-busy="true" | High |
| A-002 | Focus Management | Focus is not properly managed when navigating between activities | May confuse screen reader users | Implement proper focus management | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Code Splitting | Implement code splitting for activity types | Reduces initial load time | Medium | Medium |
| RFO-002 | Memoization | Add memoization to prevent unnecessary re-renders | Improves performance | Low | Low |

For a complete technical debt analysis, see the [ActivityDetailModern Technical Debt Report](../technical-debt/ActivityDetailModern-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [ActivityDetailModern Version Compatibility Matrix](./ActivityDetailModern-version-compatibility.md)
