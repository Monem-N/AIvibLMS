# GradingForm

The GradingForm component provides an interface for instructors to grade student submissions in the Hypatia LMS.

## Description

The GradingForm component allows instructors to enter scores, provide feedback, and update the status of student submissions. It handles validation, calculation of grades, and submission of grading data.

## Usage

```tsx
import { GradingForm } from 'components/grading/GradingForm';

<GradingForm
  submission={submission}
  gradeData={gradeData}
  onChange={handleGradeChange}
  onSubmit={handleSubmitGrade}
  submitting={isSubmitting}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| submission | Submission | - | Yes | The submission to be graded |
| gradeData | GradeData | - | Yes | The current grade data |
| onChange | (field: string, value: any) => void | - | Yes | Function called when a grade field changes |
| onSubmit | () => void | - | Yes | Function called when the form is submitted |
| submitting | boolean | false | No | Whether the form is currently submitting |
| readOnly | boolean | false | No | Whether the form is in read-only mode |
| className | string | - | No | Additional CSS class names |

## Type Definitions

```tsx
interface Submission {
  id: string;
  activityId: string;
  userId: string;
  content: string;
  attachments?: Attachment[];
  status: 'submitted' | 'graded' | 'returned' | 'late';
  submittedAt: string;
  activity: {
    id: string;
    title: string;
    type: 'assignment' | 'quiz' | 'discussion';
    points: number;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
  grade?: Grade;
}

interface GradeData {
  score: number;
  feedback: string;
  status: 'graded' | 'returned' | 'pending';
  rubricScores?: Record<string, number>;
  privateNotes?: string;
}

interface Grade extends GradeData {
  maxScore: number;
  percentage: number;
  gradedAt: string;
  gradedBy: {
    id: string;
    name: string;
  };
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}
```

## Examples

### Basic Grading Form

```tsx
const submission = {
  id: 'submission-1',
  activityId: 'activity-1',
  userId: 'user-1',
  content: 'This is my submission',
  status: 'submitted',
  submittedAt: '2023-08-01T12:00:00Z',
  activity: {
    id: 'activity-1',
    title: 'Assignment 1',
    type: 'assignment',
    points: 100
  }
};

const gradeData = {
  score: 85,
  feedback: 'Good work!',
  status: 'graded'
};

const handleGradeChange = (field, value) => {
  // Update grade data
};

const handleSubmitGrade = () => {
  // Submit grade
};

<GradingForm
  submission={submission}
  gradeData={gradeData}
  onChange={handleGradeChange}
  onSubmit={handleSubmitGrade}
  submitting={false}
/>
```

### Read-Only Grading Form

```tsx
<GradingForm
  submission={submission}
  gradeData={submission.grade}
  onChange={handleGradeChange}
  onSubmit={handleSubmitGrade}
  readOnly={true}
/>
```

### Grading Form with Rubric

```tsx
const submissionWithRubric = {
  // ... submission data
  activity: {
    // ... activity data
    rubric: {
      criteria: [
        {
          id: 'criteria-1',
          title: 'Content',
          points: 40,
          levels: [
            { id: 'level-1', title: 'Excellent', points: 40 },
            { id: 'level-2', title: 'Good', points: 30 },
            { id: 'level-3', title: 'Fair', points: 20 },
            { id: 'level-4', title: 'Poor', points: 10 }
          ]
        },
        {
          id: 'criteria-2',
          title: 'Organization',
          points: 30,
          levels: [
            { id: 'level-1', title: 'Excellent', points: 30 },
            { id: 'level-2', title: 'Good', points: 20 },
            { id: 'level-3', title: 'Fair', points: 10 },
            { id: 'level-4', title: 'Poor', points: 5 }
          ]
        },
        {
          id: 'criteria-3',
          title: 'Grammar',
          points: 30,
          levels: [
            { id: 'level-1', title: 'Excellent', points: 30 },
            { id: 'level-2', title: 'Good', points: 20 },
            { id: 'level-3', title: 'Fair', points: 10 },
            { id: 'level-4', title: 'Poor', points: 5 }
          ]
        }
      ]
    }
  }
};

const gradeDataWithRubric = {
  score: 85,
  feedback: 'Good work!',
  status: 'graded',
  rubricScores: {
    'criteria-1': 30,
    'criteria-2': 30,
    'criteria-3': 25
  }
};

<GradingForm
  submission={submissionWithRubric}
  gradeData={gradeDataWithRubric}
  onChange={handleGradeChange}
  onSubmit={handleSubmitGrade}
  submitting={false}
/>
```

## Features

The GradingForm component includes the following features:

1. **Score Input**: Input field for entering the score
2. **Feedback Editor**: Rich text editor for providing feedback
3. **Status Selection**: Dropdown for selecting the submission status
4. **Grade Calculation**: Automatic calculation of percentage based on score and maximum points
5. **Validation**: Validation of score and feedback
6. **Rubric Grading**: Support for rubric-based grading (when a rubric is available)
7. **Private Notes**: Optional field for instructor-only notes
8. **Submission History**: Display of previous grading history (if available)

## Accessibility

The GradingForm component follows these accessibility guidelines:

- All form fields have associated labels
- Error messages are linked to form fields
- Form fields can be navigated using keyboard
- Rich text editor is accessible via keyboard
- Color is not the only means of conveying information
- Form validation provides clear feedback

## Edge Cases

- **Zero Points Activities**: For activities with zero points, the score input is disabled and the percentage is always 100%.
- **Partial Rubric Grading**: If not all rubric criteria are graded, the total score is calculated based on the graded criteria only.
- **Score Exceeding Maximum**: The form prevents entering a score higher than the maximum points.
- **Form Validation**: The form validates that the score is a number between 0 and the maximum points, and that feedback is provided.
- **Submission Status**: Changing the submission status may affect the visibility of the submission to the student.

## Implementation Details

The GradingForm component is implemented using a combination of form components and custom logic:

```tsx
// Simplified implementation
import React, { useState, useEffect } from 'react';
import { Input } from 'components/form/Input';
import { Select } from 'components/form/Select';
import { RichTextEditor } from 'components/form/RichTextEditor';
import { Button } from 'components/ui/Button';
import { Card } from 'components/ui/Card';
import { RubricGrader } from './RubricGrader';

export const GradingForm: React.FC<GradingFormProps> = ({
  submission,
  gradeData,
  onChange,
  onSubmit,
  submitting = false,
  readOnly = false,
  className
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const maxPoints = submission.activity.points;
  
  // Calculate percentage
  const percentage = maxPoints > 0 
    ? Math.round((gradeData.score / maxPoints) * 100) 
    : 100;
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (isNaN(gradeData.score)) {
      newErrors.score = 'Score must be a number';
    } else if (gradeData.score < 0) {
      newErrors.score = 'Score cannot be negative';
    } else if (gradeData.score > maxPoints) {
      newErrors.score = `Score cannot exceed ${maxPoints} points`;
    }
    
    if (!gradeData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit();
    }
  };
  
  // Handle score change
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onChange('score', isNaN(value) ? 0 : value);
  };
  
  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange('status', e.target.value);
  };
  
  // Handle feedback change
  const handleFeedbackChange = (value: string) => {
    onChange('feedback', value);
  };
  
  // Handle rubric score change
  const handleRubricScoreChange = (criteriaId: string, score: number) => {
    const rubricScores = {
      ...(gradeData.rubricScores || {}),
      [criteriaId]: score
    };
    
    onChange('rubricScores', rubricScores);
    
    // Calculate total score from rubric
    const activity = submission.activity;
    if (activity.rubric) {
      const totalScore = Object.entries(rubricScores).reduce((total, [criteriaId, score]) => {
        return total + score;
      }, 0);
      
      onChange('score', totalScore);
    }
  };
  
  return (
    <Card className={className}>
      <form onSubmit={handleSubmit}>
        <h2>Grade Submission</h2>
        
        {/* Rubric grader (if available) */}
        {submission.activity.rubric && (
          <RubricGrader
            rubric={submission.activity.rubric}
            scores={gradeData.rubricScores || {}}
            onChange={handleRubricScoreChange}
            readOnly={readOnly}
          />
        )}
        
        {/* Score input */}
        <div className="form-group">
          <Input
            label="Score"
            type="number"
            value={gradeData.score}
            onChange={handleScoreChange}
            min={0}
            max={maxPoints}
            disabled={readOnly || submitting}
            error={errors.score}
          />
          <div className="percentage">
            {percentage}% ({gradeData.score} / {maxPoints})
          </div>
        </div>
        
        {/* Feedback editor */}
        <div className="form-group">
          <RichTextEditor
            label="Feedback"
            value={gradeData.feedback}
            onChange={handleFeedbackChange}
            readOnly={readOnly || submitting}
            error={errors.feedback}
          />
        </div>
        
        {/* Status selection */}
        <div className="form-group">
          <Select
            label="Status"
            value={gradeData.status}
            onChange={handleStatusChange}
            disabled={readOnly || submitting}
          >
            <option value="graded">Graded</option>
            <option value="returned">Return for Revision</option>
            <option value="pending">Save as Draft</option>
          </Select>
        </div>
        
        {/* Private notes */}
        <div className="form-group">
          <Input
            label="Private Notes (not visible to student)"
            type="textarea"
            value={gradeData.privateNotes || ''}
            onChange={(e) => onChange('privateNotes', e.target.value)}
            disabled={readOnly || submitting}
          />
        </div>
        
        {/* Submit button */}
        {!readOnly && (
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            loading={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Grade'}
          </Button>
        )}
      </form>
    </Card>
  );
};
```

## Related Components

- [SubmissionContent](./SubmissionContent.md): Displays the content of a submission
- [SubmissionHeader](./SubmissionHeader.md): Displays header information for a submission
- [RubricGrader](./RubricGrader.md): Component for grading using a rubric
- [GradingHistory](./GradingHistory.md): Displays the grading history for a submission
- [SubmissionsList](./SubmissionsList.md): Displays a list of submissions for grading
