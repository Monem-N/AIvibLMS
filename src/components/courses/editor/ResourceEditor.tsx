/**
 * ResourceEditor Component
 * 
 * Modal for editing resource details.
 */

import React, { useState } from 'react';
import { Attachment } from '../../../types/course';

// Import CSS
import './ResourceEditor.css';

interface ResourceEditorProps {
  resource: Attachment;
  onSave: (resource: Attachment) => void;
  onCancel: () => void;
}

const ResourceEditor: React.FC<ResourceEditorProps> = ({ 
  resource, 
  onSave, 
  onCancel 
}) => {
  // State
  const [resourceData, setResourceData] = useState<Attachment>({
    ...resource
  });
  const [file, setFile] = useState<File | null>(null);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setResourceData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Update resource data with file info
      setResourceData(prev => ({
        ...prev,
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      }));
    }
  };
  
  // Handle save
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!resourceData.name) {
      alert('Resource name is required');
      return;
    }
    
    if (!resourceData.url && !file) {
      alert('Please provide a URL or upload a file');
      return;
    }
    
    // If file is selected, upload it
    if (file) {
      try {
        // In a real implementation, you would upload the file to a storage service
        // and get the URL. For this example, we'll simulate it.
        const uploadedUrl = URL.createObjectURL(file);
        
        // Update resource data with uploaded URL
        const updatedResource = {
          ...resourceData,
          url: uploadedUrl,
          uploadedAt: new Date().toISOString()
        };
        
        onSave(updatedResource);
      } catch (error) {
        alert('Failed to upload file');
        console.error(error);
      }
    } else {
      // Save with URL
      onSave({
        ...resourceData,
        uploadedAt: new Date().toISOString()
      });
    }
  };
  
  return (
    <div className="resource-editor-overlay">
      <div className="resource-editor-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {resource.id.startsWith('temp-') ? 'Add Resource' : 'Edit Resource'}
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
              <label htmlFor="name">Resource Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={resourceData.name}
                onChange={handleInputChange}
                placeholder="Enter resource name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Resource Type</label>
              <select
                id="type"
                name="type"
                className="form-control"
                value={resourceData.type}
                onChange={handleInputChange}
              >
                <option value="application/pdf">PDF</option>
                <option value="image/jpeg">Image (JPEG)</option>
                <option value="image/png">Image (PNG)</option>
                <option value="video/mp4">Video (MP4)</option>
                <option value="audio/mpeg">Audio (MP3)</option>
                <option value="application/msword">Document (DOC)</option>
                <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Document (DOCX)</option>
                <option value="application/vnd.ms-excel">Spreadsheet (XLS)</option>
                <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">Spreadsheet (XLSX)</option>
                <option value="application/vnd.ms-powerpoint">Presentation (PPT)</option>
                <option value="application/vnd.openxmlformats-officedocument.presentationml.presentation">Presentation (PPTX)</option>
                <option value="text/plain">Text</option>
                <option value="application/zip">Archive (ZIP)</option>
                <option value="application/x-rar-compressed">Archive (RAR)</option>
                <option value="application/octet-stream">Other</option>
              </select>
            </div>
            
            <div className="form-tabs">
              <div className="tab-buttons">
                <button 
                  type="button"
                  className={`tab-button ${!file ? 'active' : ''}`}
                  onClick={() => setFile(null)}
                >
                  URL
                </button>
                <button 
                  type="button"
                  className={`tab-button ${file ? 'active' : ''}`}
                  onClick={() => document.getElementById('file')?.click()}
                >
                  Upload File
                </button>
              </div>
              
              <div className="tab-content">
                {!file ? (
                  <div className="form-group">
                    <label htmlFor="url">Resource URL</label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      className="form-control"
                      value={resourceData.url}
                      onChange={handleInputChange}
                      placeholder="Enter resource URL"
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="file">Upload File</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        id="file"
                        className="file-input"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file" className="file-label">
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
                        <span>{file ? file.name : 'Choose File'}</span>
                      </label>
                    </div>
                  </div>
                )}
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
              Save Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceEditor;
