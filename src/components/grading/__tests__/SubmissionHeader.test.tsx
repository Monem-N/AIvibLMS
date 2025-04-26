/**
 * SubmissionHeader Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SubmissionHeader from '../SubmissionHeader';
import { Submission } from '../../../types/course';

describe('SubmissionHeader Component', () => {
  // Mock submission data
  const mockSubmission: Partial<Submission> = {
    id: 'test-submission-id',
    activityId: 'activity-1',
    userId: 'user-1',
    submittedAt: '2023-01-01T00:00:00.000Z',
    status: 'submitted',
    student: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    activity: {
      id: 'activity-1',
      title: 'Assignment 1',
      type: 'assignment',
      points: 100
    },
    module: {
      id: 'module-1',
      title: 'Module 1'
    },
    course: {
      id: 'course-1',
      title: 'Introduction to Computer Science'
    }
  };
  
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
  });
  
  it('displays breadcrumb navigation', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Introduction to Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Grading')).toBeInTheDocument();
    expect(screen.getByText('Submission')).toBeInTheDocument();
  });
  
  it('displays submission title', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
  });
  
  it('displays student name', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  it('displays submission date', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    // The exact format may vary, but it should contain the date
    expect(screen.getByText(/Jan(uary)? 1, 2023/)).toBeInTheDocument();
  });
  
  it('displays module title', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Module 1')).toBeInTheDocument();
  });
  
  it('displays points when available', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  
  it('displays submission status', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Submitted')).toBeInTheDocument();
  });
  
  it('displays back to grading button', () => {
    render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={mockSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Back to Grading')).toBeInTheDocument();
  });
  
  it('handles different submission statuses', () => {
    // Test for graded status
    const gradedSubmission = {
      ...mockSubmission,
      status: 'graded'
    };
    
    const { rerender } = render(
      <BrowserRouter>
        <SubmissionHeader 
          submission={gradedSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Graded')).toBeInTheDocument();
    
    // Test for returned status
    const returnedSubmission = {
      ...mockSubmission,
      status: 'returned'
    };
    
    rerender(
      <BrowserRouter>
        <SubmissionHeader 
          submission={returnedSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Returned')).toBeInTheDocument();
    
    // Test for draft status
    const draftSubmission = {
      ...mockSubmission,
      status: 'draft'
    };
    
    rerender(
      <BrowserRouter>
        <SubmissionHeader 
          submission={draftSubmission as Submission}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });
});
