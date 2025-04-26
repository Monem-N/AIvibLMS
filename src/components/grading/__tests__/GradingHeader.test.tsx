/**
 * GradingHeader Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GradingHeader from '../GradingHeader';
import { Course } from '../../../types/course';

describe('GradingHeader Component', () => {
  // Mock course data
  const mockCourse: Partial<Course> = {
    id: 'course-1',
    title: 'Introduction to Computer Science'
  };
  
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Grading Dashboard')).toBeInTheDocument();
  });
  
  it('displays course title', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Introduction to Computer Science')).toBeInTheDocument();
  });
  
  it('displays submissions count with plural text', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('5 submissions to grade')).toBeInTheDocument();
  });
  
  it('displays submissions count with singular text', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={1}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('1 submission to grade')).toBeInTheDocument();
  });
  
  it('displays breadcrumb navigation', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Introduction to Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Grading')).toBeInTheDocument();
  });
  
  it('displays back to course button', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Back to Course')).toBeInTheDocument();
  });
  
  it('links to the correct course page', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    const backButton = screen.getByText('Back to Course');
    expect(backButton.closest('a')).toHaveAttribute('href', '/courses/course-1');
  });
  
  it('links to the courses page', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    const coursesLink = screen.getByText('Courses');
    expect(coursesLink.closest('a')).toHaveAttribute('href', '/courses');
  });
  
  it('links to the course page', () => {
    render(
      <BrowserRouter>
        <GradingHeader 
          course={mockCourse as Course}
          submissionsCount={5}
        />
      </BrowserRouter>
    );
    
    const courseLink = screen.getByText('Introduction to Computer Science');
    expect(courseLink.closest('a')).toHaveAttribute('href', '/courses/course-1');
  });
});
