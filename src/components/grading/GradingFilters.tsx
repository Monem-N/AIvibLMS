/**
 * GradingFilters Component
 * 
 * Provides filters for the grading dashboard.
 */

import React from 'react';
import { Course, Module } from '../../types/course';

// Import CSS
import './GradingFilters.css';

interface GradingFiltersProps {
  course: Course;
  filters: {
    moduleId: string;
    activityType: string;
    status: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

const GradingFilters: React.FC<GradingFiltersProps> = ({ 
  course,
  filters,
  onFilterChange
}) => {
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };
  
  return (
    <div className="grading-filters">
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        <button 
          className="btn btn-text"
          onClick={() => onFilterChange({
            moduleId: '',
            activityType: '',
            status: 'pending',
            search: ''
          })}
        >
          Clear All
        </button>
      </div>
      
      <div className="filters-content">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <div className="search-input-container">
            <input
              type="text"
              id="search"
              name="search"
              className="filter-input"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Search by student name or activity title"
            />
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
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        
        <div className="filter-group">
          <label htmlFor="moduleId">Module</label>
          <select
            id="moduleId"
            name="moduleId"
            className="filter-input"
            value={filters.moduleId}
            onChange={handleInputChange}
          >
            <option value="">All Modules</option>
            {course.modules && course.modules.map((module: Module) => (
              <option key={module.id} value={module.id}>
                {module.title}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="activityType">Activity Type</label>
          <select
            id="activityType"
            name="activityType"
            className="filter-input"
            value={filters.activityType}
            onChange={handleInputChange}
          >
            <option value="">All Types</option>
            <option value="assignment">Assignments</option>
            <option value="quiz">Quizzes</option>
            <option value="discussion">Discussions</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="filter-input"
            value={filters.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="graded">Graded</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GradingFilters;
