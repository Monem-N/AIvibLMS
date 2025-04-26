/**
 * CourseEditorModules Component
 * 
 * Component for editing course modules and activities.
 */

import React, { useState } from 'react';
import { Module, Activity } from '../../../types/course';
import ModuleEditor from './ModuleEditor';
import ActivityEditor from './ActivityEditor';

// Import CSS
import './CourseEditorModules.css';

interface CourseEditorModulesProps {
  courseId?: string;
  modules: Module[];
  onChange: (modules: Module[]) => void;
}

const CourseEditorModules: React.FC<CourseEditorModulesProps> = ({ 
  courseId,
  modules,
  onChange
}) => {
  // State
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    // Initialize with first module expanded
    modules.length > 0 ? { [modules[0].id]: true } : {}
  );
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingActivity, setEditingActivity] = useState<{
    moduleId: string;
    activityId: string | null;
  } | null>(null);
  
  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };
  
  // Add new module
  const addModule = () => {
    const newModule: Module = {
      id: `temp-${Date.now()}`,
      title: 'New Module',
      description: '',
      order: modules.length,
      status: 'locked',
      activities: []
    };
    
    const updatedModules = [...modules, newModule];
    onChange(updatedModules);
    
    // Expand the new module
    setExpandedModules(prev => ({
      ...prev,
      [newModule.id]: true
    }));
    
    // Set editing mode for the new module
    setEditingModule(newModule.id);
  };
  
  // Update module
  const updateModule = (moduleId: string, updatedModule: Partial<Module>) => {
    const updatedModules = modules.map(module => 
      module.id === moduleId
        ? { ...module, ...updatedModule }
        : module
    );
    
    onChange(updatedModules);
  };
  
  // Delete module
  const deleteModule = (moduleId: string) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      const updatedModules = modules.filter(module => module.id !== moduleId);
      
      // Update order of remaining modules
      const reorderedModules = updatedModules.map((module, index) => ({
        ...module,
        order: index
      }));
      
      onChange(reorderedModules);
    }
  };
  
  // Move module up
  const moveModuleUp = (moduleId: string) => {
    const moduleIndex = modules.findIndex(module => module.id === moduleId);
    
    if (moduleIndex > 0) {
      const updatedModules = [...modules];
      
      // Swap modules
      [updatedModules[moduleIndex - 1], updatedModules[moduleIndex]] = 
      [updatedModules[moduleIndex], updatedModules[moduleIndex - 1]];
      
      // Update order
      const reorderedModules = updatedModules.map((module, index) => ({
        ...module,
        order: index
      }));
      
      onChange(reorderedModules);
    }
  };
  
  // Move module down
  const moveModuleDown = (moduleId: string) => {
    const moduleIndex = modules.findIndex(module => module.id === moduleId);
    
    if (moduleIndex < modules.length - 1) {
      const updatedModules = [...modules];
      
      // Swap modules
      [updatedModules[moduleIndex], updatedModules[moduleIndex + 1]] = 
      [updatedModules[moduleIndex + 1], updatedModules[moduleIndex]];
      
      // Update order
      const reorderedModules = updatedModules.map((module, index) => ({
        ...module,
        order: index
      }));
      
      onChange(reorderedModules);
    }
  };
  
  // Add activity to module
  const addActivity = (moduleId: string) => {
    const newActivity: Activity = {
      id: `temp-${Date.now()}`,
      title: 'New Activity',
      description: '',
      type: 'content',
      status: 'not-started',
      moduleId,
      order: modules.find(m => m.id === moduleId)?.activities?.length || 0
    };
    
    const updatedModules = modules.map(module => 
      module.id === moduleId
        ? {
            ...module,
            activities: [...(module.activities || []), newActivity]
          }
        : module
    );
    
    onChange(updatedModules);
    
    // Set editing mode for the new activity
    setEditingActivity({
      moduleId,
      activityId: newActivity.id
    });
  };
  
  // Update activity
  const updateActivity = (moduleId: string, activityId: string, updatedActivity: Partial<Activity>) => {
    const updatedModules = modules.map(module => 
      module.id === moduleId
        ? {
            ...module,
            activities: module.activities?.map(activity => 
              activity.id === activityId
                ? { ...activity, ...updatedActivity }
                : activity
            )
          }
        : module
    );
    
    onChange(updatedModules);
  };
  
  // Delete activity
  const deleteActivity = (moduleId: string, activityId: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      const updatedModules = modules.map(module => 
        module.id === moduleId
          ? {
              ...module,
              activities: module.activities?.filter(activity => activity.id !== activityId)
            }
          : module
      );
      
      // Update order of remaining activities
      const reorderedModules = updatedModules.map(module => ({
        ...module,
        activities: module.activities?.map((activity, index) => ({
          ...activity,
          order: index
        }))
      }));
      
      onChange(reorderedModules);
    }
  };
  
  // Move activity up
  const moveActivityUp = (moduleId: string, activityId: string) => {
    const module = modules.find(m => m.id === moduleId);
    
    if (module && module.activities) {
      const activityIndex = module.activities.findIndex(a => a.id === activityId);
      
      if (activityIndex > 0) {
        const updatedActivities = [...module.activities];
        
        // Swap activities
        [updatedActivities[activityIndex - 1], updatedActivities[activityIndex]] = 
        [updatedActivities[activityIndex], updatedActivities[activityIndex - 1]];
        
        // Update order
        const reorderedActivities = updatedActivities.map((activity, index) => ({
          ...activity,
          order: index
        }));
        
        const updatedModules = modules.map(m => 
          m.id === moduleId
            ? { ...m, activities: reorderedActivities }
            : m
        );
        
        onChange(updatedModules);
      }
    }
  };
  
  // Move activity down
  const moveActivityDown = (moduleId: string, activityId: string) => {
    const module = modules.find(m => m.id === moduleId);
    
    if (module && module.activities) {
      const activityIndex = module.activities.findIndex(a => a.id === activityId);
      
      if (activityIndex < module.activities.length - 1) {
        const updatedActivities = [...module.activities];
        
        // Swap activities
        [updatedActivities[activityIndex], updatedActivities[activityIndex + 1]] = 
        [updatedActivities[activityIndex + 1], updatedActivities[activityIndex]];
        
        // Update order
        const reorderedActivities = updatedActivities.map((activity, index) => ({
          ...activity,
          order: index
        }));
        
        const updatedModules = modules.map(m => 
          m.id === moduleId
            ? { ...m, activities: reorderedActivities }
            : m
        );
        
        onChange(updatedModules);
      }
    }
  };
  
  // Close module editor
  const closeModuleEditor = () => {
    setEditingModule(null);
  };
  
  // Close activity editor
  const closeActivityEditor = () => {
    setEditingActivity(null);
  };
  
  return (
    <div className="course-editor-modules">
      {editingModule && (
        <ModuleEditor 
          module={modules.find(m => m.id === editingModule) || {
            id: editingModule,
            title: '',
            description: '',
            order: modules.length,
            status: 'locked'
          }}
          onSave={(updatedModule) => {
            updateModule(editingModule, updatedModule);
            closeModuleEditor();
          }}
          onCancel={closeModuleEditor}
        />
      )}
      
      {editingActivity && (
        <ActivityEditor 
          activity={
            modules
              .find(m => m.id === editingActivity.moduleId)
              ?.activities
              ?.find(a => a.id === editingActivity.activityId) || {
                id: editingActivity.activityId || `temp-${Date.now()}`,
                title: '',
                description: '',
                type: 'content',
                status: 'not-started',
                moduleId: editingActivity.moduleId,
                order: modules.find(m => m.id === editingActivity.moduleId)?.activities?.length || 0
              }
          }
          onSave={(updatedActivity) => {
            if (editingActivity.activityId) {
              updateActivity(editingActivity.moduleId, editingActivity.activityId, updatedActivity);
            } else {
              const newActivity: Activity = {
                id: `temp-${Date.now()}`,
                ...updatedActivity,
                moduleId: editingActivity.moduleId,
                order: modules.find(m => m.id === editingActivity.moduleId)?.activities?.length || 0
              };
              
              const updatedModules = modules.map(module => 
                module.id === editingActivity.moduleId
                  ? {
                      ...module,
                      activities: [...(module.activities || []), newActivity]
                    }
                  : module
              );
              
              onChange(updatedModules);
            }
            
            closeActivityEditor();
          }}
          onCancel={closeActivityEditor}
        />
      )}
      
      <div className="modules-header">
        <h2 className="section-title">Course Modules</h2>
        <button 
          className="btn btn-primary"
          onClick={addModule}
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
          <span>Add Module</span>
        </button>
      </div>
      
      {modules.length === 0 ? (
        <div className="modules-empty">
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
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h3>No Modules Yet</h3>
          <p>Start building your course by adding modules and activities.</p>
          <button 
            className="btn btn-primary"
            onClick={addModule}
          >
            Add Your First Module
          </button>
        </div>
      ) : (
        <div className="modules-list">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className={`module-item ${expandedModules[module.id] ? 'expanded' : ''}`}
            >
              <div className="module-header">
                <div 
                  className="module-title-section"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="module-toggle">
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
                      className={`chevron-icon ${expandedModules[module.id] ? 'up' : 'down'}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <h3 className="module-title">{module.title}</h3>
                  <div className="module-info">
                    <span className="module-activities-count">
                      {module.activities?.length || 0} activities
                    </span>
                  </div>
                </div>
                
                <div className="module-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => setEditingModule(module.id)}
                    title="Edit module"
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
                  
                  <button 
                    className="btn-icon"
                    onClick={() => moveModuleUp(module.id)}
                    disabled={index === 0}
                    title="Move up"
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
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </button>
                  
                  <button 
                    className="btn-icon"
                    onClick={() => moveModuleDown(module.id)}
                    disabled={index === modules.length - 1}
                    title="Move down"
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
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  <button 
                    className="btn-icon delete"
                    onClick={() => deleteModule(module.id)}
                    title="Delete module"
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
              
              {expandedModules[module.id] && (
                <div className="module-content">
                  {module.description && (
                    <div className="module-description">
                      <p>{module.description}</p>
                    </div>
                  )}
                  
                  <div className="activities-header">
                    <h4 className="activities-title">Activities</h4>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={() => addActivity(module.id)}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
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
                      <span>Add Activity</span>
                    </button>
                  </div>
                  
                  {(!module.activities || module.activities.length === 0) ? (
                    <div className="activities-empty">
                      <p>No activities in this module yet.</p>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => addActivity(module.id)}
                      >
                        Add Your First Activity
                      </button>
                    </div>
                  ) : (
                    <div className="activities-list">
                      {module.activities.map((activity, activityIndex) => (
                        <div 
                          key={activity.id}
                          className={`activity-item ${activity.type}`}
                        >
                          <div className="activity-info">
                            <div className="activity-type-icon">
                              {activity.type === 'content' && (
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
                                  className="activity-icon content"
                                >
                                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                  <polyline points="13 2 13 9 20 9"></polyline>
                                </svg>
                              )}
                              
                              {activity.type === 'assignment' && (
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
                                  className="activity-icon assignment"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                  <line x1="16" y1="13" x2="8" y2="13"></line>
                                  <line x1="16" y1="17" x2="8" y2="17"></line>
                                  <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                              )}
                              
                              {activity.type === 'quiz' && (
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
                                  className="activity-icon quiz"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                              )}
                              
                              {activity.type === 'discussion' && (
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
                                  className="activity-icon discussion"
                                >
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                              )}
                            </div>
                            
                            <div className="activity-details">
                              <h5 className="activity-title">{activity.title}</h5>
                              {activity.description && (
                                <p className="activity-description">{activity.description}</p>
                              )}
                              <div className="activity-meta">
                                <span className="activity-type">
                                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                </span>
                                
                                {activity.points !== undefined && (
                                  <span className="activity-points">
                                    {activity.points} points
                                  </span>
                                )}
                                
                                {activity.dueDate && (
                                  <span className="activity-due-date">
                                    Due: {new Date(activity.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="activity-actions">
                            <button 
                              className="btn-icon"
                              onClick={() => setEditingActivity({
                                moduleId: module.id,
                                activityId: activity.id
                              })}
                              title="Edit activity"
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
                            
                            <button 
                              className="btn-icon"
                              onClick={() => moveActivityUp(module.id, activity.id)}
                              disabled={activityIndex === 0}
                              title="Move up"
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
                                <polyline points="18 15 12 9 6 15"></polyline>
                              </svg>
                            </button>
                            
                            <button 
                              className="btn-icon"
                              onClick={() => moveActivityDown(module.id, activity.id)}
                              disabled={activityIndex === (module.activities?.length || 0) - 1}
                              title="Move down"
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
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </button>
                            
                            <button 
                              className="btn-icon delete"
                              onClick={() => deleteActivity(module.id, activity.id)}
                              title="Delete activity"
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
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseEditorModules;
