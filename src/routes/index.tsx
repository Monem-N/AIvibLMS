/**
 * Routes Configuration
 * 
 * Defines the application routes and their corresponding components.
 */

import React from 'react';
import { RouteObject } from 'react-router-dom';

// Page Components
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import CourseList from '../pages/CourseList';
import UserProfile from '../pages/UserProfile';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

// Admin Components
import AdminLayout from '../layouts/AdminLayout';
import DashboardModern from '../components/dashboard/DashboardModern';
import UserManagement from '../pages/admin/UserManagement';
import ContentManagement from '../pages/admin/ContentManagement';
import SystemSettings from '../pages/admin/SystemSettings';

// Auth Components
import PrivateRoute from '../components/auth/PrivateRoute';
import RoleRoute from '../components/auth/RoleRoute';

// Define routes
const routes: RouteObject[] = [
  // Public routes
  {
    path: '/signin',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  
  // Protected routes
  {
    path: '/',
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: '/courses',
    element: <PrivateRoute><CourseList /></PrivateRoute>
  },
  {
    path: '/profile',
    element: <PrivateRoute><UserProfile /></PrivateRoute>
  },
  {
    path: '/settings',
    element: <PrivateRoute><Settings /></PrivateRoute>
  },
  
  // Admin routes
  {
    path: '/admin/*',
    element: (
      <PrivateRoute>
        <RoleRoute roles={['admin']}>
          <AdminLayout />
        </RoleRoute>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardModern /> },
      { path: "users", element: <UserManagement /> },
      { path: "content", element: <ContentManagement /> },
      { path: "settings", element: <SystemSettings /> }
    ]
  },
  {
    path: '/instructor',
    element: <RoleRoute roles={['admin', 'instructor']}><Dashboard /></RoleRoute>
  },
  
  // Error routes
  {
    path: '/unauthorized',
    element: <Unauthorized />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
