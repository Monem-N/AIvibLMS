# ErrorMessage

The ErrorMessage component is used in the Hypatia LMS for displaying error messages and providing retry functionality when operations fail.

## Description

The ErrorMessage component provides a standardized way to display error messages throughout the application. It is used whenever an operation fails, such as data fetching, form submission, or authentication. The component displays a visually distinct error message with an optional retry button, helping users understand what went wrong and giving them the option to retry the failed operation.

## Visual Examples

### Basic Error Message

<!-- Note: Replace with actual screenshot when available -->
![Basic Error Message](https://via.placeholder.com/400x200?text=Basic+Error+Message)

Standard error message without retry button

### Error Message with Retry

<!-- Note: Replace with actual screenshot when available -->
![Error Message with Retry](https://via.placeholder.com/400x200?text=Error+Message+with+Retry)

Error message with retry button for failed operations

## Import

```tsx
import { ErrorMessage } from 'components/common/ErrorMessage';
```

Note: The actual import in code is:

```tsx
import ErrorMessage from 'components/common/ErrorMessage';
```

## Usage

```tsx
// Basic usage with error message
<ErrorMessage message="Failed to load data" />

// With retry functionality
<ErrorMessage
  message="Failed to load data"
  onRetry={() => fetchData()}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| message | string | - | Yes | The error message to display |
| onRetry | () => void | - | No | Callback function to retry the failed operation |

## Type Definitions

```tsx
/**
 * ErrorMessage Props Interface
 */
interface ErrorMessageProps {
  /**
   * The error message to display
   */
  message: string;

  /**
   * Callback function to retry the failed operation
   */
  onRetry?: () => void;
}
```

## Examples

### Basic Example

```tsx
<ErrorMessage message="Failed to load data" />
```

### With Retry Button

```tsx
<ErrorMessage
  message="Failed to load data"
  onRetry={() => fetchData()}
/>
```

### In Data Fetching Context

```tsx
// Inside a data fetching component
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getCourses();
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load courses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading courses..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchCourses}
      />
    );
  }

  return (
    <div className="course-list">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
```

### With Custom Styling

```tsx
<div className="custom-error-container">
  <ErrorMessage message="Something went wrong" />
</div>
```

## Features

1. **Standardized Error Display**: Provides a consistent way to display errors across the application
2. **Retry Functionality**: Optional retry button to allow users to retry failed operations
3. **Visual Distinction**: Uses color and iconography to clearly indicate an error state
4. **Customizable Message**: Allows for custom error messages to provide context about what went wrong
5. **Responsive Design**: Adapts to different screen sizes and container widths
6. **Accessible**: Follows accessibility best practices for error messages
7. **Lightweight**: Minimal implementation with small footprint
8. **Consistent Styling**: Matches the application's design system

## Accessibility

The ErrorMessage component is designed with accessibility in mind to ensure all users, including those with disabilities, can understand when errors occur and how to recover from them.

### Keyboard Navigation

- The retry button is fully keyboard accessible
- The button can be focused using the Tab key
- The button can be activated using the Enter or Space key

### Screen Reader Support

- The error title and message are readable by screen readers
- The component structure follows a logical reading order
- The retry button has a clear, descriptive label

### ARIA Attributes

- The component should be enhanced with appropriate ARIA attributes in a future update:
  - Adding `role="alert"` to the container to announce the error
  - Adding `aria-live="assertive"` to ensure screen readers announce the error immediately

### Color Contrast

- The error icon and title use a high-contrast red color against the background
- The error message text has sufficient contrast (dark gray on light background)
- The retry button uses the primary button style with sufficient contrast

### Focus Management

- When an error occurs, focus should be moved to the error message container
- The retry button has a visible focus indicator
- After retrying, focus should be managed appropriately based on the outcome

## Edge Cases

- **Empty Message**: When an empty string is provided as the message, the component still renders but with an empty message area
- **Long Messages**: Long error messages will wrap to multiple lines while maintaining the component's centered layout
- **HTML in Messages**: The component does not render HTML in messages, treating them as plain text for security
- **Multiple Errors**: When multiple errors occur, each should be displayed in its own ErrorMessage component
- **Container Size Constraints**: When placed in a small container, the component maintains its layout by wrapping text
- **Retry Function Errors**: If the retry function itself throws an error, the component will remain in the error state
- **Network Connectivity**: The retry button should be disabled if the device is offline
- **RTL Support**: The component layout should be mirrored in right-to-left languages

## Implementation Details

The ErrorMessage component is implemented using React with TypeScript. It displays an error message with an optional retry button.

```tsx
// Simplified implementation
import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry
}) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </div>
      <div className="error-content">
        <h3 className="error-title">Error</h3>
        <p className="error-message">{message}</p>
        {onRetry && (
          <button
            className="retry-button"
            onClick={onRetry}
            type="button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
```

### CSS Implementation

```css
/* ErrorMessage Component Styles */

.error-container {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background-color: #fff8f8;
  border: 1px solid #ffcdd2;
  border-radius: 4px;
  margin: 1rem 0;
}

.error-icon {
  color: #d32f2f;
  margin-right: 1rem;
  flex-shrink: 0;
}

.error-content {
  flex: 1;
}

.error-title {
  color: #d32f2f;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.error-message {
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.retry-button {
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background-color: #b71c1c;
}

.retry-button:focus {
  outline: 2px solid #d32f2f;
  outline-offset: 2px;
}
```

## Related Components

- [LoadingSpinner](./LoadingSpinner.md): Often used together with ErrorMessage for handling loading and error states
- [Button](./Button.md): The retry button uses the same styling as the Button component
- [NotificationModern](./NotificationModern.md): Similar to ErrorMessage but for temporary notifications
- [Form](../form/Form.md): Uses ErrorMessage to display form validation errors

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/ui-errormessage--default).

The Storybook examples demonstrate:

- Default error message without retry button
- Error message with retry functionality
- Different error message lengths
- Error message in different contexts (forms, data fetching, etc.)

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic error message |
| 1.1.0 | Added retry functionality |
| 1.2.0 | Improved styling and accessibility |
| 2.0.0 | Refactored to TypeScript |

## Technical Debt

The ErrorMessage component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |
| LP-002 | Inline SVG Icon | Contains hardcoded SVG icon instead of using an icon component | Makes maintenance difficult and increases bundle size | Extract to a reusable Icon component | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Attributes | Component lacks proper ARIA attributes for screen readers | Reduces accessibility for screen reader users | Add role="alert" and aria-live="assertive" | High |
| A-002 | No Network Detection | Retry button doesn't detect network connectivity | May cause confusion when offline | Add network connectivity detection | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Theming Support | Add support for theme-based colors | Improves visual consistency across themes | Low | Medium |
| RFO-002 | RTL Support | Add support for right-to-left languages | Improves internationalization | Low | Low |

For a complete technical debt analysis, see the [ErrorMessage Technical Debt Report](../technical-debt/ErrorMessage-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [ErrorMessage Version Compatibility Matrix](./ErrorMessage-version-compatibility.md)
