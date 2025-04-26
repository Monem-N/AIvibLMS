# ProgressWidget

The ProgressWidget component is used in the Hypatia LMS for displaying a user's progress overview on the dashboard.

## Description

The ProgressWidget component provides a visual summary of the user's overall progress, course completion stats, achievements, and top courses by progress. It is used in the dashboard context and supports features such as loading state, error handling, and refresh functionality.

## Usage

```tsx
import ProgressWidget from 'hypatia-modern/src/components/dashboard/widgets/ProgressWidget';

<ProgressWidget 
  progress={{
    overall: 75,
    courses: {
      'math-101': 80,
      'history-202': 60,
      'science-303': 90,
    },
    achievements: ['Completed 5 courses', 'Top scorer in math-101'],
  }}
  className="custom-class"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| progress | object | {} | Yes | Object containing progress data: overall (number), courses (Record<string, number>), grades (Record<string, number>), achievements (string[]) |
| className | string | '' | No | Additional CSS class names to apply to the widget |

## Type Definitions

```tsx
interface ProgressWidgetProps {
  progress: {
    overall?: number;
    courses?: Record<string, number>;
    grades?: Record<string, number>;
    achievements?: string[];
  };
  className?: string;
}
```

## Examples

### Basic Example

```tsx
<ProgressWidget 
  progress={{ overall: 50, courses: { 'math-101': 50 } }} 
/>
```

### Advanced Example

```tsx
<ProgressWidget 
  progress={{
    overall: 85,
    courses: {
      'math-101': 100,
      'history-202': 75,
      'science-303': 90,
    },
    achievements: ['Completed 5 courses', 'Top scorer in math-101'],
  }}
  className="highlight"
/>
```

### Example with Context

```tsx
import { DashboardContext } from 'hypatia-modern/src/contexts/DashboardContext';

<DashboardContext.Provider value={dashboardData}>
  <ProgressWidget progress={dashboardData.progress} />
</DashboardContext.Provider>
```

## Features

1. **Overall Progress Visualization**: Circular progress chart showing overall completion percentage.
2. **Course Completion Stats**: Displays counts of completed and in-progress courses.
3. **Achievements Count**: Shows number of achievements earned.
4. **Top Courses List**: Lists top 3 courses by progress with progress bars.
5. **Refresh Functionality**: Allows refreshing progress data with loading and error states.
6. **Responsive Design**: Adapts layout for smaller screens.

## Accessibility

- Keyboard navigation supported for interactive elements like refresh and links.
- Uses semantic HTML and ARIA roles where applicable.
- Color contrast meets WCAG guidelines for text and progress bars.
- Focus management handled by underlying DashboardWidget component.

## Edge Cases

- Handles empty or missing progress data gracefully by showing empty states.
- Limits top courses list to maximum of 3 entries.
- Displays error message if refresh fails.
- Defaults overall progress to 0 if not provided.

## Implementation Details

Key excerpts from the component implementation:

```tsx
// Props interface
interface ProgressWidgetProps {
  progress: {
    overall?: number;
    courses?: Record<string, number>;
    grades?: Record<string, number>;
    achievements?: string[];
  };
  className?: string;
}

// Circular progress chart SVG with dynamic strokeDasharray
<svg viewBox="0 0 36 36" className="circular-chart">
  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
  <path className="circle" strokeDasharray={`${overallProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
  <text x="18" y="20.35" className="percentage">{overallProgress}%</text>
</svg>
```

## Related Components

- [DashboardWidget](./DashboardWidget.md): Wrapper component used for consistent dashboard widget styling and behavior.

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/dashboard-progresswidget--basic).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
