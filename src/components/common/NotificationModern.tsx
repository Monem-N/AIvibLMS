/**
 * NotificationModern Component
 *
 * Modern notification component using functional components and hooks.
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../actions/notificationActions';
import { RootState, Notification } from '../../types/state';

// Import CSS
import './Notification.css';

// Import Material-UI icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

const NotificationModern: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications || []);

  /**
   * Handle close notification
   * @param id Notification ID
   */
  const handleClose = (id: string) => {
    dispatch(removeNotification(id));
  };

  /**
   * Get icon based on notification type
   * @param type Notification type
   * @returns Icon component
   */
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="notification-icon success" />;
      case 'error':
        return <ErrorIcon className="notification-icon error" />;
      case 'info':
        return <InfoIcon className="notification-icon info" />;
      case 'warning':
        return <WarningIcon className="notification-icon warning" />;
      default:
        return <InfoIcon className="notification-icon info" />;
    }
  };

  if (!notifications.length) {
    return null;
  }

  return (
    <div className="notifications-container">
      {notifications.map((notification: Notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={handleClose}
          getIcon={getIcon}
        />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  notification: {
    id: string;
    message: string;
    type: string;
  };
  onClose: (id: string) => void;
  getIcon: (type: string) => React.ReactNode;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClose,
  getIcon
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Add animation class after component is mounted
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`notification ${notification.type} ${isVisible ? 'visible' : ''}`}
      role="alert"
    >
      <div className="notification-content">
        {getIcon(notification.type)}
        <div className="notification-message">{notification.message}</div>
      </div>

      <button
        className="notification-close"
        onClick={() => onClose(notification.id)}
        aria-label="Close notification"
      >
        <CloseIcon className="close-icon" />
      </button>
    </div>
  );
};

export default NotificationModern;
