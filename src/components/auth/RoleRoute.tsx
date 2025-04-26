/**
 * RoleRoute Component
 * 
 * Route guard that redirects to dashboard if user doesn't have required role.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface RoleRouteProps {
  children: React.ReactNode;
  roles: string[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, hasRole, loading } = useAuthContext();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner message="Checking permissions..." />;
  }
  
  if (!isAuthenticated()) {
    // Redirect to sign in page with return URL
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }
  
  if (!hasRole(roles)) {
    // Redirect to dashboard if user doesn't have required role
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default RoleRoute;
