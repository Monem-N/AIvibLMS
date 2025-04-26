/**
 * PrivateRoute Component
 * 
 * Route guard that redirects to sign in if user is not authenticated.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }
  
  if (!isAuthenticated()) {
    // Redirect to sign in page with return URL
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
