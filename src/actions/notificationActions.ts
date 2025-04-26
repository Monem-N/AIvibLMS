/**
 * Notification Actions
 * 
 * Redux actions for notification management.
 */

import { Notification } from '../types/state';

// Action Types
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

// Action Interfaces
interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION;
  payload: Notification;
}

interface RemoveNotificationAction {
  type: typeof REMOVE_NOTIFICATION;
  payload: string; // notification id
}

interface ClearNotificationsAction {
  type: typeof CLEAR_NOTIFICATIONS;
}

export type NotificationActionTypes = 
  | AddNotificationAction 
  | RemoveNotificationAction 
  | ClearNotificationsAction;

// Action Creators
/**
 * Add notification action
 * @param notification Notification object
 * @returns Action object
 */
export const addNotification = (notification: Notification): AddNotificationAction => ({
  type: ADD_NOTIFICATION,
  payload: notification
});

/**
 * Remove notification action
 * @param id Notification ID
 * @returns Action object
 */
export const removeNotification = (id: string): RemoveNotificationAction => ({
  type: REMOVE_NOTIFICATION,
  payload: id
});

/**
 * Clear all notifications action
 * @returns Action object
 */
export const clearNotifications = (): ClearNotificationsAction => ({
  type: CLEAR_NOTIFICATIONS
});
