/**
 * SubmissionContent Component
 * 
 * Displays the content of a submission including text and attachments.
 */

import React from 'react';
import { Submission, Attachment } from '../../types/course';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './SubmissionContent.css';

interface SubmissionContentProps {
  submission: Submission;
}

const SubmissionContent: React.FC<SubmissionContentProps> = ({ 
  submission 
}) => {
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get file icon based on MIME type
  const getFileIcon = (mimeType: string): JSX.Element => {
    if (mimeType.startsWith('image/')) {
      return (
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
          className="file-icon image"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      );
    }
    
    if (mimeType.startsWith('video/')) {
      return (
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
          className="file-icon video"
        >
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      );
    }
    
    if (mimeType.startsWith('audio/')) {
      return (
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
          className="file-icon audio"
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      );
    }
    
    if (mimeType === 'application/pdf') {
      return (
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
          className="file-icon pdf"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    }
    
    return (
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
        className="file-icon document"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
    );
  };
  
  // Render attachments
  const renderAttachments = (attachments: Attachment[]) => {
    if (!attachments || attachments.length === 0) {
      return null;
    }
    
    return (
      <div className="submission-attachments">
        <h3 className="section-title">Attachments</h3>
        <div className="attachments-list">
          {attachments.map(attachment => (
            <a 
              key={attachment.id}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="attachment-item"
            >
              <div className="attachment-icon">
                {getFileIcon(attachment.type)}
              </div>
              <div className="attachment-info">
                <span className="attachment-name">{attachment.name}</span>
                <span className="attachment-size">{formatFileSize(attachment.size)}</span>
              </div>
              <div className="attachment-download">
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  // Render activity instructions
  const renderActivityInstructions = () => {
    if (!submission.activity || !submission.activity.content) {
      return null;
    }
    
    return (
      <div className="activity-instructions">
        <h3 className="section-title">Activity Instructions</h3>
        <div className="instructions-content">
          <p>{submission.activity.content}</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="submission-content">
      <div className="content-section">
        <h2 className="section-title">Submission</h2>
        
        <div className="submission-info">
          <div className="info-item">
            <span className="info-label">Submitted by:</span>
            <span className="info-value">{submission.student?.name}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Submitted on:</span>
            <span className="info-value">
              {formatDate(submission.submittedAt, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
        
        {submission.content && (
          <div className="submission-text">
            <h3 className="section-title">Submission Text</h3>
            <div className="text-content">
              <p>{submission.content}</p>
            </div>
          </div>
        )}
        
        {renderAttachments(submission.attachments || [])}
      </div>
      
      {renderActivityInstructions()}
      
      {submission.grade && (
        <div className="previous-grade">
          <h3 className="section-title">Previous Grade</h3>
          <div className="grade-info">
            <div className="grade-score">
              <span className="score-value">{submission.grade.score}</span>
              <span className="score-separator">/</span>
              <span className="score-max">{submission.grade.maxScore}</span>
              <span className="score-percentage">({submission.grade.percentage}%)</span>
            </div>
            
            {submission.grade.gradedBy && (
              <div className="graded-by">
                Graded by: {submission.grade.gradedBy.name}
              </div>
            )}
            
            {submission.grade.gradedAt && (
              <div className="graded-date">
                {formatDate(submission.grade.gradedAt, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </div>
            )}
            
            {submission.grade.feedback && (
              <div className="grade-feedback">
                <h4 className="feedback-title">Feedback</h4>
                <div className="feedback-content">
                  <p>{submission.grade.feedback}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionContent;
