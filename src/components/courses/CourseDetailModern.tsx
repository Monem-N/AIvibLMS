/**
 * CourseDetailModern Component
 * 
 * Modern course detail component using functional components and hooks.
 * Displays course information, modules, activities, and resources.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchCourse } from '../../actions/courseActions';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';
import CourseHeader from './CourseHeader';
import CourseModules from './CourseModules';
import CourseResources from './CourseResources';
import CourseAnnouncements from './CourseAnnouncements';
import CourseParticipants from './CourseParticipants';
import CourseTabs from './CourseTabs';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './CourseDetail.css';

const CourseDetailModern: React.FC = () => {
  // Get course ID from URL params
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State
  const [activeTab, setActiveTab] = useState<string>('modules');
  
  // Hooks
  const { user, isAuthenticated } = useAuthContext();
  const { showError } = useNotification();
  
  // Redux state
  const { currentCourse, loading, error } = useSelector(
    (state: RootState) => state.courses
  );
  
  // Effect to fetch course data
  useEffect(() => {
    if (!courseId) {
      showError('Course ID is missing');
      navigate('/courses');
      return;
    }
    
    if (!isAuthenticated()) {
      navigate('/signin', { state: { from: `/courses/${courseId}` } });
      return;
    }
    
    dispatch(fetchCourse(courseId));
  }, [courseId, dispatch, isAuthenticated, navigate, showError]);
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="course-detail-container">
        <LoadingSpinner message="Loading course..." />
      </div>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <div className="course-detail-container">
        <ErrorMessage 
          message={error} 
          onRetry={() => dispatch(fetchCourse(courseId!))}
        />
      </div>
    );
  }
  
  // If no course, show not found state
  if (!currentCourse) {
    return (
      <div className="course-detail-container">
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
    <div className="course-detail-container">
      <CourseHeader course={currentCourse} />
      
      <CourseTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        course={currentCourse}
      />
      
      <div className="course-content">
        {activeTab === 'modules' && (
          <CourseModules 
            modules={currentCourse.modules || []} 
            courseId={currentCourse.id}
          />
        )}
        
        {activeTab === 'resources' && (
          <CourseResources 
            resources={currentCourse.resources || []} 
            courseId={currentCourse.id}
          />
        )}
        
        {activeTab === 'announcements' && (
          <CourseAnnouncements 
            courseId={currentCourse.id}
          />
        )}
        
        {activeTab === 'participants' && (
          <CourseParticipants 
            courseId={currentCourse.id}
          />
        )}
      </div>
    </div>
  );
};

export default CourseDetailModern;
