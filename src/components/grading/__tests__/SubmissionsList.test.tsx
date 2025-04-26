/**
 * SubmissionsList Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SubmissionsList from '../SubmissionsList';
import { Submission } from '../../../types/course';

describe('SubmissionsList Component', () => {
  // Mock submissions data
  const mockSubmissions: Partial<Submission>[] = [
    {
      id: 'submission-1',
      activityId: 'activity-1',
      userId: 'user-1',
      submittedAt: '2023-01-01T00:00:00.000Z',
      status: 'submitted',
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
      student: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    },
    {
      id: 'submission-2',
      activityId: 'activity-2',
      userId: 'user-2',
      submittedAt: '2023-01-02T00:00:00.000Z',
      status: 'submitted',
      activity: {
        id: 'activity-2',
        title: 'Quiz 1',
        type: 'quiz',
        points: 50
      },
      module: {
        id: 'module-2',
        title: 'Module 2'
      },
      student: {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    },
    {
      id: 'submission-3',
      activityId: 'activity-3',
      userId: 'user-3',
      submittedAt: '2023-01-03T00:00:00.000Z',
      status: 'graded',
      activity: {
        id: 'activity-3',
        title: 'Discussion 1',
        type: 'discussion',
        points: 20
      },
      module: {
        id: 'module-1',
        title: 'Module 1'
      },
      student: {
        id: 'user-3',
        name: 'Bob Johnson',
        email: 'bob@example.com'
      }
    }
  ];
  
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Activity')).toBeInTheDocument();
    expect(screen.getByText('Module')).toBeInTheDocument();
    expect(screen.getByText('Submitted')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
  
  it('displays all submissions', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('Module 1')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Quiz 1')).toBeInTheDocument();
    expect(screen.getByText('Module 2')).toBeInTheDocument();
    
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Discussion 1')).toBeInTheDocument();
  });
  
  it('displays student information', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });
  
  it('displays activity information', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('100 points')).toBeInTheDocument();
    
    expect(screen.getByText('Quiz 1')).toBeInTheDocument();
    expect(screen.getByText('50 points')).toBeInTheDocument();
    
    expect(screen.getByText('Discussion 1')).toBeInTheDocument();
    expect(screen.getByText('20 points')).toBeInTheDocument();
  });
  
  it('displays module information', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    // There should be two occurrences of Module 1
    const module1Elements = screen.getAllByText('Module 1');
    expect(module1Elements.length).toBe(2);
    
    expect(screen.getByText('Module 2')).toBeInTheDocument();
  });
  
  it('displays submission dates', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    // The exact format may vary, but it should contain the dates
    expect(screen.getByText(/Jan(uary)? 1, 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Jan(uary)? 2, 2023/)).toBeInTheDocument();
    expect(screen.getByText(/Jan(uary)? 3, 2023/)).toBeInTheDocument();
  });
  
  it('displays submission status', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    // There should be two occurrences of Submitted
    const submittedElements = screen.getAllByText('Submitted');
    expect(submittedElements.length).toBe(2);
    
    expect(screen.getByText('Graded')).toBeInTheDocument();
  });
  
  it('displays grade buttons for each submission', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    // There should be three Grade buttons
    const gradeButtons = screen.getAllByText('Grade');
    expect(gradeButtons.length).toBe(3);
  });
  
  it('links to the correct grading page', () => {
    render(
      <BrowserRouter>
        <SubmissionsList 
          submissions={mockSubmissions as Submission[]}
          courseId="course-1"
        />
      </BrowserRouter>
    );
    
    // Check the href of the first Grade button
    const firstGradeButton = screen.getAllByText('Grade')[0];
    expect(firstGradeButton.closest('a')).toHaveAttribute('href', '/courses/course-1/grading/submission-1');
    
    // Check the href of the second Grade button
    const secondGradeButton = screen.getAllByText('Grade')[1];
    expect(secondGradeButton.closest('a')).toHaveAttribute('href', '/courses/course-1/grading/submission-2');
    
    // Check the href of the third Grade button
    const thirdGradeButton = screen.getAllByText('Grade')[2];
    expect(thirdGradeButton.closest('a')).toHaveAttribute('href', '/courses/course-1/grading/submission-3');
  });
});
