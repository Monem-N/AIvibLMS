/**
 * SubmissionHeader Component
 * 
 * Displays the header for the submission grader with submission details.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Submission } from '../../types/course';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './SubmissionHeader.css';

interface SubmissionHeaderProps {
  submission: Submission;
  courseId: string;
}

const SubmissionHeader: React.FC<SubmissionHeaderProps> = ({ 
  submission,
  courseId
}) => {
  return (
    <div className="submission-header">
      <div className="header-left">
        <div className="header-breadcrumbs">
          <Link to="/courses" className="breadcrumb-link">
            Courses
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/courses/${courseId}`} className="breadcrumb-link">
            {submission.course?.title}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/courses/${courseId}/grading`} className="breadcrumb-link">
            Grading
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Submission</span>
        </div>
        
        <div className="submission-title-section">
          <h1 className="submission-title">
            {submission.activity?.title}
          </h1>
          
          <div className="submission-meta">
            <div className="meta-item">
              <span className="meta-label">Student:</span>
              <span className="meta-value">{submission.student?.name}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">Submitted:</span>
              <span className="meta-value">
                {formatDate(submission.submittedAt, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">Module:</span>
              <span className="meta-value">{submission.module?.title}</span>
            </div>
            
            {submission.activity?.points !== undefined && (
              <div className="meta-item">
                <span className="meta-label">Points:</span>
                <span className="meta-value">{submission.activity.points}</span>
              </div>
            )}
            
            <div className="meta-item">
              <span className="meta-label">Status:</span>
              <span className={`status-badge ${submission.status}`}>
                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        <Link 
          to={`/courses/${courseId}/grading`}
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
          <span>Back to Grading</span>
        </Link>
      </div>
    </div>
  );
};

export default SubmissionHeader;
