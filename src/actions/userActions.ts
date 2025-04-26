/**
 * User Actions
 *
 * Redux actions for user management.
 */

import { User } from '../types/user';
import { UserData } from '../types/state';

// Action Types
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

// Action Interfaces
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface ClearUserAction {
  type: typeof CLEAR_USER;
}

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: Partial<User>;
}

interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: UserData;
}

interface UpdateUserDataAction {
  type: typeof UPDATE_USER_DATA;
  payload: Partial<UserData>;
}

interface ClearUserDataAction {
  type: typeof CLEAR_USER_DATA;
}

export type UserActionTypes =
  | SetUserAction
  | ClearUserAction
  | UpdateUserAction
  | SetUserDataAction
  | UpdateUserDataAction
  | ClearUserDataAction;

// Action Creators
/**
 * Set user action
 * @param user User object
 * @returns Action object
 */
export const setUser = (user: User): SetUserAction => ({
  type: SET_USER,
  payload: user
});

/**
 * Clear user action
 * @returns Action object
 */
export const clearUser = (): ClearUserAction => ({
  type: CLEAR_USER
});

/**
 * Update user action
 * @param userData Partial user object
 * @returns Action object
 */
export const updateUser = (userData: Partial<User>): UpdateUserAction => ({
  type: UPDATE_USER,
  payload: userData
});

/**
 * Set user data action
 * @param userData User data object
 * @returns Action object
 */
export const setUserData = (userData: UserData): SetUserDataAction => ({
  type: SET_USER_DATA,
  payload: userData
});

/**
 * Update user data action
 * @param userData Partial user data object
 * @returns Action object
 */
export const updateUserData = (userData: Partial<UserData>): UpdateUserDataAction => ({
  type: UPDATE_USER_DATA,
  payload: userData
});

/**
 * Clear user data action
 * @returns Action object
 */
export const clearUserData = (): ClearUserDataAction => ({
  type: CLEAR_USER_DATA
});
