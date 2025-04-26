/**
 * ActivityHeader Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActivityHeader from '../ActivityHeader';
import { Activity } from '../../../types/course';

describe('ActivityHeader Component', () => {
  // Mock activity data
  const mockActivity: Activity = {
    id: 'activity-123',
    title: 'Introduction to React Hooks',
    description: 'Learn about React Hooks and how to use them in your applications.',
    type: 'assignment',
    status: 'not-started',
    dueDate: '2023-12-31T23:59:59Z',
    points: 100,
    moduleId: 'module-123',
    moduleTitle: 'React Fundamentals',
    order: 1
  };
  
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Introduction to React Hooks')).toBeInTheDocument();
  });
  
  it('displays activity title and description', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Introduction to React Hooks')).toBeInTheDocument();
    expect(screen.getByText('Learn about React Hooks and how to use them in your applications.')).toBeInTheDocument();
  });
  
  it('displays breadcrumbs navigation', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Course')).toBeInTheDocument();
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Introduction to React Hooks')).toBeInTheDocument();
  });
  
  it('displays activity type', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Assignment')).toBeInTheDocument();
  });
  
  it('displays points information', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('100 points')).toBeInTheDocument();
  });
  
  it('displays due date information', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    // Check if due date is displayed (exact format may vary by locale)
    const dueDateText = screen.getByText(/Due: December 31, 2023/i);
    expect(dueDateText).toBeInTheDocument();
  });
  
  it('displays status badge', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Not Started')).toBeInTheDocument();
  });
  
  it('displays correct status badge for completed activity', () => {
    const completedActivity = {
      ...mockActivity,
      status: 'completed' as const
    };
    
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={completedActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toHaveClass('badge-success');
  });
  
  it('displays correct status badge for in-progress activity', () => {
    const inProgressActivity = {
      ...mockActivity,
      status: 'in-progress' as const
    };
    
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={inProgressActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toHaveClass('badge-primary');
  });
  
  it('displays back to course button', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Back to Course')).toBeInTheDocument();
    expect(screen.getByText('Back to Course').closest('a')).toHaveAttribute('href', '/courses/course-123');
  });
  
  it('displays download button for content type activities', () => {
    const contentActivity = {
      ...mockActivity,
      type: 'content' as const
    };
    
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={contentActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
  
  it('does not display download button for non-content type activities', () => {
    render(
      <BrowserRouter>
        <ActivityHeader 
          activity={mockActivity}
          courseId="course-123"
          moduleId="module-123"
        />
      </BrowserRouter>
    );
    
    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });
});
