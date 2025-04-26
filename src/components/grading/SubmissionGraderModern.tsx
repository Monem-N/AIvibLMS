/**
 * SubmissionGraderModern Component
 * 
 * Modern submission grader component using functional components and hooks.
 * Allows instructors to grade student submissions and provide feedback.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchSubmission, gradeSubmission } from '../../actions/gradingActions';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';
import SubmissionHeader from './SubmissionHeader';
import SubmissionContent from './SubmissionContent';
import GradingForm from './GradingForm';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './SubmissionGrader.css';

const SubmissionGraderModern: React.FC = () => {
  // Get submission ID and course ID from URL params
  const { courseId, submissionId } = useParams<{ 
    courseId: string;
    submissionId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State
  const [gradeData, setGradeData] = useState({
    score: 0,
    feedback: '',
    status: 'graded'
  });
  const [submitting, setSubmitting] = useState(false);
  
  // Hooks
  const { user, isAuthenticated, hasRole } = useAuthContext();
  const { showSuccess, showError } = useNotification();
  
  // Redux state
  const { currentSubmission, loading, error } = useSelector(
    (state: RootState) => state.grading
  );
  
  // Effect to check authentication and permissions
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin', { state: { from: `/courses/${courseId}/grading/${submissionId}` } });
      return;
    }
    
    // Check if user has instructor or admin role
    if (!hasRole(['instructor', 'admin'])) {
      showError('You do not have permission to grade submissions');
      navigate(`/courses/${courseId}`);
      return;
    }
  }, [isAuthenticated, hasRole, navigate, courseId, submissionId, showError]);
  
  // Effect to fetch submission data
  useEffect(() => {
    if (courseId && submissionId) {
      dispatch(fetchSubmission(submissionId, courseId));
    }
  }, [courseId, submissionId, dispatch]);
  
  // Effect to set initial grade data
  useEffect(() => {
    if (currentSubmission && currentSubmission.grade) {
      setGradeData({
        score: currentSubmission.grade.score,
        feedback: currentSubmission.grade.feedback || '',
        status: 'graded'
      });
    } else if (currentSubmission && currentSubmission.activity) {
      setGradeData(prev => ({
        ...prev,
        score: Math.floor(currentSubmission.activity!.points! / 2) // Default to half points
      }));
    }
  }, [currentSubmission]);
  
  // Handle grade data change
  const handleGradeChange = (field: string, value: any) => {
    setGradeData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle submit grade
  const handleSubmitGrade = async () => {
    if (!currentSubmission || !currentSubmission.activity) {
      showError('Submission or activity data is missing');
      return;
    }
    
    // Validate score
    if (gradeData.score < 0 || gradeData.score > currentSubmission.activity.points!) {
      showError(`Score must be between 0 and ${currentSubmission.activity.points}`);
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Calculate percentage
      const percentage = Math.round((gradeData.score / currentSubmission.activity.points!) * 100);
      
      // Create grade object
      const grade = {
        score: gradeData.score,
        maxScore: currentSubmission.activity.points!,
        percentage,
        feedback: gradeData.feedback,
        gradedAt: new Date().toISOString(),
        gradedBy: {
          id: user!.uid,
          name: user!.displayName || 'Instructor'
        }
      };
      
      // Dispatch grade submission action
      await dispatch(gradeSubmission(
        submissionId!,
        courseId!,
        grade,
        gradeData.status
      ));
      
      showSuccess('Submission graded successfully');
      
      // Navigate back to grading dashboard
      navigate(`/courses/${courseId}/grading`);
    } catch (error: any) {
      showError(error.message || 'Failed to grade submission');
    } finally {
      setSubmitting(false);
    }
  };
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="submission-grader-container">
        <LoadingSpinner message="Loading submission..." />
      </div>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <div className="submission-grader-container">
        <ErrorMessage 
          message={error} 
          onRetry={() => dispatch(fetchSubmission(submissionId!, courseId!))}
        />
      </div>
    );
  }
  
  // If no submission, show not found state
  if (!currentSubmission) {
    return (
      <div className="submission-grader-container">
        <div className="submission-not-found">
          <h2>Submission Not Found</h2>
          <p>The submission you are looking for does not exist or you do not have access to it.</p>
          <Link 
            to={`/courses/${courseId}/grading`}
            className="btn btn-primary"
          >
            Back to Grading Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="submission-grader-container">
      <SubmissionHeader 
        submission={currentSubmission}
        courseId={courseId!}
      />
      
      <div className="submission-grader-content">
        <div className="submission-content-container">
          <SubmissionContent 
            submission={currentSubmission}
          />
        </div>
        
        <div className="grading-form-container">
          <GradingForm 
            submission={currentSubmission}
            gradeData={gradeData}
            onChange={handleGradeChange}
            onSubmit={handleSubmitGrade}
            submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default SubmissionGraderModern;
