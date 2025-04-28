/**
 * Redux Actions
 * 
 * This file contains action creators for the application.
 */

// User actions
export const setUser = (user: any) => ({
  type: 'SET_USER',
  payload: user,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});

// Notification actions
export const showNotification = (notification: any) => ({
  type: 'SHOW_NOTIFICATION',
  payload: {
    id: Date.now(),
    ...notification,
  },
});

export const hideNotification = (id: number) => ({
  type: 'HIDE_NOTIFICATION',
  payload: id,
});

export const clearNotifications = () => ({
  type: 'CLEAR_NOTIFICATIONS',
});
