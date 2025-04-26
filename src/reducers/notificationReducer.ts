/**
 * Notification Reducer
 * 
 * Redux reducer for notification state management.
 */

import { Notification } from '../types/state';
import { 
  NotificationActionTypes, 
  ADD_NOTIFICATION, 
  REMOVE_NOTIFICATION, 
  CLEAR_NOTIFICATIONS 
} from '../actions/notificationActions';

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: []
};

/**
 * Notification reducer
 * @param state Current state
 * @param action Action object
 * @returns New state
 */
const notificationReducer = (
  state = initialState, 
  action: NotificationActionTypes
): NotificationState => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };
    
    default:
      return state;
  }
};

export default notificationReducer;
