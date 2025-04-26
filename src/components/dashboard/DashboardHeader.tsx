/**
 * DashboardHeader Component
 * 
 * Header component for the dashboard.
 * Displays user information and last login time.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types/user';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './DashboardHeader.css';

interface DashboardHeaderProps {
  user: User | null;
  lastLogin?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, lastLogin }) => {
  // Format last login time
  const formattedLastLogin = lastLogin ? formatDate(lastLogin) : 'Unknown';
  
  // Get user display name
  const displayName = user?.info?.displayName || user?.displayName || 'User';
  
  // Get user role
  const userRole = user?.info?.role || 'student';
  
  // Get formatted role
  const formattedRole = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrator';
      case 'instructor':
        return 'Instructor';
      case 'assistant':
        return 'Teaching Assistant';
      case 'student':
        return 'Student';
      default:
        return 'User';
    }
  };
  
  return (
    <div className="dashboard-header">
      <div className="dashboard-welcome">
        <h1>Welcome back, {displayName}!</h1>
        <p className="last-login">
          Last login: {formattedLastLogin}
        </p>
      </div>
      
      <div className="dashboard-user-info">
        <div className="user-role">{formattedRole()}</div>
        <div className="user-actions">
          <Link to="/profile" className="btn btn-outline">
            View Profile
          </Link>
          <Link to="/settings" className="btn btn-outline">
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
