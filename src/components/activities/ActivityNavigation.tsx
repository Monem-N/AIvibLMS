/**
 * ActivityNavigation Component
 * 
 * Displays navigation links to previous and next activities.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchModuleActivities } from '../../actions/activityActions';
import { Activity } from '../../types/course';

// Import CSS
import './ActivityNavigation.css';

interface ActivityNavigationProps {
  courseId: string;
  moduleId: string;
  currentActivityId: string;
}

const ActivityNavigation: React.FC<ActivityNavigationProps> = ({ 
  courseId,
  moduleId,
  currentActivityId
}) => {
  // State
  const [prevActivity, setPrevActivity] = useState<Activity | null>(null);
  const [nextActivity, setNextActivity] = useState<Activity | null>(null);
  
  // Redux
  const dispatch = useDispatch();
  const { moduleActivities, loading } = useSelector(
    (state: RootState) => state.activities
  );
  
  // Effect to fetch module activities
  useEffect(() => {
    dispatch(fetchModuleActivities(moduleId, courseId));
  }, [moduleId, courseId, dispatch]);
  
  // Effect to set previous and next activities
  useEffect(() => {
    if (moduleActivities && moduleActivities.length > 0) {
      // Sort activities by order
      const sortedActivities = [...moduleActivities].sort((a, b) => a.order - b.order);
      
      // Find current activity index
      const currentIndex = sortedActivities.findIndex(
        activity => activity.id === currentActivityId
      );
      
      // Set previous and next activities
      if (currentIndex > 0) {
        setPrevActivity(sortedActivities[currentIndex - 1]);
      } else {
        setPrevActivity(null);
      }
      
      if (currentIndex < sortedActivities.length - 1) {
        setNextActivity(sortedActivities[currentIndex + 1]);
      } else {
        setNextActivity(null);
      }
    }
  }, [moduleActivities, currentActivityId]);
  
  // Get activity type icon
  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'content':
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
        return null;
    }
  };
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="activity-navigation">
        <div className="navigation-loading">
          <div className="spinner-small"></div>
          <span>Loading navigation...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="activity-navigation">
      <h3 className="navigation-title">Activity Navigation</h3>
      
      <div className="navigation-links">
        {prevActivity ? (
          <Link 
            to={`/courses/${courseId}/modules/${moduleId}/activities/${prevActivity.id}`}
            className="nav-link prev"
          >
            <div className="nav-arrow">
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
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </div>
            <div className="nav-content">
              <span className="nav-label">Previous</span>
              <div className="nav-activity">
                <div className="activity-type-icon">
                  {getActivityTypeIcon(prevActivity.type)}
                </div>
                <span className="activity-title">{prevActivity.title}</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="nav-link disabled">
            <div className="nav-arrow">
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
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </div>
            <div className="nav-content">
              <span className="nav-label">Previous</span>
              <span className="nav-empty">No previous activity</span>
            </div>
          </div>
        )}
        
        {nextActivity ? (
          <Link 
            to={`/courses/${courseId}/modules/${moduleId}/activities/${nextActivity.id}`}
            className="nav-link next"
          >
            <div className="nav-content">
              <span className="nav-label">Next</span>
              <div className="nav-activity">
                <div className="activity-type-icon">
                  {getActivityTypeIcon(nextActivity.type)}
                </div>
                <span className="activity-title">{nextActivity.title}</span>
              </div>
            </div>
            <div className="nav-arrow">
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </Link>
        ) : (
          <div className="nav-link disabled">
            <div className="nav-content">
              <span className="nav-label">Next</span>
              <span className="nav-empty">No next activity</span>
            </div>
            <div className="nav-arrow">
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="module-link">
        <Link to={`/courses/${courseId}`} className="btn btn-outline btn-block">
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Back to Course</span>
        </Link>
      </div>
    </div>
  );
};

export default ActivityNavigation;
