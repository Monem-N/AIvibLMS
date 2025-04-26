/**
 * ActivityContent Component
 * 
 * Displays the content of an activity based on its type.
 */

import React from 'react';
import { Activity, Attachment } from '../../types/course';
import ReactMarkdown from 'react-markdown';

// Import CSS
import './ActivityContent.css';

interface ActivityContentProps {
  activity: Activity;
}

const ActivityContent: React.FC<ActivityContentProps> = ({ activity }) => {
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
      <div className="activity-attachments">
        <h3 className="attachments-title">Attachments</h3>
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
  
  // Render content based on activity type
  const renderContent = () => {
    switch (activity.type) {
      case 'content':
        return (
          <div className="content-activity">
            {activity.content && (
              <div className="content-text">
                <ReactMarkdown>{activity.content}</ReactMarkdown>
              </div>
            )}
            {renderAttachments(activity.attachments || [])}
          </div>
        );
      
      case 'assignment':
        return (
          <div className="assignment-activity">
            <div className="assignment-instructions">
              <h3 className="section-title">Instructions</h3>
              {activity.content && (
                <div className="content-text">
                  <ReactMarkdown>{activity.content}</ReactMarkdown>
                </div>
              )}
            </div>
            {renderAttachments(activity.attachments || [])}
          </div>
        );
      
      case 'quiz':
        return (
          <div className="quiz-activity">
            <div className="quiz-instructions">
              <h3 className="section-title">Instructions</h3>
              {activity.content && (
                <div className="content-text">
                  <ReactMarkdown>{activity.content}</ReactMarkdown>
                </div>
              )}
              <div className="quiz-info">
                <div className="quiz-info-item">
                  <span className="info-label">Time Limit:</span>
                  <span className="info-value">30 minutes</span>
                </div>
                <div className="quiz-info-item">
                  <span className="info-label">Attempts:</span>
                  <span className="info-value">2 of 3</span>
                </div>
                <div className="quiz-info-item">
                  <span className="info-label">Questions:</span>
                  <span className="info-value">10</span>
                </div>
              </div>
            </div>
            <div className="quiz-start">
              <button className="btn btn-primary">Start Quiz</button>
            </div>
          </div>
        );
      
      case 'discussion':
        return (
          <div className="discussion-activity">
            <div className="discussion-prompt">
              <h3 className="section-title">Discussion Prompt</h3>
              {activity.content && (
                <div className="content-text">
                  <ReactMarkdown>{activity.content}</ReactMarkdown>
                </div>
              )}
            </div>
            <div className="discussion-forum">
              <h3 className="section-title">Discussion Forum</h3>
              <div className="discussion-posts">
                <div className="discussion-empty">
                  <p>No posts yet. Be the first to contribute to this discussion!</p>
                </div>
              </div>
              <div className="discussion-compose">
                <h4 className="compose-title">Post a Reply</h4>
                <textarea 
                  className="compose-textarea"
                  placeholder="Write your response here..."
                  rows={5}
                ></textarea>
                <div className="compose-actions">
                  <button className="btn btn-primary">Post Reply</button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="unknown-activity">
            <p>This activity type is not supported.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="activity-content">
      {renderContent()}
    </div>
  );
};

export default ActivityContent;
