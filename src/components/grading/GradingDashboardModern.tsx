/**
 * GradingDashboardModern Component
 * 
 * Modern grading dashboard component using functional components and hooks.
 * Displays submissions that need grading and allows instructors to grade them.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchCourse } from '../../actions/courseActions';
import { fetchPendingSubmissions } from '../../actions/gradingActions';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';
import GradingHeader from './GradingHeader';
import GradingFilters from './GradingFilters';
import SubmissionsList from './SubmissionsList';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './GradingDashboard.css';

const GradingDashboardModern: React.FC = () => {
  // Get course ID from URL params
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State
  const [filters, setFilters] = useState({
    moduleId: '',
    activityType: '',
    status: 'pending',
    search: ''
  });
  
  // Hooks
  const { user, isAuthenticated, hasRole } = useAuthContext();
  const { showError } = useNotification();
  
  // Redux state
  const { currentCourse, loading: courseLoading, error: courseError } = useSelector(
    (state: RootState) => state.courses
  );
  
  const { submissions, loading: submissionsLoading, error: submissionsError } = useSelector(
    (state: RootState) => state.grading
  );
  
  // Effect to check authentication and permissions
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin', { state: { from: `/courses/${courseId}/grading` } });
      return;
    }
    
    // Check if user has instructor or admin role
    if (!hasRole(['instructor', 'admin'])) {
      showError('You do not have permission to access the grading dashboard');
      navigate(`/courses/${courseId}`);
      return;
    }
  }, [isAuthenticated, hasRole, navigate, courseId, showError]);
  
  // Effect to fetch course data
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourse(courseId));
    }
  }, [courseId, dispatch]);
  
  // Effect to fetch pending submissions
  useEffect(() => {
    if (courseId) {
      dispatch(fetchPendingSubmissions(courseId, filters));
    }
  }, [courseId, filters, dispatch]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  // If loading, show loading state
  if (courseLoading) {
    return (
      <div className="grading-dashboard-container">
        <LoadingSpinner message="Loading course..." />
      </div>
    );
  }
  
  // If error, show error state
  if (courseError) {
    return (
      <div className="grading-dashboard-container">
        <ErrorMessage 
          message={courseError} 
          onRetry={() => dispatch(fetchCourse(courseId!))}
        />
      </div>
    );
  }
  
  // If no course, show not found state
  if (!currentCourse) {
    return (
      <div className="grading-dashboard-container">
        <div className="course-not-found">
          <h2>Course Not Found</h2>
          <p>The course you are looking for does not exist or you do not have access to it.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/courses')}
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grading-dashboard-container">
      <GradingHeader 
        course={currentCourse}
        submissionsCount={submissions.length}
      />
      
      <div className="grading-dashboard-content">
        <GradingFilters 
          course={currentCourse}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <div className="grading-submissions-container">
          {submissionsLoading ? (
            <LoadingSpinner message="Loading submissions..." />
          ) : submissionsError ? (
            <ErrorMessage 
              message={submissionsError} 
              onRetry={() => dispatch(fetchPendingSubmissions(courseId!, filters))}
            />
          ) : submissions.length === 0 ? (
            <div className="no-submissions">
              <div className="empty-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>No Submissions to Grade</h3>
              <p>There are no submissions that match your current filters.</p>
              <button 
                className="btn btn-outline"
                onClick={() => setFilters({
                  moduleId: '',
                  activityType: '',
                  status: 'pending',
                  search: ''
                })}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <SubmissionsList 
              submissions={submissions}
              courseId={courseId!}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GradingDashboardModern;
