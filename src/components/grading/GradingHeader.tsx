/**
 * GradingHeader Component
 * 
 * Displays the header for the grading dashboard with course title and submission count.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types/course';

// Import CSS
import './GradingHeader.css';

interface GradingHeaderProps {
  course: Course;
  submissionsCount: number;
}

const GradingHeader: React.FC<GradingHeaderProps> = ({ 
  course,
  submissionsCount
}) => {
  return (
    <div className="grading-header">
      <div className="header-left">
        <div className="header-breadcrumbs">
          <Link to="/courses" className="breadcrumb-link">
            Courses
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/courses/${course.id}`} className="breadcrumb-link">
            {course.title}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Grading</span>
        </div>
        
        <h1 className="header-title">
          Grading Dashboard
          <span className="submissions-badge">
            {submissionsCount} {submissionsCount === 1 ? 'submission' : 'submissions'} to grade
          </span>
        </h1>
      </div>
      
      <div className="header-actions">
        <Link 
          to={`/courses/${course.id}`}
          className="btn btn-outline"
        >
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
  );
};

export default GradingHeader;
