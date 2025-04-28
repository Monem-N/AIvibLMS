# AnnouncementsWidget Component Documentation

## Introduction & Description
The **AnnouncementsWidget** component is a React functional component used in the Hypatia LMS dashboard to display a concise list of recent announcements. It highlights unread announcements with a count badge, allows users to refresh the list, and provides links to detailed announcement pages. The widget is styled with a red accent color and supports custom CSS class names for flexible integration.

## Visual Examples
<!-- Add screenshots or Storybook links here -->
*Placeholder for screenshots or Storybook stories demonstrating the AnnouncementsWidget in various states.*

## Import & Usage
```tsx
import AnnouncementsWidget from 'hypatia-modern/src/components/dashboard/widgets/AnnouncementsWidget';

const announcements = [
  {
    id: '1',
    title: 'New Course Available',
    content: 'We have launched a new course on Modern Web Development.',
    date: '2024-06-01T12:00:00Z',
    author: {
      id: 'a1',
      name: 'Admin',
      avatar: 'https://example.com/avatar.png',
    },
    read: false,
  },
  // more announcements...
];

<AnnouncementsWidget announcements={announcements} className="custom-class" />
```

## Props & Types
| Prop          | Type         | Description                          |
|---------------|--------------|------------------------------------|
| announcements | Announcement[] | Array of announcement objects to display. Each announcement includes id, title, content, date, author info, optional course info, and read status. |
| className     | string (optional) | Additional CSS class names for styling the widget container. |

## Code Examples
### Basic Usage
```tsx
<AnnouncementsWidget announcements={announcements} />
```

### Advanced Usage
```tsx
// Example with custom styling and handling refresh externally
const [announcements, setAnnouncements] = React.useState(initialAnnouncements);

const handleRefresh = async () => {
  // Fetch new announcements from API
  const updated = await fetchAnnouncements();
  setAnnouncements(updated);
};

<AnnouncementsWidget 
  announcements={announcements} 
  className="dashboard-announcements" 
  onRefresh={handleRefresh} 
/>
```

## Accessibility
- Uses semantic HTML elements and links for navigation.
- Unread announcements are visually indicated with a colored dot.
- Keyboard navigable via standard tab order.
- Color contrast meets WCAG AA standards for text and indicators.

## Edge Cases
- Displays a friendly message when there are no announcements.
- Handles loading and error states during refresh with appropriate UI feedback.
- Truncates long announcement content to maintain layout integrity.

## Implementation Highlights
- Uses React hooks (useState) for managing loading and error states.
- Sorts announcements by date descending to show newest first.
- Uses a reusable DashboardWidget component as a container.
- Applies conditional styling for unread announcements.
- Truncates content to 100 characters with ellipsis.
- Responsive design adapts layout for smaller screens.

## Related Components
- [DashboardWidget](./DashboardWidget.md): The container component used to wrap AnnouncementsWidget.
- [MessagesWidget](./MessagesWidget.md): Another dashboard widget displaying user messages.

## Changelog & Versioning
- Initial version created in 2024.
- Compatible with React 17+ and TypeScript 4+.
<AnnouncementsWidget announcements={announcements} />
