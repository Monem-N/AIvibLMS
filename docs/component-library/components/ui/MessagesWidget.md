# MessagesWidget Component Documentation

## Introduction
The **MessagesWidget** component is a dashboard widget in the Hypatia LMS that displays a summary of the user's recent messages. It highlights unread messages, allows refreshing the message list, and provides quick navigation to the full messages page.

## Features
- Displays up to 5 recent messages sorted by newest first.
- Shows unread message count in the widget title.
- Supports refreshing messages with loading and error states.
- Provides links to view all messages and compose new messages.
- Responsive design with accessible keyboard navigation and ARIA roles.

## Usage
Import the component and provide an array of message objects as the `messages` prop:

```tsx
import MessagesWidget from 'src/components/dashboard/widgets/MessagesWidget';

const messages = [
  {
    id: '1',
    sender: { id: 'u1', name: 'Alice', avatar: '/avatars/alice.png' },
    subject: 'Welcome!',
    content: 'Welcome to Hypatia LMS.',
    date: '2024-06-01T12:00:00Z',
    read: false,
  },
  // more messages...
];

<MessagesWidget messages={messages} className="widget-full" />
```

## Props

| Prop       | Type           | Description                                  | Required | Default  |
|------------|----------------|----------------------------------------------|----------|----------|
| messages   | Message[]      | Array of message objects to display.         | Yes      | -        |
| className  | string         | Optional additional CSS class names.         | No       | ''       |

### Message Type

```ts
interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  subject: string;
  content: string;
  date: string;
  read: boolean;
}
```

## Edge Cases
- Displays a friendly message and "Compose Message" button when no messages are available.
- Shows loading spinner and disables refresh during data fetching.
- Displays error message on refresh failure with retry option.

## Implementation Details
The component sorts messages by date descending and calculates unread count:

```tsx
const sortedMessages = [...messages].sort((a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

const unreadCount = messages.filter(message => !message.read).length;
```

Refresh handler simulates API call with loading and error states:

```tsx
const handleRefresh = async () => {
  setIsLoading(true);
  setError(null);
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  } catch (error) {
    setError('Failed to refresh messages. Please try again later.');
    setIsLoading(false);
  }
};
```

Message items display sender avatar or placeholder, subject, truncated content, and unread indicator.

## Technical Debt
- No current known technical debt.
- Consider adding unit tests for MessagesWidget.

## Version Compatibility

| React Version | TypeScript Version | Compatible |
|---------------|--------------------|------------|
| 17.x          | 4.x                | Yes        |
| 18.x          | 4.x                | Yes        |

## Accessibility
- Uses semantic HTML and ARIA roles via the DashboardWidget wrapper.
- Keyboard navigable links for messages and actions.
- Visual indicators for unread messages.
- Responsive design for different screen sizes.
- WCAG compliant color contrast for text and indicators.

## Related Components
- [DashboardWidget](./DashboardWidget.md)
- [CoursesWidget](./CoursesWidget.md)
- [ActivitiesWidget](./ActivitiesWidget.md)
- [ProgressWidget](./ProgressWidget.md)

## Changelog
- Initial documentation created for MessagesWidget.

## Peer Review Template
- [ ] Code correctness and clarity
- [ ] Completeness of documentation
- [ ] Accessibility compliance
- [ ] Visual and functional consistency
- [ ] Suggestions for improvement

## Visual Examples
<!-- Placeholder for screenshots or Storybook links -->

## Interactive Examples
<!-- Placeholder for Storybook link -->

};
const unreadCount = messages.filter(message => !message.read).length;
}
<MessagesWidget messages={messages} className="widget-full" />
