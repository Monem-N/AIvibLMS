# Testing Implementation

This document describes the testing implementation for the Hypatia LMS modernization project. We are using Jest and React Testing Library to test our components and ensure they work correctly.

## Testing Framework

We are using the following testing tools:

1. **Jest**: A JavaScript testing framework that works with React and provides a test runner, assertion library, and mocking capabilities.
2. **React Testing Library**: A testing utility that encourages testing components in a way that resembles how users interact with them.
3. **jest-dom**: Custom Jest matchers for asserting on DOM nodes, making it easier to test the state of the DOM.

## Test Structure

Our tests follow a consistent structure:

1. **Setup**: Import the component and any necessary dependencies, and set up mocks for external dependencies.
2. **Test Cases**: Write test cases that cover different aspects of the component's functionality.
3. **Assertions**: Make assertions about the component's behavior and output.

## Test Coverage

We aim to achieve at least 80% test coverage for our codebase, focusing on:

1. **Component Rendering**: Ensure components render correctly with different props.
2. **User Interactions**: Test how components respond to user interactions like clicks and form submissions.
3. **State Changes**: Verify that component state changes correctly in response to events.
4. **Error Handling**: Test how components handle error conditions.
5. **Edge Cases**: Cover edge cases like empty data, loading states, and error states.

## Implemented Tests

### Navigation Components

1. **Icon.test.tsx**: Tests for the Icon component, including rendering, class names, and props.
2. **Breadcrumbs.test.tsx**: Tests for the Breadcrumbs component, including rendering, Redux integration, and link generation.
3. **Search.test.tsx**: Tests for the Search component, including form submission, input handling, and navigation.
4. **Navigation.test.tsx**: Tests for the Navigation component, including rendering, item toggling, and event handling.
5. **TopNavModern.test.tsx**: Tests for the TopNavModern component, including rendering, user state, and panel changes.

### Authentication Components

1. **SigninModern.test.tsx**: Tests for the SigninModern component, including form submission, validation, and error handling.

### Dashboard Components

1. **DashboardWidget.test.jsx**: Tests for the DashboardWidget component, including rendering, loading states, and error handling.

## Mocking

We use Jest's mocking capabilities to mock external dependencies:

1. **React Redux**: Mock `useSelector` and `useDispatch` to control Redux state and actions.
2. **React Router**: Mock `useNavigate` and `useLocation` to control navigation and location.
3. **Firebase**: Mock Firebase services to avoid making real API calls.
4. **Custom Hooks**: Mock custom hooks like `useAuth` and `useNotification` to control their behavior.
5. **SVG Imports**: Mock SVG imports to avoid issues with Jest's handling of non-JavaScript files.

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run a specific test file
npm test -- src/components/navigation/__tests__/TopNavModern.test.tsx
```

## Test Examples

### Component Rendering Test

```jsx
it('renders without crashing', () => {
  render(<DashboardWidget title="Test Widget" />);
  
  // Check if the widget is rendered
  const widget = screen.getByText('Test Widget').closest('.dashboard-widget');
  expect(widget).toBeInTheDocument();
});
```

### User Interaction Test

```jsx
it('submits the form with valid credentials', async () => {
  const mockSignIn = jest.fn().mockResolvedValue({ uid: '123', email: 'test@example.com' });
  const mockOnSuccess = jest.fn();
  
  useAuth.mockReturnValue({ signIn: mockSignIn });
  
  render(<SigninModern onSuccess={mockOnSuccess} />);
  
  // Fill in the form
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  
  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
  
  // Check if signIn is called with the correct credentials
  expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
  
  // Wait for the form submission to complete
  await waitFor(() => {
    // Check if onSuccess is called
    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
```

### State Change Test

```jsx
it('toggles navigation items when clicked', () => {
  render(<Navigation {...props} />);
  
  // Find a navigation item with children
  const accountItem = screen.getByText('Account');
  const accountButton = accountItem.closest('button');
  
  // Click the navigation item
  fireEvent.click(accountButton);
  
  // Check if the navigation item is expanded
  const accountNavItem = accountButton.closest('.nav-item');
  expect(accountNavItem).toHaveClass('opened');
  
  // Click the navigation item again
  fireEvent.click(accountButton);
  
  // Check if the navigation item is collapsed
  expect(accountNavItem).not.toHaveClass('opened');
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on testing how components behave from a user's perspective, not their internal implementation details.
2. **Use Semantic Queries**: Use queries like `getByRole`, `getByLabelText`, and `getByText` to find elements in a way that resembles how users interact with them.
3. **Mock External Dependencies**: Mock external dependencies to isolate the component being tested.
4. **Test Edge Cases**: Test how components handle edge cases like empty data, loading states, and error states.
5. **Keep Tests Simple**: Write simple, focused tests that test one thing at a time.
6. **Use Descriptive Test Names**: Use descriptive test names that clearly indicate what is being tested.

## Next Steps

1. **Increase Test Coverage**: Continue adding tests for more components to increase overall test coverage.
2. **Add Integration Tests**: Add integration tests that test how components work together.
3. **Add End-to-End Tests**: Add end-to-end tests that test the application as a whole.
4. **Automate Testing**: Set up continuous integration to run tests automatically on code changes.
5. **Monitor Test Coverage**: Monitor test coverage to ensure it stays above the target threshold.
