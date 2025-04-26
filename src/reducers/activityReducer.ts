/**
 * Activity Reducer
 * 
 * Redux reducer for activity state management.
 */

import { Activity } from '../types/course';
import { 
  ActivityActionTypes,
  FETCH_ACTIVITY_REQUEST,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAILURE,
  FETCH_MODULE_ACTIVITIES_REQUEST,
  FETCH_MODULE_ACTIVITIES_SUCCESS,
  FETCH_MODULE_ACTIVITIES_FAILURE,
  SUBMIT_ACTIVITY_REQUEST,
  SUBMIT_ACTIVITY_SUCCESS,
  SUBMIT_ACTIVITY_FAILURE
} from '../actions/activityActions';

interface ActivityState {
  currentActivity: Activity | null;
  moduleActivities: Activity[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  currentActivity: null,
  moduleActivities: [],
  loading: false,
  submitting: false,
  error: null
};

/**
 * Activity reducer
 * @param state Current state
 * @param action Action object
 * @returns New state
 */
const activityReducer = (
  state = initialState,
  action: ActivityActionTypes
): ActivityState => {
  switch (action.type) {
    case FETCH_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_ACTIVITY_SUCCESS:
      return {
        ...state,
        currentActivity: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case FETCH_MODULE_ACTIVITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_MODULE_ACTIVITIES_SUCCESS:
      return {
        ...state,
        moduleActivities: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_MODULE_ACTIVITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case SUBMIT_ACTIVITY_REQUEST:
      return {
        ...state,
        submitting: true,
        error: null
      };
    
    case SUBMIT_ACTIVITY_SUCCESS:
      return {
        ...state,
        currentActivity: state.currentActivity && state.currentActivity.id === action.payload.activityId
          ? {
              ...state.currentActivity,
              submissions: [
                action.payload.submission,
                ...(state.currentActivity.submissions || [])
              ],
              status: 'in-progress'
            }
          : state.currentActivity,
        submitting: false,
        error: null
      };
    
    case SUBMIT_ACTIVITY_FAILURE:
      return {
        ...state,
        submitting: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default activityReducer;
