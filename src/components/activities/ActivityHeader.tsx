/**
 * ActivityHeader Component
 * 
 * Displays the activity header with title, type, due date, and points.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../../types/course';
import { formatDate, isOverdue } from '../../utils/dateUtils';

// Import CSS
import './ActivityHeader.css';

interface ActivityHeaderProps {
  activity: Activity;
  courseId: string;
  moduleId: string;
}

const ActivityHeader: React.FC<ActivityHeaderProps> = ({ 
  activity, 
  courseId,
  moduleId
}) => {
  // Format due date
  const formattedDueDate = activity.dueDate 
    ? formatDate(activity.dueDate, { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }) 
    : null;
  
  // Check if activity is overdue
  const overdue = activity.dueDate ? isOverdue(activity.dueDate) : false;
  
  // Get activity type icon
  const getActivityTypeIcon = () => {
    switch (activity.type) {
      case 'content':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
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
      case 'assignment':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
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
            width="24" 
            height="24" 
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
            width="24" 
            height="24" 
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
        return null;
    }
  };
  
  // Get activity status badge
  const getStatusBadge = () => {
    switch (activity.status) {
      case 'completed':
        return <span className="badge badge-success">Completed</span>;
      case 'in-progress':
        return <span className="badge badge-primary">In Progress</span>;
      case 'not-started':
        return <span className="badge badge-secondary">Not Started</span>;
      default:
        return null;
    }
  };
  
  // Format activity type
  const formatActivityType = (type: string) => {
    switch (type) {
      case 'content':
        return 'Content';
      case 'assignment':
        return 'Assignment';
      case 'quiz':
        return 'Quiz';
      case 'discussion':
        return 'Discussion';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="activity-header">
      <div className="activity-header-top">
        <div className="activity-breadcrumbs">
          <Link to={`/courses/${courseId}`} className="breadcrumb-link">
            Course
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/courses/${courseId}`} className="breadcrumb-link">
            {activity.moduleTitle || 'Module'}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{activity.title}</span>
        </div>
        
        <div className="activity-actions">
          {activity.type === 'content' && (
            <button className="btn btn-outline">
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download</span>
            </button>
          )}
          
          <Link to={`/courses/${courseId}`} className="btn btn-outline">
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Course</span>
          </Link>
        </div>
      </div>
      
      <div className="activity-header-main">
        <div className="activity-type-icon">
          {getActivityTypeIcon()}
        </div>
        
        <div className="activity-info">
          <div className="activity-title-row">
            <h1 className="activity-title">{activity.title}</h1>
            {getStatusBadge()}
          </div>
          
          <div className="activity-meta">
            <div className="activity-type">
              {formatActivityType(activity.type)}
            </div>
            
            {activity.points !== undefined && (
              <div className="activity-points">
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
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                <span>{activity.points} points</span>
              </div>
            )}
            
            {formattedDueDate && (
              <div className={`activity-due-date ${overdue ? 'overdue' : ''}`}>
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>
                  {overdue ? 'Due date passed: ' : 'Due: '}
                  {formattedDueDate}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {activity.description && (
        <div className="activity-description">
          <p>{activity.description}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityHeader;
