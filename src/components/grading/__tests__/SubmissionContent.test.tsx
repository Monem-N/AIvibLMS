/**
 * SubmissionContent Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SubmissionContent from '../SubmissionContent';
import { Submission, Attachment, Grade } from '../../../types/course';

describe('SubmissionContent Component', () => {
  // Mock submission data
  const mockSubmission: Partial<Submission> = {
    id: 'test-submission-id',
    activityId: 'activity-1',
    userId: 'user-1',
    content: 'This is my submission content.',
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
      content: 'Please complete the assignment.',
      type: 'assignment',
      points: 100
    }
  };
  
  // Mock attachments
  const mockAttachments: Attachment[] = [
    {
      id: 'attachment-1',
      name: 'document.pdf',
      type: 'application/pdf',
      url: 'https://example.com/document.pdf',
      size: 1024000, // 1MB
      uploadedAt: '2023-01-01T00:00:00.000Z'
    },
    {
      id: 'attachment-2',
      name: 'image.jpg',
      type: 'image/jpeg',
      url: 'https://example.com/image.jpg',
      size: 512000, // 500KB
      uploadedAt: '2023-01-01T00:00:00.000Z'
    }
  ];
  
  // Mock grade
  const mockGrade: Grade = {
    score: 85,
    maxScore: 100,
    percentage: 85,
    feedback: 'Good work!',
    gradedAt: '2023-01-02T00:00:00.000Z',
    gradedBy: {
      id: 'instructor-1',
      name: 'Professor Smith'
    }
  };
  
  it('renders without crashing', () => {
    render(
      <SubmissionContent 
        submission={mockSubmission as Submission}
      />
    );
    
    expect(screen.getByText('Submission')).toBeInTheDocument();
  });
  
  it('displays submission content', () => {
    render(
      <SubmissionContent 
        submission={mockSubmission as Submission}
      />
    );
    
    expect(screen.getByText('This is my submission content.')).toBeInTheDocument();
  });
  
  it('displays student information', () => {
    render(
      <SubmissionContent 
        submission={mockSubmission as Submission}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  it('displays submission date', () => {
    render(
      <SubmissionContent 
        submission={mockSubmission as Submission}
      />
    );
    
    // The exact format may vary, but it should contain the date
    expect(screen.getByText(/Jan(uary)? 1, 2023/)).toBeInTheDocument();
  });
  
  it('displays activity instructions when available', () => {
    render(
      <SubmissionContent 
        submission={mockSubmission as Submission}
      />
    );
    
    expect(screen.getByText('Activity Instructions')).toBeInTheDocument();
    expect(screen.getByText('Please complete the assignment.')).toBeInTheDocument();
  });
  
  it('does not display activity instructions when not available', () => {
    const submissionWithoutInstructions = {
      ...mockSubmission,
      activity: {
        ...mockSubmission.activity,
        content: undefined
      }
    };
    
    render(
      <SubmissionContent 
        submission={submissionWithoutInstructions as Submission}
      />
    );
    
    expect(screen.queryByText('Activity Instructions')).not.toBeInTheDocument();
  });
  
  it('displays attachments when available', () => {
    const submissionWithAttachments = {
      ...mockSubmission,
      attachments: mockAttachments
    };
    
    render(
      <SubmissionContent 
        submission={submissionWithAttachments as Submission}
      />
    );
    
    expect(screen.getByText('Attachments')).toBeInTheDocument();
    expect(screen.getByText('document.pdf')).toBeInTheDocument();
    expect(screen.getByText('image.jpg')).toBeInTheDocument();
    expect(screen.getByText('1 MB')).toBeInTheDocument();
    expect(screen.getByText('500 KB')).toBeInTheDocument();
  });
  
  it('does not display attachments when not available', () => {
    render(
      <SubmissionContent 
        submission={mockSubmission as Submission}
      />
    );
    
    expect(screen.queryByText('Attachments')).not.toBeInTheDocument();
  });
  
  it('displays previous grade when available', () => {
    const submissionWithGrade = {
      ...mockSubmission,
      grade: mockGrade
    };
    
    render(
      <SubmissionContent 
        submission={submissionWithGrade as Submission}
      />
    );
    
    expect(screen.getByText('Previous Grade')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('(85%)')).toBeInTheDocument();
    expect(screen.getByText('Good work!')).toBeInTheDocument();
    expect(screen.getByText('Professor Smith')).toBeInTheDocument();
    expect(screen.getByText(/Jan(uary)? 2, 2023/)).toBeInTheDocument();
  });
  
  it('does not display previous grade when not available', () => {
    render(
      <SubmissionContent 
        submission={mockSubmission as Submission}
      />
    );
    
    expect(screen.queryByText('Previous Grade')).not.toBeInTheDocument();
  });
});
