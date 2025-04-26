import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../actions/actions';

/**
 * Custom hook for managing notifications
 * @returns {Object} - Notification methods
 */
export function useNotification() {
  const dispatch = useDispatch();
  
  /**
   * Show a notification
   * @param {Object} notification - Notification data
   * @param {string} notification.message - Notification message
   * @param {string} notification.type - Notification type (success, error, info, warning)
   * @param {number} [notification.duration=5000] - Notification duration in milliseconds
   */
  const showNotification = useCallback(({ message, type, duration = 5000 }) => {
    dispatch(setNotification({ 
      message, 
      type,
      id: Date.now().toString(),
      visible: true
    }));
    
    // Auto-hide notification after duration
    setTimeout(() => {
      dispatch(setNotification(null));
    }, duration);
  }, [dispatch]);
  
  /**
   * Hide the current notification
   */
  const hideNotification = useCallback(() => {
    dispatch(setNotification(null));
  }, [dispatch]);
  
  return {
    showNotification,
    hideNotification
  };
}
