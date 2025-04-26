/**
 * Course Reducer
 *
 * Redux reducer for course state management.
 */

import { Course } from '../types/course';
import {
  CourseActionTypes,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  FETCH_COURSE_REQUEST,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS,
  FETCH_PARTICIPANTS_FAILURE,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_FAILURE,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE
} from '../actions/courseActions';

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;
  participants: {
    participants: any[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
  participants: {
    participants: [],
    loading: false,
    error: null
  }
};

/**
 * Course reducer
 * @param state Current state
 * @param action Action object
 * @returns New state
 */
const courseReducer = (
  state = initialState,
  action: CourseActionTypes
): CourseState => {
  switch (action.type) {
    case FETCH_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        loading: false,
        error: null
      };

    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case FETCH_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        loading: false,
        error: null
      };

    case FETCH_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case FETCH_PARTICIPANTS_REQUEST:
      return {
        ...state,
        participants: {
          ...state.participants,
          loading: true,
          error: null
        }
      };

    case FETCH_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        participants: {
          participants: action.payload,
          loading: false,
          error: null
        }
      };

    case FETCH_PARTICIPANTS_FAILURE:
      return {
        ...state,
        participants: {
          ...state.participants,
          loading: false,
          error: action.payload
        }
      };

    case CREATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: [...state.courses, action.payload],
        currentCourse: action.payload,
        loading: false,
        error: null
      };

    case CREATE_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case UPDATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.id ? action.payload : course
        ),
        currentCourse: action.payload,
        loading: false,
        error: null
      };

    case UPDATE_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default courseReducer;
