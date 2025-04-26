/**
 * App Component
 *
 * Main application component with routing.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Auth Context Provider
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Components
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

// Dashboard Components
import DashboardModern from './components/dashboard/DashboardModern';

// Course Components
import CourseListModern from './components/courses/CourseListModern';
import CourseDetailModern from './components/courses/CourseDetailModern';
import CourseEditorModern from './components/courses/editor/CourseEditorModern';
import ActivityDetailModern from './components/activities/ActivityDetailModern';

// Grading Components
import GradingDashboardModern from './components/grading/GradingDashboardModern';
import SubmissionGraderModern from './components/grading/SubmissionGraderModern';

// User Components
import ProfileModern from './components/users/ProfileModern';
import SettingsModern from './components/users/SettingsModern';

// Error Components
import NotFound from './components/errors/NotFound';

// Route Guards
import PrivateRoute from './components/auth/PrivateRoute';
import RoleRoute from './components/auth/RoleRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Main App Routes */}
              <Route element={<MainLayout />}>
                {/* Dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardModern />
                    </PrivateRoute>
                  }
                />

                {/* Courses */}
                <Route path="/courses" element={<CourseListModern />} />
                <Route path="/courses/:courseId" element={<CourseDetailModern />} />
                <Route
                  path="/courses/new"
                  element={
                    <RoleRoute roles={['instructor', 'admin']}>
                      <CourseEditorModern />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/courses/:courseId/edit"
                  element={
                    <RoleRoute roles={['instructor', 'admin']}>
                      <CourseEditorModern />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/courses/:courseId/modules/:moduleId/activities/:activityId"
                  element={<ActivityDetailModern />}
                />

                {/* Grading Routes */}
                <Route
                  path="/courses/:courseId/grading"
                  element={
                    <RoleRoute roles={['instructor', 'admin']}>
                      <GradingDashboardModern />
                    </RoleRoute>
                  }
                />
                <Route
                  path="/courses/:courseId/grading/:submissionId"
                  element={
                    <RoleRoute roles={['instructor', 'admin']}>
                      <SubmissionGraderModern />
                    </RoleRoute>
                  }
                />

                {/* User */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfileModern />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <SettingsModern />
                    </PrivateRoute>
                  }
                />

                {/* Error Routes */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
