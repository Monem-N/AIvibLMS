import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Import pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CourseList from '../pages/CourseList';
import CourseDetail from '../pages/CourseDetail';
import CourseCreate from '../pages/CourseCreate';
import CourseEdit from '../pages/CourseEdit';
import UserProfile from '../pages/UserProfile';
import AdminDashboard from '../pages/AdminDashboard';
import UserManagement from '../pages/UserManagement';
import Unauthorized from '../pages/Unauthorized';
import NotFound from '../pages/NotFound';

/**
 * Application routes configuration
 * Uses ProtectedRoute component to restrict access based on permissions
 */
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected routes - require authentication */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/courses" 
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/courses/:id" 
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - require specific permissions */}
          <Route 
            path="/courses/create" 
            element={
              <ProtectedRoute permission="create:courses">
                <CourseCreate />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/courses/:id/edit" 
            element={
              <ProtectedRoute permission="write:courses">
                <CourseEdit />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes - require admin role */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute roles="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute permission="manage:users">
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          
          {/* Default routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
