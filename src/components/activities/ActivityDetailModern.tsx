/**
 * ActivityDetailModern Component
 * 
 * Modern activity detail component using functional components and hooks.
 * Displays activity content, submission form, and feedback.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchActivity } from '../../actions/activityActions';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';
import ActivityHeader from './ActivityHeader';
import ActivityContent from './ActivityContent';
import ActivitySubmission from './ActivitySubmission';
import ActivityFeedback from './ActivityFeedback';
import ActivityNavigation from './ActivityNavigation';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './ActivityDetail.css';

const ActivityDetailModern: React.FC = () => {
  // Get activity ID from URL params
  const { courseId, moduleId, activityId } = useParams<{ 
    courseId: string;
    moduleId: string;
    activityId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Hooks
  const { user, isAuthenticated } = useAuthContext();
  const { showError } = useNotification();
  
  // Redux state
  const { currentActivity, loading, error } = useSelector(
    (state: RootState) => state.activities
  );
  
  // Effect to fetch activity data
  useEffect(() => {
    if (!courseId || !moduleId || !activityId) {
      showError('Activity information is missing');
      navigate(`/courses/${courseId}`);
      return;
    }
    
    if (!isAuthenticated()) {
      navigate('/signin', { 
        state: { from: `/courses/${courseId}/modules/${moduleId}/activities/${activityId}` } 
      });
      return;
    }
    
    dispatch(fetchActivity(activityId, moduleId, courseId));
  }, [activityId, moduleId, courseId, dispatch, isAuthenticated, navigate, showError]);
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="activity-detail-container">
        <LoadingSpinner message="Loading activity..." />
      </div>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <div className="activity-detail-container">
        <ErrorMessage 
          message={error} 
          onRetry={() => dispatch(fetchActivity(activityId!, moduleId!, courseId!))}
        />
      </div>
    );
  }
  
  // If no activity, show not found state
  if (!currentActivity) {
    return (
      <div className="activity-detail-container">
        <div className="activity-not-found">
          <h2>Activity Not Found</h2>
          <p>The activity you are looking for does not exist or you do not have access to it.</p>
          <Link 
            to={`/courses/${courseId}`}
            className="btn btn-primary"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="activity-detail-container">
      <ActivityHeader 
        activity={currentActivity}
        courseId={courseId!}
        moduleId={moduleId!}
      />
      
      <div className="activity-content-container">
        <div className="activity-main">
          <ActivityContent 
            activity={currentActivity}
          />
          
          {(currentActivity.type === 'assignment' || currentActivity.type === 'quiz') && (
            <ActivitySubmission 
              activity={currentActivity}
              courseId={courseId!}
              moduleId={moduleId!}
            />
          )}
          
          {currentActivity.grade && (
            <ActivityFeedback 
              grade={currentActivity.grade}
            />
          )}
        </div>
        
        <div className="activity-sidebar">
          <ActivityNavigation 
            courseId={courseId!}
            moduleId={moduleId!}
            currentActivityId={activityId!}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModern;
