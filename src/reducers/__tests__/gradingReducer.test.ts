/**
 * Grading Reducer Tests
 */

import gradingReducer from '../gradingReducer';
import {
  FETCH_PENDING_SUBMISSIONS_REQUEST,
  FETCH_PENDING_SUBMISSIONS_SUCCESS,
  FETCH_PENDING_SUBMISSIONS_FAILURE,
  FETCH_SUBMISSION_REQUEST,
  FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_FAILURE,
  GRADE_SUBMISSION_REQUEST,
  GRADE_SUBMISSION_SUCCESS,
  GRADE_SUBMISSION_FAILURE
} from '../../actions/gradingActions';
import { Submission } from '../../types/course';

describe('gradingReducer', () => {
  // Initial state
  const initialState = {
    submissions: [],
    currentSubmission: null,
    loading: false,
    error: null
  };
  
  // Mock submissions
  const mockSubmissions: Partial<Submission>[] = [
    {
      id: 'submission-1',
      activityId: 'activity-1',
      status: 'submitted'
    },
    {
      id: 'submission-2',
      activityId: 'activity-2',
      status: 'submitted'
    }
  ];
  
  // Mock submission
  const mockSubmission: Partial<Submission> = {
    id: 'submission-1',
    activityId: 'activity-1',
    status: 'submitted'
  };
  
  // Mock updated submission
  const mockUpdatedSubmission: Partial<Submission> = {
    id: 'submission-1',
    activityId: 'activity-1',
    status: 'graded',
    grade: {
      score: 85,
      maxScore: 100,
      percentage: 85,
      feedback: 'Good work!'
    }
  };
  
  it('should return the initial state', () => {
    expect(gradingReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
  });
  
  it('should handle FETCH_PENDING_SUBMISSIONS_REQUEST', () => {
    const action = {
      type: FETCH_PENDING_SUBMISSIONS_REQUEST
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });
  
  it('should handle FETCH_PENDING_SUBMISSIONS_SUCCESS', () => {
    const action = {
      type: FETCH_PENDING_SUBMISSIONS_SUCCESS,
      payload: mockSubmissions
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      submissions: mockSubmissions,
      loading: false,
      error: null
    });
  });
  
  it('should handle FETCH_PENDING_SUBMISSIONS_FAILURE', () => {
    const action = {
      type: FETCH_PENDING_SUBMISSIONS_FAILURE,
      payload: 'Failed to fetch submissions'
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch submissions'
    });
  });
  
  it('should handle FETCH_SUBMISSION_REQUEST', () => {
    const action = {
      type: FETCH_SUBMISSION_REQUEST
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });
  
  it('should handle FETCH_SUBMISSION_SUCCESS', () => {
    const action = {
      type: FETCH_SUBMISSION_SUCCESS,
      payload: mockSubmission
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      currentSubmission: mockSubmission,
      loading: false,
      error: null
    });
  });
  
  it('should handle FETCH_SUBMISSION_FAILURE', () => {
    const action = {
      type: FETCH_SUBMISSION_FAILURE,
      payload: 'Failed to fetch submission'
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch submission'
    });
  });
  
  it('should handle GRADE_SUBMISSION_REQUEST', () => {
    const action = {
      type: GRADE_SUBMISSION_REQUEST
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });
  
  it('should handle GRADE_SUBMISSION_SUCCESS', () => {
    // Set up state with submissions and current submission
    const stateWithSubmissions = {
      ...initialState,
      submissions: mockSubmissions as Submission[],
      currentSubmission: mockSubmission as Submission
    };
    
    const action = {
      type: GRADE_SUBMISSION_SUCCESS,
      payload: mockUpdatedSubmission
    };
    
    const result = gradingReducer(stateWithSubmissions, action);
    
    // Check that the current submission is updated
    expect(result.currentSubmission).toEqual(mockUpdatedSubmission);
    
    // Check that the submission in the submissions array is updated
    expect(result.submissions.find(s => s.id === 'submission-1')).toEqual(mockUpdatedSubmission);
    
    // Check that other submissions are not changed
    expect(result.submissions.find(s => s.id === 'submission-2')).toEqual(mockSubmissions[1]);
    
    // Check that loading and error are reset
    expect(result.loading).toBe(false);
    expect(result.error).toBe(null);
  });
  
  it('should handle GRADE_SUBMISSION_FAILURE', () => {
    const action = {
      type: GRADE_SUBMISSION_FAILURE,
      payload: 'Failed to grade submission'
    };
    
    expect(gradingReducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to grade submission'
    });
  });
});
