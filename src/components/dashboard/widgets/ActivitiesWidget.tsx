/**
 * ActivitiesWidget Component
 * 
 * Widget for displaying user's upcoming activities on the dashboard.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardWidget from '../DashboardWidget';
import { Activity } from '../../../types/course';
import { formatDate, isOverdue } from '../../../utils/dateUtils';

// Import CSS
import './ActivitiesWidget.css';

interface ActivitiesWidgetProps {
  activities: Activity[];
  className?: string;
}

const ActivitiesWidget: React.FC<ActivitiesWidgetProps> = ({ activities, className = '' }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sort activities by due date (closest first)
  const sortedActivities = [...activities].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
  
  // Get upcoming activities (limit to 5)
  const upcomingActivities = sortedActivities
    .filter(activity => activity.dueDate)
    .slice(0, 5);
  
  // Handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setIsLoading(false);
    } catch (error) {
      console.error('Error refreshing activities:', error);
      setError('Failed to refresh activities. Please try again later.');
      setIsLoading(false);
    }
  };
  
  // Widget icon
  const icon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  );
  
  // Widget footer
  const footer = (
    <Link to="/activities" className="widget-link">
      View All Activities
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </Link>
  );
  
  return (
    <DashboardWidget
      title="Upcoming Activities"
      icon={icon}
      className={`activities-widget ${className}`}
      loading={isLoading}
      error={error}
      onRefresh={handleRefresh}
      footer={footer}
      color="#f5a623"
    >
      {upcomingActivities.length === 0 ? (
        <div className="activities-empty">
          <p>No upcoming activities.</p>
        </div>
      ) : (
        <div className="activities-list">
          {upcomingActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </DashboardWidget>
  );
};

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  // Format due date
  const formattedDueDate = activity.dueDate ? formatDate(activity.dueDate) : 'No due date';
  
  // Check if activity is overdue
  const overdue = activity.dueDate ? isOverdue(activity.dueDate) : false;
  
  // Get activity type icon
  const getActivityTypeIcon = () => {
    switch (activity.type) {
      case 'assignment':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="activity-icon assignment"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'quiz':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="activity-icon quiz"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'discussion':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="activity-icon discussion"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      default:
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="activity-icon content"
          >
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
        );
    }
  };
  
  return (
    <Link to={`/activities/${activity.id}`} className="activity-item">
      <div className="activity-icon-container">
        {getActivityTypeIcon()}
      </div>
      
      <div className="activity-details">
        <h4 className="activity-title">{activity.title}</h4>
        <p className="activity-module">{activity.moduleTitle}</p>
        
        <div className="activity-meta">
          <span className={`activity-due-date ${overdue ? 'overdue' : ''}`}>
            {overdue ? 'Overdue: ' : 'Due: '}
            {formattedDueDate}
          </span>
          
          {activity.points && (
            <span className="activity-points">
              {activity.points} points
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ActivitiesWidget;
