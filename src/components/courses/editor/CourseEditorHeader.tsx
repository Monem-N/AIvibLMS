/**
 * CourseEditorHeader Component
 * 
 * Displays the header for the course editor with title, status, and action buttons.
 */

import React from 'react';
import { Link } from 'react-router-dom';

// Import CSS
import './CourseEditorHeader.css';

interface CourseEditorHeaderProps {
  isNew: boolean;
  title: string;
  status: 'draft' | 'published' | 'archived';
  onSave: () => void;
  onPublish: () => void;
  saving: boolean;
}

const CourseEditorHeader: React.FC<CourseEditorHeaderProps> = ({ 
  isNew,
  title,
  status,
  onSave,
  onPublish,
  saving
}) => {
  // Get status badge
  const getStatusBadge = () => {
    switch (status) {
      case 'published':
        return <span className="badge badge-success">Published</span>;
      case 'archived':
        return <span className="badge badge-secondary">Archived</span>;
      case 'draft':
      default:
        return <span className="badge badge-warning">Draft</span>;
    }
  };
  
  return (
    <div className="course-editor-header">
      <div className="header-left">
        <div className="header-title-section">
          <h1 className="editor-title">{title}</h1>
          <div className="editor-status">
            {getStatusBadge()}
          </div>
        </div>
        <div className="header-subtitle">
          {isNew ? 'Create a new course' : 'Edit course'}
        </div>
      </div>
      
      <div className="header-actions">
        <Link 
          to="/courses" 
          className="btn btn-outline"
        >
          Cancel
        </Link>
        
        <button 
          className="btn btn-primary"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        
        {!isNew && status !== 'published' && (
          <button 
            className="btn btn-success"
            onClick={onPublish}
            disabled={saving}
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseEditorHeader;
