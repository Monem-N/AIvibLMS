# CourseDetailModern

The CourseDetailModern component is used in the Hypatia LMS for displaying detailed information about a specific course, including its modules, resources, announcements, and participants.

## Description

The CourseDetailModern component is a comprehensive course detail page that serves as the main interface for students and instructors to interact with course content. It is a functional component built with React hooks that fetches and displays course data, manages tab navigation between different course sections, and handles various states such as loading, error, and not found. The component integrates with Redux for state management, React Router for navigation, and custom hooks for authentication and notifications. It provides a responsive and accessible interface for viewing course information and accessing course materials.

## Visual Examples

### Course Detail Page - Modules Tab

<!-- Note: Replace with actual screenshot when available -->
![Course Detail - Modules Tab](https://via.placeholder.com/800x500?text=Course+Detail+-+Modules+Tab)

The course detail page showing the modules tab with a list of course modules and activities

### Course Detail Page - Resources Tab

<!-- Note: Replace with actual screenshot when available -->
![Course Detail - Resources Tab](https://via.placeholder.com/800x500?text=Course+Detail+-+Resources+Tab)

The course detail page showing the resources tab with a list of course resources

### Course Detail Page - Loading State

<!-- Note: Replace with actual screenshot when available -->
![Course Detail - Loading State](https://via.placeholder.com/800x500?text=Course+Detail+-+Loading+State)

The course detail page in loading state with a loading spinner

### Course Detail Page - Error State

<!-- Note: Replace with actual screenshot when available -->
![Course Detail - Error State](https://via.placeholder.com/800x500?text=Course+Detail+-+Error+State)

The course detail page showing an error message when the course cannot be loaded

## Import

```tsx
import { CourseDetailModern } from 'components/courses/CourseDetailModern';
```

Note: The actual import in the codebase is a default export, so you would use:

```tsx
import CourseDetailModern from 'components/courses/CourseDetailModern';
```

## Usage

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import CourseDetailModern from 'components/courses/CourseDetailModern';

// The component requires several context providers and should be used within a Router
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/courses/:courseId" element={<CourseDetailModern />} />
              {/* Other routes */}
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  );
};
```

Note that CourseDetailModern doesn't accept any props directly. It retrieves the course ID from the URL parameters using React Router's `useParams` hook and fetches the course data from Redux.

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| N/A | N/A | N/A | N/A | The CourseDetailModern component doesn't accept any props directly. It retrieves the course ID from the URL parameters using React Router's `useParams` hook and fetches the course data from Redux. |

### URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| courseId | string | Yes | The ID of the course to display |

### Redux State

The component uses the following Redux state:

| State | Type | Description |
|-------|------|-------------|
| currentCourse | Course | The current course data |
| loading | boolean | Whether the course data is being loaded |
| error | string | Error message if the course data failed to load |

## Type Definitions

```tsx
/**
 * Course Interface
 * Represents a course in the Hypatia LMS
 */
export interface Course {
  id: string;
  title: string;
  slug?: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdBy?: string;
  instructor?: {
    id: string;
    name: string;
    avatar?: string;
  };
  instructors?: string[];
  startDate?: string;
  endDate?: string;
  subjects?: string[];
  modules?: Module[];
  resources?: Attachment[];
  thumbnail?: string;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  credits?: number;
  syllabus?: string;
  prerequisites?: string[];
  enrollmentType?: 'open' | 'invite' | 'approval';
  maxEnrollment?: number;
  selfPaced?: boolean;
  visibility?: 'public' | 'unlisted' | 'private';
  featured?: boolean;
  completionCriteria?: 'all-activities' | 'required-activities' | 'percentage' | 'final-exam';
  completionPercentage?: number;
  certificateEnabled?: boolean;
  language?: string;
  tags?: string[];
  discussionEnabled?: boolean;
  peerReviewEnabled?: boolean;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Module Interface
 * Represents a module within a course
 */
export interface Module {
  id: string;
  title: string;
  description?: string;
  courseId?: string;
  order: number;
  status?: 'locked' | 'unlocked';
  activities?: Activity[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Activity Interface
 * Represents an activity within a module
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
 * Attachment Interface
 * Represents a file attachment
 */
export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

/**
 * RootState Interface (from Redux)
 * Represents the root state of the Redux store
 */
export interface RootState {
  courses: {
    currentCourse: Course | null;
    loading: boolean;
    error: string | null;
    courses: Course[];
  };
  // Other state slices...
}

/**
 * AuthContextValue Interface (from AuthContext)
 * Represents the value of the AuthContext
 */
export interface AuthContextValue {
  user: User | null;
  isAuthenticated: () => boolean;
  isVerified: () => boolean;
  // Other auth methods...
}

/**
 * NotificationHookReturn Interface (from useNotification)
 * Represents the return value of the useNotification hook
 */
export interface NotificationHookReturn {
  showNotification: (notification: Notification) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}
```

## Examples

### Basic Example

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import CourseDetailModern from 'components/courses/CourseDetailModern';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/courses/:courseId" element={<CourseDetailModern />} />
        </Routes>
      </Router>
    </Provider>
  );
};
```

### Example with Authentication

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import CourseDetailModern from 'components/courses/CourseDetailModern';
import PrivateRoute from './components/auth/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route
                path="/courses/:courseId"
                element={
                  <PrivateRoute>
                    <CourseDetailModern />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  );
};
```

### Example with Navigation

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import CourseDetailModern from 'components/courses/CourseDetailModern';
import TopNavModern from './components/navigation/TopNavModern';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <div className="app-container">
              <TopNavModern />
              <main className="main-content">
                <Routes>
                  <Route path="/courses/:courseId" element={<CourseDetailModern />} />
                  {/* Other routes */}
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  );
};
```

## Features

1. **Tabbed Navigation**: Provides tabbed navigation between different course sections (modules, resources, announcements, participants)
2. **Course Header**: Displays course title, description, instructor information, and other course metadata
3. **Course Modules**: Shows a list of course modules with their activities
4. **Course Resources**: Displays a list of course resources with download links
5. **Course Announcements**: Shows course announcements with timestamps and author information
6. **Course Participants**: Lists course participants with their roles and contact information
7. **Loading State**: Shows a loading spinner while course data is being fetched
8. **Error Handling**: Displays error messages when course data cannot be loaded
9. **Not Found State**: Shows a "Course Not Found" message when the course doesn't exist or the user doesn't have access
10. **Authentication Check**: Redirects to the sign-in page if the user is not authenticated
11. **Responsive Design**: Adapts to different screen sizes with responsive styling

## Accessibility

The CourseDetailModern component is designed with accessibility in mind to ensure all users, including those with disabilities, can access and interact with course content effectively.

### Keyboard Navigation

- All interactive elements (tabs, buttons, links) are keyboard accessible
- Tab order follows a logical flow through the component
- Focus is properly managed when switching between tabs
- The component respects the user's tab order preferences

### Screen Reader Support

- Semantic HTML elements are used to provide structure and meaning to screen readers
- The component uses appropriate heading levels to create a logical document outline
- Loading and error states are announced to screen readers
- Tab changes are announced to screen readers

### ARIA Attributes

- Tabs use `aria-selected` to indicate the active tab
- Loading spinner uses `aria-live="polite"` to announce loading state
- Error messages use `aria-live="assertive"` to announce errors
- "Course Not Found" state uses appropriate ARIA attributes to convey the message

### Color Contrast

- Text elements have sufficient contrast with their backgrounds (meeting WCAG AA standards)
- Interactive elements have visible focus indicators
- Error messages use colors that meet contrast requirements
- The component respects the user's color scheme preferences

### Focus Management

- Focus is properly managed when navigating between tabs
- Focus is trapped within modal dialogs (if any)
- Focus is returned to a logical position after actions are completed
- Focus indicators are visible and clear

## Edge Cases

- **Missing Course ID**: Redirects to the courses list page with an error notification
- **User Not Authenticated**: Redirects to the sign-in page with a return URL to the course detail page
- **Course Not Found**: Displays a "Course Not Found" message with a button to return to the courses list
- **Loading State**: Shows a loading spinner while course data is being fetched
- **Error State**: Displays an error message with a retry button when course data cannot be loaded
- **Empty Modules**: Handles courses with no modules by showing an appropriate message
- **Empty Resources**: Handles courses with no resources by showing an appropriate message
- **Empty Announcements**: Handles courses with no announcements by showing an appropriate message
- **Empty Participants**: Handles courses with no participants by showing an appropriate message
- **Network Errors**: Handles network errors when fetching course data
- **Permission Errors**: Handles permission errors when the user doesn't have access to the course
- **Mobile Devices**: Adapts layout for smaller screens, stacking elements vertically

## Implementation Details

The CourseDetailModern component is implemented using React with TypeScript. It uses React hooks for state management, React Router for navigation, Redux for data fetching, and custom hooks for authentication and notifications.

```tsx
// Simplified implementation
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchCourse } from '../../actions/courseActions';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';
import CourseHeader from './CourseHeader';
import CourseModules from './CourseModules';
import CourseResources from './CourseResources';
import CourseAnnouncements from './CourseAnnouncements';
import CourseParticipants from './CourseParticipants';
import CourseTabs from './CourseTabs';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './CourseDetail.css';

const CourseDetailModern: React.FC = () => {
  // Get course ID from URL params
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [activeTab, setActiveTab] = useState<string>('modules');

  // Hooks
  const { user, isAuthenticated } = useAuthContext();
  const { showError } = useNotification();

  // Redux state
  const { currentCourse, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  // Effect to fetch course data
  useEffect(() => {
    if (!courseId) {
      showError('Course ID is missing');
      navigate('/courses');
      return;
    }

    if (!isAuthenticated()) {
      navigate('/signin', { state: { from: `/courses/${courseId}` } });
      return;
    }

    dispatch(fetchCourse(courseId));
  }, [courseId, dispatch, isAuthenticated, navigate, showError]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // If loading, show loading state
  if (loading) {
    return (
      <div className="course-detail-container">
        <LoadingSpinner message="Loading course..." />
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="course-detail-container">
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchCourse(courseId!))}
        />
      </div>
    );
  }

  // If no course, show not found state
  if (!currentCourse) {
    return (
      <div className="course-detail-container">
        <div className="course-not-found">
          <h2>Course Not Found</h2>
          <p>The course you are looking for does not exist or you do not have access to it.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/courses')}
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      <CourseHeader course={currentCourse} />

      <CourseTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        course={currentCourse}
      />

      <div className="course-content">
        {activeTab === 'modules' && (
          <CourseModules
            modules={currentCourse.modules || []}
            courseId={currentCourse.id}
          />
        )}

        {activeTab === 'resources' && (
          <CourseResources
            resources={currentCourse.resources || []}
            courseId={currentCourse.id}
          />
        )}

        {activeTab === 'announcements' && (
          <CourseAnnouncements
            courseId={currentCourse.id}
          />
        )}

        {activeTab === 'participants' && (
          <CourseParticipants
            courseId={currentCourse.id}
          />
        )}
      </div>
    </div>
  );
};

export default CourseDetailModern;
```

### CSS Implementation

```css
/* Simplified CourseDetail Component Styles */

.course-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.course-content {
  margin-top: 1.5rem;
}

.course-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}

.course-not-found h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
}

.course-not-found p {
  color: #666;
  margin: 0 0 1.5rem 0;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

/* Responsive styles */
@media (max-width: 768px) {
  .course-detail-container {
    padding: 1rem;
  }
}
```

## Related Components

- [CourseHeader](./CourseHeader.md): Displays course title, description, instructor information, and other course metadata
- [CourseModules](./CourseModules.md): Shows a list of course modules with their activities
- [CourseResources](./CourseResources.md): Displays a list of course resources with download links
- [CourseAnnouncements](./CourseAnnouncements.md): Shows course announcements with timestamps and author information
- [CourseParticipants](./CourseParticipants.md): Lists course participants with their roles and contact information
- [CourseTabs](./CourseTabs.md): Provides tabbed navigation between different course sections
- [LoadingSpinner](../ui/LoadingSpinner.md): Shows a loading spinner while course data is being fetched
- [ErrorMessage](../ui/ErrorMessage.md): Displays error messages when course data cannot be loaded
- [ActivityDetailModern](../activity/ActivityDetailModern.md): Displays activity details when a user clicks on an activity in the course modules

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/feature-specific-coursedetailmodern--default).

The Storybook examples demonstrate:

- Default course detail page with modules tab
- Course detail page with resources tab
- Course detail page with announcements tab
- Course detail page with participants tab
- Course detail page in loading state
- Course detail page with error state
- Course detail page with "Course Not Found" state
- Course detail page on mobile devices

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic course detail functionality |
| 1.1.0 | Added tabbed navigation between course sections |
| 1.2.0 | Added loading and error states |
| 1.3.0 | Added "Course Not Found" state |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added authentication check |
| 2.2.0 | Added responsive design for mobile devices |
| 2.3.0 | Added accessibility improvements |

## Technical Debt

The CourseDetailModern component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Redux Integration | Uses Redux for state management instead of React Query | Makes data fetching more complex and less efficient | Consider using React Query for data fetching | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Tab Announcements | Tab changes are not properly announced to screen readers | Reduces accessibility for screen reader users | Add aria-live regions for tab changes | High |
| A-002 | Focus Management | Focus is not properly managed when switching between tabs | Makes keyboard navigation difficult | Improve focus management when switching tabs | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Code Splitting | Split the component into smaller, more focused components | Improves maintainability and reduces bundle size | Medium | Medium |
| RFO-002 | Data Caching | Implement data caching to reduce unnecessary API calls | Improves performance and reduces server load | Medium | Medium |

For a complete technical debt analysis, see the [CourseDetailModern Technical Debt Report](../technical-debt/CourseDetailModern-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [CourseDetailModern Version Compatibility Matrix](./CourseDetailModern-version-compatibility.md)
