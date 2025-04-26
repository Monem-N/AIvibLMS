/**
 * ProtectedRoute Component
 * 
 * Component to protect routes that require authentication.
 * Redirects to sign in page if user is not authenticated.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireVerified = false 
}) => {
  const { user, loading, initialized, isAuthenticated, isVerified } = useAuthContext();
  const location = useLocation();
  
  // If auth is not initialized yet, show loading
  if (!initialized) {
    return <div className="loading">Loading...</div>;
  }
  
  // If user is not authenticated, redirect to sign in page
  if (!isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  // If verification is required and user is not verified, redirect to verification page
  if (requireVerified && !isVerified()) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }
  
  // If user is authenticated (and verified if required), render children
  return <>{children}</>;
};

export default ProtectedRoute;
