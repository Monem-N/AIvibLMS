/**
 * GradingForm Component
 * 
 * Form for grading submissions and providing feedback.
 */

import React from 'react';
import { Submission } from '../../types/course';

// Import CSS
import './GradingForm.css';

interface GradingFormProps {
  submission: Submission;
  gradeData: {
    score: number;
    feedback: string;
    status: string;
  };
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  submitting: boolean;
}

const GradingForm: React.FC<GradingFormProps> = ({ 
  submission,
  gradeData,
  onChange,
  onSubmit,
  submitting
}) => {
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name, name === 'score' ? parseInt(value, 10) : value);
  };
  
  // Calculate grade percentage
  const calculatePercentage = (): number => {
    if (!submission.activity || submission.activity.points === 0) {
      return 0;
    }
    
    return Math.round((gradeData.score / submission.activity.points!) * 100);
  };
  
  // Get letter grade
  const getLetterGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };
  
  // Get grade color
  const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return '#4caf50'; // A
    if (percentage >= 80) return '#8bc34a'; // B
    if (percentage >= 70) return '#ffc107'; // C
    if (percentage >= 60) return '#ff9800'; // D
    return '#f44336'; // F
  };
  
  const percentage = calculatePercentage();
  
  return (
    <div className="grading-form">
      <h2 className="form-title">Grade Submission</h2>
      
      <div className="grade-preview">
        <div 
          className="grade-circle"
          style={{ borderColor: getGradeColor(percentage) }}
        >
          <div className="grade-percentage">{percentage}%</div>
          <div className="grade-letter">{getLetterGrade(percentage)}</div>
        </div>
        
        <div className="grade-details">
          <div className="grade-score-input">
            <input
              type="number"
              id="score"
              name="score"
              className="score-input"
              value={gradeData.score}
              onChange={handleInputChange}
              min="0"
              max={submission.activity?.points || 100}
            />
            <span className="score-separator">/</span>
            <span className="max-score">{submission.activity?.points || 100}</span>
          </div>
          <div className="score-slider">
            <input
              type="range"
              id="score-slider"
              name="score"
              value={gradeData.score}
              onChange={handleInputChange}
              min="0"
              max={submission.activity?.points || 100}
              step="1"
              style={{
                background: `linear-gradient(to right, ${getGradeColor(percentage)} 0%, ${getGradeColor(percentage)} ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="feedback">Feedback</label>
        <textarea
          id="feedback"
          name="feedback"
          className="form-control"
          value={gradeData.feedback}
          onChange={handleInputChange}
          placeholder="Provide feedback to the student..."
          rows={6}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          className="form-control"
          value={gradeData.status}
          onChange={handleInputChange}
        >
          <option value="graded">Graded</option>
          <option value="returned">Return for Revision</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button 
          type="button"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Grade'}
        </button>
      </div>
    </div>
  );
};

export default GradingForm;
