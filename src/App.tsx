/**
 * App Component
 *
 * Main application component with routing.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Hybrid Initializer for Firebase and Supabase
import HybridInitializer from './components/core/HybridInitializer';

// Auth Context Provider
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationModern from './components/common/NotificationModern';

// Layout Components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

// Page Components
import LoginWithGoogle from './pages/LoginWithGoogle';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import CourseList from './pages/CourseList';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import AdminSetup from './pages/AdminSetup';
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseManagement from './pages/admin/CourseManagement';
import ContentManagement from './pages/admin/ContentManagement';
import SystemSettings from './pages/admin/SystemSettings';

// Course Components
import CourseDetailModern from './components/courses/CourseDetailModern';
import CourseEditorModern from './components/courses/editor/CourseEditorModern';
import ActivityDetailModern from './components/activities/ActivityDetailModern';

// Grading Components
import GradingDashboardModern from './components/grading/GradingDashboardModern';
import SubmissionGraderModern from './components/grading/SubmissionGraderModern';

// Test Components
import FileUploadTest from './components/test/FileUploadTest';

// Route Guards
import PrivateRoute from './components/auth/PrivateRoute';
import RoleRoute from './components/auth/RoleRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HybridInitializer>
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <Routes>
              {/* Root Redirect */}
              <Route path="/" element={<Navigate to="/signin" replace />} />

              {/* Auth Routes */}
              <Route path="/signin" element={<LoginWithGoogle />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Main App Routes */}
              <Route element={<MainLayout />}>
                {/* Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                {/* Courses */}
                <Route path="/courses" element={<CourseList />} />
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
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />

                {/* Test Routes */}
                <Route path="/test/file-upload" element={<FileUploadTest />} />

                {/* Admin Routes */}
                <Route path="/admin-setup" element={<AdminSetup />} />
              </Route>

              {/* Admin Routes - Outside MainLayout but wrapped in AdminLayout */}
              <Route element={<AdminLayout />}>
                <Route
                  path="/admin"
                  element={
                    <RoleBasedRoute requiredRole="admin">
                      <AdminDashboard />
                    </RoleBasedRoute>
                  }
                />

                <Route
                  path="/admin/users"
                  element={
                    <RoleBasedRoute requiredRole="admin">
                      <UserManagement />
                    </RoleBasedRoute>
                  }
                />

                <Route
                  path="/admin/courses"
                  element={
                    <RoleBasedRoute requiredRole="admin">
                      <CourseManagement />
                    </RoleBasedRoute>
                  }
                />

                <Route
                  path="/admin/content"
                  element={
                    <RoleBasedRoute requiredRole="admin">
                      <ContentManagement />
                    </RoleBasedRoute>
                  }
                />

                <Route
                  path="/admin/settings"
                  element={
                    <RoleBasedRoute requiredRole="admin">
                      <SystemSettings />
                    </RoleBasedRoute>
                  }
                />
              </Route>

              {/* Error Routes */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </HybridInitializer>
    </Provider>
  );
};

export default App;
