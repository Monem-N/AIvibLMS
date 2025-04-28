import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification, removeNotification } from '../actions/notificationActions';
import { Notification } from '../types/state';

/**
 * Custom hook for managing notifications
 * @returns {Object} - Notification methods
 */
export function useNotification() {
  const dispatch = useDispatch();

  /**
   * Show a success notification
   * @param {string} message - Notification message
   * @param {number} [duration=5000] - Notification duration in milliseconds
   */
  const showSuccess = useCallback((message: string, duration: number = 5000) => {
    const id = Date.now().toString();

    dispatch(addNotification({
      id,
      message,
      type: 'success',
      visible: true,
      duration
    }));

    // Auto-hide notification after duration
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  }, [dispatch]);

  /**
   * Show an error notification
   * @param {string} message - Notification message
   * @param {number} [duration=5000] - Notification duration in milliseconds
   */
  const showError = useCallback((message: string, duration: number = 5000) => {
    const id = Date.now().toString();

    dispatch(addNotification({
      id,
      message,
      type: 'error',
      visible: true,
      duration
    }));

    // Auto-hide notification after duration
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  }, [dispatch]);

  /**
   * Show an info notification
   * @param {string} message - Notification message
   * @param {number} [duration=5000] - Notification duration in milliseconds
   */
  const showInfo = useCallback((message: string, duration: number = 5000) => {
    const id = Date.now().toString();

    dispatch(addNotification({
      id,
      message,
      type: 'info',
      visible: true,
      duration
    }));

    // Auto-hide notification after duration
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  }, [dispatch]);

  /**
   * Show a warning notification
   * @param {string} message - Notification message
   * @param {number} [duration=5000] - Notification duration in milliseconds
   */
  const showWarning = useCallback((message: string, duration: number = 5000) => {
    const id = Date.now().toString();

    dispatch(addNotification({
      id,
      message,
      type: 'warning',
      visible: true,
      duration
    }));

    // Auto-hide notification after duration
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  }, [dispatch]);

  /**
   * Show a notification
   * @param {Object} notification - Notification data
   * @param {string} notification.message - Notification message
   * @param {string} notification.type - Notification type (success, error, info, warning)
   * @param {number} [notification.duration=5000] - Notification duration in milliseconds
   */
  const showNotification = useCallback(({
    message,
    type = 'info',
    duration = 5000
  }: {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number
  }) => {
    const id = Date.now().toString();

    dispatch(addNotification({
      id,
      message,
      type,
      visible: true,
      duration
    }));

    // Auto-hide notification after duration
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  }, [dispatch]);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showNotification
  };
}
