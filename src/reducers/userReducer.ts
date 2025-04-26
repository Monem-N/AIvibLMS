/**
 * User Reducer
 *
 * Redux reducer for user state management.
 */

import { User } from '../types/user';
import { UserState } from '../types/state';
import {
  UserActionTypes,
  SET_USER,
  CLEAR_USER,
  UPDATE_USER,
  SET_USER_DATA,
  UPDATE_USER_DATA,
  CLEAR_USER_DATA
} from '../actions/userActions';

const initialState: UserState = {
  user: null,
  userData: null,
  loading: false,
  error: null
};

/**
 * User reducer
 * @param state Current state
 * @param action Action object
 * @returns New state
 */
const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false,
        error: null
      };

    case UPDATE_USER:
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
        loading: false,
        error: null
      };

    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: state.userData ? { ...state.userData, ...action.payload } : null,
        loading: false,
        error: null
      };

    case CLEAR_USER_DATA:
      return {
        ...state,
        userData: null,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

export default userReducer;
