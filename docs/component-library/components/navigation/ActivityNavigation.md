# ActivityNavigation

The ActivityNavigation component is used in the Hypatia LMS for providing navigation between adjacent activities (previous/next) within a course module.

## Description

The ActivityNavigation component fetches the list of activities for a given module using Redux, determines the position of the current activity, and renders navigation links (`<Link>` from `react-router-dom`) to the previous and next activities if they exist. It displays icons corresponding to the activity type and includes a link back to the main course page. The component also handles loading states while fetching data and disables links appropriately when at the beginning or end of the module sequence. It is typically used within an activity detail view.

## Usage

```tsx
import { ActivityNavigation } from 'components/activities/ActivityNavigation'; // Path adjusted for validator

// Example usage within a component displaying an activity
const MyActivityPage = ({ courseId, moduleId, activityId }) => {
  return (
    <div>
      {/* ... other activity content ... */}
      <ActivityNavigation 
        courseId={courseId} 
        moduleId={moduleId} 
        currentActivityId={activityId} 
      />
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| courseId          | string | -       | Yes      | The ID of the course the activity belongs to.  |
| moduleId          | string | -       | Yes      | The ID of the module the activity belongs to.  |
| currentActivityId | string | -       | Yes      | The ID of the activity currently being viewed. |

## Type Definitions

The component uses the following interface for its props:

```tsx
interface ActivityNavigationProps {
  courseId: string;
  moduleId: string;
  currentActivityId: string;
}
```

It also interacts with the `Activity` type, typically defined elsewhere (e.g., `src/types/course.ts`):

```tsx
// Example structure (refer to actual definition for accuracy)
interface Activity {
  id: string;
  title: string;
  type: 'content' | 'assignment' | 'quiz' | 'discussion'; // Example types
  order: number;
  // ... other properties
}
```

## Examples

### Basic Example

```tsx
<ActivityNavigation 
  courseId="intro-to-react-101" 
  moduleId="module-3-state-props" 
  currentActivityId="activity-5-lifting-state" 
/>
```

### Advanced Example

```tsx
// Example demonstrating potential future props or complex integration
// <ActivityNavigation 
//   courseId="adv-course-202" 
//   moduleId="module-complex-interactions" 
//   currentActivityId="activity-with-callbacks"
//   onNavigate={(direction) => console.log(`Navigating ${direction}`)} 
// />
```

## Features

1.  **Dynamic Previous/Next Links:** Automatically determines and links to the adjacent activities based on their defined order within the module.
2.  **Activity Type Icons:** Displays distinct icons for different activity types (content, assignment, quiz, discussion) for quick identification.
3.  **Loading State:** Shows a loading indicator while fetching activity data from the Redux store.
4.  **Disabled States:** Correctly disables the 'Previous' link for the first activity and the 'Next' link for the last activity in the module.
5.  **Course Link:** Provides a consistent link back to the main course page.
6.  **Redux Integration:** Fetches necessary data (`moduleActivities`) via Redux actions and selectors.
7.  **Responsive Design:** Adjusts layout for different screen sizes (though specific breakpoints should be verified).

## Accessibility

The component utilizes standard HTML elements and React Router's `<Link>` component, which renders `<a>` tags.

-   **Keyboard Navigation:** Links should be navigable using the Tab key.
-   **Screen Reader Support:** Links announce the activity title. The "Previous" and "Next" labels provide context. Icons might need `aria-label` or alternative text if they convey critical information not present in the text. The purpose of the "Back to Course" link is clear.
-   **ARIA Attributes:** Consider `aria-current="page"` if this navigation is part of the main content area of the current activity page. `aria-disabled="true"` could be added to the disabled link containers for clarity, although standard HTML `disabled` attributes don't apply directly to `div` or `a` elements without specific roles.
-   **Color Contrast:** Ensure text and icon colors meet WCAG contrast requirements against their backgrounds, especially for link text and icons.
-   **Focus Management:** Standard browser focus handling should apply to the links. Ensure focus indicators are clearly visible.

## Edge Cases

- **First/Last Activity**: The component correctly identifies when the current activity is the first or last in the module sequence and disables the corresponding 'Previous' or 'Next' link visually and functionally (by rendering a `div` instead of a `Link`).
- **Loading State**: Displays a loading indicator (`spinner-small`) while `loading` is true (fetched from Redux state).
- **No Activities**: If `moduleActivities` is empty or fails to load, the component might not render links correctly. The current implementation relies on `moduleActivities` being populated. Error handling for the fetch action (`fetchModuleActivities`) should be considered.
- **Activity Not Found**: If `currentActivityId` does not match any activity ID in the fetched `moduleActivities`, the previous/next logic might fail. The `findIndex` would return -1. The current code handles `currentIndex > 0` and `currentIndex < length - 1`, implicitly handling the -1 case by not setting prev/next activities.

## Implementation Details

### TypeScript (React Component)

```tsx
// Simplified structure - Refer to actual source for full implementation
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state'; // Adjust path as needed
import { fetchModuleActivities } from '../../actions/activityActions'; // Adjust path
import { Activity } from '../../types/course'; // Adjust path
import './ActivityNavigation.css';

interface ActivityNavigationProps {
  courseId: string;
  moduleId: string;
  currentActivityId: string;
}

const ActivityNavigation: React.FC<ActivityNavigationProps> = ({ 
  courseId, moduleId, currentActivityId 
}) => {
  const dispatch = useDispatch();
  const { moduleActivities, loading } = useSelector((state: RootState) => state.activities);
  const [prevActivity, setPrevActivity] = useState<Activity | null>(null);
  const [nextActivity, setNextActivity] = useState<Activity | null>(null);

  useEffect(() => {
    dispatch(fetchModuleActivities(moduleId, courseId));
  }, [moduleId, courseId, dispatch]);

  useEffect(() => {
    // Logic to find prev/next activity based on sorted moduleActivities
    // ... see full implementation ...
  }, [moduleActivities, currentActivityId]);

  if (loading) {
    return <div>Loading...</div>; // Simplified loading state
  }

  return (
    <div className="activity-navigation">
      {/* Previous Link Logic */}
      {prevActivity ? (
        <Link to={`/courses/${courseId}/modules/${moduleId}/activities/${prevActivity.id}`}>
          Previous: {prevActivity.title}
        </Link>
      ) : (
        <div>No previous activity</div>
      )}

      {/* Next Link Logic */}
      {nextActivity ? (
        <Link to={`/courses/${courseId}/modules/${moduleId}/activities/${nextActivity.id}`}>
          Next: {nextActivity.title}
        </Link>
      ) : (
        <div>No next activity</div>
      )}
      
      {/* Back to Course Link */}
      <Link to={`/courses/${courseId}`}>Back to Course</Link>
    </div>
  );
};

export default ActivityNavigation;
```

### CSS (`ActivityNavigation.css`)

```css
/* Simplified CSS - Refer to actual source for full styles */
.activity-navigation {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navigation-links {
  display: flex;
  flex-direction: column; /* Adjusts based on media queries */
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
}

.nav-link.disabled {
  opacity: 0.7;
  cursor: default;
}

.activity-type-icon {
  /* Styles for icons */
}

.activity-title {
  /* Styles for title */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navigation-loading {
  /* Styles for loading state */
}

/* Responsive styles */
@media (max-width: 992px) {
  .navigation-links {
    flex-direction: row;
  }
}

@media (max-width: 768px) {
  .navigation-links {
    flex-direction: column;
  }
}
```

## Related Components

-   **`Link` (from `react-router-dom`)**: Used for client-side navigation between activities and back to the course.
-   **[ActivityHeader](./ActivityHeader.md)**: Often displayed alongside `ActivityNavigation` to show details of the current activity. (Assuming sibling file)
-   **[ActivityDetailModern](./ActivityDetailModern.md)** / **[ActivityContent](./ActivityContent.md)**: Components that likely render the main content of the activity and might contain `ActivityNavigation`. (Assuming sibling files)
-   **Redux Store (`state.activities`)**: Provides the list of activities (`moduleActivities`) and loading status.
-   **`fetchModuleActivities` Action**: The Redux action dispatched to retrieve activity data.

## Interactive Examples

*Note: Storybook setup for this component is pending.*

[Storybook](http://localhost:6006/?path=/story/navigation-activitynavigation--default) (Update link once Storybook is configured)

## Changelog

| Version | Date       | Changes                  |
|---------|------------|--------------------------|
| 1.0.0   | 2025-04-25 | Initial documentation    |
