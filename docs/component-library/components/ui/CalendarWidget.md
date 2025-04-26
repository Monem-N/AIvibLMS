# CalendarWidget Component Documentation

## Introduction & Description
The CalendarWidget component is a dashboard widget designed to display the user's upcoming events. It shows a list of up to five upcoming events starting from the current day, sorted by date. The widget supports refreshing to update the event list and provides quick navigation to the full calendar and event creation pages.

## Visual Examples
<!-- Add placeholders for screenshots or Storybook links -->

## Import & Usage
```tsx
import CalendarWidget from 'src/components/dashboard/widgets/CalendarWidget';

const events = [
  {
    id: '1',
    title: 'Math Class',
    startDate: '2024-06-01T10:00:00',
    type: 'class',
  },
  // more events...
];

<CalendarWidget events={events} />
```

## Props & Types
| Prop       | Type     | Description                                  | Required |
|------------|----------|----------------------------------------------|----------|
| events     | Event[]  | Array of event objects to display            | Yes      |
| className  | string   | Optional additional CSS class for the widget | No       |

### Event Object
| Field       | Type                         | Description                                  |
|-------------|------------------------------|----------------------------------------------|
| id          | string                       | Unique identifier for the event              |
| title       | string                       | Title of the event                           |
| description | string (optional)            | Description of the event                     |
| startDate   | string (ISO date string)     | Start date and time of the event            |
| endDate     | string (optional)            | End date and time of the event               |
| location    | string (optional)            | Location of the event                        |
| type        | 'class' \| 'assignment' \| 'exam' \| 'meeting' \| 'other' | Type of event                              |
| courseId    | string (optional)            | Associated course ID                         |
| courseName  | string (optional)            | Associated course name                       |

## Code Examples
### Basic Usage
```tsx
<CalendarWidget events={events} />
```

### Advanced Usage
```tsx
<CalendarWidget events={events} className="custom-calendar-widget" />
```

## Accessibility
The component uses semantic HTML elements and links for navigation. ARIA roles and keyboard support should be verified and enhanced as needed to meet WCAG guidelines.

## Edge Cases
- Displays a message and link to add events when no upcoming events are available.
- Handles errors during refresh with user-friendly messages.
- Limits displayed events to a maximum of five upcoming events.

## Implementation Highlights
- Uses React useState for loading and error states.
- Filters and sorts events starting from the current date.
- Renders event items with icons based on event type.
- Supports refresh with simulated API call.
- Styled with CalendarWidget.css for responsive design.

## Related Components
- DashboardWidget: Wrapper component used for consistent widget layout.
- MessagesWidget: Another dashboard widget component.

## Changelog & Versioning
- Initial documentation created.
- Compatible with React 17+ and TypeScript 4+.

## Technical Debt Report
- No unit or integration tests currently exist for this component.
- Accessibility ARIA roles and keyboard navigation need audit and improvement.

## Accessibility Compliance Report
- Pending accessibility audit.

## Version Compatibility Matrix
| React Version | TypeScript Version | Compatible |
|---------------|--------------------|------------|
| 17.x          | 4.x                | Yes        |
| 18.x          | 4.x                | Yes        |

## Peer Review Template
- [ ] Code readability and maintainability
- [ ] Prop types and documentation accuracy
- [ ] Accessibility compliance
- [ ] Visual and functional correctness
- [ ] Test coverage and quality
