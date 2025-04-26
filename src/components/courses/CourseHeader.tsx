/**
 * CourseHeader Component
 * 
 * Displays the course header with title, description, instructor, and progress.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types/course';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './CourseHeader.css';

interface CourseHeaderProps {
  course: Course;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  // Format dates
  const formattedStartDate = course.startDate ? formatDate(course.startDate) : 'N/A';
  const formattedEndDate = course.endDate ? formatDate(course.endDate) : 'N/A';
  
  // Calculate progress
  const progress = course.progress || 0;
  
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
    <div className="course-header">
      <div className="course-header-content">
        <div className="course-header-main">
          <div className="course-title-section">
            <h1 className="course-title">{course.title}</h1>
            <div className="course-meta">
              {getStatusBadge()}
              <span className="course-dates">
                {formattedStartDate} - {formattedEndDate}
              </span>
              <span className="course-category">{course.category}</span>
              <span className="course-level">{course.level}</span>
            </div>
          </div>
          
          <div className="course-progress-section">
            <div className="progress-info">
              <span className="progress-label">Your Progress</span>
              <span className="progress-value">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="course-description">
          <p>{course.description}</p>
        </div>
        
        <div className="course-instructor">
          <div className="instructor-avatar">
            {course.instructor.avatar ? (
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
              />
            ) : (
              <div className="avatar-placeholder">
                {course.instructor.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="instructor-info">
            <span className="instructor-label">Instructor</span>
            <Link 
              to={`/instructors/${course.instructor.id}`}
              className="instructor-name"
            >
              {course.instructor.name}
            </Link>
          </div>
        </div>
      </div>
      
      <div className="course-header-actions">
        <button className="btn btn-primary">Continue Learning</button>
        <button className="btn btn-outline">Download Materials</button>
      </div>
    </div>
  );
};

export default CourseHeader;
