/**
 * CourseEditorModern Component
 * 
 * Modern course editor component using functional components and hooks.
 * Allows instructors to create and edit courses, modules, and activities.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../types/state';
import { fetchCourse, createCourse, updateCourse } from '../../../actions/courseActions';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNotification } from '../../../hooks/useNotification';
import CourseEditorHeader from './CourseEditorHeader';
import CourseEditorForm from './CourseEditorForm';
import CourseEditorModules from './CourseEditorModules';
import CourseEditorResources from './CourseEditorResources';
import CourseEditorSettings from './CourseEditorSettings';
import CourseEditorTabs from './CourseEditorTabs';
import LoadingSpinner from '../../common/LoadingSpinner';
import ErrorMessage from '../../common/ErrorMessage';
import { Course } from '../../../types/course';

// Import CSS
import './CourseEditor.css';

const CourseEditorModern: React.FC = () => {
  // Get course ID from URL params (if editing existing course)
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State
  const [activeTab, setActiveTab] = useState<string>('details');
  const [isNew, setIsNew] = useState<boolean>(!courseId);
  const [courseData, setCourseData] = useState<Partial<Course>>({
    title: '',
    description: '',
    status: 'draft',
    category: '',
    level: 'beginner',
    startDate: '',
    endDate: '',
    modules: [],
    resources: []
  });
  const [saving, setSaving] = useState<boolean>(false);
  
  // Hooks
  const { user, isAuthenticated, hasRole } = useAuthContext();
  const { showSuccess, showError } = useNotification();
  
  // Redux state
  const { currentCourse, loading, error } = useSelector(
    (state: RootState) => state.courses
  );
  
  // Effect to check authentication and permissions
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin', { state: { from: `/courses/${courseId ? courseId + '/edit' : 'new'}` } });
      return;
    }
    
    // Check if user has instructor or admin role
    if (!hasRole(['instructor', 'admin'])) {
      showError('You do not have permission to create or edit courses');
      navigate('/courses');
      return;
    }
  }, [isAuthenticated, hasRole, navigate, courseId, showError]);
  
  // Effect to fetch course data if editing existing course
  useEffect(() => {
    if (courseId && !isNew) {
      dispatch(fetchCourse(courseId));
    }
  }, [courseId, dispatch, isNew]);
  
  // Effect to set course data from fetched course
  useEffect(() => {
    if (currentCourse && !isNew) {
      setCourseData(currentCourse);
    }
  }, [currentCourse, isNew]);
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  // Handle form field changes
  const handleChange = (field: string, value: any) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle save course
  const handleSave = async () => {
    // Validate required fields
    if (!courseData.title) {
      showError('Course title is required');
      return;
    }
    
    setSaving(true);
    
    try {
      if (isNew) {
        // Create new course
        const newCourse = await dispatch(createCourse({
          ...courseData,
          instructor: {
            id: user!.uid,
            name: user!.displayName || 'Instructor'
          }
        }));
        
        showSuccess('Course created successfully');
        navigate(`/courses/${newCourse.id}/edit`);
        setIsNew(false);
      } else {
        // Update existing course
        await dispatch(updateCourse(courseId!, courseData));
        showSuccess('Course updated successfully');
      }
    } catch (error: any) {
      showError(error.message || 'Failed to save course');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle publish course
  const handlePublish = async () => {
    // Validate required fields
    if (!courseData.title) {
      showError('Course title is required');
      return;
    }
    
    if (!courseData.description) {
      showError('Course description is required');
      return;
    }
    
    if (!courseData.modules || courseData.modules.length === 0) {
      showError('Course must have at least one module');
      return;
    }
    
    setSaving(true);
    
    try {
      await dispatch(updateCourse(courseId!, {
        ...courseData,
        status: 'published'
      }));
      
      showSuccess('Course published successfully');
      navigate(`/courses/${courseId}`);
    } catch (error: any) {
      showError(error.message || 'Failed to publish course');
    } finally {
      setSaving(false);
    }
  };
  
  // If loading, show loading state
  if (loading && !isNew) {
    return (
      <div className="course-editor-container">
        <LoadingSpinner message="Loading course..." />
      </div>
    );
  }
  
  // If error, show error state
  if (error && !isNew) {
    return (
      <div className="course-editor-container">
        <ErrorMessage 
          message={error} 
          onRetry={() => dispatch(fetchCourse(courseId!))}
        />
      </div>
    );
  }
  
  return (
    <div className="course-editor-container">
      <CourseEditorHeader 
        isNew={isNew}
        title={courseData.title || 'New Course'}
        status={courseData.status || 'draft'}
        onSave={handleSave}
        onPublish={handlePublish}
        saving={saving}
      />
      
      <CourseEditorTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
      />
      
      <div className="course-editor-content">
        {activeTab === 'details' && (
          <CourseEditorForm 
            courseData={courseData}
            onChange={handleChange}
          />
        )}
        
        {activeTab === 'modules' && (
          <CourseEditorModules 
            courseId={courseId}
            modules={courseData.modules || []}
            onChange={(modules) => handleChange('modules', modules)}
          />
        )}
        
        {activeTab === 'resources' && (
          <CourseEditorResources 
            courseId={courseId}
            resources={courseData.resources || []}
            onChange={(resources) => handleChange('resources', resources)}
          />
        )}
        
        {activeTab === 'settings' && (
          <CourseEditorSettings 
            courseData={courseData}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default CourseEditorModern;
