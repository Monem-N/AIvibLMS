# ActivitiesWidget Component Documentation

## Introduction & Description
The **ActivitiesWidget** component is a React functional component used in the Hypatia LMS dashboard to display a list of upcoming user activities. It highlights activities with due dates, shows overdue status, and provides links to detailed activity pages. The widget is styled with an orange accent color and supports custom CSS class names for flexible integration.

## Visual Examples
<!-- Add screenshots or Storybook links here -->

## Import & Usage
```tsx
import ActivitiesWidget from 'hypatia-modern/src/components/dashboard/widgets/ActivitiesWidget';

const activities = [
  {
    id: '1',
    title: 'Assignment 1',
    moduleTitle: 'Module 1',
    dueDate: '2024-06-10T23:59:59Z',
    type: 'assignment',
    points: 10,
  },
  // more activities...
];

<ActivitiesWidget activities={activities} className="custom-class" />
```

## Props & Types
| Prop       | Type       | Description                          |
|------------|------------|------------------------------------|
| activities | Activity[] | Array of activity objects to display. Each activity includes id, title, moduleTitle, dueDate, type, points, and other metadata. |
| className  | string (optional) | Additional CSS class names for styling the widget container. |

## Code Examples
### Basic Usage
```tsx
<ActivitiesWidget activities={activities} />
```

### Advanced Usage
```tsx
// Example with custom styling and handling refresh externally
const [activities, setActivities] = React.useState(initialActivities);

const handleRefresh = async () => {
  // Fetch new activities from API
  const updated = await fetchActivities();
  setActivities(updated);
};

<ActivitiesWidget 
  activities={activities} 
  className="dashboard-activities" 
  onRefresh={handleRefresh} 
/>
```

## Accessibility
- Uses semantic HTML elements and links for navigation.
- Overdue activities are visually indicated with color and font weight.
- Keyboard navigable via standard tab order.
- Color contrast meets WCAG AA standards for text and indicators.

## Edge Cases
- Displays a friendly message when there are no upcoming activities.
- Handles loading and error states during refresh with appropriate UI feedback.
- Sorts activities by due date, placing those without due dates at the end.

## Implementation Highlights
- Uses React hooks (useState) for managing loading and error states.
- Sorts activities by due date ascending to show closest deadlines first.
- Uses a reusable DashboardWidget component as a container.
- Displays different icons based on activity type (assignment, quiz, discussion, content).
- Responsive design adapts layout for smaller screens.

## Related Components
- [DashboardWidget](./DashboardWidget.md): The container component used to wrap ActivitiesWidget.
- [AnnouncementsWidget](./AnnouncementsWidget.md): Another dashboard widget displaying announcements.

## Changelog & Versioning
- Initial version created in 2024.
- Compatible with React 17+ and TypeScript 4+.
