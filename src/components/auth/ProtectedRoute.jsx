import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { hasPermission, hasRole, hasLevel } from '../../utils/auth';

/**
 * ProtectedRoute component that restricts access based on authentication and authorization
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The child components to render if authorized
 * @param {string} [props.permission] - The permission required to access the route
 * @param {string|string[]} [props.roles] - The role(s) required to access the route
 * @param {number} [props.level] - The minimum level required to access the route
 * @param {string} [props.redirectTo='/login'] - The path to redirect to if unauthorized
 * @returns {React.ReactNode} - The protected component or redirect
 */
const ProtectedRoute = ({ 
  children, 
  permission, 
  roles, 
  level,
  redirectTo = '/login' 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check permission if specified
  if (permission && !hasPermission(user, permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check role if specified
  if (roles && !hasRole(user, roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check level if specified
  if (level && !hasLevel(user, level)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized
  return children;
};

export default ProtectedRoute;
