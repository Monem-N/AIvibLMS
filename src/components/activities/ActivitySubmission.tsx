/**
 * ActivitySubmission Component
 * 
 * Displays the submission form for assignments and quizzes.
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Activity, Submission } from '../../types/course';
import { submitActivity } from '../../actions/activityActions';
import { useNotification } from '../../hooks/useNotification';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './ActivitySubmission.css';

interface ActivitySubmissionProps {
  activity: Activity;
  courseId: string;
  moduleId: string;
}

const ActivitySubmission: React.FC<ActivitySubmissionProps> = ({ 
  activity,
  courseId,
  moduleId
}) => {
  // State
  const [submissionText, setSubmissionText] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  // Hooks
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification();
  
  // Get latest submission
  const latestSubmission = activity.submissions && activity.submissions.length > 0
    ? activity.submissions[activity.submissions.length - 1]
    : null;
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileList]);
    }
  };
  
  // Remove file
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Handle submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!submissionText && files.length === 0) {
      showError('Please enter text or upload files for your submission.');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Create submission object
      const submission: Partial<Submission> = {
        activityId: activity.id,
        content: submissionText,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      
      // Dispatch submission action
      await dispatch(submitActivity(
        activity.id, 
        moduleId, 
        courseId, 
        submission, 
        files
      ));
      
      // Reset form
      setSubmissionText('');
      setFiles([]);
      
      // Show success message
      showSuccess('Submission successful!');
    } catch (error: any) {
      showError(error.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Render submission history
  const renderSubmissionHistory = () => {
    if (!activity.submissions || activity.submissions.length === 0) {
      return null;
    }
    
    return (
      <div className="submission-history">
        <h3 className="section-title">Submission History</h3>
        <div className="history-list">
          {activity.submissions.map((submission, index) => (
            <div key={submission.id} className="history-item">
              <div className="history-header">
                <div className="history-info">
                  <span className="history-number">Submission {index + 1}</span>
                  <span className="history-date">
                    {formatDate(submission.submittedAt, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="history-status">
                  <span className={`status-badge ${submission.status}`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {submission.content && (
                <div className="history-content">
                  <p>{submission.content}</p>
                </div>
              )}
              
              {submission.attachments && submission.attachments.length > 0 && (
                <div className="history-attachments">
                  <h4 className="attachments-title">Attachments</h4>
                  <div className="attachments-list">
                    {submission.attachments.map(attachment => (
                      <a 
                        key={attachment.id}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="attachment-link"
                      >
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {submission.grade && (
                <div className="history-grade">
                  <div className="grade-score">
                    <span className="grade-label">Score:</span>
                    <span className="grade-value">
                      {submission.grade.score} / {submission.grade.maxScore}
                    </span>
                  </div>
                  
                  {submission.grade.feedback && (
                    <div className="grade-feedback">
                      <span className="feedback-label">Feedback:</span>
                      <p className="feedback-text">{submission.grade.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // If activity is completed and graded, don't show submission form
  if (activity.status === 'completed' && activity.grade) {
    return (
      <div className="activity-submission">
        {renderSubmissionHistory()}
      </div>
    );
  }
  
  return (
    <div className="activity-submission">
      <h3 className="section-title">Your Submission</h3>
      
      {latestSubmission && latestSubmission.status === 'submitted' ? (
        <div className="submission-pending">
          <div className="pending-message">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div className="message-content">
              <h4>Submission Pending</h4>
              <p>Your submission has been received and is waiting to be graded.</p>
            </div>
          </div>
          <button 
            className="btn btn-outline"
            onClick={() => {
              // Reset submission status to allow resubmission
              setSubmissionText('');
              setFiles([]);
            }}
          >
            Make a New Submission
          </button>
        </div>
      ) : (
        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="submission-text">Submission Text</label>
            <textarea 
              id="submission-text"
              className="form-control"
              placeholder="Enter your submission text here..."
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              rows={6}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="submission-files">Attachments</label>
            <div className="file-upload">
              <input 
                type="file"
                id="submission-files"
                className="file-input"
                onChange={handleFileChange}
                multiple
              />
              <label htmlFor="submission-files" className="file-label">
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>Choose Files</span>
              </label>
            </div>
            
            {files.length > 0 && (
              <div className="selected-files">
                <h4 className="files-title">Selected Files</h4>
                <ul className="files-list">
                  {files.map((file, index) => (
                    <li key={index} className="file-item">
                      <span className="file-name">{file.name}</span>
                      <button 
                        type="button"
                        className="file-remove"
                        onClick={() => removeFile(index)}
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
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button 
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            <button 
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSubmissionText('');
                setFiles([]);
              }}
              disabled={submitting}
            >
              Clear
            </button>
          </div>
        </form>
      )}
      
      {renderSubmissionHistory()}
    </div>
  );
};

export default ActivitySubmission;
