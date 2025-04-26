/**
 * useNotification Hook
 * 
 * Custom hook for displaying notifications.
 * Provides methods for showing success, error, info, and warning notifications.
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addNotification, removeNotification } from '../actions/notificationActions';
import { Notification } from '../types/state';

export function useNotification() {
  const dispatch = useDispatch();
  
  /**
   * Show a notification
   * @param notification Notification object
   * @param duration Duration in milliseconds (default: 5000)
   */
  const showNotification = useCallback((
    notification: Omit<Notification, 'id' | 'visible'>,
    duration: number = 5000
  ) => {
    const id = uuidv4();
    
    // Add notification
    dispatch(addNotification({
      id,
      ...notification,
      visible: true
    }));
    
    // Remove notification after duration
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  }, [dispatch]);
  
  /**
   * Show a success notification
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  const showSuccess = useCallback((
    message: string,
    duration: number = 5000
  ) => {
    showNotification({
      message,
      type: 'success'
    }, duration);
  }, [showNotification]);
  
  /**
   * Show an error notification
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  const showError = useCallback((
    message: string,
    duration: number = 5000
  ) => {
    showNotification({
      message,
      type: 'error'
    }, duration);
  }, [showNotification]);
  
  /**
   * Show an info notification
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  const showInfo = useCallback((
    message: string,
    duration: number = 5000
  ) => {
    showNotification({
      message,
      type: 'info'
    }, duration);
  }, [showNotification]);
  
  /**
   * Show a warning notification
   * @param message Notification message
   * @param duration Duration in milliseconds (default: 5000)
   */
  const showWarning = useCallback((
    message: string,
    duration: number = 5000
  ) => {
    showNotification({
      message,
      type: 'warning'
    }, duration);
  }, [showNotification]);
  
  return {
    showNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
}
