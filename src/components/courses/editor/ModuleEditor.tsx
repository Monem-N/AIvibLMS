/**
 * ModuleEditor Component
 * 
 * Modal for editing module details.
 */

import React, { useState } from 'react';
import { Module } from '../../../types/course';

// Import CSS
import './ModuleEditor.css';

interface ModuleEditorProps {
  module: Partial<Module>;
  onSave: (module: Partial<Module>) => void;
  onCancel: () => void;
}

const ModuleEditor: React.FC<ModuleEditorProps> = ({ 
  module, 
  onSave, 
  onCancel 
}) => {
  // State
  const [moduleData, setModuleData] = useState<Partial<Module>>({
    title: module.title || '',
    description: module.description || '',
    status: module.status || 'locked'
  });
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModuleData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!moduleData.title) {
      alert('Module title is required');
      return;
    }
    
    onSave(moduleData);
  };
  
  return (
    <div className="module-editor-overlay">
      <div className="module-editor-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {module.id?.startsWith('temp-') ? 'Add Module' : 'Edit Module'}
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
              <label htmlFor="title">Module Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={moduleData.title}
                onChange={handleInputChange}
                placeholder="Enter module title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Module Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={moduleData.description}
                onChange={handleInputChange}
                placeholder="Enter module description"
                rows={4}
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Module Status</label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={moduleData.status}
                onChange={handleInputChange}
              >
                <option value="locked">Locked</option>
                <option value="unlocked">Unlocked</option>
              </select>
              <div className="form-hint">
                Locked modules are not accessible to students until you unlock them
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
              Save Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleEditor;
