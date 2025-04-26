/**
 * ActivityFeedback Component
 * 
 * Displays feedback and grades for an activity.
 */

import React from 'react';
import { Grade } from '../../types/course';
import { formatDate } from '../../utils/dateUtils';

// Import CSS
import './ActivityFeedback.css';

interface ActivityFeedbackProps {
  grade: Grade;
}

const ActivityFeedback: React.FC<ActivityFeedbackProps> = ({ grade }) => {
  // Calculate grade color based on percentage
  const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return '#4caf50'; // A
    if (percentage >= 80) return '#8bc34a'; // B
    if (percentage >= 70) return '#ffc107'; // C
    if (percentage >= 60) return '#ff9800'; // D
    return '#f44336'; // F
  };
  
  // Get letter grade
  const getLetterGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };
  
  // Format graded date
  const formattedGradedDate = grade.gradedAt 
    ? formatDate(grade.gradedAt, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
    : null;
  
  return (
    <div className="activity-feedback">
      <h3 className="section-title">Feedback</h3>
      
      <div className="feedback-container">
        <div className="grade-summary">
          <div 
            className="grade-circle"
            style={{ borderColor: getGradeColor(grade.percentage) }}
          >
            <div className="grade-percentage">{grade.percentage}%</div>
            {grade.letter ? (
              <div className="grade-letter">{grade.letter}</div>
            ) : (
              <div className="grade-letter">{getLetterGrade(grade.percentage)}</div>
            )}
          </div>
          
          <div className="grade-details">
            <div className="grade-score">
              <span className="score-value">{grade.score}</span>
              <span className="score-separator">/</span>
              <span className="score-max">{grade.maxScore}</span>
            </div>
            
            {grade.gradedBy && (
              <div className="graded-by">
                Graded by: {grade.gradedBy.name}
              </div>
            )}
            
            {formattedGradedDate && (
              <div className="graded-date">
                {formattedGradedDate}
              </div>
            )}
          </div>
        </div>
        
        {grade.feedback && (
          <div className="feedback-content">
            <h4 className="feedback-title">Instructor Feedback</h4>
            <div className="feedback-text">
              <p>{grade.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeedback;
