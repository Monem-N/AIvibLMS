/**
 * Grading Actions Tests
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_PENDING_SUBMISSIONS_REQUEST,
  FETCH_PENDING_SUBMISSIONS_SUCCESS,
  FETCH_PENDING_SUBMISSIONS_FAILURE,
  FETCH_SUBMISSION_REQUEST,
  FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_FAILURE,
  GRADE_SUBMISSION_REQUEST,
  GRADE_SUBMISSION_SUCCESS,
  GRADE_SUBMISSION_FAILURE,
  fetchPendingSubmissionsRequest,
  fetchPendingSubmissionsSuccess,
  fetchPendingSubmissionsFailure,
  fetchSubmissionRequest,
  fetchSubmissionSuccess,
  fetchSubmissionFailure,
  gradeSubmissionRequest,
  gradeSubmissionSuccess,
  gradeSubmissionFailure
} from '../../actions/gradingActions';
import { Submission, Grade } from '../../types/course';

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(),
  getDoc: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn()
}));

// Create mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Grading Actions', () => {
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
  
  describe('Action Creators', () => {
    it('should create an action to request pending submissions', () => {
      const expectedAction = {
        type: FETCH_PENDING_SUBMISSIONS_REQUEST
      };
      
      expect(fetchPendingSubmissionsRequest()).toEqual(expectedAction);
    });
    
    it('should create an action for successful pending submissions fetch', () => {
      const expectedAction = {
        type: FETCH_PENDING_SUBMISSIONS_SUCCESS,
        payload: mockSubmissions
      };
      
      expect(fetchPendingSubmissionsSuccess(mockSubmissions as Submission[])).toEqual(expectedAction);
    });
    
    it('should create an action for failed pending submissions fetch', () => {
      const error = 'Failed to fetch submissions';
      const expectedAction = {
        type: FETCH_PENDING_SUBMISSIONS_FAILURE,
        payload: error
      };
      
      expect(fetchPendingSubmissionsFailure(error)).toEqual(expectedAction);
    });
    
    it('should create an action to request a submission', () => {
      const expectedAction = {
        type: FETCH_SUBMISSION_REQUEST
      };
      
      expect(fetchSubmissionRequest()).toEqual(expectedAction);
    });
    
    it('should create an action for successful submission fetch', () => {
      const expectedAction = {
        type: FETCH_SUBMISSION_SUCCESS,
        payload: mockSubmission
      };
      
      expect(fetchSubmissionSuccess(mockSubmission as Submission)).toEqual(expectedAction);
    });
    
    it('should create an action for failed submission fetch', () => {
      const error = 'Failed to fetch submission';
      const expectedAction = {
        type: FETCH_SUBMISSION_FAILURE,
        payload: error
      };
      
      expect(fetchSubmissionFailure(error)).toEqual(expectedAction);
    });
    
    it('should create an action to request grading a submission', () => {
      const expectedAction = {
        type: GRADE_SUBMISSION_REQUEST
      };
      
      expect(gradeSubmissionRequest()).toEqual(expectedAction);
    });
    
    it('should create an action for successful submission grading', () => {
      const expectedAction = {
        type: GRADE_SUBMISSION_SUCCESS,
        payload: mockSubmission
      };
      
      expect(gradeSubmissionSuccess(mockSubmission as Submission)).toEqual(expectedAction);
    });
    
    it('should create an action for failed submission grading', () => {
      const error = 'Failed to grade submission';
      const expectedAction = {
        type: GRADE_SUBMISSION_FAILURE,
        payload: error
      };
      
      expect(gradeSubmissionFailure(error)).toEqual(expectedAction);
    });
  });
});
