/**
 * NotificationContext
 *
 * Context for managing notifications throughout the application.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  autoHide?: boolean;
  timeout?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (notification: Omit<Notification, 'id'>) => void;
  hideNotification: (id: number) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Use a ref for the counter to avoid re-renders
  const idCounterRef = React.useRef(0);

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    // Generate a truly unique ID
    const id = Date.now() + idCounterRef.current;

    // Increment counter for next notification
    idCounterRef.current += 1;

    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-hide notification after timeout if autoHide is not explicitly set to false
    if (notification.autoHide !== false) {
      const timeout = notification.timeout || 5000;
      setTimeout(() => {
        hideNotification(id);
      }, timeout);
    }
  };

  const hideNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        hideNotification,
        clearNotifications,
      }}
    >
      {children}

      {/* Render notifications */}
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.timeout || 5000}
          onClose={() => hideNotification(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => hideNotification(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
