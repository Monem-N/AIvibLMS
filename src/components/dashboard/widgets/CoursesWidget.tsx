/**
 * CoursesWidget Component
 * 
 * Widget for displaying user's courses on the dashboard.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardWidget from '../DashboardWidget';
import { Course } from '../../../types/course';

// Import CSS
import './CoursesWidget.css';

interface CoursesWidgetProps {
  courses: Course[];
  className?: string;
}

const CoursesWidget: React.FC<CoursesWidgetProps> = ({ courses, className = '' }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  // Filter courses
  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    if (filter === 'active') return course.status === 'published';
    if (filter === 'completed') return course.status === 'archived';
    return true;
  });
  
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
      console.error('Error refreshing courses:', error);
      setError('Failed to refresh courses. Please try again later.');
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
  
  // Widget footer
  const footer = (
    <Link to="/courses" className="widget-link">
      View All Courses
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
      title="My Courses"
      icon={icon}
      className={`courses-widget ${className}`}
      loading={isLoading}
      error={error}
      onRefresh={handleRefresh}
      footer={footer}
    >
      <div className="courses-filter">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      {filteredCourses.length === 0 ? (
        <div className="courses-empty">
          <p>No courses found.</p>
          <Link to="/courses/browse" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="courses-list">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </DashboardWidget>
  );
};

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Calculate progress
  const progress = course.progress || 0;
  
  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get status badge
  const getStatusBadge = () => {
    switch (course.status) {
      case 'published':
        return <span className="badge badge-success">Active</span>;
      case 'archived':
        return <span className="badge badge-secondary">Completed</span>;
      case 'draft':
        return <span className="badge badge-warning">Coming Soon</span>;
      default:
        return null;
    }
  };
  
  return (
    <Link to={`/courses/${course.id}`} className="course-card">
      <div className="course-info">
        <h4 className="course-title">{course.title}</h4>
        <p className="course-description">{course.description}</p>
        
        <div className="course-meta">
          <div className="course-dates">
            <span>Start: {formatDate(course.startDate)}</span>
            <span>End: {formatDate(course.endDate)}</span>
          </div>
          
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="course-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{progress}% Complete</span>
      </div>
    </Link>
  );
};

export default CoursesWidget;
