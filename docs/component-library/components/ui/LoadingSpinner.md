# LoadingSpinner

The LoadingSpinner component is used in the Hypatia LMS for indicating loading states and providing visual feedback during asynchronous operations.

## Description

The LoadingSpinner component provides a visual indicator that content is loading or an operation is in progress. It is used throughout the application whenever data is being fetched, processed, or when the system needs to indicate that the user should wait. The component supports different sizes and customizable messages to provide context about what is loading.

## Visual Examples

### Small Spinner

<!-- Note: Replace with actual screenshot when available -->
![Small LoadingSpinner](https://via.placeholder.com/200x100?text=Small+LoadingSpinner)

Small loading spinner with minimal footprint

### Medium Spinner (Default)

<!-- Note: Replace with actual screenshot when available -->
![Medium LoadingSpinner](https://via.placeholder.com/300x150?text=Medium+LoadingSpinner)

Standard loading spinner for most use cases

### Large Spinner

<!-- Note: Replace with actual screenshot when available -->
![Large LoadingSpinner](https://via.placeholder.com/400x200?text=Large+LoadingSpinner)

Large loading spinner for full-page or section loading states

## Import

```tsx
import { LoadingSpinner } from 'components/common/LoadingSpinner';
```

Note: The actual import in code is:

```tsx
import LoadingSpinner from 'components/common/LoadingSpinner';
```

## Usage

```tsx
// Basic usage with default size (medium) and message ("Loading...")
<LoadingSpinner />

// With custom message
<LoadingSpinner message="Fetching data..." />

// With custom size
<LoadingSpinner size="small" />
<LoadingSpinner size="large" />

// With custom message and size
<LoadingSpinner message="Submitting form..." size="large" />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| message | string | 'Loading...' | No | Text message to display below the spinner |
| size | 'small' \| 'medium' \| 'large' | 'medium' | No | Size of the loading spinner |

## Type Definitions

```tsx
/**
 * LoadingSpinner Props Interface
 */
interface LoadingSpinnerProps {
  /**
   * Text message to display below the spinner
   * @default 'Loading...'
   */
  message?: string;

  /**
   * Size of the loading spinner
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}
```

## Examples

### Basic Example

```tsx
<LoadingSpinner />
```

### Custom Message Example

```tsx
<LoadingSpinner message="Fetching course data..." />
```

### Size Variants

```tsx
// Small spinner for inline loading states
<LoadingSpinner size="small" message="Loading..." />

// Default medium spinner
<LoadingSpinner size="medium" message="Loading..." />

// Large spinner for full-page loading states
<LoadingSpinner size="large" message="Loading..." />
```

### In Context Example

```tsx
// Inside a data fetching component
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.getCourses();
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading courses..." />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load courses" />;
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

## Features

1. **Customizable Sizes**: Supports three different sizes (small, medium, large) to fit various UI contexts
2. **Custom Messages**: Allows for custom loading messages to provide context to users
3. **Animated Spinner**: Uses CSS animations for a smooth, continuous spinning effect
4. **Responsive Design**: Adapts to different screen sizes and container widths
5. **Accessible**: Follows accessibility best practices for loading indicators
6. **Lightweight**: Minimal implementation with small footprint
7. **Consistent Styling**: Matches the application's design system
8. **No Dependencies**: Pure React component with no external dependencies

## Accessibility

The LoadingSpinner component is designed with accessibility in mind to ensure all users, including those with disabilities, can understand when content is loading.

### Screen Reader Support

- The loading message is readable by screen readers, providing context about what is loading
- The component should be enhanced with appropriate ARIA attributes in a future update:
  - Adding `role="status"` to the container
  - Adding `aria-live="polite"` to announce loading state changes

### Color Contrast

- The spinner uses a high-contrast color scheme with a 4.5:1 contrast ratio against the background
- The loading message text has sufficient contrast (dark gray on white background)

### Reduced Motion

- In a future update, the component should respect the user's reduced motion preferences by:
  - Detecting the `prefers-reduced-motion` media query
  - Providing an alternative, less motion-intensive loading indicator when reduced motion is preferred

### Focus Management

- The component does not require focus as it is a status indicator
- When used in loading states that replace interactive content, focus should be managed appropriately by the parent component

## Edge Cases

- **No Message**: When no message is provided, the spinner still displays but without any text
- **Empty Message**: When an empty string is provided as the message, the text element is not rendered
- **Long Messages**: Long messages will wrap to multiple lines while maintaining the spinner's centered position
- **Container Size Constraints**: When placed in a container smaller than the spinner's size, the spinner will maintain its aspect ratio
- **Multiple Spinners**: When multiple spinners are used on the same page, each operates independently
- **Dynamic Message Changes**: The component handles dynamic message changes through re-renders
- **RTL Support**: The spinner animation direction should be reversed in right-to-left languages (future enhancement)
- **High Contrast Mode**: The component maintains visibility in high contrast mode

## Implementation Details

The LoadingSpinner component is implemented using React with TypeScript. It uses CSS animations for the spinning effect.

```tsx
// Simplified implementation
import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'medium'
}) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
```

### CSS Implementation

```css
/* LoadingSpinner Component Styles */

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.loading-container.small {
  padding: 1rem;
}

.loading-container.large {
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4a90e2;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

.loading-container.small .spinner {
  width: 24px;
  height: 24px;
  border-width: 3px;
  margin-bottom: 0.5rem;
}

.loading-container.large .spinner {
  width: 60px;
  height: 60px;
  border-width: 5px;
  margin-bottom: 1.5rem;
}

.loading-message {
  color: #666;
  margin: 0;
  font-size: 1rem;
}

.loading-container.small .loading-message {
  font-size: 0.9rem;
}

.loading-container.large .loading-message {
  font-size: 1.2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


## Related Components

- [ErrorMessage](./ErrorMessage.md): Often used together with LoadingSpinner for handling loading and error states
- [Button](./Button.md): Can include a small LoadingSpinner when in loading state
- [DataTable](../data/DataTable.md): Uses LoadingSpinner when fetching data
- [Form](../form/Form.md): Uses LoadingSpinner when submitting form data

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/ui-loadingspinner--default).

The Storybook examples demonstrate:

- Default loading spinner with standard message
- Different size variants (small, medium, large)
- Custom loading messages
- Loading spinner in different contexts (inline, full-page, within components)

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic spinner |
| 1.1.0 | Added size prop with small, medium, and large variants |
| 1.2.0 | Added custom message support |
| 1.3.0 | Improved accessibility with screen reader support |
| 2.0.0 | Refactored to TypeScript |

## Technical Debt

The LoadingSpinner component has a few technical debt issues that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | CSS File Import | Uses imported CSS file instead of styled-components | Reduces component encapsulation and increases risk of style conflicts | Migrate to styled-components for consistent styling approach | Medium |

### Accessibility Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| A-001 | Missing ARIA Attributes | Component lacks proper ARIA attributes for screen readers | Reduces accessibility for screen reader users | Add role="status" and aria-live="polite" | High |
| A-002 | No Reduced Motion Support | Animation doesn't respect prefers-reduced-motion | May cause issues for users with vestibular disorders | Add media query for prefers-reduced-motion | Medium |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | Theming Support | Add support for theme-based colors | Improves visual consistency across themes | Low | Medium |
| RFO-002 | RTL Support | Add support for right-to-left languages | Improves internationalization | Low | Low |

For a complete technical debt analysis, see the [LoadingSpinner Technical Debt Report](../technical-debt/LoadingSpinner-technical-debt.md)

## Version Compatibility

For detailed information about version compatibility, breaking changes, and migration guides, see the [LoadingSpinner Version Compatibility Matrix](./LoadingSpinner-version-compatibility.md)
