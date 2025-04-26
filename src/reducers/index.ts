/**
 * Root Reducer
 *
 * Combines all reducers into a single root reducer.
 */

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';
import courseReducer from './courseReducer';
import announcementReducer from './announcementReducer';
import activityReducer from './activityReducer';
import gradingReducer from './gradingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  courses: courseReducer,
  announcements: announcementReducer,
  activities: activityReducer,
  grading: gradingReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
