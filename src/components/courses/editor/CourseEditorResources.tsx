/**
 * CourseEditorResources Component
 * 
 * Component for managing course resources.
 */

import React, { useState } from 'react';
import { Attachment } from '../../../types/course';
import ResourceEditor from './ResourceEditor';

// Import CSS
import './CourseEditorResources.css';

interface CourseEditorResourcesProps {
  courseId?: string;
  resources: Attachment[];
  onChange: (resources: Attachment[]) => void;
}

const CourseEditorResources: React.FC<CourseEditorResourcesProps> = ({ 
  courseId,
  resources,
  onChange
}) => {
  // State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingResource, setEditingResource] = useState<string | null>(null);
  
  // Filter resources by search query
  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group resources by type
  const groupedResources: Record<string, Attachment[]> = {};
  
  filteredResources.forEach(resource => {
    const type = getResourceType(resource.type);
    if (!groupedResources[type]) {
      groupedResources[type] = [];
    }
    groupedResources[type].push(resource);
  });
  
  // Get resource type from MIME type
  const getResourceType = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return 'Images';
    if (mimeType.startsWith('video/')) return 'Videos';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType === 'application/pdf') return 'PDFs';
    if (mimeType.includes('word')) return 'Documents';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Spreadsheets';
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'Presentations';
    return 'Other';
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get resource icon
  const getResourceIcon = (mimeType: string): JSX.Element => {
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
          className="resource-icon image"
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
          className="resource-icon video"
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
          <line x1="7" y1="2" x2="7" y2="22"></line>
          <line x1="17" y1="2" x2="17" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="2" y1="7" x2="7" y2="7"></line>
          <line x1="2" y1="17" x2="7" y2="17"></line>
          <line x1="17" y1="17" x2="22" y2="17"></line>
          <line x1="17" y1="7" x2="22" y2="7"></line>
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
          className="resource-icon audio"
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
          className="resource-icon pdf"
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
        className="resource-icon other"
      >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    );
  };
  
  // Add new resource
  const addResource = () => {
    setEditingResource('new');
  };
  
  // Update resource
  const updateResource = (resourceId: string, updatedResource: Partial<Attachment>) => {
    const updatedResources = resources.map(resource => 
      resource.id === resourceId
        ? { ...resource, ...updatedResource }
        : resource
    );
    
    onChange(updatedResources);
  };
  
  // Delete resource
  const deleteResource = (resourceId: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updatedResources = resources.filter(resource => resource.id !== resourceId);
      onChange(updatedResources);
    }
  };
  
  // Close resource editor
  const closeResourceEditor = () => {
    setEditingResource(null);
  };
  
  // Save resource
  const saveResource = (resource: Attachment) => {
    if (editingResource === 'new') {
      // Add new resource
      onChange([...resources, resource]);
    } else {
      // Update existing resource
      updateResource(editingResource!, resource);
    }
    
    closeResourceEditor();
  };
  
  return (
    <div className="course-editor-resources">
      {editingResource && (
        <ResourceEditor 
          resource={
            editingResource === 'new'
              ? {
                  id: `temp-${Date.now()}`,
                  name: '',
                  type: 'application/pdf',
                  url: '',
                  size: 0,
                  uploadedAt: new Date().toISOString()
                }
              : resources.find(r => r.id === editingResource)!
          }
          onSave={saveResource}
          onCancel={closeResourceEditor}
        />
      )}
      
      <div className="resources-header">
        <h2 className="section-title">Course Resources</h2>
        <div className="resources-actions">
          <div className="resources-search">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={addResource}
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Resource</span>
          </button>
        </div>
      </div>
      
      {resources.length === 0 ? (
        <div className="resources-empty">
          <div className="empty-icon">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3>No Resources Yet</h3>
          <p>Add resources like PDFs, images, videos, and more to your course.</p>
          <button 
            className="btn btn-primary"
            onClick={addResource}
          >
            Add Your First Resource
          </button>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="resources-empty">
          <h3>No Resources Found</h3>
          <p>No resources match your search query.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="resources-content">
          {Object.entries(groupedResources).map(([type, resources]) => (
            <div key={type} className="resource-group">
              <h3 className="resource-group-title">{type}</h3>
              <div className="resource-list">
                {resources.map(resource => (
                  <div 
                    key={resource.id}
                    className="resource-item"
                  >
                    <div className="resource-icon-container">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="resource-info">
                      <h4 className="resource-name">{resource.name}</h4>
                      <div className="resource-meta">
                        <span className="resource-size">
                          {formatFileSize(resource.size)}
                        </span>
                        <span className="resource-date">
                          {new Date(resource.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="resource-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => setEditingResource(resource.id)}
                        title="Edit resource"
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
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      
                      <a 
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon"
                        title="View resource"
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
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                      
                      <button 
                        className="btn-icon delete"
                        onClick={() => deleteResource(resource.id)}
                        title="Delete resource"
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
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseEditorResources;
