# Introduction

The `DashboardWidget` component is a versatile container for displaying various dashboard elements within the Hypatia LMS. It provides a consistent look and feel for all widgets on the dashboard.

# DashboardWidget

The `DashboardWidget` component is a versatile container for displaying various dashboard elements within the Hypatia LMS. It provides a consistent look and feel for all widgets on the dashboard.

## Description

The `DashboardWidget` component offers a standardized layout for dashboard widgets, including a header with a title, optional icon, and refresh button, as well as a content area and an optional footer. It supports loading and error states, making it easy to display dynamic content.

## Visual Examples

![DashboardWidget Screenshot](path/to/screenshot.png)

## Usage

```tsx
import DashboardWidget from 'hypatia-modern/src/components/dashboard/DashboardWidget';
import { ReactNode } from 'react';

<DashboardWidget title="Example Widget" />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| title | string | - | Yes | The title of the widget, displayed in the header. |
| icon | ReactNode | - | No | An optional icon to display in the widget header. |
| className | string | '' | No | Additional CSS class names to apply to the widget. |
| children | ReactNode | - | No | The content to display within the widget. |
| loading | boolean | false | No | Whether the widget is in a loading state. |
| error | string &#124; null | null | No | An error message to display if the widget encounters an error. |
| onRefresh | () => void | - | No | An optional function to call when the refresh button is clicked. |
| color | string | '#4a90e2' | No | The color of the border at the top of the widget. |
| footer | ReactNode | - | No | An optional footer to display at the bottom of the widget. |

## Type Definitions

```tsx
interface DashboardWidgetProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  color?: string;
  footer?: ReactNode;
}
```

## Examples

### Basic Example

```tsx
<DashboardWidget title="My Widget">
  <p>This is the content of my widget.</p>
</DashboardWidget>
```

### Widget with Refresh Button

```tsx
<DashboardWidget
  title="Data Widget"
  onRefresh={() => {
    // Handle refresh logic here
    console.log('Refreshing data...');
  }}
>
  {/* Data content here */}
</DashboardWidget>
```

### Widget with Loading State

```tsx
<DashboardWidget
  title="Loading Widget"
  loading={true}
>
  {/* Loading indicator will be displayed */}
</DashboardWidget>
```

### Widget with Error State

```tsx
<DashboardWidget
  title="Error Widget"
  error="Failed to load data."
>
  {/* Error message will be displayed */}
</DashboardWidget>
```

### Widget with Footer

```tsx
<DashboardWidget
  title="Footer Widget"
  footer={<a href="#">View Details</a>}
>
  {/* Widget content here */}
</DashboardWidget>
```

## Features

1. **Feature 1**: Description of feature 1
2. **Feature 2**: Description of feature 2
3. **Feature 3**: Description of feature 3

## Accessibility

The `DashboardWidget` component provides a basic structure that can be made accessible by following these guidelines:

- **Keyboard Navigation:** Ensure that any interactive elements within the widget (e.g., the refresh button) are focusable and navigable using the keyboard.
- **Screen Reader Support:** Use semantic HTML elements and ARIA attributes to provide meaningful information to screen reader users. For example, use `aria-label` on the refresh button to describe its purpose.
- **Color Contrast:** Ensure sufficient color contrast between text and background colors to meet WCAG requirements.
- **Focus Management:** Manage focus appropriately when the widget's content changes or when the user interacts with interactive elements.

## Edge Cases

- **No Content:** If the `children` prop is not provided, the widget will display an empty content area. This is the expected behavior, and the widget should still render correctly with the header and footer.
- **Invalid Color:** If the `color` prop is set to an invalid color value, the border color may not render correctly. The component does not perform any validation on the color prop, so it is the responsibility of the parent component to ensure that the color value is valid.
- **Refresh Error:** If the `onRefresh` function throws an error, the error will not be handled by the component itself. The parent component is responsible for handling any errors that occur during the refresh process. The component should provide a way for the parent component to handle the error, such as by passing an error message to a callback function.

## Implementation Details

The `DashboardWidget` component uses CSS modules for styling and provides a flexible structure for displaying various types of content.

Key parts of the implementation:

- **Header Styling:** The header uses `borderTopColor` to set the accent color and provides a refresh button.

    ```tsx
    <div 
      className="widget-header"
      style={{ borderTopColor: color }}
    >
    ```

- **Loading and Error States:** The component handles loading and error states by displaying appropriate messages and spinners.

    ```tsx
    {loading ? (
      <div className="widget-loading">
        <div className="widget-spinner"></div>
        <p>Loading...</p>
      </div>
    ) : error ? (
      <div className="widget-error">
        <div className="error-icon">!</div>
        <p>{error}</p>
      </div>
    ) : (
      children
    )}
    ```

- **CSS Styling:** The CSS provides basic styling for the widget, including background color, border radius, and box shadow.

    ```css
    .dashboard-widget {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
      margin-bottom: 0;
    }
    ```

## Related Components

-   [ActivitiesWidget](./ActivitiesWidget.md): Displays user activity information.
-   [AnnouncementsWidget](./AnnouncementsWidget.md): Displays important announcements.
-   [CoursesWidget](./CoursesWidget.md): Displays a list of courses.
-   [DashboardModern](./DashboardModern.md): The main dashboard component that uses the `DashboardWidget` to display various widgets.

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/category-componentname--basic).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation of the `DashboardWidget` component. |
