/**
 * ActivityEditor Component
 * 
 * Modal for editing activity details.
 */

import React, { useState } from 'react';
import { Activity } from '../../../types/course';

// Import CSS
import './ActivityEditor.css';

interface ActivityEditorProps {
  activity: Partial<Activity>;
  onSave: (activity: Partial<Activity>) => void;
  onCancel: () => void;
}

const ActivityEditor: React.FC<ActivityEditorProps> = ({ 
  activity, 
  onSave, 
  onCancel 
}) => {
  // State
  const [activityData, setActivityData] = useState<Partial<Activity>>({
    title: activity.title || '',
    description: activity.description || '',
    type: activity.type || 'content',
    status: activity.status || 'not-started',
    points: activity.points || 0,
    dueDate: activity.dueDate || '',
    content: activity.content || ''
  });
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setActivityData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivityData(prev => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : undefined
    }));
  };
  
  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivityData(prev => ({
      ...prev,
      [name]: value ? new Date(value).toISOString() : ''
    }));
  };
  
  // Format date for input
  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };
  
  // Handle save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!activityData.title) {
      alert('Activity title is required');
      return;
    }
    
    onSave(activityData);
  };
  
  return (
    <div className="activity-editor-overlay">
      <div className="activity-editor-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {activity.id?.startsWith('temp-') ? 'Add Activity' : 'Edit Activity'}
          </h2>
          <button 
            className="modal-close"
            onClick={onCancel}
          >
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSave}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Activity Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={activityData.title}
                onChange={handleInputChange}
                placeholder="Enter activity title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Activity Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={activityData.description}
                onChange={handleInputChange}
                placeholder="Enter activity description"
                rows={3}
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Activity Type</label>
                <select
                  id="type"
                  name="type"
                  className="form-control"
                  value={activityData.type}
                  onChange={handleInputChange}
                >
                  <option value="content">Content</option>
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="discussion">Discussion</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Activity Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={activityData.status}
                  onChange={handleInputChange}
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="points">Points</label>
                <input
                  type="number"
                  id="points"
                  name="points"
                  className="form-control"
                  value={activityData.points || ''}
                  onChange={handleNumberChange}
                  placeholder="e.g., 100"
                  min="0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-control"
                  value={formatDateForInput(activityData.dueDate)}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                className="form-control"
                value={activityData.content}
                onChange={handleInputChange}
                placeholder="Enter activity content (supports Markdown)"
                rows={8}
              ></textarea>
              <div className="form-hint">
                You can use Markdown to format your content
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityEditor;
