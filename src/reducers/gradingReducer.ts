/**
 * Grading Reducer
 * 
 * Redux reducer for grading state management.
 */

import { Submission } from '../types/course';
import {
  GradingActionTypes,
  FETCH_PENDING_SUBMISSIONS_REQUEST,
  FETCH_PENDING_SUBMISSIONS_SUCCESS,
  FETCH_PENDING_SUBMISSIONS_FAILURE,
  FETCH_SUBMISSION_REQUEST,
  FETCH_SUBMISSION_SUCCESS,
  FETCH_SUBMISSION_FAILURE,
  GRADE_SUBMISSION_REQUEST,
  GRADE_SUBMISSION_SUCCESS,
  GRADE_SUBMISSION_FAILURE
} from '../actions/gradingActions';

interface GradingState {
  submissions: Submission[];
  currentSubmission: Submission | null;
  loading: boolean;
  error: string | null;
}

const initialState: GradingState = {
  submissions: [],
  currentSubmission: null,
  loading: false,
  error: null
};

/**
 * Grading reducer
 * @param state Current state
 * @param action Action object
 * @returns New state
 */
const gradingReducer = (
  state = initialState,
  action: GradingActionTypes
): GradingState => {
  switch (action.type) {
    case FETCH_PENDING_SUBMISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_PENDING_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        submissions: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_PENDING_SUBMISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case FETCH_SUBMISSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_SUBMISSION_SUCCESS:
      return {
        ...state,
        currentSubmission: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_SUBMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case GRADE_SUBMISSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GRADE_SUBMISSION_SUCCESS:
      return {
        ...state,
        currentSubmission: action.payload,
        submissions: state.submissions.map(submission => 
          submission.id === action.payload.id ? action.payload : submission
        ),
        loading: false,
        error: null
      };
    
    case GRADE_SUBMISSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default gradingReducer;
