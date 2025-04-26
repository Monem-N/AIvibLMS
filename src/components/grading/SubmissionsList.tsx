/**
 * SubmissionsList Component
 * 
 * Displays a list of submissions that need grading.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Submission } from '../../types/course';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './SubmissionsList.css';

interface SubmissionsListProps {
  submissions: Submission[];
  courseId: string;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({ 
  submissions,
  courseId
}) => {
  // Get activity type icon
  const getActivityTypeIcon = (type: string): JSX.Element => {
    switch (type) {
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
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string): JSX.Element => {
    switch (status) {
      case 'graded':
        return <span className="status-badge graded">Graded</span>;
      case 'submitted':
        return <span className="status-badge submitted">Submitted</span>;
      case 'draft':
        return <span className="status-badge draft">Draft</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };
  
  return (
    <div className="submissions-list">
      <div className="submissions-header">
        <div className="header-cell student">Student</div>
        <div className="header-cell activity">Activity</div>
        <div className="header-cell module">Module</div>
        <div className="header-cell submitted">Submitted</div>
        <div className="header-cell status">Status</div>
        <div className="header-cell actions">Actions</div>
      </div>
      
      <div className="submissions-body">
        {submissions.map(submission => (
          <div key={submission.id} className="submission-row">
            <div className="cell student">
              <div className="student-avatar">
                {submission.student?.avatar ? (
                  <img 
                    src={submission.student.avatar} 
                    alt={submission.student.name} 
                    className="avatar-image"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {submission.student?.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="student-info">
                <div className="student-name">{submission.student?.name}</div>
                <div className="student-email">{submission.student?.email}</div>
              </div>
            </div>
            
            <div className="cell activity">
              <div className="activity-type-icon">
                {getActivityTypeIcon(submission.activity?.type || 'assignment')}
              </div>
              <div className="activity-info">
                <div className="activity-title">{submission.activity?.title}</div>
                {submission.activity?.points !== undefined && (
                  <div className="activity-points">
                    {submission.activity.points} points
                  </div>
                )}
              </div>
            </div>
            
            <div className="cell module">
              {submission.module?.title}
            </div>
            
            <div className="cell submitted">
              {formatDate(submission.submittedAt, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </div>
            
            <div className="cell status">
              {getStatusBadge(submission.status)}
            </div>
            
            <div className="cell actions">
              <Link 
                to={`/courses/${courseId}/grading/${submission.id}`}
                className="btn btn-primary btn-sm"
              >
                Grade
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsList;
