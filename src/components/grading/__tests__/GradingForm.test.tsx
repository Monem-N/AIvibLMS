/**
 * GradingForm Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GradingForm from '../GradingForm';
import { Submission } from '../../../types/course';

describe('GradingForm Component', () => {
  // Mock submission data
  const mockSubmission: Partial<Submission> = {
    id: 'test-submission-id',
    activityId: 'activity-1',
    status: 'submitted',
    activity: {
      id: 'activity-1',
      title: 'Assignment 1',
      type: 'assignment',
      points: 100
    }
  };
  
  // Mock grade data
  const mockGradeData = {
    score: 85,
    feedback: 'Good work!',
    status: 'graded'
  };
  
  // Mock onChange and onSubmit functions
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnSubmit.mockClear();
  });
  
  it('renders without crashing', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    expect(screen.getByText('Grade Submission')).toBeInTheDocument();
  });
  
  it('displays grade percentage and letter grade', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
  
  it('displays score input with correct value', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    const scoreInput = screen.getByRole('spinbutton');
    expect(scoreInput).toHaveValue(85);
  });
  
  it('displays feedback textarea with correct value', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    const feedbackTextarea = screen.getByLabelText('Feedback');
    expect(feedbackTextarea).toHaveValue('Good work!');
  });
  
  it('displays status select with correct value', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    const statusSelect = screen.getByLabelText('Status');
    expect(statusSelect).toHaveValue('graded');
  });
  
  it('calls onChange when score is changed', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    const scoreInput = screen.getByRole('spinbutton');
    fireEvent.change(scoreInput, { target: { value: '90' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('score', 90);
  });
  
  it('calls onChange when feedback is changed', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    const feedbackTextarea = screen.getByLabelText('Feedback');
    fireEvent.change(feedbackTextarea, { target: { value: 'Excellent work!' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('feedback', 'Excellent work!');
  });
  
  it('calls onChange when status is changed', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    const statusSelect = screen.getByLabelText('Status');
    fireEvent.change(statusSelect, { target: { value: 'returned' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('status', 'returned');
  });
  
  it('calls onSubmit when submit button is clicked', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    const submitButton = screen.getByText('Submit Grade');
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
  
  it('disables submit button when submitting is true', () => {
    render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={mockGradeData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={true}
      />
    );
    
    const submitButton = screen.getByText('Submitting...');
    expect(submitButton).toBeDisabled();
  });
  
  it('displays correct letter grade for different percentages', () => {
    // Test for A grade
    const gradeDataA = { ...mockGradeData, score: 95 };
    const { rerender } = render(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={gradeDataA}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    
    // Test for B grade
    const gradeDataB = { ...mockGradeData, score: 85 };
    rerender(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={gradeDataB}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    
    // Test for C grade
    const gradeDataC = { ...mockGradeData, score: 75 };
    rerender(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={gradeDataC}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    
    // Test for D grade
    const gradeDataD = { ...mockGradeData, score: 65 };
    rerender(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={gradeDataD}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    
    // Test for F grade
    const gradeDataF = { ...mockGradeData, score: 55 };
    rerender(
      <GradingForm 
        submission={mockSubmission as Submission}
        gradeData={gradeDataF}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    
    expect(screen.getByText('55%')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
  });
});
