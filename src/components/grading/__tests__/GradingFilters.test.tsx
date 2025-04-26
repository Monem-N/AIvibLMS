/**
 * GradingFilters Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GradingFilters from '../GradingFilters';
import { Course, Module } from '../../../types/course';

describe('GradingFilters Component', () => {
  // Mock course data
  const mockCourse: Partial<Course> = {
    id: 'course-1',
    title: 'Introduction to Computer Science',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1',
        order: 1
      },
      {
        id: 'module-2',
        title: 'Module 2',
        order: 2
      },
      {
        id: 'module-3',
        title: 'Module 3',
        order: 3
      }
    ] as Module[]
  };
  
  // Mock filters
  const mockFilters = {
    moduleId: '',
    activityType: '',
    status: 'pending',
    search: ''
  };
  
  // Mock onFilterChange function
  const mockOnFilterChange = jest.fn();
  
  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });
  
  it('renders without crashing', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });
  
  it('displays search input', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });
  
  it('displays module filter with course modules', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByLabelText('Module')).toBeInTheDocument();
    expect(screen.getByText('All Modules')).toBeInTheDocument();
    expect(screen.getByText('Module 1')).toBeInTheDocument();
    expect(screen.getByText('Module 2')).toBeInTheDocument();
    expect(screen.getByText('Module 3')).toBeInTheDocument();
  });
  
  it('displays activity type filter', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByLabelText('Activity Type')).toBeInTheDocument();
    expect(screen.getByText('All Types')).toBeInTheDocument();
    expect(screen.getByText('Assignments')).toBeInTheDocument();
    expect(screen.getByText('Quizzes')).toBeInTheDocument();
    expect(screen.getByText('Discussions')).toBeInTheDocument();
  });
  
  it('displays status filter', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Graded')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });
  
  it('displays clear all button', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });
  
  it('calls onFilterChange when search input changes', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({ search: 'test search' });
  });
  
  it('calls onFilterChange when module filter changes', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const moduleSelect = screen.getByLabelText('Module');
    fireEvent.change(moduleSelect, { target: { value: 'module-1' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({ moduleId: 'module-1' });
  });
  
  it('calls onFilterChange when activity type filter changes', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const activityTypeSelect = screen.getByLabelText('Activity Type');
    fireEvent.change(activityTypeSelect, { target: { value: 'assignment' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({ activityType: 'assignment' });
  });
  
  it('calls onFilterChange when status filter changes', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const statusSelect = screen.getByLabelText('Status');
    fireEvent.change(statusSelect, { target: { value: 'graded' } });
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: 'graded' });
  });
  
  it('calls onFilterChange with reset filters when clear all is clicked', () => {
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={{
          moduleId: 'module-1',
          activityType: 'assignment',
          status: 'graded',
          search: 'test search'
        }}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      moduleId: '',
      activityType: '',
      status: 'pending',
      search: ''
    });
  });
  
  it('displays filter values correctly', () => {
    const customFilters = {
      moduleId: 'module-2',
      activityType: 'quiz',
      status: 'graded',
      search: 'test search'
    };
    
    render(
      <GradingFilters 
        course={mockCourse as Course}
        filters={customFilters}
        onFilterChange={mockOnFilterChange}
      />
    );
    
    expect(screen.getByLabelText('Search')).toHaveValue('test search');
    expect(screen.getByLabelText('Module')).toHaveValue('module-2');
    expect(screen.getByLabelText('Activity Type')).toHaveValue('quiz');
    expect(screen.getByLabelText('Status')).toHaveValue('graded');
  });
});
