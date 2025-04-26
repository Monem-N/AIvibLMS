# NotificationModern

The NotificationModern component is used in the Hypatia LMS for displaying temporary notifications and alerts to users.

## Description

The NotificationModern component provides a standardized way to display notifications throughout the application. It is used to inform users about the result of an action, system events, or important updates. The component supports different types of notifications (success, error, warning, info) and can be configured to automatically dismiss after a specified duration or require manual dismissal.

## Visual Examples

### Success Notification

<!-- Note: Replace with actual screenshot when available -->
![Success Notification](https://via.placeholder.com/400x100?text=Success+Notification)

Success notification with checkmark icon and green styling

### Error Notification

<!-- Note: Replace with actual screenshot when available -->
![Error Notification](https://via.placeholder.com/400x100?text=Error+Notification)

Error notification with X icon and red styling

### Warning Notification

<!-- Note: Replace with actual screenshot when available -->
![Warning Notification](https://via.placeholder.com/400x100?text=Warning+Notification)

Warning notification with exclamation icon and yellow styling

### Info Notification

<!-- Note: Replace with actual screenshot when available -->
![Info Notification](https://via.placeholder.com/400x100?text=Info+Notification)

Info notification with information icon and blue styling

## Import

```tsx
import { NotificationModern } from 'components/ui/NotificationModern';
```

Note: The actual import in code is:

```tsx
import NotificationModern from 'components/ui/NotificationModern';
```

## Usage

```tsx
// Basic success notification
<NotificationModern
  type="success"
  message="Operation completed successfully"
/>

// Error notification with custom duration
<NotificationModern
  type="error"
  message="Failed to save changes"
  duration={5000}
/>

// Warning notification with manual dismissal
<NotificationModern
  type="warning"
  message="Your session will expire soon"
  autoDismiss={false}
/>

// Info notification with action button
<NotificationModern
  type="info"
  message="New update available"
  actionText="Update Now"
  onAction={() => updateApplication()}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| type | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | No | The type of notification |
| message | string | - | Yes | The notification message |
| duration | number | 3000 | No | Duration in milliseconds before auto-dismissal |
| autoDismiss | boolean | true | No | Whether the notification should automatically dismiss |
| actionText | string | - | No | Text for the action button |
| onAction | () => void | - | No | Callback function for the action button |
| onDismiss | () => void | - | No | Callback function when notification is dismissed |
| position | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center' | 'top-right' | No | Position of the notification |

## Type Definitions

```tsx
/**
 * NotificationModern Props Interface
 */
interface NotificationModernProps {
  /**
   * The type of notification
   * @default 'info'
   */
  type?: 'success' | 'error' | 'warning' | 'info';

  /**
   * The notification message
   */
  message: string;

  /**
   * Duration in milliseconds before auto-dismissal
   * @default 3000
   */
  duration?: number;

  /**
   * Whether the notification should automatically dismiss
   * @default true
   */
  autoDismiss?: boolean;

  /**
   * Text for the action button
   */
  actionText?: string;

  /**
   * Callback function for the action button
   */
  onAction?: () => void;

  /**
   * Callback function when notification is dismissed
   */
  onDismiss?: () => void;

  /**
   * Position of the notification
   * @default 'top-right'
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}
```

## Examples

### Success Notification

```tsx
<NotificationModern
  type="success"
  message="Course created successfully"
/>
```

### Error Notification

```tsx
<NotificationModern
  type="error"
  message="Failed to submit assignment"
  duration={5000}
/>
```

### Warning Notification with Action

```tsx
<NotificationModern
  type="warning"
  message="Your session will expire in 5 minutes"
  actionText="Extend Session"
  onAction={() => extendSession()}
  autoDismiss={false}
/>
```

### Info Notification with Custom Position

```tsx
<NotificationModern
  type="info"
  message="New message received"
  position="bottom-right"
/>
```

### In Context Example

```tsx
// Inside a form submission handler
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    setSubmitting(true);
    await api.saveData(formData);
    setSubmitting(false);

    // Show success notification
    showNotification({
      type: 'success',
      message: 'Data saved successfully',
      duration: 3000
    });

    resetForm();
  } catch (error) {
    setSubmitting(false);

    // Show error notification
    showNotification({
      type: 'error',
      message: error.message || 'Failed to save data',
      duration: 5000
    });
  }
};
```

## Features

1. **Multiple Notification Types**: Supports success, error, warning, and info notifications
2. **Customizable Duration**: Configurable display duration with auto-dismiss option
3. **Action Button**: Optional action button for user interaction
4. **Positioning**: Configurable positioning on the screen
5. **Animated Transitions**: Smooth entrance and exit animations
6. **Stacking**: Multiple notifications stack in order
7. **Responsive Design**: Adapts to different screen sizes
8. **Accessible**: Follows accessibility best practices for notifications
9. **Dismissible**: Can be manually dismissed by the user
10. **Callback Support**: Provides callbacks for dismiss and action events

## Accessibility

The NotificationModern component is designed with accessibility in mind to ensure all users, including those with disabilities, can perceive and interact with notifications.

### Keyboard Navigation

- The dismiss button is fully keyboard accessible
- The action button (if present) is fully keyboard accessible
- Both buttons can be focused using the Tab key
- Both buttons can be activated using the Enter or Space key

### Screen Reader Support

- The notification type is announced to screen readers
- The notification message is readable by screen readers
- The component structure follows a logical reading order
- The dismiss and action buttons have clear, descriptive labels

### ARIA Attributes

- The component uses `role="alert"` to announce the notification
- The component uses `aria-live="polite"` for non-critical notifications
- The component uses `aria-live="assertive"` for critical notifications (errors)
- The dismiss button has `aria-label="Dismiss notification"`
- The action button has a descriptive `aria-label` based on the action text

### Color Contrast

- All notification types use colors with sufficient contrast against the text
- The dismiss and action buttons have sufficient contrast
- The notification is visible against both light and dark backgrounds

### Focus Management

- When a notification appears, focus remains on the current element
- When a notification is dismissed, focus returns to the previously focused element
- The dismiss and action buttons have visible focus indicators

## Edge Cases

- **Multiple Notifications**: When multiple notifications are displayed, they stack in order with the newest on top
- **Long Messages**: Long notification messages wrap to multiple lines while maintaining the component's layout
- **HTML in Messages**: The component does not render HTML in messages, treating them as plain text for security
- **No Action Text**: If actionText is provided but onAction is not, the action button is not displayed
- **Auto Dismiss with Action**: If autoDismiss is true and the user clicks the action button, the notification is dismissed after the action is performed
- **Zero Duration**: If duration is set to 0, the notification will not auto-dismiss regardless of the autoDismiss setting
- **Screen Size Changes**: The component maintains its position and layout when the screen size changes
- **RTL Support**: The component layout is mirrored in right-to-left languages

## Implementation Details

The NotificationModern component is implemented using React with TypeScript. It uses CSS transitions for smooth animations.

```tsx
// Simplified implementation
import React, { useEffect, useState } from 'react';
import './NotificationModern.css';

interface NotificationModernProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  autoDismiss?: boolean;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const NotificationModern: React.FC<NotificationModernProps> = ({
  type = 'info',
  message,
  duration = 3000,
  autoDismiss = true,
  actionText,
  onAction,
  onDismiss,
  position = 'top-right'
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (autoDismiss && duration > 0) {
      timer = setTimeout(() => {
        handleDismiss();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoDismiss, duration]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 300); // Wait for exit animation
  };

  const handleAction = () => {
    if (onAction) onAction();
    if (autoDismiss) handleDismiss();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <svg className="notification-icon success" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>;
      case 'error':
        return <svg className="notification-icon error" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>;
      case 'warning':
        return <svg className="notification-icon warning" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>;
      default:
        return <svg className="notification-icon info" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>;
    }
  };

  if (!visible) return null;

  return (
    <div className={`notification-container ${position}`}>
      <div
        className={`notification ${type} ${visible ? 'visible' : ''}`}
        role="alert"
        aria-live={type === 'error' ? 'assertive' : 'polite'}
      >
        <div className="notification-content">
          {getIcon()}
          <p className="notification-message">{message}</p>
        </div>
        <div className="notification-actions">
          {actionText && onAction && (
            <button
              className="notification-action-button"
              onClick={handleAction}
              aria-label={actionText}
            >
              {actionText}
            </button>
          )}
          <button
            className="notification-dismiss-button"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
          >
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModern;
```

### CSS Implementation

```css
/* NotificationModern Component Styles */

.notification-container {
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.notification-container.top-right {
  top: 0;
  right: 0;
}

.notification-container.top-left {
  top: 0;
  left: 0;
}

.notification-container.bottom-right {
  bottom: 0;
  right: 0;
}

.notification-container.bottom-left {
  bottom: 0;
  left: 0;
}

.notification-container.top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.notification-container.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s, transform 0.3s;
}

.notification.visible {
  opacity: 1;
  transform: translateY(0);
}

.notification.success {
  border-left: 4px solid #4caf50;
}

.notification.error {
  border-left: 4px solid #f44336;
}

.notification.warning {
  border-left: 4px solid #ff9800;
}

.notification.info {
  border-left: 4px solid #2196f3;
}

.notification-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.notification-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.notification-icon.success {
  fill: #4caf50;
}

.notification-icon.error {
  fill: #f44336;
}

.notification-icon.warning {
  fill: #ff9800;
}

.notification-icon.info {
  fill: #2196f3;
}

.notification-message {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.notification-actions {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.notification-action-button {
  background: none;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #2196f3;
  font-weight: 500;
  margin-right: 8px;
}

.notification-dismiss-button {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-dismiss-button svg {
  width: 16px;
  height: 16px;
  fill: #999;
}

@media (max-width: 480px) {
  .notification-container {
    max-width: 100%;
    width: 100%;
    padding: 8px;
  }

  .notification {
    padding: 10px 12px;
  }

  .notification-message {
    font-size: 13px;
  }
}
```

## Related Components

- [ErrorMessage](./ErrorMessage.md): Used for persistent error messages, while NotificationModern is for temporary notifications
- [LoadingSpinner](./LoadingSpinner.md): Often used together with NotificationModern for loading and success/error states
- [Button](./Button.md): The action button uses similar styling to the Button component
- [Toast](./Toast.md): A simpler version of NotificationModern for less important messages

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/ui-notificationmodern--default).

The Storybook examples demonstrate:

- Different notification types (success, error, warning, info)
- Auto-dismiss and manual dismiss options
- Notifications with action buttons
- Different positioning options
- Multiple stacked notifications

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic notification types |
| 1.1.0 | Added action button support |
| 1.2.0 | Added positioning options |
| 1.3.0 | Added stacking support for multiple notifications |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Improved accessibility with ARIA attributes |

## Technical Debt

The NotificationModern component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Inline SVG Icons | Contains hardcoded SVG icons instead of using an icon component | Makes maintenance difficult and increases bundle size | Extract to a reusable Icon component | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Focus Management | Does not properly manage focus when multiple notifications appear | May confuse screen reader users | Implement proper focus management | High |
| A-002 | Color Reliance | Relies on color alone to distinguish notification types | Difficult for colorblind users to distinguish | Add additional visual cues | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Notification Manager | Create a global notification manager | Improves management of multiple notifications | Medium | High |
| RFO-002 | Animation Customization | Add support for custom animations | Improves flexibility | Low | Low |

For a complete technical debt analysis, see the [NotificationModern Technical Debt Report](../technical-debt/NotificationModern-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [NotificationModern Version Compatibility Matrix](./NotificationModern-version-compatibility.md)
