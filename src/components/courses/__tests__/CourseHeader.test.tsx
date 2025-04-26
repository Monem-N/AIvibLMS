/**
 * CourseHeader Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CourseHeader from '../CourseHeader';
import { Course } from '../../../types/course';

describe('CourseHeader Component', () => {
  // Mock course data
  const mockCourse: Course = {
    id: 'course-123',
    title: 'Introduction to React',
    description: 'Learn the basics of React and build your first application.',
    instructor: {
      id: 'instructor-123',
      name: 'John Doe'
    },
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    status: 'published',
    progress: 45,
    category: 'Web Development',
    level: 'beginner'
  };
  
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Introduction to React')).toBeInTheDocument();
  });
  
  it('displays course title and description', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Introduction to React')).toBeInTheDocument();
    expect(screen.getByText('Learn the basics of React and build your first application.')).toBeInTheDocument();
  });
  
  it('displays course metadata', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });
  
  it('displays formatted dates', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    // Check if dates are formatted (exact format may vary by locale)
    const datesText = screen.getByText(/Jan 1, 2023 - Jun 30, 2023/i);
    expect(datesText).toBeInTheDocument();
  });
  
  it('displays progress information', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    
    // Check if progress bar is rendered
    const progressFill = document.querySelector('.progress-fill');
    expect(progressFill).toHaveStyle('width: 45%');
  });
  
  it('displays instructor information', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Instructor')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if instructor link is correct
    const instructorLink = screen.getByText('John Doe');
    expect(instructorLink.closest('a')).toHaveAttribute('href', '/instructors/instructor-123');
  });
  
  it('displays avatar placeholder when instructor has no avatar', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    // Check if avatar placeholder is rendered with first letter of instructor name
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');
    expect(avatarPlaceholder).toBeInTheDocument();
    expect(avatarPlaceholder).toHaveTextContent('J');
  });
  
  it('displays avatar image when instructor has avatar', () => {
    const courseWithAvatar = {
      ...mockCourse,
      instructor: {
        ...mockCourse.instructor,
        avatar: 'https://example.com/avatar.jpg'
      }
    };
    
    render(
      <BrowserRouter>
        <CourseHeader course={courseWithAvatar} />
      </BrowserRouter>
    );
    
    // Check if avatar image is rendered
    const avatarImage = document.querySelector('.instructor-avatar img');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(avatarImage).toHaveAttribute('alt', 'John Doe');
  });
  
  it('displays action buttons', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Continue Learning')).toBeInTheDocument();
    expect(screen.getByText('Download Materials')).toBeInTheDocument();
  });
  
  it('displays correct status badge for published course', () => {
    render(
      <BrowserRouter>
        <CourseHeader course={mockCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Active')).toHaveClass('badge-success');
  });
  
  it('displays correct status badge for archived course', () => {
    const archivedCourse = {
      ...mockCourse,
      status: 'archived' as const
    };
    
    render(
      <BrowserRouter>
        <CourseHeader course={archivedCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Completed')).toHaveClass('badge-secondary');
  });
  
  it('displays correct status badge for draft course', () => {
    const draftCourse = {
      ...mockCourse,
      status: 'draft' as const
    };
    
    render(
      <BrowserRouter>
        <CourseHeader course={draftCourse} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Coming Soon')).toHaveClass('badge-warning');
  });
});
