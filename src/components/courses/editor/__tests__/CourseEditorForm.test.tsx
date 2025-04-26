/**
 * CourseEditorForm Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseEditorForm from '../CourseEditorForm';
import { Course } from '../../../../types/course';

describe('CourseEditorForm Component', () => {
  // Mock course data
  const mockCourse: Partial<Course> = {
    title: 'Introduction to React',
    description: 'Learn the basics of React and build your first application.',
    category: 'Web Development',
    level: 'beginner',
    startDate: '2023-01-01T00:00:00.000Z',
    endDate: '2023-06-30T00:00:00.000Z'
  };
  
  // Mock onChange function
  const mockOnChange = jest.fn();
  
  beforeEach(() => {
    mockOnChange.mockClear();
  });
  
  it('renders without crashing', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByLabelText(/Course Title/i)).toBeInTheDocument();
  });
  
  it('displays course data correctly', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByLabelText(/Course Title/i)).toHaveValue('Introduction to React');
    expect(screen.getByLabelText(/Course Description/i)).toHaveValue('Learn the basics of React and build your first application.');
    expect(screen.getByLabelText(/Category/i)).toHaveValue('Web Development');
    expect(screen.getByLabelText(/Difficulty Level/i)).toHaveValue('beginner');
    expect(screen.getByLabelText(/Start Date/i)).toHaveValue('2023-01-01');
    expect(screen.getByLabelText(/End Date/i)).toHaveValue('2023-06-30');
  });
  
  it('calls onChange when title is changed', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    const titleInput = screen.getByLabelText(/Course Title/i);
    fireEvent.change(titleInput, { target: { value: 'Advanced React' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('title', 'Advanced React');
  });
  
  it('calls onChange when description is changed', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    const descriptionInput = screen.getByLabelText(/Course Description/i);
    fireEvent.change(descriptionInput, { target: { value: 'Advanced React concepts' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('description', 'Advanced React concepts');
  });
  
  it('calls onChange when category is changed', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    const categorySelect = screen.getByLabelText(/Category/i);
    fireEvent.change(categorySelect, { target: { value: 'Computer Science' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('category', 'Computer Science');
  });
  
  it('calls onChange when level is changed', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    const levelSelect = screen.getByLabelText(/Difficulty Level/i);
    fireEvent.change(levelSelect, { target: { value: 'advanced' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('level', 'advanced');
  });
  
  it('calls onChange when start date is changed', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    const startDateInput = screen.getByLabelText(/Start Date/i);
    fireEvent.change(startDateInput, { target: { value: '2023-02-01' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange.mock.calls[0][0]).toBe('startDate');
    // The second argument should be an ISO string, but we can't check the exact value
    // because it depends on the timezone of the test runner
    expect(typeof mockOnChange.mock.calls[0][1]).toBe('string');
  });
  
  it('calls onChange when end date is changed', () => {
    render(
      <CourseEditorForm 
        courseData={mockCourse}
        onChange={mockOnChange}
      />
    );
    
    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDateInput, { target: { value: '2023-07-31' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange.mock.calls[0][0]).toBe('endDate');
    // The second argument should be an ISO string, but we can't check the exact value
    // because it depends on the timezone of the test runner
    expect(typeof mockOnChange.mock.calls[0][1]).toBe('string');
  });
  
  it('renders empty form with default values when no course data is provided', () => {
    render(
      <CourseEditorForm 
        courseData={{}}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByLabelText(/Course Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Course Description/i)).toHaveValue('');
    expect(screen.getByLabelText(/Category/i)).toHaveValue('');
    expect(screen.getByLabelText(/Difficulty Level/i)).toHaveValue('beginner');
    expect(screen.getByLabelText(/Start Date/i)).toHaveValue('');
    expect(screen.getByLabelText(/End Date/i)).toHaveValue('');
  });
});
