# HybridInitializer

## Description

The `HybridInitializer` component initializes both Firebase and Supabase services for the hybrid backend approach used in AIvibLMS. It ensures that both services are properly initialized before rendering the application and provides a loading state during initialization.

This component is a key part of the hybrid Firebase/Supabase architecture, where Firebase is used for authentication and database operations, while Supabase is used for file storage.

## Usage

```tsx
import HybridInitializer from 'components/core/HybridInitializer';

<HybridInitializer>
  {/* Application components */}
</HybridInitializer>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| children | ReactNode | - | Yes | The child components to render after initialization |

## Examples

### Basic Example

```tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HybridInitializer from './components/core/HybridInitializer';
import AuthProvider from './contexts/AuthContext';
import App from './App';

const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <HybridInitializer>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HybridInitializer>
    </Provider>
  );
};

export default Root;
```

### With Error Handling

The HybridInitializer includes built-in error handling that displays error messages if initialization fails:

```tsx
<HybridInitializer>
  {/* The children will only be rendered if initialization succeeds */}
  <App />
</HybridInitializer>
```

## Implementation Details

The `HybridInitializer` component:

1. Initializes Firebase services (Authentication, Firestore, Functions, Realtime Database)
2. Initializes Supabase services (primarily Storage)
3. Connects to Firebase emulators in development mode
4. Provides a loading state during initialization
5. Handles initialization errors gracefully
6. Exposes Firebase and Supabase services to the application

## Code Structure

```tsx
const HybridInitializer: React.FC<HybridInitializerProps> = ({ children }) => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [supabaseInitialized, setSupabaseInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Firebase
    try {
      // Firebase initialization code...
      setFirebaseInitialized(true);
    } catch (error) {
      setError('Failed to initialize Firebase');
    }

    // Initialize Supabase
    try {
      // Supabase initialization code...
      setSupabaseInitialized(true);
    } catch (error) {
      setError('Failed to initialize Supabase');
    }
  }, []);

  // Show loading state while initializing
  if (!firebaseInitialized || !supabaseInitialized) {
    return <LoadingState error={error} />;
  }

  // Render children once both services are initialized
  return <>{children}</>;
};
```

## Edge Cases

- **Initialization Failure**: If either Firebase or Supabase initialization fails, an error message is displayed to the user.
- **Missing Environment Variables**: The component checks for required environment variables and displays an error if they are missing.
- **Emulator Connection**: In development mode, the component attempts to connect to Firebase emulators and logs a warning if connection fails.

## Related Components

- [AuthProvider](./AuthProvider.md): Uses the initialized Firebase Authentication service
- [FileUpload](../ui/FileUpload.md): Uses the initialized Supabase Storage service

## Related Services

- [hybridService.ts](../../services/hybridService.md): Service that exports the initialized Firebase and Supabase instances
- [fileService.ts](../../services/fileService.md): Service that uses Supabase Storage for file operations

## Architectural Context

The `HybridInitializer` component is a key part of the hybrid Firebase/Supabase architecture, which is documented in the [Hybrid Firebase/Supabase Approach ADR](../../../architecture/decisions/0001-hybrid-firebase-supabase-approach.md).

## Accessibility

This component does not have direct accessibility concerns as it primarily handles service initialization. However, it does provide a loading state that should meet accessibility standards:

- The loading spinner has appropriate ARIA attributes
- Error messages are properly announced to screen readers
- The loading state meets color contrast requirements

## Testing

When testing components that depend on Firebase or Supabase services, you should mock the `HybridInitializer` component to avoid actual service initialization:

```tsx
// Mock implementation
jest.mock('components/core/HybridInitializer', () => {
  return {
    __esModule: true,
    default: ({ children }) => <>{children}</>
  };
});
```
