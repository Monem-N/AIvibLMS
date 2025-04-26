/**
 * CourseModules Component
 * 
 * Displays the course modules and activities.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Module, Activity } from '../../types/course';

// Import CSS
import './CourseModules.css';

interface CourseModulesProps {
  modules: Module[];
  courseId: string;
}

const CourseModules: React.FC<CourseModulesProps> = ({ modules, courseId }) => {
  // State for expanded modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    // Initialize with first module expanded
    modules.length > 0 ? { [modules[0].id]: true } : {}
  );
  
  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
  // Expand all modules
  const expandAll = () => {
    const expanded: Record<string, boolean> = {};
    modules.forEach(module => {
      expanded[module.id] = true;
    });
    setExpandedModules(expanded);
  };
  
  // Collapse all modules
  const collapseAll = () => {
    setExpandedModules({});
  };
  
  // If no modules, show empty state
  if (modules.length === 0) {
    return (
      <div className="course-modules">
        <div className="modules-empty">
          <h3>No Modules Available</h3>
          <p>This course does not have any modules yet.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="course-modules">
      <div className="modules-header">
        <h2 className="modules-title">Course Content</h2>
        <div className="modules-actions">
          <button 
            className="btn btn-text"
            onClick={expandAll}
          >
            Expand All
          </button>
          <button 
            className="btn btn-text"
            onClick={collapseAll}
          >
            Collapse All
          </button>
        </div>
      </div>
      
      <div className="modules-list">
        {modules.map(module => (
          <ModuleItem 
            key={module.id}
            module={module}
            courseId={courseId}
            expanded={!!expandedModules[module.id]}
            onToggle={() => toggleModule(module.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface ModuleItemProps {
  module: Module;
  courseId: string;
  expanded: boolean;
  onToggle: () => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ 
  module, 
  courseId,
  expanded,
  onToggle
}) => {
  // Calculate module progress
  const progress = module.progress || 0;
  
  // Get module status icon
  const getStatusIcon = () => {
    switch (module.status) {
      case 'completed':
        return (
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
            className="module-status-icon completed"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'unlocked':
        return (
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
            className="module-status-icon unlocked"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        );
      case 'locked':
        return (
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
            className="module-status-icon locked"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={`module-item ${expanded ? 'expanded' : ''}`}>
      <div 
        className="module-header"
        onClick={onToggle}
      >
        <div className="module-header-left">
          <div className="module-status">
            {getStatusIcon()}
          </div>
          <div className="module-info">
            <h3 className="module-title">{module.title}</h3>
            <div className="module-meta">
              <span className="module-activities-count">
                {module.activities?.length || 0} activities
              </span>
              <span className="module-progress">
                {progress}% complete
              </span>
            </div>
          </div>
        </div>
        
        <div className="module-header-right">
          <div className="module-progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <button className="module-toggle">
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
              className={`chevron-icon ${expanded ? 'up' : 'down'}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="module-content">
          {module.description && (
            <div className="module-description">
              <p>{module.description}</p>
            </div>
          )}
          
          <div className="activities-list">
            {module.activities?.map(activity => (
              <ActivityItem 
                key={activity.id}
                activity={activity}
                courseId={courseId}
                moduleId={module.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ActivityItemProps {
  activity: Activity;
  courseId: string;
  moduleId: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ 
  activity, 
  courseId,
  moduleId
}) => {
  // Get activity type icon
  const getActivityTypeIcon = () => {
    switch (activity.type) {
      case 'content':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
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
            width="18" 
            height="18" 
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
            width="18" 
            height="18" 
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
            width="18" 
            height="18" 
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
  
  // Get activity status icon
  const getActivityStatusIcon = () => {
    switch (activity.status) {
      case 'completed':
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
            className="activity-status-icon completed"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'in-progress':
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
            className="activity-status-icon in-progress"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case 'not-started':
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
            className="activity-status-icon not-started"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <Link 
      to={`/courses/${courseId}/modules/${moduleId}/activities/${activity.id}`}
      className={`activity-item ${activity.status}`}
    >
      <div className="activity-icon-container">
        {getActivityTypeIcon()}
      </div>
      
      <div className="activity-info">
        <div className="activity-title-row">
          <h4 className="activity-title">{activity.title}</h4>
          <div className="activity-status">
            {getActivityStatusIcon()}
            <span className="activity-status-text">
              {activity.status === 'completed' ? 'Completed' : 
               activity.status === 'in-progress' ? 'In Progress' : 
               'Not Started'}
            </span>
          </div>
        </div>
        
        {activity.description && (
          <p className="activity-description">{activity.description}</p>
        )}
        
        <div className="activity-meta">
          {activity.type && (
            <span className="activity-type">
              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
            </span>
          )}
          
          {activity.points && (
            <span className="activity-points">
              {activity.points} points
            </span>
          )}
          
          {activity.dueDate && (
            <span className="activity-due-date">
              Due: {new Date(activity.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseModules;
